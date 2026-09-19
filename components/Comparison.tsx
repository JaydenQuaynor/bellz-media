import { COMPARISON } from "@/lib/content";
import { Section, SectionHead } from "./Section";

function Cell({ v }: { v: boolean | string }) {
  if (v === true)
    return (
      <span
        className="inline-flex h-6 w-6 items-center justify-center rounded-full text-[13px] font-bold text-white"
        style={{ background: "var(--coral)" }}
      >
        <span aria-hidden="true">✓</span>
        <span className="sr-only">Yes</span>
      </span>
    );
  if (v === false)
    return (
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-ink/8 text-[13px] text-mute">
        <span aria-hidden="true">–</span>
        <span className="sr-only">No</span>
      </span>
    );
  return (
    <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-mute">
      {v}
    </span>
  );
}

export default function Comparison() {
  const [mine, ...others] = COMPARISON.columns;

  return (
    <Section id="compare" tone="paper">
      <div className="flex flex-col gap-12 lg:gap-16">
        <SectionHead
          eyebrow={COMPARISON.eyebrow}
          heading={COMPARISON.heading}
          accent="coral"
        />

        <div data-reveal className="-mx-5 overflow-x-auto px-5 md:mx-0 md:px-0">
          <table className="w-full min-w-[680px] border-collapse text-left">
            <caption className="sr-only">
              Bellz Media compared with in-house production, a traditional
              agency, and boosting posts
            </caption>
            <thead>
              <tr className="border-b border-rule-strong">
                <th scope="col" className="w-[38%] py-4 pr-4">
                  <span className="sr-only">Capability</span>
                </th>
                <th scope="col" className="px-4 py-4">
                  <span className="font-display text-[14px] font-extrabold tracking-[-0.015em] md:text-[15px]">
                    {mine}
                  </span>
                </th>
                {others.map((c) => (
                  <th scope="col" key={c} className="px-4 py-4">
                    <span className="font-mono text-[10px] uppercase tracking-[0.11em] text-mute">
                      {c}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARISON.rows.map((r) => (
                <tr key={r.label} className="border-b border-rule">
                  <th
                    scope="row"
                    className="py-4 pr-4 text-[14.5px] font-medium leading-snug"
                  >
                    {r.label}
                  </th>
                  {r.v.map((v, i) => (
                    <td
                      key={i}
                      className={`px-4 py-4 ${i === 0 ? "bg-card" : ""}`}
                    >
                      <Cell v={v} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="max-w-[62ch] text-[14.5px] leading-[1.6] text-mute">
          {COMPARISON.footnote}
        </p>
      </div>
    </Section>
  );
}
