# Smile Hypermarket — Website

Premium multi-page brand website for Smile Hypermarket (Kannur, India & Ajman, UAE).

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · Framer Motion · Lucide icons
**Fonts:** Red Hat Display / Red Hat Text (headings, navigation, buttons, labels) and Poppins (body copy), self-hosted from `app/fonts`.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run typecheck
```

## Deploying to Vercel

1. Push this folder to a GitHub repository.
2. In Vercel, **Add New → Project**, import the repo. The framework is detected automatically; no settings needed.
3. Optional environment variables:
   - `NEXT_PUBLIC_SITE_URL` — your live domain (e.g. `https://smilehypermarket.com`), used for canonical URLs, Open Graph and the sitemap.
   - `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` — switches maps to the official Google Maps Embed API. Without it, keyless Google Maps embeds are used.

## Routes

| Route | Page |
|---|---|
| `/` | Home |
| `/about` | Our Story — timeline, values, leadership |
| `/leadership` | Full leadership profiles |
| `/outlets` | All outlets — filters, cards, list + map |
| `/outlets/[slug]` | Individual outlet |
| `/offers` | Offers — featured campaign + filterable grid |
| `/offers/[slug]` | Individual offer |
| `/careers` | Careers — vacancies + general application |
| `/careers/[slug]` | Job details + application form |
| `/contact` | Outlet selector, map and contact form |
| `/privacy-policy`, `/terms` | Legal pages |

`sitemap.xml` and `robots.txt` are generated automatically.

## Updating content (no design changes needed)

All content lives in `data/`:

| File | What to edit |
|---|---|
| `data/site.ts` | Main WhatsApp number, email, Instagram / Facebook / WhatsApp Channel links, navigation |
| `data/outlets.ts` | Every outlet: address, phone, WhatsApp, email, hours, coordinates, photos, departments, status (`open` / `coming-soon`) |
| `data/offers.ts` | Campaigns. Status is worked out from the dates; set `posterIsArtwork: true` to show a finished poster as-is |
| `data/jobs.ts` | Vacancies. Set `status: "closed"` to hide one |
| `data/leadership.ts` | Leadership names, portraits, biographies, quotes |
| `data/story.ts` | About-page timeline milestones and brand values |
| `data/brands.ts` | Brand marquee (add `logo` paths when logo files are available) |
| `data/images.ts` | Central photo library — swap placeholder photos for real ones here |

### Before launch — replace placeholders

- **Contact details:** all phone numbers, WhatsApp numbers, emails and opening hours in `data/outlets.ts` and `data/site.ts` are placeholders.
- **Coordinates:** outlet latitude/longitude values are approximate; confirm each one on Google Maps.
- **Leadership:** names, biographies and portraits in `data/leadership.ts` are placeholders.
- **Photography:** images are temporary Unsplash photos. Add real photos to `public/images/` (see the README there) and update `data/images.ts`. Once no remote images remain, the `remotePatterns` entry in `next.config.ts` can be removed.
- **Logo:** `components/layout/Logo.tsx` and `public/icon.svg` contain a temporary mark — replace with the official logo.
- **Social links:** confirm the handles in `data/site.ts`.
- **Legal pages:** starter text — have it reviewed.

## Forms

The contact and job-application forms have full client-side validation, accessible error messages and success states.
Submission is handled in `lib/forms/submit.ts`, which currently simulates success. To go live, replace the body of
`submitContactForm` / `submitJobApplication` with a real request (a Next.js route handler, Formspree, Resend, a CRM webhook…).
The form components don't need to change.

## Project structure

```
app/                  routes, layout, fonts, global styles, sitemap/robots
components/
  ui/                 Button, SectionHeading, Container, Badge, Reveal, PageHero, Breadcrumbs, icons
  layout/             Navbar, MobileMenu, Footer, Logo, WhatsAppFloat
  home/               Hero, BrandsMarquee, SocialSection, WhyChooseBento, OfferPreview, OutletPreview, StoryPreview
  about/              Timeline, ValuesSection, LeadershipProfile, LeadershipSection
  outlets/            OutletCard, OutletTile, OutletActions, OutletMeta, CountryFilter, MapPanel, OutletsExplorer, OutletGallery
  offers/             OfferCard, OfferPoster, FeaturedOffer, OffersGrid
  careers/            JobCard, JobsList, ApplicationForm
  contact/            ContactExplorer, ContactForm
  forms/              Field, TextInput, Select, TextArea, FileInput, FormSuccess, useFormState
data/                 all editable content
lib/                  types, metadata, maps, links, formatting, form validation/submission
public/images/        local image library
```

## Design system

Colours are CSS variables in `app/globals.css` (`--smile-blue`, `--smile-green`, `--off-white`, `--soft-grey`,
`--light-blue`, `--light-green`, `--text-primary`, `--text-secondary`, …) and are exposed to Tailwind as
`bg-smile-blue`, `text-ink-soft`, `border-line`, etc. Change a value once and it updates everywhere.
