"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { MOCK_QUESTS } from "@/data/quests";
import { getLevelFromXp } from "@/lib/xp";
import type { TravelerType } from "@/types";

const DEMO_USER_ID = "demo-traveler";

export interface GameUser {
  id: string;
  name: string;
  avatarId: string;
  travelerType: TravelerType;
  xp: number;
  level: number;
  completedQuestIds: string[];
  activeQuestIds: string[];
  onboarded: boolean;
}

export interface WalletState {
  xpBalance: number;
}

export interface LedgerEntry {
  id: string;
  delta: number;
  sourceType: string;
  sourceId: string | null;
  note: string | null;
  createdAt: string;
}

export interface ShopItem {
  id: string;
  slug: string;
  name: string;
  description: string;
  priceXp: number;
  rarity: string;
}

export interface InventoryEntry {
  id: string;
  quantity: number;
  acquiredAt: string;
  item: ShopItem;
}

interface ProfileSnapshot {
  user: GameUser;
  wallet: WalletState;
  inventory: InventoryEntry[];
  ledgerPreview: LedgerEntry[];
}

const defaultUser = (): GameUser => ({
  id: DEMO_USER_ID,
  name: "Аялагч",
  avatarId: "steppe",
  travelerType: "explorer",
  xp: 40,
  level: getLevelFromXp(40),
  completedQuestIds: [],
  activeQuestIds: [],
  onboarded: false,
});

const defaultWallet = (): WalletState => ({
  xpBalance: 40,
});

async function readJson<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });

  if (!res.ok) {
    let message = "Сервертэй холбогдоход алдаа гарлаа.";
    try {
      const body = (await res.json()) as { message?: string };
      if (body.message) message = body.message;
    } catch {
      // noop
    }
    throw new Error(message);
  }

  return (await res.json()) as T;
}

interface GameState {
  user: GameUser;
  wallet: WalletState;
  inventory: InventoryEntry[];
  ledgerPreview: LedgerEntry[];
  shopItems: ShopItem[];
  loadingShop: boolean;
  syncing: boolean;
  initialized: boolean;
  initializeFromServer: () => Promise<void>;
  completeOnboarding: (
    patch: Partial<Pick<GameUser, "name" | "avatarId" | "travelerType">>,
  ) => Promise<void>;
  refreshProfile: () => Promise<void>;
  startQuest: (questId: string) => Promise<string>;
  completeQuest: (
    questId: string,
    payload: { proofPhoto: boolean; proofGps: boolean },
  ) => Promise<string>;
  fetchShopItems: () => Promise<void>;
  purchaseShopItem: (itemId: string) => Promise<string>;
  fetchBag: () => Promise<void>;
  resetDemo: () => Promise<void>;
}

function applySnapshot(
  set: (partial: Partial<GameState>) => void,
  snapshot: ProfileSnapshot,
) {
  set({
    user: snapshot.user,
    wallet: snapshot.wallet,
    inventory: snapshot.inventory,
    ledgerPreview: snapshot.ledgerPreview,
  });
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      user: defaultUser(),
      wallet: defaultWallet(),
      inventory: [],
      ledgerPreview: [],
      shopItems: [],
      loadingShop: false,
      syncing: false,
      initialized: false,
      initializeFromServer: async () => {
        if (get().syncing) return;
        set({ syncing: true });
        try {
          const snapshot = await readJson<ProfileSnapshot>("/api/profile");
          applySnapshot(set, snapshot);
          set({ initialized: true });
        } finally {
          set({ syncing: false });
        }
      },
      completeOnboarding: async (patch) => {
        const snapshot = await readJson<ProfileSnapshot>("/api/profile", {
          method: "PATCH",
          body: JSON.stringify({
            ...patch,
            onboarded: true,
          }),
        });
        applySnapshot(set, snapshot);
      },
      refreshProfile: async () => {
        const snapshot = await readJson<ProfileSnapshot>("/api/profile");
        applySnapshot(set, snapshot);
      },
      startQuest: async (questId) => {
        const response = await readJson<{
          message: string;
          snapshot: ProfileSnapshot;
        }>("/api/quests/start", {
          method: "POST",
          body: JSON.stringify({ questId }),
        });
        applySnapshot(set, response.snapshot);
        return response.message;
      },
      completeQuest: async (questId, payload) => {
        const response = await readJson<{
          message: string;
          snapshot: ProfileSnapshot;
        }>("/api/quests/complete", {
          method: "POST",
          body: JSON.stringify({
            questId,
            proofPhoto: payload.proofPhoto,
            proofGps: payload.proofGps,
          }),
        });
        applySnapshot(set, response.snapshot);
        return response.message;
      },
      fetchShopItems: async () => {
        set({ loadingShop: true });
        try {
          const response = await readJson<{ items: ShopItem[] }>("/api/shop/items");
          set({ shopItems: response.items });
        } finally {
          set({ loadingShop: false });
        }
      },
      purchaseShopItem: async (itemId) => {
        const response = await readJson<{
          message: string;
          snapshot: ProfileSnapshot;
        }>("/api/shop/purchase", {
          method: "POST",
          body: JSON.stringify({ itemId }),
        });
        applySnapshot(set, response.snapshot);
        return response.message;
      },
      fetchBag: async () => {
        const response = await readJson<{
          inventory: InventoryEntry[];
          wallet: WalletState;
        }>("/api/bag");
        set({
          inventory: response.inventory,
          wallet: response.wallet,
        });
      },
      resetDemo: async () => {
        const response = await readJson<{
          snapshot: ProfileSnapshot;
        }>("/api/profile/reset", {
          method: "POST",
          body: JSON.stringify({}),
        });
        applySnapshot(set, response.snapshot);
      },
    }),
    {
      name: "project-alpha-demo",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({
        user: s.user,
        wallet: s.wallet,
        inventory: s.inventory,
        ledgerPreview: s.ledgerPreview,
      }),
    },
  ),
);

export function useUserLevel(): number {
  const xp = useGameStore((s) => s.user.xp);
  return getLevelFromXp(xp);
}

export function getQuestIndex(): Map<string, (typeof MOCK_QUESTS)[0]> {
  return new Map(MOCK_QUESTS.map((q) => [q.id, q]));
}
