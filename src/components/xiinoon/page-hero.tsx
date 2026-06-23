"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Reveal } from "./reveal";

type Crumb = { label: string; href?: string };

export function PageHero({
  eyebrow,
  title,
  titleAccent,
  subtitle,
  image,
  align = "center",
  crumbs = [],
}: {
  eyebrow: string;
  title: string;
  titleAccent?: string;
  subtitle?: string;
  image: string;
  align?: "center" | "left";
  crumbs?: Crumb[];
}) {
  const isLeft = align === "left";
  return (
    <section className="relative flex h-[78svh] min-h-[520px] w-full items-center overflow-hidden vignette">
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center kenburns"
          style={{ backgroundImage: `url('${image}')`, filter: "brightness(0.45) contrast(1.05)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#080704]/85 via-[#080704]/40 to-[#080704]" />
        {!isLeft && <div className="absolute inset-0 bg-gradient-to-r from-[#080704]/70 via-transparent to-[#080704]/70" />}
      </div>

      <div className="pointer-events-none absolute inset-5 sm:inset-8 border border-[rgba(201,168,76,0.16)]" />

      <div className={`relative z-20 mx-auto w-full max-w-[1400px] px-5 sm:px-8 ${isLeft ? "text-left" : "text-center"}`}>
        <Reveal>
          {/* Breadcrumbs */}
          {crumbs.length > 0 && (
            <nav
              aria-label="Breadcrumb"
              className={`mb-7 flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-[#c8b98a]/70 ${isLeft ? "justify-start" : "justify-center"}`}
            >
              <Link href="/" className="transition-colors hover:text-[#e8c97a]">
                Home
              </Link>
              {crumbs.map((c) => (
                <span key={c.label} className="flex items-center gap-2">
                  <ChevronRight className="h-3 w-3 text-[#c9a84c]/50" />
                  {c.href ? (
                    <Link href={c.href} className="transition-colors hover:text-[#e8c97a]">
                      {c.label}
                    </Link>
                  ) : (
                    <span className="text-[#e8c97a]">{c.label}</span>
                  )}
                </span>
              ))}
            </nav>
          )}

          <p className="text-[11px] uppercase tracking-[0.45em] text-[#c9a84c]">
            {eyebrow}
          </p>
          <h1 className="mt-5 font-serif-display text-5xl sm:text-6xl lg:text-7xl leading-[0.95] text-[#f0e8d5]">
            {title}{" "}
            {titleAccent && (
              <span className="text-gold-gradient italic">{titleAccent}</span>
            )}
          </h1>
          {subtitle && (
            <p className={`mt-6 max-w-2xl text-base font-light leading-relaxed text-[#c8b98a] ${isLeft ? "" : "mx-auto"}`}>
              {subtitle}
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
