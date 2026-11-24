# Project Architecture & Context — Sanskaran & Sahotsava 2026 Festival Portal

## Project Purpose
High-impact, immersive showcase and festival portal for **Sanskaran & Sahotsava 2026**, the annual collegiate cultural and music conclave. The platform unifies the dual realms of intellectual heritage (Sanskaran ateliers, thespian drama, debate conclaves, risograph fine arts) and stadium concert euphoria (Sahotsava pro-nites, band battles, streetwear fashion runway). All legacy playing card metaphors ("Deck of Destinies", suits, card ranks) and obsolete 3D prototypes have been eliminated in favor of an authentic festival identity.

## Architecture
- **Framework**: Next.js 16 (React 19) App Router with Turbopack
- **Animation & Motion Suite**: GSAP ScrollTrigger, Hybrid GSAP + Lenis 60 FPS Inertia Smooth Scroll Engine (Lenis wheel/touchpad inertia with GSAP tween-driven programmatic glide), Framer Motion layout animations (`/gsap-animation`, `/animate`, `/context7-mcp`)
- **UI & Design System**: Tailwind CSS v4, Superhuman-inspired editorial palette (Warm Parchment, Midnight Wine, Royal Violet, Lilac Mist, Deep Lagoon, Soft Mist, Ink Charcoal, Paper White), custom SVG vector art, and atmospheric dark theme storytelling bands
- **Type Safety**: TypeScript strict mode
- **Deployment & Hosting Strategy**: Static export ready or edge deployment for high-concurrency festival traffic

## Key Directories & Components
- `src/app/page.tsx`: Single-page continuous festival experience.
- `src/components/event/ShowcaseHeroSection.tsx`: Locked cinematic stage video with hollow outline typography.
- `src/components/event/AboutFestivalSection.tsx`: DevFest-inspired card-up bottom sheet revealing the dual realms (Sanskaran & Sahotsava) with interactive inspection modal dossiers.
- `src/components/event/GallerySection.tsx`: Full-width vertical slit cards expanding into 6-image photo grids with club-specific dark gradients and ambient glows.
- `src/components/event/CoreMembersSection.tsx`: Interactive flip cards introducing student curators and architects with GSAP side-entrance physics.
- `src/components/event/DignitariesSection.tsx` & `FoundersSection.tsx`: Spotlight cards honoring institutional leadership and founding stewards.
- `src/components/event/Navbar.tsx` & `Footer.tsx`: Glowing progress header and clean brand footer.
- `src/lib/clubsData.ts`: Central data store for the 7 cultural societies and event photographic archives.

## Alternating Color Architecture & Rhythm
The page employs an editorial alternating color rhythm to create visual pacing, avoid monotone fatigue, and clearly delineate festival realms:
1. **Showcase Hero (`ShowcaseHeroSection.tsx`)**: Black (`#000000`) opening canvas.
2. **Sanskaran (`AboutFestivalSection.tsx` - `SanskaranSection`)**: White / Warm Parchment (`#f2f0eb`) ground.
3. **Sahotsava (`AboutFestivalSection.tsx` - `SahotsavaSection`)**: Green / Deep Lagoon (`#0c4243`) ground with vector watermark.
4. **Cultural Gallery (`GallerySection.tsx`)**: White (`#ffffff`) ground with obsidian slit cards.
5. **Core Members (`CoreMembersSection.tsx`)**: Green / Deep Lagoon (`#0c4243`) ground with Lilac Mist ambient grid and 3D card physics.
6. **Dignitaries (`DignitariesSection.tsx`)**: White / Warm Parchment (`#f2f0eb`) ground with Paper White spotlight cards.
7. **Founders (`FoundersSection.tsx`)**: Green / Deep Lagoon (`#0c4243`) ground with emerald spotlight cards.
8. **Footer (`Footer.tsx`)**: Midnight Wine (`#421d24`) ground.
