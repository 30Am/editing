import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import RevealText from "@/components/ui/RevealText";
import MagneticButton from "@/components/ui/MagneticButton";
import { ArrowLeft } from "@/components/ui/Icon";
import { projects } from "@/data/content";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.title} — Amlan Tripathy`,
    description: project.challenge,
  };
}

const SECTIONS: Array<{ key: keyof typeof BLANK; label: string; n: string }> = [
  { key: "challenge", label: "Challenge", n: "01" },
  { key: "research", label: "Research", n: "02" },
  { key: "approach", label: "Creative Process & Storyboarding", n: "03" },
  { key: "editing", label: "Editing", n: "04" },
  { key: "marketingStrategy", label: "Marketing Strategy", n: "05" },
  { key: "execution", label: "Execution", n: "06" },
  { key: "outcome", label: "Final Results", n: "07" },
  { key: "lessonsLearned", label: "Lessons Learned", n: "08" },
];

const BLANK = {
  challenge: "",
  research: "",
  approach: "",
  editing: "",
  marketingStrategy: "",
  execution: "",
  outcome: "",
  lessonsLearned: "",
};

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const next = projects[(currentIndex + 1) % projects.length];

  return (
    <div className="pt-[var(--nav-h)]">
      <section className="container-edit py-20 md:py-28">
        <Link
          href="/work"
          data-cursor="link"
          className="eyebrow inline-flex items-center gap-1.5 text-ink-soft transition-colors hover:text-indigo"
        >
          <ArrowLeft className="h-3 w-3" /> All work
        </Link>

        <div className="mt-8 flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="eyebrow text-ink-soft">{project.category}</span>
            <RevealText as="h1" splitBy="word" className="h-display mt-4 max-w-3xl">
              {project.title}
            </RevealText>
            <p className="body-lg mt-4 text-ink-soft">{project.client}</p>
          </div>
          {project.placeholder && (
            <span className="eyebrow shrink-0 rounded-full bg-ink px-4 py-2 text-paper">
              Full case study coming soon
            </span>
          )}
        </div>
      </section>

      <section className="aspect-video w-full bg-gradient-to-br from-indigo/15 via-paper-dim to-paper-dim" />

      <section className="container-edit py-20 md:py-28">
        <div className="grid gap-16 md:grid-cols-[repeat(auto-fit,minmax(0,1fr))]">
          {SECTIONS.map((s) => {
            const value = project[s.key];
            return (
              <div key={s.key} className="border-t border-line pt-6">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-xs text-ink-soft">{s.n}</span>
                  <h2 className="type-h2">{s.label}</h2>
                </div>
                <p className="body-lg mt-4 max-w-2xl text-ink-soft">
                  {value && value.length > 0
                    ? value
                    : "This section will be filled in once the confirmed project details are supplied."}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="container-edit flex flex-col items-start justify-between gap-8 border-t border-line py-20 md:flex-row md:items-center">
        <div>
          <p className="eyebrow text-ink-soft">Next case study</p>
          <p className="type-h2 mt-2">{next.title}</p>
        </div>
        <MagneticButton href={`/work/${next.slug}`} variant="outline" cursor="view">
          View next
        </MagneticButton>
      </section>
    </div>
  );
}
