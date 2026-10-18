# Ranlanka · The gold of Lanka

The website for Ranlanka, twenty-two karat gold jewellery at 192 Main Street, Negombo.

It is a [Next.js](https://nextjs.org) app (App Router, TypeScript). Every page is generated
as static HTML at build time, so it is fast and cheap to host.

## Pages

| Route | What it is |
| --- | --- |
| `/` | Home: the lit hero, new pieces, categories, bestsellers, shop the look, design your own, gold rates, Instagram, services |
| `/shop`, `/shop/[category]` | All jewellery or one category, with filters (stone, occasion, gold colour, price) and sorting |
| `/product/[id]` | One piece: gallery (piece, close up, as worn), gold colour and size, price breakdown, details |
| `/about` | Our story, how we work, design your own, and visiting the showroom with a viewing request |
| `/checkout` | Contact, delivery or collection, and payment. **Design only:** nothing is sent and no payment is taken |
| `/wishlist` | Pieces saved with the heart, kept on the visitor’s device |

## Where things live

| Path | What it is |
| --- | --- |
| `lib/catalogue.ts` | The pieces, categories, sizes and the gold rate used for every price |
| `lib/store.tsx` | The bag and wishlist, kept in the browser’s local storage |
| `components/` | Header, footer, product card, rails, bag drawer, and the home, shop, product, about and checkout pieces |
| `app/globals.css` | All styles: colours, type, buttons and every section |
| `app/fonts/` | Vonca, the display face, used for headlines and titles only |
| `public/images/` | The hero photograph, its gold mask, crops of it, and the jewellery cut-outs |

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

## The catalogue

Every piece in `lib/catalogue.ts` is a sample. Pieces without a photo show a drawn
placeholder. To add the real stock:

1. Put the photos in `public/images/products/`, for example `rl-r01-1.webp`. A cut-out on a
   transparent background looks best on the grey tiles.
2. In `lib/catalogue.ts`, edit the piece’s name, weight, making charge and stones, and list
   its photos, for example `images: ['/images/products/rl-r01-1.webp']`.
3. Change `RATE_22K` and `RATE_24K` each morning, or connect them to wherever the
   counter posts the day’s rate.

## The hero glow

`public/images/hero-gold-mask.png` is a mask cut from the hero photograph’s gold pixels. The
warm bloom and the passing light in the hero are drawn through it, so they touch the
jewellery only. If the hero photograph changes, the mask has to be cut again to match.
