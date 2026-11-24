"use client";

import React, { useState, useRef, useEffect, useLayoutEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ==========================================================================
   1. INLINE VECTOR ICONS
   ========================================================================== */
const Icon = {
  Flame: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    </svg>
  ),
  Calendar: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  Users: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  Sparkles: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 3l1.9 5.8a2 2 0 0 0 1.3 1.3L21 12l-5.8 1.9a2 2 0 0 0-1.3 1.3L12 21l-1.9-5.8a2 2 0 0 0-1.3-1.3L3 12l5.8-1.9a2 2 0 0 0 1.3-1.3L12 3z" />
    </svg>
  ),
  ArrowUpRight: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
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
  Music: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  ),
};

/* ==========================================================================
   2. DATA & PILLARS FOR SANSKARAN AND SAHOTSAVA
   ========================================================================== */
interface DisciplineDetail {
  title: string;
  category: string;
  description: string;
  accent: string;
}

interface SectionMedia {
  kind: "image" | "video";
  src: string;
  alt: string;
  section: "SANSKARAN" | "SAHOTSAVA";
}

interface VideoPlaybackState {
  currentTime: number;
}

interface ExpandedMedia {
  index: number;
  videoPlayback?: VideoPlaybackState;
}

const SECTION_MEDIA: SectionMedia[] = [
  {
    kind: "image",
    src: "/hero_section/RM0600350.webp",
    alt: "Traditional dance performance on stage",
    section: "SANSKARAN",
  },
  {
    kind: "image",
    src: "/hero_section/RM060041.webp",
    alt: "Black-and-white dramatic stage performance",
    section: "SANSKARAN",
  },
  {
    kind: "image",
    src: "https://res.cloudinary.com/lsyjstbv/image/upload/f_auto,q_auto:good,w_1200,c_limit/hero%20section/RM060045.jpg",
    alt: "Folk art and spiritual music traditions",
    section: "SANSKARAN",
  },
  {
    kind: "video",
    src: "/videos/hero-background.mp4",
    alt: "Sahotsava concert video",
    section: "SAHOTSAVA",
  },
  {
    kind: "image",
    src: "/hero_section/RM0600141.webp",
    alt: "Two singers performing on stage",
    section: "SAHOTSAVA",
  },
  {
    kind: "image",
    src: "https://res.cloudinary.com/lsyjstbv/image/upload/f_auto,q_auto:good,w_1200,c_limit/hero%20section/RM0600184.jpg",
    alt: "Sound acoustics and live band performance",
    section: "SAHOTSAVA",
  },
];

const SANSKARAN_DISCIPLINES: DisciplineDetail[] = [
  {
    title: "Classical & Folk Arts",
    category: "Heritage Guild",
    description: "Honoring India's diverse folk and classical dances, ragas, and traditional craftsmanship.",
    accent: "#714cb6",
  },
  {
    title: "Thespian Drama & Street Play",
    category: "Theatre Syndicate",
    description: "Original stage productions, proscenium plays, and evocative Nukkad Natak addressing social narratives.",
    accent: "#421d24",
  },
  {
    title: "Parliamentary Debate Conclave",
    category: "Intellectual Sphere",
    description: "Asian Parliamentary & British Parliamentary debate circuits with adjudicators and policy delegates.",
    accent: "#0c4243",
  },
  {
    title: "Risograph & Fine Art Atelier",
    category: "Visual Arts",
    description: "Hands-on printmaking, live canvas painting, digital illustration showcases, and sculpting gallery.",
    accent: "#714cb6",
  },
  {
    title: "Kavyanjali & Literary Guild",
    category: "Literary Arts",
    description: "Poetry slams, creative writing workshops, bilingual mushairas, and storytelling symposiums.",
    accent: "#421d24",
  },
  {
    title: "Symphony & Instrumental Rhapsody",
    category: "Acoustic Harmony",
    description: "Orchestral fusions, solo instrumentals, sitar & sarod duets, and meditative raag explorations.",
    accent: "#714cb6",
  },
];

const SAHOTSAVA_DISCIPLINES: DisciplineDetail[] = [
  {
    title: "Celebrity Arena Pro-Nites",
    category: "Mainstage Spectacle",
    description: "Stadium-scale concerts featuring nationally acclaimed artists, playback singers, and headlining bands.",
    accent: "#714cb6",
  },
  {
    title: "Battle of the Bands",
    category: "Rock & Metal Arena",
    description: "Electrifying live band face-offs spanning progressive rock, metal, indie-pop, and fusion ensembles.",
    accent: "#421d24",
  },
  {
    title: "Street Dance & Cypher Battles",
    category: "Urban Rhythms",
    description: "High-intensity 1v1 popping, locking, breaking, and all-styles crew choreography showdowns.",
    accent: "#0c4243",
  },
  {
    title: "Haute Couture Fashion Runway",
    category: "Vogue & Design",
    description: "Avant-garde student designers showcasing theme-based collections on a 40-foot illuminated runway.",
    accent: "#714cb6",
  },
  {
    title: "Sunset EDM & DJ Raves",
    category: "Electronic Nexus",
    description: "Sub-bass euphoria and dynamic laser light shows under the open twilight festival sky.",
    accent: "#421d24",
  },
  {
    title: "Midnight Carnival & Street Food Walk",
    category: "Carnival & Street",
    description: "Festive flea markets, artisanal cuisine stalls, carnival games, and pop-up street performances.",
    accent: "#0c4243",
  },
];

/* ==========================================================================
   3. SECTION 1: SANSKARAN (INTELLECTUAL HERITAGE CONCLAVE)
   ========================================================================== */
interface SanskaranSectionProps {
  onInspect: () => void;
  onMediaClick: (index: number, videoPlayback?: VideoPlaybackState) => void;
}

function SanskaranSection({ onInspect, onMediaClick }: SanskaranSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    // Bulletproof Native IntersectionObserver Trigger
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.25) {
            setInView(true);

            // Trigger GSAP entrance animation with natural easing
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            const textElements = el.querySelectorAll(".sanskaran-text-anim");
            if (textElements.length > 0) {
              tl.fromTo(
                textElements,
                { autoAlpha: 0, y: 32 },
                { autoAlpha: 1, y: 0, duration: 0.75, stagger: 0.1 },
                0
              );
            }

            const images = el.querySelectorAll(".sanskaran-img-fade");
            if (images.length > 0) {
              tl.fromTo(
                images,
                { autoAlpha: 0, y: 40, scale: 0.96 },
                { autoAlpha: 1, y: 0, scale: 1, duration: 0.85, stagger: 0.14 },
                0.2
              );
            }

            observer.unobserve(el);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(el);

    // Safety fallback: if not triggered within 1.5s, reveal gracefully
    const safetyTimer = setTimeout(() => {
      setInView(true);
      const textElements = el.querySelectorAll(".sanskaran-text-anim");
      const images = el.querySelectorAll(".sanskaran-img-fade");
      gsap.to(textElements, { autoAlpha: 1, y: 0, duration: 0.4 });
      gsap.to(images, { autoAlpha: 1, y: 0, scale: 1, duration: 0.4 });
    }, 1500);

    return () => {
      observer.disconnect();
      clearTimeout(safetyTimer);
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative z-20 w-full overflow-hidden select-none bg-[#0d0d0e] text-[#ffffff] py-20 sm:py-28 lg:py-32 border-b border-white/10"
    >
      {/* Subtle Architectural Grid Lines */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.1]"
        style={{
          backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* =================================================================
              LEFT COLUMN: DEFINITION & PHILOSOPHY OF SANSKARAN
              ================================================================= */}
          <div className="lg:col-span-5 flex flex-col items-center text-center lg:items-start lg:text-left">
            {/* Monumental Headline */}
            <h2 className="sanskaran-text-anim font-display text-4xl sm:text-6xl lg:text-7xl tracking-tight text-[#ffffff] uppercase leading-none">
              SANSKARAN
            </h2>

            {/* Sub-tagline */}
            <p className="sanskaran-text-anim product_sans text-lg sm:text-xl font-medium text-[#d4c7ff] mt-3 leading-snug">
              The Driving Force Behind Campus Culture
            </p>

            {/* Sanskaran Overview */}
            <p className="sanskaran-text-anim product_sans text-sm sm:text-base text-white/70 mt-5 leading-relaxed">
              Sanskaran, the official cultural club of Techno India University, stands at the heart of the university&apos;s cultural landscape. A dynamic platform for creativity, expression, and collaboration, it brings together diverse artistic disciplines to transform ideas into experiences that resonate across campus and beyond.
            </p>
            <p className="sanskaran-text-anim product_sans text-sm sm:text-base text-white/70 mt-3 leading-relaxed">
              From music, dance, and photography to literature, performance, and creative showcases, Sanskaran provides a platform for emerging talent while cultivating a vibrant community of young minds. Through its year-round initiatives and large-scale celebrations, including Sahotsava, it creates opportunities for students to connect, engage, and experience culture beyond the classroom.
            </p>
            <p className="sanskaran-text-anim product_sans text-sm sm:text-base text-white/70 mt-3 leading-relaxed">
              More than a cultural club, Sanskaran is a driving force behind student engagement, creative collaboration, and campus experiences. By connecting talent, audiences, and communities, it creates meaningful opportunities for brands to engage with an energetic youth audience, build visibility, and become part of experiences that leave a lasting impression.
            </p>
            <p className="sanskaran-text-anim product_sans text-sm sm:text-base font-semibold tracking-wide text-[#d4c7ff] mt-5">
              #ComeJoinTheHappiness
            </p>
          </div>

          {/* =================================================================
              RIGHT COLUMN: FADING-IN STAGGERED IMAGE GALLERY (GSAP)
              ================================================================= */}
          <div className="lg:col-span-7 sanskaran-gallery-grid">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {/* Image 1: Main Heritage Feature */}
              <div className="sanskaran-img-fade sm:col-span-2 relative aspect-video rounded-2xl overflow-hidden shadow-lg shadow-black/10 group">
                <button
                  type="button"
                  onClick={() => onMediaClick(0)}
                  aria-label="View larger image: Traditional dance performance on stage"
                  className="absolute inset-0 h-full w-full cursor-zoom-in p-0 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#d4c7ff]"
                >
                  <img
                    src={SECTION_MEDIA[0].src}
                    alt="Traditional dance performance on stage"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                </button>
              </div>

              {/* Image 2: Atelier & Interior Craft */}
              <div className="sanskaran-img-fade relative aspect-[4/5] rounded-2xl overflow-hidden shadow-lg shadow-black/10 group">
                <button
                  type="button"
                  onClick={() => onMediaClick(1)}
                  aria-label="View larger image: Black-and-white dramatic stage performance"
                  className="absolute inset-0 h-full w-full cursor-zoom-in p-0 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#d4c7ff]"
                >
                  <img
                    src={SECTION_MEDIA[1].src}
                    alt="Black-and-white dramatic stage performance"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-contain object-center"
                  />
                </button>
              </div>

              {/* Image 3: Traditional Rhythms & Folk Expression */}
              <div className="sanskaran-img-fade relative aspect-[4/5] rounded-2xl overflow-hidden shadow-lg shadow-black/10 group">
                <button
                  type="button"
                  onClick={() => onMediaClick(2)}
                  aria-label="View larger image: Folk art and spiritual music traditions"
                  className="absolute inset-0 h-full w-full cursor-zoom-in p-0 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#d4c7ff]"
                >
                  <img
                    src={SECTION_MEDIA[2].src}
                    alt="Folk art and spiritual music traditions"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-contain object-center"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   5. SECTION 2: SAHOTSAVA (ELECTRIC ARENA & CONCERT SPECTACLE)
   ========================================================================== */
interface SahotsavaSectionProps {
  onInspect: () => void;
  onMediaClick: (index: number, videoPlayback?: VideoPlaybackState) => void;
  audioRef: React.RefObject<HTMLAudioElement | null>;
  mediaViewerOpen: boolean;
  mediaViewerVideoOpen: boolean;
}

function SahotsavaSection({
  onInspect,
  onMediaClick,
  audioRef,
  mediaViewerOpen,
  mediaViewerVideoOpen,
}: SahotsavaSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(false);
  const [needsAudioGesture, setNeedsAudioGesture] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    // Bulletproof Native IntersectionObserver Trigger
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);

            // GSAP Entrance Timeline
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            // 1. Left column text stagger
            const textElements = el.querySelectorAll(".sahotsava-text-anim");
            if (textElements.length > 0) {
              tl.fromTo(
                textElements,
                { autoAlpha: 0, y: 32 },
                { autoAlpha: 1, y: 0, duration: 0.75, stagger: 0.1 },
                0
              );
            }

            // 2. Right column concert images stagger & fade-in
            const images = el.querySelectorAll(".sahotsava-img-fade");
            if (images.length > 0) {
              tl.fromTo(
                images,
                { autoAlpha: 0, x: 35, y: 25, scale: 0.96 },
                { autoAlpha: 1, x: 0, y: 0, scale: 1, duration: 0.85, stagger: 0.15 },
                0.15
              );
            }

            observer.unobserve(el);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -30px 0px",
      }
    );

    observer.observe(el);

    // Safety fallback: if not triggered within 1.5s (e.g. fast anchor jump), reveal gracefully
    const safetyTimer = setTimeout(() => {
      setInView(true);
      const textElements = el.querySelectorAll(".sahotsava-text-anim");
      const images = el.querySelectorAll(".sahotsava-img-fade");
      gsap.to(textElements, { autoAlpha: 1, y: 0, duration: 0.4 });
      gsap.to(images, { autoAlpha: 1, x: 0, y: 0, scale: 1, duration: 0.4 });
    }, 1500);

    return () => {
      observer.disconnect();
      clearTimeout(safetyTimer);
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    const audio = audioRef.current;
    if (!section || !video || !audio) return;
    if (mediaViewerOpen) {
      video.pause();
      if (!mediaViewerVideoOpen) audio.pause();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.25) {
          video.muted = true;
          audio.muted = false;
          audio.volume = 1;
          if (Math.abs(audio.currentTime - video.currentTime) > 0.5) {
            audio.currentTime = video.currentTime;
          }
          void video.play().catch((error: unknown) => {
            console.error("Unable to play the Sahotsava video:", error);
          });
          void audio.play().then(
            () => setNeedsAudioGesture(false),
            (error: unknown) => {
              setNeedsAudioGesture(true);
              if (!(error instanceof DOMException && error.name === "NotAllowedError")) {
                console.error("Unable to play Sahotsava audio:", error);
              }
            }
          );
        } else {
          video.pause();
          audio.pause();
          setNeedsAudioGesture(false);
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(section);
    return () => {
      observer.disconnect();
      video.pause();
    };
  }, [audioRef, mediaViewerOpen, mediaViewerVideoOpen]);

  return (
    <section
      id="sahotsava"
      ref={sectionRef}
      className="relative z-20 w-full overflow-hidden select-none bg-[#0c4243] text-[#ffffff] py-20 sm:py-28 lg:py-32 border-b border-[#e3e3e2]/15"
    >
      <audio
        ref={audioRef}
        src="/videos/sahotsava-audio.mp3"
        loop
        preload="metadata"
        aria-hidden="true"
      />
      {/* Atmospheric Luminous Arena Glow Halos */}
      <div
        aria-hidden="true"
        className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-[#714cb6]/20 blur-[130px] pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-10 right-0 w-[500px] h-[500px] rounded-full bg-[#421d24]/30 blur-[150px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* =================================================================
              LEFT COLUMN: DEFINITION & SPECTACLE OF SAHOTSAVA
              ================================================================= */}
          <div className="lg:col-span-5 flex flex-col items-center text-center lg:items-start lg:text-left">
            {/* Monumental Headline */}
            <h2 className="sahotsava-text-anim font-display text-4xl sm:text-6xl lg:text-7xl tracking-tight text-[#ffffff] uppercase leading-none">
              SAHOTSAVA
            </h2>

            {/* Sub-tagline */}
            <p className="sahotsava-text-anim product_sans text-lg sm:text-xl font-medium text-[#d4c7ff] mt-3 leading-snug">
              A Celebration Beyond Imagination
            </p>

            {/* Sahotsava Overview */}
            <p className="sahotsava-text-anim product_sans text-sm sm:text-base text-[#ffffff]/80 mt-5 leading-relaxed">
              Sahotsava, the annual cultural celebration of Techno India University, brings together creativity, talent, and youthful energy on one grand platform. From electrifying performances to immersive experiences, it celebrates artistic expression, builds connections, and creates unforgettable memories.
            </p>
            <p className="sahotsava-text-anim product_sans text-sm sm:text-base text-[#ffffff]/80 mt-3 leading-relaxed">
              More than an annual celebration, Sahotsava is a vibrant platform for brands to connect with an energetic youth audience, build visibility, and become part of experiences that leave a lasting impression.
            </p>
            <p className="sahotsava-text-anim product_sans text-sm sm:text-base font-semibold tracking-wide text-[#d4c7ff] mt-5">
              #ComeJoinTheHappiness
            </p>
          </div>

          {/* =================================================================
              RIGHT COLUMN: FADING-IN STAGGERED IMAGE GALLERY (GSAP)
              ================================================================= */}
          <div className="lg:col-span-7 sahotsava-gallery-grid">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {/* Image 1: Main Arena Concert Feature */}
              <div className="sahotsava-img-fade sm:col-span-2 relative aspect-video rounded-2xl overflow-hidden bg-black shadow-xl shadow-black/30 group">
                <video
                  ref={videoRef}
                  src={SECTION_MEDIA[3].src}
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  aria-hidden="true"
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <button
                  type="button"
                  onClick={() => {
                    const video = videoRef.current;
                    onMediaClick(3, {
                      currentTime: video?.currentTime ?? 0,
                    });
                  }}
                  aria-label="View larger Sahotsava concert video"
                  className="absolute inset-0 z-[1] h-full w-full cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#d4c7ff]"
                >
                  <span className="sr-only">View larger Sahotsava concert video</span>
                </button>
                {needsAudioGesture && (
                  <button
                    type="button"
                    onClick={() => {
                      const video = videoRef.current;
                      const audio = audioRef.current;
                      if (!video || !audio) return;

                      video.muted = true;
                      audio.muted = false;
                      audio.volume = 1;
                      audio.currentTime = video.currentTime;
                      void audio.play().then(
                        () => setNeedsAudioGesture(false),
                        (error: unknown) => {
                          setNeedsAudioGesture(true);
                          if (!(error instanceof DOMException && error.name === "NotAllowedError")) {
                            console.error("Unable to play Sahotsava audio:", error);
                          }
                        }
                      );
                    }}
                    className="absolute bottom-4 right-4 z-10 rounded-lg bg-black/75 px-4 py-2 font-tech text-xs font-bold uppercase tracking-wider text-white backdrop-blur-md transition-colors hover:bg-[#714cb6]"
                  >
                    Tap to enable sound
                  </button>
                )}
              </div>

              {/* Image 2: Neon Rig Synthesis */}
              <div className="sahotsava-img-fade relative aspect-[4/5] rounded-2xl overflow-hidden bg-black shadow-xl shadow-black/30 group">
                <button
                  type="button"
                  onClick={() => onMediaClick(4)}
                  aria-label="View larger image: Two singers performing on stage"
                  className="absolute inset-0 h-full w-full cursor-zoom-in p-0 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#d4c7ff]"
                >
                  <img
                    src={SECTION_MEDIA[4].src}
                    alt="Two singers performing on stage"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                </button>
              </div>

              {/* Image 3: Gothic Acoustics & Live Stadium Sound */}
              <div className="sahotsava-img-fade relative aspect-[4/5] rounded-2xl overflow-hidden shadow-xl shadow-black/30 group">
                <button
                  type="button"
                  onClick={() => onMediaClick(5)}
                  aria-label="View larger image: Sound acoustics and live band performance"
                  className="absolute inset-0 h-full w-full cursor-zoom-in p-0 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#d4c7ff]"
                >
                  <img
                    src={SECTION_MEDIA[5].src}
                    alt="Sound acoustics and live band performance"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   6. MAIN EXPORT: DUAL REALM SECTIONS WITH INTEGRATED MODAL
   ========================================================================= */
export default function AboutFestivalSection() {
  const [inspectModal, setInspectModal] = useState<"sanskaran" | "sahotsava" | null>(null);
  const [expandedMedia, setExpandedMedia] = useState<ExpandedMedia | null>(null);
  const [needsExpandedAudioGesture, setNeedsExpandedAudioGesture] = useState(false);
  const activeMedia =
    expandedMedia === null ? null : SECTION_MEDIA[expandedMedia.index];
  const isMediaViewerOpen = expandedMedia !== null;
  const touchStartX = useRef<number | null>(null);
  const expandedVideoRef = useRef<HTMLVideoElement>(null);
  const sahotsavaAudioRef = useRef<HTMLAudioElement>(null);

  const openMedia = useCallback(
    (index: number, videoPlayback?: VideoPlaybackState) => {
      setExpandedMedia({ index, videoPlayback });
    },
    []
  );

  useLayoutEffect(() => {
    if (activeMedia?.kind !== "video") return;

    const video = expandedVideoRef.current;
    const audio = sahotsavaAudioRef.current;
    if (!video || !audio) return;

    video.muted = true;
    audio.muted = false;
    audio.volume = 1;
    audio.currentTime = expandedMedia?.videoPlayback?.currentTime ?? 0;
    void video.play().catch((error: unknown) => {
      console.error("Unable to play the enlarged Sahotsava video:", error);
    });
    void audio.play().then(
      () => setNeedsExpandedAudioGesture(false),
      (error: unknown) => {
        setNeedsExpandedAudioGesture(true);
        if (!(error instanceof DOMException && error.name === "NotAllowedError")) {
          console.error("Unable to play enlarged Sahotsava audio:", error);
        }
      }
    );
  }, [activeMedia?.kind, expandedMedia?.index, expandedMedia?.videoPlayback?.currentTime]);

  const navigateMedia = useCallback((direction: -1 | 1) => {
    setExpandedMedia((current) => {
      if (!current) return current;

      const nextIndex =
        (current.index + direction + SECTION_MEDIA.length) % SECTION_MEDIA.length;
      const nextMedia = SECTION_MEDIA[nextIndex];

      return {
        index: nextIndex,
        videoPlayback:
          nextMedia.kind === "video"
            ? current.videoPlayback ?? {
                currentTime: 0,
              }
            : undefined,
      };
    });
  }, []);

  // Refresh ScrollTrigger upon mounting dual sections so all downstream sections re-calculate coordinates
  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isMediaViewerOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setExpandedMedia(null);
      } else if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        if (event.target instanceof HTMLVideoElement) return;
        event.preventDefault();
        navigateMedia(event.key === "ArrowLeft" ? -1 : 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMediaViewerOpen, navigateMedia]);

  return (
    <>
      {/* 1. Sanskaran Conclave Section (Heritage, Art, Intellect) */}
      <SanskaranSection
        onInspect={() => setInspectModal("sanskaran")}
        onMediaClick={openMedia}
      />

      {/* 2. Sahotsava Arena Section (Logo Watermark Background, Stadium Concerts) */}
      <SahotsavaSection
        onInspect={() => setInspectModal("sahotsava")}
        onMediaClick={openMedia}
        audioRef={sahotsavaAudioRef}
        mediaViewerOpen={isMediaViewerOpen}
        mediaViewerVideoOpen={activeMedia?.kind === "video"}
      />

      {expandedMedia &&
        activeMedia &&
        typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            <motion.div
              key="expanded-media-dialog"
              role="dialog"
              aria-modal="true"
              aria-label={activeMedia.alt}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="pointer-events-none fixed inset-0 z-[100] flex items-center justify-center"
            >
              <div
                aria-hidden="true"
                onClick={() => setExpandedMedia(null)}
                className="pointer-events-auto absolute inset-0 bg-black/95 backdrop-blur-md"
              />
              <motion.div
                key={`media-${expandedMedia.index}`}
                initial={{ scale: 0.96, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.96, opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={(event) => event.stopPropagation()}
                onTouchStart={(event) => {
                  touchStartX.current =
                    event.changedTouches.item(0)?.clientX ?? null;
                }}
                onTouchEnd={(event) => {
                  const touch = event.changedTouches.item(0);
                  const startX = touchStartX.current;
                  touchStartX.current = null;
                  if (!touch || startX === null) return;

                  const distance = touch.clientX - startX;
                  if (Math.abs(distance) > 50) {
                    navigateMedia(distance < 0 ? 1 : -1);
                  }
                }}
                onTouchCancel={() => {
                  touchStartX.current = null;
                }}
                className="pointer-events-auto relative z-10 flex max-h-[88vh] w-full max-w-7xl items-center justify-center"
              >
                {activeMedia.kind === "image" ? (
                  <img
                    src={activeMedia.src}
                    alt={activeMedia.alt}
                    className="max-h-[88vh] max-w-[94vw] rounded-xl object-contain shadow-2xl"
                  />
                ) : (
                  <video
                    ref={expandedVideoRef}
                    src={activeMedia.src}
                    controls
                    muted
                    playsInline
                    preload="metadata"
                    onLoadedMetadata={(event) => {
                      const currentTime = expandedMedia.videoPlayback?.currentTime ?? 0;
                      if (currentTime > 0) {
                        event.currentTarget.currentTime = currentTime;
                      }
                    }}
                    onTimeUpdate={(event) => {
                      const audio = sahotsavaAudioRef.current;
                      if (
                        audio &&
                        Math.abs(audio.currentTime - event.currentTarget.currentTime) > 0.5
                      ) {
                        audio.currentTime = event.currentTarget.currentTime;
                      }
                    }}
                    onSeeking={(event) => {
                      const audio = sahotsavaAudioRef.current;
                      if (audio) audio.currentTime = event.currentTarget.currentTime;
                    }}
                    onPlay={(event) => {
                      const audio = sahotsavaAudioRef.current;
                      if (!audio || !audio.paused) return;

                      audio.muted = false;
                      audio.volume = 1;
                      audio.currentTime = event.currentTarget.currentTime;
                      void audio.play().then(
                        () => setNeedsExpandedAudioGesture(false),
                        (error: unknown) => {
                          setNeedsExpandedAudioGesture(true);
                          if (!(error instanceof DOMException && error.name === "NotAllowedError")) {
                            console.error("Unable to play enlarged Sahotsava audio:", error);
                          }
                        }
                      );
                    }}
                    onPause={() => sahotsavaAudioRef.current?.pause()}
                    onEnded={() => sahotsavaAudioRef.current?.pause()}
                    className="aspect-video max-h-[88vh] w-full max-w-[94vw] rounded-xl bg-black object-contain shadow-2xl"
                  >
                    Your browser does not support HTML video.
                  </video>
                )}
              </motion.div>
              {activeMedia.kind === "video" && needsExpandedAudioGesture && (
                <motion.button
                  type="button"
                  onClick={() => {
                    const video = expandedVideoRef.current;
                    const audio = sahotsavaAudioRef.current;
                    if (!video || !audio) return;

                    audio.muted = false;
                    audio.volume = 1;
                    audio.currentTime = video.currentTime;
                    void audio.play().then(
                      () => setNeedsExpandedAudioGesture(false),
                      (error: unknown) => {
                        setNeedsExpandedAudioGesture(true);
                        console.error("Unable to play enlarged Sahotsava audio:", error);
                      }
                    );
                  }}
                  aria-label="Play Sahotsava video with sound"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="pointer-events-auto fixed right-4 top-20 z-[110] rounded-full border border-white/15 bg-black/70 px-4 py-3 text-xs font-semibold tracking-wide text-white backdrop-blur-md transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  Play with sound
                </motion.button>
              )}
              <motion.div
                key="media-counter"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="pointer-events-none fixed left-4 top-4 z-[110] rounded-full border border-white/15 bg-black/70 px-3 py-2 font-mono text-[10px] font-semibold tracking-wider text-white/90 backdrop-blur-md sm:left-6 sm:top-6"
              >
                {activeMedia.section} · {expandedMedia.index + 1} / {SECTION_MEDIA.length}
              </motion.div>
              <motion.button
                key="close-expanded-media"
                type="button"
                onClick={() => setExpandedMedia(null)}
                aria-label="Close enlarged media"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="pointer-events-auto fixed right-4 top-4 z-[110] flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:right-6 sm:top-6"
              >
                <Icon.X className="h-5 w-5" />
              </motion.button>
              <motion.button
                key="previous-expanded-media"
                type="button"
                onClick={() => navigateMedia(-1)}
                aria-label="Previous media"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="pointer-events-auto fixed left-3 top-1/2 z-[110] flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/65 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:left-6"
              >
                <Icon.ChevronLeft className="h-6 w-6" />
              </motion.button>
              <motion.button
                key="next-expanded-media"
                type="button"
                onClick={() => navigateMedia(1)}
                aria-label="Next media"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="pointer-events-auto fixed right-3 top-1/2 z-[110] flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/65 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:right-6"
              >
                <Icon.ChevronRight className="h-6 w-6" />
              </motion.button>
            </motion.div>
          </AnimatePresence>,
          document.body
        )}

      {/* =====================================================================
          DETAILED DISCIPLINE & LINEUP INSPECTION MODAL (PAPER WHITE)
          ===================================================================== */}
      <AnimatePresence>
        {inspectModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setInspectModal(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md transition-opacity"
            />

            {/* Modal Dialog Card */}
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 24 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 16 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl md:rounded-3xl bg-[#141416] border border-white/10 p-6 sm:p-8 shadow-[0_24px_70px_rgba(0,0,0,0.85)] text-white z-10"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setInspectModal(null)}
                aria-label="Close Discipline Modal"
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer"
              >
                <Icon.X className="w-4 h-4" />
              </button>

              {/* Modal Header */}
              <div className="flex items-center gap-3 mb-2">
                <span
                  style={{
                    backgroundColor:
                      inspectModal === "sanskaran" ? "#714cb6" : "#421d24",
                  }}
                  className="w-3.5 h-3.5 rounded-full inline-block"
                />
                <div>
                  <span className="product_sans text-[11px] font-bold tracking-widest text-white/50 uppercase">
                    {inspectModal === "sanskaran"
                      ? "INTELLECTUAL & HERITAGE DOSSIER"
                      : "ARENA & SPECTACLE DIRECTORY"}
                  </span>
                  <h3 className="product_sans text-2xl sm:text-3xl font-bold text-white leading-tight">
                    {inspectModal === "sanskaran"
                      ? "SANSKARAN Disciplines"
                      : "SAHOTSAVA Lineup Pillars"}
                  </h3>
                </div>
              </div>

              <p className="product_sans text-sm text-white/70 mb-6">
                {inspectModal === "sanskaran"
                  ? "Explore the master workshops, competitive conclaves, and exhibition halls anchored under Sanskaran."
                  : "Experience the high-voltage arena, star headliners, and night spectacles defining Sahotsava."}
              </p>

              {/* Disciplines Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {(inspectModal === "sanskaran"
                  ? SANSKARAN_DISCIPLINES
                  : SAHOTSAVA_DISCIPLINES
                ).map((item) => (
                  <div
                    key={item.title}
                    className="p-4 rounded-xl bg-[#1c1b22] border border-white/10 hover:border-[#714cb6] hover:bg-[#23222d] hover:shadow-md transition-all"
                  >
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <span
                        style={{ backgroundColor: item.accent }}
                        className="w-2 h-2 rounded-full inline-block"
                      />
                      <span
                        style={{ color: item.accent }}
                        className="product_sans text-[10px] font-bold tracking-wider uppercase"
                      >
                        {item.category}
                      </span>
                    </div>

                    <h4 className="product_sans text-base font-bold text-white mb-1">
                      {item.title}
                    </h4>

                    <p className="product_sans text-xs text-white/70 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Modal Footer */}
              <div className="mt-8 pt-5 border-t border-white/10 flex items-center justify-between text-xs text-white/50">
                <span>Sanskaran &amp; Sahotsava Conclave 2026</span>
                <button
                  type="button"
                  onClick={() => setInspectModal(null)}
                  className="font-semibold text-[#d4c7ff] hover:text-white hover:underline cursor-pointer transition-colors"
                >
                  Close Dossier
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
