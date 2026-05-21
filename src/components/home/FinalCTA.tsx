export function FinalCTA() {
  return (
    <section className="bg-section-orange w-full px-6 py-24 md:px-12">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 md:text-6xl">
          ¿Listo para encontrar tu próximo hogar?
        </h2>
        <p className="mx-auto mt-8 max-w-2xl text-xl leading-relaxed text-gray-700">
          Sé parte del grupo exclusivo que probará Hogarí antes que nadie. Deja
          de buscar y empezá a encontrar.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button className="bg-brand-orange hover:bg-primary-dark focus-visible:ring-primary-light w-full rounded-full px-10 py-5 text-xl font-bold text-white shadow-xl transition-all hover:scale-105 hover:shadow-2xl focus:outline-none focus-visible:ring-4 sm:w-auto">
            Quiero probar Hogarí
          </button>
        </div>
      </div>
    </section>
  );
}
