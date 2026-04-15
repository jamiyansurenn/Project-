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
              className="sim-glass group overflow-hidden rounded-md transition hover:border-sky-400/30"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={d.image}
                alt=""
                className="h-36 w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="space-y-2 p-4">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                  {d.region}
                </p>
                <h3 className="text-base font-bold text-zinc-50">{d.name}</h3>
                <p className="text-xs text-zinc-500">{d.tag}</p>
                <p className="text-sm text-zinc-400">{d.blurb}</p>
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
              className="sim-glass rounded-md p-4 transition hover:border-sky-400/25"
            >
              <p className="text-sm font-bold text-zinc-50">{b.name}</p>
              <p className="text-xs text-zinc-500">{b.type}</p>
              <p className="mt-2 text-sm text-zinc-400">{b.perk}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="sim-glass-strong rounded-2xl p-6 sm:p-8">
        <SectionTitle
          eyebrow="Яаж ажиллах вэ"
          title="3 алхмаар эхний түвшинд"
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
              t: "XP авч түвшин ахиул",
              d: "Фото + GPS баталгаажуулалт (демо) ашиглан дуусгана.",
            },
          ].map((s) => (
            <li
              key={s.n}
              className="sim-glass relative rounded-md p-5 transition hover:border-sky-400/25"
            >
              <span className="text-xs font-semibold text-sky-400">{s.n}</span>
              <p className="mt-2 font-bold text-zinc-50">{s.t}</p>
              <p className="mt-2 text-sm text-zinc-400">{s.d}</p>
            </li>
          ))}
        </ol>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/onboarding"
            className="inline-flex flex-1 items-center justify-center rounded-md bg-sky-600 px-6 py-3 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-sky-500"
          >
            Аяллаа эхлэх
          </Link>
          <Link
            href="/quests"
            className="inline-flex flex-1 items-center justify-center rounded-md border border-white/15 bg-white/5 px-6 py-3 text-center text-sm font-medium text-zinc-200 transition hover:border-sky-400/35 hover:bg-sky-500/10"
          >
            Газрын зураг нээх
          </Link>
        </div>
      </section>
    </div>
  );
}
