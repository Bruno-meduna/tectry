"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { nav, productCategories, company } from "@/content/site";
import QuoteButton from "./quote/QuoteButton";
import ArrowIcon from "./ui/ArrowIcon";

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [prodOpen, setProdOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-cinza-borda bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center" aria-label="Tecjato — início">
          <Image
            src="/logo/tecjato-trim.png"
            alt="Tecjato"
            width={200}
            height={47}
            priority
            className="h-10 w-auto sm:h-11"
          />
        </Link>

        {/* Nav central (desktop) */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Principal">
          {nav.map((item) =>
            item.hasDropdown ? (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => setProdOpen(true)}
                onMouseLeave={() => setProdOpen(false)}
              >
                <Link
                  href={item.href}
                  className={`flex items-center gap-1 rounded-md px-3 py-2 text-[15px] font-medium transition ${
                    pathname.startsWith("/produtos")
                      ? "text-azul-digital"
                      : "text-azul-inst hover:text-azul-digital"
                  }`}
                  aria-expanded={prodOpen}
                >
                  {item.label}
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
                  </svg>
                </Link>
                {prodOpen && (
                  <div className="absolute left-1/2 top-full w-[760px] max-w-[calc(100vw-2rem)] -translate-x-1/2 pt-2">
                    <div className="overflow-hidden rounded-xl border border-cinza-borda bg-white p-5 shadow-xl">
                      <div className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4">
                        {productCategories.map((cat) => (
                          <div key={cat.id}>
                            <Link
                              href={`/produtos/${cat.id}`}
                              onClick={() => setProdOpen(false)}
                              className="block font-display text-sm font-bold uppercase tracking-wide text-azul-inst transition hover:text-azul-digital"
                            >
                              {cat.label}
                            </Link>
                            <ul className="mt-2.5 space-y-1.5">
                              {cat.items.map((it) => (
                                <li key={it.slug}>
                                  <Link
                                    href={`/produtos/${cat.id}/${it.slug}`}
                                    onClick={() => setProdOpen(false)}
                                    className="block text-[13px] leading-snug text-slate-600 transition hover:text-azul-digital"
                                  >
                                    {it.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                      <div className="mt-5 border-t border-cinza-borda pt-3">
                        <Link
                          href="/produtos"
                          onClick={() => setProdOpen(false)}
                          className="inline-flex items-center gap-1.5 text-sm font-semibold text-azul-digital transition hover:gap-2.5"
                        >
                          Ver todos os produtos
                          <ArrowIcon />
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-md px-3 py-2 text-[15px] font-medium transition ${
                  pathname === item.href
                    ? "text-azul-digital"
                    : "text-azul-inst hover:text-azul-digital"
                }`}
              >
                {item.label}
              </Link>
            )
          )}
          <a
            href="https://febratec.auvo.com.br/Login#signin"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md px-3 py-2 text-[15px] font-medium text-azul-inst transition hover:text-azul-digital"
          >
            Acesso do cliente
          </a>
        </nav>

        {/* Contato + CTA (desktop) */}
        <div className="hidden items-center gap-4 lg:flex">
          <div className="flex flex-col items-end text-right leading-tight">
            <a
              href={`tel:${company.phoneHref}`}
              className="text-sm font-semibold text-azul-inst hover:text-azul-digital"
            >
              {company.phoneDisplay}
            </a>
            <a
              href={`mailto:${company.email}`}
              className="text-xs text-slate-500 hover:text-azul-digital"
            >
              {company.email}
            </a>
          </div>
          <QuoteButton variant="primary" className="px-5 py-2.5">
            Solicitar cotação
          </QuoteButton>
        </div>

        {/* Botão mobile */}
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-azul-inst lg:hidden"
          aria-label="Abrir menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            {mobileOpen ? (
              <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Menu mobile */}
      {mobileOpen && (
        <div className="border-t border-cinza-borda bg-white lg:hidden">
          <nav className="mx-auto max-w-7xl px-4 py-4" aria-label="Mobile">
            <ul className="space-y-1">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-md px-3 py-2.5 font-medium text-azul-inst hover:bg-cinza-claro"
                  >
                    {item.label}
                  </Link>
                  {item.hasDropdown && (
                    <ul className="ml-3 space-y-1 border-l border-cinza-borda pl-3">
                      {productCategories.map((cat) => (
                        <li key={cat.id} className="pt-1">
                          <Link
                            href={`/produtos/${cat.id}`}
                            onClick={() => setMobileOpen(false)}
                            className="block rounded-md px-3 py-1.5 text-sm font-semibold text-azul-inst hover:bg-cinza-claro"
                          >
                            {cat.label}
                          </Link>
                          <ul className="ml-2 border-l border-cinza-borda pl-2">
                            {cat.items.map((it) => (
                              <li key={it.slug}>
                                <Link
                                  href={`/produtos/${cat.id}/${it.slug}`}
                                  onClick={() => setMobileOpen(false)}
                                  className="block rounded-md px-3 py-1 text-[13px] text-slate-500 hover:bg-cinza-claro"
                                >
                                  {it.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
            <div className="mt-4 space-y-3 border-t border-cinza-borda pt-4">
              <a href={`tel:${company.phoneHref}`} className="block text-sm font-semibold text-azul-inst">
                {company.phoneDisplay}
              </a>
              <a href={`mailto:${company.email}`} className="block text-sm text-slate-500">
                {company.email}
              </a>
              <a
                href="https://febratec.auvo.com.br/Login#signin"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="block rounded-md border border-cinza-borda px-4 py-2.5 text-center text-sm font-semibold text-azul-inst transition hover:border-azul-digital hover:text-azul-digital"
              >
                Acesso do cliente
              </a>
              <QuoteButton variant="primary" fullWidth>
                Solicitar cotação
              </QuoteButton>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
