"use client";

import { useMemo, useState } from "react";
import { QuestFilterBar, type StatusFilter } from "@/components/quests/QuestFilterBar";
import { QuestStatsBar } from "@/components/quests/QuestStatsBar";
import { EmptyState } from "@/components/ui/EmptyState";
import { QuestSlidePanel } from "@/components/sim/QuestSlidePanel";
import { SimulationMapView } from "@/components/sim/SimulationMapView";
import { MOCK_QUESTS } from "@/data/quests";
import { resolveQuestStatus } from "@/lib/quest-status";
import { useGameStore } from "@/store/useGameStore";
import type { QuestCategory } from "@/types";

function matchesSearch(text: string, q: string): boolean {
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
  const [selectedId, setSelectedId] = useState<string | null>(null);

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

  const selected = useMemo(
    () => quests.find((q) => q.quest.id === selectedId) ?? null,
    [quests, selectedId],
  );

  return (
    <div className="flex min-h-[calc(100dvh-3rem)] flex-col md:flex-row">
      <div className="relative min-h-[min(520px,58vh)] flex-1 md:min-h-0">
        <div className="absolute inset-0 p-2 md:p-4">
          <SimulationMapView
            markers={quests}
            selectedId={selectedId}
            onSelect={setSelectedId}
            className="h-full border border-white/40 shadow-md md:rounded-xl"
          />

          {/* Шүүлтүүр: баруун дээд — зүүн дээд талд газрын зурагны тэмдэгтэй давхцахгүй */}
          <div className="pointer-events-none absolute inset-2 z-20 flex flex-col items-end gap-2 md:inset-4">
            <div className="pointer-events-auto w-full max-w-md md:max-w-sm">
              <div className="sim-glass rounded-lg border border-white/15 p-3 shadow-md">
                <QuestFilterBar
                  statusFilter={statusFilter}
                  onStatusChange={setStatusFilter}
                  categoryFilter={categoryFilter}
                  onCategoryChange={setCategoryFilter}
                  search={search}
                  onSearchChange={setSearch}
                />
              </div>
            </div>
          </div>

          {quests.length === 0 ? (
            <div className="pointer-events-auto absolute left-1/2 top-[38%] z-30 w-[calc(100%-1.5rem)] max-w-md -translate-x-1/2 md:top-[35%]">
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
                    className="rounded-md border border-sky-400/40 bg-sky-500/15 px-4 py-2 text-sm font-semibold text-sky-100 transition hover:bg-sky-500/25"
                  >
                    Цэвэрлэх
                  </button>
                }
              />
            </div>
          ) : null}

          {/* Статистик: доод — гар утас дээр бүтэн өргөн */}
          <div className="pointer-events-none absolute inset-x-2 bottom-2 z-20 md:inset-x-4 md:bottom-4">
            <div className="pointer-events-auto mx-auto w-full max-w-lg md:mx-0 md:max-w-md">
              <QuestStatsBar />
            </div>
          </div>
        </div>
      </div>

      <QuestSlidePanel
        open={Boolean(selected)}
        quest={selected?.quest ?? null}
        status={selected?.status ?? null}
        onClose={() => setSelectedId(null)}
      />
    </div>
  );
}
