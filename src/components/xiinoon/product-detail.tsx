"use client";

import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import type { Product } from "@/lib/products";
import { Reveal } from "./reveal";
import { PageHero } from "./page-hero";

export function ProductDetail({ product, related }: { product: Product; related: Product[] }) {
  return (
    <>
      <PageHero
        eyebrow={product.category}
        title={product.name.replace("The ", "")}
        crumbs={[{ label: "Collection" }, { label: product.shortName }]}
        image={product.image}
        align="center"
      />

      {/* Story + image */}
      <section className="relative bg-[#080704] py-24 sm:py-32">
        <div className="mx-auto grid max-w-[1400px] gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:items-center">
          <Reveal className="order-2 lg:order-1">
            <p className="text-[11px] uppercase tracking-[0.45em] text-[#c9a84c]">
              The Object
            </p>
            <h2 className="mt-5 font-serif-display text-4xl sm:text-5xl leading-tight text-[#f0e8d5]">
              {product.name}
            </h2>
            <div
              className="mt-5 h-px w-16"
              style={{ background: product.accent }}
            />
            <p className="mt-7 text-base font-light leading-relaxed text-[#c8b98a]">
              {product.longDescription}
            </p>
            <Link
              href="/private-enquiry"
              className="group mt-9 inline-flex items-center gap-3 border border-[#c9a84c] px-7 py-3.5 text-[11px] uppercase tracking-[0.32em] text-[#e8c97a] transition-colors duration-500 hover:bg-[#c9a84c] hover:text-[#080704]"
            >
              Enquire Privately
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>

          <Reveal delay={2} className="order-1 lg:order-2">
            <div className="collection-card group relative aspect-[4/5] overflow-hidden">
              <div
                className="card-img absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('${product.image}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080704]/60 via-transparent to-transparent" />
              <span className="absolute left-5 top-5 border border-[rgba(201,168,76,0.5)] bg-[#080704]/60 px-3 py-1 text-[9px] uppercase tracking-[0.3em] text-[#e8c97a] backdrop-blur-sm">
                {product.tag}
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Heritage */}
      <section className="relative overflow-hidden bg-[#0a0905] py-24 sm:py-32">
        <div
          className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url('${product.image}')`, filter: "blur(8px)" }}
        />
        <div className="absolute inset-0 bg-[#0a0905]/70" />
        <div className="relative mx-auto max-w-3xl px-5 sm:px-8 text-center">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.45em] text-[#c9a84c]">
              Heritage
            </p>
            <p className="mt-8 font-serif-display text-2xl sm:text-3xl italic leading-relaxed text-[#f0e8d5]/90">
              {product.heritage}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Specifications + Highlights */}
      <section className="relative bg-[#080704] py-24 sm:py-32">
        <div className="mx-auto grid max-w-[1400px] gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
          {/* Specs */}
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.45em] text-[#c9a84c]">
              Specifications
            </p>
            <h2 className="mt-5 font-serif-display text-3xl sm:text-4xl text-[#f0e8d5]">
              The Detail
            </h2>
            <div className="mt-8 space-y-px overflow-hidden border border-[rgba(201,168,76,0.16)] bg-[rgba(201,168,76,0.16)]">
              {Object.entries(product.details).map(([k, v]) => (
                <div
                  key={k}
                  className="grid grid-cols-3 gap-4 bg-[#0a0905] px-5 py-4"
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
          </Reveal>

          {/* Highlights */}
          <Reveal delay={2}>
            <p className="text-[11px] uppercase tracking-[0.45em] text-[#c9a84c]">
              Highlights
            </p>
            <h2 className="mt-5 font-serif-display text-3xl sm:text-4xl text-[#f0e8d5]">
              The Essence
            </h2>
            <ul className="mt-8 space-y-6">
              {product.highlights.map((h) => (
                <li key={h.title} className="border-l border-[rgba(201,168,76,0.3)] pl-5">
                  <p className="font-serif-display text-xl text-[#f0e8d5]">
                    {h.title}
                  </p>
                  <p className="mt-1.5 text-sm font-light leading-relaxed text-[#c8b98a]">
                    {h.body}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Related */}
      <section className="relative bg-[#0a0905] py-24 sm:py-32">
        <div className="mx-auto max-w-[1500px] px-5 sm:px-8">
          <Reveal className="mb-14 text-center">
            <p className="text-[11px] uppercase tracking-[0.45em] text-[#c9a84c]">
              Continue
            </p>
            <h2 className="mt-5 font-serif-display text-4xl sm:text-5xl text-[#f0e8d5]">
              The Collection
            </h2>
          </Reveal>
          <div className="grid gap-6 sm:gap-8 md:grid-cols-3">
            {related.map((p, i) => (
              <Reveal key={p.slug} delay={((i + 1) as 1 | 2 | 3)}>
                <Link
                  href={`/${p.slug}`}
                  className="collection-card group flex h-full flex-col"
                >
                  <div className="card-img-wrap relative aspect-[4/5] overflow-hidden">
                    <div
                      className="card-img absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url('${p.image}')` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080704] via-transparent to-transparent" />
                    <span className="absolute left-4 top-4 border border-[rgba(201,168,76,0.5)] bg-[#080704]/60 px-2.5 py-1 text-[8px] uppercase tracking-[0.3em] text-[#e8c97a] backdrop-blur-sm">
                      {p.tag}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-serif-display text-2xl text-[#f0e8d5]">
                      {p.name}
                    </h3>
                    <div className="mt-2 h-px w-8" style={{ background: p.accent }} />
                    <p className="mt-3 flex-1 text-xs font-light leading-relaxed text-[#c8b98a]">
                      {p.blurb}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-[#e8c97a]">
                      Discover <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
