import type { Metadata } from "next";
import Link from "next/link";
import RevealText from "@/components/ui/RevealText";
import { ArrowRight } from "@/components/ui/Icon";
import { journalPosts } from "@/data/content";

export const metadata: Metadata = {
  title: "Journal — Amlan Tripathy",
  description: "Notes on editing, storytelling, marketing, AI tools, and the creator economy.",
};

export default function JournalPage() {
  return (
    <div className="pt-[var(--nav-h)]">
      <section className="container-edit py-20 md:py-28">
        <span className="eyebrow text-ink-soft">Journal</span>
        <RevealText as="h1" splitBy="word" className="h-display mt-4 max-w-4xl">
          Notes from the timeline.
        </RevealText>
        <p className="body-lg mt-6 max-w-xl text-ink-soft">
          Thoughts on editing, storytelling, marketing, AI tools, and the
          creator economy — written the way the work gets made: considered,
          not rushed.
        </p>
      </section>

      <section className="container-edit grid gap-px overflow-hidden rounded-2xl border border-line bg-line pb-28 md:grid-cols-2 md:pb-40 lg:grid-cols-3">
        {journalPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/journal/${post.slug}`}
            data-cursor="view"
            className="group flex flex-col justify-between gap-10 bg-paper p-7 transition-colors duration-300 hover:bg-paper-dim"
          >
            <div className="flex items-center justify-between">
              <span className="eyebrow text-ink-soft">{post.category}</span>
              <span className="font-mono text-xs text-ink-soft">{post.readTime}</span>
            </div>
            <div>
              <p className="font-display text-xl font-medium leading-tight tracking-tight text-ink transition-colors group-hover:text-indigo">
                {post.title}
              </p>
              <p className="mt-3 text-sm text-ink-soft">{post.excerpt}</p>
            </div>
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft transition-colors group-hover:text-indigo">
              Read
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
      </section>
    </div>
  );
}
