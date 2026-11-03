import type { Metadata } from "next";
import RevealText from "@/components/ui/RevealText";
import { philosophyLines } from "@/data/content";

export const metadata: Metadata = {
  title: "Editing Philosophy  -  Amlan Tripathy",
  description: "Good editing isn't decoration - it's strategy made visible.",
};

const SUPPORT = [
  "A consultant's instinct never left  -  every project starts with the question a client hasn't asked yet: what does this content need to prove, and to whom?",
  "Craft is not the goal. It's the delivery mechanism for a decision that was made earlier  -  about audience, about timing, about what the story is actually for.",
  "Attention is earned one cut at a time. A frame that doesn't move the story forward is a frame that's costing you the next one.",
  "Speed without direction just produces more content. The work here is choosing what deserves the frame in the first place.",
];

export default function PhilosophyPage() {
  return (
    <div className="pt-[var(--nav-h)]">
      <section className="container-edit py-20 md:py-28">
        <span className="eyebrow text-ink-soft">Editing Philosophy</span>
        <RevealText as="h1" splitBy="word" className="h-display mt-4 max-w-4xl">
          Strategy made visible.
        </RevealText>
      </section>

      <div className="flex flex-col">
        {philosophyLines.map((line, i) => (
          <section
            key={line}
            className="container-edit grid gap-6 border-t border-line py-20 md:grid-cols-[1fr_1fr] md:items-center md:py-28"
          >
            <RevealText
              as="h2"
              splitBy="word"
              className={i % 2 === 1 ? "type-h1 md:order-2" : "type-h1"}
            >
              {line}
            </RevealText>
            <p className="body-lg text-ink-soft">{SUPPORT[i]}</p>
          </section>
        ))}
      </div>

      <section className="grain border-t border-line bg-ink py-24 text-paper md:py-32">
        <div className="container-edit">
          <RevealText as="h2" splitBy="word" className="type-h1 max-w-3xl">
            None of this matters without the discipline to cut what doesn&rsquo;t serve it.
          </RevealText>
          <p className="body-lg mt-6 max-w-xl text-paper/60">
            That discipline  -  knowing what to leave out  -  is the difference
            between content and a story. It&rsquo;s the same instinct that once
            built strategy decks, now pointed at a timeline.
          </p>
        </div>
      </section>
    </div>
  );
}
