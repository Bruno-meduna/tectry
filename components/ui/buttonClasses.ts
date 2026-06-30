// Estilos compartilhados entre QuoteButton (abre modal) e LinkButton (navega),
// para que os dois nunca divirjam visualmente.

export type Variant = "primary" | "secondary" | "light";

const base =
  "inline-flex items-center justify-center rounded-md px-6 py-3 font-display text-[15px] font-semibold transition";

const variants: Record<Variant, string> = {
  primary: "bg-azul-digital text-white hover:bg-blue-700 shadow-sm",
  secondary:
    "bg-white text-azul-inst border border-cinza-borda hover:border-azul-digital hover:text-azul-digital",
  light: "bg-white text-azul-inst hover:bg-cinza-claro shadow-sm",
};

export function buttonClasses(
  variant: Variant = "primary",
  fullWidth = false,
  className = ""
): string {
  return `${base} ${variants[variant]} ${fullWidth ? "w-full" : ""} ${className}`;
}
