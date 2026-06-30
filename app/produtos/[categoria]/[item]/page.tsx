import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  productCategories,
  productItemBy,
  productsPage,
} from "@/content/site";
import LinkButton from "@/components/ui/LinkButton";
import PhotoPlaceholder from "@/components/ui/PhotoPlaceholder";
import ProductIcon from "@/components/ui/ProductIcon";

export function generateStaticParams() {
  return productCategories.flatMap((c) =>
    c.items.map((it) => ({ categoria: c.id, item: it.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ categoria: string; item: string }>;
}): Promise<Metadata> {
  const { categoria, item } = await params;
  const found = productItemBy(categoria, item);
  if (!found) return {};
  return {
    title: `${found.item.name} — ${found.category.label} | Tecjato`,
    description: found.item.description,
    alternates: { canonical: `/produtos/${categoria}/${item}` },
  };
}

export default async function ItemPage({
  params,
}: {
  params: Promise<{ categoria: string; item: string }>;
}) {
  const { categoria, item } = await params;
  const found = productItemBy(categoria, item);
  if (!found) notFound();

  const { category, item: product } = found;
  const siblings = category.items.filter((it) => it.slug !== product.slug);

  return (
    <>
      {/* Cabeçalho com breadcrumb de 3 níveis */}
      <section className="hatch-dark relative overflow-hidden bg-azul-inst py-14 text-white lg:py-16">
        {product.heroImage && (
          <>
            <Image
              src={product.heroImage}
              alt={product.name}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-azul-inst/65 via-azul-inst/55 to-azul-inst/40" />
          </>
        )}
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="Trilha" className="text-sm text-blue-100/70">
            <Link href="/produtos" className="transition hover:text-white">
              {productsPage.backToProducts}
            </Link>
            <span className="px-2">/</span>
            <Link
              href={`/produtos/${category.id}`}
              className="transition hover:text-white"
            >
              {category.label}
            </Link>
            <span className="px-2">/</span>
            <span className="text-blue-50">{product.name}</span>
          </nav>
          <div className="mt-5 flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-azul-digital text-white">
              <ProductIcon id={category.id} className="h-6 w-6" />
            </span>
            <h1 className="font-display text-3xl font-extrabold sm:text-4xl">
              {product.name}
            </h1>
          </div>
          {product.tags && product.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-blue-50"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {product.subItems && product.subItems.length > 0 ? (
        /* Corpo: grade de sub-equipamentos (nível 4) */
        <section className="bg-white py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {product.intro && (
              <p className="max-w-3xl text-lg leading-relaxed text-slate-600">
                {product.intro}
              </p>
            )}
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {product.subItems.map((sub) => (
                <Link
                  key={sub.slug}
                  href={`/produtos/${category.id}/${product.slug}/${sub.slug}`}
                  className="group flex flex-col overflow-hidden rounded-xl border border-cinza-borda bg-white text-center transition hover:border-azul-digital/40 hover:shadow-lg"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-cinza-claro">
                    {sub.image ? (
                      <Image
                        src={sub.image}
                        alt={sub.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <PhotoPlaceholder
                        label={sub.name}
                        rounded={false}
                        className="h-full w-full"
                      />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-display text-base font-bold uppercase tracking-wide text-azul-inst transition group-hover:text-azul-digital">
                      {sub.name}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">
                      {sub.description}
                    </p>
                    <span className="mt-4 inline-flex items-center justify-center gap-1.5 font-display text-sm font-semibold text-azul-digital transition group-hover:gap-2.5">
                      Saiba mais
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-12 flex flex-col items-center gap-4 rounded-2xl border border-cinza-borda bg-cinza-claro px-6 py-10 text-center">
              <p className="max-w-xl text-slate-600">
                Não encontrou o equipamento ideal? Conte a sua aplicação e a
                engenharia responde com proposta dimensionada.
              </p>
              <LinkButton href={`/contato?interest=${category.id}`} variant="primary" className="px-8 py-3.5 text-base">
                Fale conosco
              </LinkButton>
            </div>
          </div>
        </section>
      ) : (
        /* Corpo: descrição + imagem + CTA */
        <section className="bg-white py-16 lg:py-20">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:px-8">
            <div>
              <p className="text-lg leading-relaxed text-slate-600">
                {product.description}
              </p>
              <p className="mt-6 text-slate-600">
                Faz parte da linha de{" "}
                <Link
                  href={`/produtos/${category.id}`}
                  className="font-semibold text-azul-digital hover:underline"
                >
                  {category.label}
                </Link>
                . Solicite uma cotação e a engenharia responde com proposta
                dimensionada para a sua aplicação.
              </p>
              <div className="mt-8">
                <LinkButton href={`/contato?interest=${category.id}`} variant="primary" className="px-8 py-3.5 text-base">
                  Fale conosco
                </LinkButton>
              </div>
            </div>
            <PhotoPlaceholder
              label={product.name}
              diagonal="b"
              className="aspect-[4/3] w-full"
            />
          </div>
        </section>
      )}

      {/* Outros itens da categoria */}
      {siblings.length > 0 && (
        <section className="border-t border-cinza-borda bg-cinza-claro py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between gap-4">
              <h2 className="font-display text-xl font-bold text-azul-inst">
                Outros itens de {category.label}
              </h2>
              <Link
                href={`/produtos/${category.id}`}
                className="shrink-0 text-sm font-semibold text-azul-digital hover:underline"
              >
                Ver a linha completa →
              </Link>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {siblings.map((s) => (
                <Link
                  key={s.slug}
                  href={`/produtos/${category.id}/${s.slug}`}
                  className="group flex flex-col rounded-xl border border-cinza-borda bg-white p-5 transition hover:border-azul-digital/40 hover:shadow-md"
                >
                  <h3 className="font-display text-base font-bold text-azul-inst transition group-hover:text-azul-digital">
                    {s.name}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-slate-600">
                    {s.description}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1.5 font-display text-sm font-semibold text-azul-digital transition group-hover:gap-2.5">
                    Saiba mais
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
