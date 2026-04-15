import { cn } from "@/lib/cn";

export function EmptyState({
  icon = "🧭",
  title,
  description,
  action,
  className,
}: {
  icon?: string;
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-2xl border border-dashed border-violet-500/25 bg-zinc-950/40 px-6 py-12 text-center backdrop-blur-sm",
        className,
      )}
    >
      <span className="text-3xl drop-shadow-[0_0_12px_rgba(167,139,250,0.4)]">
        {icon}
      </span>
      <h3 className="mt-4 text-base font-bold text-zinc-100">{title}</h3>
      <p className="mt-2 max-w-sm text-sm text-zinc-500">{description}</p>
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}
