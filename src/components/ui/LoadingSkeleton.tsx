import { cn } from "@/lib/cn";

export function LoadingSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-xl bg-white/10 ring-1 ring-white/10",
        className,
      )}
      aria-hidden
    />
  );
}
