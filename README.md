# Ranlanka · The gold of Lanka

The website for Ranlanka, twenty-two karat gold jewellery at 192 Main Street, Negombo.

It is a static site with no build step: plain HTML, CSS and JavaScript.

| File | What it is |
| --- | --- |
| `index.html` | The page: hero, promise, collections, design your own, rates, our pieces, visit, footer |
| `styles.css` | All styles, including the scroll-driven animations |
| `main.js` | Menu, hero pointer drift, booking chips and the booking email |
| `fonts/` | Vonca, the display and text face (weights 200 to 700) |
| `images/` | The hero photograph and the jewellery cut-outs |

## Run it locally

Serve the folder with any static server, for example:

```sh
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Deploy

Upload the folder as-is to any static host (Vercel, Netlify, GitHub Pages, Cloudflare Pages). There is nothing to build.

## Notes

- The gold and exchange rates in `index.html` are sample figures. Update them in the `#rates` section.
- "Request my viewing" opens the visitor's email app with a message to ranlankanegombo@gmail.com, pre-filled with their choice, name, phone and day.
- The scroll stages (collections carousel, our pieces) use CSS scroll-driven animations. Browsers without them, and visitors who ask for reduced motion, get a static layout.
