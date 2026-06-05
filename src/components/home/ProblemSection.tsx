"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const PAIN_POINTS = [
  { number: "01", title: "Pérdida de tiempo" },
  { number: "02", title: "Cero contexto" },
  { number: "03", title: "Cero personalización" },
];

const AnimatedText = ({ text }: { text: string }) => {
  return (
    <span className="inline-block" aria-label={text}>
      {text.split("").map((char, index) => (
        <span
          key={index}
          className="inline-block font-black uppercase"
          style={{ whiteSpace: char === " " ? "pre" : "normal" }}
          data-char
        >
          {char}
        </span>
      ))}
    </span>
  );
};

export function ProblemSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const heading = sectionRef.current?.querySelector("[data-heading]");

      if (heading) {
        gsap.from(heading, {
          x: -50,
          autoAlpha: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: heading,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      }

      const chars = sectionRef.current?.querySelectorAll("[data-char]");
      if (chars?.length) {
        gsap.from(chars, {
          y: 50,
          opacity: 0,
          rotationX: -90,
          stagger: 0.02,
          duration: 0.6,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: chars[0],
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      }
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="bg-section-orange flex min-h-[85vh] w-full items-center px-6 py-32 md:px-12 lg:py-48"
      id="problema"
    >
      <div className="mx-auto grid max-w-7xl items-start gap-16 lg:grid-cols-2 lg:gap-24">
        <div data-heading className="lg:sticky lg:top-32">
          <span className="text-primary-dark mb-4 inline-block font-bold tracking-widest uppercase md:text-lg">
            El problema
          </span>
          <h2 className="text-4xl leading-tight font-extrabold tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
            Buscar departamento no debería ser un trabajo de tiempo completo.
          </h2>
          <p className="mt-8 max-w-lg text-lg leading-relaxed text-gray-600 md:text-xl">
            Horas scrolleando listados repetidos, dudas sobre el barrio,
            llamadas sin respuesta y visitas a lugares que nada tienen que ver
            con lo que buscás.
          </p>
        </div>

        <div className="flex flex-col items-start gap-8 pt-10 md:gap-12">
          {PAIN_POINTS.map((point, idx) => (
            <div
              key={point.number}
              data-card
              className={`group relative inline-flex cursor-default flex-col justify-center ${
                idx === 1 ? "ml-8 md:ml-16" : idx === 2 ? "ml-16 md:ml-32" : ""
              }`}
            >
              {/* Background text (Orange, larger, reveals on hover) */}
              <span className="text-brand-orange pointer-events-none absolute top-1/2 left-1/2 z-0 -translate-x-1/2 -translate-y-1/2 text-3xl font-black whitespace-nowrap uppercase opacity-0 transition-all duration-500 ease-out group-hover:scale-[1.15] group-hover:opacity-20 md:text-5xl lg:text-[4.5rem]">
                {point.title}
              </span>

              {/* Main text */}
              <h3 className="relative z-10 text-2xl font-black whitespace-nowrap text-orange-950 transition-colors duration-300 group-hover:text-orange-800 md:text-4xl lg:text-5xl">
                <AnimatedText text={point.title} />
              </h3>

              {/* Mascot Placeholder */}
              <div className="pointer-events-none absolute -top-10 right-0 z-20 h-16 w-16 translate-y-8 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100 md:-right-12 md:h-20 md:w-20">
                <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-orange-400 bg-orange-100 text-center text-[10px] font-bold text-orange-600 shadow-xl">
                  <div className="rounded-xl bg-white/50 p-2 backdrop-blur-sm">
                    🐶 Foto
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
