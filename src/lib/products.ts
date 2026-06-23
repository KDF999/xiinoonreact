export type ProductSpec = {
  movement?: string;
  caseMaterial?: string;
  dial?: string;
  stones?: string;
  edition?: string;
  origin?: string;
};

export type Product = {
  slug: string; // route path, e.g. "tricolor"
  id: string;
  name: string;
  shortName: string;
  category: string;
  tag: string;
  blurb: string;
  image: string;
  accent: string;
  details: ProductSpec;
  longDescription: string;
  heritage: string;
  highlights: { title: string; body: string }[];
};

export const PRODUCTS: Product[] = [
  {
    slug: "tricolor",
    id: "tricolor",
    name: "The Tricolor Edition",
    shortName: "Tricolor",
    category: "The Watch",
    tag: "Limited",
    blurb:
      "India's sovereignty, crystallised in horology. Saffron sapphires, white diamonds, green emeralds. The Ashoka Chakra rendered in platinum filigree.",
    image: "/images/tricolor.webp",
    accent: "#e8a23a",
    details: {
      movement: "Manual-wind Tourbillon, 72h reserve",
      caseMaterial: "950 Platinum, 39mm",
      dial: "Ashoka Chakra in platinum filigree",
      stones: "Saffron sapphires · White diamonds · Colombian emeralds",
      edition: "Limited to 12 numbered pieces",
      origin: "Conceived & crafted in Bharat",
    },
    longDescription:
      "The Tricolor Edition is the maison's thesis — that a nation's spirit can be set into horology without compromise. Twenty-four spokes of the Ashoka Chakra are reproduced in hand-laid platinum filigree upon the dial, each stone placed to mirror the order of the national flag. It is not a motif. It is a declaration.",
    heritage:
      "The Ashoka Chakra — twenty-four spokes of dharma — has governed the moral compass of the subcontinent for over two millennia. XII NOON transposes this wheel of law onto the dial, not as decoration, but as the philosophical centre of the timepiece. Saffron for courage, white for truth, green for faith: the tricolour rendered in the language of stones.",
    highlights: [
      {
        title: "The Ashoka Chakra",
        body: "Twenty-four spokes hand-laid in platinum filigree, mirroring the order of the national flag.",
      },
      {
        title: "Sovereign Stones",
        body: "Saffron sapphires, white diamonds and Colombian emeralds — set by a single master lapidary.",
      },
      {
        title: "Twelve, Numbered",
        body: "A finite allocation. Twelve pieces, twelve custodians, each recorded in the maison's ledger.",
      },
    ],
  },
  {
    slug: "emirati-edition",
    id: "emirati",
    name: "The Emirati Edition",
    shortName: "Emirati",
    category: "The Watch",
    tag: "Signature",
    blurb:
      "A tribute to the union of two sovereign cultures. Full pavé diamond case, Arabic geometric motifs cast in 18K gold.",
    image: "/images/emirati.webp",
    accent: "#e8c97a",
    details: {
      movement: "Automatic, 65h reserve",
      caseMaterial: "18K Gold, full pavé diamond, 40mm",
      dial: "Arabic eight-point star geometric motif",
      stones: "Brilliant-cut diamonds, full pavé",
      edition: "By private allocation",
      origin: "Conceived in Bharat, dedicated to the Emirates",
    },
    longDescription:
      "The Emirati Edition honours the bond between two cultures that measure wealth in permanence, not price. The case disappears beneath a continuous field of brilliant-cut diamonds, while the dial carries the eight-point star — an emblem of cosmic order cast in 18K gold. A sovereign object for a sovereign union.",
    heritage:
      "The eight-point star — Khatim Sulayman — is an emblem of cosmic order across the Arab world, a geometry of balance and divine proportion. XII NOON casts it in 18K gold upon the dial, encircling a case that vanishes beneath a continuous field of diamonds. It is a dialogue between Bharat's craft and the Emirates' vision of permanence.",
    highlights: [
      {
        title: "Full Pavé Case",
        body: "The case disappears beneath a continuous field of brilliant-cut diamonds, set by hand.",
      },
      {
        title: "Khatim Sulayman",
        body: "The Arabic eight-point star cast in 18K gold — an emblem of cosmic order upon the dial.",
      },
      {
        title: "Two Sovereigns",
        body: "Conceived in Bharat, dedicated to the Emirates — a union measured in permanence, not price.",
      },
    ],
  },
  {
    slug: "signature",
    id: "signature",
    name: "The Signature",
    shortName: "Signature",
    category: "The Watch",
    tag: "Feminine",
    blurb:
      "Crafted for the woman who defines her own legacy. Emerald-cut diamonds, Colombian emerald inlay, sculpted feminine silhouette.",
    image: "/images/signature.webp",
    accent: "#9fb88a",
    details: {
      movement: "High-precision quartz, jeweled",
      caseMaterial: "18K Rose Gold, sculpted, 34mm",
      dial: "Colombian emerald inlay, mother-of-pearl",
      stones: "Emerald-cut diamonds, Colombian emerald",
      edition: "Extended by invitation",
      origin: "Conceived & crafted in Bharat",
    },
    longDescription:
      "The Signature is not a smaller version of a man's watch. It is conceived from the first sketch for the woman whose legacy is her own design. A sculpted rose-gold silhouette cradles a dial of Colombian emerald and mother-of-pearl, ringed by emerald-cut diamonds. Feminine, without apology; sovereign, without question.",
    heritage:
      "The Signature answers a question the maison posed to itself: what does a timepiece become when it is conceived, from the first line, for the woman who defines her own legacy? The answer is a sculpted silhouette in rose gold, a dial of Colombian emerald and mother-of-pearl, and a bezel of emerald-cut diamonds — feminine without diminution, sovereign without compromise.",
    highlights: [
      {
        title: "Sculpted Silhouette",
        body: "A 34mm rose-gold case drawn for the feminine wrist — never a reduced men's design.",
      },
      {
        title: "Colombian Emerald",
        body: "A dial of emerald inlay and mother-of-pearl, ringed by emerald-cut diamonds.",
      },
      {
        title: "By Invitation",
        body: "Extended, never offered — each custodian chosen by the maison.",
      },
    ],
  },
  {
    slug: "vajra-pen",
    id: "vajra",
    name: "The Vajra Pen",
    shortName: "Vajra Pen",
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
    heritage:
      "In the Vedas, the Vajra is the thunderbolt of Indra — indestructible, irresistible, the instrument of divine will. XII NOON translates this into an object of intent: a hand-turned barrel of ebonite and 18K gold, a nib tuned by a single master until it sings, and a crown set with pavé diamonds. To write with the Vajra is to make a mark that intends to last.",
    highlights: [
      {
        title: "Indra's Thunderbolt",
        body: "The Vajra motif, hand-engraved upon the barrel — the indestructible instrument of will.",
      },
      {
        title: "18K Gold Nib",
        body: "Tuned by a single master until the line is true; offered in grades of custom temper.",
      },
      {
        title: "Pavé Diamond Crown",
        body: "The crown set with pavé diamonds — a sovereign terminus to every stroke.",
      },
    ],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getRelatedProducts(slug: string): Product[] {
  return PRODUCTS.filter((p) => p.slug !== slug);
}
