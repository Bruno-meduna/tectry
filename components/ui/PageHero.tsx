// Cabeçalho escuro padrão das páginas internas (título + introdução).
export default function PageHero({
  title,
  intro,
}: {
  title: string;
  intro: string;
}) {
  return (
    <section className="hatch-dark bg-azul-inst py-16 text-white lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-4xl font-extrabold sm:text-5xl">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-blue-100/85">{intro}</p>
      </div>
    </section>
  );
}
