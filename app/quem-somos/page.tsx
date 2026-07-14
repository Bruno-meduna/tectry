import type { Metadata } from "next";
import { aboutPage, company } from "@/content/site";
import QuoteButton from "@/components/quote/QuoteButton";
import PhotoMontage from "@/components/ui/PhotoMontage";
import PageHero from "@/components/ui/PageHero";
import CtaBanner from "@/components/CtaBanner";
import Timeline from "@/components/about/Timeline";

export const metadata: Metadata = {
  title: "Quem somos — a história da Tecjato",
  description:
    "Fundada em 1987 em Araquari/SC, a Tecjato verticalizou a preparação de superfícies: máquinas, fundição própria, abrasivo próprio e shot peening. Conheça nossa história.",
  alternates: { canonical: "/quem-somos" },
};

export default function QuemSomosPage() {
  return (
    <>
      {/* Cabeçalho */}
      <PageHero title={aboutPage.title} intro={aboutPage.intro} />

      {/* Narrativa + foto */}
      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:px-8">
          <div>
            <h2 className="font-display text-3xl font-extrabold text-azul-inst">
              {aboutPage.story.title}
            </h2>
            <div className="mt-5 space-y-4 text-lg leading-relaxed text-slate-600">
              {aboutPage.story.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
          <PhotoMontage />
        </div>
      </section>

      {/* Linha do tempo */}
      <section className="bg-cinza-claro py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-extrabold text-azul-inst">
            Linha do tempo
          </h2>
          <Timeline items={aboutPage.timeline} />
        </div>
      </section>

      {/* Pilares */}
      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-extrabold text-azul-inst">
            {aboutPage.pillars.title}
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {aboutPage.pillars.items.map((p, i) => (
              <div
                key={p.title}
                className="rounded-xl border border-cinza-borda bg-white p-6"
              >
                <div className="font-display text-3xl font-extrabold text-azul-digital/30">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="mt-2 font-display text-lg font-bold text-azul-inst">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {p.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CtaBanner title={aboutPage.cta.title} subtitle={aboutPage.cta.subtitle}>
        <QuoteButton variant="light" className="px-8 py-3.5 text-base">
          {aboutPage.cta.button}
        </QuoteButton>
        <a
          href={company.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-md border border-white/40 px-8 py-3.5 font-display text-base font-semibold text-white transition hover:bg-white/10"
        >
          Falar no WhatsApp
        </a>
      </CtaBanner>
    </>
  );
}
