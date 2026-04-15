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
        "flex items-start gap-3 rounded-md border p-3 transition duration-200",
        unlocked
          ? "sim-glass border-sky-500/35 hover:border-sky-400/45"
          : "border-dashed border-white/10 bg-slate-950/50 opacity-60",
      )}
    >
      <span
        className={cn(
          "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border text-2xl",
          unlocked
            ? "border-white/15 bg-slate-900/70"
            : "border-white/5 bg-slate-900/50 grayscale",
        )}
      >
        {achievement.icon}
      </span>
      <div>
        <p className="text-sm font-bold text-zinc-50">
          {achievement.title}
          {!unlocked ? (
            <span className="ml-2 text-[10px] font-medium uppercase tracking-wide text-zinc-500">
              Түгжээтэй
            </span>
          ) : null}
        </p>
        <p className="mt-1 text-xs text-zinc-400">{achievement.description}</p>
      </div>
    </div>
  );
}
