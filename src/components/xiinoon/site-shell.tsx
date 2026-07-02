import { CustomCursor } from "./custom-cursor";
import { ScrollProgress } from "./scroll-progress";
import { Navbar } from "./navbar";
import { Footer } from "./footer";

/**
 * Shared site shell: film grain, custom cursor, scroll progress,
 * sticky navbar, footer. Used by every page so the chrome is consistent.
 */
export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-clip bg-[#080704]">
      <div className="grain-overlay" aria-hidden />
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
