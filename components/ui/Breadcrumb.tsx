import { Fragment } from "react";
import Link from "next/link";

export interface Crumb {
  label: string;
  /** Sem href, o item é renderizado como página atual (texto simples). */
  href?: string;
}

// Trilha de navegação usada nos cabeçalhos escuros das páginas de produtos.
export default function Breadcrumb({ trail }: { trail: Crumb[] }) {
  return (
    <nav aria-label="Trilha" className="text-sm text-blue-100/70">
      {trail.map((crumb, i) => (
        <Fragment key={`${crumb.label}-${i}`}>
          {i > 0 && <span className="px-2">/</span>}
          {crumb.href ? (
            <Link href={crumb.href} className="transition hover:text-white">
              {crumb.label}
            </Link>
          ) : (
            <span className="text-blue-50">{crumb.label}</span>
          )}
        </Fragment>
      ))}
    </nav>
  );
}
