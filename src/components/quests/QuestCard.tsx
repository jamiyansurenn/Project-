import Link from "next/link";
import { getQuestRewardXp, type Quest } from "@/data/quests";
import type { QuestCategory, QuestDifficulty, QuestStatus } from "@/types";
import { cn } from "@/lib/cn";

const difficultyStyles: Record<
  QuestDifficulty,
  string
> = {
  easy:
    "bg-emerald-500/15 text-emerald-800 ring-emerald-500/25 dark:text-emerald-200",
  medium:
    "bg-amber-500/15 text-amber-900 ring-amber-500/25 dark:text-amber-100",
  hard: "bg-rose-500/15 text-rose-900 ring-rose-500/25 dark:text-rose-100",
};

const statusStyles: Record<QuestStatus, string> = {
  available:
    "bg-sky-500/15 text-sky-900 ring-sky-500/20 dark:text-sky-100",
  in_progress:
    "bg-violet-500/15 text-violet-900 ring-violet-500/25 dark:text-violet-100",
  completed:
    "bg-emerald-600/15 text-emerald-900 ring-emerald-600/25 dark:text-emerald-100",
};

const statusLabel: Record<QuestStatus, string> = {
  available: "Боломжтой",
  in_progress: "Идэвхтэй",
  completed: "Дууссан",
};

const categoryLabel: Record<QuestCategory, string> = {
  food: "Хоол",
  culture: "Соёл",
  nature: "Байгаль",
  challenge: "Сорилт",
};

const difficultyLabel: Record<QuestDifficulty, string> = {
  easy: "Хялбар",
  medium: "Дунд",
  hard: "Хэцүү",
};

export function QuestCard({
  quest,
  status,
}: {
  quest: Quest;
  status: QuestStatus;
}) {
  const rewardXp = getQuestRewardXp(quest);
  return (
    <Link
      href={`/quests/${quest.id}`}
      className="group block overflow-hidden rounded-2xl border border-zinc-200/80 bg-white/90 shadow-sm transition hover:-translate-y-0.5 hover:border-orange-300/70 hover:shadow-lg dark:border-zinc-800/80 dark:bg-zinc-900/70 dark:hover:border-orange-500/40"
    >
      <div className="relative h-36 overflow-hidden sm:h-40">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={quest.image}
          alt=""
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/20 to-transparent" />
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          <span
            className={cn(
              "rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ring-1 ring-inset backdrop-blur-md",
              difficultyStyles[quest.difficulty],
            )}
          >
            {difficultyLabel[quest.difficulty]}
          </span>
          <span
            className={cn(
              "rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ring-1 ring-inset backdrop-blur-md",
              statusStyles[status],
            )}
          >
            {statusLabel[status]}
          </span>
        </div>
        <div className="absolute bottom-3 left-3 right-3">
          <p className="text-[10px] font-medium uppercase tracking-wider text-amber-200/90">
            {categoryLabel[quest.category]}
          </p>
          <h3 className="mt-1 line-clamp-2 text-base font-semibold text-white">
            {quest.title}
          </h3>
        </div>
      </div>
      <div className="space-y-3 p-4">
        <p className="line-clamp-2 text-sm text-zinc-600 dark:text-zinc-400">
          {quest.description}
        </p>
        <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
          <span className="inline-flex items-center gap-1 rounded-full bg-zinc-100 px-2 py-0.5 dark:bg-zinc-800">
            📍 {quest.location}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/15 px-2 py-0.5 font-semibold text-amber-900 dark:text-amber-100">
            +{rewardXp} XP
          </span>
          <span>{quest.duration}</span>
        </div>
      </div>
    </Link>
  );
}
