# Molkom EL Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the complete Molkom EL marketing website — 7 page types + one-scroll condensed page — as a static Astro site ready for Azure deployment.

**Architecture:** Astro 5 static site with content collections (Markdown + Zod schemas) for service pages. Shared component library renders both the multi-page site and the one-scroll condensed version. CSS custom properties design system, no framework. Forms submit to Azure Function endpoints via fetch().

**Tech Stack:** Astro 5.x, TypeScript, CSS custom properties, Google Fonts (DM Serif Display + DM Sans), @astrojs/sitemap

**Spec:** `docs/superpowers/specs/2026-03-20-molkom-el-website-design.md`

---

## Task 1: Project Scaffold & Design System

**Files:**
- Create: `package.json` (via `npm create astro`)
- Create: `astro.config.mjs`
- Create: `tsconfig.json` (Astro generates)
- Create: `src/styles/global.css`
- Create: `src/layouts/BaseLayout.astro`
- Create: `src/components/SEO/OpenGraph.astro`
- Create: `src/components/SEO/SchemaMarkup.astro`
- Move: `pics/*` → `src/assets/pics/*` (for Astro Image optimization)
- Keep: `public/` for favicon and robots.txt

This task sets up the project foundation: Astro config, design tokens, base layout with full SEO meta, and the image pipeline.

- [ ] **Step 1: Initialize Astro project**

Run from the repo root (`c:\git\molkom-el`). Use the empty template, TypeScript strict, and install dependencies:

```bash
npm create astro@latest . -- --template minimal --typescript strict --install --no-git
```

This scaffolds into the existing directory. Say yes to overwrite if prompted about existing files.

- [ ] **Step 2: Install sitemap integration**

```bash
npm install @astrojs/sitemap
```

- [ ] **Step 3: Configure astro.config.mjs**

Replace the generated config with:

```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://molkom-el.se', // placeholder — update before launch
  output: 'static',
  integrations: [sitemap()],
  image: {
    domains: [],
  },
  vite: {
    css: {
      preprocessorOptions: {},
    },
  },
});
```

- [ ] **Step 4: Move photos into src/assets for Astro Image**

```bash
mkdir -p src/assets/pics
cp pics/* src/assets/pics/
```

Keep `pics/` as the original archive. `src/assets/pics/` is what Astro optimizes.

- [ ] **Step 5: Create global.css with design tokens**

Create `src/styles/global.css`:

```css
/* ============================================
   MOLKOM EL — Design Tokens & Base Styles
   ============================================ */

/* --- Fonts --- */
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=DM+Serif+Display&display=swap');

/* --- Color Tokens --- */
:root {
  --color-ink: #0F2137;
  --color-ink-light: #2D3F54;
  --color-body: #5A6A7E;
  --color-muted: #8E99A8;
  --color-border: #E2E6EC;
  --color-surface: #F5F7FA;
  --color-white: #FFFFFF;
  --color-red: #C8102E;
  --color-red-hover: #A80D25;
  --color-red-light: #FEF2F2;

  /* --- Typography --- */
  --font-display: 'DM Serif Display', Georgia, serif;
  --font-body: 'DM Sans', system-ui, sans-serif;

  --text-xs: clamp(0.75rem, 0.7rem + 0.25vw, 0.8125rem);
  --text-sm: clamp(0.8125rem, 0.75rem + 0.3125vw, 0.9375rem);
  --text-base: clamp(1rem, 0.95rem + 0.25vw, 1.125rem);
  --text-lg: clamp(1.125rem, 1rem + 0.625vw, 1.375rem);
  --text-xl: clamp(1.25rem, 1.1rem + 0.75vw, 1.625rem);
  --text-2xl: clamp(1.5rem, 1.2rem + 1.5vw, 2.25rem);
  --text-3xl: clamp(1.875rem, 1.4rem + 2.375vw, 3rem);
  --text-4xl: clamp(2.25rem, 1.6rem + 3.25vw, 4rem);

  /* --- Spacing --- */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 1.5rem;
  --space-xl: 2rem;
  --space-2xl: 3rem;
  --space-3xl: 4rem;
  --space-4xl: 6rem;
  --space-section: clamp(4rem, 3rem + 5vw, 8rem);

  /* --- Layout --- */
  --max-width: 1200px;
  --max-width-narrow: 800px;
  --header-height: 4.5rem;

  /* --- Transitions --- */
  --transition-fast: 150ms ease;
  --transition-base: 250ms ease;
  --transition-slow: 400ms ease;

  /* --- Shadows --- */
  --shadow-sm: 0 1px 2px rgba(15, 33, 55, 0.05);
  --shadow-md: 0 4px 12px rgba(15, 33, 55, 0.08);
  --shadow-lg: 0 8px 24px rgba(15, 33, 55, 0.12);
  --shadow-xl: 0 12px 40px rgba(15, 33, 55, 0.16);
}

/* --- Reset & Base --- */
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
  -webkit-text-size-adjust: 100%;
}

body {
  font-family: var(--font-body);
  font-size: var(--text-base);
  line-height: 1.6;
  color: var(--color-body);
  background: var(--color-white);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

h1, h2, h3, h4 {
  font-family: var(--font-display);
  color: var(--color-ink);
  line-height: 1.2;
}

h1 { font-size: var(--text-4xl); }
h2 { font-size: var(--text-3xl); }
h3 { font-size: var(--text-2xl); }
h4 { font-size: var(--text-xl); }

a {
  color: var(--color-red);
  text-decoration: none;
  transition: color var(--transition-fast);
}

a:hover {
  color: var(--color-red-hover);
}

img {
  max-width: 100%;
  height: auto;
  display: block;
}

button {
  cursor: pointer;
  font-family: var(--font-body);
}

/* --- Utility Classes --- */
.container {
  width: 100%;
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 var(--space-lg);
}

.container--narrow {
  max-width: var(--max-width-narrow);
}

.section {
  padding: var(--space-section) 0;
}

.section--surface {
  background: var(--color-surface);
}

.section--dark {
  background: var(--color-ink);
  color: var(--color-white);
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

/* --- Button Styles --- */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-sm);
  padding: 0.75rem 1.75rem;
  font-size: var(--text-sm);
  font-weight: 600;
  letter-spacing: 0.01em;
  border-radius: 0.5rem;
  border: none;
  transition: all var(--transition-base);
  text-decoration: none;
}

.btn:hover {
  transform: translateY(-1px) scale(1.02);
}

.btn--primary {
  background: var(--color-red);
  color: var(--color-white);
}

.btn--primary:hover {
  background: var(--color-red-hover);
  color: var(--color-white);
  box-shadow: var(--shadow-md);
}

.btn--outline {
  background: transparent;
  border: 1.5px solid var(--color-ink);
  color: var(--color-ink);
}

.btn--outline:hover {
  background: var(--color-ink);
  color: var(--color-white);
}

.btn--white {
  background: var(--color-white);
  color: var(--color-ink);
}

.btn--white:hover {
  background: var(--color-surface);
  color: var(--color-ink);
  box-shadow: var(--shadow-md);
}

/* --- Scroll-triggered animation base --- */
.reveal {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity var(--transition-slow), transform var(--transition-slow);
}

.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

/* --- Eyebrow text --- */
.eyebrow {
  font-family: var(--font-body);
  font-size: var(--text-xs);
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--color-red);
}
```

- [ ] **Step 6: Create OpenGraph.astro component**

Create `src/components/SEO/OpenGraph.astro`:

```astro
---
interface Props {
  title: string;
  description: string;
  image?: string;
  url: string;
  type?: string;
}

const { title, description, image, url, type = 'website' } = Astro.props;
const siteName = 'Molkom EL';
---

<!-- Open Graph -->
<meta property="og:type" content={type} />
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:url" content={url} />
<meta property="og:site_name" content={siteName} />
{image && <meta property="og:image" content={image} />}

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={title} />
<meta name="twitter:description" content={description} />
{image && <meta name="twitter:image" content={image} />}
```

- [ ] **Step 7: Create SchemaMarkup.astro component**

Create `src/components/SEO/SchemaMarkup.astro`:

```astro
---
interface Props {
  type?: 'homepage' | 'service';
  serviceName?: string;
  serviceDescription?: string;
}

const { type = 'homepage', serviceName, serviceDescription } = Astro.props;

const businessSchema = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'Electrician'],
  name: 'Molkom EL',
  description: 'Elinstallationer från 0,4 till 145 kV — Molkom, Karlstad och hela Sverige. Sedan 1925.',
  foundingDate: '1925',
  url: 'https://molkom-el.se',
  telephone: '+46-XXX-XXXXXX',
  email: 'info@molkom-el.se',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Molkom',
    addressRegion: 'Värmland',
    addressCountry: 'SE',
  },
  areaServed: {
    '@type': 'Country',
    name: 'Sweden',
  },
  knowsAbout: [
    'Elinstallation',
    'Elkraft',
    'Högspänning',
    'Lågspänning',
    'Lantbruksel',
    'Entreprenad',
  ],
};

const serviceSchema = serviceName ? {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: serviceName,
  description: serviceDescription,
  provider: {
    '@type': 'LocalBusiness',
    name: 'Molkom EL',
  },
} : null;
---

{type === 'homepage' && (
  <script type="application/ld+json" set:html={JSON.stringify(businessSchema)} />
)}
{serviceSchema && (
  <script type="application/ld+json" set:html={JSON.stringify(serviceSchema)} />
)}
```

- [ ] **Step 8: Create BaseLayout.astro**

Create `src/layouts/BaseLayout.astro`:

```astro
---
import '../styles/global.css';
import OpenGraph from '../components/SEO/OpenGraph.astro';
import SchemaMarkup from '../components/SEO/SchemaMarkup.astro';

interface Props {
  title: string;
  description: string;
  ogImage?: string;
  schemaType?: 'homepage' | 'service';
  serviceName?: string;
  serviceDescription?: string;
}

const {
  title,
  description,
  ogImage,
  schemaType,
  serviceName,
  serviceDescription,
} = Astro.props;

const canonicalURL = new URL(Astro.url.pathname, Astro.site);
const fullTitle = title === 'Molkom EL' ? title : `${title} | Molkom EL`;
---

<!DOCTYPE html>
<html lang="sv">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{fullTitle}</title>
  <meta name="description" content={description} />
  <link rel="canonical" href={canonicalURL} />
  <meta name="robots" content="index, follow" />

  <OpenGraph
    title={fullTitle}
    description={description}
    image={ogImage}
    url={canonicalURL.toString()}
  />

  {schemaType && (
    <SchemaMarkup
      type={schemaType}
      serviceName={serviceName}
      serviceDescription={serviceDescription}
    />
  )}

  <!-- Preconnect for Google Fonts performance -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
</head>
<body>
  <slot />
</body>
</html>
```

- [ ] **Step 9: Create robots.txt**

Create `public/robots.txt`:

```
User-agent: *
Allow: /
Sitemap: https://molkom-el.se/sitemap-index.xml
```

- [ ] **Step 10: Verify build**

```bash
npm run build
```

Expected: Build succeeds with no errors. Output in `dist/`.

- [ ] **Step 11: Commit**

```bash
git add -A
git commit -m "feat: scaffold Astro project with design system, base layout, and SEO"
```

---

## Task 2: Header & Footer

**Files:**
- Create: `src/components/Header.astro`
- Create: `src/components/Footer.astro`
- Modify: `src/layouts/BaseLayout.astro` (add Header + Footer)

These are the structural frame — every page uses them.

- [ ] **Step 1: Create Header.astro**

Create `src/components/Header.astro`:

```astro
---
interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

const navItems: NavItem[] = [
  {
    label: 'Tjänster',
    href: '/tjanster',
    children: [
      { label: '0–0,4 kV', href: '/tjanster/lagspanning' },
      { label: '10–145 kV', href: '/tjanster/elkraft' },
      { label: 'Entreprenad & personal', href: '/tjanster/entreprenad' },
    ],
  },
  { label: 'Utbildningar', href: '/tjanster/utbildningar' },
  { label: 'Maskinuthyrning', href: '/tjanster/maskinuthyrning' },
  { label: 'Om oss', href: '/om-oss' },
  { label: 'Kontakt', href: '/kontakt' },
  { label: 'Spontanansökan', href: '/spontanansokan' },
];

const currentPath = Astro.url.pathname;
---

<header class="header" id="site-header">
  <div class="header__inner container">
    <!-- Logo -->
    <a href="/" class="header__logo" aria-label="Molkom EL – Startsida">
      <span class="header__logo-mark">ME</span>
      <span class="header__logo-text">Molkom EL</span>
    </a>

    <!-- Desktop Nav -->
    <nav class="header__nav" aria-label="Huvudnavigering">
      <ul class="header__nav-list">
        {navItems.map((item) => (
          <li class={`header__nav-item ${item.children ? 'has-dropdown' : ''}`}>
            <a
              href={item.href}
              class={`header__nav-link ${currentPath.startsWith(item.href) ? 'active' : ''}`}
            >
              {item.label}
              {item.children && (
                <svg class="header__chevron" width="10" height="6" viewBox="0 0 10 6" fill="none">
                  <path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
              )}
            </a>
            {item.children && (
              <ul class="header__dropdown">
                {item.children.map((child) => (
                  <li>
                    <a href={child.href} class="header__dropdown-link">
                      {child.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>

    <!-- Phone + CTA -->
    <div class="header__actions">
      <a href="tel:+46XXXXXXXXX" class="header__phone">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M14.5 11.5v2a1.33 1.33 0 01-1.45 1.33 13.2 13.2 0 01-5.76-2.05 13 13 0 01-4-4A13.2 13.2 0 011.24 3 1.33 1.33 0 012.56 1.5h2A1.33 1.33 0 015.9 2.65a8.56 8.56 0 00.47 1.87 1.33 1.33 0 01-.3 1.41l-.85.85a10.67 10.67 0 004 4l.85-.85a1.33 1.33 0 011.41-.3 8.56 8.56 0 001.87.47 1.33 1.33 0 011.15 1.4z" stroke="currentColor" stroke-width="1.2"/>
        </svg>
        <span>Ring oss</span>
      </a>
      <a href="/kontakt" class="btn btn--primary header__cta">Kontakta oss</a>
    </div>

    <!-- Mobile hamburger -->
    <button class="header__hamburger" aria-label="Öppna meny" aria-expanded="false" id="menu-toggle">
      <span></span>
      <span></span>
      <span></span>
    </button>
  </div>

  <!-- Mobile overlay -->
  <div class="header__mobile-overlay" id="mobile-menu">
    <nav aria-label="Mobilnavigering">
      <ul class="header__mobile-list">
        {navItems.map((item) => (
          <li>
            <a href={item.href} class="header__mobile-link">{item.label}</a>
            {item.children && (
              <ul class="header__mobile-sub">
                {item.children.map((child) => (
                  <li><a href={child.href}>{child.label}</a></li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
      <div class="header__mobile-actions">
        <a href="tel:+46XXXXXXXXX" class="btn btn--outline" style="width:100%">Ring oss</a>
        <a href="/kontakt" class="btn btn--primary" style="width:100%">Kontakta oss</a>
      </div>
    </nav>
  </div>
</header>

<style>
  .header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    height: var(--header-height);
    transition: background var(--transition-base), box-shadow var(--transition-base);
  }

  .header.scrolled {
    background: var(--color-white);
    box-shadow: var(--shadow-md);
  }

  .header__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
  }

  .header__logo {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    text-decoration: none;
    color: var(--color-ink);
    z-index: 101;
  }

  .header__logo-mark {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    background: var(--color-red);
    color: var(--color-white);
    font-weight: 700;
    font-size: 14px;
    border-radius: 8px;
  }

  .header__logo-text {
    font-family: var(--font-display);
    font-size: 1.2rem;
    color: var(--color-ink);
  }

  /* Nav */
  .header__nav-list {
    display: flex;
    gap: 0.25rem;
    list-style: none;
  }

  .header__nav-link {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    padding: 0.5rem 0.75rem;
    font-size: var(--text-sm);
    font-weight: 500;
    color: var(--color-ink-light);
    text-decoration: none;
    border-radius: 0.375rem;
    transition: color var(--transition-fast), background var(--transition-fast);
    position: relative;
  }

  .header__nav-link::after {
    content: '';
    position: absolute;
    bottom: 0.25rem;
    left: 0.75rem;
    right: 0.75rem;
    height: 2px;
    background: var(--color-red);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform var(--transition-base);
  }

  .header__nav-link:hover::after,
  .header__nav-link.active::after {
    transform: scaleX(1);
  }

  .header__nav-link:hover {
    color: var(--color-ink);
  }

  .header__chevron {
    transition: transform var(--transition-fast);
  }

  /* Dropdown */
  .has-dropdown {
    position: relative;
  }

  .header__dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    min-width: 200px;
    background: var(--color-white);
    border: 1px solid var(--color-border);
    border-radius: 0.5rem;
    box-shadow: var(--shadow-lg);
    list-style: none;
    padding: 0.5rem 0;
    opacity: 0;
    visibility: hidden;
    transform: translateY(4px);
    transition: all var(--transition-fast);
  }

  .has-dropdown:hover .header__dropdown {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }

  .has-dropdown:hover .header__chevron {
    transform: rotate(180deg);
  }

  .header__dropdown-link {
    display: block;
    padding: 0.5rem 1rem;
    font-size: var(--text-sm);
    color: var(--color-body);
    text-decoration: none;
    transition: background var(--transition-fast), color var(--transition-fast);
  }

  .header__dropdown-link:hover {
    background: var(--color-surface);
    color: var(--color-ink);
  }

  /* Actions */
  .header__actions {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .header__phone {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    font-size: var(--text-sm);
    font-weight: 500;
    color: var(--color-ink-light);
    text-decoration: none;
    transition: color var(--transition-fast);
  }

  .header__phone:hover {
    color: var(--color-red);
  }

  .header__cta {
    padding: 0.5rem 1.25rem;
    font-size: var(--text-xs);
  }

  /* Hamburger */
  .header__hamburger {
    display: none;
    flex-direction: column;
    gap: 5px;
    background: none;
    border: none;
    padding: 0.5rem;
    z-index: 101;
  }

  .header__hamburger span {
    display: block;
    width: 22px;
    height: 2px;
    background: var(--color-ink);
    transition: all var(--transition-base);
    border-radius: 1px;
  }

  .header__hamburger.open span:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
  }
  .header__hamburger.open span:nth-child(2) {
    opacity: 0;
  }
  .header__hamburger.open span:nth-child(3) {
    transform: rotate(-45deg) translate(5px, -5px);
  }

  /* Mobile overlay */
  .header__mobile-overlay {
    position: fixed;
    inset: 0;
    background: var(--color-white);
    z-index: 99;
    padding: calc(var(--header-height) + 2rem) var(--space-lg) var(--space-lg);
    opacity: 0;
    visibility: hidden;
    transition: opacity var(--transition-base), visibility var(--transition-base);
  }

  .header__mobile-overlay.open {
    opacity: 1;
    visibility: visible;
  }

  .header__mobile-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .header__mobile-link {
    display: block;
    padding: 0.75rem 0;
    font-size: var(--text-lg);
    font-weight: 600;
    color: var(--color-ink);
    text-decoration: none;
    border-bottom: 1px solid var(--color-border);
  }

  .header__mobile-sub {
    list-style: none;
    padding-left: 1rem;
  }

  .header__mobile-sub a {
    display: block;
    padding: 0.5rem 0;
    font-size: var(--text-base);
    color: var(--color-body);
    text-decoration: none;
  }

  .header__mobile-actions {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin-top: 2rem;
  }

  /* Responsive */
  @media (max-width: 768px) {
    .header__nav,
    .header__actions {
      display: none;
    }
    .header__hamburger {
      display: flex;
    }
  }
</style>

<script>
  // Scroll detection for header background
  const header = document.getElementById('site-header');
  if (header) {
    const observer = new IntersectionObserver(
      ([entry]) => {
        header.classList.toggle('scrolled', !entry.isIntersecting);
      },
      { threshold: 0, rootMargin: '-1px 0px 0px 0px' }
    );
    // Create a sentinel element at the top of the page
    const sentinel = document.createElement('div');
    sentinel.style.position = 'absolute';
    sentinel.style.top = '0';
    sentinel.style.height = '1px';
    sentinel.style.width = '100%';
    document.body.prepend(sentinel);
    observer.observe(sentinel);
  }

  // Mobile menu toggle
  const toggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  if (toggle && mobileMenu) {
    toggle.addEventListener('click', () => {
      const isOpen = toggle.classList.toggle('open');
      mobileMenu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
  }
</script>
```

- [ ] **Step 2: Create Footer.astro**

Create `src/components/Footer.astro`:

```astro
---
const currentYear = new Date().getFullYear();

const quickLinks = [
  { label: 'Tjänster', href: '/tjanster/lagspanning' },
  { label: 'Utbildningar', href: '/tjanster/utbildningar' },
  { label: 'Maskinuthyrning', href: '/tjanster/maskinuthyrning' },
  { label: 'Om oss', href: '/om-oss' },
  { label: 'Kontakt', href: '/kontakt' },
  { label: 'Spontanansökan', href: '/spontanansokan' },
];

const trustBadges = [
  'Registrerad hos Elsäkerhetsverket',
  'ID06',
  'Sedan 1925',
];
---

<footer class="footer">
  <div class="container">
    <div class="footer__grid">
      <!-- Contact -->
      <div class="footer__col">
        <div class="footer__logo">
          <span class="footer__logo-mark">ME</span>
          <span class="footer__logo-text">Molkom EL</span>
        </div>
        <p class="footer__tagline">Elinstallationer sedan 1925</p>
        <div class="footer__contact-list">
          <a href="tel:+46XXXXXXXXX" class="footer__contact-link">+46 XXX-XXX XX XX</a>
          <a href="mailto:info@molkom-el.se" class="footer__contact-link">info@molkom-el.se</a>
          <span class="footer__contact-link">Molkom / Karlstad</span>
          <span class="footer__contact-link footer__org">Org.nr: XXX XXX-XXXX</span>
        </div>
      </div>

      <!-- Quick links -->
      <div class="footer__col">
        <h4 class="footer__heading">Sidor</h4>
        <ul class="footer__links">
          {quickLinks.map((link) => (
            <li><a href={link.href}>{link.label}</a></li>
          ))}
        </ul>
      </div>

      <!-- Trust & legal -->
      <div class="footer__col">
        <h4 class="footer__heading">Trygghet</h4>
        <ul class="footer__badges">
          {trustBadges.map((badge) => (
            <li class="footer__badge">{badge}</li>
          ))}
        </ul>
        <a
          href="https://www.elsakerhetsverket.se/kollaelforetaget"
          target="_blank"
          rel="noopener noreferrer"
          class="footer__esv-link"
        >
          Kolla elföretaget →
        </a>
      </div>
    </div>

    <!-- Bottom bar -->
    <div class="footer__bottom">
      <span>© {currentYear} Molkom EL. Alla rättigheter förbehållna.</span>
      <a href="/integritetspolicy">Integritetspolicy</a>
    </div>
  </div>
</footer>

<style>
  .footer {
    background: var(--color-ink);
    color: rgba(255, 255, 255, 0.7);
    padding: var(--space-4xl) 0 0;
  }

  .footer__grid {
    display: grid;
    grid-template-columns: 1.5fr 1fr 1fr;
    gap: var(--space-3xl);
  }

  .footer__logo {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    margin-bottom: var(--space-sm);
  }

  .footer__logo-mark {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    background: var(--color-red);
    color: var(--color-white);
    font-weight: 700;
    font-size: 13px;
    border-radius: 6px;
  }

  .footer__logo-text {
    font-family: var(--font-display);
    font-size: 1.1rem;
    color: var(--color-white);
  }

  .footer__tagline {
    font-size: var(--text-sm);
    margin-bottom: var(--space-lg);
  }

  .footer__contact-list {
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
  }

  .footer__contact-link {
    font-size: var(--text-sm);
    color: rgba(255, 255, 255, 0.7);
    text-decoration: none;
    transition: color var(--transition-fast);
  }

  .footer__contact-link:hover {
    color: var(--color-white);
  }

  .footer__heading {
    font-family: var(--font-body);
    font-size: var(--text-sm);
    font-weight: 600;
    color: var(--color-white);
    letter-spacing: 0.05em;
    text-transform: uppercase;
    margin-bottom: var(--space-md);
  }

  .footer__links {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
  }

  .footer__links a {
    font-size: var(--text-sm);
    color: rgba(255, 255, 255, 0.7);
    text-decoration: none;
    transition: color var(--transition-fast);
  }

  .footer__links a:hover {
    color: var(--color-white);
  }

  .footer__badges {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
  }

  .footer__badge {
    font-size: var(--text-sm);
    padding: 0.3rem 0.6rem;
    background: rgba(255, 255, 255, 0.06);
    border-radius: 0.25rem;
    display: inline-block;
    width: fit-content;
  }

  .footer__esv-link {
    display: inline-block;
    margin-top: var(--space-md);
    font-size: var(--text-sm);
    color: var(--color-red);
    text-decoration: none;
    font-weight: 500;
  }

  .footer__esv-link:hover {
    color: #e8384f;
  }

  .footer__bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--space-lg) 0;
    margin-top: var(--space-3xl);
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    font-size: var(--text-xs);
  }

  .footer__bottom a {
    color: rgba(255, 255, 255, 0.5);
    text-decoration: none;
  }

  .footer__bottom a:hover {
    color: var(--color-white);
  }

  @media (max-width: 768px) {
    .footer__grid {
      grid-template-columns: 1fr;
      gap: var(--space-2xl);
    }
    .footer__bottom {
      flex-direction: column;
      gap: var(--space-sm);
      text-align: center;
    }
  }
</style>
```

- [ ] **Step 3: Wire Header + Footer into BaseLayout**

Modify `src/layouts/BaseLayout.astro` — add imports and render them around the `<slot />`:

Add at the top of the frontmatter (after existing imports):
```astro
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
```

Replace the `<body>` content:
```html
<body>
  <Header />
  <main>
    <slot />
  </main>
  <Footer />

  <!-- Global scroll reveal observer — runs on every page -->
  <script>
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    reveals.forEach((el) => observer.observe(el));
  </script>
</body>
```

- [ ] **Step 4: Create a minimal index.astro to verify**

Create `src/pages/index.astro`:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout
  title="Molkom EL"
  description="Elinstallationer från 0,4 till 145 kV — Molkom, Karlstad och hela Sverige. Sedan 1925."
  schemaType="homepage"
>
  <section style="padding-top: calc(var(--header-height) + 4rem); min-height: 80vh;">
    <div class="container">
      <h1>Molkom EL — Under uppbyggnad</h1>
      <p>Placeholder for homepage content.</p>
    </div>
  </section>
</BaseLayout>
```

- [ ] **Step 5: Verify build and dev server**

```bash
npm run build && npm run preview
```

Expected: Build succeeds. Preview shows page with sticky header and dark footer.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: add Header and Footer components with mobile nav"
```

---

## Task 3: Hero Component

**Files:**
- Create: `src/components/Hero.astro`

The Hero has two variants: full-bleed (homepage) with photo background, and narrow (service pages) with optional photo.

- [ ] **Step 1: Create Hero.astro**

Create `src/components/Hero.astro`:

```astro
---
import { Image } from 'astro:assets';

interface Props {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  primaryCTA?: { label: string; href: string };
  secondaryCTA?: { label: string; href: string };
  image?: ImageMetadata;
  variant?: 'full' | 'narrow';
}

const {
  eyebrow,
  title,
  subtitle,
  primaryCTA,
  secondaryCTA,
  image,
  variant = 'full',
} = Astro.props;
---

<section class={`hero hero--${variant}`}>
  {image && (
    <div class="hero__bg">
      <Image
        src={image}
        alt=""
        widths={[640, 1024, 1440, 1920]}
        sizes="100vw"
        loading="eager"
        class="hero__bg-img"
      />
      <div class="hero__overlay" />
    </div>
  )}

  <div class="hero__content container">
    {eyebrow && <span class="eyebrow hero__eyebrow">{eyebrow}</span>}
    <h1 class="hero__title">{title}</h1>
    {subtitle && <p class="hero__subtitle">{subtitle}</p>}

    {(primaryCTA || secondaryCTA) && (
      <div class="hero__actions">
        {primaryCTA && (
          <a href={primaryCTA.href} class="btn btn--primary">{primaryCTA.label}</a>
        )}
        {secondaryCTA && (
          <a href={secondaryCTA.href} class="btn btn--outline">{secondaryCTA.label}</a>
        )}
      </div>
    )}
  </div>

  {variant === 'full' && (
    <div class="hero__scroll-indicator" aria-hidden="true">
      <svg width="20" height="28" viewBox="0 0 20 28" fill="none">
        <rect x="1" y="1" width="18" height="26" rx="9" stroke="currentColor" stroke-width="1.5"/>
        <circle class="hero__scroll-dot" cx="10" cy="8" r="2.5" fill="currentColor"/>
      </svg>
    </div>
  )}
</section>

<style>
  .hero {
    position: relative;
    display: flex;
    align-items: center;
    overflow: hidden;
  }

  .hero--full {
    min-height: 100vh;
    min-height: 100dvh;
    padding-top: var(--header-height);
  }

  .hero--narrow {
    min-height: 40vh;
    padding-top: calc(var(--header-height) + var(--space-3xl));
    padding-bottom: var(--space-3xl);
    background: var(--color-surface);
  }

  /* Background image */
  .hero__bg {
    position: absolute;
    inset: 0;
  }

  .hero__bg-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .hero__overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0.95) 0%,
      rgba(255, 255, 255, 0.85) 30%,
      rgba(255, 255, 255, 0.4) 55%,
      rgba(255, 255, 255, 0) 75%
    );
  }

  /* Content */
  .hero__content {
    position: relative;
    z-index: 1;
    max-width: 650px;
    padding-top: var(--space-3xl);
    padding-bottom: var(--space-3xl);
  }

  .hero__eyebrow {
    display: block;
    margin-bottom: var(--space-md);
    animation: fadeUp 0.6s ease both;
  }

  .hero__title {
    font-size: var(--text-4xl);
    margin-bottom: var(--space-md);
    animation: fadeUp 0.6s ease 0.1s both;
  }

  .hero__subtitle {
    font-size: var(--text-lg);
    color: var(--color-body);
    max-width: 500px;
    margin-bottom: var(--space-xl);
    animation: fadeUp 0.6s ease 0.2s both;
  }

  .hero--narrow .hero__subtitle {
    color: var(--color-body);
  }

  .hero__actions {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-md);
    animation: fadeUp 0.6s ease 0.3s both;
  }

  /* Scroll indicator */
  .hero__scroll-indicator {
    position: absolute;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    color: var(--color-muted);
    animation: fadeUp 0.6s ease 0.5s both;
  }

  .hero__scroll-dot {
    animation: scrollBounce 2s ease-in-out infinite;
  }

  @keyframes fadeUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes scrollBounce {
    0%, 100% { cy: 8; opacity: 1; }
    50% { cy: 18; opacity: 0.3; }
  }

  @media (max-width: 768px) {
    .hero--full {
      min-height: 90vh;
    }
    .hero__overlay {
      background: linear-gradient(
        to bottom,
        rgba(255, 255, 255, 0.95) 0%,
        rgba(255, 255, 255, 0.8) 50%,
        rgba(255, 255, 255, 0.3) 100%
      );
    }
    .hero__actions {
      flex-direction: column;
    }
    .hero__actions .btn {
      width: 100%;
      text-align: center;
    }
  }
</style>
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add src/components/Hero.astro
git commit -m "feat: add Hero component with full-bleed and narrow variants"
```

---

## Task 4: Homepage Section Components

**Files:**
- Create: `src/components/ServiceCard.astro`
- Create: `src/components/TrustBar.astro`
- Create: `src/components/ProcessSteps.astro`
- Create: `src/components/CTABlock.astro`

- [ ] **Step 1: Create ServiceCard.astro**

Create `src/components/ServiceCard.astro`:

```astro
---
import { Image } from 'astro:assets';

interface Props {
  title: string;
  description: string;
  href: string;
  image?: ImageMetadata;
  icon?: string;
}

const { title, description, href, image, icon } = Astro.props;
---

<a href={href} class="service-card reveal">
  <div class="service-card__image">
    {image ? (
      <Image
        src={image}
        alt={title}
        widths={[320, 480]}
        sizes="(max-width: 768px) 100vw, 33vw"
        class="service-card__img"
      />
    ) : (
      <div class="service-card__icon-fallback">
        <span class="service-card__icon">{icon || '⚡'}</span>
      </div>
    )}
  </div>
  <div class="service-card__body">
    <h3 class="service-card__title">{title}</h3>
    <p class="service-card__desc">{description}</p>
    <span class="service-card__link">Läs mer →</span>
  </div>
</a>

<style>
  .service-card {
    display: flex;
    flex-direction: column;
    background: var(--color-white);
    border: 1px solid var(--color-border);
    border-radius: 0.75rem;
    overflow: hidden;
    text-decoration: none;
    color: inherit;
    transition: transform var(--transition-base), box-shadow var(--transition-base), border-color var(--transition-base);
    position: relative;
  }

  .service-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: var(--color-red);
    transform: scaleX(0);
    transition: transform var(--transition-base);
  }

  .service-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
    border-color: transparent;
  }

  .service-card:hover::before {
    transform: scaleX(1);
  }

  .service-card__image {
    aspect-ratio: 16/10;
    overflow: hidden;
  }

  .service-card__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: saturate(0.7);
    transition: filter var(--transition-slow), transform var(--transition-slow);
  }

  .service-card:hover .service-card__img {
    filter: saturate(1);
    transform: scale(1.03);
  }

  .service-card__icon-fallback {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--color-surface);
  }

  .service-card__icon {
    font-size: 2.5rem;
  }

  .service-card__body {
    padding: var(--space-lg);
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .service-card__title {
    font-size: var(--text-xl);
    margin-bottom: var(--space-sm);
  }

  .service-card__desc {
    font-size: var(--text-sm);
    color: var(--color-body);
    flex: 1;
  }

  .service-card__link {
    display: inline-block;
    margin-top: var(--space-md);
    font-size: var(--text-sm);
    font-weight: 600;
    color: var(--color-red);
    transition: gap var(--transition-fast);
  }
</style>
```

- [ ] **Step 2: Create TrustBar.astro**

Create `src/components/TrustBar.astro`:

```astro
---
interface TrustItem {
  label: string;
  featured?: boolean;
}

const items: TrustItem[] = [
  { label: 'Sedan 1925', featured: true },
  { label: 'Registrerad hos Elsäkerhetsverket' },
  { label: 'ID06' },
  { label: 'Rikstäckande' },
  { label: 'Dokumentation' },
  { label: 'Utbildad personal' },
];
---

<section class="trust-bar section">
  <div class="container">
    <div class="trust-bar__list">
      {items.map((item) => (
        <div class={`trust-bar__chip reveal ${item.featured ? 'trust-bar__chip--featured' : ''}`}>
          {item.label}
        </div>
      ))}
    </div>
  </div>
</section>

<style>
  .trust-bar__list {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-sm);
    justify-content: center;
  }

  .trust-bar__chip {
    display: inline-flex;
    align-items: center;
    padding: 0.6rem 1.2rem;
    font-size: var(--text-sm);
    font-weight: 500;
    color: var(--color-ink-light);
    background: var(--color-white);
    border: 1px solid var(--color-border);
    border-radius: 2rem;
    box-shadow: inset 0 1px 2px rgba(15, 33, 55, 0.04);
    white-space: nowrap;
  }

  .trust-bar__chip--featured {
    background: var(--color-red-light);
    color: var(--color-red);
    border-color: transparent;
    font-weight: 600;
    font-size: var(--text-base);
    padding: 0.7rem 1.5rem;
  }

  @media (max-width: 768px) {
    .trust-bar__list {
      flex-wrap: nowrap;
      overflow-x: auto;
      justify-content: flex-start;
      padding-bottom: var(--space-sm);
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none;
    }
    .trust-bar__list::-webkit-scrollbar {
      display: none;
    }
  }
</style>
```

- [ ] **Step 3: Create ProcessSteps.astro**

Create `src/components/ProcessSteps.astro`:

```astro
---
interface Step {
  number: string;
  title: string;
  description: string;
}

const steps: Step[] = [
  { number: '01', title: 'Kontakt', description: 'Ring eller skicka en förfrågan — vi återkommer snabbt.' },
  { number: '02', title: 'Förslag & plan', description: 'Vi tar fram en lösning och offert anpassad för ert behov.' },
  { number: '03', title: 'Utförande', description: 'Arbetet genomförs med säkerhet och kvalitet i fokus.' },
  { number: '04', title: 'Dokumentation', description: 'Ni får full dokumentation och uppföljning efter avslutat arbete.' },
];
---

<section class="process section section--surface">
  <div class="container">
    <h2 class="process__heading reveal">Så går det till</h2>
    <div class="process__grid">
      {steps.map((step, i) => (
        <div class="process__step reveal" style={`animation-delay: ${i * 0.1}s`}>
          <span class="process__number">{step.number}</span>
          <div class="process__line" aria-hidden="true" />
          <h3 class="process__title">{step.title}</h3>
          <p class="process__desc">{step.description}</p>
        </div>
      ))}
    </div>
  </div>
</section>

<style>
  .process__heading {
    text-align: center;
    margin-bottom: var(--space-3xl);
  }

  .process__grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--space-xl);
    position: relative;
  }

  .process__step {
    text-align: center;
    position: relative;
  }

  .process__number {
    display: block;
    font-family: var(--font-display);
    font-size: var(--text-3xl);
    color: var(--color-red);
    margin-bottom: var(--space-md);
  }

  .process__line {
    position: absolute;
    top: 1.8rem;
    left: 60%;
    width: calc(100% - 20%);
    height: 1px;
    background: var(--color-border);
  }

  .process__step:last-child .process__line {
    display: none;
  }

  .process__title {
    font-family: var(--font-body);
    font-size: var(--text-lg);
    font-weight: 600;
    margin-bottom: var(--space-sm);
  }

  .process__desc {
    font-size: var(--text-sm);
    color: var(--color-body);
    max-width: 220px;
    margin: 0 auto;
  }

  @media (max-width: 768px) {
    .process__grid {
      grid-template-columns: 1fr;
      gap: var(--space-2xl);
    }
    .process__line {
      display: none;
    }
    .process__step {
      display: grid;
      grid-template-columns: auto 1fr;
      grid-template-rows: auto auto;
      column-gap: var(--space-lg);
      text-align: left;
    }
    .process__number {
      grid-row: 1 / -1;
      align-self: center;
    }
    .process__desc {
      max-width: none;
    }
  }
</style>
```

- [ ] **Step 4: Create CTABlock.astro**

Create `src/components/CTABlock.astro`:

```astro
---
interface Props {
  title: string;
  text?: string;
  primaryCTA: { label: string; href: string };
  secondaryCTA?: { label: string; href: string };
}

const { title, text, primaryCTA, secondaryCTA } = Astro.props;
---

<section class="cta-block section--dark">
  <div class="container" style="text-align: center; padding: var(--space-4xl) 0;">
    <h2 class="cta-block__title">{title}</h2>
    {text && <p class="cta-block__text">{text}</p>}
    <div class="cta-block__actions">
      <a href={primaryCTA.href} class="btn btn--white">{primaryCTA.label}</a>
      {secondaryCTA && (
        <a href={secondaryCTA.href} class="btn" style="border: 1.5px solid rgba(255,255,255,0.3); color: white;">
          {secondaryCTA.label}
        </a>
      )}
    </div>
  </div>
</section>

<style>
  .cta-block__title {
    color: var(--color-white);
    margin-bottom: var(--space-md);
  }

  .cta-block__text {
    font-size: var(--text-lg);
    color: rgba(255, 255, 255, 0.7);
    max-width: 500px;
    margin: 0 auto var(--space-xl);
  }

  .cta-block__actions {
    display: flex;
    gap: var(--space-md);
    justify-content: center;
    flex-wrap: wrap;
  }
</style>
```

- [ ] **Step 5: Verify build**

```bash
npm run build
```

- [ ] **Step 6: Commit**

```bash
git add src/components/ServiceCard.astro src/components/TrustBar.astro src/components/ProcessSteps.astro src/components/CTABlock.astro
git commit -m "feat: add ServiceCard, TrustBar, ProcessSteps, and CTABlock components"
```

---

## Task 5: Content Collections

**Files:**
- Create: `src/content.config.ts`
- Create: `src/content/services/lagspanning.md`
- Create: `src/content/services/elkraft.md`
- Create: `src/content/services/entreprenad.md`
- Create: `src/content/services/utbildningar.md`
- Create: `src/content/services/maskinuthyrning.md`

- [ ] **Step 1: Create content.config.ts with Zod schema**

Create `src/content.config.ts`:

```typescript
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
  schema: z.object({
    title: z.string(),
    shortTitle: z.string(),
    description: z.string(),
    metaDescription: z.string(),
    icon: z.string(),
    image: z.string().optional(),
    order: z.number(),
    segment: z.enum(['private', 'b2b', 'both']),
    tags: z.array(z.string()),
    variant: z.enum(['default', 'lagspanning', 'elkraft', 'entreprenad', 'utbildningar', 'maskinuthyrning']),
    ctaLabel: z.string(),
    ctaHref: z.string(),
    secondaryCTA: z.object({
      label: z.string(),
      href: z.string(),
    }).optional(),
    capabilities: z.array(z.object({
      label: z.string(),
      value: z.string(),
    })).optional(),
    courses: z.array(z.object({
      name: z.string(),
      duration: z.string(),
      language: z.string(),
    })).optional(),
    equipment: z.array(z.object({
      name: z.string(),
      description: z.string(),
    })).optional(),
  }),
});

export const collections = { services };
```

- [ ] **Step 2: Create lagspanning.md**

Create `src/content/services/lagspanning.md`:

```markdown
---
title: "Elinstallation 0–0,4 kV"
shortTitle: "0–0,4 kV"
description: "El för hem, lantbruk och mindre verksamheter"
metaDescription: "Elinstallationer för privatpersoner och lantbruk. 0–0,4 kV. Registrerad hos Elsäkerhetsverket. ROT-avdrag. Molkom & Karlstad."
icon: "⚡"
image: "2.jpg"
order: 1
segment: "private"
tags: ["Privat", "Lantbruk"]
variant: "lagspanning"
ctaLabel: "Få offert"
ctaHref: "/kontakt"
---

## Det här hjälper vi med

- Nyinstallation och ominstallation i bostäder
- Elcentral och gruppledningar
- Belysning inomhus och utomhus
- Laddbox för elbil
- Lantbruksel — ladugårdar, stallar, ekonomibyggnader
- Solcellsinstallationer (nätanslutning)
- Felsökning och akuta elarbeten
- Dokumentation och besiktningsunderlag

Vi arbetar i Molkom, Karlstad och hela Värmland — och tar jobb i övriga Sverige vid behov.
```

- [ ] **Step 3: Create elkraft.md**

Create `src/content/services/elkraft.md`:

```markdown
---
title: "Elkraft & högspänning 10–145 kV"
shortTitle: "10–145 kV"
description: "Elkraft, nätstation och kraftstationer"
metaDescription: "Elkraft och högspänningsarbeten 10–145 kV. Nätstation, transformator, kraftstation. Rikstäckande. Molkom EL sedan 1925."
icon: "🔌"
image: "1.jpg"
order: 2
segment: "b2b"
tags: ["Elnät", "Elkraft", "Industri"]
variant: "elkraft"
ctaLabel: "Entreprenadförfrågan"
ctaHref: "/kontakt?type=b2b"
capabilities:
  - label: "Spänningsnivåer"
    value: "10–145 kV"
  - label: "Leveransmodell"
    value: "Totalentreprenad, underentreprenad, bemanning"
  - label: "Projektledning"
    value: "Egen projektledning med dokumentation"
  - label: "Geografi"
    value: "Rikstäckande"
  - label: "Certifieringar"
    value: "Registrerad hos Elsäkerhetsverket, ID06"
---

## Det här hjälper vi med

- Nätstationer och transformatorstationer
- Kraftstationer upp till 145 kV
- Kabelförläggning och kabelmontage
- Ställverksmontage
- Kontroll, provning och driftsättning
- Underhåll och service av befintliga anläggningar
- Projektledning och dokumentation
- Bemanning av elkraftspersonal
```

- [ ] **Step 4: Create entreprenad.md**

Create `src/content/services/entreprenad.md`:

```markdown
---
title: "Entreprenad & personal"
shortTitle: "Entreprenad"
description: "Elentreprenad och inhyrning av elkraftspersonal"
metaDescription: "Elentreprenad och personaluthyrning. Erfarna elektriker och montörer. ID06. Rikstäckande. Molkom EL sedan 1925."
icon: "👷"
order: 3
segment: "b2b"
tags: ["Företag", "Entreprenad"]
variant: "entreprenad"
ctaLabel: "Entreprenadförfrågan"
ctaHref: "/kontakt?type=b2b"
---

## Det här hjälper vi med

- Elentreprenad i alla storlekar
- Uthyrning av elektriker och elkraftsmontörer
- Projektanpassade team med egen arbetsledning
- Montage på industrianläggningar
- Support vid revisionsavställningar
- Dokumentation och slutbesiktning

## Resurser och arbetssätt

Vi erbjuder:

- **On-site team** — Våra montörer arbetar på plats med egen arbetsledning
- **Projektbaserad leverans** — Totalentreprenad eller underentreprenad
- **Säkerhet och ID06** — All personal har giltiga ID06-kort och relevanta utbildningar
- **Flexibel bemanning** — Vi skalar upp eller ned efter ert behov
```

- [ ] **Step 5: Create utbildningar.md**

Create `src/content/services/utbildningar.md`:

```markdown
---
title: "Utbildningar"
shortTitle: "Utbildningar"
description: "Kurser och certifieringar inom el och elsäkerhet"
metaDescription: "Elutbildningar och kurser. ESA, elsäkerhet, högspänning. Svenska och engelska. Molkom EL sedan 1925."
icon: "🎓"
order: 4
segment: "b2b"
tags: ["Företag", "HR"]
variant: "utbildningar"
ctaLabel: "Boka utbildning"
ctaHref: "/kontakt?subject=utbildning"
secondaryCTA:
  label: "Föreslå en kurs"
  href: "/kontakt?subject=kursforslag"
courses:
  - name: "ESA – Elsäkerhetsanvisningar"
    duration: "1–2 dagar"
    language: "Svenska, engelska"
  - name: "Högspänningsutbildning"
    duration: "2 dagar"
    language: "Svenska"
  - name: "Elsäkerhet för chefer och arbetsledare"
    duration: "1 dag"
    language: "Svenska, engelska"
  - name: "Ställverksmanövrering"
    duration: "1 dag"
    language: "Svenska"
---

## Våra utbildningar

Vi erbjuder kurser inom el och elsäkerhet — både som öppna utbildningar och företagsanpassade upplägg. Flera kurser kan hållas på engelska.

Kontakta oss för datum, plats och pris.
```

- [ ] **Step 6: Create maskinuthyrning.md**

Create `src/content/services/maskinuthyrning.md`:

```markdown
---
title: "Maskinuthyrning"
shortTitle: "Maskiner"
description: "Uthyrning av maskiner och specialutrustning"
metaDescription: "Maskinuthyrning för elarbeten och montage. Leverans och besiktning. Molkom EL sedan 1925."
icon: "🏗"
order: 5
segment: "both"
tags: ["Entreprenad", "Montage"]
variant: "maskinuthyrning"
ctaLabel: "Skicka förfrågan"
ctaHref: "/kontakt?subject=maskinuthyrning"
equipment: []
---

## Maskinuthyrning

Sortimentet uppdateras. Skicka en förfrågan via formuläret så återkommer vi snabbt med pris och tillgänglighet.

Vi erbjuder leverans och hämtning. Besiktning sker vid återlämning.
```

- [ ] **Step 7: Verify build**

```bash
npm run build
```

Expected: Build succeeds. Content collections are parsed and validated.

- [ ] **Step 8: Commit**

```bash
git add src/content.config.ts src/content/
git commit -m "feat: add content collections with Zod schemas and service content"
```

---

## Task 6: Homepage

**Files:**
- Modify: `src/pages/index.astro` (replace placeholder with full homepage)

- [ ] **Step 1: Build the full homepage**

Replace `src/pages/index.astro` with the complete homepage assembling all sections. Import the hero image, all service card images, and wire up the 6 sections: Hero → Service Cards → Trust Bar → Om oss (short) → Process → Contact block.

The homepage imports:
- `BaseLayout`, `Hero`, `ServiceCard`, `TrustBar`, `ProcessSteps`, `CTABlock`
- Hero image from `../assets/pics/3.jpg`
- Service images from `../assets/pics/`
- Content collection via `getCollection('services')` for card data

Key layout: service cards in a responsive grid (3-col top row, 2-col bottom row centered). Om oss section as a two-column text+photo layout. Contact block as a split layout with the simple contact form on the right (form component comes in Task 7, use placeholder for now).

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Hero from '../components/Hero.astro';
import ServiceCard from '../components/ServiceCard.astro';
import TrustBar from '../components/TrustBar.astro';
import ProcessSteps from '../components/ProcessSteps.astro';
import CTABlock from '../components/CTABlock.astro';
import ContactForm from '../components/ContactForm.astro';
import { Image } from 'astro:assets';
import { getCollection } from 'astro:content';

import heroImage from '../assets/pics/3.jpg';
import barnImage from '../assets/pics/2.jpg';
import substationImage from '../assets/pics/1.jpg';
import aboutImage from '../assets/pics/4.jpg';

const services = (await getCollection('services')).sort((a, b) => a.data.order - b.data.order);

const serviceImages: Record<string, ImageMetadata> = {
  '2.jpg': barnImage,
  '1.jpg': substationImage,
};
---

<BaseLayout
  title="Molkom EL"
  description="Elinstallationer från 0,4 till 145 kV — Molkom, Karlstad och hela Sverige. Sedan 1925."
  schemaType="homepage"
>
  <!-- Hero -->
  <Hero
    eyebrow="Sedan 1925"
    title="Ett anrikt företag med framtiden i fokus"
    subtitle="Elinstallationer från 0,4 till 145 kV — Molkom, Karlstad och hela Sverige."
    primaryCTA={{ label: 'Kontakta oss', href: '/kontakt' }}
    secondaryCTA={{ label: 'Våra tjänster', href: '#tjanster' }}
    image={heroImage}
    variant="full"
  />

  <!-- Service Cards -->
  <section class="section" id="tjanster">
    <div class="container">
      <h2 class="section-heading reveal" style="text-align: center; margin-bottom: var(--space-3xl);">Våra tjänster</h2>
      <div class="services-grid">
        {services.map((service) => (
          <ServiceCard
            title={service.data.shortTitle}
            description={service.data.description}
            href={`/tjanster/${service.id}`}
            image={service.data.image ? serviceImages[service.data.image] : undefined}
            icon={service.data.icon}
          />
        ))}
      </div>
    </div>
  </section>

  <!-- Trust Bar -->
  <TrustBar />

  <!-- Om oss -->
  <section class="section section--surface">
    <div class="container">
      <div class="about-preview">
        <div class="about-preview__text reveal">
          <span class="eyebrow">Om Molkom EL</span>
          <h2>Erfarenhet sedan 1925</h2>
          <p>
            Molkom EL har levererat elinstallationer i snart hundra år. Från grunden i Molkom
            har vi vuxit till en rikstäckande aktör med kompetens inom allt från villainstallationer
            och lantbruksel till elkraftsanläggningar och högspänningsarbeten upp till 145 kV.
          </p>
          <p>
            Vi tror på säkerhet, kvalitet och tydlig dokumentation i varje uppdrag —
            oavsett om det gäller en laddbox hemma eller en kraftstation.
          </p>
          <a href="/om-oss" class="btn btn--outline" style="margin-top: var(--space-lg);">Läs mer om oss</a>
        </div>
        <div class="about-preview__image reveal">
          <Image
            src={aboutImage}
            alt="Elkraftsanläggning i solnedgång"
            widths={[400, 600]}
            sizes="(max-width: 768px) 100vw, 50vw"
            class="about-preview__img"
          />
        </div>
      </div>
    </div>
  </section>

  <!-- Process -->
  <ProcessSteps />

  <!-- Contact Block -->
  <section class="section" id="kontakt">
    <div class="container">
      <div class="contact-split">
        <div class="contact-split__info reveal">
          <span class="eyebrow">Kontakt</span>
          <h2>Hör av dig</h2>
          <p>Ring, maila eller fyll i formuläret — vi återkommer inom kort.</p>
          <div class="contact-split__details">
            <a href="tel:+46XXXXXXXXX" class="contact-split__link">📞 +46 XXX-XXX XX XX</a>
            <a href="mailto:info@molkom-el.se" class="contact-split__link">✉️ info@molkom-el.se</a>
            <span class="contact-split__link">📍 Molkom / Karlstad</span>
          </div>
        </div>
        <div class="contact-split__form reveal">
          <ContactForm />
        </div>
      </div>
    </div>
  </section>

  <!-- CTA -->
  <CTABlock
    title="Redo att komma igång?"
    text="Kontakta oss för offert, rådgivning eller bokning — vi återkommer snabbt."
    primaryCTA={{ label: 'Kontakta oss', href: '/kontakt' }}
    secondaryCTA={{ label: 'Ring oss', href: 'tel:+46XXXXXXXXX' }}
  />
</BaseLayout>

<style>
  .services-grid {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-xl);
    justify-content: center;
  }

  .services-grid > :global(*) {
    flex: 0 1 calc((100% - 2 * var(--space-xl)) / 3);
    min-width: 280px;
  }

  .about-preview {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-3xl);
    align-items: center;
  }

  .about-preview__text h2 {
    margin: var(--space-sm) 0 var(--space-md);
  }

  .about-preview__text p {
    margin-bottom: var(--space-md);
  }

  .about-preview__img {
    border-radius: 0.75rem;
    width: 100%;
    height: auto;
  }

  .contact-split {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-3xl);
    align-items: start;
  }

  .contact-split__info h2 {
    margin: var(--space-sm) 0 var(--space-md);
  }

  .contact-split__details {
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
    margin-top: var(--space-xl);
  }

  .contact-split__link {
    font-size: var(--text-base);
    color: var(--color-ink-light);
    text-decoration: none;
    transition: color var(--transition-fast);
  }

  .contact-split__link:hover {
    color: var(--color-red);
  }

  @media (max-width: 768px) {
    .contact-split {
      grid-template-columns: 1fr;
    }
    .services-grid {
      flex-direction: column;
    }
    .about-preview {
      grid-template-columns: 1fr;
    }
    .about-preview__image {
      order: -1;
    }
  }
</style>

```

**Note:** The homepage imports `ContactForm` which is created in Task 7. If building sequentially, temporarily comment out the ContactForm import and the `<ContactForm />` usage in the contact-split section until Task 7 is complete, then uncomment.

- [ ] **Step 2: Verify build and preview**

```bash
npm run build && npm run preview
```

Expected: Full homepage renders with hero image, service cards, trust bar, about section, process steps, contact section, and CTA.

- [ ] **Step 3: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: build complete homepage with all sections"
```

---

## Task 7: Form Components

**Files:**
- Create: `src/components/ContactForm.astro`
- Create: `src/components/EntrepreneurForm.astro`
- Create: `src/components/ROTPanel.astro`
- Create: `src/components/CookieBanner.astro`

- [ ] **Step 1: Create ContactForm.astro (private/simple)**

Create `src/components/ContactForm.astro`:

```astro
---
interface Props {
  compact?: boolean;
}
const { compact = false } = Astro.props;
---

<form class={`contact-form ${compact ? 'contact-form--compact' : ''}`} id="contact-form" novalidate>
  <div class="form-field">
    <input type="text" id="cf-name" name="name" placeholder=" " required />
    <label for="cf-name">Namn</label>
  </div>
  <div class="form-field">
    <input type="text" id="cf-contact" name="contact" placeholder=" " required />
    <label for="cf-contact">Telefon eller e-post</label>
  </div>
  <div class="form-field">
    <textarea id="cf-message" name="message" placeholder=" " rows="4"></textarea>
    <label for="cf-message">Meddelande</label>
  </div>
  <label class="form-checkbox">
    <input type="checkbox" name="gdpr" required id="cf-gdpr" />
    <span>Jag godkänner att mina uppgifter behandlas enligt <a href="/integritetspolicy" target="_blank">integritetspolicyn</a>.</span>
  </label>
  <button type="submit" class="btn btn--primary form-submit" disabled>Skicka förfrågan</button>
  <div class="form-status" id="cf-status" aria-live="polite"></div>
</form>

<style>
  .contact-form {
    display: flex;
    flex-direction: column;
    gap: var(--space-lg);
  }

  .form-field {
    position: relative;
  }

  .form-field input,
  .form-field textarea {
    width: 100%;
    font-family: var(--font-body);
    font-size: var(--text-base);
    padding: 1rem 0 0.5rem;
    border: none;
    border-bottom: 2px solid var(--color-border);
    background: transparent;
    color: var(--color-ink);
    transition: border-color var(--transition-fast);
    outline: none;
    resize: vertical;
  }

  .form-field input:focus,
  .form-field textarea:focus {
    border-bottom-color: var(--color-red);
  }

  .form-field label {
    position: absolute;
    left: 0;
    top: 0.9rem;
    font-size: var(--text-base);
    color: var(--color-muted);
    pointer-events: none;
    transition: all var(--transition-fast);
  }

  .form-field input:focus ~ label,
  .form-field input:not(:placeholder-shown) ~ label,
  .form-field textarea:focus ~ label,
  .form-field textarea:not(:placeholder-shown) ~ label {
    top: -0.25rem;
    font-size: var(--text-xs);
    color: var(--color-red);
  }

  .form-checkbox {
    display: flex;
    gap: var(--space-sm);
    align-items: flex-start;
    font-size: var(--text-sm);
    color: var(--color-body);
    cursor: pointer;
  }

  .form-checkbox input {
    margin-top: 0.2rem;
    accent-color: var(--color-red);
  }

  .form-checkbox a {
    color: var(--color-red);
    text-decoration: underline;
  }

  .form-submit {
    align-self: flex-start;
    width: auto;
  }

  .form-submit:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }

  .form-status {
    font-size: var(--text-sm);
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
    display: none;
  }

  .form-status.success {
    display: block;
    background: #ecfdf5;
    color: #065f46;
    border: 1px solid #a7f3d0;
  }

  .form-status.error {
    display: block;
    background: var(--color-red-light);
    color: var(--color-red);
    border: 1px solid #fca5a5;
  }

  @media (max-width: 768px) {
    .form-submit {
      width: 100%;
    }
  }
</style>

<script>
  const form = document.getElementById('contact-form') as HTMLFormElement;
  const gdpr = document.getElementById('cf-gdpr') as HTMLInputElement;
  const submit = form?.querySelector('.form-submit') as HTMLButtonElement;
  const status = document.getElementById('cf-status');

  if (gdpr && submit) {
    gdpr.addEventListener('change', () => {
      submit.disabled = !gdpr.checked;
    });
  }

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!status) return;
    submit.disabled = true;
    submit.textContent = 'Skickar...';
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        body: new FormData(form),
      });
      if (res.ok) {
        status.className = 'form-status success';
        status.textContent = 'Tack! Vi återkommer inom kort.';
        form.reset();
      } else {
        throw new Error('Server error');
      }
    } catch {
      status.className = 'form-status error';
      status.textContent = 'Något gick fel. Försök igen eller ring oss.';
    } finally {
      submit.disabled = false;
      submit.textContent = 'Skicka förfrågan';
    }
  });
</script>
```

- [ ] **Step 2: Create EntrepreneurForm.astro (B2B)**

Create `src/components/EntrepreneurForm.astro`:

```astro
<form class="contact-form" id="b2b-form" novalidate>
  <div class="form-row">
    <div class="form-field">
      <input type="text" id="b2b-company" name="company" placeholder=" " required />
      <label for="b2b-company">Företagsnamn</label>
    </div>
    <div class="form-field">
      <input type="text" id="b2b-contact" name="contactPerson" placeholder=" " required />
      <label for="b2b-contact">Kontaktperson</label>
    </div>
  </div>
  <div class="form-row">
    <div class="form-field">
      <input type="text" id="b2b-phone" name="phone" placeholder=" " required />
      <label for="b2b-phone">Telefon</label>
    </div>
    <div class="form-field">
      <input type="email" id="b2b-email" name="email" placeholder=" " required />
      <label for="b2b-email">E-post</label>
    </div>
  </div>
  <div class="form-row">
    <div class="form-field">
      <select id="b2b-voltage" name="voltage" required>
        <option value="" disabled selected>Välj spänningsnivå</option>
        <option value="0-0.4kV">0–0,4 kV</option>
        <option value="10-145kV">10–145 kV</option>
        <option value="both">Båda</option>
        <option value="other">Övrigt</option>
      </select>
      <label for="b2b-voltage" class="select-label">Spänningsnivå</label>
    </div>
    <div class="form-field">
      <input type="text" id="b2b-location" name="location" placeholder=" " />
      <label for="b2b-location">Plats / ort</label>
    </div>
  </div>
  <div class="form-field">
    <input type="text" id="b2b-timeline" name="timeline" placeholder=" " />
    <label for="b2b-timeline">Önskad tidsplan</label>
  </div>
  <fieldset class="form-fieldset">
    <legend>Dokumentationskrav</legend>
    <label class="form-checkbox"><input type="checkbox" name="docs" value="protocol" /><span>Provningsprotokoll</span></label>
    <label class="form-checkbox"><input type="checkbox" name="docs" value="drawings" /><span>Ritningar</span></label>
    <label class="form-checkbox"><input type="checkbox" name="docs" value="instructions" /><span>Drift- och underhållsinstruktioner</span></label>
    <label class="form-checkbox"><input type="checkbox" name="docs" value="other" /><span>Annat</span></label>
  </fieldset>
  <div class="form-field">
    <textarea id="b2b-message" name="message" placeholder=" " rows="4"></textarea>
    <label for="b2b-message">Meddelande</label>
  </div>
  <label class="form-checkbox">
    <input type="checkbox" name="gdpr" required id="b2b-gdpr" />
    <span>Jag godkänner att mina uppgifter behandlas enligt <a href="/integritetspolicy" target="_blank">integritetspolicyn</a>.</span>
  </label>
  <button type="submit" class="btn btn--primary form-submit" disabled>Skicka entreprenadförfrågan</button>
  <div class="form-status" id="b2b-status" aria-live="polite"></div>
</form>

<style>
  .contact-form {
    display: flex;
    flex-direction: column;
    gap: var(--space-lg);
  }

  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-lg);
  }

  .form-field {
    position: relative;
  }

  .form-field input,
  .form-field textarea,
  .form-field select {
    width: 100%;
    font-family: var(--font-body);
    font-size: var(--text-base);
    padding: 1rem 0 0.5rem;
    border: none;
    border-bottom: 2px solid var(--color-border);
    background: transparent;
    color: var(--color-ink);
    transition: border-color var(--transition-fast);
    outline: none;
  }

  .form-field input:focus,
  .form-field textarea:focus,
  .form-field select:focus {
    border-bottom-color: var(--color-red);
  }

  .form-field label {
    position: absolute;
    left: 0;
    top: 0.9rem;
    font-size: var(--text-base);
    color: var(--color-muted);
    pointer-events: none;
    transition: all var(--transition-fast);
  }

  .form-field input:focus ~ label,
  .form-field input:not(:placeholder-shown) ~ label,
  .form-field textarea:focus ~ label,
  .form-field textarea:not(:placeholder-shown) ~ label {
    top: -0.25rem;
    font-size: var(--text-xs);
    color: var(--color-red);
  }

  .select-label {
    top: -0.25rem !important;
    font-size: var(--text-xs) !important;
    color: var(--color-muted) !important;
  }

  .form-fieldset {
    border: none;
    padding: 0;
  }

  .form-fieldset legend {
    font-size: var(--text-sm);
    font-weight: 600;
    color: var(--color-ink-light);
    margin-bottom: var(--space-sm);
  }

  .form-fieldset .form-checkbox {
    margin-bottom: var(--space-xs);
  }

  .form-checkbox {
    display: flex;
    gap: var(--space-sm);
    align-items: flex-start;
    font-size: var(--text-sm);
    color: var(--color-body);
    cursor: pointer;
  }

  .form-checkbox input { accent-color: var(--color-red); }

  .form-submit:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .form-status {
    font-size: var(--text-sm);
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
    display: none;
  }

  .form-status.success { display: block; background: #ecfdf5; color: #065f46; }
  .form-status.error { display: block; background: var(--color-red-light); color: var(--color-red); }

  @media (max-width: 768px) {
    .form-row { grid-template-columns: 1fr; }
  }
</style>

<script>
  const form = document.getElementById('b2b-form') as HTMLFormElement;
  const gdpr = document.getElementById('b2b-gdpr') as HTMLInputElement;
  const submit = form?.querySelector('.form-submit') as HTMLButtonElement;
  const status = document.getElementById('b2b-status');

  if (gdpr && submit) {
    gdpr.addEventListener('change', () => { submit.disabled = !gdpr.checked; });
  }

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!status) return;
    submit.disabled = true;
    submit.textContent = 'Skickar...';
    try {
      const res = await fetch('/api/contact', { method: 'POST', body: new FormData(form) });
      if (res.ok) {
        status.className = 'form-status success';
        status.textContent = 'Tack! Vi återkommer inom kort.';
        form.reset();
      } else { throw new Error('fail'); }
    } catch {
      status.className = 'form-status error';
      status.textContent = 'Något gick fel. Försök igen eller ring oss.';
    } finally {
      submit.disabled = false;
      submit.textContent = 'Skicka entreprenadförfrågan';
    }
  });
</script>
```

- [ ] **Step 3: Create ROTPanel.astro**

Create `src/components/ROTPanel.astro`:

```astro
---
const items = [
  {
    q: 'Vad är ROT-avdrag?',
    a: 'ROT-avdrag innebär att du som privatperson kan få skattereduktion med 30 % av arbetskostnaden för reparation, underhåll samt om- och tillbyggnad av din bostad.',
  },
  {
    q: 'Hur fungerar det?',
    a: 'Företaget gör avdraget direkt på fakturan — du betalar bara din del. Vi sköter ansökan mot Skatteverket åt dig.',
  },
  {
    q: 'Vad räknas inte?',
    a: 'Material, utrustning och resor ger inte rätt till ROT-avdrag. Avdraget gäller enbart arbetskostnaden.',
  },
];
---

<section class="rot-panel section">
  <div class="container container--narrow">
    <div class="rot-panel__inner">
      <span class="eyebrow">Bra att veta</span>
      <h2 class="rot-panel__title">ROT-avdrag</h2>
      <div class="rot-panel__items">
        {items.map((item) => (
          <details class="rot-panel__item">
            <summary class="rot-panel__question">{item.q}</summary>
            <p class="rot-panel__answer">{item.a}</p>
          </details>
        ))}
      </div>
      <a href="/kontakt" class="btn btn--outline" style="margin-top: var(--space-lg);">Vill du veta mer? Kontakta oss</a>
    </div>
  </div>
</section>

<style>
  .rot-panel__inner {
    background: var(--color-surface);
    border-radius: 1rem;
    padding: var(--space-2xl);
    border-left: 4px solid var(--color-red);
  }

  .rot-panel__title {
    margin: var(--space-sm) 0 var(--space-xl);
  }

  .rot-panel__items {
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
  }

  .rot-panel__item {
    background: var(--color-white);
    border: 1px solid var(--color-border);
    border-radius: 0.5rem;
    overflow: hidden;
  }

  .rot-panel__question {
    padding: var(--space-md) var(--space-lg);
    font-weight: 600;
    color: var(--color-ink);
    cursor: pointer;
    list-style: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .rot-panel__question::after {
    content: '+';
    font-size: 1.2rem;
    color: var(--color-muted);
    transition: transform var(--transition-fast);
  }

  .rot-panel__item[open] .rot-panel__question::after {
    content: '−';
  }

  .rot-panel__question::-webkit-details-marker {
    display: none;
  }

  .rot-panel__answer {
    padding: 0 var(--space-lg) var(--space-md);
    color: var(--color-body);
    font-size: var(--text-sm);
    line-height: 1.6;
  }
</style>
```

- [ ] **Step 4: Create CookieBanner.astro**

Create `src/components/CookieBanner.astro`:

```astro
<div class="cookie-banner" id="cookie-banner" role="dialog" aria-label="Cookiemedgivande">
  <div class="cookie-banner__inner container">
    <p class="cookie-banner__text">
      Vi använder nödvändiga cookies för att webbplatsen ska fungera.
      <a href="/integritetspolicy">Läs mer i vår integritetspolicy</a>.
    </p>
    <div class="cookie-banner__actions">
      <button class="btn btn--primary cookie-banner__btn" data-consent="all">Acceptera</button>
      <button class="btn btn--outline cookie-banner__btn" data-consent="necessary">Bara nödvändiga</button>
    </div>
  </div>
</div>

<style>
  .cookie-banner {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 200;
    background: var(--color-white);
    border-top: 1px solid var(--color-border);
    box-shadow: 0 -4px 20px rgba(15, 33, 55, 0.1);
    padding: var(--space-lg) 0;
    transform: translateY(100%);
    transition: transform var(--transition-slow);
  }

  .cookie-banner.visible {
    transform: translateY(0);
  }

  .cookie-banner__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-xl);
  }

  .cookie-banner__text {
    font-size: var(--text-sm);
    color: var(--color-body);
    flex: 1;
  }

  .cookie-banner__text a {
    color: var(--color-red);
    text-decoration: underline;
  }

  .cookie-banner__actions {
    display: flex;
    gap: var(--space-sm);
    flex-shrink: 0;
  }

  .cookie-banner__btn {
    padding: 0.5rem 1.25rem;
    font-size: var(--text-xs);
  }

  @media (max-width: 768px) {
    .cookie-banner__inner {
      flex-direction: column;
      text-align: center;
    }
  }
</style>

<script>
  const banner = document.getElementById('cookie-banner');
  const consent = localStorage.getItem('cookie-consent');

  if (!consent && banner) {
    requestAnimationFrame(() => banner.classList.add('visible'));
    banner.querySelectorAll('[data-consent]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const value = (btn as HTMLElement).dataset.consent;
        localStorage.setItem('cookie-consent', value || 'necessary');
        banner.classList.remove('visible');
      });
    });
  }
</script>
```

- [ ] **Step 5: Add CookieBanner to BaseLayout**

Modify `src/layouts/BaseLayout.astro` — import and render `<CookieBanner />` before the closing `</body>`.

- [ ] **Step 6: Verify build**

```bash
npm run build
```

- [ ] **Step 7: Commit**

```bash
git add src/components/ContactForm.astro src/components/EntrepreneurForm.astro src/components/ROTPanel.astro src/components/CookieBanner.astro src/layouts/BaseLayout.astro
git commit -m "feat: add form components, ROT panel, and cookie banner"
```

---

## Task 8: Service Page Template

**Files:**
- Create: `src/pages/tjanster/[slug].astro`

- [ ] **Step 1: Create the dynamic service page**

Create `src/pages/tjanster/[slug].astro`. Uses `getCollection('services')` + `getEntry()`. Renders the shared template:

1. Hero (narrow variant)
2. Intro (markdown body)
3. "Det här hjälper vi med" (from body content)
4. "Passar för" tag chips (from `tags` frontmatter)
5. Capability block (conditional, only if `capabilities` exists — elkraft page)
6. Course cards (conditional, only if `courses` exists — utbildningar page)
7. Equipment table (conditional, only if `variant === 'maskinuthyrning'`)
8. ROTPanel (conditional, only if `variant === 'lagspanning'`)
9. ProcessSteps
10. CTA block

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import Hero from '../../components/Hero.astro';
import ProcessSteps from '../../components/ProcessSteps.astro';
import CTABlock from '../../components/CTABlock.astro';
import ROTPanel from '../../components/ROTPanel.astro';
import { getCollection, render } from 'astro:content';

export async function getStaticPaths() {
  const services = await getCollection('services');
  return services.map((service) => ({
    params: { slug: service.id },
    props: { service },
  }));
}

const { service } = Astro.props;
const { Content } = await render(service);
const { title, metaDescription, tags, variant, ctaLabel, ctaHref, secondaryCTA, capabilities, courses } = service.data;
---

<BaseLayout
  title={title}
  description={metaDescription}
  schemaType="service"
  serviceName={title}
  serviceDescription={metaDescription}
>
  <!-- Hero (narrow) -->
  <Hero title={title} subtitle={service.data.description} variant="narrow" />

  <!-- Body content -->
  <section class="section">
    <div class="container container--narrow">
      <div class="service-content">
        <Content />
      </div>

      <!-- Tags -->
      <div class="service-tags" style="margin-top: var(--space-xl);">
        <span class="eyebrow" style="margin-right: var(--space-sm);">Passar för:</span>
        {tags.map((tag) => (
          <span class="service-tag">{tag}</span>
        ))}
      </div>
    </div>
  </section>

  <!-- Capability block (elkraft only) -->
  {capabilities && capabilities.length > 0 && (
    <section class="section section--surface">
      <div class="container container--narrow">
        <h2 style="margin-bottom: var(--space-xl);">Kapabilitet</h2>
        <div class="capabilities-grid">
          {capabilities.map((cap) => (
            <div class="capability">
              <span class="capability__label">{cap.label}</span>
              <span class="capability__value">{cap.value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )}

  <!-- Course cards (utbildningar only) -->
  {courses && courses.length > 0 && (
    <section class="section section--surface">
      <div class="container container--narrow">
        <h2 style="margin-bottom: var(--space-xl);">Kurser</h2>
        <div class="courses-grid">
          {courses.map((course) => (
            <div class="course-card">
              <h3 class="course-card__name">{course.name}</h3>
              <div class="course-card__meta">
                <span>⏱ {course.duration}</span>
                <span>🌐 {course.language}</span>
              </div>
              <a href={ctaHref} class="btn btn--primary" style="margin-top: var(--space-md); width: 100%;">Boka / Fråga om datum</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )}

  <!-- ROT panel (lågspänning only) -->
  {variant === 'lagspanning' && <ROTPanel />}

  <!-- Process -->
  <ProcessSteps />

  <!-- CTA -->
  <CTABlock
    title="Intresserad?"
    text="Kontakta oss för offert eller mer information."
    primaryCTA={{ label: ctaLabel, href: ctaHref }}
    secondaryCTA={secondaryCTA}
  />
</BaseLayout>

<style>
  .service-content :global(h2) {
    margin-top: var(--space-2xl);
    margin-bottom: var(--space-md);
  }

  .service-content :global(ul) {
    list-style: none;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-sm) var(--space-xl);
    margin: var(--space-md) 0;
  }

  .service-content :global(li) {
    position: relative;
    padding-left: 1.2rem;
    font-size: var(--text-base);
  }

  .service-content :global(li)::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0.6em;
    width: 6px;
    height: 6px;
    background: var(--color-red);
    border-radius: 50%;
  }

  .service-tag {
    display: inline-block;
    padding: 0.3rem 0.8rem;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: 1rem;
    font-size: var(--text-sm);
    color: var(--color-ink-light);
    margin: 0.2rem;
  }

  .capabilities-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-lg);
  }

  .capability {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
  }

  .capability__label {
    font-size: var(--text-xs);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--color-muted);
  }

  .capability__value {
    font-size: var(--text-base);
    color: var(--color-ink);
    font-weight: 500;
  }

  .courses-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: var(--space-lg);
  }

  .course-card {
    background: var(--color-white);
    border: 1px solid var(--color-border);
    border-radius: 0.75rem;
    padding: var(--space-lg);
  }

  .course-card__name {
    font-family: var(--font-body);
    font-size: var(--text-lg);
    font-weight: 600;
    margin-bottom: var(--space-sm);
  }

  .course-card__meta {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    font-size: var(--text-sm);
    color: var(--color-body);
  }

  @media (max-width: 768px) {
    .service-content :global(ul) {
      grid-template-columns: 1fr;
    }
    .capabilities-grid {
      grid-template-columns: 1fr;
    }
  }
</style>

```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: 5 service pages generated under `/tjanster/`. Build output should list all pages.

- [ ] **Step 3: Commit**

```bash
git add src/pages/tjanster/
git commit -m "feat: add dynamic service page template with all variants"
```

---

## Task 9: Remaining Pages

**Files:**
- Create: `src/pages/kontakt.astro`
- Create: `src/pages/om-oss.astro`
- Create: `src/pages/spontanansokan.astro`
- Create: `src/pages/integritetspolicy.astro`

- [ ] **Step 1: Create kontakt.astro**

Create `src/pages/kontakt.astro`:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Hero from '../components/Hero.astro';
import ContactForm from '../components/ContactForm.astro';
import EntrepreneurForm from '../components/EntrepreneurForm.astro';
---

<BaseLayout title="Kontakt" description="Kontakta Molkom EL för offert, rådgivning eller entreprenadförfrågan. Ring eller fyll i formuläret.">
  <Hero title="Kontakt" subtitle="Ring, maila eller fyll i formuläret — vi återkommer snabbt." variant="narrow" />

  <!-- Flow selector -->
  <section class="section">
    <div class="container">
      <div class="flow-selector">
        <a href="#privat-form" class="flow-card">
          <span class="flow-card__icon">🏠</span>
          <h3 class="flow-card__title">Privatperson / mindre jobb</h3>
          <p class="flow-card__desc">Offert, bokning eller frågor om elinstallation i hemmet eller på gården.</p>
        </a>
        <a href="#b2b-form" class="flow-card">
          <span class="flow-card__icon">🏗</span>
          <h3 class="flow-card__title">Företag / entreprenad</h3>
          <p class="flow-card__desc">Entreprenadförfrågan, bemanning eller elkraftsprojekt.</p>
        </a>
      </div>
    </div>
  </section>

  <!-- Private form -->
  <section class="section section--surface" id="privat-form">
    <div class="container" style="max-width: 700px;">
      <h2 style="margin-bottom: var(--space-xl);">Få hjälp / offert</h2>
      <ContactForm />
    </div>
  </section>

  <!-- B2B form -->
  <section class="section" id="b2b-form">
    <div class="container" style="max-width: 700px;">
      <h2 style="margin-bottom: var(--space-xl);">Entreprenadförfrågan</h2>
      <EntrepreneurForm />
    </div>
  </section>

  <!-- Contact info sidebar -->
  <section class="section section--surface">
    <div class="container">
      <div class="contact-info-grid">
        <div>
          <h3>Molkom</h3>
          <p>Adress kommer<br />Molkom</p>
        </div>
        <div>
          <h3>Karlstad</h3>
          <p>Adress kommer<br />Karlstad</p>
        </div>
        <div>
          <h3>Kontaktuppgifter</h3>
          <p><a href="tel:+46XXXXXXXXX">+46 XXX-XXX XX XX</a><br /><a href="mailto:info@molkom-el.se">info@molkom-el.se</a><br />Org.nr: XXX XXX-XXXX</p>
        </div>
      </div>
    </div>
  </section>
</BaseLayout>

<style>
  .flow-selector {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-xl);
    max-width: 700px;
    margin: 0 auto;
  }

  .flow-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: var(--space-2xl);
    background: var(--color-white);
    border: 2px solid var(--color-border);
    border-radius: 1rem;
    text-decoration: none;
    color: inherit;
    transition: all var(--transition-base);
  }

  .flow-card:hover {
    border-color: var(--color-red);
    box-shadow: var(--shadow-md);
    transform: translateY(-2px);
  }

  .flow-card__icon { font-size: 2rem; margin-bottom: var(--space-md); }
  .flow-card__title { font-family: var(--font-body); font-size: var(--text-lg); font-weight: 600; margin-bottom: var(--space-sm); }
  .flow-card__desc { font-size: var(--text-sm); color: var(--color-body); }

  .contact-info-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-xl);
  }

  .contact-info-grid h3 {
    font-family: var(--font-body);
    font-size: var(--text-lg);
    font-weight: 600;
    margin-bottom: var(--space-sm);
  }

  .contact-info-grid a { color: var(--color-red); }

  @media (max-width: 768px) {
    .flow-selector, .contact-info-grid { grid-template-columns: 1fr; }
  }
</style>
```

- [ ] **Step 2: Create om-oss.astro**

Create `src/pages/om-oss.astro`:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Hero from '../components/Hero.astro';
import CTABlock from '../components/CTABlock.astro';
import { Image } from 'astro:assets';
import heroImg from '../assets/pics/4.jpg';
import img1 from '../assets/pics/1.jpg';
import img2 from '../assets/pics/3.jpg';
import img3 from '../assets/pics/20170503_160950618_iOS.jpg';
---

<BaseLayout title="Om oss" description="Molkom EL — elinstallationer sedan 1925. Läs om vår historia, kompetens och värderingar.">
  <Hero title="Om Molkom EL" subtitle="Erfarenhet, kvalitet och säkerhet sedan 1925." variant="narrow" image={heroImg} />

  <!-- History -->
  <section class="section">
    <div class="container container--narrow">
      <h2 class="reveal">Vår historia</h2>
      <p class="reveal">Molkom EL grundades 1925 och har sedan dess levererat elinstallationer med fokus på säkerhet och kvalitet. Från den lilla orten Molkom i Värmland har vi vuxit till en rikstäckande aktör med kompetens inom allt från villainstallationer och lantbruksel till elkraftsanläggningar upp till 145 kV.</p>
      <p class="reveal">Vi tror på tydlig dokumentation, kompetent personal och ett nära samarbete med våra kunder. Oavsett om uppdraget gäller en laddbox hemma eller en kraftstation håller vi samma höga standard.</p>
    </div>
  </section>

  <!-- Key figures -->
  <section class="section section--surface">
    <div class="container">
      <div class="figures-strip">
        <div class="figure reveal" data-target="100">
          <span class="figure__number">0</span>
          <span class="figure__unit">år</span>
          <span class="figure__label">Erfarenhet</span>
        </div>
        <div class="figure reveal">
          <span class="figure__number">145</span>
          <span class="figure__unit">kV</span>
          <span class="figure__label">Högsta spänning</span>
        </div>
        <div class="figure reveal">
          <span class="figure__number" style="font-size: var(--text-2xl);">🇸🇪</span>
          <span class="figure__unit"></span>
          <span class="figure__label">Rikstäckande</span>
        </div>
      </div>
    </div>
  </section>

  <!-- Photo grid -->
  <section class="section">
    <div class="container">
      <h2 class="reveal" style="text-align: center; margin-bottom: var(--space-2xl);">Våra projekt</h2>
      <div class="photo-grid">
        <div class="photo-grid__item photo-grid__item--wide reveal">
          <Image src={img1} alt="Högspänningsinfrastruktur" widths={[400, 700]} sizes="(max-width: 768px) 100vw, 66vw" />
        </div>
        <div class="photo-grid__item reveal">
          <Image src={img2} alt="Transformatorstation i solnedgång" widths={[300, 500]} sizes="(max-width: 768px) 100vw, 33vw" />
        </div>
        <div class="photo-grid__item reveal">
          <Image src={img3} alt="Ställverk" widths={[300, 500]} sizes="(max-width: 768px) 100vw, 50vw" />
        </div>
      </div>
    </div>
  </section>

  <CTABlock
    title="Vill du jobba med oss?"
    text="Vi söker alltid duktiga elektriker och montörer."
    primaryCTA={{ label: 'Kontakta oss', href: '/kontakt' }}
    secondaryCTA={{ label: 'Spontanansökan', href: '/spontanansokan' }}
  />
</BaseLayout>

<style>
  .figures-strip {
    display: flex;
    justify-content: center;
    gap: var(--space-4xl);
    text-align: center;
  }

  .figure { display: flex; flex-direction: column; align-items: center; }
  .figure__number { font-family: var(--font-display); font-size: var(--text-4xl); color: var(--color-ink); }
  .figure__unit { font-size: var(--text-lg); color: var(--color-red); font-weight: 600; }
  .figure__label { font-size: var(--text-sm); color: var(--color-muted); margin-top: var(--space-xs); }

  .photo-grid {
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-template-rows: auto auto;
    gap: var(--space-md);
  }

  .photo-grid__item--wide { grid-row: 1 / 3; }
  .photo-grid__item :global(img) { width: 100%; height: 100%; object-fit: cover; border-radius: 0.75rem; }

  @media (max-width: 768px) {
    .figures-strip { flex-direction: column; gap: var(--space-2xl); }
    .photo-grid { grid-template-columns: 1fr; }
    .photo-grid__item--wide { grid-row: auto; }
  }
</style>

<script>
  // Count-up animation for the "100 år" figure
  const figure = document.querySelector('[data-target]');
  if (figure) {
    const target = parseInt(figure.getAttribute('data-target') || '0');
    const numEl = figure.querySelector('.figure__number');
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && numEl) {
        let current = 0;
        const step = Math.ceil(target / 40);
        const interval = setInterval(() => {
          current = Math.min(current + step, target);
          numEl.textContent = String(current);
          if (current >= target) clearInterval(interval);
        }, 30);
        observer.disconnect();
      }
    }, { threshold: 0.5 });
    observer.observe(figure);
  }
</script>
```

- [ ] **Step 3: Create spontanansokan.astro**

Create `src/pages/spontanansokan.astro`:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Hero from '../components/Hero.astro';
---

<BaseLayout title="Spontanansökan" description="Vill du jobba på Molkom EL? Skicka en spontanansökan med CV.">
  <Hero title="Jobba hos oss" subtitle="Vi söker alltid duktiga elektriker och montörer." variant="narrow" />

  <section class="section">
    <div class="container container--narrow">
      <div class="employer-brand reveal">
        <h2>Varför Molkom EL?</h2>
        <p>Sedan 1925 har vi byggt en arbetsplats där säkerhet, kvalitet och kamratskap står i centrum. Vi arbetar med allt från villainstallationer till elkraft upp till 145 kV — det betyder att du får varierande och utvecklande uppdrag.</p>
      </div>

      <form class="contact-form" id="apply-form" novalidate style="margin-top: var(--space-2xl);">
        <div class="form-field">
          <input type="text" id="apply-name" name="name" placeholder=" " required />
          <label for="apply-name">Namn</label>
        </div>
        <div class="form-field">
          <input type="email" id="apply-email" name="email" placeholder=" " required />
          <label for="apply-email">E-post</label>
        </div>
        <div class="form-field">
          <input type="tel" id="apply-phone" name="phone" placeholder=" " />
          <label for="apply-phone">Telefon</label>
        </div>
        <div class="form-field">
          <textarea id="apply-message" name="message" placeholder=" " rows="4"></textarea>
          <label for="apply-message">Berätta kort om dig själv</label>
        </div>

        <!-- CV upload drop zone -->
        <div class="upload-zone" id="upload-zone">
          <input type="file" id="cv-upload" name="cv" accept=".pdf,.doc,.docx" class="upload-zone__input" />
          <div class="upload-zone__content">
            <span class="upload-zone__icon">📄</span>
            <span class="upload-zone__text">Dra och släpp CV här, eller <strong>klicka för att välja fil</strong></span>
            <span class="upload-zone__hint">.pdf, .doc, .docx — max 10 MB</span>
          </div>
          <span class="upload-zone__filename" id="upload-filename"></span>
        </div>

        <label class="form-checkbox">
          <input type="checkbox" name="gdpr" required id="apply-gdpr" />
          <span>Jag godkänner att mina uppgifter behandlas enligt <a href="/integritetspolicy" target="_blank">integritetspolicyn</a>.</span>
        </label>
        <button type="submit" class="btn btn--primary form-submit" disabled>Skicka ansökan</button>
        <div class="form-status" id="apply-status" aria-live="polite"></div>
      </form>
    </div>
  </section>
</BaseLayout>

<style>
  .employer-brand h2 { margin-bottom: var(--space-md); }
  .employer-brand p { color: var(--color-body); }

  .contact-form { display: flex; flex-direction: column; gap: var(--space-lg); }
  .form-field { position: relative; }
  .form-field input,
  .form-field textarea {
    width: 100%; font-family: var(--font-body); font-size: var(--text-base);
    padding: 1rem 0 0.5rem; border: none; border-bottom: 2px solid var(--color-border);
    background: transparent; color: var(--color-ink); outline: none;
    transition: border-color var(--transition-fast);
  }
  .form-field input:focus, .form-field textarea:focus { border-bottom-color: var(--color-red); }
  .form-field label {
    position: absolute; left: 0; top: 0.9rem; font-size: var(--text-base);
    color: var(--color-muted); pointer-events: none; transition: all var(--transition-fast);
  }
  .form-field input:focus ~ label, .form-field input:not(:placeholder-shown) ~ label,
  .form-field textarea:focus ~ label, .form-field textarea:not(:placeholder-shown) ~ label {
    top: -0.25rem; font-size: var(--text-xs); color: var(--color-red);
  }

  .upload-zone {
    border: 2px dashed var(--color-border);
    border-radius: 0.75rem;
    padding: var(--space-2xl);
    text-align: center;
    cursor: pointer;
    position: relative;
    transition: border-color var(--transition-fast), background var(--transition-fast);
  }
  .upload-zone:hover, .upload-zone.dragover {
    border-color: var(--color-red);
    background: var(--color-red-light);
  }
  .upload-zone__input {
    position: absolute; inset: 0; opacity: 0; cursor: pointer;
  }
  .upload-zone__icon { font-size: 2rem; display: block; margin-bottom: var(--space-sm); }
  .upload-zone__text { font-size: var(--text-sm); color: var(--color-body); }
  .upload-zone__hint { display: block; font-size: var(--text-xs); color: var(--color-muted); margin-top: var(--space-xs); }
  .upload-zone__filename { display: block; margin-top: var(--space-sm); font-size: var(--text-sm); font-weight: 600; color: var(--color-ink); }

  .form-checkbox { display: flex; gap: var(--space-sm); font-size: var(--text-sm); color: var(--color-body); cursor: pointer; }
  .form-checkbox input { accent-color: var(--color-red); }
  .form-submit:disabled { opacity: 0.5; cursor: not-allowed; }
  .form-status { font-size: var(--text-sm); padding: 0.75rem 1rem; border-radius: 0.5rem; display: none; }
  .form-status.success { display: block; background: #ecfdf5; color: #065f46; }
  .form-status.error { display: block; background: var(--color-red-light); color: var(--color-red); }
</style>

<script>
  // Drag and drop + file selection
  const zone = document.getElementById('upload-zone');
  const input = document.getElementById('cv-upload') as HTMLInputElement;
  const filename = document.getElementById('upload-filename');
  if (zone && input && filename) {
    ['dragenter', 'dragover'].forEach(e => zone.addEventListener(e, () => zone.classList.add('dragover')));
    ['dragleave', 'drop'].forEach(e => zone.addEventListener(e, () => zone.classList.remove('dragover')));
    input.addEventListener('change', () => {
      filename.textContent = input.files?.[0]?.name || '';
    });
  }

  // GDPR + submit
  const form = document.getElementById('apply-form') as HTMLFormElement;
  const gdpr = document.getElementById('apply-gdpr') as HTMLInputElement;
  const submit = form?.querySelector('.form-submit') as HTMLButtonElement;
  const status = document.getElementById('apply-status');
  if (gdpr && submit) {
    gdpr.addEventListener('change', () => { submit.disabled = !gdpr.checked; });
  }
  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!status) return;
    submit.disabled = true;
    try {
      const res = await fetch('/api/apply', { method: 'POST', body: new FormData(form) });
      if (res.ok) {
        status.className = 'form-status success';
        status.textContent = 'Tack för din ansökan! Vi hör av oss.';
        form.reset();
        if (filename) filename.textContent = '';
      } else throw new Error('fail');
    } catch {
      status.className = 'form-status error';
      status.textContent = 'Något gick fel. Försök igen eller maila oss.';
    } finally {
      submit.disabled = false;
    }
  });
</script>
```

- [ ] **Step 4: Create integritetspolicy.astro**

Create `src/pages/integritetspolicy.astro`:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Hero from '../components/Hero.astro';
---

<BaseLayout title="Integritetspolicy" description="Så behandlar Molkom EL dina personuppgifter. GDPR-information.">
  <Hero title="Integritetspolicy" variant="narrow" />

  <section class="section">
    <div class="container container--narrow privacy-content">
      <h2>Personuppgiftsansvarig</h2>
      <p>Molkom EL<br />Org.nr: XXX XXX-XXXX<br />Adress: [Adress]<br />E-post: info@molkom-el.se</p>

      <h2>Vilka uppgifter samlar vi in?</h2>
      <p>Vi samlar in de uppgifter du lämnar via våra kontaktformulär: namn, telefonnummer, e-postadress, och eventuellt meddelande. Vid spontanansökan samlar vi även in CV-filer.</p>

      <h2>Syfte och rättslig grund</h2>
      <p>Vi behandlar dina uppgifter för att kunna besvara din förfrågan och ge dig den service du efterfrågar. Den rättsliga grunden är berättigat intresse (kontaktförfrågningar) eller samtycke (spontanansökan).</p>

      <h2>Lagringstid</h2>
      <p>Kontaktuppgifter sparas i högst 12 månader efter senaste kontakt. CV-filer och ansökningar sparas i högst 24 månader, om du inte begär radering tidigare.</p>

      <h2>Mottagare</h2>
      <p>Dina uppgifter delas inte med tredje part utöver vad som krävs för att leverera tjänsten (t.ex. e-postleverantör).</p>

      <h2>Dina rättigheter</h2>
      <p>Du har rätt att begära tillgång till, rättelse eller radering av dina personuppgifter. Du kan även invända mot behandling eller begära begränsning. Kontakta oss på info@molkom-el.se.</p>

      <h2>Klagomål</h2>
      <p>Om du anser att vi behandlar dina uppgifter felaktigt har du rätt att lämna klagomål till Integritetsskyddsmyndigheten (IMY), <a href="https://www.imy.se" target="_blank" rel="noopener">www.imy.se</a>.</p>

      <h2>Cookies</h2>
      <p>Denna webbplats använder nödvändiga cookies för grundläggande funktionalitet (t.ex. att spara ditt val om cookies). Vi använder inga tredjepartscookies för spårning eller marknadsföring.</p>
    </div>
  </section>
</BaseLayout>

<style>
  .privacy-content h2 {
    margin-top: var(--space-2xl);
    margin-bottom: var(--space-sm);
    font-size: var(--text-xl);
  }

  .privacy-content h2:first-child {
    margin-top: 0;
  }

  .privacy-content p {
    margin-bottom: var(--space-md);
    line-height: 1.7;
  }

  .privacy-content a {
    color: var(--color-red);
    text-decoration: underline;
  }
</style>
```

- [ ] **Step 5: Verify build**

```bash
npm run build
```

Expected: All pages build successfully. Output should list: index, tjanster/* (5 pages), kontakt, om-oss, spontanansokan, integritetspolicy.

- [ ] **Step 6: Commit**

```bash
git add src/pages/kontakt.astro src/pages/om-oss.astro src/pages/spontanansokan.astro src/pages/integritetspolicy.astro
git commit -m "feat: add Kontakt, Om oss, Spontanansökan, and Integritetspolicy pages"
```

---

## Task 10: One-Page Scroll

**Files:**
- Create: `src/pages/one-page.astro`

- [ ] **Step 1: Create one-page.astro**

Create `src/pages/one-page.astro`:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Hero from '../components/Hero.astro';
import TrustBar from '../components/TrustBar.astro';
import ContactForm from '../components/ContactForm.astro';
import { getCollection } from 'astro:content';
import heroImage from '../assets/pics/3.jpg';

const services = (await getCollection('services')).sort((a, b) => a.data.order - b.data.order);
---

<BaseLayout title="Molkom EL — Översikt" description="Elinstallationer från 0,4 till 145 kV. Molkom, Karlstad, hela Sverige. Sedan 1925.">
  <!-- Dot navigation -->
  <nav class="dot-nav" id="dot-nav" aria-label="Sektionsnavigering">
    <button class="dot-nav__dot active" data-section="op-hero" aria-label="Start"></button>
    <button class="dot-nav__dot" data-section="op-services" aria-label="Tjänster"></button>
    <button class="dot-nav__dot" data-section="op-trust" aria-label="Trygghet"></button>
    <button class="dot-nav__dot" data-section="op-about" aria-label="Om oss"></button>
    <button class="dot-nav__dot" data-section="op-contact" aria-label="Kontakt"></button>
  </nav>

  <div class="onepage-container">
    <!-- Hero -->
    <section class="onepage-section" id="op-hero">
      <Hero
        eyebrow="Sedan 1925"
        title="Ett anrikt företag med framtiden i fokus"
        subtitle="Elinstallationer från 0,4 till 145 kV — Molkom, Karlstad och hela Sverige."
        primaryCTA={{ label: 'Kontakta oss', href: '#op-contact' }}
        secondaryCTA={{ label: 'Våra tjänster', href: '#op-services' }}
        image={heroImage}
        variant="full"
      />
    </section>

    <!-- Services (compact) -->
    <section class="onepage-section" id="op-services">
      <div class="section">
        <div class="container">
          <h2 style="text-align: center; margin-bottom: var(--space-2xl);">Våra tjänster</h2>
          <div class="compact-services">
            {services.map((s) => (
              <div class="compact-card">
                <span class="compact-card__icon">{s.data.icon}</span>
                <h3 class="compact-card__title">{s.data.shortTitle}</h3>
                <p class="compact-card__desc">{s.data.description}</p>
              </div>
            ))}
          </div>
          <p style="text-align: center; margin-top: var(--space-xl); color: var(--color-muted); font-size: var(--text-sm);">
            Kontakta oss för mer information om våra tjänster.
          </p>
        </div>
      </div>
    </section>

    <!-- Trust -->
    <section class="onepage-section" id="op-trust">
      <TrustBar />
    </section>

    <!-- About (compact) -->
    <section class="onepage-section" id="op-about">
      <div class="section">
        <div class="container container--narrow" style="text-align: center;">
          <span class="eyebrow">Om oss</span>
          <h2 style="margin: var(--space-sm) 0 var(--space-md);">Erfarenhet sedan 1925</h2>
          <p>Molkom EL har levererat elinstallationer i snart hundra år — från villainstallationer till elkraft upp till 145 kV. Vi arbetar rikstäckande med säkerhet och kvalitet i fokus.</p>
        </div>
      </div>
    </section>

    <!-- Contact (simple) -->
    <section class="onepage-section" id="op-contact">
      <div class="section">
        <div class="container" style="max-width: 600px;">
          <h2 style="text-align: center; margin-bottom: var(--space-xl);">Kontakta oss</h2>
          <ContactForm compact />
        </div>
      </div>
    </section>
  </div>
</BaseLayout>

<style>
  .onepage-container {
    scroll-snap-type: y mandatory;
    overflow-y: auto;
    height: 100vh;
    height: 100dvh;
  }

  .onepage-section {
    scroll-snap-align: start;
    min-height: 100vh;
    min-height: 100dvh;
    display: flex;
    align-items: center;
  }

  .onepage-section > * {
    width: 100%;
  }

  /* Dot nav */
  .dot-nav {
    position: fixed;
    right: 1.5rem;
    top: 50%;
    transform: translateY(-50%);
    z-index: 50;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .dot-nav__dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    border: 2px solid var(--color-muted);
    background: transparent;
    padding: 0;
    cursor: pointer;
    transition: all var(--transition-fast);
  }

  .dot-nav__dot.active {
    background: var(--color-red);
    border-color: var(--color-red);
    transform: scale(1.3);
  }

  /* Compact services */
  .compact-services {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: var(--space-lg);
  }

  .compact-card {
    text-align: center;
    padding: var(--space-lg);
    background: var(--color-surface);
    border-radius: 0.75rem;
  }

  .compact-card__icon { font-size: 1.5rem; display: block; margin-bottom: var(--space-sm); }
  .compact-card__title { font-family: var(--font-body); font-size: var(--text-base); font-weight: 600; margin-bottom: var(--space-xs); }
  .compact-card__desc { font-size: var(--text-sm); color: var(--color-body); }

  @media (max-width: 768px) {
    .dot-nav { right: 0.75rem; }
    .compact-services { grid-template-columns: 1fr 1fr; }
  }
</style>

<script>
  // Dot nav active tracking + click scrolling
  const container = document.querySelector('.onepage-container');
  const sections = document.querySelectorAll('.onepage-section');
  const dots = document.querySelectorAll('.dot-nav__dot');

  // Click to scroll
  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const targetId = (dot as HTMLElement).dataset.section;
      if (targetId) {
        document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Track active section
  if (container) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            dots.forEach((d) => d.classList.remove('active'));
            const activeDot = document.querySelector(`[data-section="${entry.target.id}"]`);
            activeDot?.classList.add('active');
          }
        });
      },
      { root: container, threshold: 0.5 }
    );
    sections.forEach((s) => observer.observe(s));
  }
</script>
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add src/pages/one-page.astro
git commit -m "feat: add one-page scroll condensed version"
```

---

## Task 11: GitHub Actions CI/CD

**Files:**
- Create: `.github/workflows/deploy.yml`

- [ ] **Step 1: Create GitHub Actions workflow**

Create `.github/workflows/deploy.yml`:

```yaml
name: Build and Deploy

on:
  push:
    branches: [main, master]
  pull_request:
    branches: [main, master]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Upload artifact
        if: github.event_name == 'push'
        uses: actions/upload-artifact@v4
        with:
          name: dist
          path: dist/

  # Deploy job — configure for your Azure setup
  # Uncomment and adapt when Azure Static Web App or Azure Blob Storage is configured
  # deploy:
  #   needs: build
  #   runs-on: ubuntu-latest
  #   if: github.event_name == 'push'
  #   steps:
  #     - uses: actions/download-artifact@v4
  #       with:
  #         name: dist
  #         path: dist/
  #     - name: Deploy to Azure
  #       uses: Azure/static-web-apps-deploy@v1
  #       with:
  #         azure_static_web_apps_api_token: ${{ secrets.AZURE_STATIC_WEB_APPS_API_TOKEN }}
  #         action: upload
  #         app_location: dist
```

- [ ] **Step 2: Verify build locally one final time**

```bash
npm run build
```

Expected: Clean build, all pages generated, no warnings.

- [ ] **Step 3: Commit**

```bash
git add .github/
git commit -m "ci: add GitHub Actions build workflow for Azure deployment"
```

---

## Task 12: Final Polish & Build Verification

- [ ] **Step 1: Run full build and check output**

```bash
npm run build 2>&1
ls -la dist/
```

Verify all expected pages exist in `dist/`.

- [ ] **Step 2: Run preview and visually check all pages**

```bash
npm run preview
```

Open in browser. Check:
- Homepage: all 6 sections render, hero image loads, service cards link correctly
- Each service page: correct variant renders (ROT panel on lågspänning, capabilities on elkraft, courses on utbildningar)
- Kontakt: flow selector works, both forms render
- Om oss: photo grid, key figures
- Spontanansökan: form with CV upload zone
- One-page: scroll snap works, dot navigation tracks sections
- Mobile: hamburger menu, responsive layouts, sticky bottom CTAs
- Footer: all links work, trust badges show

- [ ] **Step 3: Check accessibility basics**

Verify with dev tools:
- All images have alt text
- Color contrast meets WCAG AA (ink on white, white on ink, red on white)
- Focus states visible on all interactive elements
- Skip navigation works
- Forms have associated labels

- [ ] **Step 4: Final commit if any fixes needed**

```bash
git add -A
git commit -m "fix: final polish and accessibility fixes"
```
