"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: 100, suffix: "%", label: "Transparencia" },
  { value: 50, prefix: "+", suffix: "", label: "En lista de espera" },
  { value: 5, suffix: "+", label: "Barrios analizados" },
  { value: 1, suffix: " min", label: "Promedio de búsqueda" },
];

const TESTIMONIALS = [
  {
    type: "large",
    quote:
      "Buscar depto era mi peor pesadilla. Hogarí me ahorró semanas de búsqueda y encontré un lugar que realmente se adapta a mi vida. El nivel de personalización es increíble.",
    author: "María L.",
    role: "Beta tester · Bahía Blanca",
    avatar: "ML",
  },
  {
    type: "small",
    quote:
      "Por fin una plataforma que entiende lo que necesito y no me hace perder tiempo.",
    author: "Juan P.",
    role: "Joven Profesional",
    avatar: "JP",
  },
  {
    type: "small",
    quote:
      "Me olvidé de estar llamando a inmobiliarias todo el día. Todo en un solo lugar.",
    author: "Sofía M.",
    role: "Estudiante",
    avatar: "SM",
  },
  {
    type: "large",
    quote:
      "El match perfecto. Me mostraron 3 opciones y las 3 eran exactamente lo que buscaba. Alquilé en menos de una semana sin estresarme.",
    author: "Tomás R.",
    role: "Programador · CABA",
    avatar: "TR",
  },
  {
    type: "small",
    quote:
      "Super intuitivo y transparente. Sabés todo sobre el barrio antes de ir.",
    author: "Laura G.",
    role: "Diseñadora",
    avatar: "LG",
  },
  {
    type: "small",
    quote:
      "La mejor experiencia buscando alquiler. Me ahorró un montón de dolores de cabeza.",
    author: "Diego F.",
    role: "Músico",
    avatar: "DF",
  },
];

// Groups to create the Bento Grid style layout
const TESTIMONIAL_GROUPS = [
  { large: TESTIMONIALS[0] },
  { smallTop: TESTIMONIALS[1], smallBottom: TESTIMONIALS[2] },
  { large: TESTIMONIALS[3] },
  { smallTop: TESTIMONIALS[4], smallBottom: TESTIMONIALS[5] },
];

const QuoteIcon = () => (
  <svg
    className="text-brand-orange/20 absolute -top-3 left-6 h-10 w-10"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983z" />
  </svg>
);

interface TestimonialCardProps {
  quote: string;
  author: string;
  role?: string;
  avatar: string;
}

const LargeCard = ({ quote, author, role, avatar }: TestimonialCardProps) => (
  <div className="hover:border-brand-orange group relative flex h-[300px] flex-col justify-between overflow-hidden rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-colors duration-300">
    <QuoteIcon />
    <p className="relative z-10 line-clamp-4 text-lg leading-relaxed text-gray-700 italic md:text-xl">
      &quot;{quote}&quot;
    </p>
    <div className="relative z-10 mt-6 flex items-center gap-4">
      <div className="bg-brand-orange/20 flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-lg font-bold text-orange-600">
        {avatar}
      </div>
      <div>
        <p className="font-bold text-gray-900">{author}</p>
        <p className="text-sm text-gray-500">{role}</p>
      </div>
    </div>
  </div>
);

const SmallCard = ({ quote, author, avatar }: TestimonialCardProps) => (
  <div className="hover:border-brand-orange group relative flex h-[138px] flex-col justify-between overflow-hidden rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-colors duration-300 md:p-6">
    <p className="relative z-10 line-clamp-2 text-sm leading-relaxed text-gray-700 italic md:text-base">
      &quot;{quote}&quot;
    </p>
    <div className="relative z-10 mt-2 flex items-center gap-3">
      <div className="bg-brand-orange/20 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-orange-600">
        {avatar}
      </div>
      <p className="text-sm font-bold text-gray-900">{author}</p>
    </div>
  </div>
);

interface GroupColumnProps {
  group: {
    large?: TestimonialCardProps;
    smallTop?: TestimonialCardProps;
    smallBottom?: TestimonialCardProps;
  };
}

const GroupColumn = ({ group }: GroupColumnProps) => (
  <div className="flex w-[300px] shrink-0 flex-col gap-6 md:w-[400px]">
    {group.large && <LargeCard {...group.large} />}
    {group.smallTop && <SmallCard {...group.smallTop} />}
    {group.smallBottom && <SmallCard {...group.smallBottom} />}
  </div>
);

export function TrustSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const countersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const heading = sectionRef.current?.querySelector("[data-heading]");

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

      const statsContainer = sectionRef.current?.querySelector(
        "[data-stats-container]",
      );

      if (statsContainer) {
        STATS.forEach((stat, idx) => {
          const el = countersRef.current[idx];
          if (!el) return;

          const obj = { value: 0 };
          gsap.fromTo(
            obj,
            { value: 0 },
            {
              value: stat.value,
              duration: 1.8,
              ease: "power2.out",
              scrollTrigger: {
                trigger: statsContainer,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
              onUpdate: () => {
                el.textContent = `${stat.prefix || ""}${Math.round(obj.value)}${stat.suffix || ""}`;
              },
            },
          );
        });

        const cards = sectionRef.current?.querySelectorAll("[data-stat-card]");
        if (cards?.length) {
          gsap.fromTo(
            cards,
            { y: 30, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.6,
              stagger: 0.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: statsContainer,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            },
          );
        }
      }

      // Marquee animation
      if (marqueeRef.current) {
        gsap.to(marqueeRef.current, {
          xPercent: -50,
          ease: "none",
          duration: 35, // Adjust this value to make it move slower/faster
          repeat: -1,
        });
      }
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="bg-house-pattern relative w-full overflow-hidden bg-slate-50/50 py-24 lg:py-32"
      id="comunidad"
    >
      <div className="mx-auto max-w-5xl px-6 md:px-12">
        <div data-heading className="text-center">
          <span className="text-primary-dark mb-4 inline-block text-sm font-bold tracking-widest uppercase">
            Comunidad
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl lg:text-5xl">
            Diseñado para usuarios reales
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-600">
            Estamos construyendo una plataforma que cambia la forma de alquilar.
            Mirá lo que opinan los primeros usuarios de la beta privada.
          </p>
        </div>

        {/* Stats Row */}
        <div
          data-stats-container
          className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6"
        >
          {STATS.map((stat, idx) => (
            <div
              key={idx}
              data-stat-card
              className="flex flex-col items-center rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md md:p-8"
            >
              <span
                ref={(el) => {
                  countersRef.current[idx] = el;
                }}
                className="bg-linear-to-r from-orange-400 to-orange-600 bg-clip-text text-4xl font-extrabold text-transparent md:text-5xl"
              >
                {`${stat.prefix || ""}${stat.value}${stat.suffix || ""}`}
              </span>
              <span className="mt-3 text-center text-sm font-semibold tracking-wide text-gray-500 uppercase">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bento Grid Marquee */}
      <div className="relative mt-20 w-full overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-linear-to-r from-white to-transparent md:w-48" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-linear-to-l from-white to-transparent md:w-48" />

        <div
          ref={marqueeRef}
          className="flex w-max gap-6 hover:[animation-play-state:paused]"
        >
          {/* Copia 1 */}
          <div className="flex shrink-0 gap-6">
            {TESTIMONIAL_GROUPS.map((group, idx) => (
              <GroupColumn key={`copy1-${idx}`} group={group} />
            ))}
          </div>
          {/* Copia 2 */}
          <div className="flex shrink-0 gap-6">
            {TESTIMONIAL_GROUPS.map((group, idx) => (
              <GroupColumn key={`copy2-${idx}`} group={group} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
