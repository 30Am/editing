"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "@/lib/useInView";
import RevealText from "@/components/ui/RevealText";
import { cn } from "@/lib/utils";

/* ─── Data ─────────────────────────────────────────────────── */

const BRANDS = [
  { name: "Skinvest", domain: "skinvest.in" },
  { name: "Italian Colony", domain: "italiancolony.in" },
  { name: "Mlada", domain: "mlada.in" },
  { name: "Futurense", domain: "futurense.io" },
  { name: "VAMA", domain: "thevama.app" },
  { name: "Elda Health", domain: "eldahealth.com" },
  { name: "Now&Me", domain: "nowandme.com" },
  { name: "MedPay", domain: "medpay.in" },
  { name: "MyCaptain", domain: "mycaptain.in" },
  { name: "vidyo.ai", domain: "vidyo.ai" },
  { name: "iMumz", domain: "imumz.com" },
  { name: "kindly", domain: "kindly.in" },
  { name: "Totem", domain: "totem.vc" },
  { name: "The Orby House", domain: "theorbyhouse.com" },
  { name: "1% Club", domain: "1percentclub.com" },
];

const METRICS = [
  { label: "Avg ROAS delivered", value: "3.5×", note: "Across D2C ecom clients on Meta + Google" },
  { label: "Leads scaled", value: "7→104", note: "Daily quality leads — Futurense B2B campaign" },
  { label: "CAC reduced", value: "44%", note: "Skinvest: ₹1,240 → ₹695 in 4 months" },
  { label: "Sales growth", value: "+30%", note: "Consistent MoM for Mlada fashion brand" },
  { label: "Daily players", value: "+20%", note: "Taj Rummy app across iOS + Android" },
  { label: "Instagram reach lift", value: "+3%", note: "Reach-to-followers ratio for VAMA (189K)" },
];

const CASE_STUDIES = [
  {
    brand: "Skinvest",
    domain: "skinvest.in",
    category: "D2C Skincare - Performance Marketing + CRO",
    headline: "Cut CAC by 44%, lifted ROAS by 35%",
    duration: "4 months",
    color: "indigo",
    metrics: [
      { label: "CAC Before", value: 1240, unit: "₹", improved: false },
      { label: "CAC After", value: 695, unit: "₹", improved: true },
      { label: "ROAS Before", value: 2.72, unit: "×", improved: false },
      { label: "ROAS After", value: 3.67, unit: "×", improved: true },
    ],
    cac: { before: 1240, after: 695 },
    roas: { before: 2.72, after: 3.67 },
    tactics: [
      "Complete UI/UX website revamp",
      "WhatsApp upsell + cross-sell automation",
      "5 video + 7 image creatives tested weekly",
      "Continuous landing page A/B optimization",
      "Meta ads rapid creative iteration",
    ],
  },
  {
    brand: "Italian Colony",
    domain: "italiancolony.in",
    category: "D2C Fashion - Performance Marketing + CRO",
    headline: "ROAS from 3.1× to 4.0× in one month",
    duration: "1 month",
    color: "crimson",
    metrics: [
      { label: "CAC Before", value: 540, unit: "₹", improved: false },
      { label: "CAC After", value: 495, unit: "₹", improved: true },
      { label: "ROAS Before", value: 3.12, unit: "×", improved: false },
      { label: "ROAS After", value: 3.97, unit: "×", improved: true },
    ],
    cac: { before: 540, after: 495 },
    roas: { before: 3.12, after: 3.97 },
    tactics: [
      "Heavy landing page optimization (+1.2% view-to-cart rate)",
      "Weekend + Thursday flash sales cadence",
      "5 creatives/week — 1 winner scaled immediately",
    ],
  },
  {
    brand: "Mlada",
    domain: "mlada.in",
    category: "D2C Fashion - Perf Marketing + CRO + Creative Strategy",
    headline: "30% MoM sales growth, ROAS above 3× sustained",
    duration: "Ongoing",
    color: "film-green",
    metrics: [],
    cac: null,
    roas: { before: 0, after: 3.0 },
    tactics: [
      "Scaled Meta and Google Ads campaigns",
      "Consistent 30% month-on-month revenue growth",
      "ROAS held above 3× across the entire period",
    ],
  },
  {
    brand: "Taj Rummy",
    domain: "tajrummy.com",
    category: "App Marketing - Google UAC + Meta + Apple Search Ads",
    headline: "Daily players up 20%; CAC down ₹250",
    duration: "3 months",
    color: "indigo",
    metrics: [
      { label: "CAC Before", value: 1500, unit: "₹", improved: false },
      { label: "CAC After", value: 1250, unit: "₹", improved: true },
    ],
    cac: { before: 1500, after: 1250 },
    roas: null,
    tactics: [
      "Diversified media mix across Apple Search, Google UAC, Meta",
      "Vernacular video creatives in 4 regional languages",
      "MoEngage lifecycle automation strategy",
      "+20% daily active players",
    ],
  },
  {
    brand: "Futurense",
    domain: "futurense.io",
    category: "B2B EdTech - Lead Generation",
    headline: "Daily leads from 7 to 104 at ₹1,500 CPL",
    duration: "Campaign",
    color: "film-green",
    metrics: [
      { label: "Daily Leads Before", value: 7, unit: "", improved: false },
      { label: "Daily Leads After", value: 104, unit: "", improved: true },
    ],
    cac: { before: 7, after: 104 },
    roas: null,
    tactics: [
      "LinkedIn Ads + Meta Ads + Twitter Ads stack",
      "14.8× lead volume scale maintained",
      "70% of leads converted to hot/qualified stage",
    ],
  },
  {
    brand: "VAMA",
    domain: "thevama.app",
    category: "Consumer App - Social Growth + Influencer Marketing",
    headline: "Reach-to-follower ratio lifted 3% for 189K audience",
    duration: "Ongoing",
    color: "crimson",
    metrics: [],
    cac: null,
    roas: null,
    tactics: [
      "Instagram growth strategy and content collabs",
      "Influencer collaboration campaign management",
      "+3% improvement in reach/follower ratio",
    ],
  },
];

const TESTIMONIALS = [
  {
    name: "Drishti Gupta",
    title: "Co-Founder, Now&Me | Forbes 30 Under 30 Asia",
    quote:
      "His insights have been instrumental in our product growth and digital marketing at Now&Me. What sets Sindhu apart is not just his expertise but also his warm and approachable nature.",
  },
  {
    name: "Ravi Teja Akondi",
    title: "CEO, iMumz | Shark Tank India | Google App Scale Top 30",
    quote:
      "Sindhu's insights on growth & marketing are very unique. Absolutely love the way he approaches the problem at a very basic level. He's one of the best out there when it comes to growth & digital.",
  },
  {
    name: "Sonal Choithani",
    title: "Chief Brand & Communications Officer, Vedanta Limited",
    quote:
      "Sindhu conducted an immersive session on emerging trends in social media for our team and it was extremely well-received. His deep understanding of the digital landscape and his incisive take on it is uniquely his own.",
  },
];

/* ─── ROAS/CAC bar chart ───────────────────────────────────── */

function ComparisonBars({ before, after, label, unit = "×", isLower = false }: {
  before: number;
  after: number;
  label: string;
  unit?: string;
  isLower?: boolean;
}) {
  const [ref, inView] = useInView<HTMLDivElement>({ amount: 0.3 });
  const max = Math.max(before, after) * 1.15;
  const beforePct = (before / max) * 100;
  const afterPct = (after / max) * 100;
  const improved = isLower ? after < before : after > before;

  return (
    <div ref={ref} className="space-y-3">
      <p className="eyebrow text-paper/40">{label}</p>
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <span className="w-12 shrink-0 text-right font-mono text-xs text-paper/40">before</span>
          <div className="relative h-7 flex-1 overflow-hidden rounded-sm bg-paper/5">
            <motion.div
              className="absolute inset-y-0 left-0 rounded-sm bg-paper/20"
              initial={{ width: 0 }}
              animate={inView ? { width: `${beforePct}%` } : { width: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            />
          </div>
          <span className="w-16 shrink-0 font-mono text-sm text-paper/60">{unit === "₹" ? `₹${before.toLocaleString()}` : `${before}${unit}`}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="w-12 shrink-0 text-right font-mono text-xs text-paper/40">after</span>
          <div className="relative h-7 flex-1 overflow-hidden rounded-sm bg-paper/5">
            <motion.div
              className={cn("absolute inset-y-0 left-0 rounded-sm", improved ? "bg-film-green" : "bg-crimson/60")}
              initial={{ width: 0 }}
              animate={inView ? { width: `${afterPct}%` } : { width: 0 }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            />
          </div>
          <span className={cn("w-16 shrink-0 font-mono text-sm font-medium", improved ? "text-film-green" : "text-crimson")}>
            {unit === "₹" ? `₹${after.toLocaleString()}` : `${after}${unit}`}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─── Lead volume chart (special for Futurense) ───────────── */

function LeadVolumeBar({ before, after }: { before: number; after: number }) {
  const [ref, inView] = useInView<HTMLDivElement>({ amount: 0.3 });
  const max = after * 1.1;

  return (
    <div ref={ref} className="space-y-3">
      <p className="eyebrow text-paper/40">Daily quality leads</p>
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <span className="w-12 shrink-0 text-right font-mono text-xs text-paper/40">before</span>
          <div className="relative h-7 flex-1 overflow-hidden rounded-sm bg-paper/5">
            <motion.div
              className="absolute inset-y-0 left-0 rounded-sm bg-paper/20"
              initial={{ width: 0 }}
              animate={inView ? { width: `${(before / max) * 100}%` } : { width: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            />
          </div>
          <span className="w-16 shrink-0 font-mono text-sm text-paper/60">{before}/day</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="w-12 shrink-0 text-right font-mono text-xs text-paper/40">after</span>
          <div className="relative h-7 flex-1 overflow-hidden rounded-sm bg-paper/5">
            <motion.div
              className="absolute inset-y-0 left-0 rounded-sm bg-film-green"
              initial={{ width: 0 }}
              animate={inView ? { width: `${(after / max) * 100}%` } : { width: 0 }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            />
          </div>
          <span className="w-16 shrink-0 font-mono text-sm font-medium text-film-green">{after}/day</span>
        </div>
      </div>
    </div>
  );
}

/* ─── Case Study card ──────────────────────────────────────── */

const COLOR_MAP: Record<string, string> = {
  indigo: "text-indigo",
  crimson: "text-crimson",
  "film-green": "text-film-green",
};

const BORDER_MAP: Record<string, string> = {
  indigo: "border-indigo/30",
  crimson: "border-crimson/30",
  "film-green": "border-film-green/30",
};

function CaseStudyCard({ cs, index }: { cs: (typeof CASE_STUDIES)[0]; index: number }) {
  const [ref, inView] = useInView<HTMLDivElement>({ amount: 0.15 });

  return (
    <motion.div
      ref={ref}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }}
      className={cn(
        "grain relative overflow-hidden rounded-2xl border bg-ink p-8 md:p-10",
        BORDER_MAP[cs.color] ?? "border-paper/10"
      )}
    >
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-paper/10">
            <Image
              src={`https://logo.clearbit.com/${cs.domain}`}
              alt={cs.brand}
              width={40}
              height={40}
              className="h-9 w-9 object-contain"
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
            />
          </div>
          <div>
            <span className="eyebrow text-paper/40">{cs.category}</span>
            <h3 className={cn("type-h2 mt-1", COLOR_MAP[cs.color] ?? "text-paper")}>{cs.brand}</h3>
          </div>
        </div>
        <span className="rounded-full border border-paper/10 px-3 py-1 font-mono text-xs text-paper/40">
          {cs.duration}
        </span>
      </div>

      <p className="body-lg mb-8 text-paper/80">{cs.headline}</p>

      {/* Charts */}
      <div className="mb-8 space-y-5">
        {cs.cac && cs.brand !== "Futurense" && (
          <ComparisonBars
            before={cs.cac.before}
            after={cs.cac.after}
            label="Customer Acquisition Cost"
            unit="₹"
            isLower={true}
          />
        )}
        {cs.brand === "Futurense" && cs.cac && (
          <LeadVolumeBar before={cs.cac.before} after={cs.cac.after} />
        )}
        {cs.roas && cs.roas.before > 0 && (
          <ComparisonBars
            before={cs.roas.before}
            after={cs.roas.after}
            label="Return on Ad Spend"
            unit="×"
            isLower={false}
          />
        )}
        {cs.roas && cs.roas.before === 0 && (
          <div className="space-y-2">
            <p className="eyebrow text-paper/40">ROAS sustained</p>
            <div className="flex items-center gap-3">
              <span className="w-12 shrink-0" />
              <div className="flex-1">
                <RoasSustainedBar target={cs.roas.after} />
              </div>
              <span className="w-16 shrink-0 font-mono text-sm font-medium text-film-green">
                {">"}{cs.roas.after}×
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Tactics */}
      <ul className="space-y-2 border-t border-paper/10 pt-6">
        {cs.tactics.map((t, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-paper/50">
            <span className={cn("mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full", {
              "bg-indigo": cs.color === "indigo",
              "bg-crimson": cs.color === "crimson",
              "bg-film-green": cs.color === "film-green",
            })} />
            {t}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function RoasSustainedBar({ target }: { target: number }) {
  const [ref, inView] = useInView<HTMLDivElement>({ amount: 0.3 });
  return (
    <div ref={ref} className="relative h-7 overflow-hidden rounded-sm bg-paper/5">
      <motion.div
        className="absolute inset-y-0 left-0 rounded-sm bg-film-green"
        initial={{ width: 0 }}
        animate={inView ? { width: "88%" } : { width: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      />
    </div>
  );
}

/* ─── Brand logo tile ─────────────────────────────────────── */

function BrandLogo({ brand, index }: { brand: { name: string; domain: string }; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center justify-center gap-2.5 rounded-xl border border-line bg-paper-dim p-5 transition-colors hover:border-ink/20 hover:bg-paper"
    >
      <div className="relative h-10 w-full">
        <Image
          src={`https://logo.clearbit.com/${brand.domain}`}
          alt={brand.name}
          fill
          className="object-contain"
          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
        />
      </div>
      <span className="text-center font-mono text-xs text-ink-soft">{brand.name}</span>
    </motion.div>
  );
}

/* ─── Metric tile ──────────────────────────────────────────── */

function MetricTile({ label, value, note, index }: {
  label: string;
  value: string;
  note: string;
  index: number;
}) {
  const [ref, inView] = useInView<HTMLDivElement>({ amount: 0.4 });
  const particles = Array.from({ length: 6 }, (_, i) => i);

  return (
    <motion.div
      ref={ref}
      animate={{ opacity: inView ? 1 : 0 }}
      transition={{ duration: 0.6, delay: index * 0.07 }}
      className="relative flex min-h-[180px] flex-col justify-between overflow-hidden bg-ink p-6"
    >
      <div className="pointer-events-none absolute inset-0">
        {particles.map((p) => (
          <motion.span
            key={p}
            className="absolute h-1 w-1 rounded-full bg-film-green/50"
            style={{ left: `${12 + p * 14}%`, top: `${25 + (p % 3) * 20}%` }}
            animate={
              inView
                ? { opacity: [0, 1, 0.3], scale: [0, 1.5, 1] }
                : { opacity: 0, scale: 0 }
            }
            transition={{ duration: 1.2, delay: index * 0.07 + p * 0.06, ease: [0.16, 1, 0.3, 1] }}
          />
        ))}
      </div>
      <p className="eyebrow relative text-paper/40">{label}</p>
      <motion.p
        className="relative font-display text-4xl font-medium tracking-tight text-film-green sm:text-5xl"
        animate={
          inView
            ? { opacity: 1, y: 0, filter: "blur(0px)" }
            : { opacity: 0, y: 12, filter: "blur(6px)" }
        }
        transition={{ duration: 0.7, delay: index * 0.07 + 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        {value}
      </motion.p>
      <p className="relative font-mono text-xs text-paper/35">{note}</p>
    </motion.div>
  );
}

/* ─── Page ─────────────────────────────────────────────────── */

export default function PerformanceMarketingPage() {
  return (
    <div className="bg-paper text-ink">
      {/* Hero */}
      <section className="grain relative flex min-h-[90svh] flex-col justify-end overflow-hidden bg-ink pb-20 pt-[var(--nav-h)]">
        <div className="pointer-events-none absolute inset-0">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className={cn("absolute rounded-full opacity-20", i % 3 === 0 ? "bg-indigo" : i % 3 === 1 ? "bg-film-green" : "bg-crimson")}
              style={{
                width: `${20 + (i * 7) % 60}px`,
                height: `${20 + (i * 7) % 60}px`,
                left: `${5 + (i * 8.3) % 90}%`,
                top: `${5 + (i * 11.7) % 80}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.08, 0.2, 0.08],
              }}
              transition={{
                duration: 4 + (i % 4),
                repeat: Infinity,
                delay: i * 0.4,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <div className="container-edit relative">
          <span className="eyebrow text-paper/40">Performance Marketing</span>
          <RevealText as="h1" className="h-display mt-4 max-w-5xl text-paper" splitBy="word">
            I make your ad spend work harder.
          </RevealText>
          <motion.p
            className="body-lg mt-8 max-w-2xl text-paper/60"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            From D2C ecommerce to B2B SaaS — I build, run, and optimize performance
            campaigns that move revenue, not just impressions. Every rupee of ad spend
            is accountable.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
          >
            {["Meta Ads", "Google Ads", "Apple Search Ads", "LinkedIn Ads", "CRO", "Creative Strategy", "WhatsApp Automation"].map((tag) => (
              <span key={tag} className="rounded-full border border-paper/15 px-4 py-1.5 font-mono text-xs text-paper/50">
                {tag}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Key metrics */}
      <section className="grain border-t border-line bg-ink py-24 md:py-36">
        <div className="container-edit">
          <span className="eyebrow text-paper/40">By the numbers</span>
          <RevealText as="h2" className="type-h2 mt-3 max-w-xl text-paper" splitBy="word">
            Results you can verify, not just claim.
          </RevealText>

          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-paper/10 bg-paper/10 sm:grid-cols-2 lg:grid-cols-3">
            {METRICS.map((m, i) => (
              <MetricTile key={m.label} label={m.label} value={m.value} note={m.note} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Brands */}
      <section className="border-t border-line bg-paper py-20 md:py-28">
        <div className="container-edit">
          <span className="eyebrow text-ink/40">Brands I&rsquo;ve worked with</span>
          <div className="mt-10 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5">
            {BRANDS.map((brand, i) => (
              <BrandLogo key={brand.name} brand={brand} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Case studies */}
      <section className="border-t border-line bg-paper-dim py-24 md:py-36">
        <div className="container-edit">
          <span className="eyebrow text-ink/40">Case studies</span>
          <RevealText as="h2" className="type-h2 mt-3 max-w-2xl" splitBy="word">
            Campaign breakdowns with real numbers.
          </RevealText>
          <p className="body-lg mt-6 max-w-xl text-ink-soft">
            Every project below shows what changed, how it changed, and what we
            did to make that happen.
          </p>

          <div className="mt-16 grid gap-6 lg:grid-cols-2">
            {CASE_STUDIES.map((cs, i) => (
              <CaseStudyCard key={cs.brand} cs={cs} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* What I do */}
      <section className="border-t border-line bg-paper py-24 md:py-32">
        <div className="container-edit">
          <span className="eyebrow text-ink/40">Services</span>
          <RevealText as="h2" className="type-h2 mt-3 max-w-2xl" splitBy="word">
            What I actually do for clients.
          </RevealText>

          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Performance Campaign Management",
                desc: "Meta, Google, Apple Search, LinkedIn — full-funnel setup, testing, and scaling with weekly reporting.",
              },
              {
                title: "Creative Strategy + Production",
                desc: "Video and image creative briefs, batch testing frameworks, and winner-identification to feed the algorithm signal it needs.",
              },
              {
                title: "Conversion Rate Optimization",
                desc: "Landing page, PDP, and checkout analysis — turning existing traffic into more revenue before you scale spend.",
              },
              {
                title: "WhatsApp & Email Automation",
                desc: "Post-purchase upsell flows, cart abandonment sequences, and win-back campaigns that compound LTV.",
              },
              {
                title: "Personal Brand & Creator Growth",
                desc: "Consulting creators and founders on content strategy, channel architecture, and audience growth.",
              },
              {
                title: "Analytics & Attribution",
                desc: "MMP setup, UTM structure, server-side tracking, and dashboards that tell you which channel is actually working.",
              },
            ].map((s, i) => (
              <ServiceTile key={s.title} title={s.title} desc={s.desc} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="grain border-t border-line bg-ink py-24 md:py-36">
        <div className="container-edit">
          <span className="eyebrow text-paper/40">What founders say</span>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <TestimonialCard key={t.name} testimonial={t} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-line bg-paper py-24 md:py-36">
        <div className="container-edit text-center">
          <RevealText as="h2" className="type-h1 mx-auto max-w-3xl" splitBy="word">
            Ready to improve your ROAS?
          </RevealText>
          <motion.p
            className="body-lg mx-auto mt-6 max-w-xl text-ink-soft"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            I work with a small number of clients at a time — so the work is
            always focused, never templated. If your numbers matter to you,
            let&rsquo;s talk.
          </motion.p>
          <motion.div
            className="mt-10"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <a
              href="mailto:amlantripathy124@gmail.com"
              className="inline-block rounded-full bg-ink px-8 py-4 font-medium text-paper transition-all duration-300 hover:bg-indigo hover:text-paper"
            >
              Get in touch
            </a>
          </motion.div>
        </div>
      </section>

    </div>
  );
}

function ServiceTile({ title, desc, index }: { title: string; desc: string; index: number }) {
  const [ref, inView] = useInView<HTMLDivElement>({ amount: 0.3 });
  return (
    <motion.div
      ref={ref}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className="bg-paper p-7"
    >
      <h3 className="font-display text-lg font-medium leading-snug">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-ink-soft">{desc}</p>
    </motion.div>
  );
}

function TestimonialCard({ testimonial, index }: {
  testimonial: (typeof TESTIMONIALS)[0];
  index: number;
}) {
  const [ref, inView] = useInView<HTMLDivElement>({ amount: 0.3 });
  return (
    <motion.div
      ref={ref}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 24 }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-2xl border border-paper/10 bg-paper/5 p-7"
    >
      <p className="text-sm leading-relaxed text-paper/70">&ldquo;{testimonial.quote}&rdquo;</p>
      <div className="mt-6 border-t border-paper/10 pt-5">
        <p className="text-sm font-medium text-paper">{testimonial.name}</p>
        <p className="mt-1 font-mono text-xs text-paper/40">{testimonial.title}</p>
      </div>
    </motion.div>
  );
}
