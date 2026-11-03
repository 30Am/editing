import type { Metadata } from "next";
import RevealText from "@/components/ui/RevealText";
import MagneticButton from "@/components/ui/MagneticButton";
import { contactDetails } from "@/data/content";

export const metadata: Metadata = {
  title: "Contact  -  Amlan Tripathy",
  description: "Let's talk about your next video.",
};

export default function ContactPage() {
  return (
    <div className="flex min-h-[100svh] flex-col items-center justify-center px-6 pt-[var(--nav-h)] text-center">
      <span className="eyebrow text-ink-soft">Hire an Editor</span>

      <RevealText
        as="h1"
        splitBy="word"
        className="h-display mt-6 max-w-4xl justify-center"
      >
        Let&rsquo;s talk about your next video.
      </RevealText>

      <p className="body-lg mt-6 max-w-xl text-ink-soft">
        Tell me about your channel, your podcast, or your brand  -  I&rsquo;ll get
        back to you within a day.
      </p>

      <div className="mt-12">
        <MagneticButton
          href={`mailto:${contactDetails.email}`}
          variant="solid"
          cursor="view"
        >
          {contactDetails.email}
        </MagneticButton>
      </div>

      <div className="mt-10 flex items-center gap-6 text-sm text-ink-soft">
        <a
          href={contactDetails.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="link"
          className="underline decoration-line underline-offset-4 transition-colors hover:text-indigo hover:decoration-indigo"
        >
          {contactDetails.bookingLabel}
        </a>
        {contactDetails.socials.map((s) => (
          <a
            key={s.label}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="link"
            className="underline decoration-line underline-offset-4 transition-colors hover:text-indigo hover:decoration-indigo"
          >
            {s.label}
          </a>
        ))}
      </div>
    </div>
  );
}
