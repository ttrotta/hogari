export function TrustSection() {
  return (
    <section className="bg-slate-900 py-20 px-6 md:px-12 w-full text-center" id="comunidad">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-3xl font-bold text-white md:text-4xl tracking-tight">
          Diseñado para usuarios reales
        </h2>
        <p className="mt-6 text-lg text-slate-300 md:text-xl max-w-2xl mx-auto leading-relaxed">
          Estamos construyendo una plataforma que cambia la forma de alquilar. Únete a nuestra beta privada y sé de los primeros en experimentar una búsqueda sin estrés.
        </p>
        
        <div className="mt-12 flex flex-wrap justify-center gap-8">
          <div className="flex flex-col items-center">
            <span className="text-4xl font-extrabold text-primary-light">100%</span>
            <span className="text-sm font-medium text-slate-400 mt-2 tracking-wide uppercase">Transparencia</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl font-extrabold text-primary-light">+500</span>
            <span className="text-sm font-medium text-slate-400 mt-2 tracking-wide uppercase">En lista de espera</span>
          </div>
        </div>
      </div>
    </section>
  );
}
