"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

const links = [
  { href: "/quests", label: "Даалгавар", icon: "⚔️" },
  { href: "/explore", label: "Судлах", icon: "🗺️" },
  { href: "/profile", label: "Профайл", icon: "🛡️" },
] as const;

const hideNavPaths = ["/", "/onboarding"];

export function BottomNav() {
  const pathname = usePathname();
  if (hideNavPaths.some((p) => pathname === p)) return null;

  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 border-t border-zinc-200/80 bg-white/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl dark:border-zinc-800/80 dark:bg-zinc-950/90 md:hidden">
      <ul className="mx-auto flex max-w-lg items-stretch justify-around px-2">
        {links.map((l) => {
          const active =
            pathname === l.href || pathname.startsWith(`${l.href}/`);
          return (
            <li key={l.href} className="flex-1">
              <Link
                href={l.href}
                className={cn(
                  "flex flex-col items-center gap-0.5 py-2 text-[10px] font-medium transition-colors",
                  active
                    ? "text-orange-600 dark:text-orange-400"
                    : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200",
                )}
              >
                <span className="text-lg leading-none">{l.icon}</span>
                {l.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
