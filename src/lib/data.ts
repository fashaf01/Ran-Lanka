// Shop data for the site. Rates are SAMPLE FIGURES: replace them with the morning's numbers
// (or a live feed) before relying on them.

export const PHONE = "031 222 2202";
export const PHONE_HREF = "tel:0312222202";
export const PHONE_2 = "031 223 8383";
export const EMAIL = "ranlankanegombo@gmail.com";
export const MAPS_URL = "https://www.google.com/maps/search/?api=1&query=Ranlanka%2C%20192%20Main%20Street%2C%20Negombo";

/** Gold, LKR per gram (sample). One pawn is 8 grams. */
export const RATE = { 22: 39000, 24: 42500 } as const;
export const PAWN_GRAMS = 8;

/** Money exchange, LKR per unit (sample): code, name, we buy, we sell. */
export const FX: [string, string, number, number][] = [
  ["USD", "US dollar", 297.4, 303.1],
  ["EUR", "Euro", 344.8, 352.6],
  ["GBP", "Pound sterling", 397.2, 406.5],
  ["AUD", "Australian dollar", 194.3, 199.8],
  ["AED", "UAE dirham", 80.7, 83.1],
  ["INR", "Indian rupee", 3.36, 3.52],
];

export type CatKey = "nk" | "bg" | "er" | "rg" | "pd" | "ch" | "br" | "ms";
export type Cat = { slug: string; name: string; kind: string; kicker: string; img: string; text: string; fit: string };

export const CATS: Record<CatKey, Cat> = {
  nk: { slug: "necklaces", name: "Necklaces", kind: "Necklace", kicker: "Necklaces", img: "life-necklace", text: "Necklaces for the ceremony and for every day, from fine garlands to beaded collars.", fit: "Length adjusted at the counter" },
  bg: { slug: "bangles", name: "Bangles", kind: "Bangle", kicker: "Bangles", img: "cat-bg", text: "Single bangles and pairs. We size them on your wrist at the counter, by the dozen for a bride.", fit: "Sized on your wrist at the counter" },
  er: { slug: "earrings", name: "Earrings", kind: "Earrings", kicker: "Earrings", img: "cat-er", text: "Studs and drops, from a quiet stud to a bright pair for the wedding.", fit: "Tried on at the counter" },
  rg: { slug: "rings", name: "Rings", kind: "Ring", kicker: "Rings", img: "cat-rg", text: "Leaf, floral and beaded rings. Sized at the counter while you wait.", fit: "Sized at the counter while you wait" },
  pd: { slug: "pendants", name: "Pendants", kind: "Pendant", kicker: "Pendants", img: "cat-pd", text: "Pendants to wear alone or on a chain from the case, including Om and Ganesha designs.", fit: "Chain chosen at the counter" },
  ch: { slug: "chains", name: "Chains", kind: "Chain", kicker: "Chains", img: "cat-ch", text: "Foxtail, kamal and fine chains, alone or with a pendant.", fit: "Length cut at the counter" },
  br: { slug: "bracelets", name: "Bracelets", kind: "Bracelet", kicker: "Bracelets", img: "cat-br", text: "Fine bracelets with florals, charms and filigree.", fit: "Fitted at the counter" },
  ms: { slug: "thali", name: "Thali and mangalsutra", kind: "Mangalsutra", kicker: "For the wedding", img: "cat-ms", text: "Mangalsutras in 22 karat gold. Ask us about thali chains made to your family’s design.", fit: "Made to your family’s design on request" },
};
export const CAT_KEYS = Object.keys(CATS) as CatKey[];
export const BY_SLUG: Record<string, CatKey> = Object.fromEntries(CAT_KEYS.map((k) => [CATS[k].slug, k]));

const ROWS: [string, string][] = [
  ["nk1", "Charming Gold Necklace"], ["nk2", "Spellbinding Paisley Necklace"], ["nk3", "Regal Beaded Gold Necklace"], ["nk4", "Sculpted Fan Gold Necklace"], ["nk5", "Gilded Garland Gold Necklace"],
  ["bg1", "Minimalistic Gold Bangle"], ["bg2", "Slender Gold Bangles"], ["bg3", "Everlasting Grace Bangle"], ["bg4", "Twilight Hues Gold Bangle"], ["bg5", "Cosmic Lace Gold Bangle"], ["bg6", "Starlit Rhythm Gold Bangle"], ["bg7", "Twin Rail Gold Bangles"],
  ["er1", "Floral Petite Gold Stud Earrings"], ["er2", "Alluring Mesh Gold Drop Earrings"], ["er3", "Subtle Leaf Gold Drop Earrings"], ["er4", "Delicate Floral Drop Earrings"], ["er5", "Sparkling Drop Earrings"], ["er6", "Eccentric Gold Flowerbud Stud Earrings"], ["er7", "Lovely Dual Toned Drop Earrings"], ["er8", "Fluttering Wings Stud Earrings"],
  ["rg1", "Classic Leaf Patterned Finger Ring"], ["rg2", "Alluring Gold Beaded Finger Ring"], ["rg3", "Entrancing Leaf Pattern Gold Finger Ring"], ["rg4", "Glorious Floral Ring"], ["rg5", "Enchanting Traditional Gold Mesh Ring"],
  ["pd1", "Dainty Gold Pendant with Om and Ganesha Design"], ["pd2", "Surreal Gold Pendant"], ["pd3", "Intricate Floral Pattern Gold Pendant"], ["pd4", "Ethereal Ganpati Gold Pendant"], ["pd5", "Minimalistic Leaf Motif Gold Pendant"], ["pd6", "Refined Simplicity Pendant"], ["pd7", "Luminous Charm Pendant"], ["pd8", "Golden Flame Pendant"],
  ["ch1", "Sleek Gold Foxtail Chain"], ["ch2", "Sleek Gold Kamal Chain"], ["ch3", "Stylish Gold Chain"], ["ch4", "Minimal Style Chain"], ["ch5", "Slender Gold Chain"],
  ["br1", "Petite Floral Bracelet"], ["br2", "Aura Of Timeless Grace Bracelet"], ["br3", "Nature-Inspired Gold Bracelet"], ["br4", "Delicate Charms Bracelet"], ["br5", "Contemporary Opulence Bracelet"], ["br6", "Radiant Charms Bracelet"], ["br7", "Intricate Grace Bracelet"], ["br8", "Pyramid Elegance Gold Bracelet"],
  ["ms1", "Filigree Halo Gold Mangalsutra"], ["ms2", "Geometric Filigree Gold Mangalsutra"], ["ms3", "Sunrise Aura Gold Mangalsutra"],
];

export type Piece = { id: string; name: string; order: number; cat: CatKey; no: string };
export const PIECES: Piece[] = ROWS.map(([id, name], order) => ({ id, name, order, cat: id.slice(0, 2) as CatKey, no: "RL " + id.toUpperCase() }));
export const PIECE_BY_ID: Record<string, Piece> = Object.fromEntries(PIECES.map((p) => [p.id, p]));
export const NOTES: Record<string, string> = { nk3: "Polished gold beads graduated toward the centre, on a fine chain. Try it on at the counter." };
export const countIn = (k: CatKey) => PIECES.filter((p) => p.cat === k).length;

export const HOME_FAV = ["nk3", "ch1", "bg5", "rg2", "pd4", "br7", "er2", "ms3"];
export const BRIDAL = ["nk5", "nk3", "nk4", "bg6", "bg4", "ms1", "ms2", "ms3"];

/** Home hero: one piece at a time, set over its name, beside a photograph. Images live in public/img. */
export const HERO_SLIDES = [
  { id: "nk5", name: "Gilded Garland", kind: "Necklace", ghost: ["Gilded", "Garland"], img: "bride", pos: "50% 20%", alt: "A bride wearing a layered gold necklace and choker", cap: "The bridal trays", cta: "View the bridal edit", href: "/bridal" },
  { id: "bg5", name: "Cosmic Lace", kind: "Bangle", ghost: ["Cosmic", "Lace"], img: "hands-bangles", pos: "50% 50%", alt: "A bride's hands with stacked gold bangles, rings and jasmine", cap: "Sized on the wrist", cta: "Shop bangles", href: "/collection/bangles" },
  { id: "er2", name: "Alluring Mesh", kind: "Drop earrings", ghost: ["Alluring", "Mesh"], img: "er3b", pos: "50% 40%", alt: "A woman wearing gold leaf drop earrings", cap: "Studs and drops", cta: "Shop earrings", href: "/collection/earrings" },
  { id: "pd4", name: "Ethereal Ganpati", kind: "Pendant", ghost: ["Ethereal", "Ganpati"], img: "pd1b", pos: "50% 36%", alt: "A man wearing a gold pendant on a chain", cap: "Om and Ganesha designs", cta: "Shop pendants", href: "/collection/pendants" },
];

export const money = (n: number) => Math.round(n).toLocaleString("en-US");
