import { User, Map, Heart } from "lucide-react";

export function SolutionSteps() {
  return (
    <section className="bg-primary-light/30 py-24 px-6 md:px-12 w-full" id="como-funciona">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 md:text-5xl tracking-tight">
            Así simplificamos tu búsqueda
          </h2>
          <p className="mt-6 text-lg text-gray-600 md:text-xl max-w-2xl mx-auto">
            Hogaroo hace el trabajo pesado por vos en 3 pasos simples, priorizando lo que de verdad importa.
          </p>
        </div>

        <div className="grid gap-12 md:grid-cols-3">
          <div className="relative flex flex-col items-center">
            <div className="z-10 flex h-20 w-20 items-center justify-center rounded-full bg-primary text-white shadow-xl">
              <User className="h-10 w-10" />
            </div>
            <div className="hidden md:block absolute top-10 left-1/2 w-full border-t-2 border-dashed border-brand-purple/30 -z-10" />
            
            <h3 className="mt-8 text-2xl font-bold text-gray-900">1. Contanos qué buscás</h3>
            <p className="mt-4 text-center text-gray-600 leading-relaxed">
              No solo cuántos ambientes. Decinos cuál es tu ritmo de vida, qué te gusta tener cerca y qué cosas no negociás.
            </p>
          </div>

          <div className="relative flex flex-col items-center">
            <div className="z-10 flex h-20 w-20 items-center justify-center rounded-full bg-primary text-white shadow-xl">
              <Map className="h-10 w-10" />
            </div>
            <div className="hidden md:block absolute top-10 left-1/2 w-full border-t-2 border-dashed border-brand-purple/30 -z-10" />
            
            <h3 className="mt-8 text-2xl font-bold text-gray-900">2. Analizamos el entorno</h3>
            <p className="mt-4 text-center text-gray-600 leading-relaxed">
              Nuestro algoritmo evalúa el transporte, cercanía a facultades, comercios y la seguridad del barrio.
            </p>
          </div>

          <div className="relative flex flex-col items-center">
            <div className="z-10 flex h-20 w-20 items-center justify-center rounded-full bg-brand-purple text-white shadow-xl">
              <Heart className="h-10 w-10" />
            </div>
            
            <h3 className="mt-8 text-2xl font-bold text-gray-900">3. Hacés match perfecto</h3>
            <p className="mt-4 text-center text-gray-600 leading-relaxed">
              Recibís opciones hiper-personalizadas. Lugares que no solo entran en tu presupuesto, sino que encajan con tu día a día.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
