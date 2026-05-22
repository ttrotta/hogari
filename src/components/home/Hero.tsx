"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import  Waitlist from "./Waitlist";
import { WaveDivider } from "@/components/layout/WaveDivider";

const ANIMATED_STYLES = [
  "text-brand-orange font-extrabold",
  "text-primary-dark italic font-medium",
  "text-gray-900 font-black tracking-wide",
  "text-primary font-bold",
];

export function Hero() {
  const [styleIdx, setStyleIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStyleIdx((prev) => (prev + 1) % ANIMATED_STYLES.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="relative z-10 w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 -z-20 h-full w-full">
        <Image
          src="/fontmap.webp"
          alt="Hogari Background Map"
          fill
          className="object-cover object-center opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-white/40" />
      </div>

      <div className="relative mx-auto flex min-h-[calc(100vh-88px)] w-full max-w-7xl flex-col items-center justify-between px-6 py-28 md:flex-row md:overflow-visible md:px-12 md:py-20">
        {/* Mobile Mascot - Peeking from top right */}
        <div className="absolute top-8 -right-16 z-0 h-[260px] w-[260px] md:hidden">
          <Image
            src="/mascot-hogari-hero.png"
            alt="Hogari Mascot"
            fill
            sizes="(max-width: 768px) 50vw, 0vw"
            className="object-contain drop-shadow-2xl"
            priority
          />
        </div>

        <div className="z-20 mt-20 flex w-full flex-1 flex-col items-start md:mt-16">
          <div className="bg-brand-orange -rotate-3 transform rounded-xl px-6 py-4 text-6xl leading-none font-extrabold text-white shadow-2xl transition-transform duration-300 hover:-rotate-1 md:px-10 md:py-6 md:text-8xl lg:text-[140px]">
            Hogarí
          </div>

          <div className="mt-12 md:mt-12">
            <h1 className="text-3xl leading-tight text-gray-900 md:text-5xl lg:text-6xl">
              <span
                className={`transition-all duration-500 ease-in-out ${ANIMATED_STYLES[styleIdx]}`}
              >
                Encontrá alquileres que encajen con vos.
              </span>
            </h1>
            <p className="mt-10 max-w-lg text-lg leading-relaxed text-gray-600 md:text-xl">
              Recomendaciones inteligentes basadas en tu estilo de vida,
              ubicación ideal y el contexto de cada barrio. Sin perder tiempo.
            </p>
          </div>

          <div className="mt-8 w-full md:mt-0">
            <Waitlist />
          </div>
        </div>

        {/* Desktop Mascot */}
        <div className="relative z-10 mt-16 hidden w-full flex-1 justify-center md:mt-0 md:flex md:justify-end">
          <div className="relative md:h-[600px] md:w-[600px] md:translate-x-12 xl:h-[700px] xl:w-[700px]">
            <Image
              src="/mascot-hogari-hero.png"
              alt="Hogari Mascot"
              fill
              sizes="50vw"
              className="object-contain drop-shadow-2xl"
              priority
            />
          </div>
        </div>
      </div>

      <WaveDivider topColor="transparent" bottomColor="#FFD49A" />
    </section>
  );
}
