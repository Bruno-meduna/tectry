import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  productCategories,
  productVariantBy,
  productsPage,
} from "@/content/site";
import LinkButton from "@/components/ui/LinkButton";
import PhotoPlaceholder from "@/components/ui/PhotoPlaceholder";
import ProductIcon from "@/components/ui/ProductIcon";
import Breadcrumb from "@/components/ui/Breadcrumb";
import ProductDownloads from "@/components/ui/ProductDownloads";
import DetailContent from "@/components/ui/DetailContent";

export function generateStaticParams() {
  return productCategories.flatMap((c) =>
    c.items.flatMap((it) =>
      (it.subItems ?? []).flatMap((sub) =>
        (sub.subItems ?? []).map((variant) => ({
          categoria: c.id,
          item: it.slug,
          sub: sub.slug,
          variante: variant.slug,
        }))
      )
    )
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    categoria: string;
    item: string;
    sub: string;
    variante: string;
  }>;
}): Promise<Metadata> {
  const { categoria, item, sub, variante } = await params;
  const found = productVariantBy(categoria, item, sub, variante);
  if (!found) return {};
  return {
    title: `${found.variant.name} — ${found.sub.name} | Tecjato`,
    description: found.variant.description,
    alternates: {
      canonical: `/produtos/${categoria}/${item}/${sub}/${variante}`,
    },
  };
}

export default async function VariantPage({
  params,
}: {
  params: Promise<{
    categoria: string;
    item: string;
    sub: string;
    variante: string;
  }>;
}) {
  const { categoria, item, sub, variante } = await params;
  const found = productVariantBy(categoria, item, sub, variante);
  if (!found) notFound();

  const { category, item: product, sub: equipment, variant } = found;
  const base = `/produtos/${category.id}/${product.slug}/${equipment.slug}`;
  const siblings = (equipment.subItems ?? []).filter(
    (v) => v.slug !== variant.slug
  );

  return (
    <>
      {/* Cabeçalho com breadcrumb de 5 níveis */}
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
              { label: equipment.name, href: base },
              { label: variant.name },
            ]}
          />
          <div className="mt-5 flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-azul-digital text-white">
              <ProductIcon id={category.id} className="h-6 w-6" />
            </span>
            <h1 className="font-display text-3xl font-extrabold sm:text-4xl">
              {variant.name}
            </h1>
          </div>
        </div>
      </section>

      {/* Corpo: imagem + descrição + CTA */}
      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:px-8">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-cinza-claro clip-diagonal-b">
            {variant.image ? (
              <Image
                src={variant.image}
                alt={variant.name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            ) : (
              <PhotoPlaceholder
                label={variant.name}
                diagonal="b"
                rounded={false}
                className="h-full w-full"
              />
            )}
          </div>
          <div>
            <DetailContent blocks={variant.detail ?? [variant.description]} />
            <p className="mt-6 text-slate-600">
              Faz parte da linha de{" "}
              <Link
                href={base}
                className="font-semibold text-azul-digital hover:underline"
              >
                {equipment.name}
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
              specFile={variant.specFile}
              catalogFile={product.catalogFile}
              fdsFile={product.fdsFile}
              className="mt-10 border-t border-cinza-borda pt-8"
            />
          </div>
        </div>
      </section>

      {/* Outras variantes da mesma linha */}
      {siblings.length > 0 && (
        <section className="border-t border-cinza-borda bg-cinza-claro py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between gap-4">
              <h2 className="font-display text-xl font-bold text-azul-inst">
                Outras opções de {equipment.name}
              </h2>
              <Link
                href={base}
                className="shrink-0 text-sm font-semibold text-azul-digital hover:underline"
              >
                Ver a linha completa →
              </Link>
            </div>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {siblings.map((s) => (
                <Link
                  key={s.slug}
                  href={`${base}/${s.slug}`}
                  className="group flex flex-col overflow-hidden rounded-xl border border-cinza-borda bg-white text-center transition hover:border-azul-digital/40 hover:shadow-lg"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-cinza-claro">
                    {s.image ? (
                      <Image
                        src={s.image}
                        alt={s.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
