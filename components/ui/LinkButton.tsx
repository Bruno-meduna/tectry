import Link from "next/link";
import { buttonClasses, type Variant } from "./buttonClasses";

interface LinkButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  fullWidth?: boolean;
}

// Botão com a aparência do QuoteButton, porém navega para uma rota.
export default function LinkButton({
  href,
  children,
  variant = "primary",
  className = "",
  fullWidth = false,
}: LinkButtonProps) {
  return (
    <Link href={href} className={buttonClasses(variant, fullWidth, className)}>
      {children}
    </Link>
  );
}
