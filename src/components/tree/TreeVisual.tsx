"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function TreeVisual() {
  const svgRef = useRef<SVGSVGElement>(null);

  useGSAP(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const branches = svg.querySelectorAll("[data-animate]");
    if (branches.length) {
      gsap.from(branches, {
        y: 40,
        autoAlpha: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: svg,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    }

    const bird = svg.querySelector("[data-bird]");
    if (bird) {
      gsap.to(bird, {
        y: -8,
        rotation: -3,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 800 600"
      className="mx-auto h-auto w-full max-w-3xl"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="trunkGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6b4e13" />
          <stop offset="100%" stopColor="#8B6914" />
        </linearGradient>
        <radialGradient id="leafGrad1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffad4e" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#ffad4e" stopOpacity="0.1" />
        </radialGradient>
        <radialGradient id="leafGrad2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#e08a20" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#e08a20" stopOpacity="0.05" />
        </radialGradient>
      </defs>

      {/* Trunk */}
      <g data-animate>
        <path
          d="M372 600 L378 380 Q400 358 422 380 L428 600 Z"
          fill="url(#trunkGrad)"
        />
        {/* Roots */}
        <path
          d="M372 600 Q340 580 320 590"
          stroke="#6b4e13"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path
          d="M428 600 Q460 580 480 590"
          stroke="#6b4e13"
          strokeWidth="6"
          strokeLinecap="round"
        />
      </g>

      {/* Left main branch */}
      <g data-animate>
        <path
          d="M400 420 Q250 380 180 300"
          stroke="#8B6914"
          strokeWidth="14"
          strokeLinecap="round"
        />
        <path
          d="M180 300 Q140 270 120 230"
          stroke="#8B6914"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <path
          d="M220 340 Q180 320 140 320"
          stroke="#8B6914"
          strokeWidth="6"
          strokeLinecap="round"
        />
        {/* Left leaf clusters */}
        <circle cx="120" cy="225" r="35" fill="url(#leafGrad1)" />
        <circle cx="100" cy="250" r="25" fill="url(#leafGrad2)" />
        <circle cx="140" cy="315" r="28" fill="url(#leafGrad1)" />
        <circle cx="130" cy="240" r="12" fill="#ffad4e" fillOpacity="0.3" />
      </g>

      {/* Right main branch */}
      <g data-animate>
        <path
          d="M400 400 Q520 360 600 280"
          stroke="#8B6914"
          strokeWidth="12"
          strokeLinecap="round"
        />
        <path
          d="M600 280 Q640 250 660 210"
          stroke="#8B6914"
          strokeWidth="7"
          strokeLinecap="round"
        />
        <path
          d="M560 320 Q600 300 630 310"
          stroke="#8B6914"
          strokeWidth="5"
          strokeLinecap="round"
        />
        {/* Right leaf clusters */}
        <circle cx="660" cy="205" r="35" fill="url(#leafGrad1)" />
        <circle cx="680" cy="230" r="22" fill="url(#leafGrad2)" />
        <circle cx="630" cy="305" r="25" fill="url(#leafGrad1)" />
        <circle cx="670" cy="220" r="12" fill="#ffad4e" fillOpacity="0.3" />
      </g>

      {/* Center-left branch */}
      <g data-animate>
        <path
          d="M400 370 Q340 260 300 180"
          stroke="#8B6914"
          strokeWidth="10"
          strokeLinecap="round"
        />
        <path
          d="M300 180 Q280 140 270 100"
          stroke="#8B6914"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          d="M350 230 Q320 200 290 210"
          stroke="#8B6914"
          strokeWidth="4"
          strokeLinecap="round"
        />
        {/* Center-left leaf clusters */}
        <circle cx="270" cy="95" r="30" fill="url(#leafGrad1)" />
        <circle cx="255" cy="120" r="20" fill="url(#leafGrad2)" />
        <circle cx="290" cy="205" r="18" fill="url(#leafGrad1)" />
        <circle cx="265" cy="105" r="10" fill="#ffad4e" fillOpacity="0.35" />
      </g>

      {/* Center-right branch */}
      <g data-animate>
        <path
          d="M400 350 Q460 250 530 160"
          stroke="#8B6914"
          strokeWidth="9"
          strokeLinecap="round"
        />
        <path
          d="M530 160 Q550 130 560 100"
          stroke="#8B6914"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          d="M470 210 Q500 190 520 200"
          stroke="#8B6914"
          strokeWidth="4"
          strokeLinecap="round"
        />
        {/* Center-right leaf clusters */}
        <circle cx="560" cy="95" r="28" fill="url(#leafGrad1)" />
        <circle cx="575" cy="120" r="18" fill="url(#leafGrad2)" />
        <circle cx="520" cy="195" r="15" fill="url(#leafGrad1)" />
        <circle cx="565" cy="105" r="10" fill="#ffad4e" fillOpacity="0.35" />
      </g>

      {/* Bird mascot on the top center-right branch */}
      <g data-bird>
        <ellipse cx="560" cy="80" rx="14" ry="10" fill="#ffad4e" />
        <ellipse cx="570" cy="75" rx="10" ry="8" fill="#e08a20" />
        <circle cx="578" cy="72" r="3" fill="#333" />
        <path d="M585 75 Q595 70 590 78" stroke="#e08a20" strokeWidth="2" fill="none" />
        <path d="M555 85 L560 95 L565 85" fill="#e08a20" />
        <path d="M565 85 L570 92 L575 85" fill="#ffad4e" />
      </g>
    </svg>
  );
}
