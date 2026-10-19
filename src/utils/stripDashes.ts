// Rewrites em/en dashes in externally sourced display text, since the site avoids them.
// Non-string values pass through unchanged.
const PUNCTUATION_AFTER = /^[.,;:!?)\]]/;
const PUNCTUATION_BEFORE = /[.,;:!?]$/;
const UPPERCASE_AFTER = /^\p{Lu}/u;

export function stripDashes<T>(value: T): T {
  if (typeof value !== "string" || !/[\u2013\u2014]/.test(value)) return value;

  return value
    .replace(/(\d)[ \t]*[\u2013\u2014][ \t]*(?=\d)/g, "$1 to ")
    .replace(/(\p{L})\u2013(?=\p{L})/gu, "$1-")
    .replace(/^[ \t]*[\u2013\u2014][ \t]*|[ \t]*[\u2013\u2014][ \t]*$/gm, "")
    .replace(/[ \t]*[\u2013\u2014][ \t]*/g, (match: string, offset: number, text: string) => {
      const after = text.slice(offset + match.length);
      if (PUNCTUATION_AFTER.test(after)) return "";
      if (PUNCTUATION_BEFORE.test(text.slice(0, offset))) return " ";
      return UPPERCASE_AFTER.test(after) ? ". " : ", ";
    }) as T;
}
