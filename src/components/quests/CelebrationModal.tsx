"use client";

import { cn } from "@/lib/cn";

export function CelebrationModal({
  open,
  title,
  subtitle,
  xpGained,
  onClose,
}: {
  open: boolean;
  title: string;
  subtitle: string;
  xpGained: number;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center bg-black/50 p-4 pb-28 backdrop-blur-sm sm:items-center sm:pb-4">
      <div
        className={cn(
          "w-full max-w-md overflow-hidden rounded-3xl border border-amber-400/40 bg-gradient-to-br from-zinc-950 via-zinc-900 to-orange-950 p-6 text-center text-white shadow-2xl shadow-orange-500/30",
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby="celebration-title"
      >
        <div className="pointer-events-none text-4xl">🎉</div>
        <h2
          id="celebration-title"
          className="mt-3 text-xl font-bold tracking-tight"
        >
          {title}
        </h2>
        <p className="mt-2 text-sm text-zinc-200">{subtitle}</p>
        <div className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-2 text-sm font-semibold text-amber-200 ring-1 ring-white/20">
          <span>+{xpGained} XP</span>
          <span className="text-zinc-400">·</span>
          <span>Түвшний явц шинэчлэгдлээ</span>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="mt-6 w-full rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 py-3 text-sm font-semibold text-zinc-950 transition hover:brightness-110"
        >
          Үргэлжлүүлэх
        </button>
      </div>
    </div>
  );
}
