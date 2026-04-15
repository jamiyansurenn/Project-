import Link from "next/link";
import { MockMapSection } from "@/components/explore/MockMapSection";
import { ExploreFeaturedQuests } from "./ExploreFeaturedQuests";
import { SectionTitle } from "@/components/ui/SectionTitle";
import {
  DESTINATION_HIGHLIGHTS,
  FEATURED_BUSINESSES,
} from "@/data/destinations";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Судлах",
};

export default function ExplorePage() {
  return (
    <div className="space-y-10 pb-8 pt-2">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-600 dark:text-orange-400">
          Судлах
        </p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight">
          Судлах
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-zinc-600 dark:text-zinc-400">
          Газрын зураг нь одоогоор демо загвар. Доорх картуудаас даалгавар руу орж үзээрэй.
        </p>
      </div>

      <MockMapSection />

      <section className="space-y-4">
        <SectionTitle
          eyebrow="Онцлох газрууд"
          title="Онцлох газрууд"
          subtitle="Монголын аяллын гол цэгүүдээс санаа авав."
        />
        <div className="grid gap-4 md:grid-cols-3">
          {DESTINATION_HIGHLIGHTS.map((d) => (
            <article
              key={d.id}
              className="overflow-hidden rounded-2xl border border-zinc-200/80 bg-white/90 shadow-sm dark:border-zinc-800/80 dark:bg-zinc-900/70"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={d.image}
                alt=""
                className="h-32 w-full object-cover"
              />
              <div className="p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-orange-600 dark:text-orange-400">
                  {d.region}
                </p>
                <h3 className="mt-1 text-sm font-semibold">{d.name}</h3>
                <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400">
                  {d.blurb}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <SectionTitle
          eyebrow="Ойролцоох даалгавар"
          title="Ойролцоох даалгавар"
        />
        <ExploreFeaturedQuests />
        <div className="text-center">
          <Link
            href="/quests"
            className="text-sm font-semibold text-orange-600 hover:text-orange-500 dark:text-orange-400"
          >
            Бүх даалгавар →
          </Link>
        </div>
      </section>

      <section className="space-y-4">
        <SectionTitle
          eyebrow="Орон нутгийн бизнес"
          title="Онцлох бизнесүүд"
          subtitle="Даалгаварт бизнесийг зөв, соёлтойгоор холбох жишээ."
        />
        <div className="grid gap-3 sm:grid-cols-3">
          {FEATURED_BUSINESSES.map((b) => (
            <div
              key={b.id}
              className="rounded-2xl border border-zinc-200/80 bg-gradient-to-br from-white to-zinc-50 p-4 dark:border-zinc-800/80 dark:from-zinc-900 dark:to-zinc-950"
            >
              <p className="text-sm font-semibold">{b.name}</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">{b.type}</p>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                {b.perk}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
