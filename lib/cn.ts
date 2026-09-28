/** Tiny className joiner — avoids pulling in a dependency. */
export function cn(...classes: unknown[]) {
  return classes.filter((c) => typeof c === "string" && c.length > 0).join(" ");
}
