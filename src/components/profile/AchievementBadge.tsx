import type { AchievementDef } from "@/lib/achievements";
import { cn } from "@/lib/cn";

export function AchievementBadge({
  achievement,
  unlocked,
}: {
  achievement: AchievementDef;
  unlocked: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-2xl border p-3 transition",
        unlocked
          ? "border-orange-500/40 bg-orange-500/5 shadow-sm dark:border-orange-500/30"
          : "border-dashed border-zinc-300 bg-zinc-50/50 opacity-70 dark:border-zinc-700 dark:bg-zinc-900/40",
      )}
    >
      <span className="text-2xl">{achievement.icon}</span>
      <div>
        <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
          {achievement.title}
          {!unlocked ? (
            <span className="ml-2 text-[10px] font-medium uppercase tracking-wide text-zinc-400">
              Түгжээтэй
            </span>
          ) : null}
        </p>
        <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
          {achievement.description}
        </p>
      </div>
    </div>
  );
}
