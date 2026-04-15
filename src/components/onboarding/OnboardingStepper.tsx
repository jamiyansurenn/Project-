"use client";

import { cn } from "@/lib/cn";

export function OnboardingStepper({
  step,
  total,
  className,
}: {
  step: number;
  total: number;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {Array.from({ length: total }).map((_, i) => {
        const n = i + 1;
        const active = n === step;
        const done = n < step;
        return (
          <div key={n} className="flex flex-1 items-center gap-2">
            <div
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition",
                done && "bg-emerald-500 text-white",
                active &&
                  "bg-gradient-to-br from-amber-400 to-orange-500 text-zinc-950 shadow-md",
                !done && !active && "border border-white/10 bg-white/5 text-zinc-500",
              )}
            >
              {done ? "✓" : n}
            </div>
            {n < total ? (
              <div
                className={cn(
                  "h-0.5 flex-1 rounded-full",
                  done ? "bg-emerald-500/70" : "bg-white/10",
                )}
              />
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
