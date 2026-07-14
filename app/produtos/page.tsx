import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { productCategories, productsPage } from "@/content/site";
import QuoteButton from "@/components/quote/QuoteButton";
import PhotoPlaceholder from "@/components/ui/PhotoPlaceholder";
import ProductIcon from "@/components/ui/ProductIcon";
import ArrowIcon from "@/components/ui/ArrowIcon";
import PageHero from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Produtos — equipamentos, abrasivos, reposição e assistência",
  description:
    "Quatro categorias verticalizadas: equipamentos de jateamento turbinados e a ar comprimido, abrasivos de produção própria, peças de reposição e assistência técnica especializada.",
  alternates: { canonical: "/produtos" },
};

export default function ProdutosPage() {
  return (
    <>
      {/* Cabeçalho */}
      <PageHero title={productsPage.title} intro={productsPage.intro} />

      {/* Vitrine de categorias */}
      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 sm:grid-cols-2 lg:px-8">
          {productCategories.map((category, i) => (
            <Link
              key={category.id}
              href={`/produtos/${category.id}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-cinza-borda bg-white transition hover:border-azul-digital/40 hover:shadow-xl"
            >
              {category.image ? (
                <div
                  className={`relative aspect-[16/9] w-full overflow-hidden ${
                    i % 2 === 0 ? "clip-diagonal-b" : "clip-diagonal-t"
                  }`}
                >
                  <Image
                    src={category.image}
                    alt={category.imageAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
              ) : (
                <PhotoPlaceholder
                  label={category.imageAlt}
                  diagonal={i % 2 === 0 ? "b" : "t"}
                  rounded={false}
                  className="aspect-[16/9] w-full"
                />
              )}
              <div className="flex flex-1 flex-col p-6 lg:p-7">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-azul-digital/10 text-azul-digital transition group-hover:bg-azul-digital group-hover:text-white">
                    <ProductIcon id={category.id} className="h-5 w-5" />
                  </span>
                  <h2 className="font-display text-xl font-extrabold uppercase tracking-wide text-azul-inst">
                    {category.label}
                  </h2>
                </div>
                <p className="mt-3 flex-1 text-slate-600">{category.tagline}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 font-display text-sm font-semibold text-azul-digital transition group-hover:gap-2.5">
                  {productsPage.cardCta}
                  <ArrowIcon />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA final */}
      <section className="bg-cinza-claro py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-extrabold text-azul-inst">
            Não encontrou exatamente o que precisa?
          </h2>
          <p className="mt-3 text-lg text-slate-600">
            Projetamos sob medida. Descreva a sua aplicação e a engenharia responde.
          </p>
          <div className="mt-7">
            <QuoteButton variant="primary" className="px-8 py-3.5 text-base">
              Solicitar cotação
            </QuoteButton>
          </div>
        </div>
      </section>
    </>
  );
}
