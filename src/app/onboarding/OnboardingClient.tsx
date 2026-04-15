"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { OnboardingStepper } from "@/components/onboarding/OnboardingStepper";
import { useGameStore } from "@/store/useGameStore";
import {
  AVATAR_OPTIONS,
  TRAVELER_LABELS,
  type TravelerType,
} from "@/types";
import { cn } from "@/lib/cn";

const styles: { id: TravelerType; copy: string }[] = [
  {
    id: "explorer",
    copy: "Шинэ өнцөг, үзэмж, нар мандах мөчийг хайж явдаг.",
  },
  {
    id: "food-hunter",
    copy: "Нууц амт, халуун хоол, шинэ газар — амтны эрэлд дуртай.",
  },
  {
    id: "culture-seeker",
    copy: "Хийд, музей, түүх домог — соёлыг мэдрэхийг хүсдэг.",
  },
  {
    id: "adventure-rider",
    copy: "Адал явдал, зам харгуй, сорилт — хүчтэй аялалд дуртай.",
  },
];

export function OnboardingClient() {
  const router = useRouter();
  const completeOnboarding = useGameStore((s) => s.completeOnboarding);
  const [step, setStep] = useState(1);
  const [travelerType, setTravelerType] = useState<TravelerType>("explorer");
  const [avatarId, setAvatarId] = useState<string>("steppe");
  const [name, setName] = useState("");

  const canContinueStep1 = true;
  const canContinueStep2 = Boolean(avatarId);
  const canStart = name.trim().length >= 2;

  const startDemo = () => {
    completeOnboarding({
      name: name.trim(),
      avatarId,
      travelerType,
    });
    router.push("/quests");
  };

  return (
    <div className="mx-auto max-w-lg space-y-8 pb-16 pt-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-orange-600 dark:text-orange-400">
          Эхлэх
        </p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Аяллын төрлөө сонго
        </h1>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Бүртгэл шаардлагагүй. Энэ демо таны төхөөрөмж дээр хадгалагдана.
        </p>
      </div>

      <OnboardingStepper step={step} total={3} />

      {step === 1 ? (
        <section className="space-y-4">
          <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
            Сонголт
          </h2>
          <div className="grid gap-3">
            {styles.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setTravelerType(s.id)}
                className={cn(
                  "rounded-2xl border p-4 text-left transition",
                  travelerType === s.id
                    ? "border-orange-500/60 bg-orange-500/10 shadow-sm"
                    : "border-zinc-200/80 hover:border-zinc-300 dark:border-zinc-800/80 dark:hover:border-zinc-600",
                )}
              >
                <p className="font-medium text-zinc-900 dark:text-zinc-50">
                  {TRAVELER_LABELS[s.id]}
                </p>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                  {s.copy}
                </p>
              </button>
            ))}
          </div>
          <button
            type="button"
            disabled={!canContinueStep1}
            onClick={() => setStep(2)}
            className="w-full rounded-2xl bg-zinc-900 py-3 text-sm font-semibold text-white transition enabled:hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:enabled:hover:bg-white"
          >
            Үргэлжлүүлэх
          </button>
        </section>
      ) : null}

      {step === 2 ? (
        <section className="space-y-4">
          <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
            Дүр сонгох
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {AVATAR_OPTIONS.map((a) => (
              <button
                key={a.id}
                type="button"
                onClick={() => setAvatarId(a.id)}
                className={cn(
                  "rounded-2xl border p-4 text-center transition",
                  avatarId === a.id
                    ? "border-orange-500/60 bg-orange-500/10"
                    : "border-zinc-200/80 dark:border-zinc-800/80",
                )}
              >
                <span className="text-3xl">{a.emoji}</span>
                <p className="mt-2 text-xs font-medium text-zinc-700 dark:text-zinc-200">
                  {a.label}
                </p>
              </button>
            ))}
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="flex-1 rounded-2xl border border-zinc-300 py-3 text-sm font-semibold dark:border-zinc-700"
            >
              Буцах
            </button>
            <button
              type="button"
              disabled={!canContinueStep2}
              onClick={() => setStep(3)}
              className="flex-1 rounded-2xl bg-zinc-900 py-3 text-sm font-semibold text-white dark:bg-zinc-100 dark:text-zinc-900"
            >
              Үргэлжлүүлэх
            </button>
          </div>
        </section>
      ) : null}

      {step === 3 ? (
        <section className="space-y-4">
          <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
            Нэр оруулах
          </h2>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Жишээ: Нараа"
            className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none ring-0 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/30 dark:border-zinc-800 dark:bg-zinc-900"
          />
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Хамгийн багадаа 2 тэмдэгт. (Демо өгөгдөл)
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="sm:flex-1 rounded-2xl border border-zinc-300 py-3 text-sm font-semibold dark:border-zinc-700"
            >
              Буцах
            </button>
            <button
              type="button"
              disabled={!canStart}
              onClick={startDemo}
              className="sm:flex-1 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 py-3 text-sm font-semibold text-zinc-950 shadow-lg shadow-orange-500/25 disabled:opacity-40"
            >
              Эхлэх
            </button>
          </div>
        </section>
      ) : null}
    </div>
  );
}
