import { AppHeader } from "@/components/layout/AppHeader";
import { BottomNav } from "@/components/layout/BottomNav";
import { StoreHydration } from "@/components/providers/StoreHydration";
import { ToastProvider } from "@/components/ui/ToastHost";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <StoreHydration>
        <AppHeader />
        <main className="mx-auto w-full max-w-5xl flex-1 px-4 pb-28 pt-2 md:pb-10">
          {children}
        </main>
        <BottomNav />
      </StoreHydration>
    </ToastProvider>
  );
}
