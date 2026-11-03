import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import RevealText from "@/components/ui/RevealText";
import { ArrowLeft } from "@/components/ui/Icon";
import { journalPosts } from "@/data/content";

export function generateStaticParams() {
  return journalPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = journalPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return { title: `${post.title}  -  Journal`, description: post.excerpt };
}

export default async function JournalArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = journalPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <div className="pt-[var(--nav-h)]">
      <article className="container-edit max-w-3xl py-20 md:py-28">
        <Link
          href="/journal"
          data-cursor="link"
          className="eyebrow inline-flex items-center gap-1.5 text-ink-soft transition-colors hover:text-indigo"
        >
          <ArrowLeft className="h-3 w-3" /> Journal
        </Link>

        <div className="mt-8 flex items-center gap-4">
          <span className="eyebrow text-ink-soft">{post.category}</span>
          <span className="h-1 w-1 rounded-full bg-ink-soft" />
          <span className="font-mono text-xs text-ink-soft">{post.readTime} read</span>
        </div>

        <RevealText as="h1" splitBy="word" className="type-h1 mt-5">
          {post.title}
        </RevealText>

        <p className="body-lg mt-8 text-ink-soft">{post.excerpt}</p>

        {post.placeholder && (
          <div className="mt-10 rounded-xl border border-dashed border-line bg-paper-dim/60 p-6 text-sm text-ink-soft">
            The full article is being written. Check back soon, or reach out
            directly if you&rsquo;d like to discuss the ideas above now.
          </div>
        )}
      </article>
    </div>
  );
}
