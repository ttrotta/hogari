import { SearchX, Clock, MapPinOff } from "lucide-react";

export function ProblemSection() {
  return (
    <section
      className="bg-brand-purple/40 w-full px-6 py-24 md:px-12"
      id="problema"
    >
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="text-3xl font-extrabold tracking-tight text-balance text-gray-900 md:text-5xl">
          Buscar departamento no debería ser un trabajo de tiempo completo.
        </h2>
        <p className="mx-auto mt-8 max-w-3xl text-lg leading-relaxed text-gray-600 md:text-xl">
          Horas scrolleando listados repetidos, dudas sobre el barrio, llamadas
          sin respuesta y visitas a lugares que nada tienen que ver con lo que
          buscás. El proceso actual es lento, confuso y agotador.
        </p>

        <div className="mt-16 grid gap-8 sm:grid-cols-3">
          <div className="flex flex-col items-center rounded-2xl border border-gray-100 bg-gray-50 p-6">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600">
              <Clock className="h-7 w-7" />
            </div>
            <h3 className="mb-3 text-xl font-bold text-gray-900">
              Pérdida de tiempo
            </h3>
            <p className="text-center text-gray-600">
              Horas invertidas mirando lugares que están fuera de tu presupuesto
              o zona.
            </p>
          </div>

          <div className="flex flex-col items-center rounded-2xl border border-gray-100 bg-gray-50 p-6">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-orange-100 text-orange-600">
              <MapPinOff className="h-7 w-7" />
            </div>
            <h3 className="mb-3 text-xl font-bold text-gray-900">
              Cero contexto
            </h3>
            <p className="text-center text-gray-600">
              No sabés si hay transporte, movimiento o si el barrio es seguro de
              noche.
            </p>
          </div>

          <div className="flex flex-col items-center rounded-2xl border border-gray-100 bg-gray-50 p-6">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-yellow-100 text-yellow-600">
              <SearchX className="h-7 w-7" />
            </div>
            <h3 className="mb-3 text-xl font-bold text-gray-900">
              Cero personalización
            </h3>
            <p className="text-center text-gray-600">
              Los portales te muestran lo que ellos quieren vender, no lo que
              vos necesitás.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
