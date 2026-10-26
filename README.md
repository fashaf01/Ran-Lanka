# Ranlanka

Next.js (App Router, TypeScript) site for Ranlanka, 22 karat gold jewellers on Main Street, Negombo. Built from the "Ranlanka website" design, on a black ground.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Pages

| Route | Page |
| --- | --- |
| `/` | Home |
| `/collection` (`?cat=nk\|bg\|er\|rg\|pd\|ch\|br\|ms`) | Collection, filter and sort |
| `/product/[id]` | A piece (all 49 are generated) |
| `/bridal` | Bridal edit and viewing request |
| `/bespoke` | Design your own |
| `/gold-rate` | Rate board, price calculator, exchange |
| `/about` | Our story |
| `/visit` | Open status, map, enquiry form |

## Where things are

- `src/app/globals.css`: tokens, page ground (`--paper` is `#000`), layout classes. The maroon and emerald velvet bands are `--maroon` and `--emerald` at the top of the file.
- `src/app/ranlanka.css`: the design system's component styles.
- `src/lib/site.ts`: sample gold rate, exchange rates, phone numbers. **Sample figures**; replace with a live feed.
- `src/lib/catalogue.ts`: the 49 pieces and 8 categories. Photographs are `public/img/<id>a.jpg` and `<id>b.jpg`.
- Forms (bridal, bespoke, visit) show their "thank you" state but do not send anything yet.
