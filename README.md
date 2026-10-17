# Ranlanka · The gold of Lanka

The website for Ranlanka, twenty-two karat gold jewellery at 192 Main Street, Negombo.

It is a static site with no build step: plain HTML, CSS and JavaScript.

| File | What it is |
| --- | --- |
| `index.html` | Home: hero, promise, collections, design your own, rates, our pieces, visit, footer |
| `collection.html` | The collections: category tiles, filters, sort and the grid of pieces. `?c=rings` opens one category |
| `product.html` | One piece: gallery, gold colour and size, price estimate, details. `?p=rl-r01` picks the piece |
| `catalogue.js` | The pieces, categories, filters and the gold rate used for estimates |
| `styles.css` | Home styles, and the colours, type and buttons every page shares |
| `shop.css` | Styles for the collection and product pages |
| `main.js` | Home: menu, hero pointer drift, booking chips and the booking email |
| `shop.js` | Collection and product pages: filters, gallery and the viewing list |
| `fonts/` | Vonca, the display and text face (weights 200 to 700) |
| `images/` | The hero photograph and the jewellery cut-outs |
| `images/dummy/` | Placeholder photos for the catalogue, one drawing per category |

## Run it locally

Serve the folder with any static server, for example:

```sh
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Deploy

Upload the folder as-is to any static host (Vercel, Netlify, GitHub Pages, Cloudflare Pages). There is nothing to build.

## The catalogue

Every piece in `catalogue.js` is a sample, with a placeholder photo. To add the real stock:

1. Put the photos in `images/products/`, for example `rl-r01-1.webp`, `rl-r01-2.webp`. Portrait 4:5 works best.
2. In `catalogue.js`, edit the piece's name, weight, making charge and stones, and list its photos:
   `images: ['images/products/rl-r01-1.webp', 'images/products/rl-r01-2.webp']`.
   The first photo shows on the card and the second appears when you hover.
3. Change `RATE_22K` at the top of `catalogue.js` to update every price estimate at once.

Estimates are worked out as gold weight × rate, plus the making charge, plus the value of any stones.

The viewing list is Ranlanka's version of a shopping bag. Visitors save pieces to it, then send a viewing request by email with the pieces, their name, phone and preferred day. The list is kept in the visitor's browser.

## Notes

- The gold and exchange rates in `index.html` are sample figures. Update them in the `#rates` section.
- "Request my viewing" opens the visitor's email app with a message to ranlankanegombo@gmail.com, pre-filled with their choice, name, phone and day.
- The scroll stages (collections carousel, our pieces) use CSS scroll-driven animations. Browsers without them, and visitors who ask for reduced motion, get a static layout.
