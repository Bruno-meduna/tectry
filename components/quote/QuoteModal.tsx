"use client";

import { useEffect, useRef } from "react";
import { quoteForm as t, type ProductCategoryId } from "@/content/site";
import QuoteForm from "./QuoteForm";

interface QuoteModalProps {
  open: boolean;
  interest: ProductCategoryId | "";
  onClose: () => void;
}

export default function QuoteModal({ open, interest, onClose }: QuoteModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  // Fecha no ESC e trava o scroll do body enquanto aberto.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // foco inicial no painel
    panelRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-azul-inst/70 p-4 backdrop-blur-sm sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="quote-modal-title"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={panelRef}
        tabIndex={-1}
        className="relative my-8 w-full max-w-2xl rounded-xl bg-white p-6 shadow-2xl outline-none sm:p-8"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-slate-500 transition hover:bg-cinza-claro hover:text-azul-inst"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        <div className="mb-6 pr-8">
          <h2 id="quote-modal-title" className="font-display text-2xl font-bold text-azul-inst">
            {t.title}
          </h2>
          <p className="mt-1 text-slate-600">{t.subtitle}</p>
        </div>

        <QuoteForm variant="modal" defaultInterest={interest} />
      </div>
    </div>
  );
}
