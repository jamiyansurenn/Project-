import Link from "next/link";
import { FeatureCard } from "@/components/landing/FeatureCard";
import { HeroSection } from "@/components/landing/HeroSection";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { SectionTitle } from "@/components/ui/SectionTitle";
import {
  DESTINATION_HIGHLIGHTS,
  FEATURED_BUSINESSES,
} from "@/data/destinations";

export default function LandingPage() {
  return (
    <div className="space-y-20 pb-20 pt-6 sm:space-y-24 sm:pt-10">
      <HeroSection />

      <RevealOnScroll>
        <section className="grid gap-5 sm:grid-cols-3 sm:gap-6">
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
            description="Кафе, үзэмжийн цэг, зах, музей зэрэг газруудыг нээж судлаарай."
          />
        </section>
      </RevealOnScroll>

      <RevealOnScroll>
        <section className="rounded-3xl bg-gradient-to-b from-white/60 via-sky-50/30 to-transparent px-2 py-2 sm:px-4">
          <SectionTitle
            eyebrow="Онцлох"
            title="Монгол дахь жишиг цэгүүд"
            subtitle="Демонд зориулсан жишээ картууд — даалгавартай холбоотой бодит байршлууд."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {DESTINATION_HIGHLIGHTS.map((d) => (
              <article
                key={d.id}
                className="sim-glass group overflow-hidden rounded-2xl border-stone-200/80 transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-lg"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={d.image}
                  alt=""
                  className="h-40 w-full object-cover transition duration-700 ease-out group-hover:scale-[1.03]"
                />
                <div className="space-y-2 p-5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-teal-800/65">
                    {d.region}
                  </p>
                  <h3 className="text-lg font-semibold text-stone-900">{d.name}</h3>
                  <p className="text-xs text-stone-500">{d.tag}</p>
                  <p className="text-sm leading-relaxed text-stone-600">{d.blurb}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </RevealOnScroll>

      <RevealOnScroll>
        <section className="rounded-3xl bg-gradient-to-b from-amber-50/25 via-transparent to-transparent px-2 py-2 sm:px-4">
          <SectionTitle
            eyebrow="Орон нутгийн бизнес"
            title="Демоны түнш газрууд"
            subtitle="Даалгавраар дамжуулж бизнесүүдийг соёлтойгоор онцлох боломжтой."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {FEATURED_BUSINESSES.map((b) => (
              <div
                key={b.id}
                className="sim-glass rounded-2xl border-stone-200/80 p-5 transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-md"
              >
                <p className="text-sm font-semibold text-stone-900">{b.name}</p>
                <p className="mt-1 text-xs text-stone-500">{b.type}</p>
                <p className="mt-3 text-sm leading-relaxed text-stone-600">{b.perk}</p>
              </div>
            ))}
          </div>
        </section>
      </RevealOnScroll>

      <RevealOnScroll>
        <section className="sim-glass-strong rounded-3xl border-stone-200/70 p-8 sm:p-10">
          <SectionTitle
            eyebrow="Яаж ажиллах вэ"
            title="3 алхмаар эхний түвшинд"
          />
          <ol className="mt-10 grid gap-8 md:grid-cols-3 md:gap-10">
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
                className="relative rounded-2xl border border-stone-200/60 bg-white/50 p-6 transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-teal-200/70 hover:shadow-md"
              >
                <span className="text-xs font-semibold text-teal-700/90">{s.n}</span>
                <p className="mt-3 text-base font-semibold text-stone-900">{s.t}</p>
                <p className="mt-2 text-sm leading-relaxed text-stone-600">{s.d}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/onboarding"
              className="inline-flex flex-1 items-center justify-center rounded-2xl bg-gradient-to-b from-teal-600 to-teal-700 px-6 py-3.5 text-center text-sm font-semibold text-white shadow-md transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:shadow-lg"
            >
              Аяллаа эхлэх
            </Link>
            <Link
              href="/quests"
              className="inline-flex flex-1 items-center justify-center rounded-2xl border border-stone-300/80 bg-white/80 px-6 py-3.5 text-center text-sm font-medium text-stone-700 shadow-sm transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-teal-300/60 hover:shadow-md"
            >
              Газрын зураг нээх
            </Link>
          </div>
        </section>
      </RevealOnScroll>
    </div>
  );
}
