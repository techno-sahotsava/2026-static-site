"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight, Mail } from "lucide-react";
import { lenisScrollTo, getLenis } from "@/components/providers/SmoothScrollProvider";

/* ==========================================================================
   SELF-CONTAINED CRISP SOCIAL ICONS
   ========================================================================== */
const SocialIcon = {
  Instagram: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  ),
};

/* ==========================================================================
   SMOOTH SCROLL CONFIGURATION
   >>> THIS SECTION CONTROLS THE SPEED OF SMOOTH SCROLL! <<<
   - duration: Time in seconds to complete the smooth scroll
     (e.g., 0.85 = snappy & responsive, 1.4 = slower cinematic glide)
   - ease: GSAP easing curve for deceleration
   - offset: Pixel clearance offset from the top
   ========================================================================== */
export const SMOOTH_SCROLL_CONFIG = {
  duration: 1.1, // Smooth, cinematic camera glide when clicking navbar links
  ease: "power2.out", // Snappy, responsive deceleration curve
  offset: -70, // Top navigation bar clearance
};

/**
 * Smoothly scrolls the window to a given anchor or element using GSAP & Lenis
 * Speed is governed by SMOOTH_SCROLL_CONFIG.duration
 */
export function gsapScrollTo(
  target: string | HTMLElement | number,
  duration = SMOOTH_SCROLL_CONFIG.duration,
  offset = SMOOTH_SCROLL_CONFIG.offset
) {
  if (typeof window === "undefined") return;

  lenisScrollTo(target, { duration, offset });
}

export default function Navbar() {
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    let currentProgress = 0;
    let targetProgress = 0;
    let rafId: number;

    const updateScrollMetrics = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      targetProgress = docHeight > 0 ? Math.min(Math.max(scrollY / docHeight, 0), 1) : 0;

      const scrolled = scrollY > 24;
      setHasScrolled((prev) => (prev !== scrolled ? scrolled : prev));
    };

    // Continuous 120 FPS hardware-accelerated ticker
    // Updates continuously on every single scroll tick without waiting for sections!
    const tick = () => {
      // Fluid physical interpolation for real-time tracking
      currentProgress += (targetProgress - currentProgress) * 0.4;

      if (Math.abs(targetProgress - currentProgress) < 0.0001) {
        currentProgress = targetProgress;
      }

      if (progressBarRef.current) {
        // Hardware accelerated GPU scaleX transform: zero layout reflows, instant response
        progressBarRef.current.style.transform = `scaleX(${currentProgress})`;
      }

      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", updateScrollMetrics, { passive: true });
    window.addEventListener("resize", updateScrollMetrics, { passive: true });

    // Initial sync
    updateScrollMetrics();
    currentProgress = targetProgress;
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("scroll", updateScrollMetrics);
      window.removeEventListener("resize", updateScrollMetrics);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const navLinks = [
    { label: "SANSKARAN", target: "#about" },
    { label: "SAHOTSAVA", target: "#sahotsava" },
    { label: "GALLERY", target: "#gallery" },
    { label: "CORE", target: "#core-members" },
    { label: "SPONSORS", target: "#sponsors" },
    { label: "FOUNDERS", target: "#founders" },
    { label: "PATRONS", target: "#dignitaries" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();
    const offset = target === "#hero" || target === "#about" ? 0 : SMOOTH_SCROLL_CONFIG.offset;
    gsapScrollTo(target, SMOOTH_SCROLL_CONFIG.duration, offset);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${hasScrolled
          ? "opacity-100 translate-y-0 bg-[#0d0d0e]/95 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.6)] pointer-events-auto"
          : "opacity-0 -translate-y-3 pointer-events-none"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 sm:h-20 flex items-center justify-between gap-3">
          {/* Brand Logo & Title */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, "#hero")}
            className="flex items-center gap-2.5 sm:gap-3 group cursor-pointer shrink min-w-0"
          >
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center overflow-visible shrink-0 group-hover:scale-105 transition-transform duration-200">
              <Image
                src="/sanskaran-logo.png"
                alt="Sanskaran"
                fill
                sizes="64px"
                className="object-contain"
              />
            </div>
            <div className="flex flex-col items-start min-w-0">
              <span className="font-display text-xl sm:text-2xl md:text-3xl tracking-wider text-[#ffffff] group-hover:text-[#d4c7ff] transition-colors uppercase leading-none truncate">
                SANSKARAN
              </span>
              <span className="font-tech text-[10px] sm:text-[11px] font-bold tracking-[0.2em] text-[#ffffff] uppercase leading-none mt-1">
                2026
              </span>
            </div>
          </a>

          {/* Center Navigation Links with GSAP Smooth Scrolling */}
          <nav className="hidden md:flex items-center gap-8 font-tech text-xs font-semibold tracking-[0.2em] text-white/80 uppercase">
            {navLinks.map((link) => (
              <a
                key={link.target}
                href={link.target}
                onClick={(e) => handleNavClick(e, link.target)}
                className="hover:text-[#d4c7ff] transition-colors relative py-1 group/link cursor-pointer"
              >
                <span>{link.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#d4c7ff] group-hover/link:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          {/* Right CTA Button, Live Scroll Progress Metric & Mobile Menu Trigger */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Mobile Hamburger Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open mobile navigation menu"
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-xl bg-[#18181b] hover:bg-[#714cb6] border border-white/15 text-white transition-all cursor-pointer shadow-md active:scale-95"
            >
              <Menu className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        {/* Real-Time Glowing GPU-Accelerated Scroll Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-white/10 overflow-hidden pointer-events-none">
          <div
            ref={progressBarRef}
            style={{ transform: "scaleX(0)", transformOrigin: "left" }}
            className="h-full w-full bg-gradient-to-r from-[#421d24] via-[#714cb6] to-[#d4c7ff] shadow-[0_0_10px_rgba(113,76,182,0.6)] will-change-transform relative"
          >
            {/* Leading Photon Dot */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#ffffff] shadow-[0_0_8px_#714cb6]" />
          </div>
        </div>

      </header>

      {/* ====================================================================
        MOBILE SIDEBAR / CARD NAVIGATION (Reference-faithful to EDH layout)
        Mounted via React Portal directly into document.body to avoid header
        CSS transform / clipping issues
        ==================================================================== */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {mobileMenuOpen && (
              <div className="fixed inset-0 z-[99999] md:hidden flex flex-col items-center justify-center p-4 sm:p-6 overflow-y-auto">
                {/* Dark Frosted Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.22 }}
                  onClick={() => setMobileMenuOpen(false)}
                  className="fixed inset-0 bg-black/10 backdrop-blur-xl"
                />

                {/* Mobile Nav Frame & Floating Card */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.93, y: 16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.93, y: 16 }}
                  transition={{ type: "spring", damping: 25, stiffness: 280 }}
                  className="relative z-10 w-full max-w-[360px] flex flex-col my-auto max-h-[92vh]"
                >
                  {/* Top Bar: Brand Badge & Close Button */}
                  <div className="w-full flex items-center justify-between mb-3 px-1">
                    {/* Brand Badge */}
                    <div className="h-12 flex items-center">
                      <Image
                        src="/sanskaran-logo.png"
                        alt="Sanskaran"
                        width={768}
                        height={768}
                        className="h-full w-auto object-contain"
                      />
                    </div>

                    {/* Close Button */}
                    <button
                      type="button"
                      onClick={() => setMobileMenuOpen(false)}
                      aria-label="Close navigation menu"
                      className="w-10 h-10 rounded-xl bg-[#141724] hover:bg-[#714cb6] border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer shadow-lg active:scale-95"
                    >
                      <X className="w-5 h-5 text-white" />
                    </button>
                  </div>

                  {/* The White Floating Card */}
                  <div className="w-full bg-[#ffffff] rounded-[28px] sm:rounded-[32px] p-5 sm:p-6 shadow-[0_24px_60px_rgba(0,0,0,0.7)] border border-white/30 flex flex-col overflow-y-auto">
                    {/* Numbered Navigation Items */}
                    <div className="flex flex-col space-y-1">
                      {navLinks.map((link, idx) => {
                        const num = String(idx + 1).padStart(2, "0");
                        return (
                          <a
                            key={link.target}
                            href={link.target}
                            onClick={(e) => {
                              handleNavClick(e, link.target);
                              setMobileMenuOpen(false);
                            }}
                            className="flex items-center justify-between py-2.5 px-3 rounded-2xl hover:bg-slate-100 active:bg-slate-200 transition-all duration-200 group cursor-pointer"
                          >
                            <div className="flex items-center gap-3.5">
                              <span className="font-mono text-xs font-bold text-[#64748b] group-hover:text-[#714cb6] transition-colors">
                                {num}
                              </span>
                              <span className="font-display text-2xl tracking-wide text-[#0f172a] group-hover:text-[#714cb6] transition-colors">
                                {link.label}
                              </span>
                            </div>

                            {/* Right Pill Arrow Button */}
                            <div className="w-8 h-8 rounded-full bg-[#141724] group-hover:bg-[#714cb6] text-white flex items-center justify-center transition-all duration-200 group-hover:translate-x-0.5 shadow-sm shrink-0">
                              <ChevronRight className="w-4 h-4 text-white" />
                            </div>
                          </a>
                        );
                      })}
                    </div>

                    {/* Divider Line */}
                    <div className="w-full h-px bg-slate-200 my-4" />

                    {/* Social Icon Buttons */}
                    <div className="flex items-center gap-3 mb-4">
                      <a
                        href="https://www.instagram.com/technosahotsava/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-xl bg-[#141724] hover:bg-[#714cb6] text-white flex items-center justify-center transition-all shadow-sm active:scale-95"
                        aria-label="Instagram"
                      >
                        <SocialIcon.Instagram className="w-4 h-4 text-white" />
                      </a>
                      <a
                        href="mailto:technosahotsava@gmail.com"
                        className="w-10 h-10 rounded-xl bg-[#141724] hover:bg-[#714cb6] text-white flex items-center justify-center transition-all shadow-sm active:scale-95"
                        aria-label="Email Us"
                      >
                        <Mail className="w-4 h-4 text-white" />
                      </a>
                    </div>

                    {/* Contact Email & Copyright */}
                    <div className="flex flex-col text-left">
                      <a
                        href="mailto:technosahotsava@gmail.com"
                        className="font-tech text-xs font-bold text-[#0f172a] hover:text-[#714cb6] transition-colors"
                      >
                        technosahotsava@gmail.com
                      </a>
                      <p className="font-tech text-[10px] text-slate-500 mt-0.5">
                        © 2026 Sanskaran &amp; Sahotsava. All rights reserved.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
