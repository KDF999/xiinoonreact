import Link from "next/link";
import { SiteShell } from "@/components/xiinoon/site-shell";
import { PageHero } from "@/components/xiinoon/page-hero";
import { Reveal } from "@/components/xiinoon/reveal";
import { Philosophy } from "@/components/xiinoon/philosophy";
import { Craft } from "@/components/xiinoon/craft";
import { Standards } from "@/components/xiinoon/standards";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Brand Story — XII NOON",
  description:
    "Make with India for the World. The story, philosophy, craft, and standards of XII NOON — ultra-luxury timekeeping conceived as heirloom.",
};

const PILLARS = [
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

export default function BrandStoryPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="The Maison"
        title="Brand"
        titleAccent="Story"
        subtitle="Make with India for the World. Timekeeping as Position. Timekeeping as Legacy. This is not a brand — it is a position."
        image="/images/atelier.webp"
        crumbs={[{ label: "Brand Story" }]}
        align="center"
      />

      {/* Manifesto */}
      <section className="relative bg-[#080704] py-24 sm:py-32">
        <div className="mx-auto max-w-3xl px-5 sm:px-8 text-center">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.45em] text-[#c9a84c]">
              Manifesto
            </p>
            <p className="mt-8 font-serif-display text-2xl sm:text-3xl lg:text-4xl italic leading-relaxed text-[#f0e8d5]/90">
              Not a response to the world of luxury —
              <br />
              India&rsquo;s assertion within it.
            </p>
            <div className="mt-10 gold-rule w-32 mx-auto" />
            <p className="mt-8 text-base font-light leading-relaxed text-[#c8b98a]">
              XII NOON was founded upon a single conviction: that Bharat&rsquo;s
              centuries of craft, symbolism, and ceremonial authority deserve a
              place at the summit of global luxury — not as a participant, but as
              a definer. Each object we create is conceived as an heirloom, not
              an acquisition; as a position, not a possession.
            </p>
          </Reveal>
        </div>
      </section>

      <Philosophy />
      <Craft />

      {/* Standards recap (inline, brand-story specific) */}
      <section className="relative bg-[#0a0905] py-24 sm:py-32">
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
            {PILLARS.map((s, i) => (
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

      {/* Closing CTA */}
      <section className="relative overflow-hidden bg-[#080704] py-28 text-center">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[50vh] w-[50vh] -translate-x-1/2 rounded-full bg-[#c9a84c]/8 blur-[120px]" />
        <Reveal className="relative">
          <p className="font-serif-display text-3xl sm:text-4xl italic text-[#f0e8d5]">
            XII NOON does not follow time.
          </p>
          <p className="mt-3 font-serif-display text-3xl sm:text-4xl italic text-gold-gradient">
            XII NOON defines it.
          </p>
          <Link
            href="/private-enquiry"
            className="group mt-10 inline-flex items-center gap-3 border border-[#c9a84c] px-8 py-4 text-[11px] uppercase tracking-[0.32em] text-[#e8c97a] transition-colors duration-500 hover:bg-[#c9a84c] hover:text-[#080704]"
          >
            Begin a Private Conversation
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </section>
    </SiteShell>
  );
}
