/**
 * Single source of content truth. Every `placeholder: true` record is
 * intentionally unfilled per PRODUCT.md — real names, quotes, and numbers
 * must never be invented. Replace the marked fields, flip the flag, ship.
 */

export type Milestone = {
  year: string;
  title: string;
  description: string;
  placeholder?: boolean;
  video?: string;
};

export const milestones: Milestone[] = [
  {
    year: "—",
    title: "Sneha Satheendran",
    description: "Video editing partnership — full project details to be added.",
    placeholder: true,
    video: "https://pub-ffdc1cf7f2f64138beeffdc8a02bd0dd.r2.dev/milestone-01.mp4",
  },
  {
    year: "—",
    title: "Aakriti Bansal",
    description: "Video editing partnership — full project details to be added.",
    placeholder: true,
    video: "https://pub-ffdc1cf7f2f64138beeffdc8a02bd0dd.r2.dev/milestone-02.mp4",
  },
  {
    year: "—",
    title: "Practo",
    description: "Video editing partnership — full project details to be added.",
    placeholder: true,
    video: "https://pub-ffdc1cf7f2f64138beeffdc8a02bd0dd.r2.dev/milestone-03.mp4",
  },
];

export type Project = {
  slug: string;
  title: string;
  client: string;
  category: string;
  challenge: string;
  approach: string;
  outcome: string;
  research?: string;
  storyboarding?: string;
  editing?: string;
  marketingStrategy?: string;
  execution?: string;
  lessonsLearned?: string;
  placeholder?: boolean;
  video?: string;
};

export const projects: Project[] = [
  {
    slug: "case-study-one",
    title: "Case Study One",
    client: "Snitch",
    category: "Snitch",
    challenge: "One-sentence business problem — to be added.",
    approach: "How storytelling, strategy, and filmmaking solved it — to be added.",
    outcome: "Real, verifiable outcome — to be added.",
    video: "https://pub-ffdc1cf7f2f64138beeffdc8a02bd0dd.r2.dev/case-study-one.mp4",
  },
  {
    slug: "case-study-two",
    title: "Case Study Two",
    client: "Call Her Daddy",
    category: "Call Her Daddy",
    challenge: "One-sentence business problem — to be added.",
    approach: "How storytelling, strategy, and filmmaking solved it — to be added.",
    outcome: "Real, verifiable outcome — to be added.",
    video: "https://pub-ffdc1cf7f2f64138beeffdc8a02bd0dd.r2.dev/case-study-two.mp4",
  },
  {
    slug: "case-study-three",
    title: "Case Study Three",
    client: "Sanidhya AI",
    category: "Sanidhya AI",
    challenge: "One-sentence business problem — to be added.",
    approach: "How storytelling, strategy, and filmmaking solved it — to be added.",
    outcome: "Real, verifiable outcome — to be added.",
    video: "https://pub-ffdc1cf7f2f64138beeffdc8a02bd0dd.r2.dev/case-study-three.mp4",
  },
  {
    slug: "case-study-four",
    title: "Case Study Four",
    client: "Sindhu Biswal",
    category: "Sindhu Biswal",
    challenge: "One-sentence business problem — to be added.",
    approach: "How storytelling, strategy, and filmmaking solved it — to be added.",
    outcome: "Real, verifiable outcome — to be added.",
    video: "https://pub-ffdc1cf7f2f64138beeffdc8a02bd0dd.r2.dev/case-study-four.mp4",
  },
  {
    slug: "case-study-five",
    title: "Case Study Five",
    client: "Wispr Flow",
    category: "Wispr Flow",
    challenge: "One-sentence business problem — to be added.",
    approach: "How storytelling, strategy, and filmmaking solved it — to be added.",
    outcome: "Real, verifiable outcome — to be added.",
    video: "https://pub-ffdc1cf7f2f64138beeffdc8a02bd0dd.r2.dev/wispr%20reel.mp4",
  },
  {
    slug: "case-study-six",
    title: "Case Study Six",
    client: "Flowli",
    category: "Flowli",
    challenge: "One-sentence business problem — to be added.",
    approach: "How storytelling, strategy, and filmmaking solved it — to be added.",
    outcome: "Real, verifiable outcome — to be added.",
    video: "https://pub-ffdc1cf7f2f64138beeffdc8a02bd0dd.r2.dev/flowli.mp4",
  },
];

export type Service = {
  slug: string;
  title: string;
  short: string;
  description: string;
};

export const services: Service[] = [
  {
    slug: "youtube-editing",
    title: "YouTube & Long-Form Editing",
    short: "Cuts built to hold retention.",
    description:
      "Full-episode edits, pacing, and story structure built to keep US audiences watching to the end — not just to the next cut.",
  },
  {
    slug: "shorts-reels-tiktok",
    title: "Shorts, Reels & TikTok",
    short: "Built for the scroll.",
    description:
      "Vertical, fast-paced edits engineered for the first three seconds — turning long-form footage into scroll-stopping short content.",
  },
  {
    slug: "podcast-editing",
    title: "Podcast Video Editing",
    short: "Multi-cam, made watchable.",
    description:
      "Multi-camera podcast edits, clean audio, captions, and clip-ready highlights — the full pipeline from raw recording to publish.",
  },
  {
    slug: "brand-ad-films",
    title: "Brand & Ad Films",
    short: "Every second earns its place.",
    description:
      "Cinematic brand films and ad edits with intentional pacing, emotion, and visual precision — built to convert, not just look good.",
  },
  {
    slug: "content-systems",
    title: "Ongoing Content Partnership",
    short: "A weekly editor, not a one-off.",
    description:
      "A recurring editing partnership for creators and brands who publish consistently and need a dependable, always-on editor.",
  },
  {
    slug: "motion-sound-design",
    title: "Motion Graphics & Sound Design",
    short: "The layer most editors skip.",
    description:
      "Titles, transitions, sound design, and color that give a video its final layer of polish and physical presence.",
  },
  {
    slug: "personal-branding",
    title: "Personal Branding Content",
    short: "An authentic digital identity.",
    description:
      "Helping founders and creators build a consistent, recognizable video identity across every platform they publish on.",
  },
];

export type Metric = {
  label: string;
  value?: string;
  note: string;
};

// TODO: values below are mockup placeholders for layout preview only —
// swap for verified figures (or remove `value` to fall back to the
// qualitative note) before this ships.
export const metrics: Metric[] = [
  { label: "Views", value: "24.6M", note: "Mockup value — pending verified figures." },
  { label: "Watch Time", value: "1.8M hrs", note: "Mockup value — pending verified figures." },
  { label: "Audience Retention", value: "78%", note: "Mockup value — pending verified figures." },
  { label: "Engagement Rate", value: "6.4%", note: "Mockup value — pending verified figures." },
  { label: "Campaign Reach", value: "312M", note: "Mockup value — pending verified figures." },
  { label: "Revenue Impact", value: "$2.4M+", note: "Mockup value — shared only once clients make it public." },
];

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

// Intentionally empty — no finalized public testimonials yet (PRODUCT.md).
// Populate with real, attributed quotes only.
export const testimonials: Testimonial[] = [];

export type JournalPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  placeholder?: boolean;
};

export const journalPosts: JournalPost[] = [
  {
    slug: "editing-is-strategy",
    title: "Editing Is a Strategy Decision, Not a Software Skill",
    excerpt:
      "Why the cut is the last strategic decision in a story, not the first technical one — thoughts to be expanded.",
    category: "Editing",
    readTime: "6 min",
    placeholder: true,
  },
  {
    slug: "ai-tools-creator-economy",
    title: "Where AI Tools Actually Help a Working Editor",
    excerpt: "A practitioner's read on which AI tools save real time — and which just look impressive in a demo.",
    category: "AI & Tools",
    readTime: "5 min",
    placeholder: true,
  },
  {
    slug: "attention-is-not-a-metric",
    title: "Attention Is Not a Metric. It's a Relationship.",
    excerpt: "On the difference between chasing views and engineering a story people finish.",
    category: "Storytelling",
    readTime: "4 min",
    placeholder: true,
  },
];

export const roles = [
  "Video Editor",
  "Creative Strategist",
  "Filmmaker",
  "Content Editor for US Creators & Brands",
];

export const philosophyLines = [
  "Good storytelling isn't decoration—it's strategy made visible.",
  "Every frame should earn attention.",
  "Beautiful visuals may attract people, but meaningful stories make them stay.",
  "Editing isn't about making videos shorter. It's about making every second matter.",
];

export const contactDetails = {
  email: "amlantripathy124@gmail.com",
  bookingLabel: "Book a conversation",
  bookingUrl: "https://topmate.io/amlan_tripathy10?fbclid=PAcGRvZgJleHRuA2FlbQIxMQBzcnRjBmFwcF9pZA85MzY2MTk3NDMzOTI0NTkAAaeYs875R-u-7eWwZJcOuoBcNP57-8p_0GLuJTm8FUwUNC6fU2sYRs6QoM_Qnw_aem_ZMxiVT3gs2QI6Y-5I41usQ&utm_content=link_in_bio&utm_medium=social&utm_source=ig",
  socials: [
    { label: "LinkedIn", url: "https://www.linkedin.com/in/amlan-tripathy-883738272/" },
    { label: "Instagram", url: "https://www.instagram.com/amlanttripathy/" },
  ],
};
