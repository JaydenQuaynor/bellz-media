import { TOP_REEL_ID } from "@/lib/briefs";
import { CONTACT, FINAL, FOUNDING } from "@/lib/content";
import { ACCOUNT } from "@/lib/reels";
import { Section, SectionHeading, Eyebrow } from "./Section";

export function Founding() {
  return (
    <Section id="founding" tone="card">
      <div
        className="flex flex-col gap-8 rounded-2xl p-8 md:p-12 lg:p-14"
        style={{ background: "var(--tangerine)" }}
      >
        <div data-reveal="group" className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <div className="flex flex-col gap-5">
            <p className="flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-ink/75 md:text-[11px]">
              <span
                aria-hidden="true"
                className="inline-block h-2 w-2 rounded-[1px] bg-ink"
              />
              {FOUNDING.eyebrow}
            </p>
            <SectionHeading className="max-w-[12ch] text-ink">
              {FOUNDING.heading}
            </SectionHeading>
          </div>

          <div className="flex flex-col gap-6 self-center">
            <p className="max-w-[54ch] text-[16px] leading-[1.6] text-ink/85 md:text-[17px]">
              {FOUNDING.body}
            </p>
            <ul className="flex flex-col gap-2.5 border-t border-ink/20 pt-5">
              {FOUNDING.points.map((p) => (
                <li
                  key={p}
                  className="flex items-start gap-3 font-mono text-[11px] uppercase tracking-[0.1em] text-ink/80"
                >
                  <span aria-hidden="true" className="text-ink">
                    →
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}

export function FinalCta() {
  return (
    <Section id="contact" tone="ink" grid>
      <div data-reveal="group" className="flex flex-col items-start gap-9 lg:gap-11">
        <Eyebrow accent="tangerine" onInk>
          Book it
        </Eyebrow>

        <SectionHeading className="max-w-[16ch] text-[clamp(2.4rem,7vw,5.5rem)] leading-[0.94]">
          {FINAL.heading}
        </SectionHeading>

        <p className="max-w-[54ch] text-[16px] leading-[1.6] text-white/70 md:text-[18px]">
          {FINAL.body}
        </p>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <a
            href={CONTACT.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3.5 rounded-lg bg-[#F5F5F2] p-2 pr-6 transition-transform hover:-translate-y-0.5"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/reels/${TOP_REEL_ID}-s.jpg`}
              alt=""
              className="h-11 w-11 rounded-md object-cover"
            />
            <span className="font-mono text-[11.5px] uppercase tracking-[0.13em] text-ink">
              {FINAL.cta}
            </span>
          </a>

          <a
            href={`mailto:${CONTACT.email}`}
            className="font-mono text-[11px] uppercase tracking-[0.12em] text-white/60 underline-offset-4 transition-colors hover:text-white hover:underline sm:ml-3"
          >
            or email {CONTACT.email}
          </a>
        </div>

        <p className="font-mono text-[10px] uppercase leading-[1.7] tracking-[0.1em] text-white/40">
          {ACCOUNT.totalViewsLabel} views · {ACCOUNT.reelCount} reels ·{" "}
          {ACCOUNT.windowLabel} · {CONTACT.location}
        </p>
      </div>
    </Section>
  );
}

export function Footer() {
  return (
    <footer className="bg-ink px-5 py-10 text-[#F5F5F2] md:px-8">
      <div className="mx-auto flex w-full max-w-[1500px] flex-col gap-8 border-t border-white/12 pt-8 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-1.5">
          <span className="font-display text-[26px] font-black leading-none tracking-[-0.045em]">
            Bellz Media
          </span>
          <span className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-white/45">
            Short-form studio · {CONTACT.location}
          </span>
        </div>

        <nav className="flex flex-wrap items-center gap-x-7 gap-y-3 font-mono text-[10px] uppercase tracking-[0.13em] text-white/55">
          <a href="#work" className="transition-colors hover:text-white">
            Work
          </a>
          <a href="#services" className="transition-colors hover:text-white">
            Services
          </a>
          <a href="#objections" className="transition-colors hover:text-white">
            Questions
          </a>
          <a href="#creators" className="transition-colors hover:text-white">
            For creators
          </a>
          <a
            href={CONTACT.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-white"
          >
            Instagram ↗
          </a>
          <a
            href={`mailto:${CONTACT.email}`}
            className="transition-colors hover:text-white"
          >
            Email
          </a>
        </nav>
      </div>
    </footer>
  );
}
