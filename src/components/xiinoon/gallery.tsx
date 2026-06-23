"use client";

import { Reveal } from "./reveal";

const GALLERY = [
  {
    src: "/images/gallery-2.webp",
    title: "The Sovereign Bangle",
    note: "Gold, Colombian emerald, diamonds",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    src: "/images/gallery-1.webp",
    title: "Vajra, Crown Detail",
    note: "Pavé diamond crown, hand-set",
    span: "",
  },
  {
    src: "/images/gallery-3.webp",
    title: "Emerald Signature",
    note: "Rectangular emerald dial, diamond bezel",
    span: "",
  },
];

export function Gallery() {
  return (
    <section
      id="media"
      className="relative bg-[#0a0905] py-24 sm:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8">
        <Reveal className="mx-auto mb-16 max-w-3xl text-center">
          <p className="text-[11px] uppercase tracking-[0.45em] text-[#c9a84c]">
            Media
          </p>
          <h2 className="mt-6 font-serif-display text-4xl sm:text-5xl lg:text-6xl leading-tight text-[#f0e8d5]">
            Details of the Maison
          </h2>
          <p className="mt-6 text-base font-light text-[#c8b98a]">
            Fragments of the permanent — observed closely.
          </p>
        </Reveal>

        <div className="grid auto-rows-[220px] gap-4 sm:gap-5 md:grid-cols-3">
          {GALLERY.map((g, i) => (
            <Reveal
              key={g.src}
              delay={((i + 1) as 1 | 2 | 3)}
              className={`group relative overflow-hidden border border-[rgba(201,168,76,0.16)] ${g.span}`}
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[1400ms] ease-out group-hover:scale-110"
                style={{ backgroundImage: `url('${g.src}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080704] via-transparent to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="absolute inset-x-0 bottom-0 translate-y-2 p-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <p className="font-serif-display text-xl text-[#f0e8d5]">
                  {g.title}
                </p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.25em] text-[#e8c97a]">
                  {g.note}
                </p>
              </div>
              <span className="absolute right-4 top-4 h-2 w-2 rotate-45 border border-[#c9a84c]/50" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
