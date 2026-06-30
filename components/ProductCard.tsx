import Link from "next/link";
import type { ProductCategory } from "@/content/site";
import { productsPage } from "@/content/site";
import ProductIcon from "./ui/ProductIcon";

export default function ProductCard({ category }: { category: ProductCategory }) {
  return (
    <Link
      href={`/produtos/${category.id}`}
      className="group flex flex-col rounded-xl border border-cinza-borda bg-white p-6 transition hover:border-azul-digital/40 hover:shadow-lg"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-azul-digital/10 text-azul-digital transition group-hover:bg-azul-digital group-hover:text-white">
        <ProductIcon id={category.id} className="h-6 w-6" />
      </div>
      <h3 className="mt-4 font-display text-lg font-bold text-azul-inst">
        {category.label}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
        {category.tagline}
      </p>
      <span className="mt-5 inline-flex items-center gap-1.5 font-display text-sm font-semibold text-azul-digital transition group-hover:gap-2.5">
        {productsPage.cardCta}
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </span>
    </Link>
  );
}
