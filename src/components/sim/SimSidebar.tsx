"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

const tools = [
  { href: "/explore", label: "Судлах", icon: ExploreIcon },
  { href: "/quests", label: "Даалгавар", icon: QuestIcon },
  { href: "/profile", label: "Профайл", icon: ProfileIcon },
  { href: "/achievements", label: "Амжилт", icon: TrophyIcon },
] as const;

export function SimSidebar() {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "sim-glass-strong fixed bottom-0 left-0 top-0 z-[45] flex w-14 flex-col border-r border-white/10 py-3 md:w-52",
      )}
    >
      <Link
        href="/quests"
        className="mb-4 flex items-center justify-center gap-2 px-2 md:justify-start md:px-3"
      >
        <span className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-md border border-white/15 bg-slate-900/60">
          <Image
            src="/alpha-logo.png"
            alt=""
            fill
            sizes="36px"
            className="object-contain p-0.5"
          />
        </span>
        <span className="hidden min-w-0 truncate text-left text-xs font-semibold leading-tight text-zinc-100 md:block">
          Project α
        </span>
      </Link>

      <nav className="flex flex-1 flex-col gap-0.5 px-1 md:px-2">
        {tools.map((item) => {
          const active =
            pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-2 py-2.5 text-xs font-medium transition md:px-3",
                active
                  ? "bg-sky-500/20 text-sky-100 ring-1 ring-sky-400/30"
                  : "text-zinc-400 hover:bg-white/5 hover:text-zinc-200",
              )}
            >
              <Icon className="h-5 w-5 shrink-0 opacity-90" active={active} />
              <span className="hidden md:inline">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto hidden border-t border-white/10 px-3 py-2 text-[10px] text-zinc-500 md:block">
        Аяллын симулятор
      </div>
    </aside>
  );
}

function ExploreIcon({
  className,
  active,
}: {
  className?: string;
  active?: boolean;
}) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M3 17l6-6 4 4 8-8"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={active ? "text-sky-200" : "text-zinc-400"}
      />
      <path
        d="M14 8h6v6"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={active ? "text-sky-200" : "text-zinc-400"}
      />
    </svg>
  );
}

function QuestIcon({ className, active }: { className?: string; active?: boolean }) {
  const c = active ? "text-sky-200" : "text-zinc-400";
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 21s7-4.35 7-10a7 7 0 10-14 0c0 5.65 7 10 7 10z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
        className={c}
      />
      <circle cx="12" cy="11" r="2.25" stroke="currentColor" strokeWidth="1.75" className={c} />
    </svg>
  );
}

function ProfileIcon({
  className,
  active,
}: {
  className?: string;
  active?: boolean;
}) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle
        cx="12"
        cy="8"
        r="3.25"
        stroke="currentColor"
        strokeWidth="1.75"
        className={active ? "text-sky-200" : "text-zinc-400"}
      />
      <path
        d="M5 20v-1c0-2.5 3-4 7-4s7 1.5 7 4v1"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        className={active ? "text-sky-200" : "text-zinc-400"}
      />
    </svg>
  );
}

function TrophyIcon({
  className,
  active,
}: {
  className?: string;
  active?: boolean;
}) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M8 21h8M12 17v4M7 4h10v3a5 5 0 01-10 0V4zM4 7H2v1a3 3 0 003 3m15-4h-2v1a3 3 0 01-3 3"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={active ? "text-sky-200" : "text-zinc-400"}
      />
    </svg>
  );
}
