"use client";

import { useState } from "react";
import {
  productCategories,
  quoteForm as t,
  company,
  type ProductCategoryId,
} from "@/content/site";

type Status = "idle" | "submitting" | "success" | "error";

interface QuoteFormProps {
  defaultInterest?: ProductCategoryId | "";
  /** Estilo do formulário: dentro do modal ou em página. */
  variant?: "modal" | "page";
  onSuccess?: () => void;
}

const labelCls = "block text-sm font-semibold text-azul-inst mb-1.5";
const inputCls =
  "w-full rounded-md border border-cinza-borda bg-white px-3.5 py-2.5 text-[15px] text-slate-900 placeholder:text-slate-400 focus:border-azul-digital focus:ring-2 focus:ring-azul-digital/30 outline-none transition";

export default function QuoteForm({
  defaultInterest = "",
  variant = "page",
  onSuccess,
}: QuoteFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [interest, setInterest] = useState<ProductCategoryId | "">(defaultInterest);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/cotacao", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("request failed");
      setStatus("success");
      onSuccess?.();
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="text-center py-6" role="status">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-azul-digital/10">
          <svg
            className="h-7 w-7 text-azul-digital"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="font-display text-xl font-bold text-azul-inst">
          {t.success.title}
        </h3>
        <p className="mt-2 text-slate-600">{t.success.body}</p>
        <button
          type="button"
          onClick={() => {
            setInterest(defaultInterest);
            setStatus("idle");
          }}
          className="mt-5 text-sm font-semibold text-azul-digital hover:underline"
        >
          {t.success.again}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      {status === "error" && (
        <div
          role="alert"
          className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
        >
          <p className="font-semibold">{t.error.title}</p>
          <p className="mt-0.5">{t.error.body}</p>
          <div className="mt-2 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="font-semibold text-red-800 underline"
            >
              {t.error.retry}
            </button>
            <a
              href={company.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-red-800 underline"
            >
              {t.error.whatsapp}
            </a>
          </div>
        </div>
      )}

      {/* Honeypot anti-spam — oculto de usuários, preenchido só por bots */}
      <div className="absolute left-[-9999px] top-[-9999px]" aria-hidden="true">
        <label>
          Não preencha este campo
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="qf-name" className={labelCls}>
            {t.fields.name} <span className="text-azul-digital">*</span>
          </label>
          <input id="qf-name" name="name" required autoComplete="name" className={inputCls} />
        </div>
        <div>
          <label htmlFor="qf-company" className={labelCls}>
            {t.fields.company} <span className="text-azul-digital">*</span>
          </label>
          <input id="qf-company" name="company" required autoComplete="organization" className={inputCls} />
        </div>
        <div>
          <label htmlFor="qf-email" className={labelCls}>
            {t.fields.email} <span className="text-azul-digital">*</span>
          </label>
          <input id="qf-email" name="email" type="email" required autoComplete="email" className={inputCls} />
        </div>
        <div>
          <label htmlFor="qf-phone" className={labelCls}>
            {t.fields.phone} <span className="text-azul-digital">*</span>
          </label>
          <input id="qf-phone" name="phone" required autoComplete="tel" className={inputCls} />
        </div>
        <div>
          <label htmlFor="qf-country" className={labelCls}>
            {t.fields.country}
          </label>
          <input id="qf-country" name="country" autoComplete="country-name" className={inputCls} />
        </div>
        <div>
          <label htmlFor="qf-interest" className={labelCls}>
            {t.fields.interest} <span className="text-azul-digital">*</span>
          </label>
          <select
            id="qf-interest"
            name="interest"
            required
            value={interest}
            onChange={(e) => setInterest(e.target.value as ProductCategoryId)}
            className={`${inputCls} ${interest === "" ? "text-slate-400" : ""}`}
          >
            <option value="" disabled>
              {t.fields.interestPlaceholder}
            </option>
            {productCategories.map((p) => (
              <option key={p.id} value={p.id} className="text-slate-900">
                {p.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="qf-message" className={labelCls}>
          {t.fields.message}
        </label>
        <textarea
          id="qf-message"
          name="message"
          rows={variant === "modal" ? 3 : 4}
          placeholder={t.fields.messagePlaceholder}
          className={`${inputCls} resize-y`}
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-md bg-azul-digital px-6 py-3 font-display font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "submitting" ? t.submitting : t.submit}
      </button>
    </form>
  );
}
