"use client";

import { useQuote } from "./QuoteProvider";
import { buttonClasses, type Variant } from "@/components/ui/buttonClasses";
import type { ProductCategoryId } from "@/content/site";

interface QuoteButtonProps {
  interest?: ProductCategoryId;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  fullWidth?: boolean;
}

export default function QuoteButton({
  interest,
  children,
  variant = "primary",
  className = "",
  fullWidth = false,
}: QuoteButtonProps) {
  const { openQuote } = useQuote();
  return (
    <button
      type="button"
      onClick={() => openQuote(interest)}
      className={buttonClasses(variant, fullWidth, className)}
    >
      {children}
    </button>
  );
}
