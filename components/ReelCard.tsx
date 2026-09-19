"use client";

import { useRef, useState } from "react";
import type { Reel } from "@/lib/reels";
import { useReelPlayback } from "@/lib/useReelPlayback";

/**
 * Remounted per reel (keyed by the caller), so `ready` resets on every swap
 * and the poster underneath covers the gap while the new file loads.
 */
function VideoLayer({ reel, variant }: { reel: Reel; variant: "s" | "p" }) {
  const vid = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  useReelPlayback(vid);

  return (
    <video
      ref={vid}
      className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
        ready ? "opacity-100" : "opacity-0"
      }`}
      src={`/reels/${reel.id}-${variant}.mp4`}
      onCanPlay={() => setReady(true)}
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
    />
  );
}

export default function ReelCard({
  reel,
  media,
  variant,
  className = "",
  style,
  decorative = false,
}: {
  reel: Reel;
  media: "video" | "poster";
  variant: "s" | "p";
  className?: string;
  style?: React.CSSProperties;
  /** A ticker's second copy: same pixels, but not a second set of links. */
  decorative?: boolean;
}) {
  return (
    <a
      href={reel.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-hidden={decorative || undefined}
      tabIndex={decorative ? -1 : undefined}
      aria-label={
        decorative
          ? undefined
          : `${reel.viewsLabel} views on Instagram — opens in a new tab`
      }
      className={`reel-card group relative block overflow-hidden rounded-2xl bg-ink/5 ring-1 ring-black/[0.07] shadow-[0_1px_2px_rgba(16,16,20,0.04),0_12px_28px_-12px_rgba(16,16,20,0.18)] transition-[transform,box-shadow] duration-500 ease-[var(--ease-out)] hover:-translate-y-1 hover:shadow-[0_2px_4px_rgba(16,16,20,0.06),0_22px_44px_-16px_rgba(16,16,20,0.3)] ${className}`}
      style={style}
    >
      {/* Always painted — cached from the preload, so a swap never shows a hole */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/reels/${reel.id}-${variant}.jpg`}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        decoding="async"
      />

      {media === "video" ? (
        <VideoLayer key={reel.id} reel={reel} variant={variant} />
      ) : null}

      <span className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end bg-gradient-to-t from-black/70 to-transparent p-2 pt-8 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <span className="font-mono text-[10px] tracking-[0.08em] text-white tabular">
          {reel.viewsLabel} views
        </span>
      </span>
    </a>
  );
}
