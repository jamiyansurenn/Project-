"use client";

import { AVATAR_OPTIONS, TRAVELER_LABELS, type TravelerType } from "@/types";
import { XPProgressBar } from "@/components/profile/XPProgressBar";
import { getLevelFromXp } from "@/lib/xp";
import { cn } from "@/lib/cn";

export function ProfileSummaryCard({
  name,
  avatarId,
  travelerType,
  xp,
  className,
}: {
  name: string;
  avatarId: string;
  travelerType: TravelerType;
  xp: number;
  className?: string;
}) {
  const avatar = AVATAR_OPTIONS.find((a) => a.id === avatarId);
  const level = getLevelFromXp(xp);

  return (
    <section
      className={cn(
        "overflow-hidden rounded-3xl border border-zinc-200/80 bg-gradient-to-br from-white via-zinc-50 to-orange-50/60 p-6 shadow-sm dark:border-zinc-800/80 dark:from-zinc-950 dark:via-zinc-900 dark:to-orange-950/40",
        className,
      )}
    >
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-900 text-3xl text-white shadow-lg dark:bg-zinc-100 dark:text-zinc-900">
            {avatar?.emoji ?? "🧭"}
          </div>
          <div>
            <p className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
              {name}
            </p>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              {TRAVELER_LABELS[travelerType]}
            </p>
            <p className="mt-1 inline-flex items-center rounded-full bg-zinc-900 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-200 dark:bg-zinc-100 dark:text-orange-700">
              Аялагч · Түв {level}
            </p>
          </div>
        </div>
        <div className="flex-1">
          <XPProgressBar xp={xp} />
        </div>
      </div>
    </section>
  );
}
