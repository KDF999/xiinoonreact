import { CustomCursor } from "@/components/xiinoon/custom-cursor";
import { ScrollProgress } from "@/components/xiinoon/scroll-progress";
import { Navbar } from "@/components/xiinoon/navbar";
import { Hero } from "@/components/xiinoon/hero";
import { Marquee } from "@/components/xiinoon/marquee";
import { Philosophy } from "@/components/xiinoon/philosophy";
import { Collection } from "@/components/xiinoon/collection";
import { Craft } from "@/components/xiinoon/craft";
import { Standards } from "@/components/xiinoon/standards";
import { Enquiry } from "@/components/xiinoon/enquiry";
import { Footer } from "@/components/xiinoon/footer";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col bg-[#080704]">
      {/* Film grain + cursor + scroll progress */}
      <div className="grain-overlay" aria-hidden />
      <CustomCursor />
      <ScrollProgress />
      <Navbar />

      <main className="flex-1">
        <Hero />
        <Marquee />
        <Philosophy />
        <Collection />
        <Craft />
        <Standards />
        <Enquiry />
      </main>

      <Footer />
    </div>
  );
}
