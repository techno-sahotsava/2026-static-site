"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { CardSpotlight } from "@/components/ui/card-spotlight";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export interface FounderProfile {
  id: string;
  badge: string;
  name: string;
  designation: string;
  monogram: string;
  imageUrl: string;
  thumbnailUrl?: string;
  imageClassName?: string;
}

export const FOUNDERS: FounderProfile[] = [
  {
    id: "fnd-01",
    badge: "FOUNDER",
    name: "SAYAN CHAKRABORTY",
    designation: "FOUNDER",
    monogram: "SC",
    imageUrl: "https://res.cloudinary.com/lsyjstbv/image/upload/f_auto,q_auto:good,w_800,c_limit/sanskaran_2026/founders/sayan_chakraborty",
    thumbnailUrl: "https://res.cloudinary.com/lsyjstbv/image/upload/f_auto,q_auto:low,w_40,e_blur:1000/sanskaran_2026/founders/sayan_chakraborty",
  },
  {
    id: "fnd-02",
    badge: "FOUNDER",
    name: "PARTHA SARATHI PAL",
    designation: "FOUNDER",
    monogram: "PP",
    imageUrl: "https://res.cloudinary.com/lsyjstbv/image/upload/f_auto,q_auto:good,w_800,c_limit/sanskaran_2026/founders/partha_sarathi_pal",
    thumbnailUrl: "https://res.cloudinary.com/lsyjstbv/image/upload/f_auto,q_auto:low,w_40,e_blur:1000/sanskaran_2026/founders/partha_sarathi_pal",
    imageClassName: "object-center",
  },
  
];

export default function FoundersSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = containerRef.current;
      if (!el) return;

      const header = el.querySelector(".founders-header-reveal");
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

      const cards = el.querySelectorAll(".founder-card-reveal");
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
              trigger: el.querySelector(".founders-grid"),
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
      id="founders"
      ref={containerRef}
      className="relative py-20 sm:py-28 px-4 sm:px-8 bg-[#0d0d0e] text-[#ffffff] border-b border-white/15 overflow-hidden z-10"
    >
      {/* 3D Ambient Studio Grid Background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage: `radial-gradient(#d4c7ff 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="founders-header-reveal mb-12 sm:mb-16 max-w-3xl text-center md:text-left mx-auto md:mx-0">
          <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl text-[#ffffff] leading-none uppercase tracking-tight">
            FOUNDERS OF SANSKARAN
          </h2>
        
        </div>

        {/* Highlighted Founders Portrait Cards */}
        <div className="founders-grid grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto items-stretch">
          {FOUNDERS.map((person) => (
            <div key={person.id} className="founder-card-reveal flex">
              <CardSpotlight
                radius={360}
                color="rgba(113, 76, 182, 0.2)"
                className="relative overflow-hidden rounded-2xl sm:rounded-3xl border-2 border-white/15 hover:border-[#d4c7ff] bg-[#ffffff]/10 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.35)] p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1.5 group flex flex-col justify-between w-full"
              >
               

                {/* Textured Cardstock Ambient Dot Grid */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 opacity-[0.05] pointer-events-none"
                  style={{
                    backgroundImage: `radial-gradient(#d4c7ff 1px, transparent 1px)`,
                    backgroundSize: "18px 18px",
                  }}
                />

                <div className="relative z-10 flex flex-col">
                  {/* HERO PORTRAIT / PHOTO CARD PLINTH */}
                  <div className="relative w-full aspect-[4/5] sm:h-72 rounded-xl sm:rounded-2xl border border-white/15 bg-gradient-to-b from-[#082b2c] to-[#041c1d] overflow-hidden flex flex-col justify-center items-center shadow-inner transition-transform duration-300 group-hover:scale-[1.02]">
                    <img
                      src={person.imageUrl}
                      alt={person.name}
                      loading="lazy"
                      decoding="async"
                      className={`w-full h-full object-cover ${person.imageClassName || "object-top"} transition-transform duration-500 group-hover:scale-105`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#082b2c] via-transparent to-transparent opacity-60 pointer-events-none" />
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
