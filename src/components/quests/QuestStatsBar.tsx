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
    <section className="rounded-2xl border border-zinc-200/80 bg-gradient-to-br from-white to-zinc-50 p-4 shadow-sm dark:border-zinc-800/80 dark:from-zinc-900 dark:to-zinc-950 sm:flex sm:items-center sm:justify-between sm:gap-6 sm:p-5">
      <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center sm:gap-8">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Түвшин
          </p>
          <p className="mt-1 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            {level}
          </p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Дараагийн босго · {nextAt} XP
          </p>
        </div>
        <div className="hidden h-10 w-px bg-zinc-200 dark:bg-zinc-800 sm:block" />
        <div className="flex-1">
          <div className="flex items-center justify-between text-[10px] font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            <span>XP</span>
            <span>{user.xp} XP · {percent}%</span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
            <div
              className="h-full rounded-full bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 transition-all duration-500"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>
      </div>
      <div className="mt-4 flex gap-3 border-t border-zinc-200/80 pt-4 sm:mt-0 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0 dark:border-zinc-800/80">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Нийт XP
          </p>
          <p className="mt-1 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            {user.xp}
          </p>
        </div>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Идэвхтэй
          </p>
          <p className="mt-1 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            {activeCount}
          </p>
        </div>
      </div>
    </section>
  );
}
