# 2026-static-site

Official static showcase and festival portal for **Sanskaran & Sahotsava 2026**.

## Overview
A high-performance cultural conclave web experience built with modern web technologies:
- **Hero Showcase**: Stationary widescreen stage video with outline typography and smooth entrance reveal.
- **Dual Realm Bottom Sheet**: DevFest Kolkata inspired card-up sheet detailing Sanskaran (heritage & intellectual guild) and Sahotsava (electric arena & pro-nites) with interactive inspection dossiers.
- **Societies Gallery**: Expandable full-width vertical slits featuring individual society themes, dark atmospheric gradients, ambient halos, and photo grid archives.
- **Core Curators & Stewards**: 3D interactive flip cards with GSAP side-entrance physics.
- **Leadership & Founders**: Spotlight tribute cards for dignitaries and founding members.

## Tech Stack
- **Framework**: [Next.js 16](https://nextjs.org) (App Router, Turbopack)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com)
- **Animation**: [GSAP](https://gsap.com) (ScrollTrigger) & [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev)
- **Language**: TypeScript

## Repository Layout
- `src/`: application routes, components, and data.
- `public/`: optimized assets served by the website.
- `assets/source/`: original media files kept for future edits; not served directly.
- `docs/`: architecture and design references.

## Documentation
- [Architecture overview](./docs/architecture.md)

## Getting Started

First, install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to view the application.

## Production Build

To test and create an optimized production build:

```bash
npm run build
```
