"use client";

import { useEffect, useRef } from "react";

/**
 * Two-layer cursor: a small dot with zero lag, and a ring that trails with
 * spring easing and swells when hovering an interactive/magnetic element.
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let raf = 0;

    document.body.classList.add("has-custom-cursor");

    const onMove = (e: PointerEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    };

    const tick = () => {
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };

    const onOver = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.closest("[data-cursor='link']")) {
        ring.dataset.state = "link";
      } else if (target.closest("[data-cursor='view']")) {
        ring.dataset.state = "view";
      }
    };
    const onOut = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.closest("[data-cursor]")) {
        ring.dataset.state = "";
      }
    };

    window.addEventListener("pointermove", onMove);
    document.addEventListener("pointerover", onOver);
    document.addEventListener("pointerout", onOut);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerout", onOut);
      cancelAnimationFrame(raf);
      document.body.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[90] hidden md:block">
      <div
        ref={dotRef}
        className="fixed left-0 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink"
      />
      <div
        ref={ringRef}
        data-state=""
        className="fixed left-0 top-0 flex h-9 w-9 items-center justify-center rounded-full border border-ink/30 transition-[width,height,background-color,border-color] duration-300 ease-out
          data-[state=link]:h-14 data-[state=link]:w-14 data-[state=link]:border-indigo data-[state=link]:bg-indigo/10
          data-[state=view]:h-20 data-[state=view]:w-20 data-[state=view]:border-transparent data-[state=view]:bg-ink data-[state=view]:text-paper"
      >
        <span className="text-[10px] uppercase tracking-[0.14em] opacity-0 data-[state=view]:opacity-100">
          View
        </span>
      </div>
    </div>
  );
}
