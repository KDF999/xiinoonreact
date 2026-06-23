"use client";

import { useState } from "react";
import { Loader2, Send, Check } from "lucide-react";
import { useReveal } from "./use-reveal";
import { useToast } from "@/hooks/use-toast";

const INTERESTS = [
  "The Tricolor Edition",
  "The Emirati Edition",
  "The Signature",
  "The Vajra Pen",
  "A Private Commission",
  "General Enquiry",
];

export function Enquiry() {
  const head = useReveal<HTMLDivElement>();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    interest: INTERESTS[0],
    message: "",
  });

  const update = (k: keyof typeof form, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName.trim() || !form.email.trim()) {
      toast({
        title: "Required fields missing",
        description: "Please provide your name and email.",
        variant: "destructive",
      });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Request failed");
      setDone(true);
      toast({
        title: "Enquiry received",
        description:
          "The maison will be in touch privately. Thank you for your interest.",
      });
      setForm({
        fullName: "",
        email: "",
        phone: "",
        country: "",
        interest: INTERESTS[0],
        message: "",
      });
    } catch {
      toast({
        title: "Something went wrong",
        description: "Please try again or email ceo@xiinoon.in directly.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="enquiry"
      className="relative overflow-hidden bg-[#080704] py-24 sm:py-32 lg:py-40"
    >
      {/* glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[60vh] w-[60vh] -translate-x-1/2 rounded-full bg-[#c9a84c]/8 blur-[120px]" />

      <div className="relative mx-auto grid max-w-[1400px] gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
        {/* Left — invitation copy */}
        <div ref={head.ref} className={`reveal ${head.visible ? "is-visible" : ""}`}>
          <p className="text-[11px] uppercase tracking-[0.45em] text-[#c9a84c]">
            Private Enquiry
          </p>
          <h2 className="mt-6 font-serif-display text-4xl sm:text-5xl lg:text-6xl leading-tight text-[#f0e8d5]">
            Request an
            <br />
            <span className="text-gold-gradient italic">Audience.</span>
          </h2>
          <div className="mt-7 gold-rule w-32" />
          <p className="mt-7 max-w-md text-base font-light leading-relaxed text-[#c8b98a]">
            Acquisition of a XII NOON object is not a transaction — it is an
            extension. Submit your details and the maison will respond privately
            to begin the conversation.
          </p>

          <div className="mt-10 space-y-5">
            <div className="flex items-center gap-4">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#c9a84c]">
                By Email
              </span>
              <a
                href="mailto:ceo@xiinoon.in"
                className="gold-underline font-serif-display text-xl text-[#f0e8d5]"
              >
                ceo@xiinoon.in
              </a>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#c9a84c]">
                Maison
              </span>
              <span className="font-serif-display text-xl text-[#f0e8d5]">
                Bharat · For the World
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#c9a84c]">
                Hours
              </span>
              <span className="font-serif-display text-xl text-[#f0e8d5]">
                By appointment only
              </span>
            </div>
          </div>
        </div>

        {/* Right — form */}
        <div className="glass-panel p-7 sm:p-10">
          {done ? (
            <div className="flex h-full min-h-[420px] flex-col items-center justify-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#c9a84c] text-[#e8c97a]">
                <Check className="h-7 w-7" />
              </div>
              <h3 className="mt-7 font-serif-display text-3xl text-[#f0e8d5]">
                Your enquiry has been received.
              </h3>
              <p className="mt-4 max-w-sm text-sm font-light text-[#c8b98a]">
                The maison will be in touch privately. We thank you for your
                interest in XII NOON.
              </p>
              <button
                onClick={() => setDone(false)}
                className="mt-8 text-[11px] uppercase tracking-[0.3em] text-[#e8c97a] gold-underline"
              >
                Submit another enquiry
              </button>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <Field
                  label="Full Name"
                  required
                  value={form.fullName}
                  onChange={(v) => update("fullName", v)}
                  placeholder="Your name"
                />
                <Field
                  label="Email"
                  required
                  type="email"
                  value={form.email}
                  onChange={(v) => update("email", v)}
                  placeholder="you@domain.com"
                />
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                <Field
                  label="Phone"
                  value={form.phone}
                  onChange={(v) => update("phone", v)}
                  placeholder="+00 00000 00000"
                />
                <Field
                  label="Country"
                  value={form.country}
                  onChange={(v) => update("country", v)}
                  placeholder="Country of residence"
                />
              </div>

              <div>
                <label className="mb-2 block text-[10px] uppercase tracking-[0.3em] text-[#c9a84c]">
                  Object of Interest
                </label>
                <select
                  value={form.interest}
                  onChange={(e) => update("interest", e.target.value)}
                  className="lux-input h-12 w-full px-4 text-sm appearance-none cursor-pointer"
                >
                  {INTERESTS.map((i) => (
                    <option key={i} value={i} className="bg-[#0e0c08]">
                      {i}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-[10px] uppercase tracking-[0.3em] text-[#c9a84c]">
                  Message
                </label>
                <textarea
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                  rows={4}
                  placeholder="Tell the maison what draws you to XII NOON…"
                  className="lux-input w-full resize-none px-4 py-3 text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="group inline-flex w-full items-center justify-center gap-3 border border-[#c9a84c] px-7 py-4 text-[11px] uppercase tracking-[0.34em] text-[#e8c97a] transition-colors duration-500 hover:bg-[#c9a84c] hover:text-[#080704] disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Submitting
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    Submit Private Enquiry
                  </>
                )}
              </button>
              <p className="text-center text-[10px] tracking-[0.15em] text-[#c8b98a]/60">
                Your details are held in strict confidence by the maison.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-2 block text-[10px] uppercase tracking-[0.3em] text-[#c9a84c]">
        {label} {required && <span className="text-[#e8c97a]">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="lux-input h-12 w-full px-4 text-sm"
      />
    </div>
  );
}
