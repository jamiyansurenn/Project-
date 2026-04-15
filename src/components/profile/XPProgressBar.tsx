"use client";

import { getXpProgress, getNextLevelThreshold } from "@/lib/xp";
import { cn } from "@/lib/cn";

export function XPProgressBar({
  xp,
  className,
}: {
  xp: number;
  className?: string;
}) {
  const { level, percent } = getXpProgress(xp);
  const next = getNextLevelThreshold(xp);

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between text-xs font-medium text-zinc-600 dark:text-zinc-400">
        <span>
          Түвшин {level}
          <span className="text-zinc-400 dark:text-zinc-500"> · </span>
          <span className="text-zinc-500 dark:text-zinc-400">{xp} XP</span>
        </span>
        <span>Дараагийнх · {next} XP</span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
        <div
          className="h-full rounded-full bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 transition-all duration-700"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
