import type { Metadata } from "next";
import RevealText from "@/components/ui/RevealText";
import MagneticButton from "@/components/ui/MagneticButton";
import ServicesWorkflow from "@/components/services/ServicesWorkflow";
import { services } from "@/data/content";

export const metadata: Metadata = {
  title: "Editing Services  -  Amlan Tripathy",
  description: "Video editing for YouTube, Shorts, podcasts, and brand films  -  built for US creators and businesses.",
};

export default function ServicesPage() {
  return (
    <div className="pt-[var(--nav-h)]">
      <section className="container-edit py-20 md:py-28">
        <span className="eyebrow text-ink-soft">Editing Services</span>
        <RevealText as="h1" splitBy="word" className="h-display mt-4 max-w-4xl">
          Strategy first. Editing second.
        </RevealText>
        <p className="body-lg mt-6 max-w-xl text-ink-soft">
          Seven ways to work together  -  from a single video to an ongoing
          editing partnership. Select one to expand it.
        </p>
      </section>

      <section className="container-edit pb-28 md:pb-40">
        <ServicesWorkflow services={services} />
      </section>

      <section className="grain border-t border-line bg-ink py-24 text-paper md:py-32">
        <div className="container-edit flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
          <RevealText as="h2" splitBy="word" className="type-h1 max-w-xl">
            Not sure which edit you need?
          </RevealText>
          <MagneticButton
            href="/contact"
            variant="solid"
            className="!bg-paper !text-ink hover:!bg-film-green"
            cursor="view"
          >
            Let&rsquo;s talk it through
          </MagneticButton>
        </div>
      </section>
    </div>
  );
}
