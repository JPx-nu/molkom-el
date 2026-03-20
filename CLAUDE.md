# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the **Molkom EL** website project — a new web presence for a Swedish electrical contractor established in 1925, currently without an online presence. The company operates in Molkom/Karlstad but serves clients nationwide.

## Design Specification

The primary document is [web-page.spec.md](web-page.spec.md), a comprehensive Swedish-language design brief covering:

- **Three customer segments**: Private/farming (0–0.4 kV), Industry/contracting, Power grid/electricity (10–145 kV)
- **MVP menu structure**: Start · Tjänster (dropdown) · Utbildningar · Maskinuthyrning · Om oss · Kontakt · Spontanansökan
- **7 page types** with defined CTAs, audiences, and trust signals
- **Design system**: Color palettes (Palette A recommended: marine blue `#0B1F3B`, signal red `#C8102E`, white/light gray base), typography (Inter/Montserrat/Poppins), component specs

## Key Design Decisions

- **Hero-first layout** with dual CTAs ("Kontakta oss" primary + "Se tjänster" secondary)
- **Card-based service overview** (5 service cards below hero) — established Swedish electrician pattern
- **Two contact flows**: simple form for private/small jobs, qualified form for B2B/contracting (voltage level, timeline, documentation requirements)
- **Trust-first approach**: "Sedan 1925", Elsäkerhetsverket registration badge, ID06, certifications
- **Mobile-optimized**: sticky header, bottom CTAs on mobile ("Ring" + "Skicka förfrågan")
- **Accessibility**: WCAG SC 1.4.3 contrast, SC 2.4.7 focus visible

## Swedish Regulatory Compliance

- **Elsäkerhetsverket** registration badge required (link to "Kolla elföretaget")
- **ROT-avdrag**: 30% of labor cost, company deducts on invoice, materials/travel excluded
- **ID06** identification for construction sites (stricter requirements from early 2026)
- **GDPR**: consent checkbox on forms, privacy policy link, cookie banner
- **Konsumenttjänstlagen** applies for private customers

## Language

All user-facing content is in **Swedish**. Some training courses may be offered in English.
