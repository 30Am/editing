"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  children: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  splitBy?: "word" | "line";
  delay?: number;
  stagger?: number;
  once?: boolean;
};

/**
 * Masks text behind overflow-hidden lines and reveals it word-by-word as
 * it enters the viewport  -  typography becoming part of the animation
 * rather than a static fade-in.
 *
 * Uses a manual IntersectionObserver (rather than framer-motion's
 * whileInView) because it does not reliably fire in this project's
 * framer-motion version  -  verified via headless-browser inspection.
 */
export default function RevealText({
  children,
  as = "p",
  className,
  splitBy = "word",
  delay = 0,
  stagger = 0.045,
  once = true,
}: Props) {
  const Tag = motion[as];
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            setInView(false);
          }
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [once]);

  const units = splitBy === "word" ? children.split(" ") : children.split("\n");

  return (
    // @ts-expect-error -- ref typing varies across the motion.* tag union
    <Tag ref={ref} className={cn("block", className)}>
      {units.map((unit, i) => (
        <span key={i}>
          <span className="inline-block overflow-hidden align-top pb-[0.08em]">
            <motion.span
              className="inline-block will-change-transform"
              animate={inView ? { y: "0%", rotate: 0 } : { y: "110%", rotate: 4 }}
              transition={{
                duration: 0.9,
                ease: [0.16, 1, 0.3, 1],
                delay: delay + i * stagger,
              }}
            >
              {unit}
            </motion.span>
          </span>
          {splitBy === "word" && i < units.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}
