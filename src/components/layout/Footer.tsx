import Link from "next/link";
import RevealText from "@/components/ui/RevealText";
import MagneticButton from "@/components/ui/MagneticButton";
import { contactDetails } from "@/data/content";

export default function Footer() {
  return (
    <footer className="grain relative border-t border-line bg-ink text-paper">
      <div className="container-edit py-24 md:py-32">
        <RevealText
          as="h2"
          className="type-h1 max-w-3xl"
          splitBy="word"
        >
          Let&rsquo;s edit something people can&rsquo;t stop watching.
        </RevealText>

        <div className="mt-10">
          <MagneticButton
            href="/contact"
            variant="solid"
            className="!bg-paper !text-ink hover:!bg-film-green"
            cursor="view"
          >
            Start your project
          </MagneticButton>
        </div>

        <div className="mt-24 grid grid-cols-2 gap-10 border-t border-paper/15 pt-10 text-sm text-paper/60 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <p className="font-display text-base text-paper">Amlan Tripathy</p>
            <p className="mt-1">Video Editor · Creative Strategist</p>
          </div>

          <nav className="flex flex-col gap-2">
            <Link href="/work" className="transition-colors hover:text-paper">
              Selected Work
            </Link>
            <Link href="/philosophy" className="transition-colors hover:text-paper">
              Philosophy
            </Link>
            <Link href="/services" className="transition-colors hover:text-paper">
              Services
            </Link>
          </nav>

          <nav className="flex flex-col gap-2">
            <Link href="/about" className="transition-colors hover:text-paper">
              About
            </Link>
            <Link href="/journal" className="transition-colors hover:text-paper">
              Journal
            </Link>
            <Link href="/contact" className="transition-colors hover:text-paper">
              Contact
            </Link>
          </nav>

          <nav className="flex flex-col gap-2">
            <a href={`mailto:${contactDetails.email}`} className="transition-colors hover:text-paper">
              Email
            </a>
            {contactDetails.socials.map((s) => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-paper"
              >
                {s.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-2 text-xs text-paper/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Amlan Tripathy. All rights reserved.</p>
          <p>Stories don&rsquo;t go viral. They&rsquo;re engineered.</p>
        </div>
      </div>
    </footer>
  );
}
