# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Molkom EL** website — a new web presence for a Swedish electrical contractor established in 1925, operating from Molkom/Karlstad but serving clients nationwide. The company currently has no online presence.

- **Framework**: Astro 6 (static output, SSG)
- **Hosting**: Azure (GitHub Actions CI/CD)
- **Node requirement**: >=22.12.0
- **Language**: All user-facing content is in Swedish

## Build & Dev Commands

```bash
npm run dev        # Astro dev server (localhost:4321)
npm run build      # Static build → dist/
npm run preview    # Preview built site
```

## Architecture

```
src/
├── assets/pics/          # Source images (optimized by Astro at build)
├── components/           # Reusable Astro components (scoped CSS)
│   ├── SEO/              # OpenGraph + SchemaMarkup (JSON-LD)
│   ├── Header.astro      # Fixed nav with frosted glass scroll effect
│   ├── Hero.astro        # Full-viewport or narrow hero (dark variant)
│   ├── ServiceCard.astro # Card with image or SVG icon fallback
│   ├── TrustBar.astro    # Credential chips strip
│   ├── ProcessSteps.astro# 4-step process diagram
│   ├── CTABlock.astro    # Dark pre-footer CTA band
│   ├── ContactForm.astro # Form with floating labels + GDPR consent
│   ├── Footer.astro      # 3-column footer
│   ├── CookieBanner.astro# GDPR cookie consent
│   ├── ROTPanel.astro    # ROT-avdrag info (lågspänning only)
│   └── EntrepreneurForm.astro # B2B qualified contact form
├── content/
│   └── services/         # Markdown content collection (5 services)
├── layouts/
│   └── BaseLayout.astro  # HTML shell, SEO, scroll-reveal observer
├── pages/
│   ├── index.astro       # Homepage (7 sections)
│   ├── om-oss.astro      # About page with animated figures
│   ├── kontakt.astro     # Contact page
│   ├── spontanansokan.astro
│   ├── integritetspolicy.astro
│   ├── one-page.astro    # Standalone scroll-snap one-pager
│   └── tjanster/
│       ├── index.astro   # Services overview page
│       └── [slug].astro  # Dynamic service detail pages
└── styles/
    └── global.css        # Design tokens, reset, utilities
```

## Content Collection

Services are defined in `src/content/services/*.md` with a Zod schema in `src/content.config.ts`. Key fields:

- `variant`: controls conditional sections (capabilities, courses, ROT panel)
- `icon`: emoji string mapped to SVG in ServiceCard
- `image`: optional filename referencing `src/assets/pics/`
- `order`: display sort order
- `segment`: 'private' | 'b2b' | 'both'

## Design System

**Palette A** (recommended in spec):
- Navy ink: `#0F2137` / `--color-ink`
- Signal red: `#C8102E` / `--color-red`
- White base with `#F5F7FA` surface
- All tokens defined as CSS custom properties in `global.css`

**Typography**: DM Serif Display (headings) + DM Sans (body) — same superfamily. Fluid `clamp()` scale from `--text-xs` to `--text-4xl`.

**Components use Astro scoped CSS** — styles are co-located in each `.astro` file. Global utilities (`.container`, `.section`, `.btn`, `.reveal`, `.eyebrow`) are in `global.css`.

## Design Specification

The primary document is [web-page.spec.md](web-page.spec.md), a comprehensive Swedish-language design brief covering:

- **Three customer segments**: Private/farming (0–0.4 kV), Industry/contracting, Power grid/electricity (10–145 kV)
- **MVP menu structure**: Start · Tjänster (dropdown) · Utbildningar · Maskinuthyrning · Om oss · Kontakt · Spontanansökan
- **7 page types** with defined CTAs, audiences, and trust signals

## Key Design Decisions

- **Hero-first layout** with dual CTAs ("Kontakta oss" primary + "Se tjänster" secondary)
- **Card-based service overview** (5 service cards below hero) — established Swedish electrician pattern
- **SVG icon fallback** for service cards without photos (emoji → SVG path mapping)
- **Dark hero variant** for service sub-pages (navy gradient + red accent line)
- **Frosted glass header** on scroll (`backdrop-filter: blur(12px)`)
- **Two contact flows**: simple form for private/small jobs, qualified form for B2B/contracting
- **Trust-first approach**: "Sedan 1925", Elsäkerhetsverket badge, ID06, certifications
- **Mobile-optimized**: sticky header, full-screen mobile menu, responsive grids
- **Scroll animations**: `.reveal` class with IntersectionObserver in BaseLayout
- **Accessibility**: WCAG SC 1.4.3 contrast, SC 2.4.7 focus visible

## Swedish Regulatory Compliance

- **Elsäkerhetsverket** registration badge required (link to "Kolla elföretaget")
- **ROT-avdrag**: 30% of labor cost, company deducts on invoice, materials/travel excluded
- **ID06** identification for construction sites (stricter requirements from early 2026)
- **GDPR**: consent checkbox on forms, privacy policy link, cookie banner
- **Konsumenttjänstlagen** applies for private customers

## Important Patterns

- **Active nav detection**: `isNavActive()` in Header.astro — parent items with children are only active when a child path matches; standalone items use prefix matching
- **Dark hero auto-detection**: Header script checks for `.hero--dark` on page load and toggles `header--over-dark` class for light nav text
- **Service card image mapping**: image filenames from content collection are mapped to imported Astro image assets via a `Record<string, ImageMetadata>` lookup
- **One-page variant**: `one-page.astro` is a standalone page with scroll-snap, dot navigation, and its own overlay styles (no shared header/footer)

## Change Principles

- Prefer the smallest possible change that solves the task cleanly.
- Reuse existing components, utilities, patterns, and content before introducing new code.
- Consolidate duplicated logic into existing shared code when it reduces repetition without expanding scope.
- Avoid whole-file rewrites when a targeted patch is sufficient.
- Keep diffs focused: do not mix unrelated refactors, formatting churn, or opportunistic cleanup into task-specific changes.
- Preserve established structure, naming, and styling patterns unless the task explicitly calls for a broader redesign.
