"use client";

import { useLayoutEffect, useRef, useState } from "react";

type TimelineItem = { year: string; title: string; text: string };

// Quanto a bolinha "segura" no tema antes de começar a fluir para o próximo.
const HOLD = 0.2; // 20% segura, 80% flui

// Remapeia o progresso contínuo (0..1 no trilho) para "segura-e-flui":
// em cada trecho entre marcos, fica parada nos primeiros HOLD e depois
// desliza suavemente até o marco seguinte.
function holdAndFlow(p: number, fracs: number[]): number {
  if (fracs.length === 0) return 0;
  if (p <= fracs[0]) return fracs[0];
  const last = fracs[fracs.length - 1];
  if (p >= last) return last;

  let i = 0;
  while (i < fracs.length - 1 && p > fracs[i + 1]) i++;
  const a = fracs[i];
  const b = fracs[i + 1];
  const t = (p - a) / (b - a || 1); // 0..1 dentro do trecho
  const eased = t < HOLD ? 0 : (t - HOLD) / (1 - HOLD);
  return a + eased * (b - a);
}

export default function Timeline({ items }: { items: TimelineItem[] }) {
  const listRef = useRef<HTMLOListElement>(null);
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([]);

  // Geometria do trilho (em px, relativa ao topo da <ol>)
  const [railTop, setRailTop] = useState(0);
  const [railHeight, setRailHeight] = useState(0);
  // Fração 0..1 de cada marco ao longo do trilho
  const [dotFracs, setDotFracs] = useState<number[]>([]);
  // Progresso contínuo 0..1: centro da viewport ao longo do trilho
  const [progress, setProgress] = useState(0);

  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const compute = () => {
      const dots = dotRefs.current.filter(Boolean) as HTMLSpanElement[];
      if (dots.length === 0) return;

      const listTop = list.getBoundingClientRect().top;
      const centers = dots.map((d) => {
        const r = d.getBoundingClientRect();
        return r.top + r.height / 2; // centro do marco na viewport
      });

      const firstC = centers[0];
      const lastC = centers[centers.length - 1];
      const span = lastC - firstC || 1;

      // Trilho: do centro do 1º marco ao centro do último (relativo à <ol>)
      setRailTop(firstC - listTop);
      setRailHeight(span);
      setDotFracs(centers.map((c) => (c - firstC) / span));

      // Progresso contínuo: onde o centro da viewport cai no trilho
      const viewportCenter = window.innerHeight / 2;
      const p = Math.max(0, Math.min(1, (viewportCenter - firstC) / span));
      setProgress(p);
    };

    compute();
    window.addEventListener("scroll", compute, { passive: true });
    window.addEventListener("resize", compute);
    return () => {
      window.removeEventListener("scroll", compute);
      window.removeEventListener("resize", compute);
    };
  }, [items.length]);

  // Posição da bolinha: contínua, mas segura em cada tema antes de fluir
  const dotFrac = holdAndFlow(progress, dotFracs);
  // Item ativo = o marco que a bolinha está mais perto de alcançar
  let activeIndex = 0;
  let bestDist = Infinity;
  dotFracs.forEach((f, i) => {
    const dist = Math.abs(f - dotFrac);
    if (dist < bestDist) {
      bestDist = dist;
      activeIndex = i;
    }
  });

  return (
    <ol ref={listRef} className="relative mt-10 space-y-0">
      {/* Trilho base (cinza) */}
      <span
        aria-hidden="true"
        className="absolute left-[11px] w-px bg-cinza-borda"
        style={{ top: railTop, height: railHeight }}
      />
      {/* Trilho preenchido (azul) acompanhando a bolinha */}
      <span
        aria-hidden="true"
        className="absolute left-[11px] w-px bg-azul-digital"
        style={{ top: railTop, height: railHeight * dotFrac }}
      />
      {/* Bolinha de referência (segura no tema, depois flui) */}
      <span
        aria-hidden="true"
        className="absolute left-[5px] z-20 h-3.5 w-3.5 -translate-y-1/2 rounded-full bg-azul-digital ring-4 ring-azul-digital/25"
        style={{ top: railTop + railHeight * dotFrac }}
      />

      {items.map((item, i) => {
        const isPlaceholder = item.year.startsWith("[");
        const reached = dotFrac >= (dotFracs[i] ?? 1) - 0.001;
        const isActive = i === activeIndex;

        return (
          <li key={i} className="relative flex gap-6 pb-10 last:pb-0">
            <span
              ref={(el) => {
                dotRefs.current[i] = el;
              }}
              aria-hidden="true"
              className={`relative z-10 mt-1.5 h-6 w-6 shrink-0 rounded-full border-4 bg-white transition-colors duration-300 ${
                reached
                  ? "border-azul-digital"
                  : isPlaceholder
                    ? "border-cinza-borda"
                    : "border-azul-digital/40"
              }`}
            />
            <div className="transition-opacity duration-300" style={{ opacity: isActive ? 1 : 0.6 }}>
              <div
                className={`font-display text-lg font-bold transition-colors duration-300 ${
                  isActive
                    ? "text-azul-digital"
                    : isPlaceholder
                      ? "text-slate-400"
                      : "text-azul-digital/70"
                }`}
              >
                {item.year}
              </div>
              <h3
                className={`mt-0.5 font-display text-xl font-bold transition-colors duration-300 ${
                  isActive ? "text-azul-digital" : "text-azul-inst"
                }`}
              >
                {item.title}
              </h3>
              <p className="mt-1.5 leading-relaxed text-slate-600">{item.text}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
