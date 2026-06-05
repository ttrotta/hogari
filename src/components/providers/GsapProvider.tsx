"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function GsapProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    gsap.defaults({ ease: "power2.out", duration: 0.8 });

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.globalTimeline.timeScale(0);
      ScrollTrigger.getAll().forEach((t) => {
        t.animation?.progress(1);
      });
    });

    return () => {
      mm.revert();
    };
  }, []);

  return <>{children}</>;
}
