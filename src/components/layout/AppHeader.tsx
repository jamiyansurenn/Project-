"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { useGameStore } from "@/store/useGameStore";
import { getXpProgress } from "@/lib/xp";

const hideHeaderPaths = ["/", "/onboarding"];

const nav = [
  { href: "/quests", label: "Даалгавар" },
  { href: "/explore", label: "Судлах" },
  { href: "/profile", label: "Профайл" },
] as const;

export function AppHeader() {
  const pathname = usePathname();
  const user = useGameStore((s) => s.user);
  const { percent, level } = getXpProgress(user.xp);

  if (hideHeaderPaths.some((p) => pathname === p)) return null;

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200/70 bg-white/80 backdrop-blur-xl dark:border-zinc-800/80 dark:bg-zinc-950/80">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3">
        <Link href="/quests" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 via-orange-500 to-rose-500 text-lg shadow-md shadow-orange-500/20">
            α
          </span>
          <div className="leading-tight">
            <p className="text-xs font-medium uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
              Монголын адал явдал
            </p>
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
              Project α
            </p>
          </div>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-3 py-1.5 text-sm font-medium transition",
                  active
                    ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                    : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="hidden min-w-[140px] lg:block">
          <div className="flex items-center justify-between text-[10px] font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            <span>Түв {level}</span>
            <span>{percent}%</span>
          </div>
          <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
            <div
              className="h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-500"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
