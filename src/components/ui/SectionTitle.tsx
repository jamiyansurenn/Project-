import { cn } from "@/lib/cn";

export function SectionTitle({
  eyebrow,
  title,
  subtitle,
  className,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", className)}>
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-zinc-500">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-2 text-xl font-extrabold tracking-tight sm:text-2xl">
        <span className="game-title-gradient">{title}</span>
      </h2>
      {subtitle ? (
        <p className="mt-2 text-sm leading-relaxed text-zinc-400">{subtitle}</p>
      ) : null}
    </div>
  );
}
