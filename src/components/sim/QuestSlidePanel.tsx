"use client";

import Link from "next/link";
import { useEffect } from "react";
import { getQuestRewardXp, type Quest } from "@/data/quests";
import { cn } from "@/lib/cn";
import type { QuestDifficulty, QuestStatus } from "@/types";

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

export function QuestSlidePanel({
  open,
  quest,
  status,
  onClose,
}: {
  open: boolean;
  quest: Quest | null;
  status: QuestStatus | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!quest || status === null) return null;

  const reward = getQuestRewardXp(quest);

  return (
    <>
      <button
        type="button"
        aria-label="Хаах"
        className={cn(
          "fixed inset-0 z-[55] bg-slate-950/40 backdrop-blur-[2px] transition-opacity md:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={onClose}
      />
      <aside
        className={cn(
          "sim-glass-strong fixed bottom-0 right-0 top-12 z-[60] flex w-full max-w-md flex-col border-l border-white/10 shadow-2xl transition-transform duration-300 ease-out md:top-12",
          open ? "translate-x-0" : "pointer-events-none translate-x-full",
        )}
        aria-hidden={!open}
      >
        <div className="flex items-start justify-between gap-3 border-b border-white/10 px-4 py-3">
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-zinc-500">
              {quest.location}
            </p>
            <h2 className="mt-1 text-lg font-semibold leading-snug text-zinc-50">
              {quest.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-xs font-medium text-zinc-300 transition hover:bg-white/10"
          >
            Хаах
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
          <div className="relative mb-4 aspect-video overflow-hidden rounded-md border border-white/10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={quest.image}
              alt=""
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
          </div>

          <div className="flex flex-wrap gap-2 text-[11px] font-medium">
            <span className="rounded border border-white/10 bg-white/5 px-2 py-0.5 text-zinc-300">
              {difficultyLabel[quest.difficulty]}
            </span>
            <span className="rounded border border-white/10 bg-white/5 px-2 py-0.5 text-zinc-300">
              {statusLabel[status]}
            </span>
            <span className="rounded border border-amber-400/25 bg-amber-500/10 px-2 py-0.5 text-amber-100">
              +{reward} XP
            </span>
            <span className="rounded border border-white/10 px-2 py-0.5 text-zinc-400">
              {quest.duration}
            </span>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-zinc-400">{quest.description}</p>
        </div>

        <div className="border-t border-white/10 p-4">
          <Link
            href={`/quests/${quest.id}`}
            className="flex w-full items-center justify-center rounded-md bg-sky-600/90 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-500"
            onClick={onClose}
          >
            Дэлгэрэнгүй ба үйлдэл
          </Link>
          <p className="mt-2 text-center text-[10px] text-zinc-500">
            Эхлүүлэх, дуусгах зэргийг дэлгэц дээрээс хийнэ.
          </p>
        </div>
      </aside>
    </>
  );
}
