import Image from "next/image";

interface CtaBannerProps {
  title: string;
  subtitle: string;
  /** Ações (botões/links) exibidas centralizadas abaixo do texto. */
  children: React.ReactNode;
  /** Classes de dimensionamento vertical da faixa. */
  className?: string;
}

// Faixa de CTA final com foto de fundo e overlay azul, usada na home e no Quem somos.
export default function CtaBanner({
  title,
  subtitle,
  children,
  className = "py-16 lg:py-20",
}: CtaBannerProps) {
  return (
    <section
      className={`relative flex items-center overflow-hidden bg-azul-digital text-white ${className}`}
    >
      <Image
        src="/fotos/Footer.jpg"
        alt=""
        aria-hidden="true"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-azul-digital/40" aria-hidden="true" />
      <div className="relative mx-auto w-full max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl font-extrabold sm:text-4xl">
          {title}
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-lg text-blue-50">{subtitle}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">{children}</div>
      </div>
    </section>
  );
}
