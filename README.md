# Ranlanka

Next.js (App Router, TypeScript) site for Ranlanka, 22 karat gold jewellers on Main Street, Negombo.
An antique dress: aged paper, sepia ink, oxblood and a dark gold, with cusped arches, a beaded lace
border, flourishes, a jaali lattice and a hallmark seal, all drawn in SVG. Cormorant Garamond for
titles, Pinyon Script for the line above them, Archivo for text and Abhaya Libre for Sinhala (all
self-hosted through `@fontsource`).

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Pages

| Route | Page |
| --- | --- |
| `/` | Home: a piece set over its name, the arcade of cases, favourites, bespoke, story, the counter, bridal, rates, visit |
| `/collection` | All 49 pieces, with sort |
| `/collection/[slug]` | One case: `necklaces`, `bangles`, `earrings`, `rings`, `pendants`, `chains`, `bracelets`, `thali` |
| `/product/[id]` | A piece (all 49 are generated) |
| `/bridal` | Bridal edit and viewing request |
| `/bespoke` | Sketch to gold, and a design request |
| `/gold-rate` | Gold rate, price calculator, old gold |
| `/exchange` | Money exchange rates and converter |
| `/about` | Our story |
| `/visit` | Address, opening hours (open now, Sri Lanka time), enquiry |

## Where things are

- `src/lib/data.ts`: gold rates, exchange rates, phone numbers, the 49 pieces, the 8 cases and the
  home slides. **The rates are sample figures**; replace them each morning or connect a live feed.
- `src/app/site.css`: all styles. Colour tokens are at the top (`--paper`, `--ink`, `--gold`, `--oxblood`),
  followed by the ornaments as data URIs (`--arch`, `--lace`, `--lattice`, `--grain`, `--flourish`).
- `src/components/Icons.tsx`: line icons, the lotus logo, the flourish and the seal.
  `src/components/ornaments.ts` holds the SVG sprite (lotus, flourish, arcade sketch) mounted in the layout.
- `src/components/SiteChrome.tsx`: header, menu, page curtain, smooth scrolling (Lenis), scroll
  animations, the home hero rotation, the carousels and the calculators. Pages are server-rendered; this wires them up.
- Photographs are `public/img/<id>a.webp` (the piece) and `<id>b.webp` (worn or a second view).
- The bridal, bespoke and visit forms prepare a message to copy or open in email; they do not send anything by themselves.
