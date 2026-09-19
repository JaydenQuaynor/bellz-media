"use client";

import type { Stat } from "@/lib/briefs";

const ACCENT: Record<Stat["accent"], string> = {
  teal: "var(--teal)",
  magenta: "var(--magenta)",
  tangerine: "var(--tangerine)",
  indigo: "var(--indigo)",
};

/** One pop-up card. Sits on its own, or layered into a StatStack. */
export function StatCard({
  stat,
  className = "",
  style,
}: {
  stat: Stat;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`stat-card flex w-max items-center gap-2.5 rounded-xl border border-black/[0.08] bg-card px-3 py-2 shadow-[0_1px_2px_rgba(16,16,20,0.05),0_10px_24px_-14px_rgba(16,16,20,0.35)] ${className}`}
      style={style}
    >
      <span
        aria-hidden="true"
        className="h-6 w-[3px] shrink-0 rounded-full"
        style={{ background: ACCENT[stat.accent] }}
      />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[15px] font-extrabold tracking-[-0.02em] tabular">
          {stat.value}
        </span>
        <span className="mt-1 font-mono text-[9px] uppercase tracking-[0.1em] text-mute">
          {stat.label}
        </span>
      </span>
    </div>
  );
}

/**
 * The stack: three cards layered with a small offset and rotation that
 * fan apart on hover. Sits beside the highest-performing reel.
 */
export function StatStack({
  stats,
  className = "",
  style,
}: {
  stats: Stat[];
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`stat-stack group/stack relative ${className}`}
      style={style}
    >
      {stats.map((s, i) => (
        <div
          key={i}
          className="stat-layer transition-transform duration-500 ease-[var(--ease-out)]"
          style={{
            position: i === 0 ? "relative" : "absolute",
            top: i === 0 ? undefined : 0,
            left: i === 0 ? undefined : 0,
            zIndex: stats.length - i,
            // Resting: layered slightly behind. Hover: fans down and out.
            ["--rest-y" as string]: `${i * 13}px`,
            ["--rest-x" as string]: `${i * 9}px`,
            ["--rest-r" as string]: `${i * 2.2}deg`,
            ["--fan-y" as string]: `${i * 54}px`,
          }}
        >
          <StatCard stat={s} />
        </div>
      ))}
    </div>
  );
}
