export function TrustSection() {
  return (
    <section
      className="w-full bg-white px-6 py-20 text-center md:px-12"
      id="comunidad"
    >
      <div className="mx-auto max-w-4xl">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
          Diseñado para usuarios reales
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed md:text-xl">
          Estamos construyendo una plataforma que cambia la forma de alquilar.
          Únete a nuestra beta privada y sé de los primeros en experimentar una
          búsqueda sin estrés.
        </p>

        <div className="mt-12 flex flex-wrap justify-center gap-8">
          <div className="flex flex-col items-center">
            <span className="text-4xl font-extrabold">100%</span>
            <span className="mt-2 text-sm font-medium tracking-wide uppercase">
              Transparencia
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl font-extrabold">+500</span>
            <span className="mt-2 text-sm font-medium tracking-wide uppercase">
              En lista de espera
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
