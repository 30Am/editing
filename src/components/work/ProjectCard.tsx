"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { Project } from "@/data/content";

export const PROJECT_TONES = [
  "from-indigo/25 via-paper-dim to-paper-dim",
  "from-crimson/20 via-paper-dim to-paper-dim",
  "from-film-green/25 via-paper-dim to-paper-dim",
  "from-ink/15 via-paper-dim to-paper-dim",
];

export default function ProjectCard({
  project,
  tone,
}: {
  project: Project;
  tone: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [8, -8]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(mx, [0, 1], [-8, 8]), { stiffness: 200, damping: 20 });

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
      { rootMargin: "600px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };
  const onLeave = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <Link
      href={`/work/${project.slug}`}
      data-cursor="view"
      className="block"
      style={{ perspective: 1200 }}
    >
      <motion.div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="group relative aspect-[9/16] overflow-hidden rounded-2xl border border-line bg-paper-dim"
      >
        {project.video && inView ? (
          <video
            src={project.video}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
        ) : (
          <div
            className={`absolute inset-0 bg-gradient-to-br ${tone} transition-transform duration-700 ease-out group-hover:scale-110`}
          />
        )}
        {project.video && (
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
        )}
        <div className="absolute inset-0 flex flex-col justify-between p-7">
          <div className="flex items-start justify-between">
            <span className="eyebrow rounded-full border border-ink/15 bg-paper/70 px-3 py-1 text-ink-soft backdrop-blur-sm">
              {project.category}
            </span>
            {project.placeholder && (
              <span className="eyebrow rounded-full bg-ink/80 px-3 py-1 text-paper">
                Coming soon
              </span>
            )}
          </div>

          <div>
            <p
              className={`font-display text-2xl font-medium tracking-tight ${project.video ? "text-paper" : "text-ink"}`}
            >
              {project.title}
            </p>
            <p className={`mt-1 text-sm ${project.video ? "text-paper/70" : "text-ink-soft"}`}>
              {project.client}
            </p>

            <div className="mt-4 max-h-0 overflow-hidden opacity-0 transition-all duration-500 ease-out group-hover:mt-4 group-hover:max-h-32 group-hover:opacity-100">
              <p className={`text-sm ${project.video ? "text-paper/70" : "text-ink-soft"}`}>
                {project.outcome}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
