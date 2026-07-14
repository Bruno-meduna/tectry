import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  productCategories,
  productCategoryById,
  productsPage,
  type ProductCategoryId,
} from "@/content/site";
import QuoteButton from "@/components/quote/QuoteButton";
import PhotoPlaceholder from "@/components/ui/PhotoPlaceholder";
import ProductIcon from "@/components/ui/ProductIcon";
import ArrowIcon from "@/components/ui/ArrowIcon";
import Breadcrumb from "@/components/ui/Breadcrumb";

const validIds = new Set(productCategories.map((c) => c.id));

function isValidId(id: string): id is ProductCategoryId {
  return validIds.has(id as ProductCategoryId);
}

export function generateStaticParams() {
  return productCategories.map((c) => ({ categoria: c.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ categoria: string }>;
}): Promise<Metadata> {
  const { categoria } = await params;
  if (!isValidId(categoria)) return {};
  const category = productCategoryById(categoria);
  return {
    title: `${category.title} — Tecjato`,
    description: category.description,
    alternates: { canonical: `/produtos/${category.id}` },
  };
}

export default async function CategoriaPage({
  params,
}: {
  params: Promise<{ categoria: string }>;
}) {
  const { categoria } = await params;
  if (!isValidId(categoria)) notFound();

  const category = productCategoryById(categoria);
  const others = productCategories.filter((c) => c.id !== category.id);

  return (
    <>
      {/* Cabeçalho com breadcrumb */}
      <section className="hatch-dark relative overflow-hidden bg-azul-inst py-14 text-white lg:py-20">
        {category.heroImage && (
          <>
            <Image
              src={category.heroImage}
              alt={category.imageAlt}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-azul-inst/65 via-azul-inst/55 to-azul-inst/40" />
          </>
        )}
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            trail={[
              { label: productsPage.backToProducts, href: "/produtos" },
              { label: category.label },
            ]}
          />
          <div className="mt-5 flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-azul-digital text-white">
              <ProductIcon id={category.id} className="h-6 w-6" />
            </span>
            <div>
              <h1 className="font-display text-4xl font-extrabold sm:text-5xl">
                {category.title}
              </h1>
            </div>
          </div>
          <p className="mt-5 max-w-2xl text-lg text-blue-100/85">
            {category.description}
          </p>
          <div className="mt-7">
            <QuoteButton interest={category.id} variant="light">
              Solicitar cotação
            </QuoteButton>
          </div>
        </div>
      </section>

      {/* Itens da categoria */}
      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-extrabold text-azul-inst sm:text-3xl">
            {productsPage.itemsHeading}
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {category.items.map((item) => (
              <div
                key={item.slug}
                id={item.slug}
                className="group flex scroll-mt-24 flex-col overflow-hidden rounded-xl border border-cinza-borda bg-white transition hover:border-azul-digital/40 hover:shadow-lg"
              >
                <Link
                  href={`/produtos/${category.id}/${item.slug}`}
                  className="relative block aspect-[16/10] w-full overflow-hidden"
                >
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <PhotoPlaceholder
                      label={item.name}
                      rounded={false}
                      className="h-full w-full"
                    />
                  )}
                </Link>
                <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-lg font-bold text-azul-inst">
                  <Link
                    href={`/produtos/${category.id}/${item.slug}`}
                    className="transition hover:text-azul-digital"
                  >
                    {item.name}
                  </Link>
                </h3>
                {item.tags && item.tags.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-azul-digital/10 px-2.5 py-0.5 text-xs font-semibold text-azul-digital"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">
                  {item.description}
                </p>
                <div className="mt-5">
                  <Link
                    href={`/produtos/${category.id}/${item.slug}`}
                    className="inline-flex items-center gap-1.5 font-display text-sm font-semibold text-azul-digital transition hover:gap-2.5"
                  >
                    Saiba mais
                    <ArrowIcon />
                  </Link>
                </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Outras categorias */}
      <section className="border-t border-cinza-borda bg-cinza-claro py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-xl font-bold text-azul-inst">
            {productsPage.otherCategories}
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {others.map((c) => (
              <Link
                key={c.id}
                href={`/produtos/${c.id}`}
                className="group flex items-center gap-3 rounded-xl border border-cinza-borda bg-white px-5 py-4 transition hover:border-azul-digital/40 hover:shadow-md"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-azul-digital/10 text-azul-digital transition group-hover:bg-azul-digital group-hover:text-white">
                  <ProductIcon id={c.id} className="h-5 w-5" />
                </span>
                <span className="font-display text-sm font-bold text-azul-inst">
                  {c.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
