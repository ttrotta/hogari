import { User, Map, Heart } from "lucide-react";

export function SolutionSteps() {
  return (
    <section
      className="bg-section-warm w-full px-6 py-24 md:px-12"
      id="como-funciona"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-5xl">
            Así simplificamos tu búsqueda
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 md:text-xl">
            Hogarí hace el trabajo pesado por vos en 3 pasos simples,
            priorizando lo que de verdad importa.
          </p>
        </div>

        <div className="grid gap-12 md:grid-cols-3">
          <div className="relative flex flex-col items-center">
            <div className="bg-primary z-10 flex h-20 w-20 items-center justify-center rounded-full text-white shadow-xl">
              <User className="h-10 w-10" />
            </div>
            <div className="border-brand-orange/30 absolute top-10 left-1/2 -z-10 hidden w-full border-t-2 border-dashed md:block" />

            <h3 className="mt-8 text-2xl font-bold text-gray-900">
              1. Contanos qué buscás
            </h3>
            <p className="mt-4 text-center leading-relaxed text-gray-600">
              No solo cuántos ambientes. Decinos cuál es tu ritmo de vida, qué
              te gusta tener cerca y qué cosas no negociás.
            </p>
          </div>

          <div className="relative flex flex-col items-center">
            <div className="bg-primary z-10 flex h-20 w-20 items-center justify-center rounded-full text-white shadow-xl">
              <Map className="h-10 w-10" />
            </div>
            <div className="border-brand-orange/30 absolute top-10 left-1/2 -z-10 hidden w-full border-t-2 border-dashed md:block" />

            <h3 className="mt-8 text-2xl font-bold text-gray-900">
              2. Analizamos el entorno
            </h3>
            <p className="mt-4 text-center leading-relaxed text-gray-600">
              Nuestro algoritmo evalúa el transporte, cercanía a facultades,
              comercios y la seguridad del barrio.
            </p>
          </div>

          <div className="relative flex flex-col items-center">
            <div className="bg-brand-orange z-10 flex h-20 w-20 items-center justify-center rounded-full text-white shadow-xl">
              <Heart className="h-10 w-10" />
            </div>

            <h3 className="mt-8 text-2xl font-bold text-gray-900">
              3. Hacés match perfecto
            </h3>
            <p className="mt-4 text-center leading-relaxed text-gray-600">
              Recibís opciones hiper-personalizadas. Lugares que no solo entran
              en tu presupuesto, sino que encajan con tu día a día.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
