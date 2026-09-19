import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { ACCOUNT } from "@/lib/reels";

export const alt = "Bellz Media — short-form video built for reach";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const font = (file: string) =>
  readFile(join(process.cwd(), "assets", "fonts", file));

/**
 * Satori renders this, so the rules are stricter than the browser: any element
 * with more than one child needs an explicit display, only a flex/block subset
 * of CSS applies, and fonts must be handed over as buffers — without them
 * `fontWeight: 900` silently falls back to a light system face.
 */
export default async function OpengraphImage() {
  const [archivo, azeret] = await Promise.all([
    font("Archivo-Black.ttf"),
    font("AzeretMono-Regular.ttf"),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#14100F",
          padding: "70px 80px",
          fontFamily: "Archivo",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 132,
              letterSpacing: "-0.055em",
              color: "#F6F4F1",
              lineHeight: 1,
            }}
          >
            Bellz Media
          </div>
          <div
            style={{
              marginTop: 20,
              fontFamily: "Azeret Mono",
              fontSize: 18,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "rgba(246,244,241,0.5)",
            }}
          >
            Organic content and distribution systems for businesses
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255,255,255,0.16)",
            paddingTop: 34,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontSize: 92,
                letterSpacing: "-0.05em",
                color: "#FF8A1F",
                lineHeight: 1,
              }}
            >
              {ACCOUNT.totalViews.toLocaleString("en-US")}
            </div>
            <div
              style={{
                marginTop: 16,
                fontFamily: "Azeret Mono",
                fontSize: 20,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "rgba(246,244,241,0.55)",
              }}
            >
              {`organic views · ${ACCOUNT.reelCount} reels · ${ACCOUNT.followers} followers`}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 26,
              color: "#14100F",
              background: "#FF8A1F",
              padding: "18px 28px",
              borderRadius: 10,
            }}
          >
            Built for reach
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Archivo", data: archivo, weight: 900, style: "normal" },
        { name: "Azeret Mono", data: azeret, weight: 400, style: "normal" },
      ],
    },
  );
}
