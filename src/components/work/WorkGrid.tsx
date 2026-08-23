"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import ProjectCard, { PROJECT_TONES } from "@/components/work/ProjectCard";
import type { Project } from "@/data/content";

export default function WorkGrid({ projects }: { projects: Project[] }) {
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(projects.map((p) => p.category)))],
    [projects]
  );
  const [active, setActive] = useState("All");

  const filtered =
    active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <div>
      <div className="mb-12 flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            data-cursor="link"
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium tracking-tight transition-colors duration-300",
              active === c
                ? "border-ink bg-ink text-paper"
                : "border-line text-ink-soft hover:border-ink/40 hover:text-ink"
            )}
          >
            {c}
          </button>
        ))}
      </div>

      <motion.div layout className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p, i) => (
          <motion.div
            key={p.slug}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
          >
            <ProjectCard project={p} tone={PROJECT_TONES[i % PROJECT_TONES.length]} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
