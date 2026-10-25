# Ranlanka · The gold of Lanka

The website for Ranlanka, twenty-two karat gold jewellery at 192 Main Street, Negombo.

It is one landing page, built with [Next.js](https://nextjs.org) (App Router, TypeScript) and
generated as static HTML at build time, so it is fast and cheap to host.

## The page, top to bottom

| Section | What it is |
| --- | --- |
| Hero | The bride among the lamps. The scene fades up, the lamps come on and the gold catches the light |
| Marquee | A slow line of what the shop stands for |
| Ran means gold | The story in one paragraph, with the year, the purity and the pawn |
| The collection | Pieces in a lit case: drag, swipe, use the arrows or the keyboard, or pick a collection |
| The bridal edit | The bridal set, and a call to book a viewing |
| How we work | Four promises, on cards that light up under the cursor |
| Design your own | Slide between the drawing and the finished pendant |
| The gold rate | Today's rates (sample figures) and a few money-exchange rates |
| Visit | Address, hours, phones, whether the showroom is open right now, and the showroom photos |

## Where things live

| Path | What it is |
| --- | --- |
| `app/page.tsx` | The order of the sections |
| `app/globals.css` | All styles: colours, type, buttons and every section |
| `components/` | The header, the hero, the collection case, the drawing slider and the other sections |
| `lib/pieces.ts` | The pieces in the case, the gold rate (`RATE_22K`, `RATE_24K`) and the pawn |
| `lib/rates.ts` | The money-exchange rates (sample figures) |
| `app/fonts/` | Vonca, the display face, used for headlines, figures and names of pieces only |
| `public/images/pieces/` | The pieces, cut out on a transparent ground, named `<collection>-<number>.webp` |
| `public/images/` | The hero photograph and its gold mask, the bridal photographs, the logo (`logo.png` as supplied, `logo-light.png` for dark grounds) and the showroom photos |

Type: **Vonca** is kept for headlines, big figures and names of pieces. Everything people need
to read is set in **Manrope**.

## Run it locally

```sh
npm install
npm run dev
```

Then open http://localhost:3000. `npm run build` makes the production build.

## Deploy

Vercel builds it with the Next.js preset; there is nothing else to configure.

## The photographs

The product, showroom and logo images come from the shop's previous website
(ranlankanegombo.com) and are used with the owner's permission.

- **The watermark is gone from every piece shown.** Those photos had a large RANLANKA
  watermark. For necklaces, earrings and pendants the watermark sits behind the piece, so each
  piece was cut out of its photo and the watermark left behind. 18 of those 22 came out clean
  and are on the page.
- **Rings, bangles and bracelets are not shown.** On the ring and bangle photos the watermark
  is printed across the gold itself and cannot be taken off cleanly; the bracelet photos are
  thin vertical strips that do not sit well in the case. Supply clean originals (any size, no
  watermark) and they can be cut out and added.
- The originals are 640 pixels wide, so the cut-outs are small. Higher-resolution photos would
  make the case sharper on large screens.
- The showroom photographs are 200 pixels square, so they are shown small.

To add or change a piece, put a transparent `.webp` in `public/images/pieces/` and add a line
to `PIECES` in `lib/pieces.ts` with its width and height.

## The figures

**The names of the pieces, the gold rate and the exchange rates are placeholders.** The names
were written from what each photo shows. Change `RATE_22K` and `RATE_24K` in `lib/pieces.ts`
each morning (or connect them to wherever the counter posts the day's rate), and the rates in
`lib/rates.ts`.

## The hero glow

`public/images/hero-gold-mask.png` is a mask cut from the hero photograph's gold pixels. The
warm bloom and the passing light in the hero are drawn through it, so they touch the
jewellery only. If the hero photograph changes, the mask has to be cut again to match.
