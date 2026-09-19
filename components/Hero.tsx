"use client";

import { Fragment, useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { BRIEFS, TOP_REEL_ID } from "@/lib/briefs";
import { REELS, type Reel } from "@/lib/reels";
import ReelCard from "./ReelCard";
import { StatCard, StatStack } from "./StatCard";

const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/** Audiences cycled through the offer statement. */
const AUDIENCES = [
  "Restaurants",
  "Barbershops",
  "Med Spas",
  "Contractors",
  "Gyms",
  "Dentists",
];

type Cell = { variant: "s" | "p"; media: "video" | "poster" };

/**
 * Two tickers running opposite ways.
 *
 * Each row carries all thirteen reels, not a slice of them. A seamless loop
 * needs two identical copies of the track, and a copy narrower than the
 * viewport puts both on screen at once — at 1440px a seven-card row showed
 * the same reel twice, side by side. Thirteen cards is ~3200px, wide enough
 * that only one copy is ever visible.
 *
 * Row B starts six reels in, so the two rows are never showing the same card
 * at the same moment, and only two cards per row carry video — the posters
 * are frames of the same reels and nobody is counting decoded streams.
 */
const ROW_A: Cell[] = [
  { variant: "p", media: "video" },
  { variant: "p", media: "poster" },
  { variant: "s", media: "poster" },
  { variant: "p", media: "poster" },
  { variant: "p", media: "video" },
  { variant: "s", media: "poster" },
  { variant: "p", media: "poster" },
  { variant: "p", media: "poster" },
  { variant: "s", media: "poster" },
  { variant: "p", media: "poster" },
  { variant: "p", media: "poster" },
  { variant: "s", media: "poster" },
  { variant: "p", media: "poster" },
];
const ROW_B: Cell[] = [
  { variant: "s", media: "poster" },
  { variant: "p", media: "poster" },
  { variant: "p", media: "video" },
  { variant: "p", media: "poster" },
  { variant: "s", media: "poster" },
  { variant: "p", media: "poster" },
  { variant: "p", media: "poster" },
  { variant: "s", media: "poster" },
  { variant: "p", media: "poster" },
  { variant: "p", media: "video" },
  { variant: "s", media: "poster" },
  { variant: "p", media: "poster" },
  { variant: "p", media: "poster" },
];

/** Row B's starting reel, so the rows never line up on the same card. */
const ROW_B_START = 6;

const RATIO = { p: "4 / 5", s: "1 / 1" } as const;

/** Slightly different speeds, so the two rows never settle into a rhythm. */
const SPEED_A = "96s";
const SPEED_B = "112s";

/**
 * Splits a line into per-word masks so each word can slide up independently.
 * The gap between words lives BETWEEN the masks, not inside one — a mask is
 * `overflow: hidden` and should clip only the word it animates.
 */
function Words({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((w, i) => (
        <Fragment key={i}>
          <span className="word-mask">
            <span className="word">{w}</span>
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </>
  );
}

/** One copy of a row. The track holds two of these back to back. */
function Group({
  cells,
  results,
  decorative = false,
}: {
  cells: Cell[];
  results: Reel[];
  decorative?: boolean;
}) {
  return (
    <div className="flex h-full shrink-0 gap-3 pr-3 md:gap-4 md:pr-4">
      {cells.map((cell, i) => {
        const reel = results[i];
        if (!reel) return null;
        return (
          <ReelCard
            key={i}
            reel={reel}
            media={cell.media}
            variant={cell.variant}
            decorative={decorative}
            className="h-full shrink-0"
            style={{ aspectRatio: RATIO[cell.variant] }}
          />
        );
      })}
    </div>
  );
}

function Ticker({
  cells,
  results,
  dir,
  duration,
}: {
  cells: Cell[];
  results: Reel[];
  dir: "left" | "right";
  duration: string;
}) {
  return (
    <div className="ticker relative h-[190px] overflow-hidden sm:h-[230px] lg:h-[270px]">
      <div
        className="ticker-track flex h-full"
        data-dir={dir}
        style={{ ["--ticker-duration" as string]: duration }}
      >
        <Group cells={cells} results={results} />
        <Group cells={cells} results={results} decorative />
      </div>
    </div>
  );
}

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const audienceRef = useRef<HTMLSpanElement>(null);
  const mounted = useRef(false);
  const [brief, setBrief] = useState(0);

  // Warm every poster so a re-sort never shows an empty card.
  useEffect(() => {
    REELS.forEach((r) => {
      for (const v of ["s", "p"]) {
        const img = new Image();
        img.src = `/reels/${r.id}-${v}.jpg`;
      }
    });
  }, []);

  useIsoLayoutEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set([".word", ".reel-card", ".stat-card"], {
          opacity: 1,
          y: 0,
          scale: 1,
        });
        return;
      }

      gsap
        .timeline()
        .from(".word", {
          yPercent: 115,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.028,
        })
        .from(
          ".masthead-cta",
          { opacity: 0, y: 12, duration: 0.6, ease: "power2.out" },
          "-=0.45",
        )
        .from(
          ".hero-controls",
          { opacity: 0, y: 14, duration: 0.6, ease: "power3.out" },
          "-=0.45",
        )
        /* Opacity only. A card that scales or shifts is, for the length of
           the tween, shorter than the row it sits in — with 52 of them on a
           per-card stagger that reads as a row of mismatched heights. The
           ticker is already moving; it does not need a second entrance.
           `amount` caps the whole ripple at half a second however many
           cards there are. */
        .from(
          ".reel-card",
          {
            opacity: 0,
            duration: 0.7,
            ease: "power2.out",
            stagger: { amount: 0.5, from: "start" },
          },
          "-=0.35",
        )
        .from(
          ".stat-card",
          {
            opacity: 0,
            scale: 0.9,
            duration: 0.5,
            ease: "back.out(2)",
            stagger: 0.07,
          },
          "-=0.5",
        );

      // ── Offer-statement word cycle ──────────────────────────────
      let audienceIdx = 0;
      const cycleAudience = () => {
        const el = audienceRef.current;
        if (!el) return;
        audienceIdx = (audienceIdx + 1) % AUDIENCES.length;
        gsap
          .timeline()
          .to(el, { yPercent: -110, opacity: 0, duration: 0.32, ease: "power2.in" })
          .call(() => {
            el.textContent = AUDIENCES[audienceIdx];
          })
          .fromTo(
            el,
            { yPercent: 110, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 0.42, ease: "power3.out" },
          );
      };
      const audienceTimer = window.setInterval(cycleAudience, 3400);

      return () => window.clearInterval(audienceTimer);
    }, root);

    return () => ctx.revert();
  }, []);

  /* A sort swaps what every card points at. Fading from part-way rather than
     from zero keeps the rows from blinking out while they are still moving,
     and fading is all it does — see the entrance note on why nothing scales. */
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".reel-card",
        { opacity: 0.25 },
        {
          opacity: 1,
          duration: 0.55,
          ease: "power2.out",
          stagger: { amount: 0.35, from: "random" },
        },
      );
      gsap.fromTo(
        ".stat-card",
        { opacity: 0, scale: 0.92 },
        { opacity: 1, scale: 1, duration: 0.45, ease: "back.out(2)", stagger: 0.06 },
      );
    }, root);
    return () => ctx.revert();
  }, [brief]);

  const active = BRIEFS[brief];
  const rowBResults = [
    ...active.results.slice(ROW_B_START),
    ...active.results.slice(0, ROW_B_START),
  ];

  return (
    <header ref={root} className="relative flex flex-col">
      {/* ── Top bar ─────────────────────────────────────────────── */}
      <nav className="relative z-30 flex items-center justify-between border-b border-rule bg-card px-5 py-3.5 md:px-8">
        <ul className="flex items-center gap-6 font-mono text-[10px] uppercase tracking-[0.14em] md:gap-10 md:text-[11px]">
          {[
            { l: "Work", h: "#work" },
            { l: "Services", h: "#services" },
            { l: "Process", h: "#process" },
            { l: "Questions", h: "#objections" },
            { l: "For creators", h: "#creators", minor: true },
          ].map(({ l, h, minor }) => (
            <li key={l} className={minor ? "hidden lg:block" : undefined}>
              <a href={h} className="text-ink/70 transition-colors hover:text-ink">
                <Words text={l} />
              </a>
            </li>
          ))}
        </ul>
        {/* Hidden on a phone: at 375px it wrapped to three lines and pressed
            against "Questions", and the masthead's own booking button is a
            few hundred pixels below it on the same screen. */}
        <a
          href="#contact"
          className="masthead-cta hidden whitespace-nowrap rounded-md bg-ink px-3.5 py-2 font-mono text-[10px] uppercase tracking-[0.12em] text-white transition-transform hover:-translate-y-px sm:block md:text-[11px]"
        >
          Book a call
        </a>
      </nav>

      {/* ── Masthead ────────────────────────────────────────────── */}
      <div className="relative z-20 bg-card px-5 pb-6 pt-6 md:px-8 md:pb-8 md:pt-7">
        <div className="mx-auto flex w-full max-w-[1500px] flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
          <h1 className="flex flex-col gap-2.5">
            {/* The whole name is the wordmark. Steps are sized so "Bellz Media"
                holds one line from the lg breakpoint up, and breaks to a stacked
                "Bellz / Media" on a phone rather than shrinking to fit. */}
            <span className="font-display text-[17vw] font-black leading-[0.82] tracking-[-0.05em] [word-spacing:0.06em] sm:text-[13vw] lg:text-[8.6vw] xl:text-[118px]">
              <Words text="Bellz Media" />
            </span>
            {/* What the studio does, not where it is. The location belongs in
                the footer and the proof — leading with it caps the brand at the
                state line, and the work is meant to travel further than that. */}
            <span className="pl-1 font-mono text-[9px] uppercase leading-[1.7] tracking-[0.18em] text-mute md:text-[10.5px]">
              <Words text="Organic content and distribution systems for businesses" />
            </span>
          </h1>

          <div className="flex shrink-0 flex-col items-start gap-6 lg:pt-3">
            <p className="font-display text-[22px] font-bold leading-[1.16] tracking-[-0.025em] text-balance sm:text-[26px] lg:text-[28px]">
              <Words text="The Short-Form Studio" />
              <br />
              <Words text="Made for" />{" "}
              <span className="relative -my-[0.18em] inline-block overflow-hidden py-[0.18em] align-bottom">
                <span ref={audienceRef} className="inline-block bg-sky px-1.5 pb-[0.06em]">
                  {AUDIENCES[0]}
                </span>
              </span>
              <span>.</span>
              <br />
              <Words text="Built for Reach." />
            </p>

            <a
              href="#contact"
              className="masthead-cta group flex items-center gap-3 rounded-lg bg-ink p-1.5 pr-5 transition-transform hover:-translate-y-0.5"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/reels/${TOP_REEL_ID}-s.jpg`}
                alt=""
                className="h-9 w-9 rounded-[5px] object-cover"
              />
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-white">
                Book a 15-min call
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* ── The wall ────────────────────────────────────────────── */}
      <div className="bg-grid relative isolate border-y border-rule bg-paper pb-7 md:pb-9">
        <div className="hero-controls px-5 pb-6 pt-7 md:px-8 md:pt-8">
          <div className="mx-auto flex w-full max-w-[1500px] flex-col gap-5 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-mute">
                Sort:
              </span>
              {BRIEFS.map((b, i) => (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => setBrief(i)}
                  aria-pressed={brief === i}
                  className={`rounded-full border px-3 py-1.5 font-mono text-[9.5px] uppercase tracking-[0.1em] transition-colors ${
                    brief === i
                      ? "border-ink bg-ink text-white"
                      : "border-black/[0.12] bg-card/80 text-ink/70 hover:border-ink/40 hover:text-ink"
                  }`}
                >
                  {b.chip}
                </button>
              ))}
            </div>

            {/* Stacked cards that fan down over the rows on hover */}
            <StatStack
              stats={active.stats}
              className="relative z-20 hidden shrink-0 lg:block"
            />
          </div>
        </div>

        <div className="flex flex-col gap-3 md:gap-4">
          <Ticker
            cells={ROW_A}
            results={active.results}
            dir="left"
            duration={SPEED_A}
          />
          <Ticker
            cells={ROW_B}
            results={rowBResults}
            dir="right"
            duration={SPEED_B}
          />
        </div>

        <div className="flex flex-wrap gap-2 px-5 pt-6 md:px-8 lg:hidden">
          {active.stats.map((s, i) => (
            <StatCard key={i} stat={s} />
          ))}
        </div>
      </div>
    </header>
  );
}
