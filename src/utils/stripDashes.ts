// Rewrites em/en dashes in externally sourced display text, since the site avoids them.
// Non-string values pass through unchanged.
const PUNCTUATION_AFTER = /^[.,;:!?)\]]/;

export function stripDashes<T>(value: T): T {
  if (typeof value !== "string" || !/[\u2013\u2014]/.test(value)) return value;

  return value
    .replace(/(\d)[ \t]*[\u2013\u2014][ \t]*(?=\d)/g, "$1 to ")
    .replace(/(\p{L})\u2013(?=\p{L})/gu, "$1-")
    .replace(/^[ \t]*[\u2013\u2014][ \t]*|[ \t]*[\u2013\u2014][ \t]*$/gm, "")
    .replace(/[ \t]*[\u2013\u2014][ \t]*/g, (match: string, offset: number, text: string) =>
      PUNCTUATION_AFTER.test(text.slice(offset + match.length)) ? "" : ", ",
    ) as T;
}
