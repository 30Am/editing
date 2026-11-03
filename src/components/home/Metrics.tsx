"use client";

import { motion } from "framer-motion";
import RevealText from "@/components/ui/RevealText";
import { useInView } from "@/lib/useInView";
import { metrics } from "@/data/content";

export default function Metrics() {
  return (
    <section className="grain relative border-t border-line bg-ink py-28 text-paper md:py-40">
      <div className="container-edit">
        <span className="eyebrow text-paper/50">06 — The Numbers</span>
        <RevealText as="h2" splitBy="word" className="type-h2 mt-4 max-w-2xl">
          Results you can measure, not just admire.
        </RevealText>

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-paper/10 bg-paper/10 sm:grid-cols-2 lg:grid-cols-3">
          {metrics.map((m, i) => (
            <MetricTile key={m.label} label={m.label} value={m.value} note={m.note} index={i} />
          ))}
        </div>

        <p className="mt-8 max-w-xl text-sm text-paper/50">
          Numbers only appear here once they&rsquo;re verified and cleared for
          publication — nothing on this page is estimated.
        </p>
      </div>
    </section>
  );
}

function MetricTile({
  label,
  value,
  note,
  index,
}: {
  label: string;
  value?: string;
  note: string;
  index: number;
}) {
  const particles = Array.from({ length: 8 }, (_, i) => i);
  const [ref, inView] = useInView<HTMLDivElement>({ amount: 0.5 });

  return (
    <motion.div
      ref={ref}
      animate={{ opacity: inView ? 1 : 0 }}
      transition={{ duration: 0.6, delay: index * 0.06 }}
      className="relative flex min-h-[180px] flex-col justify-between overflow-hidden bg-ink p-6"
    >
      <div className="pointer-events-none absolute inset-0">
        {particles.map((p) => (
          <motion.span
            key={p}
            className="absolute h-1 w-1 rounded-full bg-film-green/60"
            style={{ left: `${10 + p * 11}%`, top: `${20 + (p % 3) * 22}%` }}
            animate={
              inView
                ? { opacity: [0, 1, 0.4], scale: [0, 1.4, 1], x: 0 }
                : { opacity: 0, scale: 0, x: (p % 2 === 0 ? -1 : 1) * 20 }
            }
            transition={{ duration: 1.1, delay: index * 0.06 + p * 0.05, ease: [0.16, 1, 0.3, 1] }}
          />
        ))}
      </div>

      <p className="eyebrow relative text-paper/50">{label}</p>

      {value && (
        <motion.p
          className="relative font-display text-4xl font-medium tracking-tight text-film-green sm:text-5xl"
          animate={
            inView
              ? { opacity: 1, y: 0, filter: "blur(0px)" }
              : { opacity: 0, y: 10, filter: "blur(6px)" }
          }
          transition={{ duration: 0.7, delay: index * 0.06 + 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          {value}
        </motion.p>
      )}

      <p className="relative font-mono text-xs text-paper/40">{note}</p>
    </motion.div>
  );
}
