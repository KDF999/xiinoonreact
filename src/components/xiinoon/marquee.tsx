"use client";

const ITEMS = [
  "Tricolor Edition",
  "Vajra Pen",
  "Make with India for the World",
  "Timekeeping as Legacy",
  "Emirati Edition",
  "Signature",
  "Sovereignty",
  "Scarcity",
  "Permanence",
];

export function Marquee() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <section
      aria-hidden
      className="relative border-y border-[rgba(201,168,76,0.16)] bg-[#0a0905] py-5 overflow-hidden"
    >
      <div className="marquee-track">
        {row.map((item, i) => (
          <span key={i} className="flex items-center">
            <span className="font-serif-display text-2xl sm:text-3xl italic text-[#f0e8d5]/85">
              {item}
            </span>
            <span className="mx-7 text-[#c9a84c]">◇</span>
          </span>
        ))}
      </div>
      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#0a0905] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#0a0905] to-transparent" />
    </section>
  );
}
