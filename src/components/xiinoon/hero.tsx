"use client";

import { useEffect, useState } from "react";
import { ArrowDown, Diamond } from "lucide-react";

export function Hero() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const parallax = Math.min(scrollY * 0.35, 320);
  const fade = Math.max(1 - scrollY / 600, 0);

  return (
    <section
      id="top"
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden vignette"
    >
      {/* Background image with parallax + Ken Burns */}
      <div
        className="absolute inset-0"
        style={{ transform: `translateY(${parallax}px)` }}
      >
        <div
          className="absolute inset-0 kenburns bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/hero.webp')",
            filter: "brightness(0.5) contrast(1.05)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#080704]/85 via-[#080704]/30 to-[#080704]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080704]/80 via-transparent to-[#080704]/60" />
      </div>

      {/* Decorative corner frames */}
      <div className="pointer-events-none absolute inset-5 sm:inset-8 border border-[rgba(201,168,76,0.18)]" />
      <div className="pointer-events-none absolute inset-6 sm:inset-9 border border-[rgba(201,168,76,0.08)]" />

      {/* Rotating seal — top right */}
      <div className="absolute right-6 top-28 sm:right-12 sm:top-32 z-10 hidden sm:block">
        <div className="relative h-28 w-28">
          <svg
            viewBox="0 0 100 100"
            className="spin-slow absolute inset-0 h-full w-full text-[#c9a84c]/70"
          >
            <defs>
              <path
                id="seal-path"
                d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
                fill="none"
              />
            </defs>
            <text className="fill-current text-[7.5px] tracking-[0.32em] uppercase">
              <textPath href="#seal-path">
                · XII NOON · Ultra-Luxury · Since the Beginning of Time ·
              </textPath>
            </text>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <Diamond className="h-5 w-5 text-[#e8c97a]" />
          </div>
        </div>
      </div>

      {/* Center content */}
      <div
        className="relative z-20 flex h-full flex-col items-center justify-center px-6 text-center"
        style={{ opacity: fade }}
      >
        {/* Eyebrow */}
        <div className="flex items-center gap-3 text-[10px] sm:text-[11px] uppercase tracking-[0.5em] text-[#c8b98a] hero-fade" style={{ animationDelay: "0.1s" }}>
          <span className="h-px w-8 bg-[#c9a84c]/60" />
          Make with India · For the World
          <span className="h-px w-8 bg-[#c9a84c]/60" />
        </div>

        {/* Headline */}
        <h1 className="mt-7 font-serif-display text-[19vw] leading-[0.9] sm:text-[15vw] lg:text-[12rem] hero-fade" style={{ animationDelay: "0.25s" }}>
          <span className="text-gold-gradient italic">XII</span>{" "}
          <span className="text-[#f0e8d5]">NOON</span>
        </h1>

        {/* Subhead */}
        <p className="mt-4 max-w-xl text-sm sm:text-base font-light tracking-[0.18em] text-[#c8b98a] hero-fade" style={{ animationDelay: "0.5s" }}>
          Ultra-Luxury Timekeeping · Since the Beginning of Time
        </p>

        {/* Quote */}
        <p className="mt-10 max-w-2xl font-serif-display text-xl sm:text-2xl lg:text-3xl italic leading-relaxed text-[#f0e8d5]/90 hero-fade" style={{ animationDelay: "0.75s" }}>
          &ldquo;Not a response to the world of luxury —<br className="hidden sm:block" />{" "}
          India&rsquo;s assertion within it.&rdquo;
        </p>

        {/* CTAs */}
        <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:gap-5 hero-fade" style={{ animationDelay: "1s" }}>
          <a
            href="#collection"
            className="group relative inline-flex items-center justify-center overflow-hidden border border-[#c9a84c] px-9 py-3.5 text-[11px] uppercase tracking-[0.34em] text-[#e8c97a] transition-colors duration-500 hover:text-[#080704]"
          >
            <span className="absolute inset-0 -z-0 translate-y-full bg-[#c9a84c] transition-transform duration-500 group-hover:translate-y-0" />
            <span className="relative z-10">View Collection</span>
          </a>
          <a
            href="#enquiry"
            className="inline-flex items-center justify-center border border-[rgba(201,168,76,0.3)] px-9 py-3.5 text-[11px] uppercase tracking-[0.34em] text-[#c8b98a] transition-all duration-500 hover:border-[#c9a84c] hover:text-[#e8c97a]"
          >
            Private Enquiry
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ opacity: fade }}
      >
        <span className="text-[9px] uppercase tracking-[0.4em] text-[#c8b98a]/70">
          Scroll
        </span>
        <ArrowDown className="h-4 w-4 animate-bounce text-[#c9a84c]" />
      </div>

      {/* Side vertical labels */}
      <div className="absolute left-5 top-1/2 z-20 hidden -translate-y-1/2 lg:block">
        <span className="vertical-rl text-[9px] uppercase tracking-[0.5em] text-[#c8b98a]/60">
          Est. Bharat — MMXXV
        </span>
      </div>
      <div className="absolute right-5 top-1/2 z-20 hidden -translate-y-1/2 lg:block">
        <span className="vertical-rl text-[9px] uppercase tracking-[0.5em] text-[#c8b98a]/60">
          Haute Horlogerie
        </span>
      </div>
    </section>
  );
}
