"use client";

import { useEffect, useRef, useState } from "react";
import { CONTACT } from "@/lib/content";
import { ACCOUNT } from "@/lib/reels";

/** Appears once the masthead CTA has scrolled away, hides again at the footer. */
export default function StickyCta() {
  const [shown, setShown] = useState(false);
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const doc = document.documentElement;
      const nearEnd = y + window.innerHeight > doc.scrollHeight - 620;
      setShown(y > 900 && !nearEnd);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      ref={bar}
      aria-hidden={!shown}
      className={`pointer-events-none fixed inset-x-0 bottom-0 z-50 px-4 pb-4 transition-all duration-500 ease-[var(--ease-out)] md:px-8 md:pb-6 ${
        shown ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
    >
      <div
        className={`mx-auto flex w-full max-w-[1500px] items-center justify-between gap-4 rounded-xl bg-ink px-4 py-3 shadow-[0_18px_44px_-18px_rgba(16,16,20,0.6)] md:px-5 ${
          shown ? "pointer-events-auto" : ""
        }`}
      >
        <p className="flex min-w-0 flex-1 items-baseline gap-2.5">
          <span className="shrink-0 font-display text-[15px] font-extrabold tracking-[-0.02em] text-[#F5F5F2] tabular md:text-[17px]">
            {ACCOUNT.totalViewsLabel}
          </span>
          {/* Only the short label on a phone — the full line needs room the
              bar does not have at 390px. */}
          <span className="shrink-0 font-mono text-[9.5px] uppercase tracking-[0.12em] text-white/50 sm:hidden">
            views
          </span>
          <span className="hidden min-w-0 truncate font-mono text-[9.5px] uppercase tracking-[0.12em] text-white/50 sm:inline md:text-[10.5px]">
            views · {ACCOUNT.reelCount} reels · Connecticut
          </span>
        </p>

        <a
          href={CONTACT.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={shown ? 0 : -1}
          className="shrink-0 rounded-lg bg-[#F5F5F2] px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.12em] text-ink transition-transform hover:-translate-y-px md:text-[11px]"
        >
          Book a call
        </a>
      </div>
    </div>
  );
}
