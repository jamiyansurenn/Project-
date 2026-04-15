"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { cn } from "@/lib/cn";

type Toast = { id: number; message: string; tone?: "success" | "info" };

const ToastCtx = createContext<(msg: string, tone?: Toast["tone"]) => void>(() => {});

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const push = useCallback((message: string, tone: Toast["tone"] = "success") => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, message, tone }]);
    window.setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id));
    }, 3200);
  }, []);

  const value = useMemo(() => push, [push]);

  return (
    <ToastCtx.Provider value={value}>
      {children}
      <div
        className="pointer-events-none fixed inset-x-0 bottom-24 z-[60] flex flex-col items-center gap-2 px-4 sm:bottom-8"
        aria-live="polite"
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            className={cn(
              "pointer-events-auto max-w-md rounded-2xl border px-4 py-3 text-sm shadow-lg backdrop-blur-xl transition duration-300",
              t.tone === "success" &&
                "border-amber-400/45 bg-gradient-to-r from-amber-500/20 to-emerald-600/15 text-amber-50 shadow-[0_0_24px_rgba(251,191,36,0.2)]",
              t.tone === "info" &&
                "border-violet-400/40 bg-gradient-to-r from-violet-600/25 to-sky-600/15 text-violet-50 shadow-[0_0_20px_rgba(139,92,246,0.18)]",
            )}
          >
            {t.message}
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}

export function useToast() {
  return useContext(ToastCtx);
}
