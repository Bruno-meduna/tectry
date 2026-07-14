import type { Metadata } from "next";
import {
  company,
  contactPage,
  productCategories,
  type ProductCategoryId,
} from "@/content/site";
import QuoteForm from "@/components/quote/QuoteForm";
import PageHero from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Contato — fale com a engenharia da Tecjato",
  description:
    "Solicite cotação, telefone (47) 2101-0250, e-mail vendas@tecjato.com.br, WhatsApp e endereço em Araquari/SC. Atendimento por representantes.",
  alternates: { canonical: "/contato" },
};

function InfoRow({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-azul-digital/10 text-azul-digital">
        {icon}
      </span>
      <span className="text-slate-700">{children}</span>
    </li>
  );
}

export default async function ContatoPage({
  searchParams,
}: {
  searchParams: Promise<{ interest?: string }>;
}) {
  const { interest } = await searchParams;
  const defaultInterest: ProductCategoryId | "" = productCategories.some(
    (c) => c.id === interest
  )
    ? (interest as ProductCategoryId)
    : "";

  const mapsSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    company.address.mapsQuery
  )}&output=embed`;

  return (
    <>
      <PageHero title={contactPage.title} intro={contactPage.intro} />

      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:px-8">
          {/* Coluna de informações */}
          <div>
            <h2 className="font-display text-2xl font-bold text-azul-inst">
              Canais de atendimento
            </h2>
            <ul className="mt-6 space-y-4">
              <InfoRow
                icon={
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 4h3l1.5 4-2 1.5a11 11 0 0 0 5 5l1.5-2 4 1.5v3a1.5 1.5 0 0 1-1.7 1.5A16 16 0 0 1 3.5 6.7 1.5 1.5 0 0 1 5 4z" />
                  </svg>
                }
              >
                <a href={`tel:${company.phoneHref}`} className="font-semibold text-azul-inst hover:text-azul-digital">
                  {company.phoneDisplay}
                </a>
              </InfoRow>
              <InfoRow
                icon={
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 7l8 6 8-6" />
                  </svg>
                }
              >
                <a href={`mailto:${company.email}`} className="font-semibold text-azul-inst hover:text-azul-digital">
                  {company.email}
                </a>
              </InfoRow>
              <InfoRow
                icon={
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M17.5 14.4c-.3-.15-1.7-.85-2-.95-.26-.1-.45-.15-.64.15-.2.3-.74.94-.9 1.13-.17.2-.34.22-.63.08-.3-.15-1.24-.46-2.36-1.46-.87-.78-1.46-1.74-1.63-2.03-.17-.3-.02-.45.13-.6.13-.13.3-.34.44-.5.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.65-1.58-.9-2.16-.23-.56-.47-.49-.65-.5h-.55c-.2 0-.5.07-.78.37-.26.3-1.02 1-1.02 2.45s1.05 2.85 1.2 3.04c.14.2 2.07 3.16 5.02 4.43.7.3 1.25.48 1.68.62.7.22 1.34.19 1.85.12.56-.09 1.72-.71 1.97-1.4.24-.68.24-1.26.17-1.38-.07-.12-.27-.2-.56-.34M12 2a10 10 0 0 0-8.6 15l-1.3 4.7 4.8-1.26A10 10 0 1 0 12 2z" />
                  </svg>
                }
              >
                <a href={company.whatsapp} target="_blank" rel="noopener noreferrer" className="font-semibold text-azul-inst hover:text-azul-digital">
                  WhatsApp — {company.phoneDisplay}
                </a>
              </InfoRow>
              <InfoRow
                icon={
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11z" />
                    <circle cx="12" cy="10" r="2.5" />
                  </svg>
                }
              >
                {company.address.line}
                <br />
                {company.address.city} — {company.address.zip}
                <br />
                {company.address.country}
              </InfoRow>
            </ul>

            {/* Mapa */}
            <div className="mt-8 overflow-hidden rounded-xl border border-cinza-borda">
              <iframe
                title="Localização da Tecjato em Araquari/SC"
                src={mapsSrc}
                width="100%"
                height="280"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block w-full"
              />
            </div>

            {/* Representantes */}
            <div id="representantes" className="mt-8 scroll-mt-24 rounded-xl bg-cinza-claro p-6">
              <h3 className="font-display text-lg font-bold text-azul-inst">
                {contactPage.reps.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {contactPage.reps.body}
              </p>
            </div>
          </div>

          {/* Coluna do formulário */}
          <div className="rounded-2xl border border-cinza-borda bg-white p-7 shadow-sm sm:p-9">
            <h2 className="font-display text-2xl font-bold text-azul-inst">
              Solicitar cotação
            </h2>
            <p className="mt-1 text-slate-600">
              Conte a sua aplicação. Respondemos com proposta dimensionada.
            </p>
            <div className="mt-6">
              <QuoteForm variant="page" defaultInterest={defaultInterest} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
