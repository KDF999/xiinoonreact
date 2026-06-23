"use client";

import { useState } from "react";
import Link from "next/link";
import { Loader2, Check, ArrowUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type FooterLink = { label: string; href: string };

const COLS: { title: string; links: FooterLink[] }[] = [
  {
    title: "Collection",
    links: [
      { label: "The Tricolor Edition", href: "/tricolor" },
      { label: "The Emirati Edition", href: "/emirati-edition" },
      { label: "The Signature", href: "/signature" },
      { label: "The Vajra Pen", href: "/vajra-pen" },
    ],
  },
  {
    title: "Maison",
    links: [
      { label: "Brand Story", href: "/brand-story" },
      { label: "Media", href: "/media" },
      { label: "The Collection", href: "/#collection" },
      { label: "Philosophy", href: "/#philosophy" },
    ],
  },
  {
    title: "Private",
    links: [
      { label: "Private Enquiry", href: "/private-enquiry" },
      { label: "Home", href: "/" },
      { label: "By Appointment", href: "/private-enquiry" },
      { label: "Contact", href: "mailto:ceo@xiinoon.in" },
    ],
  },
];

export function Footer() {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const subscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("failed");
      setSubscribed(true);
      toast({
        title: "Subscribed",
        description: "You will receive private communications from the maison.",
      });
      setEmail("");
    } catch {
      toast({
        title: "Could not subscribe",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="relative mt-auto border-t border-[rgba(201,168,76,0.18)] bg-[#060502]">
      <div className="border-b border-[rgba(201,168,76,0.1)] py-14 text-center">
        <p className="font-serif-display text-2xl sm:text-3xl italic text-[#f0e8d5]/90">
          XII NOON does not follow time.
        </p>
        <p className="mt-2 font-serif-display text-2xl sm:text-3xl italic text-gold-gradient">
          XII NOON defines it.
        </p>
      </div>

      <div className="mx-auto max-w-[1500px] px-5 py-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Link href="/" className="flex items-center gap-3">
              <img
                src="/images/logo.webp"
                alt="XII NOON"
                className="h-11 w-auto object-contain"
              />
              <div className="leading-none">
                <p className="font-serif-display text-2xl tracking-[0.3em] text-[#f0e8d5]">
                  XII NOON
                </p>
                <p className="mt-1.5 text-[8px] tracking-[0.4em] uppercase text-[#c8b98a]/70">
                  Ultra-Luxury Timekeeping
                </p>
              </div>
            </Link>
            <p className="mt-6 max-w-sm text-sm font-light leading-relaxed text-[#c8b98a]">
              Make with India for the World. Timekeeping as Position.
              Timekeeping as Legacy.
            </p>

            <div className="mt-8">
              <p className="text-[10px] uppercase tracking-[0.35em] text-[#c9a84c]">
                Private Communications
              </p>
              {subscribed ? (
                <div className="mt-4 flex items-center gap-3 text-[#e8c97a]">
                  <Check className="h-4 w-4" />
                  <span className="text-sm">You are on the private list.</span>
                </div>
              ) : (
                <form onSubmit={subscribe} className="mt-4 flex max-w-md gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    required
                    className="lux-input h-12 flex-1 px-4 text-sm"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex h-12 items-center justify-center gap-2 border border-[#c9a84c] px-6 text-[10px] uppercase tracking-[0.28em] text-[#e8c97a] transition-colors hover:bg-[#c9a84c] hover:text-[#080704] disabled:opacity-60"
                  >
                    {loading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      "Subscribe"
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
            {COLS.map((col) => (
              <div key={col.title}>
                <p className="text-[10px] uppercase tracking-[0.35em] text-[#c9a84c]">
                  {col.title}
                </p>
                <ul className="mt-5 space-y-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      {l.href.startsWith("mailto:") || l.href.startsWith("#") ? (
                        <a
                          href={l.href}
                          className="gold-underline text-sm font-light text-[#c8b98a] transition-colors hover:text-[#f0e8d5]"
                        >
                          {l.label}
                        </a>
                      ) : (
                        <Link
                          href={l.href}
                          className="gold-underline text-sm font-light text-[#c8b98a] transition-colors hover:text-[#f0e8d5]"
                        >
                          {l.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-[rgba(201,168,76,0.12)] pt-8 sm:flex-row">
          <p className="text-[10px] tracking-[0.2em] text-[#c8b98a]/60">
            © {new Date().getFullYear()} XII NOON. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-[#c8b98a] transition-colors hover:text-[#e8c97a]"
            >
              <ArrowUp className="h-3.5 w-3.5" /> Back to top
            </Link>
            <a
              href="mailto:ceo@xiinoon.in"
              className="text-[10px] uppercase tracking-[0.3em] text-[#c8b98a] transition-colors hover:text-[#e8c97a]"
            >
              ceo@xiinoon.in
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
