import { CONTACT, CREATORS } from "@/lib/content";
import { ACCOUNT } from "@/lib/reels";
import { Section } from "./Section";

/**
 * The second audience. It sits after the brand CTA on purpose — a creator
 * recruitment pitch above the booking section would compete with the thing
 * that actually pays. Violet panel so a creator can tell at a glance that
 * this paragraph is addressed to them and not to a business owner.
 */
export default function Creators() {
  return (
    <Section id="creators" tone="paper">
      <div
        className="overflow-hidden rounded-2xl"
        style={{ background: "var(--navy)" }}
      >
        <div className="grid gap-10 p-8 md:p-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-16 lg:p-14">
          {/* Address */}
          <div data-reveal="group" className="flex flex-col gap-5">
            <p className="flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-white/60 md:text-[11px]">
              <span
                aria-hidden="true"
                className="inline-block h-2 w-2 rounded-[1px] bg-white"
              />
              {CREATORS.eyebrow}
            </p>

            <h2 className="max-w-[13ch] font-display text-[clamp(1.9rem,4.4vw,3.35rem)] font-black leading-[0.98] tracking-[-0.038em] text-white text-balance">
              {CREATORS.heading}
            </h2>

            <p className="max-w-[46ch] text-[16px] leading-[1.55] text-white/75 md:text-[17px]">
              {CREATORS.lede}
            </p>

            <div className="mt-2 flex flex-col gap-4 border-t border-white/20 pt-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/55">
                {CREATORS.barTitle}
              </p>
              <ul className="flex flex-col gap-2.5">
                {CREATORS.bar.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-3 text-[14.5px] leading-[1.45] text-white/90"
                  >
                    <span aria-hidden="true" className="text-white/50">
                      →
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
              <p className="max-w-[48ch] text-[13.5px] leading-[1.55] text-white/60">
                {CREATORS.kicker}
              </p>
            </div>

            <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={CONTACT.creatorApplyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-max rounded-lg bg-white px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.13em] text-ink transition-transform hover:-translate-y-0.5"
                style={{ color: "var(--navy)" }}
              >
                {CREATORS.cta}
              </a>
              <a
                href={`mailto:${CONTACT.creatorEmail}`}
                className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-white/60 underline-offset-4 transition-colors hover:text-white hover:underline sm:ml-2"
              >
                or email {CONTACT.creatorEmail}
              </a>
            </div>
          </div>

          {/* What you get — ruled list, not cards, so it stays quiet next to the panel */}
          <ul
            data-reveal="group"
            className="flex flex-col self-center border-t border-white/20"
          >
            {CREATORS.gets.map((g) => (
              <li
                key={g.k}
                className="grid gap-2 border-b border-white/15 py-5 sm:grid-cols-[minmax(0,17ch)_minmax(0,1fr)] sm:gap-8"
              >
                <span className="font-display text-[15px] font-bold leading-snug tracking-[-0.015em] text-white">
                  {g.k}
                </span>
                <span className="text-[14.5px] leading-[1.6] text-white/70">
                  {g.v}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <p className="border-t border-white/15 px-8 py-5 font-mono text-[9.5px] uppercase leading-[1.7] tracking-[0.12em] text-white/45 md:px-12 lg:px-14">
          Bellz Media · {ACCOUNT.totalViewsLabel} views on the founder&rsquo;s own
          account · {CONTACT.location}
        </p>
      </div>
    </Section>
  );
}
