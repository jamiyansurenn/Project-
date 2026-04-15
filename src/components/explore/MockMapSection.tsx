import { cn } from "@/lib/cn";

const pins = [
  {
    id: "ub",
    label: "Улаанбаатар",
    hint: "Даалгавар: кофе аялал",
    left: "18%",
    top: "24%",
    color: "from-amber-400 to-orange-500",
    ring: "ring-amber-300/60",
  },
  {
    id: "gobi",
    label: "Говь",
    hint: "Ойролцоох эвент",
    left: "72%",
    top: "36%",
    color: "from-sky-400 to-cyan-500",
    ring: "ring-sky-300/60",
  },
  {
    id: "tr",
    label: "Тэрэлж",
    hint: "Байгаль + үзэмж",
    left: "42%",
    top: "68%",
    color: "from-emerald-400 to-teal-500",
    ring: "ring-emerald-300/60",
  },
] as const;

export function MockMapSection({ className }: { className?: string }) {
  return (
    <section
      className={cn(
        "game-panel-strong relative overflow-hidden rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.5)]",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 100% 80% at 50% 120%, rgba(30,20,60,0.9) 0%, transparent 55%), radial-gradient(circle at 30% 20%, rgba(56,189,248,0.15), transparent 40%), radial-gradient(circle at 70% 15%, rgba(251,191,36,0.12), transparent 35%), linear-gradient(165deg, #0f172a 0%, #1e1b4b 45%, #312e81 100%)",
        }}
      />
      <div className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <filter id="mapNoise">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.8"
              numOctaves="3"
              stitchTiles="stitch"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#mapNoise)" />
        </svg>
      </div>

      <div className="relative grid min-h-[240px] grid-cols-8 grid-rows-6 gap-0.5 p-3 sm:min-h-[300px]">
        {Array.from({ length: 48 }).map((_, i) => (
          <div
            key={i}
            className="rounded-sm bg-white/[0.03] ring-1 ring-white/[0.04]"
          />
        ))}

        {pins.map((pin) => (
          <div
            key={pin.id}
            className="group absolute z-10 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
            style={{ left: pin.left, top: pin.top }}
          >
            <button
              type="button"
              className={cn(
                "relative flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br shadow-lg transition duration-300",
                pin.color,
                pin.ring,
                "ring-2 hover:scale-110 hover:shadow-[0_0_24px_rgba(167,139,250,0.45)]",
              )}
              aria-label={pin.label}
            >
              <span className="text-sm font-black text-zinc-950 drop-shadow-sm">
                ?
              </span>
              <span className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 rounded-sm bg-zinc-950/80" />
            </button>
            <div
              className={cn(
                "pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 w-max -translate-x-1/2 rounded-xl border border-white/15 bg-zinc-950/95 px-3 py-2 text-left text-[11px] text-zinc-200 opacity-0 shadow-xl backdrop-blur-md transition duration-200",
                "group-hover:pointer-events-auto group-hover:opacity-100",
              )}
            >
              <p className="font-bold text-amber-200">{pin.label}</p>
              <p className="mt-0.5 text-zinc-400">{pin.hint}</p>
            </div>
          </div>
        ))}

        <div className="pointer-events-none absolute inset-x-4 bottom-3 flex justify-center">
          <div className="game-panel rounded-full px-4 py-1.5 text-[10px] font-medium text-zinc-400">
            Зураг дээрх цэгүүд дээр хулганаа авч очоод мэдээлэл харна уу
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/10 bg-black/30 px-4 py-3 text-xs text-zinc-400 backdrop-blur-md">
        <p className="font-semibold text-amber-200/90">Газрын зураг (демо)</p>
        <p className="mt-1 text-[11px] leading-relaxed text-zinc-500">
          Бодит газрын зураг болон GPS даалгавар дараагийн шатанд нэмэгдэнэ.
        </p>
      </div>
    </section>
  );
}
