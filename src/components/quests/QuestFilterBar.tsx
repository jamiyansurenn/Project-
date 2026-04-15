"use client";

import type { QuestCategory } from "@/types";
import { cn } from "@/lib/cn";

export type StatusFilter = "all" | "available" | "in_progress" | "completed";

const statusTabs: { id: StatusFilter; label: string }[] = [
  { id: "all", label: "Бүгд" },
  { id: "available", label: "Боломжтой" },
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
          className="w-full rounded-2xl border border-zinc-200 bg-white/90 px-4 py-3 text-sm text-zinc-900 shadow-inner outline-none ring-0 transition placeholder:text-zinc-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/30 dark:border-zinc-800 dark:bg-zinc-900/80 dark:text-zinc-50 dark:placeholder:text-zinc-500"
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
                ? "bg-zinc-900 text-white shadow dark:bg-zinc-100 dark:text-zinc-900"
                : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700",
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
                ? "border-orange-500/60 bg-orange-500/10 text-orange-900 dark:text-orange-100"
                : "border-zinc-200 text-zinc-600 hover:border-zinc-300 dark:border-zinc-700 dark:text-zinc-300",
            )}
          >
            {c.label}
          </button>
        ))}
      </div>
    </div>
  );
}
