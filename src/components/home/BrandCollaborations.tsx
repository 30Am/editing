"use client";

import { motion } from "framer-motion";
import RevealText from "@/components/ui/RevealText";
import { cn } from "@/lib/utils";
import { useInView } from "@/lib/useInView";

const WORLDS = [
  {
    category: "Startups",
    tone: "bg-indigo/10 border-indigo/20",
    image: "/images/collaborations/snitch.png",
  },
  {
    category: "Founders",
    tone: "bg-crimson/10 border-crimson/20",
    image: "/images/collaborations/founder.png",
  },
  {
    category: "Doctors And Hospitals",
    tone: "bg-film-green/10 border-film-green/30",
    image: "/images/collaborations/doctor.jpg",
  },
  {
    category: "Podcast",
    tone: "bg-ink/5 border-ink/15",
    image: "/images/collaborations/podcast.png",
  },
];

export default function BrandCollaborations() {
  return (
    <section className="relative border-t border-line bg-paper-dim py-28 md:py-40">
      <div className="container-edit">
        <span className="eyebrow text-ink-soft">05 — Who I Work With</span>
        <RevealText as="h2" splitBy="word" className="type-h2 mt-4 max-w-2xl">
          Creators and brands who need video that performs.
        </RevealText>
        <p className="body-lg mt-5 max-w-xl text-ink-soft">
          Full case studies are being prepared for publication with real
          project outcomes and client approval. Until then, here&rsquo;s who this
          works best for.
        </p>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {WORLDS.map((w, i) => (
            <WorldCard key={w.category} world={w} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function WorldCard({ world: w, index: i }: { world: (typeof WORLDS)[number]; index: number }) {
  const [ref, inView] = useInView<HTMLDivElement>({ amount: 0.4 });

  return (
    <motion.div
      ref={ref}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "group collaboration-card relative flex flex-col justify-between rounded-2xl border p-6 outline-none transition-colors duration-300",
        w.tone
      )}
    >
      <motion.div
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 6 + i, repeat: Infinity, ease: "easeInOut" }}
        className="flex h-full flex-col justify-between"
      >
        <div className="flex flex-col gap-4">
          <p className="font-display text-xl font-medium tracking-tight text-ink">
            {w.category}
          </p>

          <div className="image-container relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-ink/5 border border-line-soft">
            <img 
              src={w.image} 
              alt={w.category} 
              className={cn(
                "h-full w-full",
                w.category === "Startups" ? "object-contain bg-black p-6" : "object-cover object-top"
              )} 
            />
          </div>
        </div>

        <div className="mt-2" />
      </motion.div>
    </motion.div>
  );
}
