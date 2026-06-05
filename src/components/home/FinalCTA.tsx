"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import WaitlistForm from "./Waitlist";

gsap.registerPlugin(ScrollTrigger);

export function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const heading = sectionRef.current?.querySelector("[data-heading]");
      const form = sectionRef.current?.querySelector("[data-form]");
      const badges = sectionRef.current?.querySelectorAll("[data-badge]");

      if (heading) {
        gsap.from(heading, {
          y: 40,
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

      if (form) {
        gsap.from(form, {
          y: 30,
          autoAlpha: 0,
          duration: 0.7,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: form,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        });
      }

      if (badges?.length) {
        gsap.from(badges, {
          y: 20,
          autoAlpha: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: badges[0],
            start: "top 92%",
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
      className="bg-gradient-cta relative w-full overflow-hidden px-6 py-24 md:px-12 lg:py-32"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -left-32 h-80 w-80 rounded-full bg-white/20 blur-3xl" />
        <div className="absolute -right-40 -bottom-40 h-96 w-96 rounded-full bg-white/15 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-3xl text-center">
        <div data-heading>
          <h2 className="text-4xl leading-tight font-extrabold tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
            ¿Listo para encontrar tu{" "}
            <span className="text-gradient-orange">próximo hogar</span>?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-gray-700 md:text-xl">
            Sé parte del grupo exclusivo que probará Hogarí antes que nadie.
            Dejá de buscar y empezá a encontrar.
          </p>
        </div>

        <div data-form className="mt-10 flex justify-center">
          <WaitlistForm />
        </div>
      </div>
    </section>
  );
}
