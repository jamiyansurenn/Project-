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
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-600 dark:text-orange-400">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-2 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-2xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
