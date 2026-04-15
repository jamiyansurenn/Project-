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
        "group sim-glass relative overflow-hidden rounded-md p-5 transition duration-200",
        "hover:border-sky-400/30 hover:shadow-md",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-sky-500/5 opacity-0 transition group-hover:opacity-100" />
      <div className="relative flex h-11 w-11 items-center justify-center rounded-md border border-white/10 bg-white/5 text-xl">
        {icon}
      </div>
      <h3 className="relative mt-4 text-base font-bold text-zinc-50">{title}</h3>
      <p className="relative mt-2 text-sm leading-relaxed text-zinc-400">
        {description}
      </p>
    </article>
  );
}
