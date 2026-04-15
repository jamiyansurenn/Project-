"use client";

import { QuestCard } from "@/components/quests/QuestCard";
import { MOCK_QUESTS } from "@/data/quests";
import { resolveQuestStatus } from "@/lib/quest-status";
import { useGameStore } from "@/store/useGameStore";

export function ExploreFeaturedQuests() {
  const user = useGameStore((s) => s.user);
  const featured = MOCK_QUESTS.slice(0, 2);

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {featured.map((q) => (
        <QuestCard
          key={q.id}
          quest={q}
          status={resolveQuestStatus(q, user.activeQuestIds, user.completedQuestIds)}
        />
      ))}
    </div>
  );
}
