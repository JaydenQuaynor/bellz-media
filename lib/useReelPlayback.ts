"use client";

import { useEffect, type RefObject } from "react";

/**
 * Plays a muted reel only while it is on screen, and picks playback back up
 * when the tab returns to the foreground (browsers pause background media).
 */
export function useReelPlayback(ref: RefObject<HTMLVideoElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Muted autoplay is permitted, but Safari can still reject the promise.
    const tryPlay = () => {
      const p = el.play();
      if (p) p.catch(() => {});
    };

    const io = new IntersectionObserver(
      ([e]) => (e.isIntersecting ? tryPlay() : el.pause()),
      { rootMargin: "200px" },
    );
    io.observe(el);

    const onVisible = () => {
      if (document.visibilityState === "visible") tryPlay();
    };
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [ref]);
}
