# Ranlanka website

The Rani high-jewellery site for Ranlanka, 192 Main Street, Negombo. It is a static Vite site in plain HTML, CSS and JavaScript modules, with no framework.

## Run it

```sh
npm install
npm run dev        # local server with live reload
npm run build      # production site in dist/ (deploy this folder)
npm run preview    # serve dist/ locally
```

`npm run build:artifact` builds a single-file page for claude.ai artifacts in `dist-artifact/artifact.html`. The media is not inlined; it is published next to the page as `media/*`.

## Where things live

| Path | What it holds |
| --- | --- |
| `index.html` | All page markup, top to bottom: hero film, statement, cover story, collection, services, bridal chapter, 916, made to order, the scale, maison, viewing, appointment, footer, quick view, menu |
| `src/styles/tokens.css` | Colours (wine, ivory, gold), the three serif families, spacing and easing |
| `src/styles/base.css` | Type roles, buttons and links, the header |
| `src/styles/sections.css` | Every section in page order |
| `src/styles/signature.css` | The intro, liquid-gold type, cursor, loupe, glow, bokeh, paper grain, reduced motion |
| `src/modules/core.js` | Smooth scrolling (Lenis), the per-frame scroll bus, **gold rates** |
| `src/modules/loader.js` | The intro: the mark is drawn in gold while a counter runs to 916 |
| `src/modules/goldtype.js` | WebGL liquid-gold headlines (`data-goldtype`) |
| `src/modules/scale.js` | The tharasu: coins, pawn weights and the swinging beam |
| `src/modules/pointer.js` | Cursor label (`data-cursor`), loupe (`data-loupe`), magnetic buttons (`data-magnetic`) |
| `src/modules/page.js` | Hero film, header, statement, scroll scrubs, the 916 chapter, bokeh |
| `src/modules/bridal.js` | Chapter I, the pinned bridal set |
| `src/modules/overlays.js` | Menu and the quick view (piece details and weights are here) |
| `src/modules/visit.js` | Live opening status in Colombo time, the appointment planner, copy buttons |
| `src/modules/sound.js` | The score, off until asked for |
| `src/modules/sizer.js` | Find your size: the on-screen ring and bangle gauge, calibrated with a bank card |
| `src/styles/fonts.css`, `src/fonts/` | Self-hosted, subset fonts |
| `public/m/` | Films (AV1 WebM + H.264 MP4), WebP images in several widths, posters and the score |
| `vercel.json` | Cache headers for the Vercel deployment |

## The logo

The Ranlanka logo (the lamp flame in a gold swirl, held by a silver crescent, beside the wordmark) is redrawn as vectors from `ranlankanegombo.com/images/logo.png`. It lives once in `index.html` as two SVG symbols: `#rl-mark` (the mark, with the `#rl-gold` and `#rl-silver` gradients) and `#rl-word` (the wordmark, which takes `currentColor`). The header, menu, footer, intro and `public/favicon.svg` all use them. If Ranlanka can supply the original vector artwork, replace the paths in those two symbols and keep the class names `rl-swirl`, `rl-flame` and `rl-crescent`, which the intro animates.

## Brand colours

Ranlanka crimson `#8D1B3D` (from their website), the mark's gold and its silver `#BABFC3`. They are tokens in `src/styles/tokens.css`.

## Update the gold rate

The rates are in `src/modules/core.js` (`RATE`, in rupees for one pawn of 8 g) and in the two `.kr` rows of the scale section in `index.html`. The exchange table is in the same section. The rate bar at the top of the header reads the same `RATE`. All of them are sample figures until they are connected to a live source.

## Media credits

- Films: Mixkit stock (Mixkit Free License).
- Bridal editorial photographs: Pexels.
- Product photographs: AI-generated concept images, not Ranlanka stock.
- Score: composed with ElevenLabs Music for this concept.

## Speed

- Fonts are self-hosted: Latin subsets, cut to the weights, widths and optical sizes in use (about 160 KB in all). The two used above the fold are preloaded. The artifact build links Google Fonts instead, because the artifact host only allows fonts from there.
- Every photograph is WebP in two or three widths with `srcset`; the blurred cover backdrop is a 48px thumbnail.
- Films are AV1 WebM with an H.264 MP4 fallback, no audio track, and a portrait 540×960 hero for phones. The hero film starts after the page has loaded; other films and their posters load only as they come near.
- The WebGL gold type builds each headline only when it comes near the screen, in idle time.

To re-encode a film the same way:

```sh
ffmpeg -i in.mp4 -an -vf scale=720:-2 -c:v libx264 -preset slow -crf 28 -pix_fmt yuv420p -movflags +faststart m/name-720.mp4
ffmpeg -i in.mp4 -an -vf scale=720:-2 -c:v libsvtav1 -preset 6 -crf 40 -pix_fmt yuv420p m/name-720.webm
```
