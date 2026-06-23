"use client";

import { useEffect, useRef, useState } from "react";
import { useReveal } from "./use-reveal";

function useCountUp(target: number, run: boolean, duration = 2000) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!run) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      setValue(Math.round(eased * target));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, run, duration]);
  return value;
}

const STATS = [
  { value: 400, suffix: "+", label: "Hours of handwork per piece" },
  { value: 24, suffix: "", label: "Ashoka Chakra spokes, hand-laid" },
  { value: 100, suffix: "%", label: "Stones set by a master lapidary" },
  { value: 1, suffix: " of 1", label: "No two objects are identical" },
];

const STEPS = [
  {
    n: "01",
    t: "Conception",
    d: "Each object begins as a thesis — a position the maison intends to assert. Drawn by hand, debated for months.",
  },
  {
    n: "02",
    t: "Atelier",
    d: "Master lapidaries, engravers, and horologists translate intent into matter. 400+ hours. No compromise.",
  },
  {
    n: "03",
    t: "Extension",
    d: "The finished object is never sold. It is extended — to a custodian chosen by the maison, to be inherited.",
  },
];

function StatBlock({
  stat,
  run,
  index,
}: {
  stat: (typeof STATS)[number];
  run: boolean;
  index: number;
}) {
  const r = useReveal<HTMLDivElement>();
  const v = useCountUp(stat.value, run);
  return (
    <div
      ref={r.ref}
      className={`reveal reveal-d${(index % 4) + 1} ${r.visible ? "is-visible" : ""} relative border-t border-[rgba(201,168,76,0.18)] py-8`}
    >
      <div className="flex items-baseline gap-1">
        <span className="font-serif-display text-5xl sm:text-6xl text-gold-gradient">
          {v}
        </span>
        <span className="font-serif-display text-2xl text-[#e8c97a]">
          {stat.suffix}
        </span>
      </div>
      <p className="mt-3 text-xs uppercase tracking-[0.22em] text-[#c8b98a]">
        {stat.label}
      </p>
    </div>
  );
}

function StepCard({ step, index }: { step: (typeof STEPS)[number]; index: number }) {
  const r = useReveal<HTMLDivElement>();
  return (
    <div
      ref={r.ref}
      className={`reveal reveal-d${index + 1} ${r.visible ? "is-visible" : ""} bg-[#0a0905] p-9 sm:p-11`}
    >
      <span className="font-serif-display text-5xl italic text-[#c9a84c]/40">
        {step.n}
      </span>
      <h3 className="mt-5 font-serif-display text-2xl text-[#f0e8d5]">
        {step.t}
      </h3>
      <p className="mt-4 text-sm font-light leading-relaxed text-[#c8b98a]">
        {step.d}
      </p>
    </div>
  );
}

export function Craft() {
  const head = useReveal<HTMLDivElement>();
  const statsRef = useRef<HTMLDivElement | null>(null);
  const [statsRun, setStatsRun] = useState(false);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStatsRun(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="craft"
      className="relative overflow-hidden bg-[#080704] py-24 sm:py-32 lg:py-40"
    >
      <div className="absolute inset-x-0 top-0 h-[55vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/atelier.png')",
            filter: "brightness(0.4) grayscale(0.2)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#080704]/40 via-[#080704]/60 to-[#080704]" />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8">
        <div
          ref={head.ref}
          className={`reveal ${head.visible ? "is-visible" : ""} mx-auto max-w-3xl text-center`}
        >
          <p className="text-[11px] uppercase tracking-[0.45em] text-[#c9a84c]">
            The Craft
          </p>
          <h2 className="mt-6 font-serif-display text-4xl sm:text-5xl lg:text-6xl leading-tight text-[#f0e8d5]">
            Seen, Never Rushed.
          </h2>
        </div>

        <div className="mx-auto mt-14 grid max-w-4xl gap-10 text-center md:grid-cols-2 md:text-left">
          <p className="font-serif-display text-2xl italic leading-relaxed text-[#f0e8d5]/90">
            Every dial tells a story older than the brand itself.
          </p>
          <p className="text-sm font-light leading-relaxed text-[#c8b98a]">
            XII NOON draws from the visual grammar of Bharat — architectural
            precision, legacy symbolism, ceremonial geometry — translated into
            horology with uncompromising exactitude. Each timepiece undergoes
            over 400 hours of handwork. No two are identical. Every stone is
            hand-set by a master lapidary.
          </p>
        </div>

        <div
          ref={statsRef}
          className="mt-20 grid grid-cols-2 gap-x-8 gap-y-2 lg:grid-cols-4"
        >
          {STATS.map((s, i) => (
            <StatBlock key={s.label} stat={s} run={statsRun} index={i} />
          ))}
        </div>

        <div className="mt-24 grid gap-px overflow-hidden border border-[rgba(201,168,76,0.16)] bg-[rgba(201,168,76,0.16)] md:grid-cols-3">
          {STEPS.map((step, i) => (
            <StepCard key={step.n} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
