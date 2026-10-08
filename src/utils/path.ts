/**
 * `build.format` is `file`, so Astro pathnames end in `.html` at build time.
 * Vercel serves the clean URL. Use this for canonicals, nav, and Analytics.
 */
export function cleanPath(pathname: string): string {
  return (
    pathname
      .replace(/\.html$/, '')
      .replace(/\/index$/, '')
      .replace(/\/$/, '') || '/'
  );
}
