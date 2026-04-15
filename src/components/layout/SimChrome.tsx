"use client";

import { usePathname } from "next/navigation";
import { SimSidebar } from "@/components/sim/SimSidebar";
import { SimTopHud } from "@/components/sim/SimTopHud";

export function SimChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const bare = pathname === "/" || pathname.startsWith("/onboarding");

  if (bare) {
    return (
      <div className="relative z-10 flex min-h-dvh flex-col">
        <main className="relative z-10 mx-auto w-full max-w-5xl flex-1 px-4 pb-16 pt-2">
          {children}
        </main>
      </div>
    );
  }

  return (
    <div className="relative z-10 flex min-h-dvh">
      <SimSidebar />
      <div className="flex min-h-dvh flex-1 flex-col pl-14 md:pl-52">
        <SimTopHud />
        <main className="relative min-h-0 flex-1 overflow-y-auto overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
