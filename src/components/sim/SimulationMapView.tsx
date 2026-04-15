"use client";

import { useMemo } from "react";
import { cn } from "@/lib/cn";
import type { Quest } from "@/data/quests";
import type { QuestStatus } from "@/types";
import { getQuestMapPosition } from "@/data/quest-map-positions";

const statusPinStyle: Record<QuestStatus, string> = {
  available:
    "bg-amber-400 shadow-md ring-2 ring-white ring-offset-2 ring-offset-emerald-800/30",
  in_progress:
    "bg-sky-500 shadow-md ring-2 ring-white ring-offset-2 ring-offset-emerald-800/30",
  completed:
    "bg-emerald-500 shadow-md ring-2 ring-white/95 ring-offset-2 ring-offset-emerald-800/30",
};

export function SimulationMapView({
  markers,
  selectedId,
  onSelect,
  className,
}: {
  markers: { quest: Quest; status: QuestStatus }[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  className?: string;
}) {
  const sorted = useMemo(
    () => [...markers].sort((a, b) => a.quest.id.localeCompare(b.quest.id)),
    [markers],
  );

  return (
    <div
      className={cn(
        "relative h-full min-h-[280px] w-full overflow-hidden rounded-none shadow-md md:rounded-xl",
        className,
      )}
    >
      {/* Bright terrain: sky → distant hills → near fields */}
      <div
        className="absolute inset-0"
        aria-hidden
        style={{
          background: `
            radial-gradient(ellipse 100% 70% at 50% -5%, rgba(255,255,255,0.55) 0%, transparent 42%),
            radial-gradient(ellipse 85% 50% at 20% 100%, rgba(74, 124, 89, 0.45) 0%, transparent 50%),
            radial-gradient(ellipse 80% 45% at 85% 95%, rgba(90, 130, 100, 0.4) 0%, transparent 48%),
            radial-gradient(ellipse 90% 40% at 50% 110%, rgba(55, 95, 72, 0.35) 0%, transparent 55%),
            linear-gradient(185deg,
              #cfe9f5 0%,
              #a8d4e6 18%,
              #8ec5bf 38%,
              #6ba882 58%,
              #4d8a63 78%,
              #3d6e4f 100%
            )
          `,
        }}
      />
      {/* Soft atmospheric haze (not dark) */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/25 via-transparent to-emerald-950/20"
        aria-hidden
      />
      {/* Light topo grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.35) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.22) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
        aria-hidden
      />

      {sorted.map(({ quest, status }) => {
        const pos = getQuestMapPosition(quest.id);
        const active = selectedId === quest.id;
        return (
          <div
            key={quest.id}
            className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
            style={{ left: pos.left, top: pos.top }}
          >
            <button
              type="button"
              onClick={() => onSelect(active ? null : quest.id)}
              className={cn(
                "group relative flex h-3.5 w-3.5 items-center justify-center rounded-full transition duration-200",
                statusPinStyle[status],
                active && "scale-125",
                "hover:scale-125 hover:brightness-105",
              )}
              aria-label={quest.title}
              aria-pressed={active}
            >
              <span className="sr-only">{quest.title}</span>
            </button>
            <div
              className={cn(
                "pointer-events-none absolute bottom-full left-1/2 z-20 mb-1.5 w-max max-w-[min(240px,70vw)] -translate-x-1/2 rounded-lg border border-slate-200/90 bg-white/95 px-2.5 py-1.5 text-left text-[11px] text-slate-700 opacity-0 shadow-lg backdrop-blur-sm transition duration-150",
                "group-hover:opacity-100 group-focus-within:opacity-100",
              )}
            >
              <p className="font-semibold leading-snug text-slate-900">{quest.title}</p>
              <p className="mt-0.5 text-[10px] leading-snug text-slate-500">{quest.location}</p>
            </div>
          </div>
        );
      })}

      <div className="pointer-events-none absolute left-3 top-3 z-[5] max-w-[min(220px,80%)] rounded-lg border border-white/60 bg-white/85 px-2.5 py-1.5 text-[10px] font-medium leading-snug text-slate-600 shadow-sm backdrop-blur-sm">
        <span className="font-semibold uppercase tracking-wide text-slate-500">
          Газрын зураг
        </span>
        <span className="text-slate-400"> · демо</span>
      </div>
    </div>
  );
}
