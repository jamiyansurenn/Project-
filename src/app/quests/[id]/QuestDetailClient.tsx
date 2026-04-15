"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getQuestRewardXp, type Quest } from "@/data/quests";
import { CelebrationModal } from "@/components/quests/CelebrationModal";
import { useToast } from "@/components/ui/ToastHost";
import { resolveQuestStatus } from "@/lib/quest-status";
import { useGameStore } from "@/store/useGameStore";
import type { QuestDifficulty, QuestStatus } from "@/types";
import { cn } from "@/lib/cn";

const difficultyRing: Record<QuestDifficulty, string> = {
  easy: "ring-emerald-400/60",
  medium: "ring-amber-400/60",
  hard: "ring-rose-400/60",
};

const difficultyLabel: Record<QuestDifficulty, string> = {
  easy: "Хялбар",
  medium: "Дунд",
  hard: "Хэцүү",
};

const statusLabel: Record<QuestStatus, string> = {
  available: "Боломжтой",
  in_progress: "Идэвхтэй",
  completed: "Дууссан",
};

export function QuestDetailClient({ quest }: { quest: Quest }) {
  const router = useRouter();
  const toast = useToast();
  const user = useGameStore((s) => s.user);
  const startQuest = useGameStore((s) => s.startQuest);
  const completeQuest = useGameStore((s) => s.completeQuest);
  const rewardXp = useMemo(() => getQuestRewardXp(quest), [quest]);

  const status: QuestStatus = useMemo(
    () => resolveQuestStatus(quest, user.activeQuestIds, user.completedQuestIds),
    [quest, user.activeQuestIds, user.completedQuestIds],
  );

  const [celebrate, setCelebrate] = useState(false);
  const [photoMock, setPhotoMock] = useState(false);
  const [gpsMock, setGpsMock] = useState(false);

  const handleStart = () => {
    startQuest(quest.id);
    toast("Даалгавар эхэллээ.", "info");
  };

  const handleComplete = () => {
    if (status !== "in_progress") {
      toast("Эхлээд даалгавраа эхлүүлнэ үү.", "info");
      return;
    }
    if (!photoMock || !gpsMock) {
      toast("Нотлох баримт нэмнэ үү: Фото + GPS.", "info");
      return;
    }
    completeQuest(quest.id, rewardXp);
    setCelebrate(true);
    toast(`🎉 Та даалгаврыг амжилттай биелүүллээ! +${rewardXp} XP`, "success");
  };

  return (
    <div className="space-y-8 pb-8">
      <div className="relative overflow-hidden rounded-3xl ring-2 ring-offset-2 ring-offset-zinc-50 dark:ring-offset-zinc-950 sm:ring-offset-4">
        <div
          className={cn(
            "rounded-3xl ring-2 ring-inset",
            difficultyRing[quest.difficulty],
          )}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={quest.image}
            alt=""
            className="h-48 w-full object-cover sm:h-64"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-200/90">
              {quest.location}
            </p>
            <h1 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
              {quest.title}
            </h1>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 text-xs font-medium">
        <span className="rounded-full bg-zinc-100 px-3 py-1 capitalize text-zinc-800 dark:bg-zinc-800 dark:text-zinc-100">
          Түвшин: {difficultyLabel[quest.difficulty]}
        </span>
        <span className="rounded-full bg-amber-500/15 px-3 py-1 font-semibold text-amber-900 dark:text-amber-100">
          +{rewardXp} XP
        </span>
        <span className="rounded-full bg-zinc-100 px-3 py-1 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
          {quest.duration}
        </span>
        <span
          className={cn(
            "rounded-full px-3 py-1 ring-1 ring-inset",
            status === "completed" &&
              "bg-emerald-500/15 text-emerald-900 ring-emerald-500/30 dark:text-emerald-100",
            status === "in_progress" &&
              "bg-violet-500/15 text-violet-900 ring-violet-500/30 dark:text-violet-100",
            status === "available" &&
              "bg-sky-500/15 text-sky-900 ring-sky-500/30 dark:text-sky-100",
          )}
        >
          {statusLabel[status]}
        </span>
      </div>

      <section className="rounded-2xl border border-zinc-200/80 bg-white/80 p-5 dark:border-zinc-800/80 dark:bg-zinc-900/60">
        <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
          Тайлбар
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          {quest.description}
        </p>
        <p className="mt-4 border-l-2 border-amber-400/80 pl-4 text-sm italic leading-relaxed text-zinc-700 dark:text-zinc-300">
          {quest.loreText}
        </p>
      </section>

      <section>
        <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
          Даалгаврын алхмууд
        </h2>
        <ol className="mt-3 space-y-3">
          {quest.steps.map((s, i) => (
            <li
              key={s.id}
              className="flex gap-3 rounded-2xl border border-zinc-200/80 bg-zinc-50/80 p-4 dark:border-zinc-800/80 dark:bg-zinc-900/40"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-xs font-bold text-white dark:bg-zinc-100 dark:text-zinc-900">
                {i + 1}
              </span>
              <div className="flex-1">
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                  {s.title}
                </p>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                  {s.detail}
                </p>
              </div>
              <span className="shrink-0 self-start rounded-full bg-amber-500/15 px-2.5 py-1 text-[10px] font-semibold text-amber-900 dark:text-amber-100">
                +{s.xp} XP
              </span>
            </li>
          ))}
        </ol>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-4 dark:bg-emerald-500/10">
          <h3 className="text-sm font-semibold text-emerald-900 dark:text-emerald-100">
            Шагнал
          </h3>
          <p className="mt-2 text-sm text-emerald-900/80 dark:text-emerald-100/90">
            {rewardXp} XP авч, профайл дээрээ нэмнэ. (Демо)
          </p>
        </div>
        <div className="rounded-2xl border border-zinc-200/80 bg-white/80 p-4 dark:border-zinc-800/80 dark:bg-zinc-900/60">
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
            Нотлох баримт
          </h3>
          <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
            Одоогоор демо — зураг болон GPS-ийг асааж/унтраана.
          </p>
          <button
            type="button"
            onClick={() => setPhotoMock((v) => !v)}
            className={cn(
              "mt-3 flex w-full items-center justify-between rounded-xl border px-3 py-2 text-left text-sm transition",
              photoMock
                ? "border-emerald-500/50 bg-emerald-500/10"
                : "border-dashed border-zinc-300 hover:border-zinc-400 dark:border-zinc-600",
            )}
          >
            <span>📷 Зураг оруулах</span>
            <span className="text-xs font-semibold text-zinc-500">
              {photoMock ? "Бэлэн" : "Демо"}
            </span>
          </button>
          <button
            type="button"
            onClick={() => setGpsMock((v) => !v)}
            className={cn(
              "mt-2 flex w-full items-center justify-between rounded-xl border px-3 py-2 text-left text-sm transition",
              gpsMock
                ? "border-sky-500/50 bg-sky-500/10"
                : "border-dashed border-zinc-300 hover:border-zinc-400 dark:border-zinc-600",
            )}
          >
            <span>📍 GPS шалгалт</span>
            <span className="text-xs font-semibold text-zinc-500">
              {gpsMock ? "Баталгаажсан" : "Демо"}
            </span>
          </button>
        </div>
      </section>

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={handleStart}
          disabled={status === "completed" || status === "in_progress"}
          className="flex-1 rounded-2xl bg-zinc-900 py-3 text-sm font-semibold text-white transition enabled:hover:-translate-y-0.5 enabled:hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-zinc-100 dark:text-zinc-900 dark:enabled:hover:bg-white"
        >
          {status === "completed"
            ? "Дууссан"
            : status === "in_progress"
              ? "Идэвхтэй"
              : "Эхлүүлэх"}
        </button>
        <button
          type="button"
          onClick={handleComplete}
          disabled={status === "completed"}
          className="flex-1 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 py-3 text-sm font-semibold text-zinc-950 shadow-lg shadow-orange-500/25 transition enabled:hover:-translate-y-0.5 enabled:hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {status === "completed" ? "Дууссан" : "Дуусгах"}
        </button>
      </div>

      <Link
        href="/quests"
        className="inline-flex text-sm font-medium text-orange-600 hover:text-orange-500 dark:text-orange-400"
      >
        ← Буцах
      </Link>

      <CelebrationModal
        open={celebrate}
        title="🎉 Та даалгаврыг амжилттай биелүүллээ!"
        subtitle="XP нэмэгдэж, түвшний явц шинэчлэгдлээ."
        xpGained={rewardXp}
        onClose={() => {
          setCelebrate(false);
          router.push("/quests");
        }}
      />
    </div>
  );
}
