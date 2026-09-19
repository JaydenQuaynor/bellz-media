import { MECHANISM } from "@/lib/content";
import { ACCOUNT } from "@/lib/reels";
import { Section, SectionHeading, Eyebrow } from "./Section";

export default function Mechanism() {
  return (
    <Section id="mechanism" tone="ink">
      <div className="flex flex-col gap-14 lg:gap-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-20">
          <div className="flex flex-col gap-6">
            <Eyebrow accent="sky" onInk>
              {MECHANISM.eyebrow}
            </Eyebrow>
            <SectionHeading className="max-w-[14ch]">
              {MECHANISM.heading}
            </SectionHeading>
            <p className="max-w-[46ch] font-display text-[19px] font-semibold leading-[1.4] tracking-[-0.018em] text-white md:text-[22px]">
              {MECHANISM.lede}
            </p>
          </div>
          <div className="flex max-w-[56ch] flex-col gap-4 self-end">
            {MECHANISM.body.map((p) => (
              <p
                key={p}
                className="text-[15.5px] leading-[1.65] text-white/70 md:text-[16px]"
              >
                {p}
              </p>
            ))}
          </div>
        </div>

        {/*
          The comparison IS the typography. A bar chart of 644 against
          6,794,221 would render one invisible bar — the type scale carries
          the ratio far more honestly.
        */}
        <div data-reveal="group" className="grid items-end gap-10 border-t border-white/15 pt-12 sm:grid-cols-[auto_minmax(0,1fr)] sm:gap-16 lg:pt-16">
          <div className="flex flex-col gap-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/45">
              Followers
            </span>
            <span className="font-display text-[clamp(2.2rem,5vw,3.2rem)] font-black leading-[0.85] tracking-[-0.04em] text-white/35 tabular">
              {ACCOUNT.followers}
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/45">
              Views those followers did not provide
            </span>
            <span
              data-count={ACCOUNT.totalViews}
              className="font-display text-[clamp(3.4rem,13vw,10rem)] font-black leading-[0.8] tracking-[-0.055em] tabular"
              style={{ color: "var(--sky)" }}
            >
              {ACCOUNT.totalViews.toLocaleString("en-US")}
            </span>
          </div>
        </div>

        <div data-reveal="group" className="flex flex-wrap items-baseline gap-x-5 gap-y-2 border-t border-white/15 pt-8">
          <span
            className="font-display text-[clamp(2rem,5vw,3rem)] font-black leading-none tracking-[-0.04em] tabular"
            style={{ color: "var(--sky)" }}
          >
            {MECHANISM.callout.stat}
          </span>
          <span className="font-display text-[17px] font-bold tracking-[-0.015em] text-white md:text-[19px]">
            {MECHANISM.callout.label}
          </span>
          <span className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-white/45">
            {MECHANISM.callout.note}
          </span>
        </div>
      </div>
    </Section>
  );
}
