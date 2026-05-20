import { SearchX, Clock, MapPinOff } from "lucide-react";

export function ProblemSection() {
  return (
    <section className="bg-white py-24 px-6 md:px-12 w-full" id="problema">
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 md:text-5xl tracking-tight text-balance">
          Buscar departamento no debería ser un trabajo de tiempo completo.
        </h2>
        <p className="mt-8 text-lg text-gray-600 md:text-xl leading-relaxed max-w-3xl mx-auto">
          Horas scrolleando listados repetidos, dudas sobre el barrio, llamadas sin respuesta y visitas a lugares que nada tienen que ver con lo que buscás. El proceso actual es lento, confuso y agotador.
        </p>

        <div className="mt-16 grid gap-8 sm:grid-cols-3">
          <div className="flex flex-col items-center p-6 rounded-2xl bg-gray-50 border border-gray-100">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600 mb-6">
              <Clock className="h-7 w-7" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Pérdida de tiempo</h3>
            <p className="text-gray-600 text-center">Horas invertidas mirando lugares que están fuera de tu presupuesto o zona.</p>
          </div>

          <div className="flex flex-col items-center p-6 rounded-2xl bg-gray-50 border border-gray-100">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-100 text-orange-600 mb-6">
              <MapPinOff className="h-7 w-7" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Cero contexto</h3>
            <p className="text-gray-600 text-center">No sabés si hay transporte, movimiento o si el barrio es seguro de noche.</p>
          </div>

          <div className="flex flex-col items-center p-6 rounded-2xl bg-gray-50 border border-gray-100">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-yellow-100 text-yellow-600 mb-6">
              <SearchX className="h-7 w-7" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Cero personalización</h3>
            <p className="text-gray-600 text-center">Los portales te muestran lo que ellos quieren vender, no lo que vos necesitás.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
