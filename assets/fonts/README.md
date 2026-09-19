# Fonts

Two TTFs, committed on purpose. Satori (which renders
[`app/opengraph-image.tsx`](../../app/opengraph-image.tsx) at build time) cannot
read the woff2 files that `next/font` downloads, so without these the share card
silently falls back to a thin system face and `fontWeight: 900` does nothing.

The site itself does **not** load these — it uses `next/font/google` in
[`app/layout.tsx`](../../app/layout.tsx). These exist only for the build-time
image.

| File                      | Family      | Source                                             |
| ------------------------- | ----------- | -------------------------------------------------- |
| `Archivo-Black.ttf`       | Archivo     | https://fonts.google.com/specimen/Archivo           |
| `AzeretMono-Regular.ttf`  | Azeret Mono | https://fonts.google.com/specimen/Azeret+Mono       |

Both are licensed under the SIL Open Font License 1.1; the full text ships
alongside them as `Archivo-OFL.txt` and `AzeretMono-OFL.txt`, as the license
requires when the font files are redistributed.
