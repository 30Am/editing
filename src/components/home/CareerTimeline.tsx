"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { milestones } from "@/data/content";

const TICKS = Array.from({ length: 60 }, (_, i) => i);

function MilestoneReel({ src }: { src?: string }) {
  const [broken, setBroken] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (!src || broken) {
    return (
      <div className="aspect-[9/16] w-32 sm:w-36 md:w-32 lg:w-40 h-auto shrink-0 rounded-xl border border-paper/15 bg-paper/5" />
    );
  }

  return (
    <div
      ref={ref}
      className="aspect-[9/16] w-32 sm:w-36 md:w-32 lg:w-40 h-auto shrink-0 overflow-hidden rounded-xl border border-paper/15 bg-paper/5"
    >
      {inView && (
        <video
          src={src}
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onError={() => setBroken(true)}
        />
      )}
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
        <span className="eyebrow text-paper/50">02  -  Who I&rsquo;ve Edited For</span>
        <h2 className="type-h2 mt-4 max-w-2xl">
          A few of the creators and brands behind the cuts.
        </h2>
      </div>

      <div className="container-edit mt-10">
        {/* NLE-style ruler track label */}
        <div className="mb-4 md:mb-2 flex justify-between font-mono text-xs uppercase tracking-[0.14em] text-paper/40">
          <span>Track  -  Clients</span>
          <span>
            {String(Math.max(0, activeIndex + 1)).padStart(2, "0")} /{" "}
            {String(milestones.length).padStart(2, "0")}
          </span>
        </div>

        {/* Desktop horizontal ruler */}
        <div className="hidden md:block relative overflow-hidden border-y border-paper/15 py-1">
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

        {/* Desktop track with markers + playhead */}
        <div ref={trackRef} className="hidden md:block relative mt-10 h-1 rounded-full bg-paper/15">
          <div
            className="absolute inset-y-0 left-0 w-full origin-left rounded-full bg-film-green/70"
            style={{
              transform: `scaleX(${
                activeIndex >= 0 ? (activeIndex + 1) / milestones.length : 0
              })`,
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

        {/* Client Timeline Content */}
        <div className="relative mt-8 md:mt-8">
          {/* Mobile continuous vertical timeline rail line */}
          <div className="absolute top-3 bottom-3 left-0 w-px bg-paper/15 md:hidden" />

          {/* Mobile vertical timeline rail green active overlay */}
          <div
            className="absolute top-3 left-0 w-px bg-film-green/70 transition-all duration-300 md:hidden"
            style={{
              height: `${
                activeIndex >= 0
                  ? ((activeIndex + 1) / milestones.length) * 100
                  : 0
              }%`,
              maxHeight: "calc(100% - 1.5rem)",
            }}
          />

          {/* Milestone items grid (side-by-side reel + name on mobile and desktop) */}
          <div className="flex flex-col gap-y-10 md:grid md:grid-cols-3 md:gap-x-6 lg:gap-x-8 md:gap-y-0">
            {milestones.map((m, i) => (
              <div
                key={m.title}
                className={cn(
                  "relative flex flex-row items-center gap-4 sm:gap-5 pl-7 sm:pl-9 md:gap-4 lg:gap-5 md:border-l md:pl-4 lg:pl-5 transition-all duration-500",
                  i <= activeIndex
                    ? "border-film-green opacity-100"
                    : "border-paper/15 opacity-35"
                )}
              >
                {/* Mobile timeline marker dot */}
                <div className="absolute left-0 top-4 -translate-x-1/2 md:hidden">
                  <span
                    className={cn(
                      "block h-2.5 w-2.5 rounded-full border transition-colors duration-300",
                      i <= activeIndex
                        ? "border-film-green bg-film-green"
                        : "border-paper/30 bg-ink"
                    )}
                  />
                </div>

                <MilestoneReel src={m.video} />
                <div className="min-w-0 flex-1">
                  <p className="font-display text-lg sm:text-xl lg:text-2xl font-medium tracking-tight text-paper leading-snug">
                    {m.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
