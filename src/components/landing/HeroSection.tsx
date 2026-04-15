import Link from "next/link";
import { cn } from "@/lib/cn";
import { HeroPreviewStack } from "@/components/landing/HeroPreviewStack";

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
        "travel-chip pointer-events-none absolute z-20 rounded-full px-3 py-1.5 text-[11px] font-medium tracking-wide text-stone-700 shadow-sm",
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
        "relative overflow-hidden rounded-3xl border border-stone-200/60 bg-gradient-to-br from-sky-50/90 via-white to-amber-50/50 px-6 py-14 shadow-sm sm:px-10 sm:py-20",
        className,
      )}
    >
      {/* Ambient washes */}
      <div
        className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-sky-200/35 blur-3xl animate-ambient-drift"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-amber-200/30 blur-3xl animate-ambient-drift"
        style={{ animationDelay: "-6s" }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal-100/20 blur-3xl"
        aria-hidden
      />

      <FloatingChip className="right-[6%] top-[16%] animate-float-gentle-delay">
        Шинэ даалгавар
      </FloatingChip>

      <div className="relative z-10 grid items-center gap-12 lg:grid-cols-[1fr_320px] lg:gap-16">
        <div className="max-w-xl animate-fade-up">
          <Link
            href="/"
            className="inline-block text-xs font-semibold uppercase tracking-[0.22em] text-teal-700/85 transition duration-300 hover:text-teal-800"
          >
            Аяллын платформ
          </Link>
          <h1 className="mt-5 text-3xl font-bold leading-[1.12] tracking-tight text-stone-900 sm:text-4xl lg:text-[2.65rem]">
            Монголын зураг дээр өөрийн аяллыг төлөвлөж, аажмаар нээгээрэй
          </h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-stone-600 sm:text-[1.05rem]">
            Даалгавар, XP, түвшин — зөөлөн, ойлгомжтой интерфейс. Газрын зураг дээрх тэмдгүүдээс
            эхлээд аяллаа нэг дор удирдаарай.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/onboarding"
              className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-b from-teal-600 to-teal-700 px-8 py-3.5 text-sm font-semibold text-white shadow-md shadow-teal-900/10 transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-teal-900/15 hover:brightness-[1.03]"
            >
              Аяллаа эхлэх
            </Link>
            <Link
              href="/quests"
              className="inline-flex items-center justify-center rounded-2xl border border-stone-300/80 bg-white/70 px-7 py-3.5 text-sm font-medium text-stone-700 shadow-sm backdrop-blur-sm transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-teal-300/60 hover:bg-white hover:shadow-md"
            >
              Газрын зураг нээх
            </Link>
          </div>
          <p className="mt-4 text-xs leading-relaxed text-stone-500">
            Демо: өгөгдөл таны төхөөрөмж болон серверт хадгалагдана.
          </p>
        </div>

        <div className="animate-fade-up-delay-1 flex justify-center lg:justify-end">
          <HeroPreviewStack />
        </div>
      </div>
    </section>
  );
}
