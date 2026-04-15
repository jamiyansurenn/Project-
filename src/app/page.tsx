import Link from "next/link";
import { FeatureCard } from "@/components/landing/FeatureCard";
import { HeroSection } from "@/components/landing/HeroSection";
import { SectionTitle } from "@/components/ui/SectionTitle";
import {
  DESTINATION_HIGHLIGHTS,
  FEATURED_BUSINESSES,
} from "@/data/destinations";

export default function LandingPage() {
  return (
    <div className="space-y-14 pb-16 pt-4 sm:pt-8">
      <HeroSection />

      <section className="grid gap-4 sm:grid-cols-3">
        <FeatureCard
          icon="⚔️"
          title="Даалгавар биелүүл"
          description="Бодит газарт очиж алхам алхмаар биелүүлээд шагналаа ав."
        />
        <FeatureCard
          icon="✨"
          title="XP цуглуул"
          description="XP нэмэгдэж, түвшин ахиж, амжилтууд нээгдэнэ."
        />
        <FeatureCard
          icon="🧭"
          title="Шинэ газрууд нээ"
          description="Кафе, үзэмжийн цэг, зах, музей зэрэг газрыг тоглоом шиг нээ."
        />
      </section>

      <section className="space-y-6">
        <SectionTitle
          eyebrow="Онцлох"
          title="Монгол дахь жишиг цэгүүд"
          subtitle="Демонд зориулсан жишээ картууд — даалгавартай холбоотой бодит байршлууд."
        />
        <div className="grid gap-4 md:grid-cols-3">
          {DESTINATION_HIGHLIGHTS.map((d) => (
            <article
              key={d.id}
              className="overflow-hidden rounded-2xl border border-zinc-200/80 bg-white/90 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-zinc-800/80 dark:bg-zinc-900/70"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={d.image}
                alt=""
                className="h-36 w-full object-cover"
              />
              <div className="space-y-2 p-4">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-orange-600 dark:text-orange-400">
                  {d.region}
                </p>
                <h3 className="text-base font-semibold">{d.name}</h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  {d.tag}
                </p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  {d.blurb}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <SectionTitle
          eyebrow="Орон нутгийн бизнес"
          title="Демоны түнш газрууд"
          subtitle="Даалгавраар дамжуулж бизнесүүдийг соёлтойгоор онцлох боломжтой."
        />
        <div className="grid gap-3 sm:grid-cols-3">
          {FEATURED_BUSINESSES.map((b) => (
            <div
              key={b.id}
              className="rounded-2xl border border-zinc-200/80 bg-zinc-50/80 p-4 dark:border-zinc-800/80 dark:bg-zinc-900/50"
            >
              <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                {b.name}
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">{b.type}</p>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                {b.perk}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-zinc-200/80 bg-white/90 p-6 dark:border-zinc-800/80 dark:bg-zinc-900/60 sm:p-8">
        <SectionTitle
          eyebrow="Яаж ажиллах вэ"
          title="3 алхмаар эхний level-ээ ав"
        />
        <ol className="mt-6 grid gap-6 md:grid-cols-3">
          {[
            {
              n: "01",
              t: "Даалгавар сонго",
              d: "Өөрийн аялах хэв маягт таарсан даалгавраа сонго.",
            },
            {
              n: "02",
              t: "Бодитоор очиж биелүүл",
              d: "Алхам, XP, түвшин, байршил бүгд тодорхой.",
            },
            {
              n: "03",
              t: "XP авч level ахиул",
              d: "Фото + GPS баталгаажуулалт (демо) ашиглан дуусгана.",
            },
          ].map((s) => (
            <li key={s.n} className="relative rounded-2xl bg-zinc-50/90 p-5 dark:bg-zinc-950/40">
              <span className="text-xs font-bold text-orange-500">{s.n}</span>
              <p className="mt-2 font-semibold text-zinc-900 dark:text-zinc-50">
                {s.t}
              </p>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                {s.d}
              </p>
            </li>
          ))}
        </ol>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/onboarding"
            className="inline-flex flex-1 items-center justify-center rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 px-6 py-3 text-center text-sm font-semibold text-zinc-950 shadow-lg shadow-orange-500/25 transition hover:-translate-y-0.5 hover:brightness-110"
          >
            Аяллаа эхлэх
          </Link>
          <Link
            href="/quests"
            className="inline-flex flex-1 items-center justify-center rounded-2xl border border-zinc-300 bg-white px-6 py-3 text-center text-sm font-semibold transition hover:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-900"
          >
            Даалгавар үзэх
          </Link>
        </div>
      </section>
    </div>
  );
}
