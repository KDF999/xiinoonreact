import Link from "next/link";
import { SiteShell } from "@/components/xiinoon/site-shell";
import { PageHero } from "@/components/xiinoon/page-hero";
import { Reveal } from "@/components/xiinoon/reveal";
import { ArrowRight, ExternalLink } from "lucide-react";

export const metadata = {
  title: "Media — XII NOON",
  description:
    "Fragments of the permanent — details of the XII NOON collection, observed closely. Press and media coverage.",
};

const MEDIA = [
  { src: "/images/tricolor.webp", title: "The Tricolor Edition", note: "Saffron sapphires · White diamonds · Colombian emeralds", span: "md:col-span-2 md:row-span-2" },
  { src: "/images/emirati.webp", title: "The Emirati Edition", note: "Full pavé diamond case, Arabic gold motifs", span: "" },
  { src: "/images/signature.webp", title: "The Signature", note: "Oval emerald dial, pavé diamond bezel", span: "" },
  { src: "/images/vajra.webp", title: "The Vajra Pen", note: "Hand-turned barrel, pavé diamond crown", span: "md:row-span-2" },
  { src: "/images/gallery-2.webp", title: "Emerald Dial Study", note: "Gold, green gemstone, pavé diamonds", span: "" },
  { src: "/images/gallery-3.webp", title: "Emerald & Gold Study", note: "Gold, Colombian emerald, pavé diamonds", span: "" },
  { src: "/images/gallery-1.webp", title: "Vajra, Crown Detail", note: "Pavé diamond crown, hand-set", span: "" },
  { src: "/images/atelier.webp", title: "The Atelier", note: "400+ hours of handwork per piece", span: "md:col-span-2" },
  { src: "/images/hero.webp", title: "Object Study", note: "Diamond bezel, tricolor detailing", span: "" },
];

const PRESS = [
  {
    src: "/images/media/01.webp",
    outlet: "The Tribune",
    title: "XII NOON — Luxury Timepieces & Pen Collection",
    note: "Feature on the maison's brand philosophy, rarity, and India's role in global luxury.",
  },
  {
    src: "/images/media/02.webp",
    outlet: "The Tribune",
    title: "India's New Sovereign Arrival in Global Ultra-Luxury Timekeeping",
    note: "Coverage of XII NOON's entry into the global ultra-luxury timekeeping market.",
  },
  {
    src: "/images/media/03.webp",
    outlet: "ANI",
    title: "XII NOON — A New Ultra-Luxury Timekeeping Brand from India",
    note: "Launch announcement, philosophy, and the unique ownership model.",
  },
  {
    src: "/images/media/04.webp",
    outlet: "Editorial Feature",
    title: "The Philosophy of Rarity & Exclusivity",
    note: "An in-depth feature on the maison's product lines and approach to exclusivity.",
  },
  {
    src: "/images/media/05.webp",
    outlet: "ANI",
    title: "XII NOON — Founder, Philosophy & Global Positioning",
    note: "Profile of the founder and the brand's positioning in the global luxury economy.",
  },
];

export default function MediaPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Media"
        title="Details of the"
        titleAccent="Maison"
        subtitle="Fragments of the permanent — observed closely. Each image a study of the craft, the stones, and the intent that defines XII NOON."
        image="/images/hero.webp"
        crumbs={[{ label: "Media" }]}
        align="center"
      />

      {/* Object gallery */}
      <section className="relative bg-[#0a0905] py-24 sm:py-32">
        <div className="mx-auto max-w-[1500px] px-5 sm:px-8">
          <Reveal className="mb-14 text-center">
            <p className="text-[11px] uppercase tracking-[0.45em] text-[#c9a84c]">
              The Collection
            </p>
            <h2 className="mt-5 font-serif-display text-4xl sm:text-5xl text-[#f0e8d5]">
              Object Studies
            </h2>
          </Reveal>
          <div className="grid auto-rows-[220px] gap-4 sm:gap-5 md:grid-cols-3">
            {MEDIA.map((g, i) => (
              <Reveal
                key={g.src + i}
                delay={(((i % 3) + 1) as 1 | 2 | 3)}
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

      {/* Press & Media Coverage */}
      <section className="relative bg-[#080704] py-24 sm:py-32">
        <div className="mx-auto max-w-[1500px] px-5 sm:px-8">
          <Reveal className="mb-16 text-center">
            <p className="text-[11px] uppercase tracking-[0.45em] text-[#c9a84c]">
              Press &amp; Media Coverage
            </p>
            <h2 className="mt-5 font-serif-display text-4xl sm:text-5xl text-[#f0e8d5]">
              The Maison in Print
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base font-light leading-relaxed text-[#c8b98a]">
              XII NOON as covered by the press — a record of the maison&rsquo;s
              arrival and assertion in global ultra-luxury.
            </p>
          </Reveal>

          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {PRESS.map((p, i) => (
              <Reveal
                key={p.src}
                delay={(((i % 3) + 1) as 1 | 2 | 3)}
                className="collection-card group flex flex-col"
              >
                <div className="card-img-wrap relative aspect-[4/3] overflow-hidden border-b border-[rgba(201,168,76,0.16)]">
                  <div
                    className="card-img absolute inset-0 bg-cover bg-top"
                    style={{ backgroundImage: `url('${p.src}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080704]/60 via-transparent to-transparent" />
                  <span className="absolute left-4 top-4 border border-[rgba(201,168,76,0.5)] bg-[#080704]/70 px-3 py-1 text-[9px] uppercase tracking-[0.3em] text-[#e8c97a] backdrop-blur-sm">
                    {p.outlet}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-serif-display text-xl leading-snug text-[#f0e8d5]">
                    {p.title}
                  </h3>
                  <div className="mt-3 h-px w-8 bg-[#c9a84c]/50" />
                  <p className="mt-4 flex-1 text-sm font-light leading-relaxed text-[#c8b98a]">
                    {p.note}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="relative bg-[#0a0905] py-24 text-center">
        <div className="mx-auto max-w-[900px] px-5 sm:px-8">
          <Reveal>
            <p className="font-serif-display text-2xl sm:text-3xl italic text-[#f0e8d5]/90">
              The collection awaits its custodians.
            </p>
            <Link
              href="/private-enquiry"
              className="group mt-8 inline-flex items-center gap-3 border border-[#c9a84c] px-8 py-4 text-[11px] uppercase tracking-[0.32em] text-[#e8c97a] transition-colors duration-500 hover:bg-[#c9a84c] hover:text-[#080704]"
            >
              Request a Private Viewing
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </section>
    </SiteShell>
  );
}
