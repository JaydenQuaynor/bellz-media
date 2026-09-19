"use client";

import { useRef } from "react";
import { byId, type Reel } from "@/lib/reels";
import { useReelPlayback } from "@/lib/useReelPlayback";
import { Section, SectionHead } from "./Section";

type Case = {
  id: string;
  kicker: string;
  title: string;
  /** Grounded in what the numbers actually show — no invented creative theory. */
  read: string;
  accent: string;
};

const CASES: Case[] = [
  {
    id: "DVpBX77jmnW",
    kicker: "Organic reach",
    title: "3.47M views from an account nobody followed",
    read: "Fifteen seconds, no production budget, and no audience to seed it — the account had a few hundred followers when this went out. It reached more people than the population of Connecticut. This is the proof that distribution on short-form is earned by the video, not granted by the account.",
    accent: "var(--coral)",
  },
  {
    id: "DX12-bSuxkM",
    kicker: "Product launch",
    title: "A 19-second product explainer that held 417K",
    read: "QuickMovee, a student-to-student campus app. Product videos are the hardest thing to make travel, because the viewer knows within a second that they're being sold to. This one ran nineteen seconds — long, for the format — and still pulled a like rate above the account's own average. That's the format transferring to a real offer.",
    accent: "var(--plum)",
  },
  {
    id: "DUMiUOkDlqt",
    kicker: "Local audience",
    title: "1.25M views, and the strongest engagement on the account",
    read: "Made for a Connecticut audience and tagged to the university crowd in Storrs. It carries the strongest like rate of anything on the account — an audience that recognises itself engages harder than a general one does. For a business selling inside the state, that ratio matters more than the raw reach number next to it.",
    accent: "var(--navy)",
  },
];

function likeRate(r: Reel) {
  return ((r.likes / r.views) * 100).toFixed(1);
}

function CaseVideo({ reel }: { reel: Reel }) {
  const vid = useRef<HTMLVideoElement>(null);
  useReelPlayback(vid);

  return (
    <a
      href={reel.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block w-full overflow-hidden rounded-2xl bg-ink/5 ring-1 ring-black/[0.08] transition-shadow duration-500 hover:shadow-[0_24px_60px_-24px_rgba(16,16,20,0.4)]"
      style={{ aspectRatio: "4 / 5" }}
      aria-label={`Watch on Instagram — ${reel.viewsLabel} views, opens in a new tab`}
    >
      <video
        ref={vid}
        className="h-full w-full object-cover"
        poster={`/reels/${reel.id}-p.jpg`}
        src={`/reels/${reel.id}-p.mp4`}
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      />
      <span className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-gradient-to-t from-black/80 to-transparent p-4 pt-14">
        <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-white/80">
          {reel.date} · {reel.seconds}s
        </span>
        <span className="rounded-full bg-white/95 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-ink opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          Watch ↗
        </span>
      </span>
    </a>
  );
}

export default function CaseStudies() {
  return (
    <Section id="work" tone="card">
      <div className="flex flex-col gap-14 lg:gap-20">
        <SectionHead
          eyebrow="Selected work"
          heading="Three that travelled."
          lede="Open any of them on Instagram and check the numbers yourself. Every figure on this page came out of the account, not a slide."
          accent="coral"
        />

        <div className="flex flex-col gap-16 lg:gap-24">
          {CASES.map((c, i) => {
            const r = byId(c.id);
            const stats = [
              { v: r.views.toLocaleString("en-US"), l: "views" },
              { v: r.likes.toLocaleString("en-US"), l: "likes" },
              { v: `${likeRate(r)}%`, l: "like rate" },
              { v: r.comments.toLocaleString("en-US"), l: "comments" },
            ];
            return (
              <article
                key={c.id}
                data-reveal
                /* Alternating rows must swap the column WIDTHS too, not just
                   the order — otherwise the video lands in the 1fr column and
                   its 4:5 aspect blows the card up to ~1240px tall. */
                className={`grid items-center gap-8 lg:gap-16 ${
                  i % 2 === 1
                    ? "lg:grid-cols-[minmax(0,1fr)_minmax(0,320px)] lg:[&>a]:order-2"
                    : "lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)]"
                }`}
              >
                <CaseVideo reel={r} />

                <div className="flex flex-col gap-7">
                  <div className="flex flex-col gap-3.5">
                    <span
                      className="w-max rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-white"
                      style={{ background: c.accent }}
                    >
                      {c.kicker}
                    </span>
                    <h3 className="max-w-[22ch] font-display text-[clamp(1.5rem,3vw,2.2rem)] font-black leading-[1.05] tracking-[-0.035em] text-balance">
                      {c.title}
                    </h3>
                  </div>

                  <dl className="grid grid-cols-2 gap-x-6 gap-y-5 border-y border-rule py-6 sm:grid-cols-4">
                    {stats.map((s) => (
                      <div key={s.l} className="flex flex-col gap-1">
                        <dt className="font-display text-[clamp(1.15rem,2.2vw,1.55rem)] font-extrabold leading-none tracking-[-0.03em] tabular">
                          {s.v}
                        </dt>
                        <dd className="font-mono text-[9.5px] uppercase tracking-[0.11em] text-mute">
                          {s.l}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <p className="max-w-[58ch] text-[15.5px] leading-[1.62] text-ink/80 md:text-[16px]">
                    {c.read}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
