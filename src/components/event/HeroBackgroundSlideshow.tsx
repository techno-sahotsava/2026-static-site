"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { HERO_SLIDES, MOBILE_HERO_SLIDES } from "@/lib/heroSlideshowData";

/* ==========================================================================
   SLIDESHOW TIMING & ANIMATION CONFIGURATION
   ========================================================================== */
export const SLIDESHOW_CONFIG = {
  // ⏱️ CONSTANT TIMER FOR ALL IMAGES ON SCREEN (in milliseconds)
  SLIDE_DURATION_MS: 3500, // 👈 Cinematic 3.5s pacing (prevents rapid-fire network requests)
  TRANSITION_DURATION_S: 1.0, // 👈 Luxurious cross-fade duration

  // 🌓 GRADUAL OPACITY (Current decreases, Next: 30% -> 100%)
  INCOMING_INITIAL_OPACITY: 0.3,
  INCOMING_TARGET_OPACITY: 1.0,

  // 🔍 PURE ZOOM-IN ONLY (Zero shifting, never zooms out)
  ZOOM_BASE_SCALE: 1.0,
  ZOOM_MAX_SCALE: 1.10,
};

export default function HeroBackgroundSlideshow({ isVisible = true }: { isVisible?: boolean }) {
  const [isMobile, setIsMobile] = useState(false);
  const slides = isMobile ? MOBILE_HERO_SLIDES : HERO_SLIDES;
  const containerRef = useRef<HTMLDivElement>(null);
  const layerARef = useRef<HTMLDivElement>(null);
  const layerBRef = useRef<HTMLDivElement>(null);
  const bgImgARef = useRef<HTMLImageElement>(null);
  const bgImgBRef = useRef<HTMLImageElement>(null);
  const imgARef = useRef<HTMLImageElement>(null);
  const imgBRef = useRef<HTMLImageElement>(null);
  const burnOverlayRef = useRef<HTMLDivElement>(null);

  // Strictly ref-based state machine (prevents React re-renders from restarting timers/tweens)
  const activeLayerRef = useRef<0 | 1>(0); // 0 = Layer A is active, 1 = Layer B is active
  const slideIdxRef = useRef<number>(0);
  const isTransitioningRef = useRef<boolean>(false);
  const isPausedRef = useRef<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Pause slideshow when scrolled out of view to avoid network requests while browsing downstream sections
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isPausedRef.current = !entry.isIntersecting;
        if (!entry.isIntersecting && timerRef.current) {
          clearTimeout(timerRef.current);
          timerRef.current = null;
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const updateViewport = () => setIsMobile(mediaQuery.matches);

    updateViewport();
    mediaQuery.addEventListener("change", updateViewport);

    return () => mediaQuery.removeEventListener("change", updateViewport);
  }, []);

  useEffect(() => {
    if (!isVisible || !slides.length) return;

    const layerA = layerARef.current;
    const layerB = layerBRef.current;
    const bgImgA = bgImgARef.current;
    const bgImgB = bgImgBRef.current;
    const imgA = imgARef.current;
    const imgB = imgBRef.current;
    const burnOverlay = burnOverlayRef.current;

    if (!layerA || !layerB || !bgImgA || !bgImgB || !imgA || !imgB) return;

    // Preload helper
    const preload = (idx: number) => {
      const target = (idx + slides.length) % slides.length;
      const pre = new Image();
      pre.src = slides[target].url;
    };

    // Calculate total animation duration for constant forward zoom
    const totalZoomDuration =
      SLIDESHOW_CONFIG.SLIDE_DURATION_MS / 1000 + SLIDESHOW_CONFIG.TRANSITION_DURATION_S;

    // Helper: start continuous forward zoom on an image (NEVER ZOOMS OUT)
    const startForwardZoom = (img: HTMLImageElement) => {
      gsap.killTweensOf(img);
      gsap.fromTo(
        img,
        { scale: SLIDESHOW_CONFIG.ZOOM_BASE_SCALE, x: 0, y: 0, transformOrigin: "center center" },
        {
          scale: SLIDESHOW_CONFIG.ZOOM_MAX_SCALE,
          x: 0,
          y: 0,
          duration: totalZoomDuration,
          ease: "linear",
        }
      );
    };

    // Initial setup: Layer A active with slide 0, Layer B hidden with slide 1
    activeLayerRef.current = 0;
    slideIdxRef.current = 0;
    isTransitioningRef.current = false;

    bgImgA.src = slides[0].url;
    bgImgB.src = slides[1 % slides.length].url;
    imgA.src = slides[0].url;
    imgB.src = slides[1 % slides.length].url;

    gsap.set(layerA, { autoAlpha: 1, zIndex: 1 });
    gsap.set(layerB, { autoAlpha: 0, zIndex: 0 });
    if (burnOverlay) gsap.set(burnOverlay, { autoAlpha: 0 });

    startForwardZoom(bgImgA);
    preload(1);
    preload(2);

    // Step Transition: swaps between Layer A and Layer B without DOM rebuilds
    const stepTransition = () => {
      if (isTransitioningRef.current || isPausedRef.current) return;
      isTransitioningRef.current = true;

      const isAActive = activeLayerRef.current === 0;
      const outgoingLayer = isAActive ? layerA : layerB;
      const incomingLayer = isAActive ? layerB : layerA;
      const outgoingBgImg = isAActive ? bgImgA : bgImgB;
      const incomingBgImg = isAActive ? bgImgB : bgImgA;
      const incomingImg = isAActive ? imgB : imgA;

      const nextSlideIdx = (slideIdxRef.current + 1) % slides.length;
      incomingBgImg.src = slides[nextSlideIdx].url;
      incomingImg.src = slides[nextSlideIdx].url;
      preload((nextSlideIdx + 1) % slides.length);

      // Layer stacking: incoming is on top so outgoing is visible underneath during fade
      incomingLayer.style.zIndex = "2";
      outgoingLayer.style.zIndex = "1";

      // Zoom the blurred backdrop while keeping the foreground image uncropped.
      startForwardZoom(incomingBgImg);

      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const onTransitionComplete = () => {
        // Toggle active layer pointer
        activeLayerRef.current = isAActive ? 1 : 0;
        slideIdxRef.current = nextSlideIdx;
        isTransitioningRef.current = false;

        // Reset outgoing layer
        gsap.set(outgoingLayer, { autoAlpha: 0, zIndex: 0 });
        gsap.killTweensOf(outgoingBgImg);

        // Schedule next image after the constant slide duration (if in view)
        if (!isPausedRef.current) {
          timerRef.current = setTimeout(stepTransition, SLIDESHOW_CONFIG.SLIDE_DURATION_MS);
        }
      };

      if (prefersReducedMotion) {
        gsap.to(outgoingLayer, { autoAlpha: 0, duration: 0.8, ease: "power1.inOut" });
        gsap.fromTo(
          incomingLayer,
          { autoAlpha: SLIDESHOW_CONFIG.INCOMING_INITIAL_OPACITY },
          {
            autoAlpha: SLIDESHOW_CONFIG.INCOMING_TARGET_OPACITY,
            duration: 0.8,
            ease: "power1.inOut",
            onComplete: onTransitionComplete,
          }
        );
        return;
      }

      // Synchronized Cross-Dissolve: Outgoing fades down, incoming rises 30% -> 100%
      const tl = gsap.timeline({ onComplete: onTransitionComplete });

      // Outgoing layer fades down smoothly
      tl.to(
        outgoingLayer,
        {
          autoAlpha: 0,
          duration: SLIDESHOW_CONFIG.TRANSITION_DURATION_S,
          ease: "power2.inOut",
        },
        0
      );

      // Incoming layer rises from 30% to 100% (No blackout: incoming is already at 30% when outgoing fades)
      tl.fromTo(
        incomingLayer,
        { autoAlpha: SLIDESHOW_CONFIG.INCOMING_INITIAL_OPACITY },
        {
          autoAlpha: SLIDESHOW_CONFIG.INCOMING_TARGET_OPACITY,
          duration: SLIDESHOW_CONFIG.TRANSITION_DURATION_S,
          ease: "power2.out",
        },
        0
      );
    };

    // Schedule first transition
    timerRef.current = setTimeout(stepTransition, SLIDESHOW_CONFIG.SLIDE_DURATION_MS);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      gsap.killTweensOf(layerA);
      gsap.killTweensOf(layerB);
      gsap.killTweensOf(bgImgA);
      gsap.killTweensOf(bgImgB);
      if (burnOverlay) gsap.killTweensOf(burnOverlay);
    };
  }, [isVisible, slides]);

  if (!slides.length) return null;

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none bg-black"
      aria-hidden="true"
    >
      <div className="absolute inset-0 w-full h-full">
        {/* LAYER A: First Buffer */}
        <div
          ref={layerARef}
          className="absolute inset-0 w-full h-full will-change-transform will-change-opacity overflow-hidden"
        >
          <img
            ref={bgImgARef}
            src={slides[0]?.url || ""}
            alt=""
            aria-hidden="true"
            loading="eager"
            decoding="async"
            className="hidden absolute -inset-8 h-[calc(100%+4rem)] w-[calc(100%+4rem)] object-cover blur-2xl opacity-80 brightness-50 saturate-110 will-change-transform md:block md:opacity-70 md:brightness-50 md:saturate-125"
          />
          <img
            ref={imgARef}
            src={slides[0]?.url || ""}
            alt=""
            loading="eager"
            decoding="async"
            className="relative z-10 w-full h-full object-cover object-center md:object-contain"
          />
        </div>

        {/* LAYER B: Second Buffer */}
        <div
          ref={layerBRef}
          className="absolute inset-0 w-full h-full will-change-transform will-change-opacity overflow-hidden"
        >
          <img
            ref={bgImgBRef}
            src={slides[1]?.url || ""}
            alt=""
            aria-hidden="true"
            loading="eager"
            decoding="async"
            className="hidden absolute -inset-8 h-[calc(100%+4rem)] w-[calc(100%+4rem)] object-cover blur-2xl opacity-80 brightness-50 saturate-110 will-change-transform md:block md:opacity-70 md:brightness-50 md:saturate-125"
          />
          <img
            ref={imgBRef}
            src={slides[1]?.url || ""}
            alt=""
            loading="eager"
            decoding="async"
            className="relative z-10 w-full h-full object-cover object-center md:object-contain"
          />
        </div>
      </div>

      {/* FILM BURN / LIGHT LEAK OVERLAY */}
      <div
        ref={burnOverlayRef}
        className="absolute inset-0 z-10 pointer-events-none opacity-0 mix-blend-screen"
        style={{
          background:
            "radial-gradient(circle at 75% 30%, rgba(255, 185, 80, 0.95) 0%, rgba(255, 90, 20, 0.7) 35%, rgba(180, 20, 40, 0.4) 60%, transparent 80%), radial-gradient(circle at 20% 80%, rgba(255, 220, 140, 0.8) 0%, rgba(255, 120, 40, 0.5) 40%, transparent 75%)",
        }}
      />

      {/* SEAMLESS CINEMATIC DARK GRADIENT VIGNETTE LAYER */}
      <div
        className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-black/60 via-black/20 to-black/75 md:from-black/70 md:via-black/20 md:to-black/85"
      />
    </div>
  );
}
