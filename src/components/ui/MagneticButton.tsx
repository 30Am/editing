"use client";

import { useRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowRight } from "@/components/ui/Icon";

type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
  variant?: "solid" | "outline";
  cursor?: "link" | "view";
};

export default function MagneticButton({
  href,
  children,
  className,
  variant = "solid",
  cursor = "link",
}: Props) {
  const ref = useRef<HTMLAnchorElement>(null);

  const onMove = (e: React.PointerEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el || e.pointerType === "touch") return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.35}px, ${y * 0.5}px)`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0, 0)";
  };

  return (
    <Link
      ref={ref}
      href={href}
      data-cursor={cursor}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={cn(
        "group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full px-8 py-4 text-sm font-medium tracking-tight transition-[transform,background-color,color] duration-500 ease-out will-change-transform",
        variant === "solid" &&
          "bg-ink text-paper hover:bg-indigo",
        variant === "outline" &&
          "border border-ink/25 text-ink hover:border-indigo hover:text-indigo",
        className
      )}
      style={{ transitionTimingFunction: "var(--ease-out)" }}
    >
      <span className="relative z-10">{children}</span>
      <ArrowRight
        className="relative z-10 h-3.5 w-3.5 shrink-0 transition-transform duration-500 ease-out group-hover:translate-x-1"
      />
    </Link>
  );
}
