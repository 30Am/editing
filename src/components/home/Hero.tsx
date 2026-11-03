"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import RevealText from "@/components/ui/RevealText";
import MagneticButton from "@/components/ui/MagneticButton";

type Fragment = {
  top: string;
  left: string;
  w: number;
  h: number;
  rot: number;
  tone: string;
  depth: number;
  delay: number;
};

type HeroVideo = {
  title: string;
  src: string;
};

const HERO_VIDEOS: HeroVideo[] = [
  { title: "BRX", src: "https://pub-ffdc1cf7f2f64138beeffdc8a02bd0dd.r2.dev/brx.mp4" },
  { title: "Diary of a CEO", src: "https://pub-ffdc1cf7f2f64138beeffdc8a02bd0dd.r2.dev/Diary%20Of%20A%20Ceo.mp4" },
  { title: "Dr. Anchal", src: "https://pub-ffdc1cf7f2f64138beeffdc8a02bd0dd.r2.dev/Dr%20Anchal.mp4" },
  { title: "Wispr Flow", src: "https://pub-ffdc1cf7f2f64138beeffdc8a02bd0dd.r2.dev/wispr%20long.mp4" },
];

const FRAGMENTS: Fragment[] = [
  { top: "14%", left: "8%", w: 56, h: 74, rot: -6, tone: "bg-ink/10", depth: 0.6, delay: 0 },
  { top: "22%", left: "82%", w: 44, h: 60, rot: 8, tone: "bg-indigo/20", depth: 1.1, delay: 0.06 },
  { top: "68%", left: "12%", w: 38, h: 50, rot: 4, tone: "bg-crimson/20", depth: 0.8, delay: 0.12 },
  { top: "72%", left: "88%", w: 60, h: 44, rot: -10, tone: "bg-ink/10", depth: 0.5, delay: 0.02 },
  { top: "8%", left: "46%", w: 30, h: 40, rot: 12, tone: "bg-film-green/25", depth: 1.3, delay: 0.18 },
  { top: "40%", left: "4%", w: 26, h: 26, rot: -14, tone: "bg-ink/10", depth: 1.4, delay: 0.1 },
  { top: "36%", left: "92%", w: 34, h: 34, rot: 18, tone: "bg-ink/10", depth: 0.7, delay: 0.16 },
  { top: "84%", left: "45%", w: 50, h: 34, rot: -4, tone: "bg-indigo/15", depth: 0.9, delay: 0.08 },
  { top: "6%", left: "70%", w: 20, h: 66, rot: -8, tone: "bg-ink/10", depth: 1.2, delay: 0.14 },
  { top: "58%", left: "6%", w: 22, h: 60, rot: 10, tone: "bg-ink/10", depth: 0.65, delay: 0.2 },
];

export default function Hero() {
  const mvX = useMotionValue(0);
  const mvY = useMotionValue(0);
  const sx = useSpring(mvX, { stiffness: 60, damping: 18 });
  const sy = useSpring(mvY, { stiffness: 60, damping: 18 });

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const onMove = (e: PointerEvent) => {
      mvX.set(e.clientX / window.innerWidth - 0.5);
      mvY.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [mvX, mvY]);

  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden bg-paper pt-[var(--nav-h)]">

      {/* Floating fragments  -  settle into stillness once the sentence assembles */}
      <div className="pointer-events-none absolute inset-0 -z-[5] hidden sm:block">
        {FRAGMENTS.map((f, i) => (
          <FragmentBlock key={i} f={f} sx={sx} sy={sy} />
        ))}
      </div>





      <div className="container-edit flex flex-1 flex-col justify-center gap-6 py-6 md:gap-8">
        <div className="max-w-3xl">
          <span className="eyebrow text-ink-soft">Video Editor · Open for New Projects</span>
          <RevealText as="h1" splitBy="word" className="type-h1 mt-4">
            Edits that keep people watching.
          </RevealText>
          <p className="body-lg mt-4 max-w-xl text-ink-soft">
            I&rsquo;m Amlan  -  a video editor working with US creators, podcasters,
            and brands to turn raw footage into content that holds attention
            and drives real business results.
          </p>
          <div className="mt-6">
            <MagneticButton href="/contact" variant="solid" cursor="view">
              Hire me for your next edit
            </MagneticButton>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="hero-video-card w-full overflow-hidden rounded-2xl border border-line bg-paper-dim"
        >
          <VideoCarousel />
        </motion.div>
      </div>





      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.5 }}
        className="container-edit flex shrink-0 items-center gap-3 pb-8 text-ink-soft"
      >
        <span className="h-8 w-px animate-pulse bg-ink/30" />
        <span className="eyebrow">Scroll to see the work</span>
      </motion.div>
    </section>
  );
}

const CAROUSEL_STEP_THRESHOLD = 70;
const CAROUSEL_TRANSITION_MS = 550;
const CAROUSEL_SWIPE_THRESHOLD = 50;
const CAROUSEL_MAX_VISIBLE_DEPTH = 3;

function normalizeWheelDelta(e: WheelEvent) {
  // deltaMode 1 = line, 2 = page; normalize both to an approximate pixel scale.
  const mult = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? 400 : 1;
  return e.deltaY * mult;
}

function VideoCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const hoveredRef = useRef(false);
  const wheelAccumRef = useRef(0);
  const isAnimatingRef = useRef(false);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const [index, setIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  const lastIndex = HERO_VIDEOS.length - 1;

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const step = (delta: number) => {
    setIndex((cur) => Math.min(lastIndex, Math.max(0, cur + delta)));
  };

  useEffect(() => {
    if (reducedMotion) return;
    const container = containerRef.current;
    if (!container) return;

    const onWheel = (e: WheelEvent) => {
      if (!hoveredRef.current) return;

      const delta = normalizeWheelDelta(e);
      const atStart = index === 0;
      const atEnd = index === lastIndex;
      const releasingAtBoundary = (delta < 0 && atStart) || (delta > 0 && atEnd);

      if (releasingAtBoundary) {
        // Hand this exact event to Lenis/native scroll instead of capturing it.
        container.removeAttribute("data-lenis-prevent-wheel");
        return;
      }

      container.setAttribute("data-lenis-prevent-wheel", "");
      e.preventDefault();

      if (isAnimatingRef.current) return;

      wheelAccumRef.current += delta;
      if (Math.abs(wheelAccumRef.current) >= CAROUSEL_STEP_THRESHOLD) {
        const dir = wheelAccumRef.current > 0 ? 1 : -1;
        wheelAccumRef.current = 0;
        isAnimatingRef.current = true;
        step(dir);
        window.setTimeout(() => {
          isAnimatingRef.current = false;
        }, CAROUSEL_TRANSITION_MS);
      }
    };

    container.addEventListener("wheel", onWheel, { passive: false });
    return () => container.removeEventListener("wheel", onWheel);
  }, [index, lastIndex, reducedMotion]);

  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touchStartRef.current = { x: t.clientX, y: t.clientY };
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touchStartRef.current;
    touchStartRef.current = null;
    if (!start) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    if (Math.abs(dx) < CAROUSEL_SWIPE_THRESHOLD || Math.abs(dx) < Math.abs(dy)) return;
    step(dx < 0 ? 1 : -1);
  };

  return (
    <div
      ref={containerRef}
      data-lenis-prevent-wheel
      onMouseEnter={() => {
        hoveredRef.current = true;
      }}
      onMouseLeave={() => {
        hoveredRef.current = false;
      }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      className="relative aspect-[4/5] w-full overflow-hidden rounded-xl sm:aspect-video"
      style={{ perspective: 1200 }}
    >
      {HERO_VIDEOS.map((v, i) => (
        <CarouselCard key={i} v={v} depth={i - index} reducedMotion={reducedMotion} />
      ))}

      <div className="pointer-events-none absolute inset-0 z-[200] flex items-end justify-center pb-3">
        <div className="pointer-events-auto flex items-center gap-1.5">
          {HERO_VIDEOS.map((v, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Show video ${i + 1}: ${v.title}`}
              aria-current={i === index}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index ? "w-5 bg-paper" : "w-1.5 bg-paper/40 hover:bg-paper/70"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function CarouselCard({
  v,
  depth,
  reducedMotion,
}: {
  v: HeroVideo;
  depth: number;
  reducedMotion: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isFront = depth === 0;

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (isFront) {
      el.play().catch(() => {});
    } else {
      el.pause();
    }
  }, [isFront]);

  const clampedDepth = Math.min(depth, CAROUSEL_MAX_VISIBLE_DEPTH + 1);
  const isBehindView = depth < 0;
  const isFarBehind = depth > CAROUSEL_MAX_VISIBLE_DEPTH;

  const target = isBehindView
    ? { z: -260, y: 40, scale: 0.8, opacity: 0 }
    : {
        z: clampedDepth * -70,
        y: clampedDepth * -14,
        scale: 1 - clampedDepth * 0.07,
        opacity: isFarBehind ? 0 : 1 - clampedDepth * 0.3,
      };

  return (
    <motion.div
      animate={{ ...target, zIndex: 100 - Math.max(depth, 0) }}
      transition={reducedMotion ? { duration: 0 } : { duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      style={{ transformStyle: "preserve-3d", pointerEvents: depth === 0 ? "auto" : "none" }}
      className="absolute inset-0"
    >
      <div className="relative h-full w-full overflow-hidden rounded-xl bg-ink" aria-hidden={depth !== 0}>
        {/* Only the front card gets a src  -  nothing else loads or downloads. */}
        {isFront && (
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            src={v.src}
            muted
            loop
            playsInline
            autoPlay
          />
        )}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/50 to-transparent" />
        <span className="absolute bottom-3 left-3 font-mono text-xs uppercase tracking-[0.14em] text-paper/80">
          {v.title}
        </span>
      </div>
    </motion.div>
  );
}

function FragmentBlock({
  f,
  sx,
  sy,
}: {
  f: Fragment;
  sx: MotionValue<number>;
  sy: MotionValue<number>;
}) {
  const x = useTransform(sx, (v) => v * 40 * f.depth);
  const y = useTransform(sy, (v) => v * 40 * f.depth);

  return (
    <motion.div
      className={`absolute rounded-[2px] border border-ink/[0.06] ${f.tone}`}
      style={{ top: f.top, left: f.left, width: f.w, height: f.h, x, y }}
      initial={{ opacity: 0, scale: 0.4, rotate: f.rot * 3 }}
      animate={{ opacity: 1, scale: 1, rotate: f.rot }}
      transition={{ duration: 1.1, delay: 0.4 + f.delay, ease: [0.16, 1, 0.3, 1] }}
    />
  );
}
