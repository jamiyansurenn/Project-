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
  completedQuestIds: string[];
  activeQuestIds: string[];
  onboarded: boolean;
}

const defaultUser = (): GameUser => ({
  id: DEMO_USER_ID,
  name: "Аялагч",
  avatarId: "steppe",
  travelerType: "explorer",
  xp: 40,
  completedQuestIds: [],
  activeQuestIds: [],
  onboarded: false,
});

interface GameState {
  user: GameUser;
  completeOnboarding: (patch: Partial<Pick<GameUser, "name" | "avatarId" | "travelerType">>) => void;
  startQuest: (questId: string) => void;
  completeQuest: (questId: string, rewardXp: number) => void;
  resetDemo: () => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      user: defaultUser(),
      completeOnboarding: (patch) =>
        set({
          user: {
            ...get().user,
            ...patch,
            onboarded: true,
          },
        }),
      startQuest: (questId) => {
        const u = get().user;
        if (u.completedQuestIds.includes(questId)) return;
        if (u.activeQuestIds.includes(questId)) return;
        set({
          user: {
            ...u,
            activeQuestIds: [...u.activeQuestIds, questId],
          },
        });
      },
      completeQuest: (questId, rewardXp) => {
        const u = get().user;
        if (u.completedQuestIds.includes(questId)) return;
        const activeQuestIds = u.activeQuestIds.filter((id) => id !== questId);
        const completedQuestIds = [...u.completedQuestIds, questId];
        const xp = u.xp + rewardXp;
        set({
          user: {
            ...u,
            xp,
            activeQuestIds,
            completedQuestIds,
          },
        });
      },
      resetDemo: () => set({ user: defaultUser() }),
    }),
    {
      name: "project-alpha-demo",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ user: s.user }),
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
