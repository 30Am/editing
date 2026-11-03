"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { contactDetails } from "@/data/content";

const LINKS = [
  { href: "/work", label: "Selected Work" },
  { href: "/philosophy", label: "Philosophy" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/journal", label: "Journal" },
];

export default function Nav() {
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setSolid(y > 24);
      if (Math.abs(y - lastY.current) > 6) {
        setHidden(y > lastY.current && y > 200);
        lastY.current = y;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-[80] transition-transform duration-500",
        hidden && !open ? "-translate-y-full" : "translate-y-0"
      )}
      style={{ transitionTimingFunction: "var(--ease-in-out)" }}
    >
      <div
        className={cn(
          "border-b transition-colors duration-500",
          solid || open
            ? "border-line bg-paper/85 backdrop-blur-md"
            : "border-transparent bg-transparent"
        )}
      >
        <nav className="container-edit flex h-[var(--nav-h)] items-center justify-between">
          <Link
            href="/"
            data-cursor="link"
            className="font-display text-sm font-medium tracking-tight"
          >
            Amlan Tripathy
          </Link>

          <ul className="hidden items-center gap-9 md:flex">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  data-cursor="link"
                  className={cn(
                    "relative text-sm font-medium tracking-tight text-ink-soft transition-colors hover:text-ink",
                    pathname === l.href && "text-ink"
                  )}
                >
                  {l.label}
                  <span
                    className={cn(
                      "absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-indigo transition-transform duration-300",
                      pathname === l.href && "scale-x-100"
                    )}
                  />
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-6">
            <a
              href={contactDetails.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="link"
              className="hidden text-sm font-medium tracking-tight underline decoration-line underline-offset-4 transition-colors hover:text-indigo hover:decoration-indigo md:inline-block"
            >
              Let&rsquo;s talk
            </a>
            <button
              aria-label="Toggle menu"
              onClick={() => setOpen((v) => !v)}
              className="relative z-10 flex h-9 w-9 flex-col items-center justify-center gap-[5px] md:hidden"
            >
              <span
                className={cn(
                  "h-px w-5 bg-ink transition-transform duration-300",
                  open && "translate-y-[3px] rotate-45"
                )}
              />
              <span
                className={cn(
                  "h-px w-5 bg-ink transition-transform duration-300",
                  open && "-translate-y-[3px] -rotate-45"
                )}
              />
            </button>
          </div>
        </nav>
      </div>

      <div
        className={cn(
          "grid overflow-hidden bg-paper transition-[grid-template-rows] duration-500 md:hidden",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
        style={{ transitionTimingFunction: "var(--ease-in-out)" }}
      >
        <div className="min-h-0">
          <ul className="container-edit flex flex-col gap-1 border-b border-line py-6">
            {[...LINKS, { href: "/contact", label: "Contact" }].map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="block py-3 text-2xl font-display font-medium tracking-tight"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}
