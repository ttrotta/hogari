"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, ShieldCheck, Sparkles, Timer } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const BENEFITS = [
  {
    id: "time",
    icon: Timer,
    title: "Menos tiempo buscando",
    description:
      "Olvidate de filtrar opciones inútiles. Te mostramos solo lo que hace match con tu perfil.",
  },
  {
    id: "context",
    icon: MapPin,
    title: "Contexto real del barrio",
    description:
      "Sabé qué hay cerca antes de mudarte. Universidades, subtes, supermercados y seguridad.",
  },
  {
    id: "match",
    icon: Sparkles,
    title: "Recomendaciones a medida",
    description:
      "Nuestro algoritmo piensa en tu estilo de vida, no solo en tu presupuesto.",
  },
  {
    id: "decisions",
    icon: ShieldCheck,
    title: "Mejores decisiones",
    description:
      "Información clara y transparente para que alquiles con seguridad y confianza.",
  },
];

const BenefitIllustration = ({ id }: { id: string }) => {
  switch (id) {
    case "time":
      return (
        <div className="relative mb-5 flex h-[240px] w-full items-center justify-center overflow-hidden rounded-xl border border-orange-100/50 bg-orange-50/50">
          <div className="w-[75%] overflow-hidden rounded-xl border border-gray-100 bg-white shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)]">
            <div className="flex items-center justify-between border-b border-gray-50 bg-gray-50/50 p-3">
              <span className="text-[11px] font-medium text-gray-500">
                Filtros Inteligentes
              </span>
              <div className="flex gap-1.5">
                <div className="h-2 w-2 rounded-full bg-gray-200"></div>
                <div className="h-2 w-2 rounded-full bg-gray-200"></div>
              </div>
            </div>
            <div className="space-y-3 p-4">
              <div className="flex h-7 w-full items-center rounded-md bg-orange-50 px-2">
                <div className="bg-brand-orange/40 h-3 w-3 rounded-full"></div>
                <div className="bg-brand-orange/40 ml-2 h-1.5 w-1/3 rounded-full"></div>
              </div>
              <div className="flex gap-2">
                <div className="h-7 flex-1 rounded-md border border-gray-100 bg-white shadow-sm"></div>
                <div className="h-7 flex-1 rounded-md bg-gray-50"></div>
              </div>
              <div className="flex gap-2">
                <div className="h-7 flex-[0.8] rounded-md bg-gray-50"></div>
                <div className="h-7 flex-1 rounded-md border border-gray-100 bg-white shadow-sm"></div>
              </div>
            </div>
          </div>
        </div>
      );
    case "context":
      return (
        <div className="relative mb-5 flex h-[240px] w-full items-center justify-center overflow-hidden rounded-xl border border-orange-100/50 bg-orange-50/50">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#f9731610_1px,transparent_1px),linear-gradient(to_bottom,#f9731610_1px,transparent_1px)] bg-size-[16px_16px]"></div>
          <div className="relative flex flex-col items-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-orange-100 bg-white shadow-[0_10px_30px_rgba(255,173,78,0.2)]">
              <MapPin className="text-brand-orange h-5 w-5" />
            </div>
            <div className="bg-brand-orange/20 mt-3 h-1.5 w-16 rounded-full blur-[1px]"></div>
          </div>
        </div>
      );
    case "match":
      return (
        <div className="perspective-1000 relative mb-5 flex h-[240px] w-full items-center justify-center overflow-hidden rounded-xl border border-orange-100/50 bg-orange-50/50">
          <div className="relative h-32 w-24">
            <div className="absolute inset-0 translate-x-8 translate-y-6 -rotate-6 rounded-xl border border-orange-200/50 bg-linear-to-br from-orange-100/40 to-transparent"></div>
            <div className="absolute inset-0 translate-x-4 translate-y-3 -rotate-3 rounded-xl border border-orange-100 bg-linear-to-br from-orange-50 to-white/50 backdrop-blur-sm"></div>
            <div className="absolute inset-0 flex flex-col rounded-xl border border-orange-100 bg-white p-3 shadow-[0_10px_30px_rgba(255,173,78,0.15)]">
              <div className="mb-3 flex h-12 w-full items-center justify-center rounded-lg bg-orange-50">
                <Sparkles className="text-brand-orange h-5 w-5" />
              </div>
              <div className="mb-2 h-1.5 w-3/4 rounded-full bg-gray-200"></div>
              <div className="h-1.5 w-1/2 rounded-full bg-gray-100"></div>
            </div>
          </div>
        </div>
      );
    case "decisions":
      return (
        <div className="relative mb-5 flex h-[240px] w-full items-center justify-center overflow-hidden rounded-xl border border-orange-100/50 bg-orange-50/50">
          <div className="w-[75%] overflow-hidden rounded-xl border border-gray-100 bg-white shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)]">
            <div className="flex items-center gap-2 border-b border-gray-50 bg-gray-50/50 p-3">
              <ShieldCheck className="text-brand-orange h-4 w-4" />
              <span className="text-[11px] font-medium text-gray-600">
                Verificación
              </span>
            </div>
            <div className="space-y-4 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="bg-brand-orange/10 border-brand-orange/20 flex h-4 w-4 items-center justify-center rounded-full border">
                    <div className="bg-brand-orange h-1.5 w-1.5 rounded-full"></div>
                  </div>
                  <div className="h-2 w-20 rounded-full bg-gray-200"></div>
                </div>
                <div className="h-4 w-10 rounded-full border border-gray-50 bg-gray-100"></div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="bg-brand-orange/10 border-brand-orange/20 flex h-4 w-4 items-center justify-center rounded-full border">
                    <div className="bg-brand-orange h-1.5 w-1.5 rounded-full"></div>
                  </div>
                  <div className="h-2 w-16 rounded-full bg-gray-200"></div>
                </div>
                <div className="h-4 w-10 rounded-full border border-gray-50 bg-gray-100"></div>
              </div>
              <div className="flex items-center justify-between opacity-50">
                <div className="flex items-center gap-2.5">
                  <div className="h-4 w-4 rounded-full border border-gray-200 bg-gray-100"></div>
                  <div className="h-2 w-24 rounded-full bg-gray-100"></div>
                </div>
                <div className="h-4 w-10 rounded-full border border-gray-100 bg-gray-50"></div>
              </div>
            </div>
          </div>
        </div>
      );
    default:
      return null;
  }
};

export function BenefitsGrid() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const heading = sectionRef.current?.querySelector("[data-heading]");
      const cards = sectionRef.current?.querySelectorAll("[data-benefit]");

      if (heading) {
        gsap.fromTo(
          heading,
          { y: 30, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: heading,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }

      if (cards?.length) {
        gsap.set(cards, { y: 40, autoAlpha: 0 });

        ScrollTrigger.batch(cards, {
          onEnter: (elements) => {
            gsap.to(elements, {
              y: 0,
              autoAlpha: 1,
              duration: 0.8,
              stagger: 0.15,
              ease: "power3.out",
              overwrite: true,
            });
          },
          onLeaveBack: (elements) => {
            gsap.to(elements, {
              y: 40,
              autoAlpha: 0,
              duration: 0.4,
              stagger: 0.05,
              overwrite: true,
            });
          },
          start: "top 88%",
        });
      }
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="bg-section-orange w-full px-6 py-24 font-sans md:px-12 lg:py-32"
      id="beneficios"
    >
      <div className="mx-auto max-w-7xl">
        <div data-heading className="mb-16 max-w-3xl">
          <span className="text-primary-dark mb-4 inline-block text-sm font-bold tracking-widest uppercase">
            Beneficios
          </span>
          <h2 className="text-4xl leading-tight font-extrabold tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
            Más que un simple buscador de propiedades
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map((benefit, idx) => (
            <div
              key={idx}
              data-benefit
              className="group relative flex flex-col overflow-hidden rounded-[24px] border border-orange-200/50 bg-white/80 p-5 transition-all duration-500 hover:-translate-y-1 hover:bg-white hover:shadow-xl md:p-6"
            >
              <BenefitIllustration id={benefit.id} />

              <div className="mt-2">
                <p className="text-sm leading-relaxed text-gray-600">
                  <strong className="mr-1.5 font-semibold text-gray-900">
                    {benefit.title}.
                  </strong>
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
