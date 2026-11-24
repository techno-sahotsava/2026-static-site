"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

/* ==========================================================================
   1. CORE MEMBERS DATA ARCHITECTURE
   ========================================================================== */
export type DesignVariant = "crimson-vanguard" | "checkered-sovereign" | "cyber-horizon";

export interface CoreMember {
  id: string;
  name: string;
  role: string;
  vertical: string;
  designVariant: DesignVariant;
  archetype: string;
  quote: string;
  year: string;
  imageUrl?: string;
}

export const CORE_MEMBERS: CoreMember[] = [
  {
    id: "cm-01",
    name: "ARCHISHA",
    role: "CURATION & HERITAGE",
    vertical: "EXECUTIVE COUNCIL",
    designVariant: "crimson-vanguard",
    archetype: "THE CRIMSON VANGUARD",
    quote: "Every initiative we spearhead represents an unfiltered student voice ready to ignite the campus.",
    year: "FINAL YEAR",
    imageUrl: "https://res.cloudinary.com/lsyjstbv/image/upload/f_auto,q_auto:good,w_800,c_limit/sanskaran_2026/core_members/archisha",
  },
  {
    id: "cm-02",
    name: "ARNAB",
    role: "TECHNICAL & SYSTEMS LEAD",
    vertical: "DIGITAL ARCHITECTURE",
    designVariant: "cyber-horizon",
    archetype: "ARCHITECT OF THE HORIZON",
    quote: "Where modern web craftsmanship meets high-impact festival spectacle.",
    year: "FINAL YEAR",
    imageUrl: "https://res.cloudinary.com/lsyjstbv/image/upload/f_auto,q_auto:good,w_800,c_limit/sanskaran_2026/core_members/arnab",
  },
  {
    id: "cm-03",
    name: "AYAN",
    role: "FESTIVAL SECRETARY",
    vertical: "STUDENT GOVERNANCE",
    designVariant: "checkered-sovereign",
    archetype: "SOVEREIGN OF CULTURE",
    quote: "Heritage is not static—it is a living court of ideas, art, and intellectual dialogue.",
    year: "FINAL YEAR",
    imageUrl: "https://res.cloudinary.com/lsyjstbv/image/upload/f_auto,q_auto:good,w_800,c_limit/sanskaran_2026/core_members/ayan",
  },
  {
    id: "cm-04",
    name: "BHUMI",
    role: "CREATIVE & SCENOGRAPHY LEAD",
    vertical: "VISUAL IDENTITY",
    designVariant: "crimson-vanguard",
    archetype: "KEEPER OF THE EMBERS",
    quote: "Transforming every open-air arena into an immersive celebration of light and shadow.",
    year: "THIRD YEAR",
    imageUrl: "https://res.cloudinary.com/lsyjstbv/image/upload/f_auto,q_auto:good,w_800,c_limit/sanskaran_2026/core_members/bhumi",
  },
  {
    id: "cm-05",
    name: "CHADNI",
    role: "CULTURAL CONCLAVE LEAD",
    vertical: "PERFORMING ARTS",
    designVariant: "checkered-sovereign",
    archetype: "VOICE OF THE SOVEREIGN",
    quote: "Art is the universal language that unites our campus across all disciplines.",
    year: "THIRD YEAR",
    imageUrl: "https://res.cloudinary.com/lsyjstbv/image/upload/f_auto,q_auto:good,w_800,c_limit/sanskaran_2026/core_members/chadni",
  },
  {
    id: "cm-06",
    name: "DEBARUN",
    role: "LOGISTICS & OPERATIONS",
    vertical: "CENTRAL COMMAND",
    designVariant: "cyber-horizon",
    archetype: "STEWARD OF THE GRID",
    quote: "Precision behind the curtains powers the pure magic experienced on stage.",
    year: "FINAL YEAR",
    imageUrl: "https://res.cloudinary.com/lsyjstbv/image/upload/f_auto,q_auto:good,w_800,c_limit/sanskaran_2026/core_members/debarun",
  },
  {
    id: "cm-07",
    name: "JAGRIT",
    role: "MEDIA & BROADCAST HEAD",
    vertical: "PUBLIC ENGAGEMENT",
    designVariant: "crimson-vanguard",
    archetype: "CHRONICLER OF MOMENTS",
    quote: "Capturing the raw energy, laughter, and camaraderie that define Sanskaran.",
    year: "THIRD YEAR",
    imageUrl: "https://res.cloudinary.com/lsyjstbv/image/upload/f_auto,q_auto:good,w_800,c_limit/sanskaran_2026/core_members/jagrit",
  },
  {
    id: "cm-08",
    name: "NAYAN",
    role: "EVENTS & PRODUCTION DIRECTOR",
    vertical: "SAHOTSAVA ARENA",
    designVariant: "checkered-sovereign",
    archetype: "MASTER OF CEREMONIES",
    quote: "Forty-five events, seventy-two hours, one shared heartbeat across the university.",
    year: "FINAL YEAR",
    imageUrl: "https://res.cloudinary.com/lsyjstbv/image/upload/f_auto,q_auto:good,w_800,c_limit/sanskaran_2026/core_members/nayan",
  },
  {
    id: "cm-09",
    name: "PREETISHA",
    role: "PUBLIC RELATIONS & ALLIANCES",
    vertical: "EXTERNAL RELATIONS",
    designVariant: "cyber-horizon",
    archetype: "CATALYST OF SYNERGY",
    quote: "Connecting student visionaries with artists, thinkers, and patrons across the nation.",
    year: "THIRD YEAR",
    imageUrl: "/IMG_7638.JPG.jpeg",
  },
  {
    id: "cm-10",
    name: "SAGNIK",
    role: "FINANCE & SPONSORSHIPS",
    vertical: "TREASURY & CORPORATE",
    designVariant: "crimson-vanguard",
    archetype: "THE PRUDENT STRATEGIST",
    quote: "Building sustainable partnerships that elevate our festival year after year.",
    year: "FINAL YEAR",
    imageUrl: "https://res.cloudinary.com/lsyjstbv/image/upload/f_auto,q_auto:good,w_800,c_limit/sanskaran_2026/core_members/sagnik",
  },
  {
    id: "cm-11",
    name: "SHOAIB",
    role: "HOSPITALITY & DELEGATIONS",
    vertical: "CAMPUS WELFARE",
    designVariant: "checkered-sovereign",
    archetype: "GUARDIAN OF EXPERIENCE",
    quote: "Ensuring every participant and guest feels the warmth of our collective family.",
    year: "THIRD YEAR",
    imageUrl: "https://res.cloudinary.com/lsyjstbv/image/upload/f_auto,q_auto:good,w_800,c_limit/sanskaran_2026/core_members/shoaib",
  },
  {
    id: "cm-12",
    name: "SUKANTA",
    role: "STRATEGIC ADVISOR",
    vertical: "ALUMNI & ADVISORY",
    designVariant: "cyber-horizon",
    archetype: "BEACON OF CONTINUITY",
    quote: "Upholding the founding ethos while giving the next generation the stage to shine.",
    year: "FINAL YEAR",
    imageUrl: "https://res.cloudinary.com/lsyjstbv/image/upload/f_auto,q_auto:good,w_800,c_limit/sanskaran_2026/core_members/sukanta",
  },
  {
    id: "cm-13",
    name: "SHOUNAK",
    role: "OPERATIONS & LOGISTICS LEAD",
    vertical: "EXECUTIVE COUNCIL",
    designVariant: "crimson-vanguard",
    archetype: "THE VANGUARD STEWARD",
    quote: "Uniting passionate minds to orchestrate a cultural conclave that resonates far beyond the stage.",
    year: "FINAL YEAR",
    imageUrl: "https://res.cloudinary.com/lsyjstbv/image/upload/f_auto,q_auto:good,w_800,c_limit/sanskaran_2026/core_members/shounak",
  },
];

/* ==========================================================================
   2. INDIVIDUAL CORE MEMBER IMAGE CARD
   ========================================================================== */
interface CardProps {
  member: CoreMember;
  index: number;
}

function CoreMemberCard({ member, index }: CardProps) {
  const isOddFromLeft = index % 2 === 0;

  return (
    <div
      data-card-index={index}
      data-side={isOddFromLeft ? "left" : "right"}
      className="core-card-wrapper w-full pt-2"
    >
      <div className="relative w-full aspect-[3/4.35] rounded-[24px] overflow-hidden border-[2px] border-[#e3e3e2]/30 hover:border-[#d4c7ff] transition-all duration-500 ease-out transform-gpu hover:-translate-y-3 hover:shadow-[0_32px_64px_-12px_rgba(0,0,0,0.95),0_0_36px_rgba(113,76,182,0.35)] shadow-[0_20px_50px_rgba(0,0,0,0.85)] group bg-[#111113] cursor-pointer will-change-transform">
        {/* Member Photo */}
        {member.imageUrl && (
          <div className="absolute inset-0 overflow-hidden">
            <img
              src={member.imageUrl}
              alt={member.name}
              loading={index < 3 ? "eager" : "lazy"}
              fetchPriority={index < 3 ? "low" : "auto"}
              decoding="async"
              className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </div>
        )}

        {/* Silky-Smooth Feathered Gradient Scrim (No harsh cutoff line) */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-40 pointer-events-none bg-gradient-to-t from-black/85 via-black/40 via-45% to-transparent"
        />

        {/* Ambient Top Glint on Hover */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        />

        {/* Bottom Information Plinth with Member Name */}
        <div className="absolute inset-x-0 bottom-0 z-10 p-5 text-[#ffffff]">
          <h3 className="font-display text-2xl sm:text-5xl tracking-wide text-[#ffffff] leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] group-hover:text-[#d4c7ff] transition-colors duration-300">
            {member.name}
          </h3>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   3. MAIN CORE MEMBERS SECTION
   ========================================================================== */
export default function CoreMembersSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".core-card-wrapper");
      if (!cards.length) return;

      // 1. Header elements entrance
      gsap.from(".core-anim-header", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        y: 28,
        autoAlpha: 0,
        stagger: 0.1,
        duration: 0.7,
        ease: "power3.out",
      });

      // 2. Individual Card Entrance on Viewport Entry
      cards.forEach((card, i) => {
        const isFromLeft = i % 2 === 0;
        gsap.fromTo(
          card,
          {
            x: isFromLeft ? -100 : 100,
            y: 35,
            scale: 0.95,
            autoAlpha: 0,
          },
          {
            x: 0,
            y: 0,
            scale: 1,
            autoAlpha: 1,
            duration: 0.8,
            ease: "power3.out",
            clearProps: "transform",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="core-members"
      ref={containerRef}
      className="relative py-20 sm:py-28 overflow-hidden z-10 bg-[#0c4243] text-[#ffffff] border-b border-[#0c4243]/40"
    >
      {/* 3D Ambient Studio Grid Background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.08]"
        style={{
          backgroundImage: `radial-gradient(#d4c7ff 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />

      {/* Background Ambient Glow Plinth */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[450px] bg-gradient-to-r from-[#714cb6]/20 via-[#d4c7ff]/10 to-transparent blur-[140px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-16 text-center lg:text-left">
          <div className="max-w-2xl mx-auto lg:mx-0">
            <h2 className="core-anim-header font-display text-4xl sm:text-6xl lg:text-7xl text-[#ffffff] leading-none uppercase tracking-tight">
              CORE MEMBERS
            </h2>
          </div>
        </div>

        {/* Grid of Core Member Photo Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {CORE_MEMBERS.map((member, idx) => (
            <CoreMemberCard key={member.id} member={member} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
