const dateFmt = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" });
const shortFmt = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short" });

const parse = (iso: string) => new Date(`${iso}T00:00:00`);

export const formatDate = (iso: string) => dateFmt.format(parse(iso));

export function formatDateRange(start: string, end: string) {
  const s = parse(start);
  const e = parse(end);
  const first = s.getFullYear() === e.getFullYear() ? shortFmt.format(s) : dateFmt.format(s);
  return `${first} – ${dateFmt.format(e)}`;
}
