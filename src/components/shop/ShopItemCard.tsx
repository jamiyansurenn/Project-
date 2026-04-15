"use client";

import { cn } from "@/lib/cn";
import type { ShopItem } from "@/store/useGameStore";

const rarityStyles: Record<string, string> = {
  common: "border-white/10 bg-zinc-500/20 text-zinc-200",
  rare: "border-sky-400/30 bg-sky-500/25 text-sky-100",
  epic: "border-violet-400/40 bg-violet-600/30 text-violet-100",
};

const rarityLabels: Record<string, string> = {
  common: "Энгийн",
  rare: "Ховор",
  epic: "Онцгой",
};

export function ShopItemCard({
  item,
  xpBalance,
  pending,
  onBuy,
}: {
  item: ShopItem;
  xpBalance: number;
  pending: boolean;
  onBuy: (id: string) => void;
}) {
  const canBuy = xpBalance >= item.priceXp && !pending;

  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-violet-500/25 bg-gradient-to-br from-zinc-900/95 via-zinc-950/95 to-indigo-950/90 p-4",
        "shadow-[0_12px_36px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.06)]",
        "transition duration-300 ease-out",
        "hover:-translate-y-1 hover:border-violet-400/40 hover:shadow-[0_18px_44px_rgba(124,58,237,0.22),0_0_0_1px_rgba(167,139,250,0.2)]",
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-violet-600/10 via-transparent to-amber-400/5 opacity-0 transition duration-300 group-hover:opacity-100" />
      <div className="relative flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-zinc-50">{item.name}</h3>
          <p className="mt-1 text-xs text-zinc-400">{item.description}</p>
        </div>
        <span
          className={cn(
            "rounded-full border px-2 py-1 text-[10px] font-semibold uppercase tracking-wide backdrop-blur-sm",
            rarityStyles[item.rarity] ?? rarityStyles.common,
          )}
        >
          {rarityLabels[item.rarity] ?? "Энгийн"}
        </span>
      </div>
      <div className="relative mt-4 flex items-center justify-between">
        <span className="rounded-full border border-amber-400/40 bg-amber-500/20 px-2.5 py-1 text-xs font-semibold text-amber-100 shadow-[0_0_12px_rgba(251,191,36,0.25)]">
          {item.priceXp} XP
        </span>
        <button
          type="button"
          onClick={() => onBuy(item.id)}
          disabled={!canBuy}
          className="rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 px-3 py-1.5 text-xs font-semibold text-zinc-950 shadow-md shadow-amber-500/25 transition enabled:hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
        >
          {pending ? "..." : canBuy ? "Авах" : "XP хүрэлцэхгүй"}
        </button>
      </div>
    </article>
  );
}
