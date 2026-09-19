import { CONTACT, PACKAGES } from "@/lib/content";
import { Section, SectionHead } from "./Section";

const ACCENT: Record<string, string> = {
  coral: "var(--coral)",
  sky: "var(--sky)",
  navy: "var(--navy)",
};

export default function Packages() {
  return (
    <Section id="packages" tone="card">
      <div className="flex flex-col gap-12 lg:gap-16">
        <SectionHead
          eyebrow={PACKAGES.eyebrow}
          heading={PACKAGES.heading}
          lede={PACKAGES.note}
          accent="sky"
        />

        <div data-reveal="group" className="grid gap-5 lg:grid-cols-3 lg:gap-6">
          {PACKAGES.tiers.map((t) => (
            <div
              key={t.name}
              className={`flex flex-col gap-6 rounded-2xl p-7 lg:p-8 ${
                t.featured
                  ? "bg-ink text-[#F5F5F2] shadow-[0_28px_60px_-28px_rgba(16,16,20,0.55)]"
                  : "bg-paper ring-1 ring-black/[0.08]"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex flex-col gap-2">
                  <h3 className="font-display text-[21px] font-extrabold tracking-[-0.025em] md:text-[23px]">
                    {t.name}
                  </h3>
                  <p
                    className={`max-w-[26ch] text-[14px] leading-[1.5] ${
                      t.featured ? "text-white/65" : "text-mute"
                    }`}
                  >
                    {t.forWho}
                  </p>
                </div>
                {t.featured ? (
                  <span
                    className="shrink-0 rounded-full px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.12em] text-ink"
                    style={{ background: "var(--sky)" }}
                  >
                    Most taken
                  </span>
                ) : null}
              </div>

              <ul
                className={`flex flex-col gap-3 border-t pt-6 ${
                  t.featured ? "border-white/15" : "border-rule"
                }`}
              >
                {t.items.map((it) => (
                  <li
                    key={it}
                    className="flex items-start gap-3 text-[14.5px] leading-[1.45]"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-[0.45em] inline-block h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ background: ACCENT[t.accent] }}
                    />
                    {it}
                  </li>
                ))}
              </ul>

              <a
                href={CONTACT.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-auto rounded-lg px-5 py-3.5 text-center font-mono text-[10.5px] uppercase tracking-[0.13em] transition-transform hover:-translate-y-0.5 ${
                  t.featured
                    ? "bg-[#F5F5F2] text-ink"
                    : "bg-ink text-[#F5F5F2]"
                }`}
              >
                Request a quote
              </a>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
