export const SITE_ORIGIN = "https://coolify.io";

/**
 * Short URLs that must be HTTP redirects (see nginx.conf), never indexed.
 * Affiliate hops use 302; the rest use 301.
 */
export const REDIRECT_PATHS = [
  "/github",
  "/discord",
  "/hetzner",
  "/digitalocean",
  "/vultr",
  "/hidden",
  "/live",
];

/**
 * Public URL shape: https://coolify.io/slug (apex, https, no trailing slash).
 * Homepage is https://coolify.io to match @astrojs/sitemap with trailingSlash: "never".
 */
export function canonicalize(pathnameOrUrl) {
  let pathname = "/";

  try {
    const url = pathnameOrUrl.includes("://")
      ? new URL(pathnameOrUrl)
      : new URL(pathnameOrUrl, SITE_ORIGIN);
    pathname = url.pathname;
  } catch {
    pathname = pathnameOrUrl.startsWith("/")
      ? pathnameOrUrl
      : `/${pathnameOrUrl}`;
  }

  pathname = pathname.replace(/\/index\.html$/, "/").replace(/\.html$/, "");

  if (pathname === "/" || pathname === "") {
    return SITE_ORIGIN;
  }

  return `${SITE_ORIGIN}${pathname.replace(/\/+$/, "")}`;
}

export function isRedirectPath(pathnameOrUrl) {
  const path = canonicalize(pathnameOrUrl).slice(SITE_ORIGIN.length) || "/";
  return REDIRECT_PATHS.includes(path);
}
