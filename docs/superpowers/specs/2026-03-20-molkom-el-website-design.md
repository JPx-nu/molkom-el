# Molkom EL Website — Design Specification

## Overview

A full marketing website for Molkom EL, a Swedish electrical contractor established in 1925, currently without an online presence. The site serves three customer segments (private/farming, industry/contracting, power grid/electricity) with an MVP-complete set of pages and a one-scroll condensed alternative.

## Technical Stack

- **Framework:** Astro (static output mode, pre-rendered HTML)
- **Content:** Markdown/MDX collections with Zod schemas, architected for future CMS swap
- **Hosting:** Self-hosted Azure, deployed via GitHub Actions
- **Styling:** CSS custom properties design system, no CSS framework
- **Fonts:** DM Serif Display (headings) + DM Sans (body/UI) via Google Fonts
- **Images:** Astro Image optimization pipeline, real project photos available

## Color System (Custom blend — "Scandinavian Precision")

Based on the brief's Palette A and B, refined into a custom blend: the warm ink tones and signal red from A, the clean white canvas approach from B.

```css
--color-ink:        #0F2137;    /* Primary text, header bg, footer bg */
--color-ink-light:  #2D3F54;    /* Secondary headings */
--color-body:       #5A6A7E;    /* Body text */
--color-muted:      #8E99A8;    /* Captions, meta text */
--color-border:     #E2E6EC;    /* Dividers, card borders */
--color-surface:    #F5F7FA;    /* Card backgrounds, alternating sections */
--color-white:      #FFFFFF;    /* Base canvas */
--color-red:        #C8102E;    /* CTA buttons, active states, trust badges */
--color-red-hover:  #A80D25;    /* CTA hover state */
--color-red-light:  #FEF2F2;    /* Subtle red highlight tint */
```

## Typography

> **Note:** The brief recommends Inter/Montserrat/Poppins (modern sans). We deliberately deviate to a serif+sans pairing — DM Serif Display gives the "sedan 1925" heritage weight that no geometric sans can achieve, while DM Sans keeps UI elements clean and modern. This is a conscious design choice, not an oversight.

- **DM Serif Display** — Hero headlines, section titles, process step numbers. High-contrast serif communicating heritage and authority.
- **DM Sans** — Navigation, body text, cards, CTAs, forms. Clean geometric sans pairing.
- Sizes use `clamp()` for fluid scaling. Headings generous, body 16-18px base.

## Project Structure

```
molkom-el/
├── src/
│   ├── layouts/
│   │   └── BaseLayout.astro          # HTML shell, meta, OG, structured data
│   ├── components/
│   │   ├── Header.astro              # Sticky header + mobile nav
│   │   ├── Footer.astro              # Contact info, legal, trust badges
│   │   ├── Hero.astro                # Full-bleed photo variant + text variant
│   │   ├── ServiceCard.astro         # Card for service grid
│   │   ├── TrustBar.astro            # Badge chips strip
│   │   ├── ProcessSteps.astro        # Connected step visualization
│   │   ├── ContactForm.astro         # Private/simple contact form
│   │   ├── EntrepreneurForm.astro    # B2B qualified inquiry form
│   │   ├── CTABlock.astro            # Reusable call-to-action section
│   │   ├── ROTPanel.astro            # ROT-avdrag FAQ panel for private customers
│   │   ├── CookieBanner.astro        # GDPR cookie consent banner
│   │   └── SEO/
│   │       ├── SchemaMarkup.astro    # LocalBusiness/Electrician JSON-LD
│   │       └── OpenGraph.astro       # OG + Twitter card meta
│   ├── content/
│   │   ├── services/                 # Markdown collection
│   │   │   ├── lagspanning.md        # 0–0.4 kV
│   │   │   ├── elkraft.md            # 10–145 kV
│   │   │   ├── entreprenad.md        # Contracting & staffing
│   │   │   ├── utbildningar.md       # Training courses
│   │   │   └── maskinuthyrning.md    # Machine rental
│   │   └── config.ts                 # Zod schemas for content collections
│   ├── pages/
│   │   ├── index.astro               # Homepage
│   │   ├── tjanster/
│   │   │   └── [slug].astro          # Dynamic service page from collection
│   │   ├── kontakt.astro             # Contact (dual flow)
│   │   ├── spontanansokan.astro       # Job application (ASCII slug, renders as /spontanansokan)
│   │   ├── om-oss.astro              # About us
│   │   ├── one-page.astro            # One-scroll condensed version
│   │   └── integritetspolicy.astro   # Privacy policy
│   ├── styles/
│   │   └── global.css                # Design tokens, base styles, utilities
│   └── assets/                       # Optimized images via Astro Image
├── public/
│   └── pics/                         # Original project photos
├── astro.config.mjs                  # Static output, sitemap, image optimization
└── package.json
```

### Key Architecture Decisions

- **Content collections with Zod schemas** validate frontmatter at build time and provide a clean data interface that can swap to a CMS data source without changing templates.
- **Dynamic `[slug].astro`** generates all service pages from one template — matches the spec's shared service page structure.
- **`one-page.astro`** imports the same components as the multi-page site but renders condensed content in a single scroll flow.
- **CSS custom properties** for the full design system — one file controls palette, spacing, and typography across all components.

## Component Design

### Header (Sticky)
- Transparent on page top, gains white background + shadow on scroll (CSS transition via Intersection Observer)
- Desktop: logo left, nav center (Tjänster dropdown, Utbildningar, Maskinuthyrning, Om oss, Kontakt, Spontanansökan), red "Kontakta oss" button right
- Mobile: logo left, hamburger right → full-screen slide-in nav overlay
- Clickable phone number visible on desktop

### Hero
- Full-bleed photo (sunset substation shots: 3.jpg/4.jpg) with white-to-transparent gradient overlay from left (~50% width)
- Content left-aligned: eyebrow "SEDAN 1925" (red, letterspaced) → H1 in DM Serif Display (fluid clamp 2.5rem–4rem) → subtitle → dual CTAs
- Narrower variant for service pages: photo where available, `--color-surface` fallback
- Animated scroll indicator at bottom edge

### Service Cards
- Photo with slight desaturation by default, full saturation on hover
- Thin border, on hover: translateY lift + layered shadow + red top-border animates in
- Content: photo/icon, title (DM Serif Display), one-line description, "Läs mer →"
- Grid: responsive, 3+2 on desktop, stacked on mobile

### Trust Bar
- Horizontal row of badge chips with subtle inset shadows (physical badge feel)
- Items: "Sedan 1925" (larger, tinted), "Registrerad hos Elsäkerhetsverket", "ID06", "Rikstäckande", "Dokumentation", "Utbildad personal"
- Mobile: horizontally scrollable with scroll hint

### Process Steps
- 4 steps: Kontakt → Förslag & plan → Utförande → Dokumentation & uppföljning
- Horizontal layout on desktop, vertical on mobile
- Connected by thin line with animated dots that fill as they scroll into view
- Large DM Serif Display step numbers for visual contrast

### Contact Form (Private)
- Bottom-border-only inputs, animated floating labels
- Fields: name, phone/email, message, GDPR consent checkbox
- Red accent on focus state
- Submit button: red filled, full width on mobile

### Entrepreneur Form (B2B)
- Same input styling as private form
- Fields: company name, contact person, phone/email, voltage level (dropdown), location, timeline, documentation requirements (checkboxes), message, GDPR checkbox

### CTA Block
- Reusable full-width section with `--color-ink` background
- H2 + supporting text + one or two CTA buttons (white on dark)
- Used at bottom of service pages and about page

### ROT Panel
- Compact FAQ-style panel for private customer pages (0–0.4 kV)
- Covers: what is ROT-avdrag, how much (30% of labor), what qualifies, how it works (company deducts on invoice), what's excluded (materials, travel)
- Accordion or expandable sections, `--color-surface` background with `--color-red-light` accent
- CTA at bottom: "Vill du veta mer? Kontakta oss"

### Cookie Banner
- Fixed bottom bar, appears on first visit
- Text: brief explanation that the site uses necessary cookies + link to integritetspolicy
- Two buttons: "Acceptera" (primary) and "Bara nödvändiga" (secondary)
- Stores consent in localStorage, does not load analytics/tracking scripts until consent given
- For MVP: only necessary cookies (session, consent preference) — no third-party tracking

### Footer
- Dark (`--color-ink`) background
- Three columns: contact info (phone, email, address, org.nr), quick nav links, trust badges
- Bottom bar: copyright, privacy policy link, "Registrerad hos Elsäkerhetsverket" with link

## Motion & Interaction

- **Page load:** Staggered fade-up reveals for hero elements using CSS `animation-delay`
- **Scroll-triggered:** Service cards, trust badges, process steps fade up as they enter viewport (Intersection Observer, CSS classes, no JS library)
- **Hover:** Cards lift (translateY -4px + shadow), buttons scale subtly (1.02), nav items get underline sliding in from left
- **One-page version:** CSS scroll-snap between sections, side dot-navigation indicator showing active section
- **Header transition:** Transparent → white background on scroll via CSS transition

## Pages

### Homepage (`index.astro`)

1. **Hero** — Full-bleed substation sunset photo, gradient overlay, "Ett anrikt företag med framtiden i fokus", dual CTAs
2. **Service cards** — 5-card grid linking to service pages
3. **Trust bar** — Badge chips row
4. **Om oss (short)** — Two-column: text left (6-8 lines), project photo right. `--color-surface` background.
5. **Process** — "Så går det till" — 4 connected steps
6. **Contact block** — Split: info left (headline, phone, email, address), simple form right, optional response promise

### Service Pages (`tjanster/[slug].astro`)

Shared template, content from Markdown frontmatter:

1. **Hero** — Narrower variant with service photo or surface fallback
2. **Intro** — 3–5 lines prose
3. **"Det här hjälper vi med"** — Two-column bullet grid of typical jobs
4. **"Passar för"** — Tag chips (Privat / Företag / Industri / Lantbruk, varies per service)
5. **Capability block** — Only on 10–145 kV page: voltage levels, delivery model, project management, certifications as key-value grid
6. **Process** — Shared ProcessSteps component
7. **CTA block** — "Få offert" for private, "Entreprenadförfrågan" for B2B. Sticky on mobile.

**Entreprenad variant:** Adds a staffing/resources section: available team size, deployment model (on-site, project-based), safety/ID06 credentials. B2B tone throughout. CTA is "Entreprenadförfrågan" linking to the B2B contact flow. No private-customer elements (no ROT panel).

**Utbildningar variant:** Bullet grid replaced with course cards (name, duration, language sv/en, "Boka/Fråga om datum" CTA). Secondary CTA: "Föreslå en kurs" linking to the contact form with a pre-filled subject.

**Maskinuthyrning variant:** Uses table layout for equipment list. Professional placeholder: "Sortimentet uppdateras. Skicka en förfrågan via formuläret så återkommer vi snabbt med pris och tillgänglighet."

**Lågspänning (0–0.4 kV) variant:** Includes the ROTPanel component after the bullet grid. "Passar för" shows Privat / Lantbruk tags. CTA is "Få offert".

### Kontakt (`kontakt.astro`)

- Hero with H1 "Kontakt", prominent phone + email
- Flow selector: two large clickable cards — "Privatperson / mindre jobb" and "Företag / entreprenad". Selection scrolls to the appropriate form.
- Private form: name, phone/email, job type dropdown, message, GDPR checkbox
- B2B form: company, contact person, phone/email, voltage level dropdown, location, timeline, documentation requirements checkboxes, message, GDPR checkbox
- Sidebar/bottom: office locations (Molkom, Karlstad), clickable phone, email, org.nr

### Om oss (`om-oss.astro`)

- Extended history and values text
- Key figures strip: "100 år" / "X medarbetare" / "Rikstäckande" with animated count-up on scroll
- Photo grid using available project photos
- CTA block at bottom

### Spontanansökan (`spontanansokan.astro`)

- Short employer brand section (history, safety culture, why work here)
- Form: name, email, phone, message/motivation, CV upload (styled drop zone), GDPR checkbox
- Privacy policy link

### One-Page Scroll (`one-page.astro`)

> **Scope note:** This page is a client-requested addition, not from the original design brief. It serves as a shareable standalone link or ad landing page.

Condensed single-scroll version using same components:

1. **Hero** — Same as homepage
2. **Services** — All 5 as compact cards (summary only, no click-through, "Kontakta oss för mer info")
3. **Trust bar** — Same component
4. **Om oss** — 3-4 lines max
5. **Contact** — Simple form only (no flow selector)

CSS scroll-snap between sections. Side dot-navigation showing active section. Shareable as standalone link or ad landing page.

### Integritetspolicy (`integritetspolicy.astro`)

Plain content page covering: data controller (company + org.nr), data collected, purpose, legal basis, retention period, data subject rights, right to complain to IMY.

## SEO & Structured Data

Every page receives:
- Dynamic `<title>` and `<meta name="description">` from page/collection frontmatter
- Open Graph and Twitter Card meta tags
- Canonical URL
- `lang="sv"` on HTML element

Homepage additionally gets:
- LocalBusiness + Electrician JSON-LD schema
- `sameAs` links to Google Business Profile (when created)

Service pages get service-specific structured data.

Astro sitemap integration generates `sitemap.xml` automatically. Robots.txt allows full crawling.

## Swedish Regulatory Compliance

- **Elsäkerhetsverket** badge in trust bar and footer, linking to "Kolla elföretaget"
- **ROT-avdrag** information on the 0–0.4 kV service page (30% of labor, company deducts, materials excluded)
- **ID06** mentioned in trust bar and on B2B-facing service pages
- **GDPR** consent checkbox on every form, link to integritetspolicy page, cookie banner
- **Konsumenttjänstlagen** reference where relevant for private customers

## Available Photos

| File | Content | Best use |
|------|---------|----------|
| 1.jpg | High-voltage infrastructure, insulators, forest | Service card: 10–145 kV |
| 2.jpg | Barn interior with electrical lighting | Service card: 0–0.4 kV / lantbruk |
| 3.jpg | Substation at sunset, dramatic | Hero (primary) |
| 4.jpg | Substation sunset, wider angle | Hero (alt) or Om oss |
| 20170503_160950618_iOS.jpg | Switchyard overview | About page photo grid |

## Form Submission Handling

Since Astro runs in static output mode on Azure, forms need a backend endpoint:

- **Recommended:** Azure Function (HTTP trigger) that receives form POST, validates fields, and sends email via SMTP or a transactional email service (e.g., Resend, Postmark, or Azure Communication Services).
- **Endpoint:** `/api/contact` (Azure Function route), `/api/apply` for spontanansokan with file upload.
- **Client-side:** Forms submit via `fetch()` with `FormData`. Show inline success message on 200, error message on failure. No page navigation.
- **Success state:** Green confirmation banner: "Tack! Vi återkommer inom kort."
- **Error state:** Red banner: "Något gick fel. Försök igen eller ring oss på [telefonnummer]."
- **Validation:** Client-side HTML5 validation + server-side validation in the Azure Function. GDPR checkbox must be checked before submit is enabled.
- **CV upload (spontanansokan):** Accept .pdf, .doc, .docx, max 10 MB. Azure Function stores in Azure Blob Storage and includes download link in the notification email.

## Out of Scope (Launch Tasks)

These items from the design brief are important but are not part of the website build:

- **Google Business Profile** setup (images, hours, service areas, reviews). Should launch in parallel with the site. NAP (Name/Address/Phone) must match between website and Business Profile.
- **Analytics setup** — depends on cookie consent implementation and choice of analytics platform.
- **Domain and SSL** — Azure configuration for custom domain and HTTPS.
