"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Reveal } from "./reveal";

type Product = {
  id: string;
  name: string;
  category: string;
  tag: string;
  blurb: string;
  image: string;
  accent: string;
  details: {
    movement?: string;
    case?: string;
    dial?: string;
    stones?: string;
    edition?: string;
    origin?: string;
  };
  longDescription: string;
};

const PRODUCTS: Product[] = [
  {
    id: "tricolor",
    name: "The Tricolor Edition",
    category: "The Watch",
    tag: "Limited",
    blurb:
      "India's sovereignty, crystallised in horology. Saffron sapphires, white diamonds, green emeralds. The Ashoka Chakra rendered in platinum filigree.",
    image: "/images/tricolor.webp",
    accent: "#e8a23a",
    details: {
      movement: "Manual-wind tourbillon, 72h reserve",
      caseMaterial: "950 Platinum, 39mm",
      dial: "Ashoka Chakra in platinum filigree",
      stones: "Saffron sapphires · White diamonds · Colombian emeralds",
      edition: "Limited to 12 numbered pieces",
      origin: "Conceived & crafted in Bharat",
    },
    longDescription:
      "The Tricolor Edition is the maison's thesis — that a nation's spirit can be set into horology without compromise. Twenty-four spokes of the Ashoka Chakra are reproduced in hand-laid platinum filigree upon the dial, each stone placed to mirror the order of the national flag. It is not a motif. It is a declaration.",
  },
  {
    id: "emirati",
    name: "The Emirati Edition",
    category: "The Watch",
    tag: "Signature",
    blurb:
      "A tribute to the union of two sovereign cultures. Full pavé diamond case, Arabic geometric motifs cast in 18K gold.",
    image: "/images/emirati.webp",
    accent: "#e8c97a",
    details: {
      movement: "Automatic, 65h reserve",
      caseMaterial: "18K gold, full pavé diamond, 40mm",
      dial: "Arabic eight-point star geometric motif",
      stones: "Brilliant-cut diamonds, full pavé",
      edition: "By private allocation",
      origin: "Conceived in Bharat, dedicated to the Emirates",
    },
    longDescription:
      "The Emirati Edition honours the bond between two cultures that measure wealth in permanence, not price. The case disappears beneath a continuous field of brilliant-cut diamonds, while the dial carries the eight-point star — an emblem of cosmic order cast in 18K gold. A sovereign object for a sovereign union.",
  },
  {
    id: "signature",
    name: "The Signature",
    category: "The Watch",
    tag: "Feminine",
    blurb:
      "Crafted for the woman who defines her own legacy. A teardrop Colombian emerald encircled by pavé diamonds, set in hand-worked gold.",
    image: "/images/signature.webp",
    accent: "#9fb88a",
    details: {
      movement: "High-precision quartz, jeweled",
      caseMaterial: "18K Gold, hand-worked, sculpted",
      dial: "Teardrop Colombian emerald centrepiece",
      stones: "Pavé diamonds, Colombian emerald",
      edition: "Extended by invitation",
      origin: "Conceived & crafted in Bharat",
    },
    longDescription:
      "The Signature is not a smaller version of a man's object. It is conceived from the first sketch for the woman whose legacy is her own design. A teardrop Colombian emerald holds the centre, encircled by a continuous field of pavé diamonds set in hand-worked gold — feminine without diminution, sovereign without compromise.",
  },
  {
    id: "vajra",
    name: "The Vajra Pen",
    category: "The Writing Instrument",
    tag: "Object",
    blurb:
      "The thunderbolt of Indra, reimagined as an instrument of intent. 18K gold nib, hand-turned barrel, pavé diamond crown.",
    image: "/images/vajra.webp",
    accent: "#c9a84c",
    details: {
      movement: "Cartridge / converter filling",
      caseMaterial: "Hand-turned ebonite & 18K gold barrel",
      dial: "Vajra thunderbolt motif, hand-engraved",
      stones: "Pavé diamond crown",
      edition: "Numbered series, by allocation",
      origin: "Conceived & crafted in Bharat",
    },
    longDescription:
      "The Vajra — the thunderbolt of Indra, the indestructible instrument of will. XII NOON reimagines it as a writing instrument: a hand-turned barrel, an 18K gold nib tuned by a single master, and a crown set with pavé diamonds. To write with the Vajra is to commit intent to permanence.",
  },
];

function ProductCard({
  product,
  index,
  onOpen,
}: {
  product: Product;
  index: number;
  onOpen: () => void;
}) {
  return (
    <Reveal delay={((index % 2) + 1) as 1 | 2}>
      <article className="collection-card group flex h-full flex-col">
        <div className="card-img-wrap relative aspect-[4/5] overflow-hidden">
          <div
            className="card-img absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${product.image}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080704] via-transparent to-transparent" />
          <span className="absolute left-5 top-5 border border-[rgba(201,168,76,0.5)] bg-[#080704]/60 px-3 py-1 text-[9px] uppercase tracking-[0.3em] text-[#e8c97a] backdrop-blur-sm">
            {product.tag}
          </span>
          <button
            onClick={onOpen}
            className="absolute bottom-5 right-5 flex h-12 w-12 items-center justify-center rounded-full border border-[#c9a84c]/60 bg-[#080704]/60 text-[#e8c97a] opacity-0 backdrop-blur-sm transition-all duration-500 group-hover:opacity-100 hover:bg-[#c9a84c] hover:text-[#080704]"
            aria-label={`Discover ${product.name}`}
          >
            <Plus className="h-5 w-5" />
          </button>
          <span className="absolute bottom-5 left-5 text-[10px] uppercase tracking-[0.3em] text-[#c8b98a]">
            {product.category}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-7">
          <h3 className="font-serif-display text-3xl leading-tight text-[#f0e8d5]">
            {product.name}
          </h3>
          <div
            className="mt-3 h-px w-10"
            style={{ background: product.accent }}
          />
          <p className="mt-4 flex-1 text-sm font-light leading-relaxed text-[#c8b98a]">
            {product.blurb}
          </p>
          <button
            onClick={onOpen}
            className="group/btn mt-6 inline-flex items-center gap-2 self-start text-[11px] uppercase tracking-[0.32em] text-[#e8c97a] transition-colors hover:text-[#f0e8d5]"
          >
            Discover
            <span className="inline-block h-px w-6 bg-current transition-all duration-500 group-hover/btn:w-10" />
          </button>
        </div>
      </article>
    </Reveal>
  );
}

function ProductDialog({
  product,
  onClose,
}: {
  product: Product | null;
  onClose: () => void;
}) {
  return (
    <div
      className={`fixed inset-0 z-[85] transition-all duration-500 ${
        product ? "visible opacity-100" : "invisible opacity-0"
      }`}
      aria-modal={product ? "true" : "false"}
    >
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      />
      <div
        className={`absolute inset-x-0 bottom-0 max-h-[92vh] overflow-y-auto border-t border-[rgba(201,168,76,0.25)] bg-[#0a0905] transition-transform duration-500 sm:inset-x-auto sm:left-1/2 sm:top-1/2 sm:bottom-auto sm:max-h-[88vh] sm:w-[92%] sm:max-w-5xl sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-sm sm:border ${
          product ? "translate-y-0" : "translate-y-full sm:translate-y-0"
        }`}
      >
        {product && (
          <div className="grid md:grid-cols-2">
            <div className="relative aspect-square md:aspect-auto md:min-h-[560px]">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('${product.image}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0905]/70 via-transparent to-transparent md:bg-gradient-to-r" />
              <span className="absolute left-5 top-5 border border-[rgba(201,168,76,0.5)] bg-[#080704]/60 px-3 py-1 text-[9px] uppercase tracking-[0.3em] text-[#e8c97a] backdrop-blur-sm">
                {product.tag}
              </span>
            </div>

            <div className="relative p-8 sm:p-10">
              <button
                onClick={onClose}
                className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center text-[#c8b98a] transition-colors hover:text-[#e8c97a]"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
              <p className="text-[10px] uppercase tracking-[0.4em] text-[#c9a84c]">
                {product.category}
              </p>
              <h3 className="mt-4 font-serif-display text-4xl leading-tight text-[#f0e8d5]">
                {product.name}
              </h3>
              <div
                className="mt-4 h-px w-16"
                style={{ background: product.accent }}
              />
              <p className="mt-6 text-sm font-light leading-relaxed text-[#c8b98a]">
                {product.longDescription}
              </p>

              <div className="mt-8 space-y-px overflow-hidden border border-[rgba(201,168,76,0.16)] bg-[rgba(201,168,76,0.16)]">
                {Object.entries(product.details).map(([k, v]) => (
                  <div
                    key={k}
                    className="grid grid-cols-3 gap-4 bg-[#0a0905] px-5 py-3.5"
                  >
                    <span className="text-[10px] uppercase tracking-[0.25em] text-[#c9a84c]">
                      {k}
                    </span>
                    <span className="col-span-2 text-sm font-light text-[#f0e8d5]/90">
                      {v}
                    </span>
                  </div>
                ))}
              </div>

              <a
                href="#enquiry"
                onClick={onClose}
                className="mt-8 inline-flex w-full items-center justify-center border border-[#c9a84c] px-7 py-3.5 text-[11px] uppercase tracking-[0.32em] text-[#e8c97a] transition-colors duration-500 hover:bg-[#c9a84c] hover:text-[#080704] sm:w-auto"
              >
                Enquire Privately
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function Collection() {
  const [active, setActive] = useState<Product | null>(null);

  return (
    <section
      id="collection"
      className="relative bg-[#0a0905] py-24 sm:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8">
        <Reveal className="mx-auto mb-16 max-w-3xl text-center sm:mb-20">
          <p className="text-[11px] uppercase tracking-[0.45em] text-[#c9a84c]">
            Four Objects of Permanence
          </p>
          <h2 className="mt-6 font-serif-display text-4xl sm:text-5xl lg:text-6xl leading-tight text-[#f0e8d5]">
            The Collection
          </h2>
          <p className="mt-6 text-base font-light text-[#c8b98a]">
            Each conceived as an heirloom, not an acquisition.
          </p>
        </Reveal>

        <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
          {PRODUCTS.map((p, i) => (
            <ProductCard
              key={p.id}
              product={p}
              index={i}
              onOpen={() => setActive(p)}
            />
          ))}
        </div>
      </div>

      <ProductDialog product={active} onClose={() => setActive(null)} />
    </section>
  );
}
