"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    number: "01",
    title: "Contanos qué buscás",
    description:
      "No solo cuántos ambientes. Decinos cuál es tu ritmo de vida, qué te gusta tener cerca y qué cosas no negociás.",
  },
  {
    number: "02",
    title: "Analizamos el entorno",
    description:
      "Nuestro algoritmo evalúa el transporte, cercanía a facultades, comercios y la seguridad del barrio.",
  },
  {
    number: "03",
    title: "Hacés match perfecto",
    description:
      "Recibís opciones hiper-personalizadas. Lugares que no solo entran en tu presupuesto, sino que encajan con tu día a día.",
  },
];

export function SolutionSteps() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const heading = sectionRef.current?.querySelector("[data-heading]");
      const steps = sectionRef.current?.querySelectorAll("[data-step]");

      if (heading) {
        gsap.from(heading, {
          y: 30,
          autoAlpha: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: heading,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      }

      if (steps?.length) {
        steps.forEach((step) => {
          const bigNumber = step.querySelector("[data-number]");
          const content = step.querySelector("[data-content]");

          if (bigNumber) {
            gsap.from(bigNumber, {
              y: 120,
              autoAlpha: 0,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: step,
                start: "top 90%",
                toggleActions: "play none none reverse",
              },
            });
          }

          if (content) {
            gsap.from(content, {
              y: 50,
              autoAlpha: 0,
              duration: 0.8,
              delay: 0.15,
              ease: "power3.out",
              scrollTrigger: {
                trigger: step,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            });
          }
        });
      }

      const mascot = sectionRef.current?.querySelector("[data-mascot]");
      if (mascot) {
        gsap.from(mascot, {
          x: 100,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: mascot,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
        gsap.to(mascot, {
          y: "-=15",
          rotation: "+=2",
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="bg-section-warm relative w-full overflow-hidden px-6 py-24 md:px-12 lg:py-32"
      id="como-funciona"
    >
      <div className="relative mx-auto max-w-5xl">
        <div data-heading className="mb-20 text-center">
          <span className="text-primary-dark mb-4 inline-block text-sm font-bold tracking-widest uppercase">
            Cómo funciona
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl lg:text-5xl">
            Así simplificamos tu búsqueda
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
            Hogarí hace el trabajo pesado por vos en 3 pasos simples,
            priorizando lo que de verdad importa.
          </p>
        </div>

        <div className="flex flex-col gap-24 md:gap-32">
          {STEPS.map((step, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <div
                key={step.number}
                data-step
                className={`relative flex flex-col items-start gap-6 md:flex-row md:items-center md:gap-16 ${
                  !isEven ? "md:flex-row-reverse" : ""
                }`}
              >
                <div data-number className="shrink-0 select-none">
                  <span className="text-[120px] leading-none font-black tracking-tighter text-gray-900/6 md:text-[180px] lg:text-[220px]">
                    {step.number}
                  </span>
                </div>

                <div data-content className="max-w-lg">
                  <h3 className="text-2xl font-bold text-gray-900 md:text-3xl">
                    {step.title}
                  </h3>
                  <p className="mt-4 text-lg leading-relaxed text-gray-600">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div
        data-mascot
        className="pointer-events-none absolute top-12 right-0 z-10 mr-0 h-72 w-72 translate-x-[10%] pr-0 opacity-85 md:top-20 md:h-100 md:w-100 lg:h-125 lg:w-125 lg:translate-x-[15%] xl:h-162.5 xl:w-162.5"
      >
        <Image
          src="/mascot-hogari-hero.png"
          alt="Mascota Hogarí"
          fill
          sizes="(max-width: 768px) 288px, (max-width: 1024px) 400px, (max-width: 1280px) 500px, 650px"
          className="object-contain"
          priority
        />
      </div>
    </section>
  );
}
