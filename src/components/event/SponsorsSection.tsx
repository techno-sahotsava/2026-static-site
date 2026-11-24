"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SPONSORS_DATA } from "@/lib/sponsorsData";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function SponsorsSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = containerRef.current;
      if (!el) return;

      // Header reveal
      gsap.fromTo(
        el.querySelector(".sponsors-header-reveal"),
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el.querySelector(".sponsors-header-reveal"),
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Staggered grid cards reveal
      const cards = el.querySelectorAll(".sponsor-card-reveal");
      if (cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 24, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.02,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el.querySelector(".sponsors-grid"),
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
      id="sponsors"
      ref={containerRef}
      className="relative py-20 sm:py-28 px-4 sm:px-8 bg-[#0d0d0e] text-[#ffffff] border-b border-white/10 overflow-hidden z-10"
    >
      {/* 3D Ambient Studio Grid Background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.08]"
        style={{
          backgroundImage: `radial-gradient(rgba(212, 199, 255, 0.3) 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

      {/* Top Ambient Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-28 left-1/2 -translate-x-1/2 w-[720px] h-[320px] rounded-full blur-[130px] opacity-25 bg-[#d4c7ff]"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="sponsors-header-reveal mb-10 sm:mb-12 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div className="text-center lg:text-left mx-auto lg:mx-0">
            <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl text-[#ffffff] leading-none uppercase tracking-tight">
              PREVIOUS SPONSORS
            </h2>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row justify-center lg:justify-end gap-3">
            <a
              href="/Techno%20Sahotsava%20Sponsorship%202026%20Deck.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex w-full sm:w-auto items-center justify-center gap-3 px-6 sm:px-8 py-3.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/20 hover:border-white/50 backdrop-blur-md transition-all duration-300 shadow-[0_0_24px_rgba(255,255,255,0.05)] text-white font-tech uppercase tracking-[0.16em] text-xs sm:text-sm font-semibold active:scale-95"
            >
              <span>SPONSOR BROCHURE</span>
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-[#B9ACF0] group-hover:text-white transition-colors"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="8" y1="13" x2="16" y2="13" />
                <line x1="8" y1="17" x2="16" y2="17" />
              </svg>
            </a>
            <a
              href="mailto:technosahotsava@gmail.com"
              aria-label="Email technosahotsava@gmail.com about sponsorship"
              className="group relative inline-flex w-full items-center justify-center gap-3 px-6 sm:px-8 py-3.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/20 hover:border-white/50 backdrop-blur-md transition-all duration-300 shadow-[0_0_24px_rgba(255,255,255,0.05)] text-white font-tech uppercase tracking-[0.16em] text-xs sm:text-sm font-semibold active:scale-95 sm:hidden"
            >
              <span>BECOME A SPONSOR</span>
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-[#B9ACF0] group-hover:translate-x-1 group-hover:text-white transition-all"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=technosahotsava%40gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Email technosahotsava@gmail.com about sponsorship"
              className="group relative hidden w-full sm:w-auto items-center justify-center gap-3 px-6 sm:px-8 py-3.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/20 hover:border-white/50 backdrop-blur-md transition-all duration-300 shadow-[0_0_24px_rgba(255,255,255,0.05)] text-white font-tech uppercase tracking-[0.16em] text-xs sm:text-sm font-semibold active:scale-95 sm:inline-flex"
            >
              <span>BECOME A SPONSOR</span>
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-[#B9ACF0] group-hover:translate-x-1 group-hover:text-white transition-all"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>
        </div>

        {/* 53 Sponsor Cards Grid */}
        <div className="sponsors-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3.5 sm:gap-4 lg:gap-5">
          {SPONSORS_DATA.map((sponsor) => (
            <div
              key={sponsor.id}
              className="sponsor-card-reveal group/sponsor relative aspect-square rounded-2xl bg-[#141416]/80 hover:bg-[#1b1a22] border border-white/10 hover:border-white/30 backdrop-blur-md p-5 sm:p-6 flex flex-col items-center justify-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_32px_rgba(0,0,0,0.8)] cursor-pointer"
            >
              {/* Subtle Ambient Radial Glow on Card Hover */}
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover/sponsor:opacity-100 transition-opacity duration-300"
                style={{
                  background:
                    "radial-gradient(circle at center, rgba(185, 172, 240, 0.12) 0%, transparent 70%)",
                }}
              />

              {/* Sponsor Logo */}
              <div className="relative z-10 w-full h-full flex items-center justify-center">
                <img
                  src={sponsor.logo}
                  alt={sponsor.name}
                  loading="lazy"
                  className={`max-h-full max-w-full object-contain filter drop-shadow-md group-hover/sponsor:scale-105 transition-transform duration-300 ${
                    sponsor.id === "sp-51" ? "" : "bg-white p-2 rounded-lg"
                  }`}
                />
              </div>

              {/* Hover Badge / Brand Name tooltip */}
              <span className="absolute bottom-2 font-tech text-[9px] sm:text-[10px] text-white/70 tracking-wider uppercase opacity-0 group-hover/sponsor:opacity-100 transition-opacity duration-200 truncate max-w-[85%] text-center pointer-events-none z-20">
                {sponsor.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
