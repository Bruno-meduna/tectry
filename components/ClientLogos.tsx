import Image from "next/image";

// Logos reais em public/clientes. Cada logo tem uma altura calibrada (`h`, em px)
// para equilibrar o peso visual na esteira: logos largos (wordmarks) ficam mais
// baixos; logos compactos/quadrados ficam mais altos. Ajuste fino aqui se trocar
// alguma arte. `w` e `hpx` intrínsecos servem ao next/image (evita layout shift).
type ClientLogo = { file: string; name: string; w: number; hpx: number; h: number };

export const clientLogos: ClientLogo[] = [
  { file: "weg.png", name: "WEG", w: 640, hpx: 449, h: 46 },
  { file: "Iveco.png", name: "Iveco", w: 1999, hpx: 1999, h: 58 },
  { file: "Johndear.png", name: "John Deere", w: 1999, hpx: 444, h: 36 },
  { file: "Tupy.png", name: "Tupy", w: 1999, hpx: 611, h: 40 },
  { file: "maxion.png", name: "Maxion", w: 1900, hpx: 1080, h: 52 },
  { file: "Facchini.png", name: "Facchini", w: 1999, hpx: 277, h: 28 },
  { file: "schulz.png", name: "Schulz", w: 390, hpx: 150, h: 40 },
  { file: "cinpal.png", name: "Cinpal", w: 1999, hpx: 636, h: 40 },
  { file: "Seatrium.png", name: "Seatrium", w: 1999, hpx: 723, h: 42 },
  { file: "Gratt.png", name: "Gratt", w: 1200, hpx: 628, h: 50 },
  { file: "Brasfel.png", name: "Brasfel", w: 270, hpx: 334, h: 58 },
  { file: "metlsider.png", name: "Metalsider", w: 601, hpx: 601, h: 56 },
  { file: "rosseti.png", name: "Rosseti", w: 1140, hpx: 191, h: 30 },
  { file: "mmcite.png", name: "mmcité", w: 567, hpx: 231, h: 42 },
];

function LogoItem({ file, name, w, hpx, h }: ClientLogo) {
  return (
    <li className="flex h-[72px] shrink-0 items-center justify-center px-7 sm:px-9">
      <Image
        src={`/clientes/${file}`}
        alt={name}
        width={w}
        height={hpx}
        style={{ height: h, width: "auto" }}
        className="max-w-[170px] object-contain opacity-70 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
      />
    </li>
  );
}

export default function ClientLogos() {
  return (
    <div className="marquee group relative overflow-hidden">
      {/* máscaras de borda para fade lateral */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent sm:w-28" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent sm:w-28" />
      {/* duas cópias da lista para loop contínuo sem emenda */}
      <ul className="marquee-track flex w-max items-center py-2" aria-label="Clientes Tecjato">
        {clientLogos.map((l) => (
          <LogoItem key={l.file} {...l} />
        ))}
        {clientLogos.map((l) => (
          <LogoItem key={`${l.file}-dup`} {...l} />
        ))}
      </ul>
    </div>
  );
}
