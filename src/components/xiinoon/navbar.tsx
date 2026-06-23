"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const LINKS = [
  { label: "Emirati", href: "#collection" },
  { label: "Signature", href: "#collection" },
  { label: "Vajra Pen", href: "#collection" },
  { label: "Brand Story", href: "#craft" },
  { label: "Media", href: "#standards" },
  { label: "Private Enquiry", href: "#enquiry" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[65] transition-all duration-700 ${
          scrolled
            ? "py-3 backdrop-blur-md bg-[#080704]/80 border-b border-[rgba(201,168,76,0.14)]"
            : "py-5 bg-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-[1500px] items-center justify-between px-5 sm:px-8">
          {/* Logo */}
          <a
            href="#top"
            className="group flex items-center gap-3"
            aria-label="XII NOON home"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(201,168,76,0.5)] text-[#c9a84c]">
              <span className="font-serif-display text-lg leading-none">X</span>
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-serif-display text-xl tracking-[0.3em] text-[#f0e8d5]">
                XII NOON
              </span>
              <span className="mt-1 text-[8px] tracking-[0.45em] text-[#c8b98a]/70 uppercase">
                Ultra-Luxury Timekeeping
              </span>
            </span>
          </a>

          {/* Desktop links */}
          <ul className="hidden items-center gap-7 lg:flex">
            {LINKS.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="gold-underline text-[11px] uppercase tracking-[0.28em] text-[#c8b98a] transition-colors hover:text-[#e8c97a]"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <a
            href="#enquiry"
            className="hidden lg:inline-flex items-center justify-center border border-[#c9a84c]/60 px-6 py-2.5 text-[10px] uppercase tracking-[0.32em] text-[#e8c97a] transition-all duration-500 hover:bg-[#c9a84c] hover:text-[#080704]"
          >
            Private Enquiry
          </a>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(true)}
            className="lg:hidden inline-flex h-10 w-10 items-center justify-center text-[#e8c97a]"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </nav>
      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-[80] lg:hidden transition-all duration-500 ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
        <aside
          className={`absolute right-0 top-0 h-full w-[86%] max-w-sm border-l border-[rgba(201,168,76,0.2)] bg-[#0e0c08] px-7 py-8 transition-transform duration-500 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="font-serif-display text-lg tracking-[0.3em] text-[#f0e8d5]">
              XII NOON
            </span>
            <button
              onClick={() => setOpen(false)}
              className="inline-flex h-10 w-10 items-center justify-center text-[#e8c97a]"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="my-7 gold-rule" />
          <ul className="flex flex-col gap-6">
            {LINKS.map((l, i) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block font-serif-display text-3xl text-[#f0e8d5] transition-colors hover:text-[#e8c97a]"
                >
                  <span className="mr-3 text-xs align-top text-[#c9a84c]/60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="my-8 gold-rule" />
          <a
            href="#enquiry"
            onClick={() => setOpen(false)}
            className="inline-flex w-full items-center justify-center border border-[#c9a84c]/60 px-6 py-3.5 text-[11px] uppercase tracking-[0.3em] text-[#e8c97a] transition-colors hover:bg-[#c9a84c] hover:text-[#080704]"
          >
            Private Enquiry
          </a>
          <p className="mt-10 text-[10px] tracking-[0.3em] uppercase text-[#c8b98a]/60">
            Make with India · For the World
          </p>
        </aside>
      </div>
    </>
  );
}
