"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { ProductCategoryId } from "@/content/site";
import QuoteModal from "./QuoteModal";

interface QuoteContextValue {
  openQuote: (interest?: ProductCategoryId) => void;
  closeQuote: () => void;
}

const QuoteContext = createContext<QuoteContextValue | null>(null);

export function useQuote(): QuoteContextValue {
  const ctx = useContext(QuoteContext);
  if (!ctx) throw new Error("useQuote deve ser usado dentro de QuoteProvider");
  return ctx;
}

export default function QuoteProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [interest, setInterest] = useState<ProductCategoryId | "">("");

  const openQuote = (preset?: ProductCategoryId) => {
    setInterest(preset ?? "");
    setOpen(true);
  };
  const closeQuote = () => setOpen(false);

  return (
    <QuoteContext.Provider value={{ openQuote, closeQuote }}>
      {children}
      <QuoteModal open={open} interest={interest} onClose={closeQuote} />
    </QuoteContext.Provider>
  );
}
