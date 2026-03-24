/**
 * Prefix internal paths with the Astro base path.
 *
 * In development or root-domain deployment: base = '/'  → url('/kontakt') = '/kontakt'
 * On GitHub Pages (base = '/molkom-el'):     → url('/kontakt') = '/molkom-el/kontakt'
 *
 * Usage in .astro frontmatter:
 *   import { url } from '../utils/url';
 *   const href = url('/kontakt');
 */
const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export function url(path: string): string {
  if (path.startsWith('http') || path.startsWith('mailto:') || path.startsWith('tel:') || path.startsWith('#')) {
    return path;
  }
  return `${base}${path}`;
}
