"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Intro loader styled like an NLE render/export bar — timecode, a
 * percentage counting to 100, then a clip-path wipe reveals the site.
 * Shown once per browser session.
 */
export default function PageLoader() {
  const [visible, setVisible] = useState(false);
  const [ready, setReady] = useState(false);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seen = sessionStorage.getItem("amlan_intro_seen");
    if (reduce || seen) {
      setReady(true);
      return;
    }

    setVisible(true);
    sessionStorage.setItem("amlan_intro_seen", "1");

    const start = performance.now();
    const duration = 1400;
    let raf = 0;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setPct(Math.round(eased * 100));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setReady(true), 260);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  if (!visible) return null;

  return (
    <AnimatePresence onExitComplete={() => setVisible(false)}>
      {!ready && (
        <motion.div
          key="loader"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[200] flex flex-col justify-between bg-ink px-6 py-8 text-paper md:px-10 md:py-10"
          style={{ clipPath: "inset(0 0 0% 0)" }}
        >
          <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.14em] text-paper/50">
            <span>REC · 00:00:0{Math.floor(pct / 34)}</span>
            <span>Amlan Tripathy — Reel.mov</span>
          </div>

          <div className="flex items-end justify-between">
            <p className="h-display">
              {String(pct).padStart(2, "0")}
              <span className="text-paper/40">%</span>
            </p>
          </div>

          <div>
            <div className="mb-3 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.14em] text-paper/50">
              <span>Rendering</span>
              <span>{pct === 100 ? "Ready" : "Encoding…"}</span>
            </div>
            <div className="h-px w-full bg-paper/15">
              <div
                className="h-full bg-film-green transition-[width]"
                style={{ width: `${pct}%`, transitionDuration: "80ms" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
