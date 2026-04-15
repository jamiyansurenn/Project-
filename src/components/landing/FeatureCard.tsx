import { cn } from "@/lib/cn";

export function FeatureCard({
  icon,
  title,
  description,
  className,
}: {
  icon: string;
  title: string;
  description: string;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "group rounded-2xl border border-zinc-200/80 bg-white/80 p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-orange-300/60 hover:shadow-md dark:border-zinc-800/80 dark:bg-zinc-900/60 dark:hover:border-orange-500/40",
        className,
      )}
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-amber-100 to-orange-100 text-xl dark:from-amber-500/20 dark:to-orange-500/20">
        {icon}
      </div>
      <h3 className="mt-4 text-base font-semibold text-zinc-900 dark:text-zinc-50">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        {description}
      </p>
    </article>
  );
}
