# Site Tecjato

Site institucional da **Tecjato** (Grupo Febratec) — fabricante verticalizada de
preparação de superfícies (jateamento e shot peening). Objetivo único: **gerar
pedidos de cotação qualificados**, domésticos e de exportação.

Construído com **Next.js (App Router)** + **Tailwind CSS v4**, com formulário de
cotação enviado via **Resend**. Pronto para deploy na **Vercel**.

## Stack
- Next.js 15 (App Router) · React 19 · TypeScript
- Tailwind CSS v4 (tema da marca em [`app/globals.css`](app/globals.css))
- Tipografia: Lexend (títulos) + Montserrat (corpo) via `next/font`
- E-mail: Resend (rota serverless [`app/api/cotacao/route.ts`](app/api/cotacao/route.ts))

## Rodar localmente
```bash
npm install
cp .env.example .env.local   # preencha as variáveis
npm run dev                  # http://localhost:3000
```

## Variáveis de ambiente
Veja [`.env.example`](.env.example). Para o formulário funcionar em produção:

| Variável | Descrição |
| --- | --- |
| `RESEND_API_KEY` | Chave da API Resend (https://resend.com/api-keys). |
| `QUOTE_FROM_EMAIL` | Remetente verificado, ex.: `Tecjato <site@tecjato.com.br>`. Exige domínio verificado no Resend. |
| `QUOTE_TO_EMAIL` | Destino interno das cotações. Padrão: `vendas@tecjato.com.br`. |
| `NEXT_PUBLIC_SITE_URL` | URL pública (metadata/OG/sitemap), ex.: `https://www.tecjato.com.br`. |

> Sem `RESEND_API_KEY`, a rota responde `500 not_configured` e o formulário mostra
> a tela de erro com opção de WhatsApp. Configure no painel da Vercel antes de publicar.

## Deploy (Vercel)
1. Importe o repositório na Vercel (framework detectado automaticamente).
2. Cadastre as variáveis de ambiente acima em *Project Settings → Environment Variables*.
3. No Resend, **verifique o domínio `tecjato.com.br`** para enviar do `QUOTE_FROM_EMAIL`.
4. Deploy.

## Estrutura
```
app/
  layout.tsx              # layout global, metadata/SEO, fontes, JSON-LD
  page.tsx                # Início (8 seções de conversão)
  produtos/page.tsx       # Produtos (seções ancoradas por linha)
  clientes/page.tsx       # Clientes
  certificacoes/page.tsx  # Certificações
  contato/page.tsx        # Contato (formulário + mapa + representantes)
  api/cotacao/route.ts    # Envio de cotação (Resend) + auto-resposta + honeypot
  sitemap.ts · robots.ts · opengraph-image.tsx
content/site.ts           # TODA a copy (i18n-ready) — fonte única de textos
components/
  Header · Footer · WhatsAppButton · ClientLogos · ProductCard
  quote/                  # QuoteProvider, QuoteModal, QuoteForm, QuoteButton
  ui/                     # PhotoPlaceholder, ProductIcon
public/
  logo/tecjato.png        # logo (header, rodapé, OG)
  clientes/*.png          # logos reais da esteira
```

## Conteúdo a substituir (placeholders marcados)
- **Fotos industriais**: componente `PhotoPlaceholder` (P&B + corte diagonal).
  Trocar por `<Image>` quando as fotos chegarem.
- **Depoimentos** e **caso de aplicação**: textos placeholder em
  [`content/site.ts`](content/site.ts) — substituir por conteúdo autorizado.

## Internacionalização
Esta v1 publica **apenas em português**. Toda a copy está isolada em
[`content/site.ts`](content/site.ts). Para adicionar inglês (fast-follow),
replicar a estrutura e selecionar por locale — sem tocar nos componentes.

## Acessibilidade & performance
- HTML semântico, foco visível, contraste adequado.
- Esteira de logos respeita `prefers-reduced-motion` (animação pausa).
- Imagens otimizadas via `next/image`; páginas estáticas (sem layout shift).
- SEO: title/description por página, Open Graph, JSON-LD, `sitemap.xml`, `robots.txt`.
