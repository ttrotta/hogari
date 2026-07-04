"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GsapProvider } from "@/components/providers/GsapProvider";
import {
  BadgePercent,
  ExternalLink,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-12 text-center" data-heading>
      <span className="text-primary-dark mb-4 inline-block text-sm font-bold tracking-widest uppercase">
        {eyebrow}
      </span>
      <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl lg:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-gray-600">
          {subtitle}
        </p>
      )}
    </div>
  );
}

function LawSection({
  id,
  children,
}: {
  id?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;
    const heading = el.querySelector("[data-heading]");
    if (heading) {
      gsap.from(heading, {
        y: 30,
        autoAlpha: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: heading,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    }
    gsap.from(el.querySelectorAll("[data-card]"), {
      y: 30,
      autoAlpha: 0,
      duration: 0.6,
      stagger: 0.12,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });
  }, []);

  return (
    <section
      ref={ref}
      id={id}
      className="w-full px-6 py-20 md:px-12 lg:py-28"
    >
      <div className="mx-auto max-w-4xl">{children}</div>
    </section>
  );
}

function SourceBadge({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-brand-orange hover:underline"
    >
      <ExternalLink className="h-3 w-3" />
      {label}
    </a>
  );
}

export default function LawGuidePage() {
  const heroRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const el = heroRef.current;
    if (!el) return;
    gsap.from(el.querySelectorAll("[data-animate]"), {
      y: 40,
      autoAlpha: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
    });
  }, []);

  return (
    <GsapProvider>
      <div className="bg-white min-h-screen">
        {/* Hero */}
        <section
          ref={heroRef}
          className="bg-section-warm w-full px-6 pt-24 pb-16 md:px-12 lg:pt-32 lg:pb-20"
        >
          <div className="mx-auto max-w-4xl text-center">
            <div data-animate>
              <span className="text-primary-dark mb-4 inline-block text-sm font-bold tracking-widest uppercase">
                Guía Legal
              </span>
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
                Alquileres en{" "}
                <span className="bg-linear-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                  Argentina
                </span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-600">
                Todo lo que necesitas saber sobre la legislación locativa vigente
                tras el DNU 70/2023. Información actualizada a julio 2026.
              </p>
            </div>
          </div>
        </section>

        {/* Panorama General */}
        <LawSection id="panorama">
          <SectionHeading
            eyebrow="Contexto"
            title="Panorama General"
            subtitle="La Ley de Alquileres (27.551) fue derogada por el DNU 70/2023. Hoy rige la libertad contractual."
          />
          <div className="flex flex-col gap-4 text-sm leading-relaxed text-gray-600 md:text-base">
            <p data-card className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
              Hasta diciembre de 2023, los alquileres en Argentina estaban regulados por
              la Ley N° 27.551 (&ldquo;Ley de Alquileres&rdquo;), que establecía plazos mínimos
              obligatorios, índices de actualización únicos y restricciones sobre la moneda
              de pago. En octubre de 2023, la Ley N° 27.737 introdujo modificaciones
              (plazo mínimo de 3 años y ajustes semestrales por ICL o Casa Propia), pero
              semanas después el DNU 70/2023 derogó toda esa normativa.
            </p>
            <p data-card className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
              Hoy conviven dos regímenes: los contratos firmados antes del DNU 70/2023
              continúan rigiéndose por las normas vigentes al momento de su firma, mientras
              que los contratos posteriores se rigen por el nuevo esquema de libertad
              contractual basado en el Código Civil y Comercial modificado por el DNU.
            </p>
          </div>
          <SourceBadge
            href="https://www.primeraedicion.com.ar/nota/101120703/alquileres-era-milei-cambios-dnu-70-2023-ley-alquileres/"
            label="Primera Edición – Alquileres en la era Milei (julio 2026)"
          />
        </LawSection>

        {/* Duración del Contrato */}
        <LawSection id="duración">
          <SectionHeading
            eyebrow="Plazos"
            title="Duración del Contrato"
            subtitle="Las partes pactan libremente la duración. Sin acuerdo, el plazo mínimo legal es de 2 años."
          />
          <div className="flex flex-col gap-4 text-sm leading-relaxed text-gray-600 md:text-base">
            <div data-card className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
              <h3 className="mb-2 font-bold text-gray-900">Vieja Ley (derogada)</h3>
              <p>Plazo mínimo obligatorio de 3 años para contratos con destino vivienda.</p>
            </div>
            <div data-card className="rounded-2xl border border-brand-orange/20 bg-brand-light/20 p-6 shadow-sm">
              <h3 className="mb-2 font-bold text-gray-900">Régimen Actual (DNU 70/2023)</h3>
              <p className="mb-2">
                Las partes acuerdan libremente la duración. Si no se establece un plazo,
                se considera celebrado por el plazo mínimo legal de{" "}
                <strong>2 años</strong> para vivienda (art. 1198 CCCN).
              </p>
              <p>
                El plazo máximo es de <strong>20 años</strong> para destino habitacional y{" "}
                <strong>50 años</strong> para otros destinos.
              </p>
            </div>
          </div>
          <SourceBadge
            href="https://cpicordoba.org.ar/wp-content/uploads/2023/12/TEXTO-ORDENADO-MODIF.-DNU-70.2023.pdf"
            label="Texto ordenado CCCN modificado por DNU 70/2023 – Arts. 1197-1198"
          />
        </LawSection>

        {/* Moneda y Actualización */}
        <LawSection id="moneda">
          <SectionHeading
            eyebrow="Precio"
            title="Moneda y Actualización"
            subtitle="Los alquileres pueden pactarse en pesos o dólares, con cualquier índice y periodicidad."
          />
          <div className="flex flex-col gap-4 text-sm leading-relaxed text-gray-600 md:text-base">
            <div data-card className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
              <h3 className="mb-2 flex items-center gap-2 font-bold text-gray-900">
                <BadgePercent className="h-4 w-4 text-brand-orange" />
                Moneda
              </h3>
              <p>
                Las partes pueden acordar libremente el pago en{" "}
                <strong>pesos o moneda extranjera</strong> (art. 1199 CCCN). El
                inquilino no puede exigir pagar en una moneda distinta a la pactada.
                La justicia no puede modificar la moneda de pago acordada.
              </p>
            </div>
            <div data-card className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
              <h3 className="mb-2 flex items-center gap-2 font-bold text-gray-900">
                <BadgePercent className="h-4 w-4 text-brand-orange" />
                Actualización
              </h3>
              <p>
                Se puede pactar cualquier índice (IPC, ICL, combinación de índices,
                indexación privada) y cualquier periodicidad (mensual, trimestral,
                semestral, etc.). Si el índice elegido deja de publicarse, se usa un
                índice oficial similar (INDEC para moneda nacional).
              </p>
            </div>
          </div>
          <SourceBadge
            href="https://cpicordoba.org.ar/wp-content/uploads/2023/12/TEXTO-ORDENADO-MODIF.-DNU-70.2023.pdf"
            label="CCCN Art. 1199 – Moneda de pago y actualización"
          />
        </LawSection>

        {/* Garantías y Depósito */}
        <LawSection id="garantias">
          <SectionHeading
            eyebrow="Seguridad"
            title="Garantías y Depósito"
            subtitle="Ambos conceptos quedan sujetos a la negociación entre las partes."
          />
          <div className="flex flex-col gap-4 text-sm leading-relaxed text-gray-600 md:text-base">
            <div data-card className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
              <h3 className="mb-2 font-bold text-gray-900">Garantías</h3>
              <p>
                Bajo la Ley de Alquileres, el propietario debía aceptar alguna de las
                garantías previstas (título de propiedad, aval bancario, seguro de
                caución, etc.). Hoy las partes negocian libremente las garantías
                exigidas. El seguro de caución sigue siendo una alternativa popular.
              </p>
            </div>
            <div data-card className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
              <h3 className="mb-2 font-bold text-gray-900">Depósito</h3>
              <p>
                Antes no podía superar un mes de alquiler. Actualmente las partes
                tienen mayor libertad para pactar el monto y las condiciones de
                restitución. Es clave revisar las cláusulas sobre reintegros, plazos
                y deducciones por daños.
              </p>
            </div>
          </div>
        </LawSection>

        {/* Expensas y Reparaciones */}
        <LawSection id="expensas">
          <SectionHeading
            eyebrow="Mantenimiento"
            title="Expensas y Reparaciones"
            subtitle="El locador debe conservar la cosa en estado apto para el uso convenido."
          />
          <div className="flex flex-col gap-4 text-sm leading-relaxed text-gray-600 md:text-base">
            <div data-card className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
              <h3 className="mb-2 font-bold text-gray-900">Expensas</h3>
              <p>
                Salvo pacto en contrario, las expensas ordinarias (gastos de
                mantenimiento del edificio) suelen estar a cargo del inquilino,
                mientras que las expensas extraordinarias (obras de mejora) son
                responsabilidad del propietario. Es fundamental que el contrato
                especifique claramente cómo se dividen.
              </p>
            </div>
            <div data-card className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
              <h3 className="mb-2 font-bold text-gray-900">Reparaciones</h3>
              <p>
                El locador tiene la obligación esencial de conservar la cosa en
                estado apto para el uso convenido (art. 1200 CCCN). El inquilino
                debe informar los desperfectos y el propietario debe repararlos.
                Si el propietario no cumple, el inquilino puede resolver el
                contrato (art. 1220 CCCN).
              </p>
            </div>
          </div>
          <SourceBadge
            href="https://cpicordoba.org.ar/wp-content/uploads/2023/12/TEXTO-ORDENADO-MODIF.-DNU-70.2023.pdf"
            label="CCCN Arts. 1200, 1205, 1220 – Conservación y reparaciones"
          />
        </LawSection>

        {/* Rescisión Anticipada */}
        <LawSection id="rescisión">
          <SectionHeading
            eyebrow="Salida"
            title="Rescisión Anticipada"
            subtitle="El inquilino puede rescindir en cualquier momento con un preaviso del 10% del saldo restante."
          />
          <div className="flex flex-col gap-4 text-sm leading-relaxed text-gray-600 md:text-base">
            <div data-card className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
              <h3 className="mb-2 font-bold text-gray-900">Régimen Anterior</h3>
              <p>
                El inquilino podía rescindir tras los primeros 6 meses. Con preaviso
                de 3 meses, no pagaba multa. Antes del año: multa de 1 mes y medio.
                Después del año: multa de 1 mes.
              </p>
            </div>
            <div data-card className="rounded-2xl border border-brand-orange/20 bg-brand-light/20 p-6 shadow-sm">
              <h3 className="mb-2 font-bold text-gray-900">Régimen Actual</h3>
              <p>
                Las partes pueden pactar libremente las condiciones de rescisión
                anticipada. Si no se establece nada, el inquilino puede rescindir
                en cualquier momento pagando una multa equivalente al{" "}
                <strong>10% del saldo del canon locativo futuro</strong> (art. 1221
                CCCN). El preaviso debe ser fehaciente.
              </p>
            </div>
          </div>
          <SourceBadge
            href="https://cpicordoba.org.ar/wp-content/uploads/2023/12/TEXTO-ORDENADO-MODIF.-DNU-70.2023.pdf"
            label="CCCN Art. 1221 – Rescisión anticipada"
          />
        </LawSection>

        {/* Derechos del Inquilino */}
        <LawSection id="derechos">
          <SectionHeading
            eyebrow="Protección"
            title="Derechos del Inquilino"
            subtitle="A pesar de la desregulación, existen derechos fundamentales que subsisten."
          />
          <div className="grid gap-4 text-sm leading-relaxed text-gray-600 md:grid-cols-2 md:text-base">
            {[
              {
                title: "Intimación previa al desalojo",
                text: "Antes de una demanda por falta de pago, el locador debe intimar fehacientemente al inquilino con un plazo mínimo de 10 días corridos (art. 1222 CCCN).",
              },
              {
                title: "Continuación del contrato",
                text: "Si vence el plazo y el inquilino continúa en la vivienda, la locación se extiende en los mismos términos hasta que cualquiera de las partes de por concluido el contrato (art. 1218 CCCN).",
              },
              {
                title: "Mejoras",
                text: "El inquilino puede retirar las mejoras útiles o suntuarias al concluir la locación, salvo pacto en contrario o si causan daño a la propiedad (art. 1224 CCCN).",
              },
              {
                title: "Conservación",
                text: "El locador debe entregar la cosa en estado apropiado para su destino y conservarla así durante toda la locación (art. 1200 CCCN).",
              },
            ].map((item) => (
              <div
                key={item.title}
                data-card
                className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100"
              >
                <h3 className="mb-2 font-bold text-gray-900">{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </LawSection>

        {/* Consejos Útiles */}
        <LawSection id="consejos">
          <SectionHeading
            eyebrow="Práctico"
            title="Consejos Útiles"
            subtitle="Puntos clave a revisar antes de firmar un contrato de alquiler."
          />
          <div className="flex flex-col gap-4 text-sm leading-relaxed text-gray-600 md:text-base">
            {[
              {
                title: "1. Leer el contrato completo",
                text: "Cada cláusula importa. No asumas que algo se aplica por defecto; tras la desregulación, la ley ya no impone la mayoría de las condiciones. Todo lo que no esté escrito en el contrato, no existe.",
              },
              {
                title: "2. Verificar moneda e indexación",
                text: "Revisá en que moneda se pacta el alquiler, cada cuanto se actualiza y que índice se usa. Si es en dólares, asegúrate de entender el mecanismo de pago.",
              },
              {
                title: "3. Confirmar el plazo",
                text: "Si no se establece plazo, el mínimo legal es 2 años. Si querés más estabilidad, negociá un plazo mayor.",
              },
              {
                title: "4. Revisá expensas",
                text: "¿Qué dice el contrato sobre expensas ordinarias y extraordinarias? Es uno de los puntos más conflictivos.",
              },
              {
                title: "5. Condiciones de rescisión",
                text: "Si no se pacta nada, la multa es del 10% del saldo restante. Si se pacta otra cosa, asegúrate de entenderla.",
              },
              {
                title: "6. Registrar el contrato",
                text: "Aunque ya no es obligatorio registrarlo en AFIP, tener el contrato por escrito y firmado es tu mejor respaldo.",
              },
            ].map((item) => (
              <div
                key={item.title}
                data-card
                className="rounded-2xl bg-section-warm p-6 shadow-sm"
              >
                <h3 className="mb-1 font-bold text-gray-900">{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </LawSection>

        {/* Footer note */}
        <section className="w-full border-t border-gray-100 px-6 py-10 md:px-12">
          <div className="mx-auto max-w-4xl text-center text-xs leading-relaxed text-gray-400">
            <p>
              Esta guía tiene fines informativos y no constituye asesoramiento legal.
              Las leyes y regulaciones pueden cambiar. Consultá con un profesional
              del derecho para tu situación específica.
            </p>
            <p className="mt-2">
              Fuentes: Código Civil y Comercial de la Nación (texto ordenado DNU 70/2023),
              Ley 27.551, Ley 27.737, artículos periodísticos especializados (julio 2026).
            </p>
          </div>
        </section>
      </div>
    </GsapProvider>
  );
}
