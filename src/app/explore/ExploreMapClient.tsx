"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { QuestSlidePanel } from "@/components/sim/QuestSlidePanel";
import { SimulationMapView } from "@/components/sim/SimulationMapView";
import { MOCK_QUESTS } from "@/data/quests";
import { resolveQuestStatus } from "@/lib/quest-status";
import { useGameStore } from "@/store/useGameStore";

export function ExploreMapClient() {
  const user = useGameStore((s) => s.user);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const markers = useMemo(
    () =>
      MOCK_QUESTS.map((quest) => ({
        quest,
        status: resolveQuestStatus(
          quest,
          user.activeQuestIds,
          user.completedQuestIds,
        ),
      })),
    [user.activeQuestIds, user.completedQuestIds],
  );

  const selected = useMemo(
    () => markers.find((m) => m.quest.id === selectedId) ?? null,
    [markers, selectedId],
  );

  return (
    <div className="flex min-h-[calc(100dvh-3rem)] flex-col md:flex-row">
      <div className="relative min-h-[min(560px,62vh)] flex-1 md:min-h-0">
        <div className="absolute inset-0 p-2 md:p-4">
          <SimulationMapView
            markers={markers}
            selectedId={selectedId}
            onSelect={setSelectedId}
            className="h-full border border-white/40 shadow-md md:rounded-xl"
          />
          {/* Зөвлөмж: баруун доод — зүүн дээд талд тэмдэгтэй давхцахгүй */}
          <div className="pointer-events-none absolute bottom-3 right-3 z-20 flex max-w-[min(320px,calc(100%-5rem))] flex-col gap-2 md:bottom-4 md:right-4">
            <p className="sim-glass pointer-events-auto rounded-lg border border-white/15 px-3 py-2.5 text-left text-[11px] leading-relaxed text-zinc-200 shadow-md">
              Цэг дээр дарж товч мэдээлэл харна. Бүтэн дэлгэрэнгүй болон шүүлтүүртэй харахад доорх
              товчийг дарна уу.
            </p>
            <Link
              href="/quests"
              className="sim-glass pointer-events-auto rounded-md border border-sky-400/35 bg-sky-500/15 px-3 py-2.5 text-center text-xs font-semibold text-sky-50 shadow-md transition hover:bg-sky-500/25"
            >
              Даалгаврын шүүлтүүртэй харах →
            </Link>
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
