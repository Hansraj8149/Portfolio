# Design System Prompt: Hansraj Saini, Studio

> **How to use this file**
> 1. In Claude Design, upload `DESIGN_BRIEF.md` (the full project context) and the 3 photos listed in its §9.
> 2. Copy everything below **"The Prompt"** and paste it as the message.
> 3. Build the design system **before** any page designs; every page should then be built from it.

---

## The Prompt (copy from here)

Create a **complete design system** for my new studio website, **"Hansraj Saini, Studio"**. The full context (who I am, my work, references, decisions) is in the attached `DESIGN_BRIEF.md`. Read it first.

This design system is the foundation for every page: Home, Work, Case studies, About, Services + Process, Journal and Contact. It must make the site feel **premium, warm, human and experiential**: Dennis Snellenberg's craft and structure, Cuberto's huge confident type, and the warmth of 14islands, Monopo, Vucko and Akaru. **Not** a generic SaaS kit, and **not** a dark developer or terminal look.

### Brand foundations

**1. Brand essence.**
- Write a one-line positioning statement.
- Choose 3–4 brand attributes (for example: warm, precise, confident, human) and explain how each one shows up visually.
- Write do/don't examples for each attribute.

**2. Voice and tone.**
- Voice: first person, "I", with "we" for working with a client. Warm, direct and plain-spoken, and confident without hype.
- Give rules, a word list (use / avoid), and before/after examples for each of these:
  - a hero line
  - a button label
  - an error message
  - an empty state
  - a case-study intro
  - a form question

**3. Logo usage.**
- Either refine the existing mark (https://hansrajsaini.vercel.app/brand/mark.svg, lockup https://hansrajsaini.vercel.app/brand/lockup-on-light.svg), or propose a simple new wordmark or monogram that works well as a favicon.
- Include clear space, minimum size, colour versions, and misuse examples.
- Show how my **handwritten signature** (uploaded image) is used as a secondary brand element: an animated SVG stroke on the About page and in the footer.

### Design tokens
Give each token a name, a value and a usage rule, and output them in a format I can paste into code (CSS custom properties plus a Tailwind CSS v4 `@theme` block).

**4. Colour**
- **Light first.** A warm paper/off-white base (around `#F4F1EA`), a near-black ink (around `#141414`), and **one signature accent** that nods to Jaipur, the Pink City (explore terracotta around `#E2552C` against rose around `#D9566E`, and recommend one).
- **Neutral scale:** 50–950, warm-tinted, never cold grey.
- **Semantic tokens:**
  - surfaces: `bg`, `surface`, `surface-raised`, `ink`, `ink-muted`, `ink-subtle`, `border`
  - interactive: `accent`, `accent-hover`, `accent-ink`, `focus-ring`
  - states: `success`, `warning`, `error`
- **Per-case-study theme palettes** that take over the whole page during transitions. Each palette is a full set (bg / ink / accent):
  - Yoga with Latu: sage or calm
  - Ghoomar Cab: sandstone or dusk (taken from Amer Fort at dusk)
  - Unlok: deep green, finance
  - Unlok Insights: ink or indigo
  - Flyku: energetic
  - Back-office deep-dive: graphite
- **An inverted (dark) section theme** for contrast moments, such as the footer, the contact block or video sections. The site itself stays light first.
- **Contrast:** every text/background pair must meet WCAG AA. Show the ratios.

**5. Typography**
- A **display face** for huge kinetic headlines (Cuberto scale: hero type of 10–16vw on desktop) and a **text face** for body copy. Optionally, one accent serif or italic for warmth.
- Fonts must be **free for commercial use**. Prefer Fontshare (General Sans, Clash Display, Satoshi, Cabinet Grotesk) or Google Fonts (Inter Tight, Instrument Serif). Recommend one pairing and justify it.
- **A fluid type scale** using `clamp()`, from Display XL down to Caption. For every step, give the size, line-height, letter-spacing and weight.
- Rules for:
  - line length and text wrapping
  - small-caps labels and eyebrow text
  - numbers (tabular figures for metrics)
  - the Hindi/Devanagari fallback (the Yoga case study shows Hindi text)

**6. Space, layout and grid**
- A spacing scale (4px base), plus section rhythm (the vertical gaps between sections, by breakpoint).
- Grid:
  - 12 columns on desktop, 8 on tablet, 4 on mobile
  - gutters and margins, a max content width, and an editorial "full-bleed vs. inset" rule
- Breakpoints, with mobile-first rules (a 16px minimum side gutter and no horizontal scroll).

**7. Shape and depth.** Radius scale, border widths, shadows (minimal and warm), image treatments (crop ratios, rounded media, grain or texture if any), and the style of the device frames (phone and browser).

**8. Motion system.** This is critical, because the site is an experience.
- **Principles:** "rich but tasteful", motion with purpose, and a single motion personality throughout.
- **Easing tokens** (for example, `ease-out-expo` and `ease-in-out-quart`, written as cubic-bezier values) and **duration tokens** (xs–xl).
- Specs for each of these patterns:
  - text reveals (line and word mask-up)
  - kinetic hero type
  - magnetic buttons (pull strength and radius)
  - custom cursor states (default, hover-link, hover-media "View", drag), desktop only
  - **page transitions**: the project card morphs into the case-study hero, the "next project" footer pulls you into the next story, and the per-case-study colour takeover
  - scroll-scrubbed video in device frames
  - the one interactive mockup moment
  - the signature stroke-draw
  - the single WebGL hover effect on work images
  - smooth scroll with Lenis
- **Touch equivalents** for every hover effect.
- **A `prefers-reduced-motion` fallback** for every pattern.
- Performance budgets: what animates (transform and opacity only), and limits for mobile.

**9. Iconography and imagery.**
- An icon style (one stroke weight and one icon set; for example, Lucide restyled).
- Photography direction: real people and places, warm natural light, Jaipur texture, no stock illustration.
- How screenshots and recordings sit inside device frames.

### Components
For each component, show **anatomy, variants, sizes, states** (default, hover, focus, active, disabled, loading), **motion** behaviour, **mobile** behaviour, and **accessibility** notes.

**10. Core components**
- **Buttons:**
  - primary (magnetic), secondary, ghost, text-link with an animated underline
  - an icon button, and a "round CTA" blob button
- **Navigation:**
  - the header (minimal, with a live Jaipur clock and US-overlap hint)
  - a fullscreen mobile/menu overlay
  - the footer (a huge "Let's build" CTA plus the signature)
- **Tags/chips** for services, stack and platform (iOS / Android / Web).
- **Form elements**, styled for the **guided project-brief form**:
  - one question per step, with a progress indicator
  - selectable cards for "what you need", a budget range and a timeline
  - text inputs and validation messages
  - a success state
- **Links**, plus a list item with a hover image preview (for the Work index and Lab list).

**11. Content components**
- A **project card**: large media with hover video or WebGL distortion, a title, a category and a platform badge. Include a "built at Kupa" label variant and a redacted "Currently building with a US startup" variant.
- **Case-study blocks:**
  - hero (huge title and device)
  - meta row (client, role, platforms, stack, live links)
  - context/problem
  - approach
  - a highlight with media
  - full-bleed media
  - a device-frame video scrub
  - an interactive mockup
  - a **metric slot**, with an empty "metrics coming soon" state
  - a **testimonial**: quote plus portrait, or video, with an empty state
  - a "next project" footer
- A **system flow diagram** (for example, "Event → Validate → Cascade → Updated"), animated step by step, for the back-office deep-dive.
- **Service cards**, plus a capability/tool list.
- **Process steps** as a scroll story: Intro call → Scope → Design → Build → Launch → Grow.
- **About:** a story timeline (2023 → now), a photo collage, value cards, and the signature block.
- **Contact:** three path cards side by side (book a call via a Cal.com embed frame, the guided brief form, email/WhatsApp).
- **Journal:** an article card, the article page typography (prose styles, code blocks, pull quotes, images and captions).
- **Utility:** a preloader/intro (if any; keep it short and skippable), a toast, a 404 page, and skeleton/loading states.

### Deliverables
1. A **design system document**, with every section above in a clear visual layout.
2. **Token sheets**: colour (including the per-project themes and the dark section theme), type scale, spacing, radius, shadow and motion, each with names and values.
3. A **component library page**, showing every component with its variants and states, on desktop and mobile.
4. **Two sample compositions** built only from the system, to prove it works:
   - **(a)** the Home hero with the selected-work section
   - **(b)** the Yoga with Latu case-study hero, with its theme takeover
5. **Code handoff**: CSS custom properties, plus a Tailwind v4 `@theme` block for all tokens, and a font-loading recommendation (`next/font`).
6. **Usage rules**: a short do/don't list for keeping future pages on-brand.

### Constraints
- **Tech:** the site will be built with Next.js 15 (App Router), Tailwind CSS v4, GSAP, Lenis and React Three Fiber, used sparingly. Tokens must map cleanly to that stack.
- **Accessibility:** WCAG AA contrast, visible focus states, keyboard support for every interactive component, and reduced-motion support.
- **Performance:** fast on mid-range phones. Use at most 2 font families with subsetting, and keep the WebGL to one moment.
- **Use real content** from `DESIGN_BRIEF.md` in every example: real project names, real copy and the real image URLs. No lorem ipsum.

Before you finalise, ask me about anything that's ambiguous. In particular, show me 2–3 options for the accent colour and the type pairing before locking them in.
