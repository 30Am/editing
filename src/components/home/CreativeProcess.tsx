"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Step = {
  n: string;
  title: string;
  copy: string;
  video: string;
};

const STEPS: Step[] = [
  { n: "01", title: "Research", copy: "Every project starts as questions on paper — audience, objective, competitive terrain.", video: "/videobb/process-01-research.mp4" },
  { n: "02", title: "Storyboarding", copy: "Structure before spectacle. The story is blocked out, frame by frame, before a single clip is touched.", video: "/videobb/process-02-storyboard.mp4" },
  { n: "03", title: "Production", copy: "Cameras roll on what was planned — directing talent and capturing the footage the edit will need.", video: "/videobb/process-03-production.mp4" },
  { n: "04", title: "Editing", copy: "Pacing, rhythm, and cut points — the timeline is where strategy becomes feeling.", video: "/videobb/process-04-edit.mp4" },
  { n: "05", title: "Motion", copy: "Depth, movement, and layered composition give the story physical presence.", video: "/videobb/process-05-motion.mp4" },
  { n: "06", title: "Publishing", copy: "Every platform reads attention differently. Format follows distribution, not the other way around.", video: "/videobb/process-06-publish.mp4" },
  { n: "07", title: "Analytics", copy: "The work is measured, not just admired — what performed, why, and what it changes next time.", video: "/videobb/process-07-analytics.mp4" },
];

export default function CreativeProcess() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || window.innerWidth < 768) return;

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      if (!track) return;
      const total = track.scrollWidth - window.innerWidth;

      gsap.to(track, {
        x: -total,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${total}`,
          scrub: 1,
          pin: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-t border-line bg-paper py-24 md:py-0"
    >
      <div className="container-edit md:hidden">
        <span className="eyebrow text-ink-soft">04 — Inside the Edit</span>
        <h2 className="type-h2 mt-4 max-w-xl">
          Seven steps between your footage and a finished video.
        </h2>
      </div>

      <div
        ref={trackRef}
        className="flex flex-col gap-10 md:h-svh md:w-max md:flex-row md:items-center md:gap-0"
      >
        <div className="hidden shrink-0 md:flex md:h-full md:w-[38vw] md:flex-col md:justify-center md:pl-[clamp(1.25rem,4vw,4.5rem)]">
          <span className="eyebrow text-ink-soft">04 — Inside the Edit</span>
          <h2 className="type-h2 mt-4 max-w-md">
            Seven steps between your footage and a finished video.
          </h2>
          <p className="body-lg mt-4 max-w-sm text-ink-soft">Scroll to move through the process.</p>
        </div>

        {STEPS.map((s) => (
          <div
            key={s.n}
            className="container-edit shrink-0 md:w-[62vw] md:pl-[clamp(1.25rem,4vw,4.5rem)] md:pr-16"
          >
            <StepVisual src={s.video} />
          </div>
        ))}
      </div>
    </section>
  );
}

function StepVisual({ src }: { src: string }) {
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-line bg-paper-dim">
      <video
        src={src}
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />
    </div>
  );
}
