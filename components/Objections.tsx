import { OBJECTIONS } from "@/lib/content";
import { Section, SectionHead } from "./Section";

export default function Objections() {
  return (
    <Section id="objections" tone="paper">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:gap-20">
        <div className="lg:sticky lg:top-10 lg:self-start">
          <SectionHead
            eyebrow={OBJECTIONS.eyebrow}
            heading={OBJECTIONS.heading}
            lede={OBJECTIONS.lede}
            accent="magenta"
          />
        </div>

        {/* Native <details> — keyboard accessible, works with JS disabled,
            and stays open for print and in-page find. */}
        <div data-reveal="group" className="flex flex-col border-t border-rule-strong">
          {OBJECTIONS.items.map((o) => (
            <details key={o.q} className="faq group border-b border-rule">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden">
                <span className="max-w-[46ch] font-display text-[16px] font-bold leading-[1.35] tracking-[-0.018em] md:text-[17px]">
                  {o.q}
                </span>
                <span
                  aria-hidden="true"
                  className="faq-icon mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-ink/6 text-[15px] leading-none text-ink/70 transition-transform duration-300 ease-[var(--ease-out)] group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="max-w-[64ch] pb-6 pr-10 text-[15px] leading-[1.65] text-ink/80">
                {o.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}
