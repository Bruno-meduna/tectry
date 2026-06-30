import Image from "next/image";

// Mosaico editorial das 4 fotos institucionais da Tecjato. Compartilhado entre
// a home (seção "Quem somos") e a página "Quem somos" (seção "Nossa história").
const montage = [
  { src: "/fotos/tecjato_1.jpg", area: "col-start-1 col-span-4 row-start-1 row-span-3" },
  { src: "/fotos/tecjato_2.jpg", area: "col-start-5 col-span-2 row-start-1 row-span-2" },
  { src: "/fotos/tecjato_3.jpg", area: "col-start-5 col-span-2 row-start-3 row-span-3" },
  { src: "/fotos/tecjato_4.jpg", area: "col-start-1 col-span-4 row-start-4 row-span-2" },
];

export default function PhotoMontage({ className = "" }: { className?: string }) {
  return (
    <div
      className={`grid aspect-[4/3] w-full grid-cols-6 grid-rows-5 gap-3 ${className}`}
    >
      {montage.map((img, i) => (
        <div
          key={img.src}
          className={`group relative overflow-hidden rounded-xl shadow-sm ${img.area}`}
        >
          <Image
            src={img.src}
            alt={`Tecjato — fábrica e operação em Araquari/SC (${i + 1})`}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        </div>
      ))}
    </div>
  );
}
