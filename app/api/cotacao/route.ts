import { NextResponse } from "next/server";
import { Resend } from "resend";
import {
  productCategories,
  productCategoryById,
  company,
  type ProductCategoryId,
} from "@/content/site";

export const runtime = "nodejs";

const TO_EMAIL = process.env.QUOTE_TO_EMAIL || "vendas@tecjato.com.br";
const FROM_EMAIL =
  process.env.QUOTE_FROM_EMAIL || "Tecjato <onboarding@resend.dev>";

interface Payload {
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  country?: string;
  interest?: string;
  message?: string;
  website?: string; // honeypot
}

function esc(v = ""): string {
  return v
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

const isCategoryId = (v: string): v is ProductCategoryId =>
  productCategories.some((c) => c.id === v);

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  // Honeypot: bot preencheu o campo oculto → finge sucesso, não envia.
  if (body.website && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const name = (body.name || "").trim();
  const empresa = (body.company || "").trim();
  const email = (body.email || "").trim();
  const phone = (body.phone || "").trim();
  const country = (body.country || "").trim();
  const interestId = (body.interest || "").trim();
  const message = (body.message || "").trim();

  if (!name || !empresa || !email || !phone || !interestId) {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  }
  if (!isEmail(email)) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }
  if (!isCategoryId(interestId)) {
    return NextResponse.json({ error: "invalid_interest" }, { status: 400 });
  }

  const interestLabel = productCategoryById(interestId).label;

  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY ausente — não foi possível enviar a cotação.");
    return NextResponse.json({ error: "not_configured" }, { status: 500 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const subject = `Cotação, ${interestLabel}, ${empresa}`;

  const internalHtml = `
    <div style="font-family:Arial,Helvetica,sans-serif;color:#1a2230;max-width:600px">
      <h2 style="color:#014076;margin:0 0 4px">Nova solicitação de cotação</h2>
      <p style="color:#0057FF;font-weight:bold;margin:0 0 16px">${esc(interestLabel)}</p>
      <table style="border-collapse:collapse;width:100%">
        <tr><td style="padding:6px 0;color:#64748b">Nome</td><td style="padding:6px 0;font-weight:bold">${esc(name)}</td></tr>
        <tr><td style="padding:6px 0;color:#64748b">Empresa</td><td style="padding:6px 0;font-weight:bold">${esc(empresa)}</td></tr>
        <tr><td style="padding:6px 0;color:#64748b">E-mail</td><td style="padding:6px 0"><a href="mailto:${esc(email)}">${esc(email)}</a></td></tr>
        <tr><td style="padding:6px 0;color:#64748b">Telefone/WhatsApp</td><td style="padding:6px 0">${esc(phone)}</td></tr>
        ${country ? `<tr><td style="padding:6px 0;color:#64748b">País</td><td style="padding:6px 0">${esc(country)}</td></tr>` : ""}
        <tr><td style="padding:6px 0;color:#64748b">Interesse</td><td style="padding:6px 0">${esc(interestLabel)}</td></tr>
      </table>
      ${
        message
          ? `<div style="margin-top:16px"><div style="color:#64748b">Mensagem</div><p style="white-space:pre-wrap;margin:4px 0 0">${esc(message)}</p></div>`
          : ""
      }
    </div>`;

  const confirmHtml = `
    <div style="font-family:Arial,Helvetica,sans-serif;color:#1a2230;max-width:600px">
      <h2 style="color:#014076">Recebemos a sua solicitação</h2>
      <p>Olá ${esc(name)}, obrigado pelo contato com a Tecjato.</p>
      <p>Registramos o seu interesse em <strong>${esc(interestLabel)}</strong> e nossa equipe de engenharia responderá em breve com uma proposta dimensionada para a sua aplicação.</p>
      <p style="margin-top:20px">Se preferir, fale com a gente agora:</p>
      <p>
        Telefone: <strong>${esc(company.phoneDisplay)}</strong><br/>
        WhatsApp: <a href="${company.whatsapp}">${esc(company.phoneDisplay)}</a><br/>
        E-mail: <a href="mailto:${esc(company.email)}">${esc(company.email)}</a>
      </p>
      <hr style="border:none;border-top:1px solid #e2e7ee;margin:24px 0"/>
      <p style="color:#64748b;font-size:13px">Tecjato — Grupo Febratec · Preparação de superfícies desde 1987 · Araquari/SC</p>
    </div>`;

  try {
    // E-mail interno para a equipe de vendas
    const internal = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject,
      html: internalHtml,
    });
    if (internal.error) {
      throw new Error(internal.error.message);
    }

    // Auto-resposta de confirmação ao cliente (falha aqui não invalida o envio)
    try {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: email,
        replyTo: company.email,
        subject: "Recebemos a sua solicitação de cotação — Tecjato",
        html: confirmHtml,
      });
    } catch (e) {
      console.error("Falha na auto-resposta ao cliente:", e);
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Falha ao enviar cotação:", e);
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }
}
