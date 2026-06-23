"use client";

import { useEffect, useState } from "react";

/**
 * Slim gold scroll-progress indicator fixed to the top of the viewport.
 */
export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(pct);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[70] h-[2px] bg-transparent pointer-events-none"
      aria-hidden
    >
      <div
        className="h-full origin-left transition-[width] duration-150 ease-out"
        style={{
          width: `${progress}%`,
          background:
            "linear-gradient(90deg, #8a7330 0%, #e8c97a 50%, #c9a84c 100%)",
          boxShadow: "0 0 12px rgba(232,201,122,0.5)",
        }}
      />
    </div>
  );
}
