# Ranlanka · The gold of Lanka

The website for Ranlanka, twenty-two karat gold jewellery at 192 Main Street, Negombo.

It is a [Next.js](https://nextjs.org) app (App Router, TypeScript). Every page is generated
as static HTML at build time, so it is fast and cheap to host.

## Pages

| Route | What it is |
| --- | --- |
| `/` | Home: the lit hero, new pieces, categories, bestsellers, shop the look, design your own, gold rates, Instagram, services |
| `/shop`, `/shop/[collection]` | All jewellery, one of the six collections, or the Bridal edit, with filters (stone, occasion, gold colour, price) and sorting |
| `/product/[id]` | One piece: gallery (piece, close up, as worn), gold colour and size, price breakdown, details |
| `/about` | Our story, the showroom, how we work, design your own, and visiting with a viewing request |
| `/exchange` | Money exchange: how it works and the day's rates (sample figures until real ones are entered) |
| `/checkout` | Contact, delivery or collection, and payment. **Design only:** nothing is sent and no payment is taken |
| `/wishlist` | Pieces saved with the heart, kept on the visitor’s device |

## Where things live

| Path | What it is |
| --- | --- |
| `lib/catalogue.ts` | The pieces, collections, sizes and the gold rate used for every price |
| `lib/rates.ts` | The money-exchange rates shown on `/exchange` |
| `lib/store.tsx` | The bag and wishlist, kept in the browser’s local storage |
| `components/` | Header, footer, product card, rails, bag drawer, and the home, shop, product, about and checkout pieces |
| `app/globals.css` | All styles: colours, type, buttons and every section |
| `app/fonts/` | Vonca, the display face, used for headlines and titles only |
| `public/images/products/` | The 46 product photographs, named `<collection>-<number>.jpg` |
| `public/images/showroom/`, `exchange/` | The showroom and money-exchange photographs |
| `public/images/logo.png` | The Ranlanka logo, as supplied |
| `public/images/` | The hero photograph, its gold mask, crops of it, and a few cut-outs used on the coloured tiles |

Type: **Vonca** is kept for headlines, page titles, large figures and the wordmark.
Everything people need to read (body, prices, labels, forms) is set in **Manrope**.

## Run it locally

```sh
npm install
npm run dev
```

Then open http://localhost:3000. `npm run build` makes the production build.

## Deploy

Vercel builds it with the Next.js preset; there is nothing else to configure.

## The photographs

The product, showroom, money-exchange and logo images come from the shop's previous website
(ranlankanegombo.com) and are used with the owner's permission. They are the originals,
unedited. Two things to know:

- They are 640 pixels wide and carry a large RANLANKA watermark, so they look soft on big
  screens. Higher-resolution originals, ideally without the watermark, would lift the whole
  site. Drop them in with the same file names and nothing else changes.
- The showroom photographs are 200 pixels square, so they are shown small.

## The catalogue

One piece per product photograph. **The photos are real but every name, weight, making
charge, stone and "added" date in `lib/catalogue.ts` is a placeholder** written from what
the photo shows, so every price on the site is a sample. Stones are described only as they
look ("white stones", "red stone", "blue stone"); set the exact stone once it is known.

To use the real stock details, edit each piece in `lib/catalogue.ts`: its name, `weight`
(grams of 22K gold), `making` (making charge, per cent of the gold value), `stones` and
`stoneValue`. To add a piece, copy one photo to `public/images/products/` and add a line in
the matching group. Change `RATE_22K` and `RATE_24K` each morning, or connect them to
wherever the counter posts the day's rate.

## The hero glow

`public/images/hero-gold-mask.png` is a mask cut from the hero photograph’s gold pixels. The
warm bloom and the passing light in the hero are drawn through it, so they touch the
jewellery only. If the hero photograph changes, the mask has to be cut again to match.
