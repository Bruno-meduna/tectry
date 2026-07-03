import Link from "next/link";
import { home, productCategories } from "@/content/site";
import PhotoMontage from "@/components/ui/PhotoMontage";
import QuoteButton from "@/components/quote/QuoteButton";
import ProductCard from "@/components/ProductCard";
import ClientLogos from "@/components/ClientLogos";
import HeroRotator from "@/components/ui/HeroRotator";

export default function HomePage() {
  return (
    <>
      {/* 1. HERO ------------------------------------------------------------ */}
      <section className="relative">
        <HeroRotator />
      </section>

      {/* 2. FAIXA DE PROVAS ------------------------------------------------- */}
      <section className="border-b border-cinza-borda bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px overflow-hidden px-4 py-10 sm:px-6 lg:grid-cols-4 lg:px-8">
          {home.proof.map((item) => (
            <div key={item.label} className="px-4 text-center">
              <div className="font-display text-2xl font-extrabold text-azul-digital sm:text-3xl">
                {item.value}
              </div>
              <div className="mt-1 text-sm text-slate-500">{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. ESTEIRA DE CLIENTES -------------------------------------------- */}
      <section className="bg-white py-14">
        <div className="mx-auto mb-8 max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold text-azul-inst sm:text-3xl">
            {home.clientsStrip.title}
          </h2>
          <p className="mt-2 text-slate-600">{home.clientsStrip.subtitle}</p>
        </div>
        <ClientLogos />
      </section>

      {/* 4. GRID DE PRODUTOS ----------------------------------------------- */}
      <section className="bg-cinza-claro py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl font-extrabold text-azul-inst sm:text-4xl">
              {home.productsGrid.title}
            </h2>
            <p className="mt-3 text-lg text-slate-600">
              {home.productsGrid.subtitle}
            </p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {productCategories.map((category) => (
              <ProductCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* 4b. QUEM SOMOS ---------------------------------------------------- */}
      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:px-8">
          <PhotoMontage className="lg:order-1" />
          <div className="lg:order-2">
            <span className="text-sm font-bold uppercase tracking-widest text-azul-digital">
              {home.about.eyebrow}
            </span>
            <h2 className="mt-3 font-display text-3xl font-extrabold text-azul-inst sm:text-4xl">
              {home.about.title}
            </h2>
            <div className="mt-5 space-y-4 text-lg leading-relaxed text-slate-600">
              {home.about.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <Link
              href="/quem-somos"
              className="mt-7 inline-flex items-center gap-2 font-display font-semibold text-azul-digital transition hover:gap-3"
            >
              {home.about.cta}
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* 7. DEPOIMENTO ------------------------------------------------------ */}
      <section className="bg-cinza-claro py-16 lg:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <svg className="mx-auto h-10 w-10 text-azul-digital/30" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M9 7H5a1 1 0 0 0-1 1v4a3 3 0 0 0 3 3h0a1 1 0 0 1 1 1v1a1 1 0 0 0 1 1h0a1 1 0 0 0 1-1v-3a6 6 0 0 0-1-3V8a1 1 0 0 0-1-1zm10 0h-4a1 1 0 0 0-1 1v4a3 3 0 0 0 3 3h0a1 1 0 0 1 1 1v1a1 1 0 0 0 1 1h0a1 1 0 0 0 1-1v-3a6 6 0 0 0-1-3V8a1 1 0 0 0-1-1z" />
          </svg>
          <blockquote className="mt-5 font-display text-xl font-medium leading-relaxed text-azul-inst sm:text-2xl">
            {home.testimonial.quote}
          </blockquote>
          <div className="mt-5 text-sm text-slate-500">
            <span className="font-semibold text-azul-inst">{home.testimonial.author}</span>
            {" — "}
            {home.testimonial.role}
          </div>
        </div>
      </section>

      {/* 8. CTA FINAL ------------------------------------------------------- */}
      <section className="relative flex items-center overflow-hidden bg-azul-digital py-12 text-white sm:aspect-[24/5] sm:py-0">
        <img
          src="/fotos/Footer.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          className="absolute inset-0 bg-azul-digital/40"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-extrabold sm:text-4xl">
            {home.finalCta.title}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-lg text-blue-50">
            {home.finalCta.subtitle}
          </p>
          <div className="mt-8">
            <QuoteButton variant="light" className="px-8 py-3.5 text-base">
              {home.finalCta.cta}
            </QuoteButton>
          </div>
        </div>
      </section>
    </>
  );
}
