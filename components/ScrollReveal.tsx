"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Drives every scroll animation on the page from one place, so the section
 * components stay server-rendered (they ship as HTML for SEO and read fine
 * with JS off — these are `from` tweens, never a parked opacity:0).
 *
 *   data-reveal          — the element rises and fades in
 *   data-reveal="group"  — its direct children stagger in
 *   data-count           — counts up to the integer in the attribute
 */
export default function ScrollReveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        const isGroup = el.dataset.reveal === "group";
        const targets = isGroup ? Array.from(el.children) : [el];

        gsap.from(targets, {
          y: 22,
          opacity: 0,
          duration: 0.75,
          ease: "power3.out",
          stagger: isGroup ? 0.07 : 0,
          scrollTrigger: { trigger: el, start: "top 86%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
        const end = Number(el.dataset.count);
        if (!Number.isFinite(end)) return;
        const counter = { v: 0 };

        gsap.to(counter, {
          v: end,
          duration: 1.9,
          ease: "power2.out",
          // Without this GSAP renders the start state at creation, writing
          // "0" over the server-rendered figure until the user scrolls to it.
          immediateRender: false,
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
          onUpdate: () => {
            el.textContent = Math.round(counter.v).toLocaleString("en-US");
          },
        });
      });
    });

    // Fonts and video posters change layout height after first paint.
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, []);

  return null;
}
