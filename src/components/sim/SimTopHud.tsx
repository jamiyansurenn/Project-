"use client";

import Link from "next/link";
import { useMemo } from "react";
import { getQuestById } from "@/data/quests";
import { getXpProgress } from "@/lib/xp";
import { useGameStore } from "@/store/useGameStore";

export function SimTopHud() {
  const user = useGameStore((s) => s.user);
  const { level, percent } = getXpProgress(user.xp);

  const locationLabel = useMemo(() => {
    const first = user.activeQuestIds[0];
    if (!first) return "Байршил сонгоогүй";
    const q = getQuestById(first);
    return q?.location ?? "—";
  }, [user.activeQuestIds]);

  const activeCount = user.activeQuestIds.length;

  return (
    <header className="sim-glass sticky top-0 z-[42] flex h-12 items-center gap-3 border-b border-white/10 px-3 pl-14 backdrop-blur-xl md:pl-52 md:pr-4">
      <div className="flex min-w-0 flex-1 flex-wrap items-center gap-x-4 gap-y-1 text-[11px] md:text-xs">
        <div className="flex items-center gap-1.5">
          <span className="font-medium uppercase tracking-wide text-zinc-500">
            Түвшин
          </span>
          <span className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono font-semibold tabular-nums text-zinc-100">
            {level}
          </span>
        </div>
        <div className="hidden h-3 w-px bg-white/10 sm:block" />
        <div className="flex min-w-0 items-center gap-2">
          <span className="shrink-0 font-medium uppercase tracking-wide text-zinc-500">
            XP
          </span>
          <span className="font-mono font-semibold tabular-nums text-sky-200">
            {user.xp}
          </span>
          <div className="hidden h-1.5 w-16 overflow-hidden rounded-full bg-slate-800 sm:block md:w-24">
            <div
              className="h-full rounded-full bg-sky-500/80 transition-all duration-500"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>
        <div className="hidden h-3 w-px bg-white/10 md:block" />
        <div className="flex items-center gap-1.5">
          <span className="font-medium uppercase tracking-wide text-zinc-500">
            Идэвхтэй
          </span>
          <span className="font-mono font-semibold text-zinc-200">{activeCount}</span>
        </div>
        <div className="hidden h-3 w-px bg-white/10 lg:block" />
        <div className="hidden min-w-0 max-w-[200px] truncate lg:block" title={locationLabel}>
          <span className="font-medium uppercase tracking-wide text-zinc-500">
            Байршил
          </span>{" "}
          <span className="text-zinc-300">{locationLabel}</span>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-1.5">
        <Link
          href="/shop"
          className="rounded border border-white/10 bg-white/5 px-2 py-1 text-[10px] font-medium text-zinc-300 transition hover:bg-white/10 md:text-xs"
        >
          Дэлгүүр
        </Link>
        <Link
          href="/bag"
          className="rounded border border-white/10 bg-white/5 px-2 py-1 text-[10px] font-medium text-zinc-300 transition hover:bg-white/10 md:text-xs"
        >
          Цүнх
        </Link>
      </div>
    </header>
  );
}
