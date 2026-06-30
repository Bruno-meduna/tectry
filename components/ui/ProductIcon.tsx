import type { ProductCategoryId } from "@/content/site";

const common = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const icons: Record<ProductCategoryId, React.ReactNode> = {
  equipamentos: (
    <>
      <rect x="3" y="8" width="13" height="9" rx="1.5" />
      <path d="M16 11h3l2 2v4h-5" />
      <circle cx="7" cy="19" r="1.6" />
      <circle cx="17" cy="19" r="1.6" />
      <path d="M7 8V5h4v3" />
    </>
  ),
  abrasivos: (
    <>
      <circle cx="7" cy="8" r="1.3" />
      <circle cx="12" cy="6.5" r="1.3" />
      <circle cx="17" cy="9" r="1.3" />
      <circle cx="9" cy="13" r="1.3" />
      <circle cx="15" cy="14" r="1.3" />
      <circle cx="12" cy="18" r="1.3" />
      <circle cx="6" cy="18" r="1.3" />
      <circle cx="18" cy="18" r="1.3" />
    </>
  ),
  reposicao: (
    <>
      <path d="M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z" />
      <path d="M12 3.5l1 2.2 2.4-.6.4 2.4 2.3.9-1 2.2 1 2.2-2.3.9-.4 2.4-2.4-.6-1 2.2-1-2.2-2.4.6-.4-2.4-2.3-.9 1-2.2-1-2.2 2.3-.9.4-2.4 2.4.6 1-2.2z" />
    </>
  ),
  assistencia: (
    <>
      <path d="M14.5 4.5a4 4 0 0 0-5 5l-5.5 5.5a1.8 1.8 0 0 0 2.5 2.5l5.5-5.5a4 4 0 0 0 5-5l-2.4 2.4-2.1-.5-.5-2.1 2.5-2.3z" />
    </>
  ),
};

export default function ProductIcon({ id, className = "h-6 w-6" }: { id: ProductCategoryId; className?: string }) {
  return (
    <svg {...common} className={className} aria-hidden="true">
      {icons[id]}
    </svg>
  );
}
