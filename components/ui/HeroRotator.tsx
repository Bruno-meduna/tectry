"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import QuoteButton from "@/components/quote/QuoteButton";
import { home } from "@/content/site";

const INTERVAL = 5000; // 5s entre slides

type Slide = (typeof home.hero.slides)[number];

export default function HeroRotator() {
  const { eyebrow, ctaPrimary, slides } = home.hero;
  const [index, setIndex] = useState(0); // começa sempre no 1º (Máquinas)
  const [paused, setPaused] = useState(false);

  const go = useCallback(
    (next: number) =>
      setIndex(((next % slides.length) + slides.length) % slides.length),
    [slides.length],
  );

  // Rodízio automático; reinicia ao trocar de slide ou ao despausar.
  useEffect(() => {
    if (paused) return;
    const id = window.setTimeout(() => go(index + 1), INTERVAL);
    return () => window.clearTimeout(id);
  }, [index, paused, go]);

  return (
    <div
      className="relative isolate min-h-[560px] overflow-hidden bg-azul-inst lg:min-h-[680px]"
      aria-roledescription="carousel"
      aria-label="Destaques Tecjato"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {slides.map((slide: Slide, i) => {
        const active = i === index;
        return (
          <div
            key={slide.id}
            aria-hidden={!active}
            inert={!active}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              active ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Imagem de fundo full-bleed */}
            <Image
              src={slide.image}
              alt={slide.imageAlt}
              fill
              priority={i === 0}
              sizes="100vw"
              className="object-cover"
            />
            {/* Overlay para legibilidade do texto */}
            <div
              className="absolute inset-0 bg-gradient-to-r from-azul-inst/85 via-azul-inst/55 to-azul-inst/20"
              aria-hidden="true"
            />

            {/* Conteúdo sobre a imagem */}
            <div className="relative flex h-full items-center">
              <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
                <div className="max-w-2xl">
                  <span className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
                    {eyebrow}
                  </span>
                  <h1 className="mt-5 font-display text-4xl font-extrabold uppercase leading-[1.05] text-white drop-shadow-sm sm:text-5xl lg:text-6xl">
                    {slide.title}
                  </h1>
                  <p className="mt-5 max-w-xl text-lg font-medium leading-relaxed text-blue-50/90">
                    {slide.subtitle}
                  </p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <QuoteButton interest={slide.interest} variant="primary">
                      {ctaPrimary}
                    </QuoteButton>
                    <Link
                      href={slide.ctaSecondaryHref}
                      className="inline-flex items-center justify-center rounded-md border border-white/70 bg-white/0 px-6 py-3 font-display text-[15px] font-semibold text-white transition hover:bg-white hover:text-azul-inst"
                    >
                      {slide.ctaSecondary}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Seta anterior */}
      <button
        type="button"
        onClick={() => go(index - 1)}
        aria-label="Destaque anterior"
        className="absolute left-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/10 p-2.5 text-white backdrop-blur-sm transition hover:bg-white/25 sm:left-4"
      >
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 6l-6 6 6 6" />
        </svg>
      </button>

      {/* Seta próxima */}
      <button
        type="button"
        onClick={() => go(index + 1)}
        aria-label="Próximo destaque"
        className="absolute right-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/10 p-2.5 text-white backdrop-blur-sm transition hover:bg-white/25 sm:right-4"
      >
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 6l6 6-6 6" />
        </svg>
      </button>

      {/* Indicadores (dots) */}
      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2.5">
        {slides.map((slide: Slide, i) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => go(i)}
            aria-label={`Ir para o destaque ${i + 1}`}
            aria-current={i === index}
            className={`h-2.5 rounded-full transition-all ${
              i === index ? "w-7 bg-white" : "w-2.5 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
