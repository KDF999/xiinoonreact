"use client";

import { Reveal } from "./reveal";

const STANDARDS = [
  {
    no: "I",
    title: "Sovereignty",
    body: "Born in Bharat. Rooted in centuries of craft, symbolism, and ceremonial authority.",
  },
  {
    no: "II",
    title: "Scarcity",
    body: "Production is intentionally restricted. Possession is never offered — it is extended.",
  },
  {
    no: "III",
    title: "Legacy",
    body: "Every XII NOON creation is designed to be inherited, not merely owned. Permanence is the point.",
  },
];

export function Standards() {
  return (
    <section
      id="standards"
      className="relative bg-[#0a0905] py-24 sm:py-32 lg:py-40"
    >
      <div className="pointer-events-none absolute left-0 top-1/2 hidden -translate-y-1/2 select-none font-serif-display text-[24rem] leading-none text-[#c9a84c]/[0.02] lg:block">
        III
      </div>

      <div className="mx-auto max-w-[1300px] px-5 sm:px-8">
        <Reveal className="text-center">
          <p className="text-[11px] uppercase tracking-[0.45em] text-[#c9a84c]">
            What We Stand For
          </p>
          <h2 className="mt-6 font-serif-display text-4xl sm:text-5xl lg:text-6xl leading-tight text-[#f0e8d5]">
            The XII Noon Standard
          </h2>
        </Reveal>

        <div className="mt-16">
          {STANDARDS.map((s, i) => (
            <Reveal
              key={s.no}
              className="group grid items-center gap-6 border-t border-[rgba(201,168,76,0.16)] py-12 md:grid-cols-12 md:gap-10"
            >
              <div className="md:col-span-2">
                <span className="font-serif-display text-7xl italic text-[#c9a84c]/40 transition-colors duration-700 group-hover:text-[#c9a84c]">
                  {s.no}
                </span>
              </div>
              <div className="md:col-span-4">
                <h3 className="font-serif-display text-4xl text-[#f0e8d5]">
                  {s.title}
                </h3>
              </div>
              <div className="md:col-span-6">
                <p className="text-base font-light leading-relaxed text-[#c8b98a]">
                  {s.body}
                </p>
              </div>
            </Reveal>
          ))}
          <div className="border-t border-[rgba(201,168,76,0.16)]" />
        </div>
      </div>
    </section>
  );
}
