"use client";

import { useMemo, useState } from "react";
import { QuestCard } from "@/components/quests/QuestCard";
import {
  QuestFilterBar,
  type StatusFilter,
} from "@/components/quests/QuestFilterBar";
import { QuestStatsBar } from "@/components/quests/QuestStatsBar";
import { EmptyState } from "@/components/ui/EmptyState";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { MOCK_QUESTS } from "@/data/quests";
import { resolveQuestStatus } from "@/lib/quest-status";
import { useGameStore } from "@/store/useGameStore";
import type { QuestCategory } from "@/types";
import Link from "next/link";

function matchesSearch(
  text: string,
  q: string,
): boolean {
  if (!q.trim()) return true;
  return text.toLowerCase().includes(q.trim().toLowerCase());
}

export function QuestsClient() {
  const user = useGameStore((s) => s.user);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [categoryFilter, setCategoryFilter] = useState<QuestCategory | "all">(
    "all",
  );
  const [search, setSearch] = useState("");

  const quests = useMemo(() => {
    return MOCK_QUESTS.map((quest) => {
      const status = resolveQuestStatus(
        quest,
        user.activeQuestIds,
        user.completedQuestIds,
      );
      return { quest, status };
    }).filter(({ quest, status }) => {
      if (statusFilter !== "all" && status !== statusFilter) return false;
      if (categoryFilter !== "all" && quest.category !== categoryFilter)
        return false;
      const blob = `${quest.title} ${quest.description} ${quest.location} ${quest.loreText}`;
      if (!matchesSearch(blob, search)) return false;
      return true;
    });
  }, [
    user.activeQuestIds,
    user.completedQuestIds,
    statusFilter,
    categoryFilter,
    search,
  ]);

  return (
    <div className="space-y-8 pb-8 pt-2">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-600 dark:text-orange-400">
          Даалгаврууд
        </p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight">
          Даалгаврууд
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-zinc-600 dark:text-zinc-400">
          Төлөв, төрөл, эсвэл түлхүүр үгээр шүүж үзээрэй.
        </p>
      </div>

      <QuestStatsBar />

      <QuestFilterBar
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        categoryFilter={categoryFilter}
        onCategoryChange={setCategoryFilter}
        search={search}
        onSearchChange={setSearch}
      />

      {quests.length === 0 ? (
        <EmptyState
          title="Илэрц олдсонгүй"
          description="Шүүлтээ өөрчилж эсвэл хайлтаа цэвэрлээд дахин үзээрэй."
          action={
            <button
              type="button"
              onClick={() => {
                setStatusFilter("all");
                setCategoryFilter("all");
                setSearch("");
              }}
              className="rounded-2xl bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white dark:bg-zinc-100 dark:text-zinc-900"
            >
              Цэвэрлэх
            </button>
          }
        />
      ) : (
        <section className="space-y-4">
          <SectionTitle title="Даалгаврын жагсаалт" />
          <div className="grid gap-4 sm:grid-cols-2">
            {quests.map(({ quest, status }) => (
              <QuestCard key={quest.id} quest={quest} status={status} />
            ))}
          </div>
        </section>
      )}

      {!user.onboarded ? (
        <p className="text-center text-xs text-zinc-500 dark:text-zinc-400">
          Зөвлөмж:{" "}
          <Link href="/onboarding" className="font-semibold text-orange-600 dark:text-orange-400">
            эхлэх
          </Link>{" "}
          хэсгийг бөглөвөл профайл тань тохирно.
        </p>
      ) : null}
    </div>
  );
}
