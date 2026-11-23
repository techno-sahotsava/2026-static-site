"use client";

import React from "react";
import { ArrowUp, Mail } from "lucide-react";
import { gsapScrollTo } from "./Navbar";

export default function Footer() {
  const scrollToTop = () => {
    gsapScrollTo("#hero", 1.2, 0);
  };

  return (
    <footer className="border-t border-white/10 bg-[#0d0d0e] text-[#ffffff] py-12 px-4 sm:px-8 z-10 relative">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-center justify-between gap-6 text-center md:text-left">
        <div className="flex flex-col items-center md:items-start gap-2">
          <p className="font-tech text-xs font-bold tracking-wider uppercase text-[#d4c7ff]">
            Contact Us
          </p>
          <a
            href="https://mail.google.com/mail/?view=cm&to=technosahotsava%40gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-tech text-sm text-white/80 hover:text-white transition-colors"
          >
            <Mail className="w-4 h-4 text-[#d4c7ff]" />
            technosahotsava@gmail.com
          </a>
          <a
            href="https://www.instagram.com/technosahotsava/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-tech text-sm text-white/80 hover:text-white transition-colors"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4 text-[#d4c7ff]"
              aria-hidden="true"
            >
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
            </svg>
            @technosahotsava
          </a>
        </div>

        <button
          type="button"
          onClick={scrollToTop}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#18181b] hover:bg-[#714cb6] border border-white/15 text-[#ffffff] font-tech text-xs font-bold tracking-wider uppercase transition-colors cursor-pointer shadow-md"
        >
          <ArrowUp className="w-4 h-4 text-[#d4c7ff]" />
          <span>Back to Top</span>
        </button>
      </div>
    </footer>
  );
}
