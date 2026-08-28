import type { Metadata } from "next";
import Link from "next/link";
import fs from "fs";
import path from "path";
import { certificates, productCategories, resourcesPage } from "@/content/site";
import PageHero from "@/components/ui/PageHero";
import DownloadIcon from "@/components/ui/DownloadIcon";
import { documentHref } from "@/lib/documents";

/** Só lista o documento se o PDF já existir de fato em /public/documentos/{folder}/. */
function docExists(folder: string, file: string): boolean {
  return fs.existsSync(path.join(process.cwd(), "public", "documentos", folder, file));
}

export const metadata: Metadata = {
  title: "Recursos e downloads | Tecjato",
  description: resourcesPage.intro,
  alternates: { canonical: "/recursos" },
};

function FolderIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-9 w-9 shrink-0 text-azul-digital"
      aria-hidden="true"
    >
      <path d="M4 7a1 1 0 0 1 1-1h4l2 2h8a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7z" />
    </svg>
  );
}

function DocCard({
  name,
  docPath,
  sublink,
}: {
  name: string;
  docPath: string;
  sublink?: { label: string; href: string };
}) {
  return (
    <div className="flex w-full items-center gap-4 rounded-xl border border-cinza-borda bg-white p-5 sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.7rem)]">
      <FolderIcon />
      <div className="min-w-0 flex-1">
        <p className="font-display text-sm font-bold leading-snug text-azul-inst">{name}</p>
        {sublink && (
          <Link href={sublink.href} className="text-xs text-azul-digital hover:underline">
            {sublink.label}
          </Link>
        )}
      </div>
      <a
        href={documentHref(docPath)}
        download
        className="inline-flex shrink-0 items-center gap-1.5 rounded-md bg-azul-digital/10 px-3 py-2 font-display text-sm font-semibold text-azul-digital transition hover:bg-azul-digital hover:text-white"
      >
        <DownloadIcon />
        {resourcesPage.download}
      </a>
    </div>
  );
}

export default function ResourcesPage() {
  const abrasivos = productCategories.find((c) => c.id === "abrasivos");
  const specs = (abrasivos?.items ?? []).flatMap((item) =>
    item.subItems && item.subItems.length > 0
      ? item.subItems
          .filter((s) => s.specFile && docExists("especificacoes", s.specFile))
          .map((s) => ({
            key: s.slug,
            name: s.name,
            file: s.specFile!,
            href: `/produtos/abrasivos/${item.slug}/${s.slug}`,
          }))
      : item.specFile && docExists("especificacoes", item.specFile)
        ? [
            {
              key: item.slug,
              name: item.name,
              file: item.specFile,
              href: `/produtos/abrasivos/${item.slug}`,
            },
          ]
        : []
  );

  const allItems = productCategories.flatMap((c) =>
    c.items.map((item) => ({ item, categoryId: c.id }))
  );
  const catalogs = allItems
    .filter(({ item }) => item.catalogFile && docExists("catalogos", item.catalogFile))
    .map(({ item, categoryId }) => ({
      key: item.slug,
      name: item.name,
      file: item.catalogFile!,
      href: `/produtos/${categoryId}/${item.slug}`,
    }));
  const safetySheets = allItems
    .filter(({ item }) => item.fdsFile && docExists("seguranca", item.fdsFile))
    .map(({ item, categoryId }) => ({
      key: item.slug,
      name: item.name,
      file: item.fdsFile!,
      href: `/produtos/${categoryId}/${item.slug}`,
    }));
  const availableCertificates = certificates.filter((c) =>
    docExists("certificados", c.file)
  );

  return (
    <>
      <PageHero title={resourcesPage.title} intro={resourcesPage.intro} />

      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {availableCertificates.length > 0 && (
            <>
              <h2 className="font-display text-2xl font-bold text-azul-inst">
                {resourcesPage.certificatesLabel}
              </h2>
              <div className="mt-6 flex flex-wrap gap-4">
                {availableCertificates.map((c) => (
                  <DocCard key={c.file} name={c.name} docPath={`certificados/${c.file}`} />
                ))}
              </div>
            </>
          )}

          {catalogs.length > 0 && (
            <>
              <h2 className="mt-16 font-display text-2xl font-bold text-azul-inst">
                {resourcesPage.catalogsLabel}
              </h2>
              <div className="mt-6 flex flex-wrap gap-4">
                {catalogs.map((c) => (
                  <DocCard
                    key={c.key}
                    name={c.name}
                    docPath={`catalogos/${c.file}`}
                    sublink={{ label: "Ver produto →", href: c.href }}
                  />
                ))}
              </div>
            </>
          )}

          {safetySheets.length > 0 && (
            <>
              <h2 className="mt-16 font-display text-2xl font-bold text-azul-inst">
                {resourcesPage.safetyLabel}
              </h2>
              <div className="mt-6 flex flex-wrap gap-4">
                {safetySheets.map((s) => (
                  <DocCard
                    key={s.key}
                    name={s.name}
                    docPath={`seguranca/${s.file}`}
                    sublink={{ label: "Ver produto →", href: s.href }}
                  />
                ))}
              </div>
            </>
          )}

          {specs.length > 0 && (
            <>
              <h2 className="mt-16 font-display text-2xl font-bold text-azul-inst">
                {resourcesPage.specsLabel}
              </h2>
              <div className="mt-6 flex flex-wrap gap-4">
                {specs.map((s) => (
                  <DocCard
                    key={s.key}
                    name={s.name}
                    docPath={`especificacoes/${s.file}`}
                    sublink={{ label: "Ver produto →", href: s.href }}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
