"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { CardSpotlight } from "@/components/ui/card-spotlight";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export interface DignitaryProfile {
  id: string;
  badge: string;
  name: string;
  designation: string;
  monogram: string;
  imageUrl: string;
  thumbnailUrl?: string;
  imageClassName?: string;
  objectPosition?: string;
}

export const DIGNITARIES: DignitaryProfile[] = [
  {
    id: "dig-01",
    badge: "d",
    name: "PROF. DR. SUJOY BISWAS",
    designation: "Director & CEO of Techno India Group & Registrar Techno India University, West Bengal",
    monogram: "SB",
    imageUrl: "https://res.cloudinary.com/lsyjstbv/image/upload/f_auto,q_auto:good,w_800,c_limit/sanskaran_2026/dignitaries/sujoy-c0m-3gq8",
    thumbnailUrl: "https://res.cloudinary.com/lsyjstbv/image/upload/f_auto,q_auto:low,w_40,e_blur:1000/sanskaran_2026/dignitaries/sujoy-c0m-3gq8",
    imageClassName: "object-center",
  },
  {
    id: "dig-02",
    badge: "PATRON & ACADEMIC HEAD",
    name: "PROF. DR. RINA PALADHI",
    designation: "Director of Academics, Techno India University, West Bengal",
    monogram: "RP",
    imageUrl: "https://res.cloudinary.com/lsyjstbv/image/upload/f_auto,q_auto:good,w_800,c_limit/sanskaran_2026/dignitaries/prof__dr__rina_paladhi",
    thumbnailUrl: "https://res.cloudinary.com/lsyjstbv/image/upload/f_auto,q_auto:low,w_40,e_blur:1000/sanskaran_2026/dignitaries/prof__dr__rina_paladhi",
    imageClassName: "object-center",
  },
  {
    id: "dig-03",
    badge: "FACULTY CONVENOR",
    name: "PROF. ISHAN GHOSH",
    designation: "Head of Administration, Chairman of Disciplinary commitee, Associate Dean of Student affairs of Techno India University-West Bengal",
    monogram: "IG",
    imageUrl: "https://res.cloudinary.com/lsyjstbv/image/upload/f_auto,q_auto:good,w_800,c_limit/sanskaran_2026/dignitaries/prof__ishan_ghosh",
    thumbnailUrl: "https://res.cloudinary.com/lsyjstbv/image/upload/f_auto,q_auto:low,w_40,e_blur:1000/sanskaran_2026/dignitaries/prof__ishan_ghosh",
    /* 👈 EXACT CODE CONTROLLING ALIGNMENT FOR PROF. ISHAN GHOSH:
       Use 'object-bottom' to bring his face fully into view,
       or custom percentage like 'object-[50%_80%]' / 'object-[50%_90%]' */
    imageClassName: "object-center",
  },
];

export default function DignitariesSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = containerRef.current;
      if (!el) return;

      const header = el.querySelector(".dignitaries-header-reveal");
      if (header) {
        gsap.fromTo(
          header,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      const cards = el.querySelectorAll(".dignitary-card-reveal");
      if (cards.length > 0) {
        gsap.fromTo(
          cards,
          { autoAlpha: 0, y: 26 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.85,
            stagger: 0.16,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el.querySelector(".dignitaries-grid"),
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    },
    { scope: containerRef }
  );

  return (
    <section
      id="dignitaries"
      ref={containerRef}
      className="relative py-20 sm:py-28 px-4 sm:px-8 bg-[#0c4243] border-b border-white/10 overflow-hidden z-10"
    >
      {/* 3D Ambient Studio Grid Background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.1]"
        style={{
          backgroundImage: `radial-gradient(rgba(212, 199, 255, 0.25) 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="dignitaries-header-reveal mb-12 sm:mb-16 max-w-3xl text-center md:text-left mx-auto md:mx-0">
          <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl text-[#ffffff] leading-none uppercase tracking-tight">
            DIGNITARIES &amp; COUNCIL
          </h2>
          
        </div>

        {/* Highlighted Dignitaries Portrait Cards */}
        <div className="dignitaries-grid grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto items-stretch">
          {DIGNITARIES.map((person) => (
            <div key={person.id} className="dignitary-card-reveal flex">
              <CardSpotlight
                radius={360}
                color="rgba(113, 76, 182, 0.25)"
                className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 hover:border-[#714cb6] bg-[#141416] shadow-[0_20px_50px_rgba(0,0,0,0.6)] p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1.5 group flex flex-col justify-between w-full"
              >
            
                {/* Textured Cardstock Ambient Dot Grid */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 opacity-[0.08] pointer-events-none"
                  style={{
                    backgroundImage: `radial-gradient(#714cb6 1px, transparent 1px)`,
                    backgroundSize: "18px 18px",
                  }}
                />

                <div className="relative z-10 flex flex-col">
                

                  {/* HERO PORTRAIT / PHOTO CARD PLINTH */}
                  <div className="relative w-full aspect-[4/5] sm:h-72 rounded-xl sm:rounded-2xl border border-white/10 bg-gradient-to-b from-[#18181b] to-[#0d0d0e] overflow-hidden flex flex-col justify-center items-center shadow-inner transition-transform duration-300 group-hover:scale-[1.02]">
                    <img
                      src={person.imageUrl}
                      alt={person.name}
                      loading="lazy"
                      decoding="async"
                      style={person.objectPosition ? { objectPosition: person.objectPosition } : undefined}
                      className={`w-full h-full object-cover ${person.imageClassName || "object-center"} transition-transform duration-500 group-hover:scale-105`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#141416] via-transparent to-transparent opacity-60 pointer-events-none" />
                  </div>

                  {/* HIGHLIGHTED NAME & CLEAN ROLE */}
                  <div className="mt-5 text-center md:text-left">
                    <h3 className="font-display text-2xl sm:text-3xl text-[#ffffff] leading-none tracking-wide uppercase transition-colors duration-200 group-hover:text-[#d4c7ff]">
                      {person.name}
                    </h3>
                    <p className="font-tech text-xs font-bold tracking-widest uppercase mt-1.5 text-[#d4c7ff]">
                      {person.designation}
                    </p>
                  </div>
                </div>
              </CardSpotlight>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
