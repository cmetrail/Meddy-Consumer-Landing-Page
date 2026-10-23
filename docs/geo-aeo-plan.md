# GEO / AEO Improvement Plan

Goal: get getmeddyhealth.com cited in AI answers (Google AI Overviews / AI Mode, ChatGPT search, Perplexity, Gemini, Copilot) for primary-care, longevity, biomarker, sleep, nutrition and weight-management questions.

> Read `AGENTS.md` first. This repo runs a modified Next.js. Before writing routing, metadata or sitemap code, read the relevant guide in `node_modules/next/dist/docs/`.

## Current state (verified in repo)

| Area | Status | Where |
|---|---|---|
| AI crawlers allowed | Done (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, etc.) | `app/robots.ts` |
| Sitemap | Exists, but every `lastModified` is `new Date()` (not truthful) and the routes list is hand-maintained | `app/sitemap.ts` |
| `llms.txt` | Exists, lists key pages | `public/llms.txt` |
| Metadata helper | `buildMetadata()` gives title, description, canonical, OG, Twitter | `src/lib/seo.tsx` |
| JSON-LD | `MedicalOrganization`, `MedicalClinic`, `Physician`, `WebSite` graph (`SITE_GRAPH_LD`), per-page `webPageLd()` (MedicalWebPage + breadcrumb + `reviewedBy`), `faqLd()`, `membershipPlansLd()` | `src/lib/seo.tsx` |
| FAQ schema | On 8 pages: longevity, personalized-health-plans, weight-loss, fitness, physician-care, medication, nutrition, wearables. Data lives in a `FAQS` const in each `app/<route>/page.tsx` | `app/*/page.tsx` |
| Visible FAQ sections | Exist for some pages (e.g. `src/features/weight-loss/components/sections/WeightLossFaqSection.tsx`) | `src/features/*/components/sections/` |
| `sameAs` links | Missing | `SITE_GRAPH_LD` |
| Blog / guides | Missing | n/a |
| Author / physician bio page with credentials | Only `/physician-care` | n/a |

Known inconsistencies to resolve (entity trust):
- Two emails: `EMAIL = support@meddyhealth.ai` and `CLINIC_EMAIL = support@getmeddyhealth.com`.
- Brand names are split across "Meddy Health", "Meddy EMR" (logo asset) and "Sameer Aggarwal Medical PLLC". The privacy PDF names "Meddy Health LLC".
- FAQ schema text and the visible FAQ component text may have drifted apart (see task 1).

## Principles

1. Schema must match visible page content. Never ship schema for text that is not on the page.
2. Every answer must be real HTML text, server-rendered, not hidden in images or JS-only widgets.
3. Health content is YMYL. Do not make outcome claims ("cures", "guaranteed results"). Keep the existing "not for emergencies / call 911" language.
4. Do not invent credentials, reviews, ratings, NPI numbers or study citations. If a fact is missing, leave a `TODO(owner)` and list it in the PR description.
5. Keep diffs small and run `npm run lint` and `npx tsc --noEmit` before finishing.

## Tasks (in priority order)

### 1. Make FAQ schema and visible FAQs a single source of truth
- For each of the 8 pages above, move the `FAQS` array out of `app/<route>/page.tsx` into the feature folder (e.g. `src/features/<feature>/faqs.ts`).
- Import the same array in both the `faqLd(FAQS)` call and the visible FAQ section component.
- Acceptance: editing one FAQ string changes both the page and the JSON-LD. No page has FAQ schema without a visible FAQ section, and vice versa.
- Add FAQs (visible and schema) to pages that have none and target question-style queries: `/biomarkers`, `/sleep`, `/pricing`, `/how-it-works`, `/why-meddy`, `/what-we-test`, `/247-care`.

### 2. Answer-first content blocks
- On each service page, make the top of the page answer the page's core question in 40–60 words of plain text directly under the H1 (or under a question-style H2).
  Example for `/pricing`: "How much does Meddy cost? Meddy memberships start at $99/month and include..."
- One H1 per page. Section headings should be questions or clear topic phrases.
- Keep the existing design. Add the text inside existing hero or section components, don't redesign.
- Acceptance: view-source (not DevTools) of each page contains the answer text.

### 3. Entity consistency and `sameAs`
- Decide with the owner which email and brand name are canonical, then update `src/lib/seo.tsx`, `public/llms.txt`, and the footer/contact components to match.
- Add `sameAs` (LinkedIn, X, Instagram, Crunchbase, Google Business Profile, Healthgrades, etc.) to the `MedicalOrganization` and `Physician` nodes in `SITE_GRAPH_LD`. **Only add URLs the owner provides.** Leave a `TODO(owner)` if none are known.
- Add `medicalSpecialty`, `hasCredential`, `identifier` (NPI) and `alumniOf` to the `Physician` node only with owner-supplied facts.
- Add `openingHours` / `availableService` / `MedicalBusiness` fields only if accurate.

### 4. Physician / author pages
- Expand `/physician-care` or add `/about/dr-sameer-aggarwal`: credentials, board certification, license states, experience, photo, and a short bio. Facts must come from the owner.
- Link to it from every medically reviewed page ("Reviewed by Dr. Sameer Aggarwal") with a visible "Last reviewed: <date>" line.
- `webPageLd()` already sets `reviewedBy`. Add `lastReviewed` and `dateModified` (accept them as opts, source the date from the same constant that renders on the page).

### 5. Guides hub (content engine)
- Add `/guides` (index) and `/guides/[slug]` using the App Router. Check `node_modules/next/dist/docs/` for the current dynamic-route and `generateStaticParams` conventions first.
- Store guides as typed TS or MDX content, one file per guide, with fields: `title`, `slug`, `description`, `author`, `reviewedBy`, `datePublished`, `dateModified`, `sources[]`, `faqs[]`, body.
- Per guide: `Article` + `MedicalWebPage` JSON-LD (add an `articleLd()` helper in `src/lib/seo.tsx`), visible byline, reviewer, date, and a "Sources" list linking to primary literature or guidelines.
- First 8 guides (drafts for clinical review before publishing; mark `status: "draft"` and exclude drafts from sitemap and indexing):
  1. What is physician-guided primary care?
  2. What biomarkers should I track for longevity?
  3. How is concierge primary care different from regular primary care?
  4. How does sleep affect recovery and metabolic health?
  5. How do nutrition and workouts show up in your labs?
  6. What does a comprehensive lab panel include?
  7. Can wearables data improve your care?
  8. What to expect in a Meddy consultation
- Acceptance: each published guide has answer-first intro, FAQ block, sources, reviewer, dates, valid JSON-LD.

### 6. Sitemap and crawl hygiene
- `app/sitemap.ts`: replace `lastModified: new Date()` with real per-route dates (a `LAST_MODIFIED` map or the guide `dateModified`). Include guide routes generated from content. Exclude drafts.
- Consider dropping `/book-consultation` from the sitemap if it is noindexed or thin. Decide with the owner.
- Add `max-snippet:-1, max-image-preview:large, max-video-preview:-1` to the robots meta in `buildMetadata()` (`robots: { index: true, follow: true, googleBot: {...} }`).
- Confirm every page has a unique title and description and a self-referencing canonical (already done through `buildMetadata`; verify new pages use it).

### 7. `llms.txt` / `llms-full.txt`
- Update `public/llms.txt` with guides, physician page, and the canonical contact details.
- Add `public/llms-full.txt` with a markdown rendering of the key pages' answer-first copy and FAQs. Generate it from the same FAQ and content constants with a small script in `scripts/` so it cannot drift. Impact is unproven, so keep this low effort.

### 8. Performance and rendering
- `PERFORMANCE.md` exists; read it. Check Core Web Vitals (LCP, INP, CLS) on the home page and top 3 service pages with Lighthouse or PageSpeed Insights. Heavy scroll animation (Lenis, framer-motion) and large hero images are the usual causes.
- Ensure primary copy is in the server-rendered HTML (view-source test). Client-only components that render headings/answers should be converted or have a server-rendered fallback.
- Add descriptive `alt` text to meaningful images.

### 9. Measurement (needs owner access, not code)
- Verify the site in Google Search Console and Bing Webmaster Tools; submit `sitemap.xml`. (Bing powers ChatGPT search results.)
- Create a prompt set of 25–30 target questions. Each month, run them in Google AI Mode, ChatGPT search, Perplexity and Gemini, and record: cited yes/no, which URL, which competitor was cited. Store results in `docs/geo-tracking.md` (create it).
- Track Search Console impressions for question-style queries.

## Out of scope / needs owner input
- Off-site authority: directory listings (Healthgrades, Zocdoc, Yelp, Google Business Profile), press, reviews, Reddit/Quora presence. These move citations the most but are not code.
- Medical review of guide copy.
- Any claim about outcomes, pricing changes, or credentials.

## Suggested PR breakdown
1. FAQ single source of truth + missing FAQs (task 1)
2. Answer-first blocks (task 2)
3. Entity/`sameAs`/physician schema + physician page (tasks 3–4), blocked on owner facts
4. Sitemap/robots/meta hygiene (task 6)
5. Guides hub + `articleLd` (task 5)
6. `llms.txt`/`llms-full.txt` generator (task 7)
7. Performance pass (task 8)

## Definition of done (per PR)
- `npm run lint` and `npx tsc --noEmit` pass.
- Validate JSON-LD for changed pages with the Schema Markup Validator (validator.schema.org) and Google's Rich Results Test.
- View-source check that new copy is server-rendered.
- PR description lists every `TODO(owner)` left behind.
