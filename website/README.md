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
| `public/media/` | Films, posters, photographs and the score |

## Put in the real Ranlanka logo

The mark used in the header, menu, footer and intro is one SVG symbol, `<symbol id="mark">`, near the top of `index.html`.

- **If you have the logo as an SVG:** replace the contents of `<symbol id="mark" viewBox="…">` with the logo's paths and set its `viewBox`. Use `fill="currentColor"` or `stroke="currentColor"` so it takes the gold colour. The intro draws every stroked path and fades in every filled one, so it works with any logo.
- **If you only have a PNG:** save it as `public/brand/logo.png`. Then replace each `<svg class="logo-mark" …><use href="#mark"/></svg>` with `<img class="logo-mark" src="brand/logo.png" alt="">`, and do the same for `.foot-mark` and `.intro-mark`.

The wordmark (RANLANKA in Bodoni Moda) is plain text in `.logo-words`. If the real logo already includes the name, remove `.logo-words`.

## Update the gold rate

The rates are in `src/modules/core.js` (`RATE`, in rupees for one pawn of 8 g) and in the two `.kr` rows of the scale section in `index.html`. The exchange table is in the same section. All of them are sample figures until they are connected to a live source.

## Media credits

- Films: Mixkit stock (Mixkit Free License).
- Bridal editorial photographs: Pexels.
- Product photographs: AI-generated concept images, not Ranlanka stock.
- Score: composed with ElevenLabs Music for this concept.
