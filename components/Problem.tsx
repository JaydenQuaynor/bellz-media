import { PROBLEM } from "@/lib/content";
import { Section, SectionHead } from "./Section";

export default function Problem() {
  return (
    <Section id="problem" tone="paper">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
        <div className="flex flex-col gap-7">
          <SectionHead
            eyebrow={PROBLEM.eyebrow}
            heading={PROBLEM.heading}
            accent="magenta"
          />
          <div className="flex max-w-[54ch] flex-col gap-4">
            {PROBLEM.body.map((p) => (
              <p key={p} className="text-[16px] leading-[1.62] md:text-[17px]">
                {p}
              </p>
            ))}
          </div>
        </div>

        {/* Not cards — a ruled list. The hierarchy is the rule, not a box. */}
        <ul data-reveal="group" className="flex flex-col self-start border-t border-rule-strong">
          {PROBLEM.points.map((pt) => (
            <li
              key={pt.k}
              className="grid gap-2 border-b border-rule py-6 sm:grid-cols-[minmax(0,15ch)_minmax(0,1fr)] sm:gap-8"
            >
              <span className="font-display text-[15px] font-bold leading-snug tracking-[-0.015em]">
                {pt.k}
              </span>
              <span className="text-[15px] leading-[1.6] text-mute">
                {pt.v}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
