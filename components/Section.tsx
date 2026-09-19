import type { ReactNode } from "react";

type Tone = "paper" | "card" | "ink";

const TONE: Record<Tone, string> = {
  paper: "bg-paper text-ink",
  card: "bg-card text-ink",
  ink: "bg-ink text-[#F5F5F2]",
};

export function Section({
  id,
  tone = "card",
  children,
  className = "",
  grid = false,
}: {
  id?: string;
  tone?: Tone;
  children: ReactNode;
  className?: string;
  grid?: boolean;
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-16 border-b border-rule ${TONE[tone]} ${
        grid ? "bg-grid" : ""
      } ${className}`}
    >
      <div className="mx-auto w-full max-w-[1500px] px-5 py-16 md:px-8 md:py-24 lg:py-28">
        {children}
      </div>
    </section>
  );
}

const ACCENT: Record<string, string> = {
  teal: "var(--teal)",
  magenta: "var(--magenta)",
  tangerine: "var(--tangerine)",
  indigo: "var(--indigo)",
};

export function Eyebrow({
  children,
  accent = "teal",
  onInk = false,
}: {
  children: ReactNode;
  accent?: keyof typeof ACCENT | string;
  onInk?: boolean;
}) {
  return (
    <p
      className={`flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.18em] md:text-[11px] ${
        onInk ? "text-white/55" : "text-mute"
      }`}
    >
      <span
        aria-hidden="true"
        className="inline-block h-2 w-2 rounded-[1px]"
        style={{ background: ACCENT[accent] ?? accent }}
      />
      {children}
    </p>
  );
}

export function SectionHeading({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`font-display text-[clamp(1.9rem,4.4vw,3.35rem)] font-black leading-[0.98] tracking-[-0.038em] text-balance ${className}`}
    >
      {children}
    </h2>
  );
}

/** Standard header block: eyebrow, heading, optional lede. */
export function SectionHead({
  eyebrow,
  heading,
  lede,
  accent = "teal",
  onInk = false,
  className = "",
}: {
  eyebrow: string;
  heading: ReactNode;
  lede?: string;
  accent?: string;
  onInk?: boolean;
  className?: string;
}) {
  return (
    <div data-reveal="group" className={`flex flex-col gap-5 ${className}`}>
      <Eyebrow accent={accent} onInk={onInk}>
        {eyebrow}
      </Eyebrow>
      <SectionHeading className="max-w-[18ch]">{heading}</SectionHeading>
      {lede ? (
        <p
          className={`max-w-[58ch] text-[16px] leading-[1.55] md:text-[17px] ${
            onInk ? "text-white/70" : "text-mute"
          }`}
        >
          {lede}
        </p>
      ) : null}
    </div>
  );
}
