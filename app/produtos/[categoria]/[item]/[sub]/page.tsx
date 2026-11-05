import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  productCategories,
  productSubItemBy,
  productsPage,
} from "@/content/site";
import LinkButton from "@/components/ui/LinkButton";
import PhotoPlaceholder from "@/components/ui/PhotoPlaceholder";
import ProductIcon from "@/components/ui/ProductIcon";
import Breadcrumb from "@/components/ui/Breadcrumb";
import ProductDownloads from "@/components/ui/ProductDownloads";
import DetailContent from "@/components/ui/DetailContent";
import ArrowIcon from "@/components/ui/ArrowIcon";

export function generateStaticParams() {
  return productCategories.flatMap((c) =>
    c.items.flatMap((it) =>
      (it.subItems ?? []).map((sub) => ({
        categoria: c.id,
        item: it.slug,
        sub: sub.slug,
      }))
    )
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ categoria: string; item: string; sub: string }>;
}): Promise<Metadata> {
  const { categoria, item, sub } = await params;
  const found = productSubItemBy(categoria, item, sub);
  if (!found) return {};
  return {
    title: `${found.sub.name} — ${found.item.name} | Tecjato`,
    description: found.sub.description,
    alternates: { canonical: `/produtos/${categoria}/${item}/${sub}` },
  };
}

export default async function SubItemPage({
  params,
}: {
  params: Promise<{ categoria: string; item: string; sub: string }>;
}) {
  const { categoria, item, sub } = await params;
  const found = productSubItemBy(categoria, item, sub);
  if (!found) notFound();

  const { category, item: product, sub: equipment } = found;
  const siblings = (product.subItems ?? []).filter(
    (s) => s.slug !== equipment.slug
  );

  return (
    <>
      {/* Cabeçalho com breadcrumb de 4 níveis */}
      <section className="hatch-dark bg-azul-inst py-14 text-white lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            trail={[
              { label: productsPage.backToProducts, href: "/produtos" },
              { label: category.label, href: `/produtos/${category.id}` },
              {
                label: product.name,
                href: `/produtos/${category.id}/${product.slug}`,
              },
              { label: equipment.name },
            ]}
          />
          <div className="mt-5 flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-azul-digital text-white">
              <ProductIcon id={category.id} className="h-6 w-6" />
            </span>
            <h1 className="font-display text-3xl font-extrabold sm:text-4xl">
              {equipment.name}
            </h1>
          </div>
        </div>
      </section>

      {equipment.subItems && equipment.subItems.length > 0 ? (
        /* Corpo: texto + grade de variantes (nível 5) */
        <section className="bg-white py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl text-lg leading-relaxed">
              <DetailContent
                blocks={equipment.detail ?? [equipment.description]}
              />
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {equipment.subItems.map((variant) => (
                <Link
                  key={variant.slug}
                  href={`/produtos/${category.id}/${product.slug}/${equipment.slug}/${variant.slug}`}
                  className="group flex flex-col overflow-hidden rounded-xl border border-cinza-borda bg-white text-center transition hover:border-azul-digital/40 hover:shadow-lg"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-cinza-claro">
                    {variant.image ? (
                      <Image
                        src={variant.image}
                        alt={variant.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <PhotoPlaceholder
                        label={variant.name}
                        rounded={false}
                        className="h-full w-full"
                      />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-display text-base font-bold uppercase tracking-wide text-azul-inst transition group-hover:text-azul-digital">
                      {variant.name}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">
                      {variant.description}
                    </p>
                    <span className="mt-4 inline-flex items-center justify-center gap-1.5 font-display text-sm font-semibold text-azul-digital transition group-hover:gap-2.5">
                      Saiba mais
                      <ArrowIcon />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-12 flex flex-wrap items-center gap-3 border-t border-cinza-borda pt-10">
              <LinkButton
                href={`/contato?interest=${category.id}`}
                variant="primary"
                className="px-8 py-3.5 text-base"
              >
                Fale conosco
              </LinkButton>
            </div>
            <ProductDownloads
              specFile={equipment.specFile}
              catalogFile={product.catalogFile}
              fdsFile={product.fdsFile}
              className="mt-10"
            />
          </div>
        </section>
      ) : (
        /* Corpo: imagem + descrição + CTA */
      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:px-8">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-cinza-claro clip-diagonal-b">
            {equipment.image ? (
              <Image
                src={equipment.image}
                alt={equipment.name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            ) : (
              <PhotoPlaceholder
                label={equipment.name}
                diagonal="b"
                rounded={false}
                className="h-full w-full"
              />
            )}
          </div>
          <div>
            <DetailContent blocks={equipment.detail ?? [equipment.description]} />
            <p className="mt-6 text-slate-600">
              Faz parte da linha de{" "}
              <Link
                href={`/produtos/${category.id}/${product.slug}`}
                className="font-semibold text-azul-digital hover:underline"
              >
                {product.name}
              </Link>
              . Conte a sua aplicação e a engenharia responde com proposta
              dimensionada.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <LinkButton
                href={`/contato?interest=${category.id}`}
                variant="primary"
                className="px-8 py-3.5 text-base"
              >
                Fale conosco
              </LinkButton>
            </div>
            <ProductDownloads
              specFile={equipment.specFile}
              catalogFile={product.catalogFile}
              fdsFile={product.fdsFile}
              className="mt-10 border-t border-cinza-borda pt-8"
            />
          </div>
        </div>
      </section>

      )}

      {/* Outros equipamentos da mesma linha */}
      {siblings.length > 0 && (
        <section className="border-t border-cinza-borda bg-cinza-claro py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between gap-4">
              <h2 className="font-display text-xl font-bold text-azul-inst">
                Outros equipamentos de {product.name}
              </h2>
              <Link
                href={`/produtos/${category.id}/${product.slug}`}
                className="shrink-0 text-sm font-semibold text-azul-digital hover:underline"
              >
                Ver a linha completa →
              </Link>
            </div>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {siblings.map((s) => (
                <Link
                  key={s.slug}
                  href={`/produtos/${category.id}/${product.slug}/${s.slug}`}
                  className="group flex flex-col overflow-hidden rounded-xl border border-cinza-borda bg-white text-center transition hover:border-azul-digital/40 hover:shadow-lg"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-cinza-claro">
                    {s.image ? (
                      <Image
                        src={s.image}
                        alt={s.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <PhotoPlaceholder
                        label={s.name}
                        rounded={false}
                        className="h-full w-full"
                      />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-display text-base font-bold uppercase tracking-wide text-azul-inst transition group-hover:text-azul-digital">
                      {s.name}
                    </h3>
                    <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-600">
                      {s.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
