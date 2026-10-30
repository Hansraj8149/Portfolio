# Design Brief: Hansraj Saini, Studio

> **How to use this file**
> 1. Upload the 3 local photos listed in [§9 Assets to upload](#9-assets-to-upload-manually) to Claude Design, along with this file.
> 2. Copy everything from [§0 The Prompt](#0-the-prompt-copy-from-here) down to the end of the file, and paste it in as the message.
> 3. Every image URL in this file is public and has been checked (HTTP 200, 15 Oct 2026), so Claude Design can use them directly.

---

## 0. The Prompt (copy from here)

You are designing (**design only, no code yet**) a complete redesign of my portfolio. I want it to become a **premium, warm, experiential studio website**, not a normal developer portfolio. A founder who lands on it should feel they've been taken through a crafted, end-to-end experience, and should come away wanting to hire me to build their product.

Everything you need is in this document: who I am, my work, the copy data, image URLs, references, decisions already made, and constraints. **Use the real data and images below; do not invent projects, clients or numbers.** Where data is missing (metrics, testimonials), design a clearly marked placeholder slot.

### What I want back from you
1. **Concept**: a one-line idea and the experience narrative (how a visitor moves through the site, scene by scene).
2. **Sitemap** and the user journey to each contact path.
3. **Page-by-page layouts** for every page, desktop and mobile.
4. **Motion and interaction spec** per section: trigger, behaviour, timing feel, and the mobile/touch fallback.
5. **Visual system**: palette (hex), type pairing and scale, grid, spacing, imagery direction.
6. **Copy**: 3 options for the home hero, plus section headlines and short copy, in my voice.
7. **Case study template** and fully filled outlines for **Yoga with Latu** and **Unlok**.
8. **Component inventory**, and a list of the assets I still need to produce (screen recordings, photos, quotes).

Ask me questions wherever something is ambiguous before you finalise.

---

## 1. Who I am

- **Name:** Hansraj Saini
- **Brand:** a personal brand run as a studio, **"Hansraj Saini, Studio"**. Voice: first person, warm and confident. "I" for me, "we" when talking about working with a client.
- **Role:** product engineer and builder. Web, iOS, Android, backend, AI.
- **Location:** Jaipur, India (the Pink City). Fully remote, with US time-zone overlap (and EU/Asia).
- **Experience:** 2+ years shipping production software directly with founders and CTOs.
- **Education:** B.Tech, Computer Science, Malla Reddy Engineering College (CGPA 8.05).
- **Email:** hansrajwork8149@gmail.com
- **Current site (being replaced):** https://hansrajsaini.vercel.app. A dark fintech "trading terminal" theme. **Drop this aesthetic completely.**
- **Socials:**
  - GitHub: https://github.com/Hansraj8149
  - LinkedIn: https://www.linkedin.com/in/hansraj-saini-634864190/
  - X: https://x.com/Hansraj32323520
  - LeetCode: https://leetcode.com/u/Hansrajsaini/
- **Resume:** https://drive.google.com/file/d/1SoKBP5J_axRjmNAlJwAuv1E9UqmmUgK5/view

### My story (for the About page)
- **2023:** first job as a developer, a frontend intern at PathCreators in Hyderabad. I built an AI-assisted object-detection tool that made image labelling about 25% faster.
- **Jun 2024:** joined Instient as an intern and **converted to full-time within one month**. I became the primary engineer on client products: I built the **Unlok** trading app for iPhone and Android **from scratch, as the sole mobile engineer**, and built the **Flyku** MVP.
- **Oct 2025:** Software Engineer at **Kupa (Unlok)**, on a US team, working from India. I own the behind-the-scenes systems of a US investing app and work directly with the founders and CTO on what to build next.
- **Mar 2026:** **Project Lead, Unlok Insights**. I built most of it myself, lead 3 interns, and ship weekly.
- **Now:** I also build websites and products for my own clients (a yoga program, a Jaipur tour operator, and a US startup), and I'm turning that into a studio.

### How I work (values to weave into the copy)
- Ownership without supervision. I take things from a founder conversation all the way to production.
- I design product UI/UX straight from product discussions, with no design handoff needed.
- I ship small and often (225+ merged PRs in about 6 months on Insights).
- Product instinct plus deep engineering: I care whether it converts, not just whether it compiles.

---

## 2. Goal and audience

**Goal:** move from "hire me as an engineer" to **"hire me (the studio) to build your product."**

**Primary audience:** US/EU startup founders (seed to Series B) who need:
- an MVP or product built (web, iOS, Android, 0→1)
- a website or landing page that **converts** (brings leads)
- AI agents and workflow automation
- fintech systems

**Contact: offer three paths side by side, and let the visitor choose:**
1. **Book a 30-minute intro call** (Cal.com embed)
2. **A short, guided project-brief form** (what you need, budget range, timeline), designed as part of the experience rather than a plain form
3. **Direct email / WhatsApp**

No pricing on the site. No availability widget.

---

## 3. Services

| Service | Proof from my work |
|---|---|
| **MVP and product builds** (web + iOS + Android, 0→1) | Unlok trading app shipped to both stores as the sole mobile engineer; Flyku MVP |
| **Conversion websites and landing pages** | Yoga with Latu (WhatsApp trial funnel, trilingual); Ghoomar Cab (call/WhatsApp lead page) |
| **AI agents and automation** | 16 agents and 10 AI content workflows in production (Mastra, Azure OpenAI, AWS Bedrock); took Temporal from proof of concept to company-wide |
| **Fintech systems** | Corporate actions engine, reconciliation, real-time notifications, stock screener |
| **"Anything a developer can build"** | Full-stack partner from idea to launch: backend, databases, payments, auth, CI/CD, cloud |

**Capabilities and tools (use in a Services/skills section):**
- **iOS and Android apps:** React Native, Expo, TestFlight, Play Console
- **Web platforms:** Next.js, React, Tailwind, next-intl (localized, SEO-friendly)
- **AI agents:** Mastra, Azure OpenAI, AWS Bedrock, evals, prompt versioning, AI cost tracking
- **Backend and APIs:** Express, TypeScript, Zod, REST, Go
- **Databases:** PostgreSQL, Drizzle, MongoDB
- **Workflow orchestration:** Temporal
- **Payments and accounts:** Stripe, Clerk, authenticator-app 2FA
- **Real-time:** Apache Pulsar, WebSockets, push
- **CI/CD and cloud:** Docker, AWS (ECR/EC2), GitHub Actions, Vercel

### Process (design this as a scroll story)
**Intro call → Scope → Design → Build → Launch → Grow.** Explain each step in one or two warm, plain sentences. Emphasise direct contact with me (no account managers), weekly shipping, and US-hours overlap.

---

## 4. Work and case studies

Each project gets a **full case-study page**.

**Template:** hero (huge title + device) → context/problem → my role → approach → design and build highlights → **one interactive moment** (a phone or browser mockup the visitor can scroll or tap) → scroll-scrubbed screen recordings for the rest → outcome → testimonial → transition to the next project.

There are **no hard metrics yet**: describe outcomes in words, and design empty, clearly marked **metric slots** and **testimonial slots** to fill in later.

### 4.1 Yoga with Latu (client: conversion website)
- **Live:** https://yogawithlatu.in/en (also `/hi` and Hinglish versions)
- **What it is:** live online yoga for women, taught in Hindi by Latika over Zoom or Google Meet, in small batches. Mainly positioned as a home weight-loss program. There's also a Saturday track for PCOD and thyroid.
- **The site's one job:** get a visitor to message on WhatsApp for the **3-day free trial**.
- **Offer:**
  - 12-week group program, Mon–Fri, 50-minute live classes, a maximum of 12 women per batch
  - monthly plans and 1:1 personal classes
  - weekly weight and measurement checks, a food-guide PDF, class recordings, and a progress report every 4 weeks
- **What I built:**
  - mobile-first Next.js 14 site in **Hinglish, Hindi and English** (next-intl), with light and dark modes
  - batch timings, fee tables, FAQ, blog, and Instagram reels as social proof
  - an Express 5 API with Postgres for site settings, a CMS, and **WhatsApp click tracking** (a future source of real conversion metrics)
  - a Turborepo monorepo
- **Instructor credentials (social proof on the site):** 2019 national gold medal, MA in Yoga, NET qualified, 20+ competition medals. Her reels reach 33.4K–142K+ views.
- **Images (public):**
  - Hero: https://yogawithlatu.in/photos/latu-hero.webp
  - OG/share image: https://yogawithlatu.in/og-image.jpg
  - Headshot: https://yogawithlatu.in/photos/latu-headshot.jpg
  - About: https://yogawithlatu.in/photos/latu-about.jpg
  - Gallery:
    - https://yogawithlatu.in/photos/about/gallery-award.webp
    - https://yogawithlatu.in/photos/about/gallery-handstand.webp
    - https://yogawithlatu.in/photos/about/garden-pose.webp
    - https://yogawithlatu.in/photos/about/trophy-shelf.webp
- **Testimonial slot:** Latika, founder of Yoga with Latu.

### 4.2 Ghoomar Cab / Jaipur Tour Package (client: lead-generation landing page)
- **Live:** https://jaipurtourpackage.co.in/call/
- **What it is:** a government-authorised taxi and tour operator in Jaipur, running since 1992. Customers are domestic and international travellers, families and pilgrims.
- **The page's job:** **phone calls and WhatsApp messages.** The number is in the header, hero, pricing, FAQ and footer. "No online payment": the fare is paid to the driver.
- **Content:**
  - Jaipur Darshan full day (from ₹999), Night Tour (from ₹1,200)
  - pilgrimage and heritage day trips; the Golden Triangle and multi-day Rajasthan tours
  - fare comparison table and fleet (Sedan, Ertiga, Innova Crysta, Tempo Traveller)
  - "How it works", an FAQ, and Google reviews (4.8★)
- **Design:** photo-led and landmark-focused, with trust signals near the top.
- **Images (public):**
  - Hero (Amer Fort at dusk): https://jaipurtourpackage.co.in/call/assets/hero-amer.jpg
  - Landmarks:
    - https://jaipurtourpackage.co.in/call/assets/hawa-mahal.jpg
    - https://jaipurtourpackage.co.in/call/assets/city-palace-2.jpg
    - https://jaipurtourpackage.co.in/call/assets/nahargarh-fort11.jpg
    - https://jaipurtourpackage.co.in/call/assets/jaisalmer.jpg
    - https://jaipurtourpackage.co.in/call/assets/camel-safari.jpg
  - Fleet: https://jaipurtourpackage.co.in/call/assets/crysta.jpg
  - Logo: https://jaipurtourpackage.co.in/call/assets/logo.png
- **Testimonial slot:** the owner of Ghoomar Cab.

### 4.3 Unlok (built at Kupa: label it clearly as "built at Kupa")
- **Live:** web https://app.unlok.com/en · Google Play https://play.google.com/store/apps/details?id=com.unlok.android&hl=en_IN
- **What it is:** an app to invest in and trade US stocks and ETFs, on iOS, Android and web.
- **My role:** built the mobile app **from scratch as the sole mobile engineer**, and shipped features across the web platform.
- **Highlights:**
  - cross-platform React Native app: markets, watchlists, charts, portfolio and trading
  - UI/UX designed straight from product discussions, with no design handoff
  - release pipelines for TestFlight and Google Play, per environment
  - web platform: market explorer, calendars (earnings, IPOs, dividends, splits) and heatmaps
- **Stack:** React Native, Expo, Next.js, TanStack, Valtio, Express, PostgreSQL
- **Images (public):**
  - Web: https://hansrajsaini.vercel.app/work/unlok-web.webp
  - Phone (chart): https://hansrajsaini.vercel.app/work/unlok-app-chart.webp
  - Phone: https://hansrajsaini.vercel.app/work/unlok-mobile.webp
- **Testimonial slot:** Kupa founder or CTO.

### 4.4 Unlok Insights (built at Kupa)
- **Live:** https://insights.unlok.com
- **What it is:** AI-written market intelligence for retail investors.
- **My role:** project lead and primary engineer: web app, editorial CMS, API, database and releases. I lead 3 interns.
- **Highlights:**
  - pre- and post-market briefs, top movers with catalyst detection, and "What Happened" explainers, powered by **10 AI workflows and 16 agents**
  - an editorial CMS with a prompt playground, versioned prompt migrations and AI cost attribution
  - Korean localization end to end, authenticator-app 2FA, and promo codes
  - **225+ merged PRs in about 6 months**; I own the Docker → AWS ECR → EC2 releases
- **Stack:** Next.js 14, Express 5, Drizzle, PostgreSQL, Mastra, Azure OpenAI, AWS Bedrock
- **Images (public):**
  - Web: https://hansrajsaini.vercel.app/work/insights-web.webp
  - Phone: https://hansrajsaini.vercel.app/work/insights-mobile.webp

### 4.5 Flyku
- **Live:** https://flyku.com/ · Google Play https://play.google.com/store/apps/details?id=com.flyku.app
- **What it is:** find running clubs, group runs and events near you, across the United States.
- **My role:** built the MVP, then started the mobile app.
- **Highlights:** an SEO-first web MVP with location search by ZIP code; a mobile app with a weekly run calendar, club pages and memberships.
- **Stack:** Next.js, React Native, PostgreSQL
- **Images (public):**
  - Web: https://hansrajsaini.vercel.app/work/flyku-web.webp
  - App:
    - https://hansrajsaini.vercel.app/work/flyku-app-1.webp
    - https://hansrajsaini.vercel.app/work/flyku-app-2.webp

### 4.6 Under the hood: fintech back-office systems (one technical deep-dive page)
This is plain-language storytelling. Each system flow should be drawn as an animated diagram.

| System | In plain words | Flow |
|---|---|---|
| Corporate actions engine | When a company pays a dividend or splits its stock, every investor's account updates by itself, correctly. | Corporate event → Validate → Cascade to portfolios → Positions updated |
| Portfolio reconciliation | Every day our records are checked against the broker's and the exchange's. Any mismatch raises an alert before a customer notices. | Internal ledger → Provider/exchange → Match → Alert + diagnose |
| Operations automation (Temporal) | Long, multi-step jobs run reliably, retry on failure, and never get lost. | Trigger → Temporal workflow → Activities → End-of-day done |
| Notification infrastructure | Order updates and alerts reach people instantly, in the app or as push notifications. | Event → Apache Pulsar → WebSocket/Push → User |
| AI agents and content | AI reads market news and writes short, clear briefs; editors review them, then they go live. | Market data + news → Mastra agents → Editor review → Published |
| Trading Pro screener | Investors filter thousands of stocks by price, sector and fundamentals, fast. | Filters → Query planner → PostgreSQL → Results |

### 4.7 Lab (small list of side projects)
- **MachineIQ:** a SaaS of AI tools, with Clerk auth and Stripe payments. https://machineiq.vercel.app/ · [code](https://github.com/Hansraj8149/machineiq)
- **GuideEasy:** a travel and cab-hire site for exploring Rajasthan. https://guideeasy.in/ · [code](https://github.com/Hansraj8149/guideeasy)
- **Sociate:** a social network with posts, comments, likes and follows. https://sociate.vercel.app/ · [code](https://github.com/Hansraj8149/sociate)

### 4.8 Teaser: "Currently building with a US startup"
- This is **anonymous on the site**: no name and no logo yet.
- Show it as: *"A field-service SaaS for US home-service contractors: quoting, scheduling, invoicing and AI receptionist. Web + iOS + Android."*
- Design it as a "coming soon / in progress" card, possibly blurred or redacted, which adds intrigue.
- *(Private context, not for the site: the product is QuoteIQ, https://myquoteiq.com/, rated 4.7 on the [App Store](https://apps.apple.com/us/app/quoteiq-contractor-crm/id1635217093) and [Google Play](https://play.google.com/store/apps/details?id=corp.quoteiq.app).)*
- **Testimonial slot:** the US client, for later.

---

## 5. Inspiration: what to take from each

**Primary references (closest to what I want):**
- **https://dennissnellenberg.com**: **the main model.** A solo freelancer presented as a premium studio, with huge type, magnetic buttons, smooth page transitions, a light theme and a strong personal presence.
- **https://cuberto.com**: oversized, confident headlines that animate in, and premium agency polish.
- **https://www.14islands.com**: warm, human and crafted. It feels like a creative partner, not a tech bro.
- **https://monopo.london**: warm and design-driven, with live city clocks.
- **https://vucko.co**: motion-led and playful, but still premium.
- **https://akaru.fr**: detail-obsessed, with a human team-and-values feel.

**Secondary:**
- **https://www.rejouice.com**: positioning aimed at founders ("five clients a year").
- **https://www.exoape.com**: editorial pacing and cinematic transitions.
- **https://robin-noguier.com**: a personal portfolio with a playful 3D twist.

**Avoid:**
- dark hacker or terminal aesthetics
- generic SaaS or Framer-template looks
- heavy 3D game worlds (Bruno Simon style)
- anything that's slow on a mid-range phone

---

## 6. Signature experience moments (must-haves)

1. **Seamless page transitions.** The project card image morphs and expands into the case-study hero, and the "next project" footer pulls you into the next story, so the whole site feels like one continuous film.
2. **Live product demos.** In each case study, one device mockup (phone or browser) can actually be scrolled or tapped. Everything else uses scroll-scrubbed screen recordings inside device frames.
3. **Huge kinetic typography** in heroes and section titles, at Cuberto scale.
4. **My handwritten signature drawn on screen** (stroke animation) on the About page and in the footer. The source is a real signature image (see §9).
5. **Magnetic buttons**, a subtle custom cursor (desktop only), and smooth scroll.
6. **One tasteful WebGL moment** (for example, a soft distortion or fluid hover on work images). Only one.
7. **The process told as a scroll story** (§3).
8. **Testimonials** as portrait + quote, or short video, with slots for Latika (Yoga with Latu), the Ghoomar Cab owner, the Kupa founders/CTO, and the US client.
9. **A strong personal presence.** My photo, voice and story, from Jaipur to building products for US founders. Founders should feel they're hiring a person.

---

## 7. Pages

**Home · Work (index) · Case study (template ×7) · About · Services + Process · Journal · Contact**

- **Home:**
  - hero with huge type and my positioning
  - selected work (Yoga, Ghoomar Cab, Unlok, Insights)
  - services teaser and process teaser
  - testimonials
  - me (photo + short story)
  - the three contact paths
- **Work:** index of all projects, plus the Lab list and the anonymous US-startup teaser.
- **About:** story timeline (2023 → now), photos, values, how I work, time-zone overlap, and the signature.
- **Services + Process:** the 5 services with proof, the capabilities and tools, and the process scroll story.
- **Journal:** notes and build logs (design the index and the article template; content will come later).
- **Contact:** the three paths side by side: Cal.com booking, a guided brief form, and email/WhatsApp.

---

## 8. Visual system: starting direction (propose, refine and justify)

- **Light first:**
  - warm off-white/paper base (around `#F4F1EA`) and near-black ink (around `#141414`)
  - **one confident warm accent** that nods to Jaipur, the Pink City: terracotta or rose (around `#E2552C` or `#D9566E`)
  - **per-case-study accent colours** that take over the page during transitions (for example, sage for Yoga, sandstone for Ghoomar Cab, deep green for Unlok)
- **Type:** a big, expressive display sans for headlines plus a clean, readable sans for body text. Prefer fonts that are free for commercial use (Fontshare: General Sans, Clash Display, Satoshi; Google Fonts: Inter Tight, Instrument Serif for accents).
- **Layout:** generous whitespace, an editorial grid, and real photography of people and places. No stock illustrations.
- **Existing brand assets** (optional; you may propose a new mark):
  - Mark: https://hansrajsaini.vercel.app/brand/mark.svg
  - Lockup: https://hansrajsaini.vercel.app/brand/lockup-on-light.svg
  - Wordmark: https://hansrajsaini.vercel.app/brand/wordmark-on-light.svg

### Motion and performance
- **"Rich but tasteful":** smooth scroll, text reveals, magnetic buttons, page transitions, and one WebGL moment.
- **Fast on mid-range phones**, and fully usable on mobile, with touch equivalents for every hover effect.
- **Respect `prefers-reduced-motion`.**
- **Accessible:** contrast, keyboard navigation, visible focus states.
- **SEO-friendly**, server-rendered content.

### Tech context (for the build later)
- Existing repo: **Next.js 15 (App Router) + Tailwind CSS 4 + TypeScript**, deployed on **Vercel** (hansrajsaini.vercel.app for now; a custom domain later).
- Plan to add **GSAP, Lenis and React Three Fiber** only where needed.
- All copy lives in content files.

---

## 9. Assets to upload manually

These are local files that have no public URL. **Upload them to Claude Design with this prompt.**

| File (on my Mac) | Use |
|---|---|
| `~/Desktop/hansraj/photos/picofme (3) (1).png` | Portrait of me: home and About |
| `~/Desktop/hansraj/photos/Image (2).jpeg` | Second photo of me: About |
| `~/Desktop/hansraj/photos/hansraj-sign.jpeg` | My handwritten signature: trace it as an animated SVG stroke |

## 10. Assets still to produce (include these in your asset checklist)

- **Screen recordings** (vertical phone and desktop browser) of:
  - Yoga with Latu (EN and Hindi, light and dark)
  - Ghoomar Cab (/call page on mobile)
  - the Unlok app
  - Unlok Insights
  - Flyku
- **Testimonials** from Latika, the Ghoomar Cab owner, the Kupa founders/CTO, and the US client (a quote and portrait, or a 20–30 second video).
- **Real metrics, when available:**
  - Yoga with Latu: WhatsApp clicks and trial leads per month (already tracked by its API)
  - Ghoomar Cab: calls and WhatsApp leads per month
  - Unlok: app installs and ratings
- **More photography of me:** working, in Jaipur, at the desk. Warm, natural light.

## 11. Decisions already made (don't revisit these)

- **Brand:** a personal brand run as a studio. Not a new studio name.
- **Style:** a bold, premium, warm studio site with light colours first. The dark fintech terminal theme is gone.
- **Audience:** US/EU startup founders.
- **Projects:** a full case study for each. Unlok and Insights are labelled "built at Kupa", and the US startup stays anonymous.
- **Contact:** three paths side by side. No pricing, and no availability widget.
- **Pages:** Home, Work, Case studies, About, Services + Process, Journal, Contact.
- **Motion:** rich but tasteful, with one WebGL moment.
- **Stack:** stays on Next.js + Tailwind. **Domain:** stays on vercel.app for now.
