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
  const [saving, setSaving] = useState(false);
  const [step, setStep] = useState(1);
  const [travelerType, setTravelerType] = useState<TravelerType>("explorer");
  const [avatarId, setAvatarId] = useState<string>("steppe");
  const [name, setName] = useState("");

  const canContinueStep1 = true;
  const canContinueStep2 = Boolean(avatarId);
  const canStart = name.trim().length >= 2;

  const startDemo = async () => {
    setSaving(true);
    try {
      await completeOnboarding({
        name: name.trim(),
        avatarId,
        travelerType,
      });
      router.push("/quests");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-lg space-y-8 pb-16 pt-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-200/80">
          Эхлэх
        </p>
        <h1 className="game-title-gradient mt-2 text-2xl font-bold tracking-tight">
          Аяллын төрлөө сонго
        </h1>
        <p className="mt-2 text-sm text-zinc-400">
          Бүртгэл шаардлагагүй. Энэ демо таны төхөөрөмж дээр хадгалагдана.
        </p>
      </div>

      <OnboardingStepper step={step} total={3} />

      {step === 1 ? (
        <section className="game-panel-strong space-y-4 rounded-2xl p-5">
          <h2 className="text-sm font-semibold text-zinc-100">Сонголт</h2>
          <div className="grid gap-3">
            {styles.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setTravelerType(s.id)}
                className={cn(
                  "rounded-2xl border p-4 text-left transition duration-300",
                  travelerType === s.id
                    ? "border-amber-400/50 bg-gradient-to-r from-amber-500/20 to-violet-600/15 shadow-[0_0_20px_rgba(251,191,36,0.2)]"
                    : "game-panel border-transparent hover:border-violet-400/25",
                )}
              >
                <p className="font-medium text-zinc-50">{TRAVELER_LABELS[s.id]}</p>
                <p className="mt-1 text-sm text-zinc-400">{s.copy}</p>
              </button>
            ))}
          </div>
          <button
            type="button"
            disabled={!canContinueStep1}
            onClick={() => setStep(2)}
            className="w-full rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-700 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition enabled:hover:brightness-110"
          >
            Үргэлжлүүлэх
          </button>
        </section>
      ) : null}

      {step === 2 ? (
        <section className="game-panel-strong space-y-4 rounded-2xl p-5">
          <h2 className="text-sm font-semibold text-zinc-100">Дүр сонгох</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {AVATAR_OPTIONS.map((a) => (
              <button
                key={a.id}
                type="button"
                onClick={() => setAvatarId(a.id)}
                className={cn(
                  "rounded-2xl border p-4 text-center transition duration-300",
                  avatarId === a.id
                    ? "border-sky-400/50 bg-sky-500/15 shadow-[0_0_16px_rgba(56,189,248,0.25)]"
                    : "game-panel border-transparent hover:border-white/15",
                )}
              >
                <span className="text-3xl">{a.emoji}</span>
                <p className="mt-2 text-xs font-medium text-zinc-200">{a.label}</p>
              </button>
            ))}
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="game-panel flex-1 rounded-2xl border border-white/10 py-3 text-sm font-semibold text-zinc-200 transition hover:border-white/20"
            >
              Буцах
            </button>
            <button
              type="button"
              disabled={!canContinueStep2}
              onClick={() => setStep(3)}
              className="flex-1 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-700 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition enabled:hover:brightness-110 disabled:opacity-40"
            >
              Үргэлжлүүлэх
            </button>
          </div>
        </section>
      ) : null}

      {step === 3 ? (
        <section className="game-panel-strong space-y-4 rounded-2xl p-5">
          <h2 className="text-sm font-semibold text-zinc-100">Нэр оруулах</h2>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Жишээ: Нараа"
            className="w-full rounded-2xl border border-white/15 bg-zinc-950/50 px-4 py-3 text-sm text-zinc-100 outline-none ring-0 placeholder:text-zinc-500 focus:border-amber-400/50 focus:ring-2 focus:ring-amber-400/25"
          />
          <p className="text-xs text-zinc-500">
            Хамгийн багадаа 2 тэмдэгт. (Демо өгөгдөл)
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="game-panel sm:flex-1 rounded-2xl border border-white/10 py-3 text-sm font-semibold text-zinc-200 transition hover:border-white/20"
            >
              Буцах
            </button>
            <button
              type="button"
              disabled={saving || !canStart}
              onClick={startDemo}
              className="sm:flex-1 rounded-2xl bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 py-3 text-sm font-semibold text-zinc-950 shadow-[0_0_28px_rgba(251,191,36,0.35)] transition enabled:hover:brightness-110 disabled:opacity-40 disabled:shadow-none"
            >
              {saving ? "Түр хүлээнэ үү..." : "Эхлэх"}
            </button>
          </div>
        </section>
      ) : null}
    </div>
  );
}
