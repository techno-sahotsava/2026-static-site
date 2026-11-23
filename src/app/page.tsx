"use client";

import React from "react";
import Navbar, { gsapScrollTo, SMOOTH_SCROLL_CONFIG } from "@/components/event/Navbar";
import ParallaxBackground from "@/components/event/ParallaxBackground";
import ShowcaseHeroSection from "@/components/event/ShowcaseHeroSection";
import AboutFestivalSection from "@/components/event/AboutFestivalSection";
import GallerySection from "@/components/event/GallerySection";
import CoreMembersSection from "@/components/event/CoreMembersSection";
import SponsorsSection from "@/components/event/SponsorsSection";
import DignitariesSection from "@/components/event/DignitariesSection";
import FoundersSection from "@/components/event/FoundersSection";
import Footer from "@/components/event/Footer";

export default function Home() {
  const handleExploreFestival = () => {
    gsapScrollTo("#about", SMOOTH_SCROLL_CONFIG.duration, 0);
  };

  return (
    <main className="relative min-h-screen bg-[#000000] text-[#292827] selection:bg-[#d4c7ff] selection:text-[#421d24] overflow-x-hidden">
      {/* 1. Top Navbar with Real-Time Glowing Scroll Progress Bar (Reveals smoothly on scroll) */}
      <Navbar />

      {/* 2. Global Multi-Layer Parallax Background */}
      <ParallaxBackground />

      {/* 3. Hero Section (Locked Stage Video & Hollow Outline Typography) */}
      <div id="hero" className="sticky top-0 z-0 h-screen h-[100dvh] w-full overflow-hidden select-none">
        <ShowcaseHeroSection onExplore={handleExploreFestival} />
      </div>

      {/* 4. Interactive Festival Experience Sections (Carbon Obsidian Canvas #0d0d0e) */}
      <div id="festival-content" className="relative z-20 w-full bg-[#0d0d0e]">
        <AboutFestivalSection />
        <GallerySection />
        <CoreMembersSection />
        <SponsorsSection />
        <DignitariesSection />
        <FoundersSection />
        <Footer />
      </div>
    </main>
  );
}
