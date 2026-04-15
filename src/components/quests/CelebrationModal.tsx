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
    <div className="fixed inset-0 z-[70] flex items-end justify-center bg-slate-950/55 p-4 pb-28 backdrop-blur-md sm:items-center sm:pb-4">
      <div
        className={cn(
          "sim-glass-strong w-full max-w-md overflow-hidden rounded-xl border border-white/15 p-6 text-center text-white shadow-xl",
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
        <div className="mt-5 inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-sky-100">
          <span>+{xpGained} XP</span>
          <span className="text-zinc-400">·</span>
          <span>Түвшний явц шинэчлэгдлээ</span>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="mt-6 w-full rounded-md bg-sky-600 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-500"
        >
          Үргэлжлүүлэх
        </button>
      </div>
    </div>
  );
}
