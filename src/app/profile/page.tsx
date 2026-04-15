"use client";

import Link from "next/link";
import { useState } from "react";
import { AchievementBadge } from "@/components/profile/AchievementBadge";
import { ProfileSummaryCard } from "@/components/profile/ProfileSummaryCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { useToast } from "@/components/ui/ToastHost";
import { MOCK_QUESTS, getQuestById, getQuestRewardXp } from "@/data/quests";
import {
  ACHIEVEMENTS,
  computeUnlockedAchievements,
} from "@/lib/achievements";
import { getQuestIndex } from "@/store/useGameStore";
import { useGameStore } from "@/store/useGameStore";
import { getLevelFromXp, getNextLevelThreshold } from "@/lib/xp";
import { TRAVELER_LABELS } from "@/types";

export default function ProfilePage() {
  const user = useGameStore((s) => s.user);
  const wallet = useGameStore((s) => s.wallet);
  const ledgerPreview = useGameStore((s) => s.ledgerPreview);
  const resetDemo = useGameStore((s) => s.resetDemo);
  const toast = useToast();
  const [resetting, setResetting] = useState(false);
  const level = getLevelFromXp(user.xp);
  const nextAt = getNextLevelThreshold(user.xp);

  const questsById = getQuestIndex();
  const unlocked = computeUnlockedAchievements({
    xp: user.xp,
    completedQuestIds: user.completedQuestIds,
    questsById,
  });
  const unlockedSet = new Set(unlocked);

  const completedQuests = user.completedQuestIds
    .map((id) => getQuestById(id))
    .filter(Boolean);

  const placesVisited = 3 + user.completedQuestIds.length * 2;

  const handleReset = async () => {
    setResetting(true);
    try {
      await resetDemo();
      toast("Демо төлөв дахин эхэллээ.", "success");
    } catch (error) {
      toast(
        error instanceof Error ? error.message : "Демог дахин эхлүүлэхэд алдаа гарлаа.",
        "info",
      );
    } finally {
      setResetting(false);
    }
  };

  return (
    <div className="mx-auto min-h-full max-w-3xl space-y-10 px-4 py-4 pb-16 md:px-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-zinc-500">
            Профайл
          </p>
          <h1 className="sim-heading mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
            Миний профайл
          </h1>
          <p className="mt-2 max-w-xl text-sm text-zinc-400">
            Таны XP, даалгавар, дэлгүүрийн худалдан авалт бүгд серверт бүртгэгдэнэ.
          </p>
        </div>
        <button
          type="button"
          onClick={handleReset}
          disabled={resetting}
          className="rounded-2xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-zinc-200 transition hover:border-amber-400/40 hover:bg-amber-500/10 disabled:opacity-50"
        >
          {resetting ? "Шинэчилж байна..." : "Демог дахин эхлүүлэх"}
        </button>
      </div>

      <ProfileSummaryCard
        name={user.name}
        avatarId={user.avatarId}
        travelerType={user.travelerType}
        xp={user.xp}
      />

      <section className="grid gap-4 sm:grid-cols-3">
        {[
          {
            label: "Биелүүлсэн даалгавар",
            value: user.completedQuestIds.length,
          },
          { label: "Очсон газрууд", value: placesVisited },
          { label: "XP үлдэгдэл", value: wallet.xpBalance },
        ].map((s) => (
          <div key={s.label} className="game-panel rounded-2xl p-4">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
              {s.label}
            </p>
            <p className="mt-2 bg-gradient-to-r from-amber-200 to-violet-200 bg-clip-text text-2xl font-black text-transparent">
              {s.value}
            </p>
          </div>
        ))}
      </section>

      <section className="game-panel rounded-2xl border border-dashed border-amber-400/35 bg-gradient-to-br from-amber-500/10 via-transparent to-violet-600/10 p-4">
        <p className="text-sm font-bold text-zinc-100">Дараагийн түвшний босго</p>
        <p className="mt-1 text-sm text-zinc-400">
          Таны түвшин: <span className="font-bold text-amber-200">{level}</span>.
          Дараагийн түвшин{" "}
          <span className="font-bold text-violet-200">{nextAt} XP</span> дээр нээгдэнэ. (0 ·
          100 · 250 · 450…)
        </p>
      </section>

      <section className="space-y-4">
        <SectionTitle
          eyebrow="Амжилтууд"
          title="Амжилтын сүлжээ"
          subtitle="Даалгавар дуусах бүрт автоматаар шинэчлэгдэнэ."
        />
        <div className="grid gap-3 sm:grid-cols-2">
          {ACHIEVEMENTS.map((a) => (
            <AchievementBadge
              key={a.id}
              achievement={a}
              unlocked={unlockedSet.has(a.id)}
            />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <SectionTitle title="Дууссан даалгаврууд" />
        {completedQuests.length === 0 ? (
          <p className="game-panel rounded-2xl p-6 text-sm text-zinc-400">
            Одоогоор дууссан даалгавар алга.{" "}
            <Link href="/quests" className="font-bold text-amber-300 hover:text-amber-200">
              Даалгавар
            </Link>{" "}
            руу орж нэгийг дуусгаарай.
          </p>
        ) : (
          <ul className="space-y-3">
            {completedQuests.map((q) =>
              q ? (
                <li
                  key={q.id}
                  className="game-panel flex items-center justify-between rounded-2xl px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-semibold text-zinc-100">{q.title}</p>
                    <p className="text-xs text-zinc-500">{q.location}</p>
                  </div>
                  <span className="text-xs font-bold text-emerald-300">
                    +{getQuestRewardXp(q)} XP
                  </span>
                </li>
              ) : null,
            )}
          </ul>
        )}
      </section>

      <section className="game-panel rounded-2xl p-4 text-xs text-zinc-500">
        <p>
          Демо: {MOCK_QUESTS.length} даалгавар · төрөл{" "}
          <span className="font-semibold text-zinc-300">
            {TRAVELER_LABELS[user.travelerType]}
          </span>
          .
        </p>
      </section>

      <section className="space-y-4">
        <SectionTitle
          eyebrow="XP бүртгэл"
          title="Сүүлийн гүйлгээнүүд"
          subtitle="Даалгавар дуусгах болон дэлгүүрийн худалдан авалт энд түүх болон үлдэнэ."
        />
        {ledgerPreview.length === 0 ? (
          <p className="game-panel rounded-2xl p-4 text-sm text-zinc-500">
            Одоогоор XP гүйлгээ алга.
          </p>
        ) : (
          <ul className="space-y-2">
            {ledgerPreview.map((entry) => (
              <li
                key={entry.id}
                className="game-panel flex items-center justify-between rounded-xl px-3 py-2 text-sm"
              >
                <div>
                  <p className="font-medium text-zinc-100">
                    {entry.note ?? entry.sourceType}
                  </p>
                  <p className="text-xs text-zinc-500">
                    {new Date(entry.createdAt).toLocaleString("mn-MN")}
                  </p>
                </div>
                <span
                  className={
                    entry.delta >= 0
                      ? "font-bold text-emerald-300"
                      : "font-bold text-rose-300"
                  }
                >
                  {entry.delta >= 0 ? `+${entry.delta}` : entry.delta} XP
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="grid gap-3 sm:grid-cols-2">
        <Link
          href="/shop"
          className="game-panel rounded-2xl px-4 py-3 text-sm font-bold text-zinc-100 transition hover:border-amber-400/40 hover:shadow-[0_0_20px_rgba(251,191,36,0.15)]"
        >
          XP дэлгүүр рүү орох
        </Link>
        <Link
          href="/bag"
          className="game-panel rounded-2xl px-4 py-3 text-sm font-bold text-zinc-100 transition hover:border-sky-400/40 hover:shadow-[0_0_20px_rgba(56,189,248,0.15)]"
        >
          Миний цүнх харах
        </Link>
      </section>
    </div>
  );
}
