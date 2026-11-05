"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { home, productCategories } from "@/content/site";
import ArrowIcon from "@/components/ui/ArrowIcon";
import ProductionLineScene from "./ProductionLineScene";

const line = home.productionLine;

/**
 * Cada parada da linha representa uma categoria de produto. Nome e link saem de
 * `productCategories`; o texto e a posição na cena saem de `home.productionLine`.
 */
const STATIONS = line.stations.map((station) => {
  const category = productCategories.find((c) => c.id === station.id);
  return {
    ...station,
    name: category?.label ?? station.id,
    href: `/produtos/${station.id}`,
    target: `e-${station.id}`,
  };
});

/** Largura do viewBox da cena. A posição `x` de cada parada é medida nela. */
const SCENE_WIDTH = 1600;

/** Abaixo disso a seção não prende na tela: vira rolagem horizontal simples. */
const GUIDED_QUERY = "(min-width: 1024px)";

/** Distância, em unidades do viewBox, para um rótulo aparecer no enquadramento. */
const LABEL_RANGE = 340;

export default function ProductionLine() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);

  const [activeId, setActiveId] = useState(STATIONS[0].id);
  const [visibleLabels, setVisibleLabels] = useState<string[]>([STATIONS[0].id]);
  const [guided, setGuided] = useState(false);

  /** Quanto a cena pode deslizar para a esquerda, em pixels. */
  const travel = useCallback(() => {
    const track = trackRef.current;
    const stage = stageRef.current;
    const svg = track?.querySelector("svg");
    if (!track || !stage || !svg) return { width: 0, max: 0, visible: 0 };
    const width = svg.getBoundingClientRect().width;
    const visible = stage.clientWidth;
    return { width, visible, max: Math.max(0, width - visible) };
  }, []);

  const update = useCallback(() => {
    const scroller = scrollRef.current;
    const sticky = stickyRef.current;
    const track = trackRef.current;
    if (!scroller || !sticky || !track) return;

    if (!window.matchMedia(GUIDED_QUERY).matches) {
      track.style.transform = "";
      setGuided(false);
      return;
    }
    setGuided(true);

    const course = scroller.offsetHeight - sticky.offsetHeight;
    const passed = -scroller.getBoundingClientRect().top;
    const progress = course > 0 ? Math.min(1, Math.max(0, passed / course)) : 0;

    const { width, visible, max } = travel();
    track.style.transform = `translateX(${-(progress * max).toFixed(1)}px)`;
    if (barRef.current) barRef.current.style.width = `${(progress * 100).toFixed(1)}%`;

    // A parada mais próxima do centro do enquadramento é a que está em foco.
    if (width > 0) {
      const center = ((progress * max + visible / 2) / width) * SCENE_WIDTH;
      let nearest = STATIONS[0];
      let shortest = Infinity;
      for (const station of STATIONS) {
        const distance = Math.abs(station.x - center);
        if (distance < shortest) {
          shortest = distance;
          nearest = station;
        }
      }
      setActiveId(nearest.id);
      setVisibleLabels(
        STATIONS.filter((s) => Math.abs(s.x - center) < LABEL_RANGE).map((s) => s.id),
      );
    }
  }, [travel]);

  useEffect(() => {
    let queued = false;
    const schedule = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        update();
      });
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [update]);

  /** Clicar numa etapa do painel leva o scroll até ela. */
  const goTo = (stationId: string) => {
    const station = STATIONS.find((s) => s.id === stationId);
    const scroller = scrollRef.current;
    const sticky = stickyRef.current;
    if (!station || !scroller || !sticky || !window.matchMedia(GUIDED_QUERY).matches) {
      setActiveId(stationId as typeof activeId);
      return;
    }
    const { width, visible, max } = travel();
    const targetPx = (station.x / SCENE_WIDTH) * width - visible / 2;
    const ratio = max > 0 ? Math.min(1, Math.max(0, targetPx / max)) : 0;
    const course = scroller.offsetHeight - sticky.offsetHeight;
    window.scrollTo({ top: scroller.offsetTop + ratio * course, behavior: "smooth" });
  };

  return (
    <section className="bg-cinza-claro">
      <div className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8 lg:pt-20">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-extrabold text-azul-inst sm:text-4xl">
            {line.title}
          </h2>
          <p className="mt-3 text-lg text-slate-600">{line.subtitle}</p>
        </div>
        <p className="mt-6 hidden items-center gap-2 font-display text-sm font-semibold text-azul-digital lg:inline-flex">
          {line.hint}
          <svg
            className="linha-seta h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            aria-hidden="true"
          >
            <path d="M12 5v14M6 13l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </p>
      </div>

      <div ref={scrollRef} className="linha-rolagem">
        <div ref={stickyRef} className="linha-fixo">
          <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-center lg:gap-6 lg:px-8">
            <div>
              <div
                ref={stageRef}
                className={`linha-cena${guided ? " focando" : ""}`}
                aria-hidden="true"
              >
                <div ref={trackRef} className="linha-trilho">
                  <ProductionLineScene active={`e-${activeId}`} />
                  {STATIONS.map((station) => (
                    <span
                      key={station.id}
                      className={
                        "linha-rotulo" +
                        (visibleLabels.includes(station.id) ? " visivel" : "") +
                        (activeId === station.id ? " ativo" : "")
                      }
                      style={{ left: `${(station.x / SCENE_WIDTH) * 100}%` }}
                    >
                      <b>{STATIONS.indexOf(station) + 1}</b>
                      {station.marker}
                    </span>
                  ))}
                </div>
                <div className="linha-barra">
                  <span ref={barRef} />
                </div>
              </div>

              <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-500 sm:text-[13px]">
                {line.legend.map((item) => (
                  <li key={item.state}>
                    <i className={`linha-amostra linha-amostra--${item.state}`} />
                    {item.label}
                  </li>
                ))}
              </ul>
            </div>

            <ol className="rounded-2xl border border-cinza-borda bg-white p-2">
              {STATIONS.map((station, index) => {
                const open = station.id === activeId;
                return (
                  <li key={station.id}>
                    <button
                      type="button"
                      onClick={() => goTo(station.id)}
                      aria-expanded={open}
                      className={`linha-passo${open ? " aberto" : ""}`}
                    >
                      <span className="flex items-baseline gap-2.5">
                        <span className="linha-indice">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="linha-nome">{station.name}</span>
                      </span>
                      <span className="linha-conteudo">
                        <span>
                          <span className="mt-2 block text-[13.5px] leading-relaxed text-slate-600">
                            {station.text}
                          </span>
                        </span>
                      </span>
                    </button>
                    {open && (
                      <Link
                        href={station.href}
                        className="mb-2 ml-[3.1rem] inline-flex items-center gap-2 font-display text-[13.5px] font-semibold text-azul-digital transition hover:gap-3"
                      >
                        {line.cta}
                        <ArrowIcon />
                      </Link>
                    )}
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
