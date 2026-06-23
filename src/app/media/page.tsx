import Link from "next/link";
import { SiteShell } from "@/components/xiinoon/site-shell";
import { PageHero } from "@/components/xiinoon/page-hero";
import { Reveal } from "@/components/xiinoon/reveal";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Media — XII NOON",
  description:
    "Fragments of the permanent — details of the XII NOON collection, observed closely.",
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

      <section className="relative bg-[#0a0905] py-24 sm:py-32">
        <div className="mx-auto max-w-[1500px] px-5 sm:px-8">
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

          <Reveal className="mt-20 text-center">
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
