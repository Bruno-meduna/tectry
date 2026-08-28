import { documentHref } from "@/lib/documents";
import { resourcesPage } from "@/content/site";
import DownloadIcon from "./DownloadIcon";

/** Link de download do PDF em /public/documentos/{folder}/{file}. */
export default function SpecDownloadButton({
  file,
  folder = "especificacoes",
  label = "especificação",
  className = "",
}: {
  file: string;
  folder?: string;
  label?: string;
  className?: string;
}) {
  const relPath = `${folder}/${file}`;

  return (
    <a
      href={documentHref(relPath)}
      download
      className={`inline-flex items-center gap-2 rounded-md border border-azul-digital px-6 py-3 font-display text-[15px] font-semibold text-azul-digital transition hover:bg-azul-digital hover:text-white ${className}`}
    >
      <DownloadIcon />
      {resourcesPage.download} {label}
    </a>
  );
}
