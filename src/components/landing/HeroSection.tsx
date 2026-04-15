import Link from "next/link";
import { cn } from "@/lib/cn";

export function HeroSection({ className }: { className?: string }) {
  return (
    <section
      className={cn(
        "relative overflow-hidden rounded-3xl border border-zinc-200/80 bg-gradient-to-br from-zinc-950 via-zinc-900 to-orange-950 px-6 py-12 text-white shadow-xl dark:border-zinc-800/80 sm:px-10 sm:py-16",
        className,
      )}
    >
      <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-orange-500/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-16 h-72 w-72 rounded-full bg-amber-400/20 blur-3xl" />
      <div className="relative max-w-xl">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-200/90">
          Монголын адал явдал
        </p>
        <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
          Аяллаа{" "}
          <span className="bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
            тоглоом
          </span>
          .
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-zinc-200 sm:text-base">
          Монгол орноор аялж, даалгавар биелүүлж, XP цуглуулан шинэ туршлага нээ.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/onboarding"
            className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 px-6 py-3 text-sm font-semibold text-zinc-950 shadow-lg shadow-orange-500/30 transition hover:-translate-y-0.5 hover:shadow-orange-500/50"
          >
            Аяллаа эхлэх
          </Link>
          <Link
            href="/quests"
            className="inline-flex items-center justify-center rounded-2xl border border-white/25 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:border-white/40 hover:bg-white/10"
          >
            Даалгавар үзэх
          </Link>
        </div>
      </div>
    </section>
  );
}
