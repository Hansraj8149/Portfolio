// All site copy lives here. Edit this file to update the portfolio.

export const profile = {
  name: "Hansraj Saini",
  symbol: "HRS",
  role: "Product Engineer",
  specialty: "Fintech",
  location: "Jaipur, India",
  remote: "Remote · overlaps US / EU / JST",
  /** Closing line on the contact card. */
  quote: { text: "Ship small. Reconcile daily. Let it compound.", by: "How I build" },
  headline: "I build the software money moves through.",
  intro:
    "Product engineer for web and mobile, specialised in fintech. I've shipped a brokerage app for iOS and Android, an AI market-intelligence platform, and the back-office systems behind them — working directly with founders.",
  resume: "https://drive.google.com/file/d/1SoKBP5J_axRjmNAlJwAuv1E9UqmmUgK5/view",
  email: "hansrajwork8149@gmail.com",
  url: "https://hansrajsaini.vercel.app",
  socials: [
    { name: "GitHub", href: "https://github.com/Hansraj8149" },
    { name: "LinkedIn", href: "https://www.linkedin.com/in/hansraj-saini-634864190/" },
    { name: "X", href: "https://x.com/Hansraj32323520" },
    { name: "LeetCode", href: "https://leetcode.com/u/Hansrajsaini/" },
  ],
};

/** Headline numbers. Shown in the hero. */
export const stats = [
  { value: "3", label: "products live in stores & web" },
  { value: "225+", label: "PRs merged in 6 mo" },
  { value: "16", label: "AI agents in production" },
  { value: "0 → 1", label: "trading app, iOS + Android" },
];

export const tape = [
  { sym: "UNLK", text: "Unlok app live on Google Play" },
  { sym: "PRS", text: "225+ merged in 6 mo" },
  { sym: "AGNT", text: "16 Mastra agents" },
  { sym: "FLYK", text: "Flyku MVP shipped" },
  { sym: "TEMP", text: "Temporal: POC → company-wide" },
  { sym: "I18N", text: "Korean localization" },
  { sym: "TEAM", text: "leading 3 interns" },
  { sym: "RECN", text: "reconciliation automated" },
  { sym: "CACT", text: "dividends · splits · delistings" },
  { sym: "PLSR", text: "Pulsar + WebSocket + push" },
];

// --- Products: things people can open and use -------------------------------

export type Platform = "iOS" | "Android" | "Web";

export type Product = {
  id: string;
  name: string;
  tagline: string;
  category: string;
  platforms: Platform[];
  myRole: string;
  highlights: string[];
  stack: string[];
  links: { label: string; href: string }[];
  web?: { src: string; url: string };
  phones: string[];
};

export const products: Product[] = [
  {
    id: "unlok",
    name: "Unlok",
    tagline: "Invest and trade US stocks and ETFs.",
    category: "Brokerage · Trading",
    platforms: ["iOS", "Android", "Web"],
    myRole: "Built the mobile app from scratch as the sole mobile engineer; shipped features across the web platform.",
    highlights: [
      "Cross-platform React Native app for iOS and Android — markets, watchlists, charts, portfolio and trading.",
      "UI/UX designed straight from product discussions, no design handoff.",
      "Release pipelines for TestFlight and Google Play per environment.",
      "Web platform: market explorer, calendars (earnings, IPOs, dividends, splits) and heatmaps.",
    ],
    stack: ["React Native", "Expo", "Next.js", "TanStack", "Valtio", "Express", "PostgreSQL"],
    links: [
      { label: "Web app", href: "https://app.unlok.com/en" },
      { label: "Google Play", href: "https://play.google.com/store/apps/details?id=com.unlok.android&hl=en_IN" },
    ],
    web: { src: "/work/unlok-web.webp", url: "app.unlok.com" },
    phones: ["/work/unlok-app-chart.webp", "/work/unlok-mobile.webp"],
  },
  {
    id: "insights",
    name: "Unlok Insights",
    tagline: "AI-written market intelligence for retail investors.",
    category: "AI · Market data",
    platforms: ["Web"],
    myRole: "Project lead and primary engineer — web app, editorial CMS, API, database, releases. Leading 3 interns.",
    highlights: [
      "Pre/post-market briefs, top movers with catalyst detection and 'What Happened' explainers — 10 AI workflows, 16 agents.",
      "Editorial CMS with a prompt playground, versioned prompt migrations and AI cost attribution.",
      "Korean localization end-to-end, authenticator-app 2FA and promo codes.",
      "225+ merged PRs in ~6 months; owns Docker → AWS ECR → EC2 releases.",
    ],
    stack: ["Next.js 14", "Express 5", "Drizzle", "PostgreSQL", "Mastra", "Azure OpenAI", "AWS Bedrock"],
    links: [{ label: "Open Insights", href: "https://insights.unlok.com" }],
    web: { src: "/work/insights-web.webp", url: "insights.unlok.com" },
    phones: ["/work/insights-mobile.webp"],
  },
  {
    id: "flyku",
    name: "Flyku",
    tagline: "Find running clubs, group runs and events near you.",
    category: "Consumer · Community",
    platforms: ["Web", "Android"],
    myRole: "Built the MVP, then started the mobile app.",
    highlights: [
      "Running-club directory and run calendar across the United States.",
      "SEO-first web MVP with location search by ZIP.",
      "Mobile app with a weekly run calendar, club pages and memberships.",
    ],
    stack: ["Next.js", "React Native", "PostgreSQL"],
    links: [
      { label: "Website", href: "https://flyku.com/" },
      { label: "Google Play", href: "https://play.google.com/store/apps/details?id=com.flyku.app" },
    ],
    web: { src: "/work/flyku-web.webp", url: "flyku.com" },
    phones: ["/work/flyku-app-1.webp", "/work/flyku-app-2.webp"],
  },
];

// --- Career -----------------------------------------------------------------

export type Role = {
  id: string;
  title: string;
  company: string;
  client?: string;
  from: string; // YYYY-MM
  to: string | null; // null = present
  place: string;
  /** Plain-language bullets for the chart hover card: what I did, in simple words. */
  simple: string[];
  summary: string;
  points: string[];
  stack: string[];
  /** Product ids shipped in this role. */
  products: string[];
};

export const roles: Role[] = [
  {
    id: "unlok",
    title: "Project Lead",
    company: "Unlok Insights",
    client: "Unlok",
    from: "2026-03",
    to: null,
    place: "Remote · leading 3 interns",
    simple: [
      "Lead a website that uses AI to explain the stock market in plain English.",
      "Built most of it myself, and guide a team of 3 interns.",
      "Ship updates to real users every week.",
    ],
    summary:
      "End-to-end owner of Unlok Insights — consumer web app, editorial CMS, API, database and releases.",
    points: [
      "225+ merged PRs (~650 commits) in ~6 months as primary contributor in a Turborepo monorepo.",
      "10 AI content workflows and 16 agents on Mastra (Azure OpenAI + AWS Bedrock).",
      "Prompt playground with versioned prompt migrations, model selection and AI cost attribution.",
      "Korean localization end-to-end; Playwright e2e audit suite, Sentry and PostHog.",
      "Scopes work, reviews PRs and runs releases for 3 interns.",
    ],
    stack: ["Next.js 14", "Express 5", "Drizzle", "PostgreSQL", "Mastra", "AWS"],
    products: ["insights"],
  },
  {
    id: "kupa",
    title: "Software Engineer",
    company: "Kupa (Unlok)",
    from: "2025-10",
    to: null,
    place: "Remote · US team from India",
    simple: [
      "Build the behind-the-scenes systems of a US investing app.",
      "Keep every account's money and shares correct, automatically.",
      "Work directly with the founders on what to build next.",
    ],
    summary:
      "Owns major product systems across mobile, backend and automation, working directly with the founders and CTO on roadmap and architecture.",
    points: [
      "Workflow automation on Temporal — onboarding, data ingestion, end-of-day calculations.",
      "Corporate actions engine: dividends, splits, delistings and symbol changes cascading to portfolios.",
      "Reconciliation against provider and exchange data with targeted alerts.",
      "Event-driven notifications over Apache Pulsar, WebSocket and push.",
    ],
    stack: ["TypeScript", "Temporal", "PostgreSQL", "Apache Pulsar", "React Native"],
    products: ["unlok"],
  },
  {
    id: "instient",
    title: "Software Engineer",
    company: "Instient",
    client: "Unlok, Flyku",
    from: "2024-06",
    to: "2025-10",
    place: "Remote",
    simple: [
      "Built the Unlok investing app for iPhone and Android, from scratch.",
      "Built the first version of Flyku, an app to find running clubs.",
      "Went from intern to full-time in one month.",
    ],
    summary:
      "Joined as an intern, converted to full-time within a month, and became the primary engineer on client products — the Unlok trading app and the Flyku MVP.",
    points: [
      "Built the Unlok trading app for iOS and Android from scratch in React Native — as the sole mobile engineer.",
      "Designed product UI/UX straight from product discussions.",
      "Ran CI/CD for TestFlight and Google Play with environment-aware releases.",
      "Backend features in Express and PostgreSQL; took Mastra + Temporal from POC to company-wide.",
      "Built the Flyku MVP — running-club directory and run calendar — and started its mobile app.",
    ],
    stack: ["React Native", "Expo", "Express", "PostgreSQL", "TanStack", "Valtio"],
    products: ["unlok", "flyku"],
  },
  {
    id: "pathcreators",
    title: "Frontend Intern",
    company: "PathCreators",
    from: "2023-05",
    to: "2023-08",
    place: "Hyderabad",
    simple: [
      "My first real job as a developer.",
      "Built a tool that helped AI label images faster.",
    ],
    summary: "First production work: tooling for an AI image-labeling pipeline.",
    points: [
      "Built an AI-assisted object detection tool that made image labeling ~25% faster.",
      "Reworked API integration to speed up backend data processing.",
    ],
    stack: ["JavaScript", "HTML/CSS", "REST APIs"],
    products: [],
  },
];

/**
 * Points on the career chart. The y-axis is scope/ownership, not money —
 * the chart is a metaphor, so keep levels roughly honest relative to each other.
 */
export const milestones = [
  { ym: "2023-05", level: 1, short: "Intern", label: "Frontend intern · PathCreators", role: "pathcreators" },
  { ym: "2024-06", level: 1.4, short: "Joins Instient", label: "Joins Instient as intern", role: "instient" },
  { ym: "2024-07", level: 2.2, short: "Full-time", label: "Converted to full-time in a month", role: "instient" },
  { ym: "2025-10", level: 3.4, short: "Kupa", label: "Software Engineer · Kupa (Unlok)", role: "kupa" },
  { ym: "2026-03", level: 4.4, short: "Lead", label: "Project Lead · Unlok Insights", role: "unlok" },
];

export const levels = [
  { level: 1, label: "Intern" },
  { level: 2.2, label: "Engineer" },
  { level: 3.4, label: "Owner" },
  { level: 4.4, label: "Lead" },
];

// --- Systems: what runs behind the products ---------------------------------

export type System = {
  code: string;
  name: string;
  icon: "layers" | "scale" | "bell" | "workflow" | "bot" | "filter";
  /** What it does, in words anyone understands. */
  plain: string;
  summary: string;
  /** Steps of the flow, drawn as a small pipeline diagram. */
  flow: string[];
  stack: string[];
};

export const systems: System[] = [
  {
    code: "CACT",
    plain: "When a company pays a dividend or splits its stock, every investor's account updates by itself — correctly.",
    name: "Corporate actions engine",
    icon: "layers",
    summary: "Applies dividends, splits, delistings and symbol changes to every affected portfolio — and keeps positions consistent.",
    flow: ["Corporate event", "Validate", "Cascade to portfolios", "Positions updated"],
    stack: ["TypeScript", "PostgreSQL"],
  },
  {
    code: "RECN",
    plain: "Every day our records are checked against the broker's and the exchange's. Any mismatch raises an alert before a customer ever notices.",
    name: "Portfolio reconciliation",
    icon: "scale",
    summary: "Cross-checks every account against provider and exchange records, and flags mismatches before they become tickets.",
    flow: ["Internal ledger", "Provider / exchange", "Match", "Alert + diagnose"],
    stack: ["TypeScript", "PostgreSQL"],
  },
  {
    code: "WFLW",
    plain: "Long, multi-step jobs — opening an account, end-of-day totals — run reliably, retry when something fails, and never get lost.",
    name: "Operations automation",
    icon: "workflow",
    summary: "Durable Temporal workflows for onboarding, data ingestion and end-of-day calculations — retried, observable, resumable.",
    flow: ["Trigger", "Temporal workflow", "Activities", "EOD done"],
    stack: ["Temporal", "TypeScript"],
  },
  {
    code: "NTFY",
    plain: "Order updates and alerts reach people instantly — inside the app or as a push notification.",
    name: "Notification infrastructure",
    icon: "bell",
    summary: "Event-driven delivery for product and operational alerts, in real time.",
    flow: ["Event", "Apache Pulsar", "WebSocket · Push", "User"],
    stack: ["Apache Pulsar", "WebSockets", "Push"],
  },
  {
    code: "AIOP",
    plain: "AI reads market news and data and writes short, clear briefs. Editors review them, then they go live.",
    name: "AI agents & content",
    icon: "bot",
    summary: "Market briefs, catalyst detection, earnings summaries, an AI finance assistant and AI PR review. Standardised the company on Mastra.",
    flow: ["Market data + news", "Mastra agents", "Editor review", "Published"],
    stack: ["Mastra", "Azure OpenAI", "AWS Bedrock"],
  },
  {
    code: "TPRO",
    plain: "Investors filter thousands of stocks by price, sector, fundamentals and more, and get answers fast.",
    name: "Trading Pro screener",
    icon: "filter",
    summary: "Advanced stock screener with multi-type filters and optimised query patterns — owned from discovery to delivery.",
    flow: ["Filters", "Query planner", "PostgreSQL", "Results"],
    stack: ["TypeScript", "PostgreSQL"],
  },
];

// --- Capabilities: what I can do for any team -------------------------------

export type Capability = {
  title: string;
  icon: "smartphone" | "globe" | "server" | "database" | "sparkles" | "workflow" | "card" | "rocket" | "radio";
  proof: string;
  usedIn: string;
  tools: string[];
};

export const capabilities: Capability[] = [
  {
    title: "iOS & Android apps",
    icon: "smartphone",
    proof: "Shipped a trading app to both stores as the sole mobile engineer.",
    usedIn: "Unlok · Flyku",
    tools: ["React Native", "Expo", "TestFlight", "Play Console"],
  },
  {
    title: "Web platforms",
    icon: "globe",
    proof: "SEO-friendly, localized Next.js products used by real customers.",
    usedIn: "Insights · Unlok web · Flyku",
    tools: ["Next.js", "React", "Tailwind", "next-intl"],
  },
  {
    title: "AI agents & automation",
    icon: "sparkles",
    proof: "16 agents and 10 content workflows in production, with prompt versioning and cost tracking.",
    usedIn: "Insights",
    tools: ["Mastra", "Azure OpenAI", "AWS Bedrock", "Evals"],
  },
  {
    title: "Backend & APIs",
    icon: "server",
    proof: "Typed REST and real-time APIs with validation at every boundary.",
    usedIn: "Insights · Unlok",
    tools: ["Express", "TypeScript", "Zod", "REST", "Go"],
  },
  {
    title: "Databases",
    icon: "database",
    proof: "Schema design, query optimization and versioned migrations with production checklists.",
    usedIn: "Insights · Unlok",
    tools: ["PostgreSQL", "Drizzle", "MongoDB", "SQL"],
  },
  {
    title: "Workflow orchestration",
    icon: "workflow",
    proof: "Took Temporal from proof-of-concept to company-wide adoption.",
    usedIn: "Kupa back office",
    tools: ["Temporal"],
  },
  {
    title: "Payments & accounts",
    icon: "card",
    proof: "Stripe checkout, promo codes, authenticator-app 2FA and auth flows.",
    usedIn: "MachineIQ · Insights",
    tools: ["Stripe", "Clerk", "TOTP 2FA"],
  },
  {
    title: "Real-time & messaging",
    icon: "radio",
    proof: "Event-driven notifications from broker to device in real time.",
    usedIn: "Kupa",
    tools: ["Apache Pulsar", "WebSockets", "Push"],
  },
  {
    title: "CI/CD & cloud",
    icon: "rocket",
    proof: "Owns releases: Docker images to AWS ECR, deploys to EC2 via GitHub Actions, monitored in Sentry.",
    usedIn: "Insights · Unlok",
    tools: ["GitHub Actions", "Docker", "AWS", "Sentry", "PostHog", "Playwright"],
  },
];

/** Side projects. */
export const sideProjects = [
  {
    name: "MachineIQ",
    summary: "SaaS of AI tools with Clerk auth and Stripe payments.",
    stack: ["Next.js", "Strapi", "Stripe"],
    live: "https://machineiq.vercel.app/",
    code: "https://github.com/Hansraj8149/machineiq",
  },
  {
    name: "GuideEasy",
    summary: "Travel and cab-hire site for exploring Rajasthan.",
    stack: ["Next.js", "Tailwind", "SEO"],
    live: "https://guideeasy.in/",
    code: "https://github.com/Hansraj8149/guideeasy",
  },
  {
    name: "Sociate",
    summary: "Social network — posts, comments, likes, follows.",
    stack: ["React", "Node", "MongoDB"],
    live: "https://sociate.vercel.app/",
    code: "https://github.com/Hansraj8149/sociate",
  },
];

export const note = {
  rating: "STRONG HIRE",
  thesis: [
    {
      title: "Ownership without supervision",
      body: "Takes a product from a founder conversation to production — scope, architecture, code, release.",
    },
    {
      title: "Domain fluency",
      body: "Speaks settlement, corporate actions and reconciliation, so edge cases get handled before they become ops tickets.",
    },
    {
      title: "Product instinct",
      body: "Designs UI straight from product discussions and pushes back on features that won't move a metric.",
    },
    {
      title: "Compounding output",
      body: "Consistently the top contributor, and now multiplies it by leading and reviewing for three interns.",
    },
  ],
  risks: "Will ask uncomfortable questions about your idempotency keys.",
  education: "B.Tech, Computer Science — Malla Reddy Engineering College · CGPA 8.05",
};
