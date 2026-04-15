"use client";

import { usePathname } from "next/navigation";
import { useSyncExternalStore } from "react";
import { LoadingSkeleton } from "@/components/ui/LoadingSkeleton";
import { useGameStore } from "@/store/useGameStore";

function isPublicPath(pathname: string | null): boolean {
  if (!pathname) return true;
  return pathname === "/" || pathname.startsWith("/onboarding");
}

function subscribePersistHydration(onStoreChange: () => void) {
  return useGameStore.persist.onFinishHydration(onStoreChange);
}

function getPersistHydratedSnapshot() {
  return useGameStore.persist.hasHydrated();
}

function getServerHydratedSnapshot() {
  return false;
}

export function StoreHydration({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isPublic = isPublicPath(pathname);
  const hydrated = useSyncExternalStore(
    subscribePersistHydration,
    getPersistHydratedSnapshot,
    getServerHydratedSnapshot,
  );

  const ready = isPublic || hydrated;

  if (!ready) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col justify-center px-4 pb-24 pt-8">
        <LoadingSkeleton className="h-10 w-48" />
        <LoadingSkeleton className="mt-6 h-32 w-full rounded-2xl" />
        <LoadingSkeleton className="mt-4 h-24 w-full rounded-2xl" />
      </div>
    );
  }

  return <>{children}</>;
}
