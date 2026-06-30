interface PhotoPlaceholderProps {
  label: string;
  className?: string;
  /** Aplica recorte diagonal inferior (assinatura da marca). */
  diagonal?: "b" | "t" | "none";
  rounded?: boolean;
}

// Placeholder claramente marcado para fotos industriais reais (P&B + corte
// diagonal). Substituir por <Image> quando as fotos forem entregues.
export default function PhotoPlaceholder({
  label,
  className = "",
  diagonal = "none",
  rounded = true,
}: PhotoPlaceholderProps) {
  const clip =
    diagonal === "b" ? "clip-diagonal-b" : diagonal === "t" ? "clip-diagonal-t" : "";
  return (
    <div
      role="img"
      aria-label={`${label} (imagem placeholder)`}
      className={`hatch relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-azul-inst via-azul-inst-700 to-slate-900 ${clip} ${
        rounded ? "rounded-xl" : ""
      } ${className}`}
    >
      <div className="flex flex-col items-center gap-3 px-6 text-center">
        <svg className="h-12 w-12 text-white/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <circle cx="9" cy="11" r="2" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 17l5-4 4 3 3-2 6 5" />
        </svg>
        <span className="max-w-[16rem] text-xs font-medium uppercase tracking-wider text-white/55">
          {label}
        </span>
        <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white/50">
          Placeholder — foto industrial
        </span>
      </div>
    </div>
  );
}
