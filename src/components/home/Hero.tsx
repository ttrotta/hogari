"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Waitlist from "@/components/functionalities/Waitlist";

const ANIMATED_STYLES = [
  "text-brand-purple font-extrabold",
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
    <main
      id="hero"
      className="relative z-10 mx-auto flex min-h-[calc(100vh-88px)] max-w-7xl flex-col items-center justify-between px-6 py-12 md:flex-row md:px-12 md:py-20"
    >
      <div className="z-20 mt-8 flex w-full flex-1 flex-col items-start md:mt-0">
        <div className="bg-brand-purple -rotate-3 transform rounded-xl px-6 py-4 text-6xl leading-none font-extrabold text-white shadow-2xl transition-transform duration-300 hover:-rotate-1 md:px-10 md:py-6 md:text-8xl lg:text-[140px]">
          Hogaroo
        </div>

        <div className="mt-8 md:mt-12">
          <h1 className="text-3xl leading-tight text-gray-900 md:text-5xl lg:text-6xl">
            <span
              className={`transition-all duration-500 ease-in-out ${ANIMATED_STYLES[styleIdx]}`}
            >
              Encontrá alquileres que encajen con vos.
            </span>
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-gray-600 md:text-xl">
            Recomendaciones inteligentes basadas en tu estilo de vida, ubicación
            ideal y el contexto de cada barrio. Sin perder tiempo.
          </p>
        </div>

        <Waitlist />
      </div>

      <div className="relative z-10 mt-16 flex w-full flex-1 justify-center md:mt-0 md:justify-end">
        <div className="relative h-[320px] w-[320px] md:h-[600px] md:w-[600px] md:translate-x-12 xl:h-[700px] xl:w-[700px]">
          <Image
            src="/mascot-hero.png"
            alt="Hogaroo Owl Mascot"
            fill
            sizes="50vw"
            className="object-contain drop-shadow-2xl"
            priority
          />
        </div>
      </div>
    </main>
  );
}
