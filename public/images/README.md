# Smile image library

Put real Smile photography here, then point `data/images.ts` (or the
relevant data file) at the local path, e.g. `/images/outlets/varam.jpg`.

| Folder        | Used for                                   | Suggested size        |
|---------------|--------------------------------------------|-----------------------|
| `outlets/`    | Outlet cards, outlet heroes, galleries     | 2000 × 1300, landscape |
| `offers/`     | Campaign posters (set `posterIsArtwork`)   | 1600 × 2000, portrait  |
| `leadership/` | Leadership portraits                       | 1200 × 1500, portrait  |
| `brands/`     | Brand logos for the marquee (SVG or PNG)   | ~280 × 112, transparent |
| `story/`      | About page timeline and hero               | 2000 × 1500            |

Next.js optimises every image automatically (AVIF/WebP, responsive sizes),
so upload high-quality JPGs and let the site handle the rest.
