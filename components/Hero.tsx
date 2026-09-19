"use client";

import { Fragment, useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { BRIEFS, TOP_REEL_ID } from "@/lib/briefs";
import { REELS } from "@/lib/reels";
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
 * Two scrollable rows, read left to right in rank order: row one takes results
 * 1–7, row two takes 8–13, so re-sorting visibly promotes work to the front of
 * the top row. Portrait and square alternate to break the grid up, and only the
 * first few cards carry video — thirteen playing at once is not worth the bytes.
 */
const ROW_A: Cell[] = [
  { variant: "p", media: "video" },
  { variant: "p", media: "video" },
  { variant: "s", media: "video" },
  { variant: "p", media: "poster" },
  { variant: "p", media: "poster" },
  { variant: "s", media: "poster" },
  { variant: "p", media: "poster" },
];
const ROW_B: Cell[] = [
  { variant: "s", media: "video" },
  { variant: "p", media: "poster" },
  { variant: "p", media: "poster" },
  { variant: "s", media: "poster" },
  { variant: "p", media: "poster" },
  { variant: "p", media: "poster" },
];

const RATIO = { p: "4 / 5", s: "1 / 1" } as const;

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

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const queryRef = useRef<HTMLSpanElement>(null);
  const audienceRef = useRef<HTMLSpanElement>(null);
  const rowA = useRef<HTMLDivElement>(null);
  const rowB = useRef<HTMLDivElement>(null);
  const selectRef = useRef<((i: number) => void) | null>(null);
  const [brief, setBrief] = useState(0);
  const [auto, setAuto] = useState(true);

  // Warm every poster so a re-sort never shows an empty card.
  useEffect(() => {
    REELS.forEach((r) => {
      for (const v of ["s", "p"]) {
        const img = new Image();
        img.src = `/reels/${r.id}-${v}.jpg`;
      }
    });
  }, []);

  // A new query puts a new reel in first place — send both rows back to it.
  useEffect(() => {
    for (const ref of [rowA, rowB]) {
      ref.current?.scrollTo({ left: 0, behavior: "smooth" });
    }
  }, [brief]);

  useIsoLayoutEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".reel-card");
      const stats = gsap.utils.toArray<HTMLElement>(".stat-card");

      if (reduced) {
        gsap.set([".word", cards, stats], { opacity: 1, y: 0, scale: 1 });
        if (queryRef.current) queryRef.current.textContent = BRIEFS[0].query;
        return;
      }

      // The rows start hidden; the first pass of the loop IS their entrance.
      gsap.set(cards, { opacity: 0, scale: 0.88, y: 24 });
      gsap.set(stats, { opacity: 0 });

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
          ".brief-bar",
          { opacity: 0, y: 16, duration: 0.7, ease: "power3.out" },
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

      // ── Query loop ──────────────────────────────────────────────
      const typer = { i: 0 };
      let current: gsap.core.Timeline | null = null;
      let autoAdvance = true;

      const type = (tl: gsap.core.Timeline, q: string, at?: string) =>
        tl.fromTo(
          typer,
          { i: 0 },
          {
            i: q.length,
            duration: Math.max(0.8, q.length * 0.03),
            ease: "none",
            onUpdate: () => {
              if (queryRef.current)
                queryRef.current.textContent = q.slice(0, Math.round(typer.i));
            },
          },
          at,
        );

      const show = (tl: gsap.core.Timeline, index: number) =>
        tl
          .call(() => setBrief(index))
          .to(
            cards,
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 0.6,
              ease: "power3.out",
              // Left to right: the answer lands in rank order.
              stagger: { each: 0.032, from: "start" },
            },
            "+=0.06",
          )
          .fromTo(
            stats,
            { opacity: 0, scale: 0.9, y: 8 },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 0.5,
              ease: "back.out(2)",
              stagger: 0.07,
            },
            "-=0.4",
          );

      /* Ghosted, not cleared. Two tidy rows dropping to zero between queries
         reads as a loading state; holding them faint keeps the shape of the
         answer while it re-sorts. */
      const hide = (tl: gsap.core.Timeline) =>
        tl
          .to(stats, { opacity: 0, scale: 0.92, duration: 0.28, ease: "power2.in" })
          .to(
            cards,
            {
              opacity: 0.12,
              scale: 0.94,
              y: 10,
              duration: 0.38,
              ease: "power2.in",
              stagger: { each: 0.02, from: "random" },
            },
            "-=0.22",
          );

      const runBrief = (index: number) => {
        const next = (index + 1) % BRIEFS.length;
        const tl = gsap.timeline({
          onComplete: () => {
            if (autoAdvance) runBrief(next);
          },
        });
        current = tl;

        show(tl, index);
        type(tl, BRIEFS[index].query, "-=0.3");
        tl.to({}, { duration: 3.9 });
        hide(tl);
        tl.to(
          typer,
          {
            i: 0,
            duration: 0.3,
            ease: "none",
            onUpdate: () => {
              if (queryRef.current)
                queryRef.current.textContent = BRIEFS[index].query.slice(
                  0,
                  Math.round(typer.i),
                );
            },
          },
          "-=0.45",
        );
      };

      /** A chip click takes over: cancel the loop, run this query, stay put. */
      selectRef.current = (index: number) => {
        autoAdvance = false;
        setAuto(false);
        current?.kill();

        const tl = gsap.timeline();
        current = tl;
        if (queryRef.current) queryRef.current.textContent = "";
        hide(tl);
        show(tl, index);
        type(tl, BRIEFS[index].query, "-=0.3");
      };

      gsap.delayedCall(0.55, () => runBrief(0));

      return () => {
        window.clearInterval(audienceTimer);
        selectRef.current = null;
      };
    }, root);

    return () => ctx.revert();
  }, []);

  const active = BRIEFS[brief];

  /** One scrollable row. `offset` is the rank of its first card. */
  const Row = ({
    cells,
    offset,
    scrollRef,
    indent = false,
  }: {
    cells: Cell[];
    offset: number;
    scrollRef: React.RefObject<HTMLDivElement | null>;
    indent?: boolean;
  }) => (
    <div
      ref={scrollRef}
      /* scroll-padding matches the gutter: without it the snap points sit at
         the card edge and the row parks with its first card flush to the
         viewport, out of line with the masthead above. */
      className={`no-scrollbar flex h-[190px] snap-x scroll-pl-5 gap-3 overflow-x-auto px-5 sm:h-[230px] md:gap-4 md:scroll-pl-8 md:px-8 lg:h-[270px] ${
        // Staggering the second row keeps the two from locking into a grid.
        indent ? "lg:scroll-pl-[7%] lg:pl-[7%]" : ""
      }`}
    >
      {cells.map((cell, i) => {
        const reel = active.results[offset + i];
        if (!reel) return null;
        return (
          <ReelCard
            // Keyed by position so React updates in place and GSAP keeps its targets.
            key={`cell-${offset + i}`}
            reel={reel}
            media={cell.media}
            variant={cell.variant}
            className="h-full shrink-0 snap-start"
            style={{ aspectRatio: RATIO[cell.variant] }}
          />
        );
      })}
    </div>
  );

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

      {/* ── Result wall ─────────────────────────────────────────── */}
      <div className="bg-grid relative isolate border-y border-rule bg-paper pb-7 md:pb-9">
        {/* The query sits above its results, the way a search does. */}
        <div className="px-5 pb-5 pt-7 md:px-8 md:pt-9">
          <div className="mx-auto flex w-full max-w-[1500px] flex-col gap-4">
            <div className="brief-bar flex w-full items-center gap-3 rounded-full border border-black/[0.06] bg-card/95 py-2 pl-6 pr-2 shadow-[0_2px_6px_rgba(16,16,20,0.05),0_24px_50px_-24px_rgba(16,16,20,0.28)] backdrop-blur-sm">
              <span className="flex min-w-0 flex-1 items-center font-mono text-[11px] uppercase tracking-[0.13em] text-ink/80 lg:text-[12px]">
                <span ref={queryRef} className="truncate" />
                <span
                  aria-hidden="true"
                  className="ml-0.5 inline-block h-[1.05em] w-[7px] shrink-0 animate-[blink_1.05s_steps(1)_infinite] bg-ink/70 align-middle"
                />
              </span>

              <span className="hidden shrink-0 font-mono text-[10px] uppercase tracking-[0.1em] text-mute md:inline">
                {active.count} reels · {active.sortLabel}
              </span>

              <a
                href="#work"
                className="shrink-0 whitespace-nowrap rounded-full bg-ink px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.12em] text-white transition-transform hover:-translate-y-px lg:text-[11px]"
              >
                See the work
              </a>
            </div>

            {/* Drive it yourself */}
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-mute">
                  {auto ? "Try:" : "Showing:"}
                </span>
                {BRIEFS.map((b, i) => (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => selectRef.current?.(i)}
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
        </div>

        <div className="flex flex-col gap-3 md:gap-4">
          <Row cells={ROW_A} offset={0} scrollRef={rowA} />
          <Row cells={ROW_B} offset={ROW_A.length} scrollRef={rowB} indent />
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
