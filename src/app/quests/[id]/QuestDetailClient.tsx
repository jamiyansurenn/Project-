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
  easy: "ring-emerald-500/40",
  medium: "ring-amber-500/40",
  hard: "ring-rose-500/40",
};

const difficultyLabel: Record<QuestDifficulty, string> = {
  easy: "Хялбар",
  medium: "Дунд",
  hard: "Хэцүү",
};

const statusLabel: Record<QuestStatus, string> = {
  available: "Шинэ",
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
  const [pending, setPending] = useState(false);

  const handleStart = async () => {
    setPending(true);
    try {
      const message = await startQuest(quest.id);
      toast(message, "info");
    } catch (error) {
      toast(
        error instanceof Error ? error.message : "Даалгавар эхлүүлэхэд алдаа гарлаа.",
        "info",
      );
    } finally {
      setPending(false);
    }
  };

  const handleComplete = async () => {
    if (status !== "in_progress") {
      toast("Эхлээд даалгавраа эхлүүлнэ үү.", "info");
      return;
    }
    if (!photoMock || !gpsMock) {
      toast("Нотлох баримт нэмнэ үү: Фото + GPS.", "info");
      return;
    }
    setPending(true);
    try {
      const message = await completeQuest(quest.id, {
        proofPhoto: photoMock,
        proofGps: gpsMock,
      });
      setCelebrate(true);
      toast(message, "success");
    } catch (error) {
      toast(
        error instanceof Error ? error.message : "Даалгавар дуусгахад алдаа гарлаа.",
        "info",
      );
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="h-full space-y-6 overflow-y-auto px-4 py-4 pb-24 md:px-6">
      <div className="relative overflow-hidden rounded-lg border border-white/10 shadow-sm">
        <div
          className={cn(
            "rounded-lg ring-1 ring-inset",
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
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-300">
              {quest.location}
            </p>
            <h1 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
              {quest.title}
            </h1>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 text-xs font-semibold">
        <span className="game-panel rounded-full px-3 py-1 text-zinc-200">
          Түвшин: {difficultyLabel[quest.difficulty]}
        </span>
        <span className="rounded-full border border-sky-500/35 bg-sky-500/15 px-3 py-1 font-semibold text-sky-100">
          +{rewardXp} XP
        </span>
        <span className="game-panel rounded-full px-3 py-1 text-zinc-300">
          {quest.duration}
        </span>
        <span
          className={cn(
            "rounded-full px-3 py-1 font-bold ring-1 ring-inset backdrop-blur-sm",
            status === "completed" &&
              "border border-emerald-500/40 bg-emerald-500/15 text-emerald-100",
            status === "in_progress" &&
              "border border-sky-500/40 bg-sky-500/15 text-sky-100",
            status === "available" &&
              "border border-amber-500/40 bg-amber-500/10 text-amber-100",
          )}
        >
          {statusLabel[status]}
        </span>
      </div>

      <section className="sim-glass rounded-md p-4">
        <h2 className="text-sm font-semibold text-zinc-200">Тайлбар</h2>
        <p className="mt-2 text-sm leading-relaxed text-zinc-400">
          {quest.description}
        </p>
        <p className="mt-4 border-l-2 border-sky-500/40 pl-4 text-sm italic leading-relaxed text-zinc-400">
          {quest.loreText}
        </p>
      </section>

      <section>
        <h2 className="text-sm font-bold text-zinc-100">Даалгаврын алхмууд</h2>
        <ol className="mt-3 space-y-3">
          {quest.steps.map((s, i) => (
            <li
              key={s.id}
              className="sim-glass flex gap-3 rounded-md p-3 transition hover:border-sky-400/25"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-slate-800 text-xs font-semibold text-zinc-200">
                {i + 1}
              </span>
              <div className="flex-1">
                <p className="text-sm font-semibold text-zinc-100">{s.title}</p>
                <p className="mt-1 text-sm text-zinc-500">{s.detail}</p>
              </div>
              <span className="shrink-0 self-start rounded-full border border-sky-500/30 bg-sky-500/10 px-2.5 py-1 text-[10px] font-semibold text-sky-100">
                +{s.xp ?? 0} XP
              </span>
            </li>
          ))}
        </ol>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <div className="sim-glass rounded-md border border-emerald-500/25 p-4">
          <h3 className="text-sm font-semibold text-emerald-200">Шагнал</h3>
          <p className="mt-2 text-sm text-emerald-100/90">
            {rewardXp} XP авч, профайл дээрээ нэмнэ. (Демо)
          </p>
        </div>
        <div className="sim-glass rounded-md p-4">
          <h3 className="text-sm font-semibold text-zinc-200">Нотлох баримт</h3>
          <p className="mt-2 text-xs text-zinc-500">
            Одоогоор демо — зураг болон GPS-ийг асааж/унтраана.
          </p>
          <button
            type="button"
            onClick={() => setPhotoMock((v) => !v)}
            className={cn(
              "mt-3 flex w-full items-center justify-between rounded-md border px-3 py-2 text-left text-sm text-zinc-200 transition",
              photoMock
                ? "border-emerald-500/50 bg-emerald-500/15"
                : "border-dashed border-white/20 hover:border-emerald-400/40",
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
              "mt-2 flex w-full items-center justify-between rounded-md border px-3 py-2 text-left text-sm text-zinc-200 transition",
              gpsMock
                ? "border-sky-500/50 bg-sky-500/15"
                : "border-dashed border-white/20 hover:border-sky-400/40",
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
          disabled={pending || status === "completed" || status === "in_progress"}
          className="flex-1 rounded-md border border-white/15 bg-slate-900/80 py-2.5 text-sm font-semibold text-zinc-100 transition enabled:hover:border-sky-500/40 enabled:hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
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
          disabled={pending || status === "completed"}
          className="flex-1 rounded-md bg-sky-600 py-2.5 text-sm font-semibold text-white transition enabled:hover:bg-sky-500 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {status === "completed" ? "Дууссан" : "Дуусгах"}
        </button>
      </div>

      <Link
        href="/quests"
        className="inline-flex text-sm font-medium text-sky-300 transition hover:text-sky-200"
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
