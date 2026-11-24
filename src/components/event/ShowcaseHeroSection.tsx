"use client";

import React, { useState, useEffect, useRef } from "react";
import { gsapScrollTo, SMOOTH_SCROLL_CONFIG } from "@/components/event/Navbar";
import HeroBackgroundSlideshow from "@/components/event/HeroBackgroundSlideshow";

export interface ShowcaseItem {
  id: string;
  src: string;
  left: number;
  top: number;
  width: number;
  height: number;
  dx: number; // scatter translation in vw
  dy: number; // scatter translation in vh
  rot: number; // scatter rotation in degrees
  title: string;
  objectPosition?: string; // CSS object-position (e.g. "center top", "center center")
}

type ShowcaseTileStyle = React.CSSProperties & {
  [key: `--tile-${string}`]: string;
};

// Nine-image photo mosaic with scatter vectors for the intro animation
export const DEVFEST_SHOWCASE_ITEMS: ShowcaseItem[] = [
  {
    id: "showcase-1",
    src: "/hero_section/RM060037.webp",
    left: 3.5,
    top: 39,
    width: 22,
    height: 39,
    dx: -18,
    dy: -18,
    rot: -12,
    title: "Stage Illumination",
    objectPosition: "center top",
  },
  {
    id: "showcase-2",
    src: "/hero_section/RM060055.webp",
    left: 25.4,
    top: 26.8,
    width: 17.8,
    height: 31,
    dx: -25,
    dy: -20,
    rot: -8,
    title: "Guitarist in Blue Light",
    objectPosition: "center center",
  },
  {
    id: "showcase-3",
    src: "/hero_section/RM060045.webp",
    left: 25.4,
    top: 57.7,
    width: 17.8,
    height: 31.2,
    dx: -24,
    dy: 4,
    rot: -8,
    title: "Vocal Duet",
    objectPosition: "center top",
  },
  {
    id: "showcase-4",
    src: "/hero_section/RM0600144.webp",
    left: 43.1,
    top: 9.2,
    width: 15.6,
    height: 29.6,
    dx: 18,
    dy: -18,
    rot: 14,
    title: "Stage Harmony",
    objectPosition: "center top",
  },
  {
    id: "showcase-5",
    src: "/hero_section/RM060041.webp",
    left: 43.1,
    top: 38.7,
    width: 15.6,
    height: 28.2,
    dx: 4,
    dy: -28,
    rot: -6,
    title: "Dance Performance",
    objectPosition: "center center",
  },
  {
    id: "showcase-6",
    src: "/hero_section/RM060061.webp",
    left: 43.1,
    top: 66.9,
    width: 15.6,
    height: 33,
    dx: -16,
    dy: 22,
    rot: 10,
    title: "Concert Auditorium Spectacle",
    objectPosition: "center center",
  },
  {
    id: "showcase-7",
    src: "/hero_section/RM0600141.webp",
    left: 58.8,
    top: 26.8,
    width: 16.5,
    height: 31,
    dx: 10,
    dy: -26,
    rot: -6,
    title: "Centerstage Voice",
    objectPosition: "center top",
  },
  {
    id: "showcase-8",
    src: "/hero_section/RM0600148.webp",
    left: 58.8,
    top: 57.7,
    width: 16.5,
    height: 31.2,
    dx: 22,
    dy: 24,
    rot: 12,
    title: "Festival Momentum",
    objectPosition: "center top",
  },
  {
    id: "showcase-9",
    src: "/hero_section/RM0600184.webp",
    left: 75.4,
    top: 42.4,
    width: 21.4,
    height: 35,
    dx: 28,
    dy: 14,
    rot: -14,
    title: "Grand Concert Spectacle",
    objectPosition: "center center",
  },
];

interface ShowcaseHeroSectionProps {
  onExplore?: () => void;
  speedMode?: "1s" | "2s";
}

/* ==========================================================================
   >>> EXACT POINT OF CODE CONTROLLING VIDEO ZOOM & SCALE <<<
   Increase to zoom in further (e.g., 1.15 = 15% zoom, 1.25 = 25% zoom, 1.35 = 35% zoom)
   ========================================================================== */
export const VIDEO_ZOOM_SCALE = 1.33;

interface OutlineTextProps {
  text: string;
  maskId: string;
  className?: string;
  style?: React.CSSProperties;
  color?: string;
  fontMode?: "syne" | "anton" | "bebas" | "googlesans" | "londrina" | "bungee";
}

/**
 * Authentic Hollow Outline Text Renderer.
 * DevFest Kolkata uses an inverted SVG mask:
 * - White mask rect passes outer stroke through
 * - Black mask text completely removes inside body fill
 * - Rounded line joins give it smooth contours with zero letter-clipping or interior artifacts
 */
export function OutlineText({
  text,
  maskId,
  className = "",
  style,
  color = "#ffffff",
  fontMode = "bebas",
}: OutlineTextProps) {
  if (fontMode === "londrina") {
    return (
      <div
        className={`font-londrina-outline select-none whitespace-nowrap text-center ${className}`}
        style={{
          color,
          lineHeight: 1,
          ...style,
        }}
      >
        {text}
      </div>
    );
  }

  if (fontMode === "bungee") {
    return (
      <div
        className={`font-bungee-outline select-none whitespace-nowrap text-center ${className}`}
        style={{
          color,
          lineHeight: 1,
          ...style,
        }}
      >
        {text}
      </div>
    );
  }

  const fontFamily =
    fontMode === "bebas"
      ? "var(--font-bebas-neue), Impact, sans-serif"
      : fontMode === "anton"
      ? "var(--font-anton), Impact, sans-serif"
      : fontMode === "googlesans"
      ? '"Google Sans", system-ui, sans-serif'
      : "var(--font-syne), sans-serif";

  // Authentic DevFest Inverted SVG Mask (100% hollow with round outer stroke & zero interior artifacts)
  return (
    <div
      className={`relative select-none d4-outline whitespace-nowrap text-center inline-block ${className}`}
      style={{
        color,
        lineHeight: 1,
        fontFamily,
        ...style,
      }}
    >
      {/* Invisible spacer text ensuring exact box dimensions and natural wrap */}
      <span style={{ color: "transparent", fontFamily }}>{text}</span>

      {/* SVG Outline with Inverted Cutout Mask */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full"
        style={{ overflow: "visible" }}
      >
        <defs>
          <mask
            id={maskId}
            maskUnits="userSpaceOnUse"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
          >
            {/* White allows all outer stroke through */}
            <rect x="-20%" y="-20%" width="140%" height="140%" fill="#ffffff" />
            {/* Black completely cuts away the inside fill so it is 100% hollow */}
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="central"
              style={{
                fontFamily,
                fontWeight: fontMode === "bebas" ? 400 : (style?.fontWeight ?? 800),
                letterSpacing: style?.letterSpacing || "normal",
              }}
            >
              {text}
            </text>
          </mask>
        </defs>
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="central"
          mask={`url(#${maskId})`}
          style={{
            fontFamily,
            fontWeight: fontMode === "bebas" ? 400 : (style?.fontWeight ?? 800),
            letterSpacing: style?.letterSpacing || "normal",
          }}
        >
          {text}
        </text>
      </svg>
    </div>
  );
}

export default function ShowcaseHeroSection({
  onExplore,
  speedMode = "1s",
}: ShowcaseHeroSectionProps) {
  // Animation state machine mirrors DevFest Kolkata sequence
  const [initialReady, setInitialReady] = useState(false);
  const [experienceActive, setExperienceActive] = useState(false);
  const [imagesVisible, setImagesVisible] = useState(false);
  const [isScattering, setIsScattering] = useState(false);
  const [isDarkWebsite, setIsDarkWebsite] = useState(false);
  const [heroContentRevealed, setHeroContentRevealed] = useState(false);
  const [animationDuration, setAnimationDuration] = useState<"1s" | "2s">(speedMode);
  const [fontMode, setFontMode] = useState<"bebas" | "syne" | "anton" | "googlesans" | "londrina" | "bungee">("bebas");

  // Time multipliers:
  // 1s mode: stagger delay 110ms * 9 = ~1.0s entrance, hold 600ms, scatter 850ms
  // 2s mode: stagger delay 180ms * 9 = ~1.6s entrance, hold 900ms, scatter 950ms
  const staggerDelay = animationDuration === "1s" ? 110 : 180;
  const holdDuration = animationDuration === "1s" ? 1600 : 2600;

  // Initial mount trigger
  useEffect(() => {
    const t = setTimeout(() => {
      setInitialReady(true);
      // Automatically trigger the experience sequence
      setExperienceActive(true);
    }, 350);

    return () => clearTimeout(t);
  }, []);

  // When experience starts, trigger images appearance on next RAF
  useEffect(() => {
    if (!experienceActive) return;
    const raf = requestAnimationFrame(() => setImagesVisible(true));
    return () => cancelAnimationFrame(raf);
  }, [experienceActive]);

  // After all images appear left-to-right and hold, trigger scatter
  useEffect(() => {
    if (!imagesVisible) return;
    const timer = setTimeout(() => {
      setIsScattering(true);
    }, holdDuration);
    return () => clearTimeout(timer);
  }, [imagesVisible, holdDuration]);

  // Once scattering begins, wait for scatter animation to complete, then switch canvas to dark website
  useEffect(() => {
    if (!isScattering) return;
    const scatterTime = animationDuration === "1s" ? 850 : 950;
    const timer = setTimeout(() => {
      setIsDarkWebsite(true);
    }, scatterTime);
    return () => clearTimeout(timer);
  }, [isScattering, animationDuration]);

  // When dark website is active, reveal hero content with smooth fade
  useEffect(() => {
    if (!isDarkWebsite) return;
    const raf = requestAnimationFrame(() => {
      setHeroContentRevealed(true);
    });
    return () => cancelAnimationFrame(raf);
  }, [isDarkWebsite]);

  // Keyboard shortcut: Space or Enter toggles / restarts experience
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "Enter") {
        if (!experienceActive) {
          e.preventDefault();
          setExperienceActive(true);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [experienceActive]);

  // Reset and replay the entire sequence
  const handleReplay = (mode?: "1s" | "2s") => {
    if (mode) setAnimationDuration(mode);
    setImagesVisible(false);
    setIsScattering(false);
    setIsDarkWebsite(false);
    setHeroContentRevealed(false);
    setExperienceActive(false);

    setTimeout(() => {
      setExperienceActive(true);
    }, 120);
  };

  const handleExploreClick = () => {
    if (onExplore) {
      onExplore();
    } else {
      gsapScrollTo("#about", SMOOTH_SCROLL_CONFIG.duration, 0);
    }
  };

  return (
    <div className="relative w-full h-full">
      {/* Viewport Canvas (100vh / 100dvh) */}
      <div
        id="hero-canvas-inner"
        className="relative z-10 h-full w-full overflow-hidden select-none transition-colors duration-1000 will-change-transform origin-center"
        style={{
          backgroundColor: "#000000",
          overflowX: "hidden",
        }}
      >
        {/* =========================================================================
            STAGE 1: PRE-SCATTER BLACK SHOWCASE CANVAS (Images - LOGO & TRAM REMOVED)
            ========================================================================= */}
        {!isDarkWebsite && (
          <>
            {experienceActive && (
              <div className="pointer-events-none absolute left-1/2 top-1/2 z-[3] h-[min(90vw,70vh)] w-screen -translate-x-1/2 -translate-y-[56%] lg:inset-0 lg:h-full lg:w-full lg:translate-x-0 lg:-translate-y-[5vh]">
                {DEVFEST_SHOWCASE_ITEMS.map((item, index) => {
                  const delayMs = index * staggerDelay;
                  const tileStyle: ShowcaseTileStyle = {
                    "--tile-left": `${item.left}%`,
                    "--tile-top": `${item.top}%`,
                    "--tile-width": `${item.width}%`,
                    "--tile-height": `${item.height}%`,
                    transform: isScattering
                      ? `translate(${item.dx}vw, ${item.dy}vh) rotate(${item.rot}deg) scale(0.7)`
                      : "none",
                    opacity: isScattering ? 0 : imagesVisible ? 1 : 0,
                    transition: isScattering
                      ? "transform 900ms cubic-bezier(.5,0,.75,.4), opacity 900ms cubic-bezier(.5,0,.75,.4)"
                      : `opacity 400ms ease ${delayMs}ms`,
                  };

                  return (
                    <div
                      key={item.id}
                      className="pointer-events-none absolute left-[var(--tile-left)] top-[var(--tile-top)] h-[var(--tile-height)] w-[var(--tile-width)] overflow-hidden rounded-[2px] border border-white/10 bg-neutral-900 shadow-[0_8px_24px_rgba(0,0,0,0.4)] will-change-transform"
                      style={tileStyle}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.src}
                        alt={item.title}
                        draggable={false}
                        className="block h-full w-full object-cover"
                        style={{
                          objectPosition: item.objectPosition || "center center",
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            )}

            {/* "Start the experience" CTA Button (if experience hasn't activated) */}
            <button
              type="button"
              onClick={() => setExperienceActive(true)}
              className={`absolute left-1/2 -translate-x-1/2 flex items-center gap-2 cursor-pointer bg-white/10 hover:bg-white/20 border border-white/20 px-5 py-2.5 rounded-full transition-all duration-500 ease-out group ${
                experienceActive
                  ? "opacity-0 -translate-y-3 pointer-events-none"
                  : initialReady
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
              style={{
                top: "64%",
                transitionDelay: initialReady && !experienceActive ? "180ms" : "0ms",
                zIndex: 10,
              }}
            >
              <span className="font-medium text-white whitespace-nowrap text-sm tracking-wide">
                Start the experience
              </span>
              <svg
                viewBox="0 0 49 25"
                className="h-auto w-4 text-white transition-transform duration-200 group-hover:translate-x-1"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0 12.5C0 12.1317 0.184363 11.7785 0.51253 11.518C0.840698 11.2576 1.28579 11.1113 1.74989 11.1113H43.0228L32.009 2.37364C31.6804 2.11288 31.4958 1.75922 31.4958 1.39045C31.4958 1.02168 31.6804 0.668012 32.009 0.407253C32.3375 0.146493 32.7832 0 33.2479 0C33.7126 0 34.1582 0.146493 34.4868 0.407253L48.4859 11.5168C48.6489 11.6458 48.7782 11.799 48.8664 11.9678C48.9546 12.1365 49 12.3173 49 12.5C49 12.6827 48.9546 12.8635 48.8664 13.0322C48.7782 13.201 48.6489 13.3542 48.4859 13.4832L34.4868 24.5927C34.1582 24.8535 33.7126 25 33.2479 25C32.7832 25 32.3375 24.8535 32.009 24.5927C31.6804 24.332 31.4958 23.9783 31.4958 23.6096C31.4958 23.2408 31.6804 22.8871 32.009 22.6264L43.0228 13.8887H1.74989C1.28579 13.8887 0.840698 13.7424 0.51253 13.482C0.184363 13.2215 0 12.8683 0 12.5Z"
                  fill="white"
                />
              </svg>
            </button>
          </>
        )}

        {/* =========================================================================
            STAGE 2: POST-SCATTER WEBSITE HERO CANVAS (Revealed as Scatter Completes)
            ========================================================================= */}
        {(isScattering || isDarkWebsite) && (
          <div
            className="absolute inset-0 overflow-hidden pointer-events-none select-none"
            style={{
              backgroundColor: "#000000",
              opacity: heroContentRevealed ? 1 : 0,
              transition: "opacity 900ms ease",
              zIndex: 1,
            }}
          >
            {/* Cinematic portrait slideshow with GSAP transitions */}
            <HeroBackgroundSlideshow isVisible={heroContentRevealed || isDarkWebsite} />
          </div>
        )}

        {/* =========================================================================
            STAGE 3: HERO CONTENT LOCKUP (TRUE CENTERED & IMPECCABLE TYPOGRAPHY)
            ========================================================================= */}
        {isDarkWebsite && (
          <>
            {/* Center Hero Content Container (Guaranteed 100% Horizontal & Vertical Centering) */}
            <div className="pointer-events-none absolute inset-0 z-20 w-full max-w-full flex -translate-y-[11vh] flex-col items-center justify-center px-4 text-center mx-auto sm:px-8 md:translate-y-0">
              {/* Unified Typographic Block (SANSKARAN + 2026 Locked to Exact Same Width) */}
              <div className="inline-flex flex-col items-stretch text-center max-w-[94vw]">
                {/* Primary Festival Title (Solid White Bebas Neue Display matching Gallery Section) */}
                <h1
                  className="font-display text-[44px] min-[360px]:text-[52px] min-[400px]:text-[62px] min-[520px]:text-[78px] sm:text-[104px] md:text-[128px] lg:text-[152px] xl:text-[172px] 2xl:text-[188px] text-white tracking-wide uppercase leading-none select-none text-center drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)]"
                  style={{
                    opacity: heroContentRevealed ? 1 : 0,
                    transition: "opacity 900ms ease 120ms",
                  }}
                >
                  SANSKARAN
                </h1>

                {/* 2026: Spans the EXACT SAME WIDTH as SANSKARAN via flex justify-between */}
                <div
                  className="w-full flex items-center justify-between mt-1 sm:mt-2 select-none"
                  style={{
                    opacity: heroContentRevealed ? 1 : 0,
                    transition: "opacity 900ms ease 260ms",
                  }}
                >
                  {["2", "0", "2", "6"].map((digit, i) => (
                    <span
                      key={`year-digit-${i}`}
                      className="font-display text-[38px] min-[360px]:text-[46px] min-[400px]:text-[54px] min-[520px]:text-[68px] sm:text-[90px] md:text-[112px] lg:text-[132px] xl:text-[150px] 2xl:text-[164px] text-white font-normal leading-none drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]"
                    >
                      {digit}
                    </span>
                  ))}
                </div>
              </div>

              {/* Anthem Tagline - Impeccable Tech Grotesque styling */}
              <div
                className="mt-4 sm:mt-6 max-w-[92vw] font-tech text-[10.5px] min-[360px]:text-[12px] min-[400px]:text-[13px] sm:text-[16px] md:text-[17px] font-semibold text-[#FFF4E0] tracking-[0.24em] sm:tracking-[0.3em] uppercase drop-shadow-[0_2px_18px_rgba(0,0,0,0.95)] whitespace-nowrap text-center"
                style={{
                  opacity: heroContentRevealed ? 1 : 0,
                  transition: "opacity 900ms ease 400ms",
                }}
              >
                #COMEJOINTHEHAPPINESS
              </div>

              {/* Interactive Action Buttons & Chevron */}
              <div
                className="pointer-events-auto mt-6 sm:mt-8 flex flex-col items-center gap-4 text-center"
                style={{
                  visibility: heroContentRevealed ? "visible" : "hidden",
                }}
              >
                {/* Explore Action Button */}
                <button
                  type="button"
                  onClick={handleExploreClick}
                  className="flex h-11 sm:h-12 cursor-pointer select-none items-center justify-center whitespace-nowrap rounded-full px-8 sm:px-9 text-xs sm:text-sm font-bold tracking-[0.16em] uppercase text-white opacity-100 bg-white/10 border border-white/25 backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.5),0_0_20px_rgba(255,255,255,0.12)]"
                >
                  Explore
                </button>

                {/* Animated Scroll Down Chevron */}
                <button
                  type="button"
                  onClick={handleExploreClick}
                  aria-label="Scroll to content"
                  className="mt-1 p-2 text-white/70 hover:text-white cursor-pointer transition-transform duration-300 hover:translate-y-1 animate-bounce"
                >
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 stroke-current"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
