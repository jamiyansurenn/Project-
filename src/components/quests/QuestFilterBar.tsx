"use client";

import type { QuestCategory } from "@/types";
import { cn } from "@/lib/cn";

export type StatusFilter = "all" | "available" | "in_progress" | "completed";

const statusTabs: { id: StatusFilter; label: string }[] = [
  { id: "all", label: "Бүгд" },
  { id: "available", label: "Шинэ" },
  { id: "in_progress", label: "Идэвхтэй" },
  { id: "completed", label: "Дууссан" },
];

const chips: { id: QuestCategory | "all"; label: string }[] = [
  { id: "all", label: "Бүгд" },
  { id: "food", label: "Хоол" },
  { id: "culture", label: "Соёл" },
  { id: "nature", label: "Байгаль" },
  { id: "challenge", label: "Сорилт" },
];

export function QuestFilterBar({
  statusFilter,
  onStatusChange,
  categoryFilter,
  onCategoryChange,
  search,
  onSearchChange,
}: {
  statusFilter: StatusFilter;
  onStatusChange: (s: StatusFilter) => void;
  categoryFilter: QuestCategory | "all";
  onCategoryChange: (c: QuestCategory | "all") => void;
  search: string;
  onSearchChange: (q: string) => void;
}) {
  return (
    <div className="space-y-4">
      <label className="block">
        <span className="sr-only">Хайх</span>
        <input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Хайх..."
          className="sim-glass w-full rounded-md border border-white/10 px-3 py-2.5 text-sm text-zinc-100 outline-none ring-0 transition placeholder:text-zinc-500 focus:border-sky-500/40 focus:ring-1 focus:ring-sky-500/30"
        />
      </label>
      <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {statusTabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => onStatusChange(t.id)}
            className={cn(
              "whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold transition",
              statusFilter === t.id
                ? "border border-sky-500/40 bg-sky-500/15 text-sky-100"
                : "border border-white/10 bg-white/5 text-zinc-400 hover:border-white/20 hover:bg-white/5 hover:text-zinc-200",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {chips.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => onCategoryChange(c.id)}
            className={cn(
              "rounded-full border px-3 py-1 text-xs font-medium transition",
              categoryFilter === c.id
                ? "border-sky-400/45 bg-sky-500/15 text-sky-100"
                : "border-white/10 text-zinc-400 hover:border-white/15 hover:text-zinc-200",
            )}
          >
            {c.label}
          </button>
        ))}
      </div>
    </div>
  );
}
