"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const PAIN_POINTS = [
  { number: "01", title: "Pérdida de tiempo", image: "/1_problem_section.png" },
  { number: "02", title: "Cero contexto", image: "/2_problem_section.png" },
  {
    number: "03",
    title: "Cero personalización",
    image: "/3_problem_section.png",
  },
];

const AnimatedText = ({ text }: { text: string }) => {
  return (
    <span className="inline-block" aria-label={text}>
      {text.split("").map((char, index) => (
        <span
          key={index}
          className="inline-block font-extrabold uppercase"
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
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
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

        <div className="w-full max-w-155 overflow-hidden rounded-3xl border-12 border-[#5c3a21] bg-[#5c3a21] shadow-2xl md:border-16 lg:justify-self-end">
          <div className="flex w-full flex-col bg-[#1b3b2b] p-6 shadow-[inset_0_6px_16px_rgba(0,0,0,0.7)] md:p-8">
            <div className="flex flex-col items-start gap-6">
              {PAIN_POINTS.map((point, idx) => (
                <div
                  key={point.number}
                  className="group flex cursor-pointer items-baseline gap-4"
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <span className="text-lg font-bold text-amber-200/40 transition-colors duration-300 group-hover:text-amber-200/70 md:text-xl">
                    {point.number}
                  </span>
                  <h3 className="text-left text-2xl font-extrabold whitespace-nowrap text-[#f5f2eb] transition-colors duration-300 group-hover:text-amber-200 md:text-3xl lg:text-4xl">
                    <AnimatedText text={point.title} />
                  </h3>
                </div>
              ))}
            </div>

            <div className="mt-4 flex w-full justify-center -space-x-8 sm:-space-x-14">
              {PAIN_POINTS.map((point, idx) => (
                <div
                  key={point.number}
                  className={`relative aspect-square w-[42%] max-w-52.5 transition-all duration-500 ease-out sm:max-w-70 ${
                    hoveredIndex === idx
                      ? "z-20 scale-130 opacity-100"
                      : "z-10 scale-100 opacity-95"
                  }`}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <Image
                    src={point.image}
                    alt={point.title}
                    fill
                    sizes="(max-width: 768px) 42vw, 18vw"
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
