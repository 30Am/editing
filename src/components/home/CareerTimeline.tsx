"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { milestones } from "@/data/content";

const TICKS = Array.from({ length: 60 }, (_, i) => i);

function MilestoneReel({ src }: { src?: string }) {
  const [broken, setBroken] = useState(false);

  if (!src || broken) {
    return (
      <div className="aspect-[9/16] h-56 rounded-xl border border-paper/15 bg-paper/5 sm:h-64 lg:h-72" />
    );
  }

  return (
    <div className="aspect-[9/16] h-56 overflow-hidden rounded-xl border border-paper/15 bg-paper/5 sm:h-64 lg:h-72">
      <video
        src={src}
        className="h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        onError={() => setBroken(true)}
      />
    </div>
  );
}

export default function CareerTimeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const playheadRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(-1);

  useLayoutEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || window.innerWidth < 768) {
      setActiveIndex(milestones.length - 1);
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const st = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=220%",
        scrub: 1,
        pin: true,
        onUpdate: (self) => {
          const progress = self.progress;
          if (playheadRef.current) {
            playheadRef.current.style.left = `${progress * 100}%`;
          }
          const idx = Math.min(
            milestones.length - 1,
            Math.floor(progress * milestones.length)
          );
          setActiveIndex(idx);
        },
      });
      return () => st.kill();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden border-t border-line bg-ink py-14 text-paper"
    >
      <div className="container-edit">
        <span className="eyebrow text-paper/50">02 — Who I&rsquo;ve Edited For</span>
        <h2 className="type-h2 mt-4 max-w-2xl">
          A few of the creators and brands behind the cuts.
        </h2>
      </div>

      <div className="container-edit mt-10">
        {/* NLE-style ruler */}
        <div className="mb-2 flex justify-between font-mono text-xs uppercase tracking-[0.14em] text-paper/40">
          <span>Track — Clients</span>
          <span>{String(Math.max(0, activeIndex + 1)).padStart(2, "0")} / {String(milestones.length).padStart(2, "0")}</span>
        </div>

        <div className="relative overflow-hidden border-y border-paper/15 py-1">
          <div className="flex">
            {TICKS.map((t) => (
              <span
                key={t}
                className={cn(
                  "block h-3 w-full border-l border-paper/10",
                  t % 5 === 0 && "h-5 border-paper/25"
                )}
              />
            ))}
          </div>
        </div>

        {/* Track with markers + playhead */}
        <div ref={trackRef} className="relative mt-10 h-1 rounded-full bg-paper/15">
          <div
            className="absolute inset-y-0 left-0 w-full origin-left rounded-full bg-film-green/70"
            style={{
              transform: `scaleX(${activeIndex >= 0 ? (activeIndex + 1) / milestones.length : 0})`,
              transition: "transform 0.2s linear",
            }}
          />
          <div
            ref={playheadRef}
            className="absolute -top-2 z-10 h-5 w-px bg-crimson"
            style={{ left: "0%" }}
          >
            <span className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-crimson bg-ink" />
          </div>

          {milestones.map((m, i) => (
            <div
              key={m.title}
              className="absolute top-1/2 -translate-y-1/2"
              style={{ left: `${(i / (milestones.length - 1)) * 100}%` }}
            >
              <span
                className={cn(
                  "block h-2.5 w-2.5 -translate-x-1/2 rounded-full border transition-colors duration-300",
                  i <= activeIndex
                    ? "border-film-green bg-film-green"
                    : "border-paper/30 bg-ink"
                )}
              />
            </div>
          ))}
        </div>

        {/* Milestone readout */}
        <div className="mt-8 grid gap-x-8 gap-y-8 grid-cols-1 md:grid-cols-3">
          {milestones.map((m, i) => (
            <div
              key={m.title}
              className={cn(
                "flex flex-col items-start gap-4 border-l pl-5 transition-all duration-500",
                i <= activeIndex
                  ? "border-film-green opacity-100"
                  : "border-paper/15 opacity-35"
              )}
            >
              <MilestoneReel src={m.video} />
              <div className="min-w-0">
                <p className="font-display text-2xl font-medium tracking-tight">
                  {m.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
