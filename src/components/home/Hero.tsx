"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Waitlist from "./Waitlist";
import { WaveDivider } from "@/components/layout/WaveDivider";

const ANIMATED_STYLES = [
  "text-brand-orange font-extrabold",
  "text-primary-dark italic font-medium",
  "text-gray-900 font-black tracking-wide",
  "text-primary font-bold",
];

const HERO_TEXT = "Encontrá alquileres que encajen con vos.";

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

      <div className="relative mx-auto flex min-h-[calc(100vh-88px)] w-full max-w-7xl flex-col items-center justify-between px-6 py-28 md:flex-row md:overflow-visible md:px-12 md:py-[min(5vh,3rem)] xl:py-[min(6vh,4rem)] 2xl:py-[min(8vh,5rem)]">
        {/* Mobile Mascot - Peeking from top right */}
        <div className="absolute top-14 -right-16 z-0 h-65 w-65 md:hidden">
          <Image
            src="/mascot-hogari-hero.png"
            alt="Hogari Mascot"
            fill
            sizes="(max-width: 768px) 50vw, 0vw"
            className="object-contain drop-shadow-2xl"
            priority
          />
        </div>

        <div className="z-20 mt-8 flex w-full flex-1 flex-col items-start md:mt-[min(8vh,6rem)] md:flex-[1.4] 2xl:mt-[min(10vh,8rem)]">
          <div className="bg-brand-orange -rotate-3 transform rounded-xl px-6 py-4 text-[min(60px,15vw)] leading-none font-extrabold text-white shadow-2xl transition-transform duration-300 hover:-rotate-1 md:px-6 md:py-3 lg:px-8 lg:py-4 xl:text-[clamp(60px,10vh,90px)] 2xl:px-10 2xl:py-6 2xl:text-[clamp(90px,13vh,140px)]">
            Hogarí
          </div>

          <div className="mt-12 md:mt-[min(3vh,2rem)] 2xl:mt-[min(4vh,3rem)]">
            <h1 className="relative text-3xl leading-tight md:text-[clamp(30px,6vh,48px)] 2xl:text-[clamp(40px,7vh,60px)]">
              <span className="invisible font-black" aria-hidden="true">
                {HERO_TEXT}
              </span>
              <span
                className={`absolute inset-0 transition-all duration-500 ease-in-out ${ANIMATED_STYLES[styleIdx]}`}
              >
                {HERO_TEXT}
              </span>
            </h1>
            <p className="mt-10 max-w-lg text-lg leading-relaxed text-gray-600 md:text-lg 2xl:mt-[min(3vh,2.5rem)] 2xl:text-xl">
              Recomendaciones inteligentes basadas en tu estilo de vida,
              ubicación ideal y el contexto de cada barrio. Sin perder tiempo.
            </p>
          </div>

          <div className="mt-8 w-full md:mt-0">
            <Waitlist />
          </div>
        </div>

        {/* Desktop Mascot */}
        <div className="relative z-10 mt-14 hidden w-full flex-1 justify-center md:mt-0 md:flex md:justify-end">
          <div className="relative md:h-[min(40vh,400px)] md:w-[min(40vh,400px)] md:translate-x-8 lg:h-[min(50vh,500px)] lg:w-[min(50vh,500px)] xl:h-[min(55vh,600px)] xl:w-[min(55vh,600px)] xl:translate-x-12 2xl:h-[min(65vh,700px)] 2xl:w-[min(65vh,600px)]">
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
