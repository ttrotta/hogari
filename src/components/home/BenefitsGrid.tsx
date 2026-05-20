import { CheckCircle2 } from "lucide-react";

export function BenefitsGrid() {
  const benefits = [
    {
      title: "Menos tiempo buscando",
      description: "Olvidate de filtrar opciones inútiles. Te mostramos solo lo que hace match con tu perfil."
    },
    {
      title: "Contexto real del barrio",
      description: "Sabé qué hay cerca antes de mudarte. Universidades, subtes, supermercados y seguridad."
    },
    {
      title: "Recomendaciones a medida",
      description: "Nuestro algoritmo piensa en tu estilo de vida, no solo en tu presupuesto."
    },
    {
      title: "Mejores decisiones",
      description: "Información clara y transparente para que alquiles con seguridad y confianza."
    }
  ];

  return (
    <section className="bg-white py-24 px-6 md:px-12 w-full" id="beneficios">
      <div className="mx-auto max-w-7xl">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 md:text-5xl tracking-tight leading-tight">
              Más que un simple buscador de propiedades
            </h2>
            <p className="mt-6 text-lg text-gray-600 md:text-xl">
              Conectamos tus necesidades reales con el lugar correcto. Diseñamos Hogaroo para que el estrés de mudarte desaparezca por completo.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-8">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                  <h3 className="text-xl font-bold text-gray-900">{benefit.title}</h3>
                </div>
                <p className="text-gray-600 pl-8">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
