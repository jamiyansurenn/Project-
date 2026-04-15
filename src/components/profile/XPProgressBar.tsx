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
      <div className="flex items-center justify-between text-xs font-semibold text-zinc-400">
        <span>
          Түвшин <span className="font-mono text-sky-200">{level}</span>
          <span className="text-zinc-600"> · </span>
          <span className="font-mono text-zinc-500">{xp} XP</span>
        </span>
        <span className="text-zinc-500">Дараагийнх · {next} XP</span>
      </div>
      <div className="relative h-2.5 overflow-hidden rounded-full bg-slate-900 ring-1 ring-white/10">
        <div
          className="relative h-full overflow-hidden rounded-full bg-sky-500/85 transition-all duration-700"
          style={{ width: `${percent}%` }}
        >
          <span className="xp-bar-shine" />
        </div>
      </div>
    </div>
  );
}
