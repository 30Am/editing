import type { Metadata } from "next";
import RevealText from "@/components/ui/RevealText";
import WorkGrid from "@/components/work/WorkGrid";
import { projects } from "@/data/content";

export const metadata: Metadata = {
  title: "Selected Work  -  Amlan Tripathy",
  description: "A selection of edits, campaigns, and content systems by Amlan Tripathy.",
};

export default function WorkPage() {
  return (
    <div className="pt-[var(--nav-h)]">
      <section className="container-edit py-20 md:py-28">
        <span className="eyebrow text-ink-soft">Selected Work</span>
        <RevealText as="h1" splitBy="word" className="h-display mt-4 max-w-4xl">
          Edits built with intent.
        </RevealText>
        <p className="body-lg mt-6 max-w-xl text-ink-soft">
          Case studies are being prepared for publication with real client
          approval. Each entry below will link to a full breakdown of the
          challenge, process, and result.
        </p>
      </section>

      <section className="container-edit pb-28 md:pb-40">
        <WorkGrid projects={projects} />
      </section>
    </div>
  );
}
