"use client";

import Link from "next/link";
import { AchievementBadge } from "@/components/profile/AchievementBadge";
import { ProfileSummaryCard } from "@/components/profile/ProfileSummaryCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
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
  const resetDemo = useGameStore((s) => s.resetDemo);
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

  return (
    <div className="space-y-10 pb-8 pt-2">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-600 dark:text-orange-400">
            Миний профайл
          </p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight">Профайл</h1>
          <p className="mt-2 max-w-xl text-sm text-zinc-600 dark:text-zinc-400">
            Энэ демо нь зөвхөн төхөөрөмж дээр хадгалагдана.
          </p>
        </div>
        <button
          type="button"
          onClick={() => resetDemo()}
          className="rounded-2xl border border-zinc-300 px-4 py-2 text-sm font-semibold text-zinc-700 transition hover:border-zinc-400 dark:border-zinc-700 dark:text-zinc-200"
        >
          Демог дахин эхлүүлэх
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
          { label: "Нийт XP", value: user.xp },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-zinc-200/80 bg-white/80 p-4 dark:border-zinc-800/80 dark:bg-zinc-900/60"
          >
            <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              {s.label}
            </p>
            <p className="mt-2 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
              {s.value}
            </p>
          </div>
        ))}
      </section>

      <section className="rounded-2xl border border-dashed border-orange-500/40 bg-orange-500/5 p-4 dark:bg-orange-500/10">
        <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
          Дараагийн түвшний босго
        </p>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Таны түвшин: {level}. Дараагийн түвшин{" "}
          <span className="font-semibold text-zinc-900 dark:text-zinc-100">
            {nextAt} XP
          </span>{" "}
          дээр нээгдэнэ. (0 · 100 · 250 · 450…)
        </p>
      </section>

      <section className="space-y-4">
        <SectionTitle
          eyebrow="Амжилтууд"
          title="Амжилтын тэмдгүүд"
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
          <p className="rounded-2xl border border-zinc-200/80 bg-zinc-50/80 p-6 text-sm text-zinc-600 dark:border-zinc-800/80 dark:bg-zinc-900/40 dark:text-zinc-400">
            Одоогоор дууссан даалгавар алга.{" "}
            <Link
              href="/quests"
              className="font-semibold text-orange-600 dark:text-orange-400"
            >
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
                  className="flex items-center justify-between rounded-2xl border border-zinc-200/80 bg-white/80 px-4 py-3 dark:border-zinc-800/80 dark:bg-zinc-900/60"
                >
                  <div>
                    <p className="text-sm font-medium">{q.title}</p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      {q.location}
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    +{getQuestRewardXp(q)} XP
                  </span>
                </li>
              ) : null,
            )}
          </ul>
        )}
      </section>

      <section className="rounded-2xl border border-zinc-200/80 bg-zinc-50/80 p-4 text-xs text-zinc-500 dark:border-zinc-800/80 dark:bg-zinc-900/40 dark:text-zinc-400">
        <p>
          Демо: {MOCK_QUESTS.length} даалгавар · төрөл{" "}
          <span className="font-semibold text-zinc-700 dark:text-zinc-200">
            {TRAVELER_LABELS[user.travelerType]}
          </span>
          .
        </p>
      </section>
    </div>
  );
}
