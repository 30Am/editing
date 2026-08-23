import type { Metadata } from "next";
import RevealText from "@/components/ui/RevealText";
import MagneticButton from "@/components/ui/MagneticButton";
import { milestones, roles } from "@/data/content";

export const metadata: Metadata = {
  title: "About — Amlan Tripathy",
  description:
    "Amlan Tripathy is a video editor working with US creators, podcasters, and brands — combining the analytical thinking of a former management consultant with the storytelling instincts of a cinematic editor.",
};

export default function AboutPage() {
  return (
    <div className="pt-[var(--nav-h)]">
      <section className="container-edit py-20 md:py-28">
        <span className="eyebrow text-ink-soft">About Amlan</span>
        <RevealText as="h1" splitBy="word" className="h-display mt-4 max-w-4xl">
          A video editor who thinks like a strategist.
        </RevealText>
        <p className="body-lg mt-6 max-w-2xl text-ink-soft">
          Amlan Tripathy is a {roles.slice(0, -1).join(", ")}, and {roles[roles.length - 1]}.
          He works with US-based creators, podcasters, and brands to turn raw
          footage into content that holds attention, grows an audience, and
          drives measurable business impact.
        </p>
      </section>

      <section className="container-edit grid gap-10 border-t border-line py-20 md:grid-cols-2 md:py-28">
        <div>
          <h2 className="type-h2">The unusual part of the path</h2>
          <p className="body-lg mt-4 text-ink-soft">
            Most editors arrive through software. Amlan arrived through
            strategy — starting as a management consultant at McKinsey &amp;
            Company, where the discipline was structured problem-solving, not
            storytelling.
          </p>
          <p className="body-lg mt-4 text-ink-soft">
            That background didn&rsquo;t get left behind when he moved into
            editing — it became the lens. Every timeline still starts as a
            business problem before it becomes a cut list.
          </p>
        </div>
        <div>
          <h2 className="type-h2">Why it matters for your video</h2>
          <p className="body-lg mt-4 text-ink-soft">
            A typical editor can tell you if a cut looks good. Amlan can tell
            you if it will work — and why — because the thinking behind it
            starts the same way a growth strategy would: audience, objective,
            and what success actually needs to look like.
          </p>
          <p className="body-lg mt-4 text-ink-soft">
            He&rsquo;s currently taking on a small number of new editing clients
            — creators and brands who publish consistently and need a
            dependable editor, not a one-off gig.
          </p>
        </div>
      </section>

      <section className="border-t border-line bg-paper-dim py-20 md:py-28">
        <div className="container-edit">
          <h2 className="type-h2">A few clients he&rsquo;s edited for</h2>
          <div className="mt-10 flex flex-col">
            {milestones.map((m) => (
              <div
                key={m.title}
                className="grid gap-2 border-t border-line py-6 sm:grid-cols-[6rem_1fr]"
              >
                <span className="font-mono text-xs text-ink-soft">{m.year}</span>
                <div>
                  <p className="font-display text-lg font-medium tracking-tight">
                    {m.title}
                  </p>
                  <p className="mt-1 max-w-xl text-sm text-ink-soft">{m.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-edit flex flex-col items-start gap-8 py-20 md:flex-row md:items-center md:justify-between md:py-28">
        <div>
          <h2 className="type-h2 max-w-lg">Currently taking on a small number of new editing clients.</h2>
        </div>
        <MagneticButton href="/contact" variant="solid" cursor="view">
          Get in touch
        </MagneticButton>
      </section>
    </div>
  );
}
