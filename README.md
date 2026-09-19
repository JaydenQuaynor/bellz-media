# Bellz Media

Marketing site for Bellz Media — a short-form video collective for Connecticut
businesses, led by Jeffery Antwi ([@jeffbells7](https://www.instagram.com/jeffbells7/)).
It sells to businesses and recruits creators, in that order.

Next.js 16 (App Router) · Tailwind v4 · GSAP · Lenis. Static export-friendly —
every route prerenders.

```bash
npm run dev     # http://localhost:3000
npm run build   # production build
npm start       # serve the build
```

## Before it goes live

Five placeholders are on the page right now and will 404 for a real visitor.
All of them are at the top of [`lib/content.ts`](lib/content.ts):

| Constant           | Current (fake)                          | Needs                          |
| ------------------ | --------------------------------------- | ------------------------------ |
| `siteUrl`          | `https://bellzmedia.co`                 | the real domain                |
| `bookingUrl`       | `https://cal.com/bellz-media/15min`     | Jeff's real scheduler link     |
| `email`            | `jeff@bellzmedia.co`                    | Jeff's real address            |
| `creatorApplyUrl`  | `https://tally.so/r/bellz-media-creators` | the real creator application  |
| `creatorEmail`     | `creators@bellzmedia.co`                | a real inbox for applicants    |

`siteUrl` also feeds `metadataBase`, the canonical tag, `robots.txt` and
`sitemap.xml`, so set it before the first deploy or the share previews and
sitemap will point at a domain that doesn't exist.

Still unresolved, and it affects copy that is currently published:

- **No client roster exists.** The scrape found zero paid partnerships across
  all 52 reels. The site is deliberately built without a logo wall or
  testimonials, and leans on the founding-client offer instead. If real brand
  work turns up, add a clients section — don't fabricate one.
- **QuickMovee** is framed as "a product launch", which is true whether or not
  it was paid. If it was a paying client, "client campaign" is stronger.
- **The collective's size is never stated.** Only Jeff's account has been
  measured, so the creator section recruits without claiming network-wide
  numbers. Don't add "20+ creators" or a combined view count unless someone
  can actually back it.

## Two audiences

The page sells to businesses. The creator recruitment pitch
([`components/Creators.tsx`](components/Creators.tsx)) deliberately sits
**after** the brand booking section, so it never competes with the conversion
that pays. Creators reach it via the nav link, the footer, or by scrolling.
Keep that order if you rearrange sections.

## The masthead says what, not where

Two separate things, stacked:

```
Bellz Media                                              ← the name, whole
Organic content and distribution systems for businesses  ← what it does
```

The descriptor used to read "Media — Short-Form Studio · Connecticut", which
welded half the brand name onto the positioning line and led with the location.
Both were fixed: the wordmark carries the full name, and the location came out
because leading with the state caps the brand at the state line — the offer is
meant to travel further than the work has so far.

The wordmark's type steps are sized so "Bellz Media" holds one line from the
`lg` breakpoint up and breaks to a stacked "Bellz / Media" on a phone rather
than shrinking to fit. If you change the copy, re-check 1024px — that's the
tightest width, where it sits beside the offer column.

Three places carry that same sentence and have to stay in sync:
[`components/Hero.tsx`](components/Hero.tsx) (the masthead),
[`app/opengraph-image.tsx`](app/opengraph-image.tsx) (the share card) and
`DESCRIPTION` in [`app/layout.tsx`](app/layout.tsx) (search results).

Connecticut still appears where it's a fact rather than a ceiling — the
`Connecticut` query in the hero, the case studies, the comparison table, the
FAQ, the sticky bar and the footer. Don't put it back in the masthead.

## Where things live

```
app/
  layout.tsx           metadata, fonts (Archivo + Azeret Mono)
  page.tsx             section order — the whole funnel
  opengraph-image.tsx  share card, rendered by Satori at build
  icon.svg             favicon
lib/
  reels.ts             GENERATED from the Instagram scrape — don't hand-edit
  content.ts           all site copy, edit freely
  briefs.ts            the hero's rotating queries
components/            one file per section
public/reels/          13 reels, portrait + square, video + poster (21MB)
assets/fonts/          TTFs for the OG image (Satori can't read woff2)
```

**Copy edits go in `lib/content.ts`.** You shouldn't need to touch a component
to reword anything.

## The numbers are real

Every figure on the page traces to `lib/reels.ts`, which was generated from an
Apify scrape of the account on 2026-09-19 — 52 reels, 6,794,221 total views.
Two rules:

1. **Don't hand-edit `lib/reels.ts`.** Re-run the scrape and regenerate it.
2. **Don't quote an average.** The distribution is top-heavy — five reels carry
   96% of the views and the median is 5,158. "6.79M total" and "5 past 400K"
   both survive a prospect checking the account. "Averages 130K" does not.

The FAQ addresses the variance directly rather than hiding it; that's
deliberate, and it's load-bearing for trust. Don't soften it.

## Palette

Four accents, defined once in [`app/globals.css`](app/globals.css) and exposed
to Tailwind through `@theme inline`. Nothing hardcodes a hex except the OG card
and the favicon, which are rendered outside CSS.

| Token     | Hex       | Where it lands                                            |
| --------- | --------- | --------------------------------------------------------- |
| `--sky`   | `#35b9f1` | the signature — highlight, favicon, share card, selection   |
| `--coral` | `#d1441f` | focus ring, comparison ticks, eyebrows, dark-card bullets   |
| `--plum`  | `#9b1b6b` | kickers and stat cards, light surfaces only                 |
| `--navy`  | `#16307d` | deep fills carrying white text (the creator panel)          |

Two of them are constrained, and a recolor has to respect it:

- **`--sky` is used in both directions** — as a fill under ink text (the
  founding-clients panel, the hero's highlighted word) *and* as bright text on
  an ink panel (the Mechanism figures). It sits at 8.4:1 against `--ink` so it
  clears AA either way. Also check `text-ink/75` on the founding panel; at
  `/60` it drops under 4.5:1.
- **`--coral` appears on light and dark**, so it's held mid-luminance: 4.6:1
  with white text, 4.1:1 against `--ink`. Darken it and the bullets on the
  dark pricing card disappear; lighten it and the comparison ticks fail.

`--plum` and `--navy` only ever carry white text on a filled panel, so they're
free to move as long as they stay dark enough for that.

Neutrals are cool on purpose (`--ink` is `#0f1318`, not a neutral black) so the
page reads as one temperature with the blue rather than blue dropped onto
stock grey.

## Animation

- **Hero** ([`components/Hero.tsx`](components/Hero.tsx)) — two tickers running
  opposite ways, driven by CSS keyframes rather than JS. Three things about
  them are load-bearing:

  - **Each row carries all thirteen reels, not a slice.** A seamless loop needs
    two identical copies of the track, and a copy narrower than the viewport
    puts both on screen at once — a seven-card row showed the same reel twice
    at 1440px. Thirteen cards is ~3200px, wide enough that only one copy is
    ever visible. Row B starts six reels in so the rows never match up.
  - **The trailing gap lives inside each group** (`padding-right`), not as a
    gap on the track. Put it on the track and `translateX(-50%)` lands half a
    gap short of the seam.
  - **Cards animate opacity only — never scale or translate.** A card that
    scales is, for the length of the tween, shorter than the row it sits in,
    and 52 of them on a stagger reads as a row of mismatched heights. The
    ticker is already moving; it doesn't need a second entrance.

  Hovering or tabbing into a row pauses it. Under `prefers-reduced-motion` the
  rows stop, become horizontally scrollable, and drop the duplicate copy.

  The chips re-rank what the rows show and swap the stat cards — each is a
  ranker in [`lib/briefs.ts`](lib/briefs.ts) over the real reel data. There's
  no auto-cycle: the tickers supply the motion, so the sort only changes when
  someone asks it to.
- **Scroll reveals** ([`components/ScrollReveal.tsx`](components/ScrollReveal.tsx))
  — driven by `data-reveal` / `data-reveal="group"` / `data-count` attributes,
  so the section components stay server-rendered. Add the attribute, get the
  animation.
- **Lenis** is synced to the GSAP ticker in
  [`components/SmoothScroll.tsx`](components/SmoothScroll.tsx). Without
  `lenis.on("scroll", ScrollTrigger.update)` the reveals fire at wrong
  positions.

Everything is gated behind `prefers-reduced-motion`.

## Deploying

Vercel: import the repo, no configuration needed. Set the real `siteUrl` first.

`public/reels` is 21MB of video committed to the repo. That's fine for Vercel
and keeps the site dependency-free, but if the reel count grows, move it to a
CDN or blob store rather than letting the repo balloon.
