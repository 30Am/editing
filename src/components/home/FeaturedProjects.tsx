import RevealText from "@/components/ui/RevealText";
import MagneticButton from "@/components/ui/MagneticButton";
import ProjectCard, { PROJECT_TONES } from "@/components/work/ProjectCard";
import { projects } from "@/data/content";

export default function FeaturedProjects() {
  return (
    <section className="relative border-t border-line bg-paper py-28 md:py-40">
      <div className="container-edit">
        <div className="mb-16 flex flex-col items-start gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="eyebrow text-ink-soft">03  -  Selected Edits</span>
            <RevealText as="h2" splitBy="word" className="type-h2 mt-4 max-w-xl">
              A few edits built to be watched, not skipped.
            </RevealText>
          </div>
          <MagneticButton href="/work" variant="outline">
            View all work
          </MagneticButton>
        </div>

        <div className="grid gap-8 sm:grid-cols-2">
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} tone={PROJECT_TONES[i % PROJECT_TONES.length]} />
          ))}
        </div>
      </div>
    </section>
  );
}
