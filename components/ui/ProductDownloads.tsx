import Link from "next/link";
import { documentHref } from "@/lib/documents";
import { resourcesPage } from "@/content/site";
import DownloadIcon from "./DownloadIcon";

type Entry = { file: string; folder: string; label: string };

/**
 * Bloco de downloads de um produto/equipamento: título + lista de links com
 * ícone de download (o próprio ícone/texto é clicável, sem botão) e atalho
 * para a página de recursos.
 */
export default function ProductDownloads({
  specFile,
  catalogFile,
  fdsFile,
  className = "",
}: {
  specFile?: string;
  catalogFile?: string;
  fdsFile?: string;
  className?: string;
}) {
  const entries: Entry[] = [
    catalogFile && { file: catalogFile, folder: "catalogos", label: "Catálogo" },
    fdsFile && {
      file: fdsFile,
      folder: "seguranca",
      label: "Ficha de dados de segurança (FDS)",
    },
    specFile && {
      file: specFile,
      folder: "especificacoes",
      label: "Especificação técnica",
    },
  ].filter(Boolean) as Entry[];

  if (entries.length === 0) return null;

  return (
    <div className={className}>
      <h2 className="font-display text-lg font-bold text-azul-inst">
        {resourcesPage.downloadsTitle}
      </h2>
      <ul className="mt-4 flex flex-col gap-3">
        {entries.map((e) => (
          <li key={`${e.folder}/${e.file}`}>
            <a
              href={documentHref(`${e.folder}/${e.file}`)}
              download
              className="inline-flex items-center gap-2 font-display text-[15px] font-semibold text-azul-digital transition hover:underline"
            >
              <DownloadIcon className="h-5 w-5 shrink-0" />
              {e.label}
            </a>
          </li>
        ))}
      </ul>
      <Link
        href="/recursos"
        className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-azul-digital hover:underline"
      >
        {resourcesPage.viewAll} →
      </Link>
    </div>
  );
}
