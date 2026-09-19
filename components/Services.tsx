import { SERVICES } from "@/lib/content";
import { Section, SectionHead } from "./Section";

const ACCENT: Record<string, string> = {
  coral: "var(--coral)",
  plum: "var(--plum)",
  navy: "var(--navy)",
};

export default function Services() {
  return (
    <Section id="services" tone="paper">
      <div className="flex flex-col gap-14 lg:gap-18">
        <SectionHead
          eyebrow={SERVICES.eyebrow}
          heading={SERVICES.heading}
          accent="navy"
        />

        <div data-reveal="group" className="grid gap-px overflow-hidden rounded-2xl bg-rule-strong ring-1 ring-black/[0.08] lg:grid-cols-3">
          {SERVICES.items.map((s) => (
            <div key={s.n} className="flex flex-col gap-6 bg-card p-7 lg:p-8">
              <div className="flex flex-col gap-3">
                <span
                  aria-hidden="true"
                  className="h-1 w-10 rounded-full"
                  style={{ background: ACCENT[s.accent] }}
                />
                <h3 className="font-display text-[20px] font-extrabold tracking-[-0.025em] md:text-[22px]">
                  {s.n}
                </h3>
              </div>

              <p className="text-[15px] leading-[1.62] text-ink/80">{s.body}</p>

              <ul className="mt-auto flex flex-col gap-2.5 border-t border-rule pt-5">
                {s.deliverables.map((d) => (
                  <li
                    key={d}
                    className="flex items-start gap-2.5 font-mono text-[10.5px] uppercase leading-[1.5] tracking-[0.08em] text-mute"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-[0.35em] inline-block h-1 w-1 shrink-0 rounded-full"
                      style={{ background: ACCENT[s.accent] }}
                    />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
