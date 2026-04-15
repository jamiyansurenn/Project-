"use client";

import { useMemo } from "react";
import { cn } from "@/lib/cn";
import type { Quest } from "@/data/quests";
import type { QuestStatus } from "@/types";
import { getQuestMapPosition } from "@/data/quest-map-positions";

/** Open-world style parchment base (replace with your own licensed art for production). */
const MAP_TEXTURE_SRC = "/map/open-world-parchment.png";

const statusPinStyle: Record<QuestStatus, string> = {
  available:
    "bg-amber-400 shadow-[0_1px_4px_rgba(0,0,0,0.45)] ring-2 ring-amber-950/20 ring-offset-2 ring-offset-white/90",
  in_progress:
    "bg-sky-500 shadow-[0_1px_4px_rgba(0,0,0,0.45)] ring-2 ring-sky-950/20 ring-offset-2 ring-offset-white/90",
  completed:
    "bg-emerald-500 shadow-[0_1px_4px_rgba(0,0,0,0.45)] ring-2 ring-emerald-950/15 ring-offset-2 ring-offset-white/90",
};

function DecorativeCompass({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "pointer-events-none select-none opacity-[0.92] drop-shadow-md",
        className,
      )}
      aria-hidden
    >
      <svg viewBox="0 0 80 80" className="h-14 w-14 md:h-16 md:w-16" fill="none">
        <circle cx="40" cy="40" r="36" fill="url(#cmpBg)" stroke="#5c4033" strokeWidth="1.2" />
        <path
          d="M40 8 L44 32 L40 28 L36 32 Z"
          fill="#c4a574"
          stroke="#5c4033"
          strokeWidth="0.6"
        />
        <path
          d="M40 72 L36 48 L40 52 L44 48 Z"
          fill="#8b7355"
          stroke="#5c4033"
          strokeWidth="0.6"
        />
        <path
          d="M8 40 L32 36 L28 40 L32 44 Z"
          fill="#a89070"
          stroke="#5c4033"
          strokeWidth="0.6"
        />
        <path
          d="M72 40 L48 44 L52 40 L48 36 Z"
          fill="#a89070"
          stroke="#5c4033"
          strokeWidth="0.6"
        />
        <text
          x="40"
          y="17"
          textAnchor="middle"
          className="fill-[#3d2914] text-[8px] font-serif font-bold"
        >
          N
        </text>
        <circle cx="40" cy="40" r="4" fill="#3d2914" opacity="0.85" />
        <defs>
          <radialGradient id="cmpBg" cx="35%" cy="35%" r="75%">
            <stop offset="0%" stopColor="#f5e6d3" />
            <stop offset="55%" stopColor="#e8d4bc" />
            <stop offset="100%" stopColor="#d4c4a8" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
}

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
      {/* Illustrated parchment map texture */}
      <div className="absolute inset-0 bg-[#e8dcc8]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={MAP_TEXTURE_SRC}
          alt=""
          className="h-full w-full object-cover object-center"
        />
      </div>
      {/* Warm parchment grading + readability */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-amber-100/25 via-transparent to-amber-950/15 mix-blend-multiply"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_75%_at_50%_45%,transparent_0%,rgba(62,48,36,0.12)_55%,rgba(45,36,28,0.35)_100%)]"
        aria-hidden
      />
      {/* Soft «cloud» vignette like open-world map UIs */}
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background: `
            radial-gradient(ellipse 55% 40% at 10% 15%, rgba(255,255,255,0.75) 0%, transparent 50%),
            radial-gradient(ellipse 50% 45% at 90% 12%, rgba(255,255,255,0.65) 0%, transparent 48%),
            radial-gradient(ellipse 60% 50% at 50% 100%, rgba(255,252,248,0.55) 0%, transparent 45%),
            radial-gradient(ellipse 45% 55% at 0% 60%, rgba(255,255,255,0.35) 0%, transparent 40%),
            radial-gradient(ellipse 45% 55% at 100% 55%, rgba(255,255,255,0.35) 0%, transparent 40%)
          `,
        }}
        aria-hidden
      />
      {/* Subtle paper grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.14] mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden
      />

      <DecorativeCompass className="absolute left-2 top-2 z-[6] md:left-3 md:top-3" />

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
                "group relative flex h-4 w-4 items-center justify-center rounded-full transition duration-200",
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
                "pointer-events-none absolute bottom-full left-1/2 z-20 mb-1.5 w-max max-w-[min(240px,70vw)] -translate-x-1/2 rounded-md border border-amber-900/25 bg-[#fdf8f0]/95 px-2.5 py-1.5 text-left text-[11px] text-amber-950 opacity-0 shadow-lg backdrop-blur-[2px] transition duration-150",
                "group-hover:opacity-100 group-focus-within:opacity-100",
              )}
            >
              <p className="font-semibold leading-snug text-amber-950">{quest.title}</p>
              <p className="mt-0.5 text-[10px] leading-snug text-amber-900/70">{quest.location}</p>
            </div>
          </div>
        );
      })}

      <div className="pointer-events-none absolute bottom-3 left-3 z-[7] max-w-[min(240px,88%)] rounded-md border border-amber-900/20 bg-[#fdf8f0]/92 px-2.5 py-1.5 text-[10px] font-medium leading-snug text-amber-950/85 shadow-md backdrop-blur-sm">
        <span className="font-semibold uppercase tracking-wide text-amber-900/70">
          Монголын аялал
        </span>
        <span className="text-amber-800/60"> · демо зураг</span>
      </div>
    </div>
  );
}
