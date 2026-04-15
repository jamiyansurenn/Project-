import { cn } from "@/lib/cn";

export function MockMapSection({ className }: { className?: string }) {
  return (
    <section
      className={cn(
        "relative overflow-hidden rounded-3xl border border-zinc-200/80 bg-zinc-900 shadow-inner dark:border-zinc-800/80",
        className,
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(251,191,36,0.25),transparent_45%),radial-gradient(circle_at_80%_20%,rgba(56,189,248,0.2),transparent_40%),radial-gradient(circle_at_60%_80%,rgba(244,63,94,0.15),transparent_35%)]" />
      <div className="relative grid min-h-[220px] grid-cols-6 grid-rows-6 gap-1 p-4 sm:min-h-[280px]">
        {Array.from({ length: 36 }).map((_, i) => (
          <div
            key={i}
            className="rounded-sm bg-zinc-800/40 dark:bg-zinc-800/60"
          />
        ))}
        <div className="pointer-events-none absolute left-[18%] top-[22%] flex h-10 w-10 items-center justify-center rounded-full border-2 border-amber-300 bg-amber-400/90 text-xs font-bold text-zinc-950 shadow-lg shadow-amber-500/40">
          UB
        </div>
        <div className="pointer-events-none absolute right-[24%] top-[38%] flex h-9 w-9 items-center justify-center rounded-full border-2 border-sky-300 bg-sky-400/90 text-[10px] font-bold text-zinc-950 shadow-lg">
          GO
        </div>
        <div className="pointer-events-none absolute bottom-[20%] left-[40%] flex h-9 w-9 items-center justify-center rounded-full border-2 border-emerald-300 bg-emerald-400/90 text-[10px] font-bold text-zinc-950 shadow-lg">
          TR
        </div>
      </div>
      <div className="relative border-t border-white/10 bg-zinc-950/80 px-4 py-3 text-xs text-zinc-300 backdrop-blur-sm">
        <p className="font-semibold text-amber-200/90">Демо газрын зураг</p>
        <p className="mt-1 text-[11px] leading-relaxed text-zinc-400">
          Бодит газрын зураг, GPS шалгалт дараагийн хувилбарт нэмэгдэнэ.
        </p>
      </div>
    </section>
  );
}
