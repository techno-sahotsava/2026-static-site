"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CLUBS_DATA, ClubItem, ClubPhoto } from "@/lib/clubsData";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ==========================================================================
   INLINE VECTOR ICONS
   ========================================================================== */
const Icon = {
  Sparkles: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 3l1.9 5.8a2 2 0 0 0 1.3 1.3L21 12l-5.8 1.9a2 2 0 0 0-1.3 1.3L12 21l-1.9-5.8a2 2 0 0 0-1.3-1.3L3 12l5.8-1.9a2 2 0 0 0 1.3-1.3L12 3z" />
    </svg>
  ),
  X: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  ChevronLeft: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="15 18 9 12 15 6" />
    </svg>
  ),
  ChevronRight: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="9 18 15 12 9 6" />
    </svg>
  ),
  Maximize2: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="15 3 21 3 21 9" />
      <polyline points="9 21 3 21 3 15" />
      <line x1="21" y1="3" x2="14" y2="10" />
      <line x1="3" y1="21" x2="10" y2="14" />
    </svg>
  ),
  Layers: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  ),
  Rows: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <line x1="3" y1="12" x2="21" y2="12" />
    </svg>
  ),
  Columns: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <line x1="12" y1="3" x2="12" y2="21" />
    </svg>
  ),
};

/* ==========================================================================
   INDIVIDUAL CLUB EXPANDED THEMES (Distinct Background Color per Club)
   ========================================================================== */
interface ClubExpandedTheme {
  bg: string;
  gradient: string;
  border: string;
  glow: string;
  ambient: string;
  badgeBg: string;
}

const CLUB_EXPANDED_THEMES: Record<string, ClubExpandedTheme> = {
  // 01: ARITRAM (Dramatics & Theatre - Crimson Wine Noir)
  aritram: {
    bg: "#150607",
    gradient: "linear-gradient(180deg, #2A090D 0%, #170507 45%, #0B0203 100%)",
    border: "rgba(232, 80, 42, 0.45)",
    glow: "rgba(232, 80, 42, 0.35)",
    ambient: "#E8502A",
    badgeBg: "rgba(232, 80, 42, 0.2)",
  },
  dramatics: {
    bg: "#150607",
    gradient: "linear-gradient(180deg, #2A090D 0%, #170507 45%, #0B0203 100%)",
    border: "rgba(232, 80, 42, 0.45)",
    glow: "rgba(232, 80, 42, 0.35)",
    ambient: "#E8502A",
    badgeBg: "rgba(232, 80, 42, 0.2)",
  },
  // 02: CHITRAKATHA DESIGNING & EDITING (Digital Design & VFX - Cyber Cyan Navy)
  "chitrakatha-design": {
    bg: "#04121F",
    gradient: "linear-gradient(180deg, #07223D 0%, #04121F 45%, #02070F 100%)",
    border: "rgba(56, 189, 248, 0.45)",
    glow: "rgba(56, 189, 248, 0.35)",
    ambient: "#38BDF8",
    badgeBg: "rgba(56, 189, 248, 0.2)",
  },
  "chitraka-design": {
    bg: "#04121F",
    gradient: "linear-gradient(180deg, #07223D 0%, #04121F 45%, #02070F 100%)",
    border: "rgba(56, 189, 248, 0.45)",
    glow: "rgba(56, 189, 248, 0.35)",
    ambient: "#38BDF8",
    badgeBg: "rgba(56, 189, 248, 0.2)",
  },
  // 03: CHITRAKATHA PHOTOGRAPHY (Photography & Media - Darkroom Amber Gold)
  "chitrakatha-photography": {
    bg: "#180D03",
    gradient: "linear-gradient(180deg, #2B1804 0%, #180D03 45%, #0A0501 100%)",
    border: "rgba(245, 158, 11, 0.45)",
    glow: "rgba(245, 158, 11, 0.35)",
    ambient: "#F59E0B",
    badgeBg: "rgba(245, 158, 11, 0.2)",
  },
  "chitraka-photography": {
    bg: "#180D03",
    gradient: "linear-gradient(180deg, #2B1804 0%, #180D03 45%, #0A0501 100%)",
    border: "rgba(245, 158, 11, 0.45)",
    glow: "rgba(245, 158, 11, 0.35)",
    ambient: "#F59E0B",
    badgeBg: "rgba(245, 158, 11, 0.2)",
  },
  // 04: CHITRAKATHA ART AND CRAFT (Fine Arts & Sculpture - Twilight Lavender)
  "chitrakatha-art": {
    bg: "#0E0A1E",
    gradient: "linear-gradient(180deg, #1C123B 0%, #0D081B 45%, #06040F 100%)",
    border: "rgba(185, 172, 240, 0.45)",
    glow: "rgba(185, 172, 240, 0.35)",
    ambient: "#B9ACF0",
    badgeBg: "rgba(185, 172, 240, 0.2)",
  },
  "chitraka-art": {
    bg: "#0E0A1E",
    gradient: "linear-gradient(180deg, #1C123B 0%, #0D081B 45%, #06040F 100%)",
    border: "rgba(185, 172, 240, 0.45)",
    glow: "rgba(185, 172, 240, 0.35)",
    ambient: "#B9ACF0",
    badgeBg: "rgba(185, 172, 240, 0.2)",
  },
  "fine-arts": {
    bg: "#0E0A1E",
    gradient: "linear-gradient(180deg, #1C123B 0%, #0D081B 45%, #06040F 100%)",
    border: "rgba(185, 172, 240, 0.45)",
    glow: "rgba(185, 172, 240, 0.35)",
    ambient: "#B9ACF0",
    badgeBg: "rgba(185, 172, 240, 0.2)",
  },
  // 05: CHITRAKATHA (Creative Arts Atelier - Midnight Fuchsia Velvet)
  chitrakatha: {
    bg: "#190514",
    gradient: "linear-gradient(180deg, #2E0724 0%, #190514 45%, #0C020A 100%)",
    border: "rgba(236, 72, 153, 0.45)",
    glow: "rgba(236, 72, 153, 0.35)",
    ambient: "#EC4899",
    badgeBg: "rgba(236, 72, 153, 0.2)",
  },
  chitraka: {
    bg: "#190514",
    gradient: "linear-gradient(180deg, #2E0724 0%, #190514 45%, #0C020A 100%)",
    border: "rgba(236, 72, 153, 0.45)",
    glow: "rgba(236, 72, 153, 0.35)",
    ambient: "#EC4899",
    badgeBg: "rgba(236, 72, 153, 0.2)",
  },
  // 06: CHECKMATE (Chess & Strategy - Platinum Slate Noir)
  checkmate: {
    bg: "#0B0F15",
    gradient: "linear-gradient(180deg, #161D26 0%, #0B0F15 45%, #05070B 100%)",
    border: "rgba(148, 163, 184, 0.45)",
    glow: "rgba(148, 163, 184, 0.35)",
    ambient: "#94A3B8",
    badgeBg: "rgba(148, 163, 184, 0.2)",
  },
  // 07: DHRUBOTARA (Astronomy & Science - Cosmic Deep Indigo)
  dhrubotara: {
    bg: "#07081B",
    gradient: "linear-gradient(180deg, #12143B 0%, #07081B 45%, #03040E 100%)",
    border: "rgba(129, 140, 248, 0.45)",
    glow: "rgba(129, 140, 248, 0.35)",
    ambient: "#818CF8",
    badgeBg: "rgba(129, 140, 248, 0.2)",
  },
  // 08: NRITYAKSHA (Dance Troupe - Midnight Ruby Velvet)
  nrityaksha: {
    bg: "#1A0512",
    gradient: "linear-gradient(180deg, #2E0720 0%, #170410 45%, #0B0207 100%)",
    border: "rgba(244, 63, 94, 0.45)",
    glow: "rgba(244, 63, 94, 0.35)",
    ambient: "#F43F5E",
    badgeBg: "rgba(244, 63, 94, 0.2)",
  },
  dance: {
    bg: "#1A0512",
    gradient: "linear-gradient(180deg, #2E0720 0%, #170410 45%, #0B0207 100%)",
    border: "rgba(244, 63, 94, 0.45)",
    glow: "rgba(244, 63, 94, 0.35)",
    ambient: "#F43F5E",
    badgeBg: "rgba(244, 63, 94, 0.2)",
  },
  // 09: PAPERBACK SOCIETY (Literature & Debate - Vintage Sepia Ochre)
  "paperback-society": {
    bg: "#1A0F03",
    gradient: "linear-gradient(180deg, #2E1905 0%, #170D02 45%, #0C0601 100%)",
    border: "rgba(251, 191, 36, 0.45)",
    glow: "rgba(251, 191, 36, 0.35)",
    ambient: "#FBBF24",
    badgeBg: "rgba(251, 191, 36, 0.2)",
  },
  literary: {
    bg: "#1A0F03",
    gradient: "linear-gradient(180deg, #2E1905 0%, #170D02 45%, #0C0601 100%)",
    border: "rgba(245, 158, 11, 0.45)",
    glow: "rgba(245, 158, 11, 0.35)",
    ambient: "#F59E0B",
    badgeBg: "rgba(245, 158, 11, 0.2)",
  },
  // 10: PHOENIX (Tech & Gaming - Cyber Flame Neon)
  phoenix: {
    bg: "#180603",
    gradient: "linear-gradient(180deg, #300C06 0%, #180603 45%, #0A0201 100%)",
    border: "rgba(255, 87, 34, 0.45)",
    glow: "rgba(255, 87, 34, 0.35)",
    ambient: "#FF5722",
    badgeBg: "rgba(255, 87, 34, 0.2)",
  },
  pheonix: {
    bg: "#180603",
    gradient: "linear-gradient(180deg, #300C06 0%, #180603 45%, #0A0201 100%)",
    border: "rgba(255, 87, 34, 0.45)",
    glow: "rgba(255, 87, 34, 0.35)",
    ambient: "#FF5722",
    badgeBg: "rgba(255, 87, 34, 0.2)",
  },
  // 11: SWARAKRITI (Music Society - Solar Amber Gold)
  swarakriti: {
    bg: "#160E03",
    gradient: "linear-gradient(180deg, #2A1804 0%, #150C02 45%, #0A0601 100%)",
    border: "rgba(234, 179, 8, 0.45)",
    glow: "rgba(234, 179, 8, 0.35)",
    ambient: "#EAB308",
    badgeBg: "rgba(234, 179, 8, 0.2)",
  },
  music: {
    bg: "#160E03",
    gradient: "linear-gradient(180deg, #2A1804 0%, #150C02 45%, #0A0601 100%)",
    border: "rgba(255, 170, 36, 0.45)",
    glow: "rgba(255, 170, 36, 0.35)",
    ambient: "#FFAA24",
    badgeBg: "rgba(255, 170, 36, 0.2)",
  },
  // 12: STEP ALPHA (Urban Hip-Hop & Street - Emerald Street Jade)
  "step-alpha": {
    bg: "#03170E",
    gradient: "linear-gradient(180deg, #062B1A 0%, #03170E 45%, #010B07 100%)",
    border: "rgba(16, 185, 129, 0.45)",
    glow: "rgba(16, 185, 129, 0.35)",
    ambient: "#10B981",
    badgeBg: "rgba(16, 185, 129, 0.2)",
  },
  // 13: DESI GROOVER (Bollywood & Folk Dance - Saffron Tangerine Noir)
  "desi-groover": {
    bg: "#1A0B03",
    gradient: "linear-gradient(180deg, #2E1405 0%, #1A0B03 45%, #0C0501 100%)",
    border: "rgba(249, 115, 22, 0.45)",
    glow: "rgba(249, 115, 22, 0.35)",
    ambient: "#F97316",
    badgeBg: "rgba(249, 115, 22, 0.2)",
  },
  // 14: BEAT BUSTER (Beatbox, Rap & Acoustic - Electric Cyan Teal)
  "beat-buster": {
    bg: "#031418",
    gradient: "linear-gradient(180deg, #05272F 0%, #031418 45%, #010A0C 100%)",
    border: "rgba(6, 182, 212, 0.45)",
    glow: "rgba(6, 182, 212, 0.35)",
    ambient: "#06B6D4",
    badgeBg: "rgba(6, 182, 212, 0.2)",
  },
  fashion: {
    bg: "#041611",
    gradient: "linear-gradient(180deg, #072B21 0%, #041611 45%, #020A08 100%)",
    border: "rgba(52, 211, 153, 0.45)",
    glow: "rgba(52, 211, 153, 0.35)",
    ambient: "#34D399",
    badgeBg: "rgba(52, 211, 153, 0.2)",
  },
  cinematography: {
    bg: "#040F1F",
    gradient: "linear-gradient(180deg, #071E3D 0%, #040E1E 45%, #02060F 100%)",
    border: "rgba(59, 130, 246, 0.45)",
    glow: "rgba(59, 130, 246, 0.35)",
    ambient: "#3B82F6",
    badgeBg: "rgba(59, 130, 246, 0.2)",
  },
};

const DEFAULT_EXPANDED_THEME: ClubExpandedTheme = {
  bg: "#090812",
  gradient: "linear-gradient(180deg, #151322 0%, #090812 50%, #040308 100%)",
  border: "rgba(255, 255, 255, 0.15)",
  glow: "rgba(185, 172, 240, 0.25)",
  ambient: "#B9ACF0",
  badgeBg: "rgba(255, 255, 255, 0.1)",
};

/* =============================================================================
   DARK SILVERING GREEN SILK CORD & SUSPENSION ROD RIG (/impeccable)
   ============================================================================= */

function SilkCordSegment() {
  return (
    <div className="relative w-full h-4 sm:h-5 flex items-center justify-between pointer-events-none select-none z-20 my-[-1px]">
      {/* Left Cord Anchor */}
      <div className="absolute left-6 sm:left-12 md:left-20 -translate-x-1/2 -top-0.5 flex flex-col items-center">
        {/* Top Dark Silvering Green Eyelet Ring */}
        <div className="w-2.5 h-1.5 rounded-t-full border border-[#9bbab0]/80 bg-gradient-to-b from-[#9bbab0] to-[#1a382e] shadow-xs" />
        {/* Dark Silvering Green Silk Cord / Rod with Silver Sheen */}
        <div className="relative w-[2.5px] h-3 bg-gradient-to-b from-[#16382e] via-[#a3c2b5] via-[#3b6959] to-[#16382e] shadow-[0_0_6px_rgba(155,186,176,0.45)]">
          <div className="absolute inset-y-0.5 left-0 w-[1px] bg-white/40" />
        </div>
        {/* Bottom Dark Silvering Green Eyelet Ring */}
        <div className="w-2.5 h-1.5 rounded-b-full border border-[#9bbab0]/80 bg-gradient-to-t from-[#9bbab0] to-[#1a382e] shadow-xs" />
      </div>

      {/* Right Cord Anchor */}
      <div className="absolute right-6 sm:right-12 md:right-20 translate-x-1/2 -top-0.5 flex flex-col items-center">
        {/* Top Dark Silvering Green Eyelet Ring */}
        <div className="w-2.5 h-1.5 rounded-t-full border border-[#9bbab0]/80 bg-gradient-to-b from-[#9bbab0] to-[#1a382e] shadow-xs" />
        {/* Dark Silvering Green Silk Cord / Rod with Silver Sheen */}
        <div className="relative w-[2.5px] h-3 bg-gradient-to-b from-[#16382e] via-[#a3c2b5] via-[#3b6959] to-[#16382e] shadow-[0_0_6px_rgba(155,186,176,0.45)]">
          <div className="absolute inset-y-0.5 left-0 w-[1px] bg-white/40" />
        </div>
        {/* Bottom Dark Silvering Green Eyelet Ring */}
        <div className="w-2.5 h-1.5 rounded-b-full border border-[#9bbab0]/80 bg-gradient-to-t from-[#9bbab0] to-[#1a382e] shadow-xs" />
      </div>
    </div>
  );
}

export default function GallerySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeClubIndex, setActiveClubIndex] = useState<number | null>(0);
  const [selectedPhoto, setSelectedPhoto] = useState<{
    photo: ClubPhoto;
    club: ClubItem;
    photoIndex: number;
  } | null>(null);

  // GSAP Entrance & Physics ScrollTrigger (/gsap-animation)
  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      // 1. Overhead Gantry Reveal
      gsap.fromTo(
        ".overhead-gantry",
        { y: -25, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // 2. Hanging Slit Blocks Dropping into Chain Tension Stagger
      gsap.fromTo(
        ".chain-card-wrapper",
        { y: -20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          stagger: 0.035,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Keyboard navigation for modal
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!selectedPhoto) return;

      if (e.key === "Escape") {
        setSelectedPhoto(null);
      } else if (e.key === "ArrowLeft") {
        const currentClub = selectedPhoto.club;
        const prevIdx =
          (selectedPhoto.photoIndex - 1 + currentClub.images.length) %
          currentClub.images.length;
        setSelectedPhoto({
          photo: currentClub.images[prevIdx],
          club: currentClub,
          photoIndex: prevIdx,
        });
      } else if (e.key === "ArrowRight") {
        const currentClub = selectedPhoto.club;
        const nextIdx = (selectedPhoto.photoIndex + 1) % currentClub.images.length;
        setSelectedPhoto({
          photo: currentClub.images[nextIdx],
          club: currentClub,
          photoIndex: nextIdx,
        });
      }
    },
    [selectedPhoto]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Refresh ScrollTrigger smoothly when an accordion slit opens or closes
  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 520);
    return () => clearTimeout(timer);
  }, [activeClubIndex]);

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="relative w-full py-16 sm:py-24 bg-[#0d0d0e] border-b border-white/10 overflow-hidden select-none"
    >
      {/* 100% Full-Width Edge-to-Edge Container */}
      <div className="w-full px-2 sm:px-4 md:px-6">
        {/* ====================================================================
            HEADER LOCKUP
            ==================================================================== */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-10 px-1 sm:px-2 text-center md:text-left">
          <div className="w-full md:w-auto">
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-[#EDE8FF] leading-none uppercase tracking-tight">
              GALLERY{" "}
              
            </h2>
           
          </div>
        </div>

        {/* ====================================================================
            OVERHEAD DARK SILVERING GREEN SUSPENSION RIG
            ==================================================================== */}
        <div className="overhead-gantry relative w-full mb-1 flex flex-col items-center pointer-events-none select-none">
          {/* Overhead Dark Silvering Green Suspension Rail / Rod */}
          <div className="relative w-full h-1.5 rounded-full bg-gradient-to-r from-transparent via-[#2a5245] to-transparent border-t border-[#9bbab0]/40 shadow-[0_0_10px_rgba(155,186,176,0.35)]" />
          <div className="relative w-full h-5">
            <div className="absolute left-6 sm:left-12 md:left-20 -translate-x-1/2 top-0 flex flex-col items-center">
              <div className="w-3.5 h-1.5 rounded-full bg-gradient-to-r from-[#2a5245] via-[#9bbab0] to-[#16382e] border border-[#cbdcd4]/50 shadow-sm" />
              <div className="w-[2.5px] h-4 bg-gradient-to-b from-[#16382e] via-[#a3c2b5] to-[#2a5245] shadow-[0_0_6px_rgba(155,186,176,0.4)]" />
            </div>
            <div className="absolute right-6 sm:right-12 md:right-20 translate-x-1/2 top-0 flex flex-col items-center">
              <div className="w-3.5 h-1.5 rounded-full bg-gradient-to-r from-[#2a5245] via-[#9bbab0] to-[#16382e] border border-[#cbdcd4]/50 shadow-sm" />
              <div className="w-[2.5px] h-4 bg-gradient-to-b from-[#16382e] via-[#a3c2b5] to-[#2a5245] shadow-[0_0_6px_rgba(155,186,176,0.4)]" />
            </div>
          </div>
        </div>

        {/* ====================================================================
            FULL-WIDTH VERTICAL STACK SLITS
            ==================================================================== */}
        <div className="w-full flex flex-col">
          {CLUBS_DATA.map((club, index) => {
            const isExpanded = activeClubIndex === index;
            const theme = CLUB_EXPANDED_THEMES[club.id] || DEFAULT_EXPANDED_THEME;

            return (
              <React.Fragment key={club.id}>
                {/* Inter-Block Silk Cord Connectors */}
                {index > 0 && <SilkCordSegment />}

                {/* Card Outer Container */}
                <div
                  className="chain-card-wrapper group relative w-full select-none transform-gpu origin-top transition-transform duration-300"
                  onMouseEnter={(e) => {
                    if (!isExpanded) {
                      gsap.to(e.currentTarget, {
                        rotation: index % 2 === 0 ? 0.35 : -0.35,
                        y: -2,
                        duration: 0.25,
                        yoyo: true,
                        repeat: 1,
                        ease: "power1.inOut",
                        transformOrigin: "center -20px",
                      });
                    }
                  }}
                >
                  {/* Top Eyelet Rings */}
                  <div className="absolute left-6 sm:left-12 md:left-20 -translate-x-1/2 -top-1 z-30 pointer-events-none w-2.5 h-1.5 rounded-t-full bg-gradient-to-b from-[#9bbab0] to-[#1a382e] border border-[#9bbab0]/80 shadow-xs" />
                  <div className="absolute right-6 sm:right-12 md:right-20 translate-x-1/2 -top-1 z-30 pointer-events-none w-2.5 h-1.5 rounded-t-full bg-gradient-to-b from-[#9bbab0] to-[#1a382e] border border-[#9bbab0]/80 shadow-xs" />

                  {/* The Slit & Accordion Card */}
                  <div
                    className={`relative w-full overflow-hidden rounded-xl sm:rounded-2xl border transition-[border-color,box-shadow,transform] duration-300 ${
                      isExpanded
                        ? "cursor-default"
                        : "cursor-pointer hover:border-[#714cb6]/60 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(0,0,0,0.6)]"
                    }`}
                    style={{
                      backgroundColor: theme.bg,
                      borderColor: isExpanded ? theme.border : "rgba(255, 255, 255, 0.12)",
                      boxShadow: isExpanded
                        ? `0 24px 60px rgba(0,0,0,0.85), 0 0 35px ${theme.glow}`
                        : "0 4px 14px rgba(0,0,0,0.35)",
                    }}
                  >
                {/* -------------------------------------------------------------
                    TOP SLIT BAR HEADER (Always visible as trigger & control)
                    ------------------------------------------------------------- */}
                <div
                  onClick={() => setActiveClubIndex(isExpanded ? null : index)}
                  className={`relative z-10 w-full h-12 sm:h-14 md:h-16 px-4 sm:px-6 flex items-center justify-between select-none cursor-pointer transition-colors duration-200 ${
                    isExpanded ? "border-b border-white/10" : ""
                  }`}
                >
                  {/* Atmospheric Backdrop Slice (Visible when collapsed) */}
                  {!isExpanded && (
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      <img
                        src={club.coverImage}
                        alt={club.name}
                        loading="lazy"
                        decoding="async"
                        className="size-full object-cover transition-transform duration-700 opacity-40 group-hover:opacity-60 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/45 to-black/90" />
                      <div
                        className="absolute inset-0 opacity-40 mix-blend-screen pointer-events-none"
                        style={{
                          background: `radial-gradient(ellipse at 50% 50%, ${club.accentColor} 0%, transparent 75%)`,
                        }}
                      />
                    </div>
                  )}

                  {/* Left: Category Only (Hidden on mobile to eliminate overlap with centered title) */}
                  <div className="hidden sm:flex relative z-10 items-center shrink-0">
                    <span className="font-tech text-[10px] sm:text-xs tracking-widest text-[#B9ACF0]/90 uppercase font-semibold">
                      {club.category}
                    </span>
                  </div>

                  {/* Center: Absolute 100% True-Centered Display Title (Proportional & responsive text sizing in Bebas Neue) */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-3 sm:px-16">
                    <p
                      className={`font-display font-slit-editorial text-[13px] sm:text-xl md:text-2xl lg:text-3xl text-[#FFF4E0] tracking-wider uppercase whitespace-nowrap drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] transition-all duration-300 ${
                        isExpanded ? "opacity-0 scale-95" : "opacity-100 scale-100"
                      }`}
                    >
                      {club.name}
                    </p>
                  </div>

                  {/* Right: Close Cross Button (When Expanded) - Archives badge removed */}
                  <div className="relative z-10 flex items-center justify-end shrink-0 min-w-[32px] sm:min-w-[40px]">
                    {isExpanded && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveClubIndex(null);
                        }}
                        className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer border border-white/20 shadow-md"
                        aria-label="Close slit"
                      >
                        <Icon.X className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* -------------------------------------------------------------
                    EXPANDED FULL-WIDTH POSTER (Opens downward, closes smoothly)
                    ------------------------------------------------------------- */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      key={`expanded-${club.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height: "auto",
                        opacity: 1,
                        transition: {
                          height: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                          opacity: { duration: 0.3, ease: "easeOut" },
                        },
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                        transition: {
                          height: { duration: 0.4, ease: [0.32, 0.72, 0, 1] },
                          opacity: { duration: 0.2, ease: "easeIn" },
                        },
                      }}
                      className="overflow-hidden"
                    >
                      <motion.div
                        initial={{ y: -30, opacity: 0 }}
                        animate={{
                          y: 0,
                          opacity: 1,
                          transition: {
                            y: { duration: 0.48, ease: [0.16, 1, 0.3, 1] },
                            opacity: { duration: 0.35, ease: "easeOut" },
                          },
                        }}
                        exit={{
                          y: -24,
                          opacity: 0,
                          transition: {
                            y: { duration: 0.25, ease: "easeIn" },
                            opacity: { duration: 0.2, ease: "easeIn" },
                          },
                        }}
                        className="relative z-10 w-full flex flex-col p-5 sm:p-8 md:p-10 overflow-hidden"
                        style={{
                          background: theme.gradient,
                        }}
                      >
                        {/* Ambient Backlight Glow matching club accent color */}
                        <div
                          aria-hidden="true"
                          className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[650px] h-[320px] rounded-full blur-[110px] opacity-40 transition-colors duration-500"
                          style={{
                            backgroundColor: theme.ambient,
                          }}
                        />

                        {/* Header Lockup (Centered Showcase Title) */}
                        <div className="w-full flex flex-col items-center justify-center text-center">
                          <p className="font-tech text-[10px] sm:text-xs md:text-sm font-bold tracking-widest uppercase text-[#B9ACF0] mb-1.5 sm:mb-2">
                            {club.category}
                          </p>

                          <h3
                            className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-tight leading-none uppercase drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]"
                            style={{ color: club.accentColor }}
                          >
                            {club.name}
                          </h3>
                        </div>

                        {/* Thin Divider Line Across Full Width */}
                        <div className="w-full border-t border-white/10 my-6 sm:my-8" />

                        {/* Bento-Style Gallery Grid (dynamically sized to image count with no orphan gaps) */}
                        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
                          {club.images.map((photo, photoIdx) => {
                            const total = club.images.length;
                            let bentoSpan = "col-span-1";
                            if (total === 4) {
                              // Balanced alternating 2+1 and 1+2 bento grid
                              if (photoIdx === 0 || photoIdx === 3) {
                                bentoSpan = "col-span-1 md:col-span-2";
                              }
                            } else if (total === 5) {
                              // 2+1 on row 1, 1+1+1 on row 2
                              if (photoIdx === 0) {
                                bentoSpan = "col-span-1 md:col-span-2";
                              }
                            }

                            return (
                              <div
                                key={photo.id}
                                onClick={() =>
                                  setSelectedPhoto({
                                    photo,
                                    club,
                                    photoIndex: photoIdx,
                                  })
                                }
                                className={`group/bento relative overflow-hidden rounded-2xl border border-white/10 bg-[#0c0b14] cursor-pointer shadow-[0_8px_30px_rgba(0,0,0,0.6)] focus:outline-none transition-all duration-300 hover:border-white/30 hover:scale-[1.015] active:scale-[0.985] will-change-transform ${bentoSpan} h-[240px] sm:h-[300px] md:h-[360px]`}
                              >
                                <img
                                  src={photo.src}
                                  alt={photo.title || "Gallery photo"}
                                  loading="lazy"
                                  className="size-full object-cover transition-transform duration-700 ease-out group-hover/bento:scale-105 will-change-transform"
                                />

                                {/* Top Bar: Micro Badge (# 01) and Maximize Indicator */}
                                <div className="absolute inset-x-0 top-0 p-3.5 flex items-center justify-between pointer-events-none z-10">
                                  <span className="font-tech text-[10px] sm:text-xs font-bold tracking-wider uppercase bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15 text-white/90 shadow-sm">
                                    {photo.code || `# 0${photoIdx + 1}`}
                                  </span>
                                  <div className="w-7 h-7 rounded-full bg-black/50 backdrop-blur-md border border-white/15 flex items-center justify-center text-white/80 opacity-80 group-hover/bento:opacity-100 group-hover/bento:text-[#FFAA24] group-hover/bento:scale-110 transition-all duration-300 shadow-sm">
                                    <Icon.Maximize2 className="w-3.5 h-3.5" />
                                  </div>
                                </div>

                                {/* Subtle ambient hover highlight ring */}
                                <div
                                  className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover/bento:opacity-100 transition-opacity duration-300"
                                  style={{
                                    boxShadow: `inset 0 0 0 1.5px ${club.accentColor}80`,
                                  }}
                                />
                              </div>
                            );
                          })}
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Bottom Eyelet Rings (only between cards, not on the last card) */}
              {index < CLUBS_DATA.length - 1 && (
                <>
                  <div className="absolute left-6 sm:left-12 md:left-20 -translate-x-1/2 -bottom-1 z-30 pointer-events-none w-2.5 h-1.5 rounded-b-full bg-gradient-to-t from-[#9bbab0] to-[#1a382e] border border-[#9bbab0]/80 shadow-xs" />
                  <div className="absolute right-6 sm:right-12 md:right-20 translate-x-1/2 -bottom-1 z-30 pointer-events-none w-2.5 h-1.5 rounded-b-full bg-gradient-to-t from-[#9bbab0] to-[#1a382e] border border-[#9bbab0]/80 shadow-xs" />
                </>
              )}
            </div>
          </React.Fragment>
        );
      })}
    </div>
  </div>

      {/* ====================================================================
          HD LIGHTBOX MODAL WITH FULL PHOTOGRAPH INSPECTOR
          ==================================================================== */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl rounded-2xl sm:rounded-3xl overflow-hidden bg-[#0A0914] border-0 border-none shadow-[0_24px_80px_rgba(0,0,0,0.95)] flex flex-col"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 bg-[#05040A]">
                <span className="font-mono text-xs text-white/70 bg-black/60 px-2.5 py-1 rounded-md">
                  IMAGE {selectedPhoto.photoIndex + 1} OF{" "}
                  {selectedPhoto.club.images.length}
                </span>

                <button
                  type="button"
                  onClick={() => setSelectedPhoto(null)}
                  aria-label="Close modal"
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 hover:bg-white/20 text-[#EDE8FF] flex items-center justify-center transition-colors cursor-pointer"
                >
                  <Icon.X className="w-4 h-4" />
                </button>
              </div>

              {/* Main Photo Canvas */}
              <div className="relative aspect-[16/10] sm:aspect-video w-full bg-[#050508] flex items-center justify-center overflow-hidden">
                <img
                  src={selectedPhoto.photo.src}
                  alt={selectedPhoto.photo.title || "Gallery photograph"}
                  className="w-full h-full object-contain select-none"
                />

                {/* Left Navigation Arrow */}
                <button
                  type="button"
                  onClick={() => {
                    const currentClub = selectedPhoto.club;
                    const prevIdx =
                      (selectedPhoto.photoIndex - 1 + currentClub.images.length) %
                      currentClub.images.length;
                    setSelectedPhoto({
                      photo: currentClub.images[prevIdx],
                      club: currentClub,
                      photoIndex: prevIdx,
                    });
                  }}
                  aria-label="Previous photograph"
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/75 hover:bg-[#FFAA24] text-white hover:text-black flex items-center justify-center transition-all cursor-pointer shadow-xl backdrop-blur-sm"
                >
                  <Icon.ChevronLeft className="w-5 h-5" />
                </button>

                {/* Right Navigation Arrow */}
                <button
                  type="button"
                  onClick={() => {
                    const currentClub = selectedPhoto.club;
                    const nextIdx =
                      (selectedPhoto.photoIndex + 1) % currentClub.images.length;
                    setSelectedPhoto({
                      photo: currentClub.images[nextIdx],
                      club: currentClub,
                      photoIndex: nextIdx,
                    });
                  }}
                  aria-label="Next photograph"
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/75 hover:bg-[#FFAA24] text-white hover:text-black flex items-center justify-center transition-all cursor-pointer shadow-xl backdrop-blur-sm"
                >
                  <Icon.ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Footer Controls */}
              <div className="p-3 sm:p-4 bg-[#06050C] flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const currentClub = selectedPhoto.club;
                    const prevIdx =
                      (selectedPhoto.photoIndex - 1 + currentClub.images.length) %
                      currentClub.images.length;
                    setSelectedPhoto({
                      photo: currentClub.images[prevIdx],
                      club: currentClub,
                      photoIndex: prevIdx,
                    });
                  }}
                  className="px-3 py-1.5 rounded-lg bg-[#141220] hover:bg-[#FFAA24] hover:text-black text-white font-mono text-xs transition-colors cursor-pointer"
                >
                  ← PREV
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const currentClub = selectedPhoto.club;
                    const nextIdx =
                      (selectedPhoto.photoIndex + 1) % currentClub.images.length;
                    setSelectedPhoto({
                      photo: currentClub.images[nextIdx],
                      club: currentClub,
                      photoIndex: nextIdx,
                    });
                  }}
                  className="px-3 py-1.5 rounded-lg bg-[#141220] hover:bg-[#FFAA24] hover:text-black text-white font-mono text-xs transition-colors cursor-pointer"
                >
                  NEXT →
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
