"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Plus } from "@/components/ui/Icon";
import type { Service } from "@/data/content";

export default function ServicesWorkflow({ services }: { services: Service[] }) {
  const [openSlug, setOpenSlug] = useState<string | null>(services[0]?.slug ?? null);

  return (
    <div className="divide-y divide-line border-y border-line">
      {services.map((s, i) => {
        const open = openSlug === s.slug;
        return (
          <div key={s.slug}>
            <button
              onClick={() => setOpenSlug(open ? null : s.slug)}
              data-cursor="link"
              className="group flex w-full items-center justify-between gap-6 py-7 text-left"
            >
              <span className="flex items-center gap-6">
                <span className="font-mono text-xs text-ink-soft">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={cn(
                    "font-display text-2xl font-medium tracking-tight transition-colors sm:text-3xl",
                    open ? "text-indigo" : "text-ink group-hover:text-indigo"
                  )}
                >
                  {s.title}
                </span>
              </span>
              <span className="flex items-center gap-6">
                <span className="hidden text-sm text-ink-soft sm:inline">{s.short}</span>
                <motion.span
                  animate={{ rotate: open ? 45 : 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line"
                >
                  <Plus className="h-3.5 w-3.5" />
                </motion.span>
              </span>
            </button>

            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="grid gap-8 pb-10 pl-0 sm:grid-cols-[1fr_1fr] sm:pl-16">
                    <p className="body-lg max-w-md text-ink-soft">{s.description}</p>
                    <div className="h-32 overflow-hidden rounded-xl border border-line bg-paper-dim">
                      <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                        className="h-full origin-left bg-gradient-to-r from-indigo/20 via-film-green/15 to-transparent"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
