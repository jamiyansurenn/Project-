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
        "sim-glass-strong relative overflow-hidden rounded-xl p-5",
        className,
      )}
    >
      <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="relative flex h-20 w-20 items-center justify-center rounded-lg border border-white/10 bg-slate-900/80 text-4xl">
              {avatar?.emoji ?? "🧭"}
            </div>
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded border border-white/15 bg-slate-900/90 px-2 py-0.5 text-[10px] font-semibold text-zinc-200">
              Түв {level}
            </span>
          </div>
          <div>
            <p className="text-lg font-semibold text-zinc-50">{name}</p>
            <p className="text-sm text-zinc-400">{TRAVELER_LABELS[travelerType]}</p>
            <p className="mt-2 text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
              Профайл
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
