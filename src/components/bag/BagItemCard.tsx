import { cn } from "@/lib/cn";
import type { InventoryEntry } from "@/store/useGameStore";

export function BagItemCard({ entry }: { entry: InventoryEntry }) {
  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-sky-500/20 bg-gradient-to-br from-zinc-900/95 via-zinc-950/95 to-slate-950/90 p-4",
        "shadow-[0_10px_32px_rgba(0,0,0,0.38),inset_0_1px_0_rgba(255,255,255,0.05)]",
        "transition duration-300 hover:-translate-y-0.5 hover:border-sky-400/35 hover:shadow-[0_14px_36px_rgba(14,165,233,0.15)]",
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-sky-500/5 via-transparent to-violet-600/10 opacity-0 transition group-hover:opacity-100" />
      <div className="relative flex items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-zinc-50">{entry.item.name}</h3>
          <p className="mt-1 text-xs text-zinc-400">{entry.item.description}</p>
        </div>
        <span className="rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-xs font-semibold text-sky-100">
          x{entry.quantity}
        </span>
      </div>
      <div className="relative mt-3 flex items-center justify-between text-xs text-zinc-500">
        <span>{entry.item.priceXp} XP</span>
        <span>{new Date(entry.acquiredAt).toLocaleDateString("mn-MN")}</span>
      </div>
    </article>
  );
}
