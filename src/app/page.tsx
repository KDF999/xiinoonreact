import { SiteShell } from "@/components/xiinoon/site-shell";
import { Hero } from "@/components/xiinoon/hero";
import { Marquee } from "@/components/xiinoon/marquee";
import { Philosophy } from "@/components/xiinoon/philosophy";
import { Collection } from "@/components/xiinoon/collection";
import { Craft } from "@/components/xiinoon/craft";
import { Gallery } from "@/components/xiinoon/gallery";
import { Standards } from "@/components/xiinoon/standards";
import { Enquiry } from "@/components/xiinoon/enquiry";

export default function Home() {
  return (
    <SiteShell>
      <Hero />
      <Marquee />
      <Philosophy />
      <Collection />
      <Craft />
      <Gallery />
      <Standards />
      <Enquiry />
    </SiteShell>
  );
}
