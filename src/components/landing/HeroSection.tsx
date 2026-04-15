import Link from "next/link";
import { cn } from "@/lib/cn";

function FloatingChip({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "sim-glass pointer-events-none absolute z-20 rounded-md border border-white/10 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-zinc-200 shadow-sm",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function HeroSection({ className }: { className?: string }) {
  return (
    <section
      className={cn(
        "sim-glass-strong relative overflow-hidden rounded-2xl px-6 py-14 text-white sm:px-10 sm:py-20",
        className,
      )}
    >
      {/* Landscape layers */}
      <div
        className="pointer-events-none absolute inset-0 opacity-90"
        aria-hidden
      >
        <div className="absolute inset-0 bg-gradient-to-b from-sky-900/40 via-slate-900/50 to-emerald-950/35" />
        <div className="absolute -bottom-1 left-0 right-0 h-[45%] bg-gradient-to-t from-slate-950/95 via-slate-900/40 to-transparent" />
        <div
          className="absolute bottom-0 left-[-10%] right-[-10%] h-[38%] opacity-80"
          style={{
            background:
              "radial-gradient(ellipse 80% 100% at 50% 100%, rgba(30,20,50,0.95) 0%, transparent 70%)",
          }}
        />
        {/* Sun / moon glow */}
        <div className="absolute right-[12%] top-[8%] h-20 w-20 rounded-full bg-sky-400/25 blur-2xl" />
      </div>

      {/* Character silhouette placeholder */}
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 z-10 h-[min(52%,280px)] w-[45%] max-w-xs -translate-x-1/2 animate-float-slow sm:left-[58%] sm:h-[min(58%,320px)] sm:max-w-sm"
        aria-hidden
      >
        <svg
          viewBox="0 0 200 320"
          className="h-full w-full drop-shadow-md"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="sil" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(15,23,42,0.95)" />
              <stop offset="100%" stopColor="rgba(30,27,75,0.85)" />
            </linearGradient>
          </defs>
          <ellipse cx="100" cy="295" rx="70" ry="12" fill="rgba(0,0,0,0.35)" />
          <path
            d="M100 40 C130 40 145 70 145 100 L145 180 L165 260 L150 268 L135 200 L120 280 L105 275 L115 175 L100 165 L85 175 L95 275 L80 280 L65 200 L50 268 L35 260 L55 180 L55 100 C55 70 70 40 100 40Z"
            fill="url(#sil)"
          />
          <circle cx="100" cy="85" r="38" fill="url(#sil)" />
        </svg>
      </div>

      {/* Floating HUD */}
      <FloatingChip className="left-[6%] top-[12%]">+50 XP</FloatingChip>
      <FloatingChip className="right-[8%] top-[18%]">Шинэ даалгавар</FloatingChip>
      <FloatingChip className="left-[8%] bottom-[26%] sm:bottom-[30%]">
        Түвшин 2
      </FloatingChip>

      <div className="relative z-30 max-w-xl">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-400">
          Аяллын симулятор
        </p>
        <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-zinc-50 sm:text-5xl">
          Монголын зураг дээр өөрийн маршрутаа бүтээгээрэй
        </h1>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-zinc-400 sm:text-base">
          Даалгавар, XP, түвшин — бүгд нэг дэлгэц дээр. Газрын зураг дээрх тэмдгүүдээс эхлүүлээд
          аяллаа төлөвлөөрэй.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Link
            href="/onboarding"
            className="inline-flex items-center justify-center rounded-md bg-sky-600 px-8 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-500"
          >
            Аяллаа эхлэх
          </Link>
          <Link
            href="/quests"
            className="inline-flex items-center justify-center rounded-md border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-zinc-200 transition hover:border-sky-400/40 hover:bg-sky-500/10"
          >
            Газрын зураг нээх
          </Link>
        </div>
        <p className="mt-3 text-[11px] text-zinc-500">
          Демо: өгөгдөл төхөөрөмж болон серверт хадгалагдана.
        </p>
      </div>
    </section>
  );
}
