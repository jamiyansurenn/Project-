"use client";

import { useMemo } from "react";
import { useGameStore } from "@/store/useGameStore";
import { getNextLevelThreshold, getXpProgress } from "@/lib/xp";

export function QuestStatsBar() {
  const user = useGameStore((s) => s.user);
  const { level, percent } = getXpProgress(user.xp);
  const nextAt = getNextLevelThreshold(user.xp);

  const activeCount = useMemo(
    () => user.activeQuestIds.length,
    [user.activeQuestIds.length],
  );

  return (
    <section className="sim-glass relative rounded-md border border-white/10 p-3 sm:flex sm:items-center sm:justify-between sm:gap-5 sm:p-4">
      <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-center sm:gap-6">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
            Түвшин
          </p>
          <p className="mt-0.5 font-mono text-2xl font-semibold tabular-nums text-zinc-100">
            {level}
          </p>
          <p className="text-[10px] text-zinc-500">
            Дараагийн босго · {nextAt} XP
          </p>
        </div>
        <div className="hidden h-8 w-px bg-white/10 sm:block" />
        <div className="flex-1">
          <div className="flex items-center justify-between text-[10px] font-medium uppercase tracking-wide text-zinc-500">
            <span>XP</span>
            <span className="font-mono tabular-nums">
              {user.xp} · {percent}%
            </span>
          </div>
          <div className="relative mt-1.5 h-1.5 overflow-hidden rounded-full bg-slate-900/90 ring-1 ring-white/10">
            <div
              className="relative h-full overflow-hidden rounded-full bg-sky-500/85 transition-all duration-500"
              style={{ width: `${percent}%` }}
            >
              <span className="xp-bar-shine" />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-3 flex gap-4 border-t border-white/10 pt-3 sm:mt-0 sm:border-l sm:border-t-0 sm:pl-5 sm:pt-0">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
            Нийт XP
          </p>
          <p className="mt-0.5 font-mono text-base font-semibold tabular-nums text-zinc-200">
            {user.xp}
          </p>
        </div>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
            Идэвхтэй
          </p>
          <p className="mt-0.5 font-mono text-base font-semibold tabular-nums text-sky-200">
            {activeCount}
          </p>
        </div>
      </div>
    </section>
  );
}
