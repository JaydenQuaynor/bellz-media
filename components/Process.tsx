import { PROCESS } from "@/lib/content";
import { Section, SectionHead } from "./Section";

export default function Process() {
  return (
    <Section id="process" tone="card">
      <div className="flex flex-col gap-14 lg:gap-18">
        <SectionHead
          eyebrow={PROCESS.eyebrow}
          heading={PROCESS.heading}
          accent="plum"
        />

        {/* Numbered because each step genuinely depends on the one before it. */}
        <ol data-reveal="group" className="grid gap-px bg-rule-strong lg:grid-cols-4">
          {PROCESS.steps.map((s, i) => (
            <li key={s.t} className="flex flex-col gap-5 bg-card pt-7 lg:px-6">
              <div className="flex items-baseline justify-between gap-4">
                <span className="font-display text-[clamp(2.4rem,4vw,3.2rem)] font-black leading-none tracking-[-0.05em] text-ink/12 tabular">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-mute">
                  {s.time}
                </span>
              </div>
              <div className="flex flex-col gap-2.5 pb-7">
                <h3 className="font-display text-[17px] font-extrabold tracking-[-0.02em] md:text-[18px]">
                  {s.t}
                </h3>
                <p className="text-[14.5px] leading-[1.6] text-ink/75">{s.d}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
