import Link from "next/link";
import { getQuestRewardXp, type Quest } from "@/data/quests";
import type { QuestCategory, QuestDifficulty, QuestStatus } from "@/types";
import { cn } from "@/lib/cn";

const difficultyStyles: Record<
  QuestDifficulty,
  string
> = {
  easy:
    "border-emerald-400/50 bg-emerald-500/20 text-emerald-100 shadow-emerald-500/25",
  medium:
    "border-amber-400/50 bg-amber-500/20 text-amber-100 shadow-amber-500/25",
  hard: "border-rose-400/50 bg-rose-500/20 text-rose-100 shadow-rose-500/25",
};

const statusStyles: Record<QuestStatus, string> = {
  available:
    "border-amber-300/70 bg-gradient-to-r from-amber-500/25 to-yellow-500/15 text-amber-100 shadow-[0_0_16px_rgba(251,191,36,0.45)] ring-1 ring-amber-400/40",
  in_progress:
    "border-sky-400/60 bg-sky-500/20 text-sky-100 shadow-[0_0_14px_rgba(56,189,248,0.4)] ring-1 ring-sky-400/35",
  completed:
    "border-emerald-400/60 bg-emerald-600/20 text-emerald-100 shadow-[0_0_14px_rgba(52,211,153,0.4)] ring-1 ring-emerald-400/35",
};

const statusLabel: Record<QuestStatus, string> = {
  available: "Шинэ",
  in_progress: "Идэвхтэй",
  completed: "Дууссан",
};

const categoryLabel: Record<QuestCategory, string> = {
  food: "Хоол",
  culture: "Соёл",
  nature: "Байгаль",
  challenge: "Сорилт",
};

const categoryIcon: Record<QuestCategory, string> = {
  food: "🍜",
  culture: "🏛️",
  nature: "⛰️",
  challenge: "⚡",
};

const difficultyLabel: Record<QuestDifficulty, string> = {
  easy: "Хялбар",
  medium: "Дунд",
  hard: "Хэцүү",
};

function statusProgress(status: QuestStatus): number {
  if (status === "available") return 8;
  if (status === "in_progress") return 52;
  return 100;
}

export function QuestCard({
  quest,
  status,
}: {
  quest: Quest;
  status: QuestStatus;
}) {
  const rewardXp = getQuestRewardXp(quest);
  const progress = statusProgress(status);

  return (
    <Link
      href={`/quests/${quest.id}`}
      className="group block [perspective:1200px]"
    >
      <article
        className={cn(
          "relative overflow-hidden rounded-2xl border border-violet-500/20 bg-gradient-to-br from-zinc-900/90 via-zinc-950/95 to-indigo-950/90",
          "shadow-[0_12px_40px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.06)]",
          "transition duration-300 ease-out",
          "hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(124,58,237,0.25),0_0_0_1px_rgba(167,139,250,0.25)]",
          "hover:border-violet-400/35",
        )}
      >
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-violet-600/10 via-transparent to-sky-500/5 opacity-0 transition duration-300 group-hover:opacity-100" />

        <div className="relative h-36 overflow-hidden sm:h-40">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={quest.image}
            alt=""
            className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-indigo-900/20" />

          <div className="absolute left-3 top-3 flex items-center gap-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-black/40 text-xl backdrop-blur-md">
              {categoryIcon[quest.category]}
            </span>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-amber-200/90">
                {categoryLabel[quest.category]}
              </p>
              <p className="text-[10px] text-zinc-400">Цуглуулдаг карт</p>
            </div>
          </div>

          <div className="absolute right-3 top-3 flex flex-col items-end gap-2">
            <span
              className={cn(
                "rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide backdrop-blur-md",
                difficultyStyles[quest.difficulty],
              )}
            >
              {difficultyLabel[quest.difficulty]}
            </span>
            <span className="rounded-full border border-amber-400/50 bg-amber-500/25 px-2.5 py-1 text-[11px] font-black text-amber-100 shadow-[0_0_12px_rgba(251,191,36,0.35)]">
              +{rewardXp} XP
            </span>
            <span
              className={cn(
                "rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide backdrop-blur-md",
                statusStyles[status],
              )}
            >
              {statusLabel[status]}
            </span>
          </div>

          <div className="absolute bottom-0 left-0 right-0 px-3 pb-3">
            <div className="mb-2 h-1.5 overflow-hidden rounded-full bg-zinc-800/80 ring-1 ring-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-violet-500 via-amber-400 to-sky-400 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <h3 className="line-clamp-2 text-base font-bold leading-snug text-white drop-shadow-md">
              {quest.title}
            </h3>
          </div>
        </div>

        <div className="space-y-3 border-t border-white/5 p-4">
          <p className="line-clamp-2 text-sm text-zinc-400">{quest.description}</p>
          <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500">
            <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-zinc-300">
              📍 {quest.location}
            </span>
            <span className="text-zinc-500">{quest.duration}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
