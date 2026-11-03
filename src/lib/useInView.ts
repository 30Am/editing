"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Manual IntersectionObserver hook. framer-motion's `whileInView` does not
 * reliably fire in this project's framer-motion version (verified via
 * headless-browser inspection), so scroll-triggered reveals use this
 * instead, driving a plain `animate` prop.
 */
export function useInView<T extends HTMLElement>(
  options: { once?: boolean; amount?: number } = {}
) {
  const { once = true, amount = 0.4 } = options;
  const ref = useRef<T>(null);
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
      { threshold: amount }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [once, amount]);

  return [ref, inView] as const;
}
