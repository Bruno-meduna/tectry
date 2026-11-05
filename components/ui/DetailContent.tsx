import type { ReactNode } from "react";

/**
 * Renderiza o texto completo de um produto em blocos: linhas iniciadas por
 * "•" viram lista; linhas terminadas em ":" viram subtítulo; o resto, parágrafo.
 */
export default function DetailContent({ blocks }: { blocks: string[] }) {
  const out: ReactNode[] = [];
  let bullets: string[] = [];

  const flushBullets = (key: string) => {
    if (bullets.length === 0) return;
    out.push(
      <ul key={key} className="space-y-1.5 pl-1 marker:text-azul-digital">
        {bullets.map((b, i) => (
          <li key={i} className="flex gap-2.5">
            <span
              aria-hidden="true"
              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-azul-digital"
            />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    );
    bullets = [];
  };

  blocks.forEach((line, i) => {
    if (line.startsWith("•")) {
      bullets.push(line.replace(/^•\s*/, ""));
      return;
    }
    flushBullets(`ul-${i}`);
    if (line.endsWith(":")) {
      out.push(
        <p key={i} className="font-display font-bold text-azul-inst">
          {line}
        </p>
      );
    } else {
      out.push(<p key={i}>{line}</p>);
    }
  });
  flushBullets("ul-end");

  return <div className="space-y-4 text-slate-600">{out}</div>;
}
