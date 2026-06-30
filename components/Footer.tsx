import Link from "next/link";
import Image from "next/image";
import { company, footer, nav, productCategories } from "@/content/site";

function SocialIcon({ kind }: { kind: "facebook" | "linkedin" | "instagram" }) {
  const paths: Record<string, React.ReactNode> = {
    facebook: <path d="M13.5 9H16V6h-2.5C11.6 6 10 7.6 10 9.5V11H8v3h2v7h3v-7h2.2l.4-3H13V9.6c0-.4.2-.6.5-.6z" />,
    linkedin: (
      <path d="M6.94 7.5a1.94 1.94 0 1 1 0-3.88 1.94 1.94 0 0 1 0 3.88zM5.25 9h3.4v11h-3.4V9zM10.5 9h3.25v1.5h.05c.45-.85 1.56-1.75 3.2-1.75 3.42 0 4 2.25 4 5.18V20h-3.4v-4.9c0-1.17-.02-2.67-1.63-2.67-1.63 0-1.88 1.27-1.88 2.58V20h-3.4V9z" />
    ),
    instagram: (
      <>
        <rect x="4" y="4" width="16" height="16" rx="4.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="12" cy="12" r="3.4" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="16.5" cy="7.5" r="1.1" />
      </>
    ),
  };
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
      {paths[kind]}
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="hatch-dark relative bg-azul-inst text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Marca */}
          <div>
            <div className="inline-flex rounded-md bg-white px-4 py-3">
              <Image src="/logo/tecjato-trim.png" alt="Tecjato" width={200} height={47} className="h-9 w-auto" />
            </div>
            <p className="mt-4 max-w-xs text-sm text-blue-100/80">{footer.tagline}</p>
            <div className="mt-5 flex gap-3">
              <a href={company.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition hover:bg-azul-digital">
                <SocialIcon kind="facebook" />
              </a>
              <a href={company.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition hover:bg-azul-digital">
                <SocialIcon kind="linkedin" />
              </a>
              <a href={company.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition hover:bg-azul-digital">
                <SocialIcon kind="instagram" />
              </a>
            </div>
          </div>

          {/* Navegação */}
          <nav aria-label="Rodapé — páginas">
            <h3 className="font-display text-sm font-bold uppercase tracking-wide text-blue-100/70">Navegação</h3>
            <ul className="mt-4 space-y-2.5">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-blue-50/90 transition hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Produtos */}
          <nav aria-label="Rodapé — produtos">
            <h3 className="font-display text-sm font-bold uppercase tracking-wide text-blue-100/70">Produtos</h3>
            <ul className="mt-4 space-y-2.5">
              {productCategories.map((p) => (
                <li key={p.id}>
                  <Link href={`/produtos/${p.id}`} className="text-sm text-blue-50/90 transition hover:text-white">
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contato */}
          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wide text-blue-100/70">Contato</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-blue-50/90">
              <li>
                <a href={`tel:${company.phoneHref}`} className="transition hover:text-white">{company.phoneDisplay}</a>
              </li>
              <li>
                <a href={`mailto:${company.email}`} className="transition hover:text-white">{company.email}</a>
              </li>
              <li>
                <a href={company.whatsapp} target="_blank" rel="noopener noreferrer" className="transition hover:text-white">WhatsApp</a>
              </li>
              <li className="pt-1 text-blue-100/70">
                {company.address.line}
                <br />
                {company.address.city} — {company.address.zip}
                <br />
                {company.address.country}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/15 pt-6 text-xs text-blue-100/70 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {footer.rights}
          </p>
          <a href={footer.internalLinkHref} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-50/90 underline-offset-2 transition hover:text-white hover:underline">
            {footer.internalLinkLabel}
          </a>
        </div>
      </div>
    </footer>
  );
}
