"use client";

import { Reveal } from "./reveal";

const PILLARS = [
  {
    no: "I",
    title: "Production",
    sub: "Is Restricted",
    body: "A finite number of objects will ever leave the atelier. The count is set, the count is final.",
  },
  {
    no: "II",
    title: "Access",
    sub: "Is Controlled",
    body: "No object is sold to the open market. Each acquisition is reviewed, each owner extended an invitation.",
  },
  {
    no: "III",
    title: "Ownership",
    sub: "Extended, Never Offered",
    body: "Possession is a privilege conferred, not a transaction completed. The maison chooses its custodians.",
  },
];

export function Philosophy() {
  return (
    <section
      id="philosophy"
      className="relative bg-[#080704] py-24 sm:py-32 lg:py-40"
    >
      <div className="pointer-events-none absolute -right-10 top-10 select-none font-serif-display text-[28rem] leading-none text-[#c9a84c]/[0.025]">
        XII
      </div>

      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] uppercase tracking-[0.45em] text-[#c9a84c]">
            Philosophy
          </p>
          <h2 className="mt-6 font-serif-display text-4xl sm:text-5xl lg:text-6xl leading-tight text-[#f0e8d5]">
            This is not timekeeping as function.
          </h2>
          <p className="mt-7 text-base font-light leading-relaxed text-[#c8b98a]">
            XII NOON exists at the intersection of sovereignty, scarcity, and
            permanence — where each object is conceived not as a possession, but
            as a position. These are the three immovable pillars upon which the
            maison stands.
          </p>
        </Reveal>

        <div className="mt-20 grid gap-px overflow-hidden border border-[rgba(201,168,76,0.16)] bg-[rgba(201,168,76,0.16)] md:grid-cols-3">
          {PILLARS.map((p, i) => (
            <Reveal
              key={p.no}
              delay={((i + 1) as 1 | 2 | 3)}
              className="group relative bg-[#0a0905] p-9 sm:p-12 transition-colors duration-700 hover:bg-[#0e0c08]"
            >
              <span className="font-serif-display text-7xl italic text-[#c9a84c]/30 transition-colors duration-700 group-hover:text-[#c9a84c]/60">
                {p.no}
              </span>
              <h3 className="mt-6 font-serif-display text-3xl text-[#f0e8d5]">
                {p.title}
              </h3>
              <p className="mt-2 text-[11px] uppercase tracking-[0.34em] text-[#e8c97a]">
                {p.sub}
              </p>
              <div className="mt-6 h-px w-12 bg-[#c9a84c]/50 transition-all duration-700 group-hover:w-24" />
              <p className="mt-6 text-sm font-light leading-relaxed text-[#c8b98a]">
                {p.body}
              </p>
              <span className="absolute right-5 top-5 h-2 w-2 rotate-45 border border-[#c9a84c]/40 transition-transform duration-700 group-hover:rotate-[225deg]" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
