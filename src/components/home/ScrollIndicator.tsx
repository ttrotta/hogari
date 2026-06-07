"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";
import { Mouse } from "lucide-react";

export function ScrollIndicator() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!container.current) return;

      gsap.to(".pulsation", {
        y: -5,
        repeat: -1,
        yoyo: true,
        duration: 1.5,
        ease: "power1.inOut",
        scale: 0.9,
        filter: "drop-shadow(0px 0px 12px rgba(255, 173, 78, 0.8))",
      });

      gsap.to(container.current, {
        opacity: 0,
        scrollTrigger: {
          trigger: typeof document !== "undefined" ? document.body : undefined,
          start: "top top",
          end: "200px top",
          scrub: true,
        },
      });
    },
    { scope: container },
  );

  return (
    <div
      ref={container}
      className="text-brand-orange fixed bottom-5 left-1/2 z-50 hidden -translate-x-1/2 md:flex"
    >
      <Mouse className="pulsation h-10 w-10" strokeWidth={1.5} />
    </div>
  );
}
