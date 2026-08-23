"use client";

import { motion } from "framer-motion";
import RevealText from "@/components/ui/RevealText";
import { useInView } from "@/lib/useInView";
import { testimonials, type Testimonial } from "@/data/content";

export default function Testimonials() {
  return (
    <section className="relative border-t border-line bg-paper py-28 md:py-40">
      <div className="container-edit">
        <span className="eyebrow text-ink-soft">07 — Client Stories</span>
        <RevealText as="h2" splitBy="word" className="type-h2 mt-4 max-w-2xl">
          What it&rsquo;s actually like working with me.
        </RevealText>

        {testimonials.length > 0 ? (
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <TestimonialCard key={t.name} testimonial={t} index={i} />
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial: t, index: i }: { testimonial: Testimonial; index: number }) {
  const [ref, inView] = useInView<HTMLElement>({ amount: 0.4 });
  return (
    <motion.figure
      ref={ref}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.7, delay: i * 0.1 }}
      className="rounded-2xl border border-line bg-paper-dim/60 p-7 backdrop-blur-sm"
    >
      <blockquote className="body-lg text-ink">&ldquo;{t.quote}&rdquo;</blockquote>
      <figcaption className="mt-6 text-sm text-ink-soft">
        <span className="font-medium text-ink">{t.name}</span> — {t.role}
      </figcaption>
    </motion.figure>
  );
}

function EmptyState() {
  const [ref, inView] = useInView<HTMLDivElement>({ amount: 0.5 });
  return (
    <motion.div
      ref={ref}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.7 }}
      className="mt-16 flex min-h-[220px] flex-col items-center justify-center rounded-2xl border border-dashed border-line bg-paper-dim/50 px-8 text-center"
    >
      <p className="type-h2 max-w-md text-ink-soft">Client stories are on their way.</p>
      <p className="body-lg mt-3 max-w-md text-ink-soft">
        Real, attributed testimonials will appear here once clients have
        approved them for publication — nothing here is invented.
      </p>
    </motion.div>
  );
}
