export function FinalCTA() {
  return (
    <section className="bg-primary-light/40 py-24 px-6 md:px-12 w-full">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-4xl font-extrabold text-gray-900 md:text-6xl tracking-tight">
          ¿Listo para encontrar tu próximo hogar?
        </h2>
        <p className="mt-8 text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
          Sé parte del grupo exclusivo que probará Hogaroo antes que nadie. Deja de buscar y empezá a encontrar.
        </p>
        
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="bg-brand-purple hover:bg-primary-dark w-full sm:w-auto rounded-full px-10 py-5 text-xl font-bold text-white shadow-xl transition-all hover:scale-105 hover:shadow-2xl focus:outline-none focus-visible:ring-4 focus-visible:ring-primary-light">
            Quiero probar Hogaroo
          </button>
        </div>
      </div>
    </section>
  );
}
