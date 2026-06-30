import type { Metadata } from "next";
import { Lexend, Montserrat } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import QuoteProvider from "@/components/quote/QuoteProvider";
import { company } from "@/content/site";

const lexend = Lexend({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lexend",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.tecjato.com.br";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Tecjato — Máquinas de jateamento e shot peening sob medida",
    template: "%s | Tecjato",
  },
  description:
    "Fabricante verticalizada de máquinas de jateamento e linha contínua, abrasivos próprios, fundição e shot peening (distribuidora oficial Electronics Inc.). ISO 9001:2015, desde 1987.",
  keywords: [
    "jateamento",
    "shot peening",
    "granalha de aço",
    "máquina de jateamento",
    "preparação de superfície",
    "Electronics Inc",
    "Tecjato",
    "Febratec",
  ],
  authors: [{ name: "Tecjato" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteUrl,
    siteName: "Tecjato",
    title: "Tecjato — Máquinas de jateamento e shot peening sob medida",
    description:
      "Fabricante verticalizada de jateamento: máquinas sob medida, abrasivo próprio, fundição e shot peening. ISO 9001:2015, desde 1987.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tecjato — Máquinas de jateamento e shot peening sob medida",
    description:
      "Fabricante verticalizada de jateamento: máquinas sob medida, abrasivo próprio, fundição e shot peening.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Tecjato",
    url: siteUrl,
    logo: `${siteUrl}/logo/tecjato.png`,
    foundingDate: "1987",
    email: company.email,
    telephone: company.phoneDisplay,
    address: {
      "@type": "PostalAddress",
      streetAddress: company.address.line,
      addressLocality: "Araquari",
      addressRegion: "SC",
      postalCode: company.address.zip,
      addressCountry: "BR",
    },
    sameAs: [
      company.social.facebook,
      company.social.linkedin,
      company.social.instagram,
    ],
  };

  return (
    <html lang="pt-BR" className={`${lexend.variable} ${montserrat.variable}`}>
      <body className="flex min-h-screen flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <QuoteProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppButton />
        </QuoteProvider>
      </body>
    </html>
  );
}
