"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import RevealText from "@/components/ui/RevealText";

// Retention curve — shaped like a Reels/Shorts audience-retention chart:
const RETENTION_CURVE =
  "M0,10 C 30,12 45,24 60,28 C 80,34 95,32 110,36 C 130,42 140,52 155,50 C 170,48 185,54 200,58 C 215,62 225,60 240,63 C 255,66 265,70 280,68 C 290,67 295,70 300,72";
const RETENTION_FILL = `${RETENTION_CURVE} L300,90 L0,90 Z`;

export default function PortraitReveal() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const curveRef = useRef<SVGPathElement>(null);

  useLayoutEffect(() => {
    // The autoplay/muted attributes alone don't reliably trigger playback on
    // a React-mounted <video>; kick it off imperatively as a fallback.
    videoRef.current?.play().catch(() => {});

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || window.innerWidth < 768) {
      gsap.set(timelineRef.current, { opacity: 1, scale: 1 });
      gsap.set(videoRef.current, { opacity: 1, scale: 1 });
      gsap.set(curveRef.current, { strokeDashoffset: 0 });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.set(timelineRef.current, { opacity: 0, scale: 0.94 });
      gsap.set(videoRef.current, { opacity: 0, scale: 0.94 });
      gsap.set(curveRef.current, { strokeDashoffset: 1 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=100%",
          scrub: 1,
          pin: true,
        },
      });

      tl.to(
        [videoRef.current, timelineRef.current],
        { opacity: 1, scale: 1, duration: 1, ease: "power2.out" }
      )
        .to(curveRef.current, { strokeDashoffset: 0, duration: 1.2, ease: "power1.out" }, "<0.2");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="grain relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden border-t border-line bg-paper-dim py-24"
    >
      <div className="container-edit flex w-full flex-col items-center gap-14">
        <div className="text-center">
          <span className="eyebrow text-ink-soft">01 — Meet Your Editor</span>
          <RevealText
            as="h2"
            splitBy="word"
            className="type-h2 mt-4 justify-center text-center"
          >
            Built from thousands of hours in the timeline.
          </RevealText>
        </div>

        <div className="relative h-[360px] w-[280px] sm:h-[440px] sm:w-[340px]">
          <svg width="0" height="0" className="absolute">
            <defs>
              <clipPath id="reel-clip" clipPathUnits="objectBoundingBox">
                <path d="M 0.16,0.03 L 0.84,0.03 L 0.84,0.97 L 0.16,0.97 Z" />
              </clipPath>
            </defs>
          </svg>

          {/* Reel footage — sized to the source video's own 9:16 (1080×1920) aspect ratio. */}
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ clipPath: "url(#reel-clip)" }}
            src="https://oeavazgqwtikqiwkxcrr.supabase.co/storage/v1/object/public/Amlan_Editing/Meet_Your_Editor/vidgrab-dowenload.mp4"
            autoPlay
            muted
            loop
            playsInline
          />
        </div>

        {/* Editing timeline the mosaic resolves into — now a retention
            graph, in the spirit of a Reels/Shorts audience-retention chart,
            instead of a raw audio waveform. */}
        <div ref={timelineRef} className="flex w-full max-w-sm flex-col gap-4">
          <div className="flex items-center justify-between font-mono text-xs uppercase tracking-[0.14em] text-ink-soft">
            <span>V1 — Amlan_Reel</span>
            <span>00:42:18</span>
          </div>
          <div className="relative border-b border-ink/15 pb-2">
            <svg viewBox="0 0 300 90" className="h-20 w-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id="retention-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--indigo)" stopOpacity="0.22" />
                  <stop offset="100%" stopColor="var(--indigo)" stopOpacity="0.02" />
                </linearGradient>
              </defs>
              <line x1="0" y1="45" x2="300" y2="45" stroke="var(--ink)" strokeOpacity="0.08" strokeDasharray="2 3" />
              <path d={RETENTION_FILL} fill="url(#retention-fill)" stroke="none" />
              <path
                ref={curveRef}
                d={RETENTION_CURVE}
                fill="none"
                stroke="var(--indigo)"
                strokeWidth="2"
                strokeLinecap="round"
                pathLength={1}
                strokeDasharray={1}
              />
            </svg>
          </div>
          <div className="flex justify-between font-mono text-xs text-ink-soft">
            <span>Hook</span>
            <span>Story</span>
            <span>Payoff</span>
            <span>Retained</span>
          </div>
        </div>

        <p className="body-lg max-w-md text-center text-ink-soft">
          Every clip becomes a fragment. Every fragment becomes a video your
          audience actually finishes — built one cut at a time.
        </p>
      </div>
    </section>
  );
}
