import { SiteShell } from "@/components/xiinoon/site-shell";
import { PageHero } from "@/components/xiinoon/page-hero";
import { Reveal } from "@/components/xiinoon/reveal";
import { EnquiryForm } from "@/components/xiinoon/enquiry-form";

export const metadata = {
  title: "Private Enquiry — XII NOON",
  description:
    "Acquisition of a XII NOON object is not a transaction — it is an extension. Submit your details and the maison will respond privately.",
};

export default function PrivateEnquiryPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Private Enquiry"
        title="Request an"
        titleAccent="Audience."
        subtitle="Acquisition of a XII NOON object is not a transaction — it is an extension. Submit your details and the maison will respond privately to begin the conversation."
        image="/images/hero.webp"
        crumbs={[{ label: "Private Enquiry" }]}
        align="center"
      />

      <section className="relative overflow-hidden bg-[#080704] py-24 sm:py-32">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[60vh] w-[60vh] -translate-x-1/2 rounded-full bg-[#c9a84c]/8 blur-[120px]" />
        <div className="relative mx-auto grid max-w-[1400px] gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.45em] text-[#c9a84c]">
              The Conversation
            </p>
            <h2 className="mt-6 font-serif-display text-4xl sm:text-5xl lg:text-6xl leading-tight text-[#f0e8d5]">
              Begin Privately.
            </h2>
            <div className="mt-7 gold-rule w-32" />
            <p className="mt-7 max-w-md text-base font-light leading-relaxed text-[#c8b98a]">
              Possession is never offered — it is extended. Each enquiry is read
              by the maison and answered in confidence. We will respond to begin
              the conversation that leads, eventually, to custodianship.
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
          </Reveal>

          <Reveal delay={2}>
            <EnquiryForm />
          </Reveal>
        </div>
      </section>
    </SiteShell>
  );
}
