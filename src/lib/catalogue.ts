export type CategoryKey = "nk" | "bg" | "er" | "rg" | "pd" | "ch" | "br" | "ms";

export type Category = {
  key: CategoryKey | "all";
  name: string;
  /** Singular, as the piece is named on its tile. */
  kind?: string;
  plural: string;
  kicker: string;
  img: string;
  text: string;
  /** What the shop does to fit this kind of piece. */
  fit?: string;
};

export const CATEGORIES: Category[] = [
  { key: "all", name: "All", plural: "Gold jewellery.", kicker: "The collection", img: "/img/life-plain.jpg", text: "Every piece in the case, in 22 karat gold. Weighed in front of you and priced at the day’s rate." },
  { key: "nk", name: "Necklaces", kind: "Necklace", plural: "Necklaces.", kicker: "Necklaces", img: "/img/life-necklace.jpg", text: "Necklaces for the ceremony and for every day, from fine garlands to beaded collars.", fit: "Length adjusted at the counter" },
  { key: "bg", name: "Bangles", kind: "Bangle", plural: "Bangles.", kicker: "Bangles", img: "/img/cat-bg.jpg", text: "Single bangles and pairs. We size them on your wrist at the counter, by the dozen for a bride.", fit: "Sized on your wrist at the counter" },
  { key: "er", name: "Earrings", kind: "Earrings", plural: "Earrings.", kicker: "Earrings", img: "/img/cat-er.jpg", text: "Studs and drops, from a quiet stud to a bright pair for the wedding.", fit: "Tried on at the counter" },
  { key: "rg", name: "Rings", kind: "Ring", plural: "Rings.", kicker: "Rings", img: "/img/cat-rg.jpg", text: "Leaf, floral and beaded rings. Sized at the counter while you wait.", fit: "Sized at the counter while you wait" },
  { key: "pd", name: "Pendants", kind: "Pendant", plural: "Pendants.", kicker: "Pendants", img: "/img/cat-pd.jpg", text: "Pendants to wear alone or on a chain from the case, including Om and Ganesha designs.", fit: "Chain chosen at the counter" },
  { key: "ch", name: "Chains", kind: "Chain", plural: "Chains.", kicker: "Chains", img: "/img/cat-ch.jpg", text: "Foxtail, kamal and fine chains, alone or with a pendant.", fit: "Length cut at the counter" },
  { key: "br", name: "Bracelets", kind: "Bracelet", plural: "Bracelets.", kicker: "Bracelets", img: "/img/cat-br.jpg", text: "Fine bracelets with florals, charms and filigree.", fit: "Fitted at the counter" },
  { key: "ms", name: "Thali and mangalsutra", kind: "Mangalsutra", plural: "Thali and mangalsutra.", kicker: "For the wedding", img: "/img/cat-ms.jpg", text: "Mangalsutras in 22 karat gold. Ask us about thali chains made to your family’s design.", fit: "Made to your family’s design on request" },
];

export type Piece = {
  /** e.g. "nk3". Photographs are /img/<id>a.jpg and /img/<id>b.jpg. */
  id: string;
  cat: CategoryKey;
  name: string;
  /** In case order. */
  order: number;
  /** Piece number as the shop writes it, e.g. "RL NK3". */
  no: string;
  a: string;
  b: string;
};

const ROWS: Array<[string, CategoryKey, string]> = [
  ["nk1", "nk", "Charming Gold Necklace"], ["nk2", "nk", "Spellbinding Paisley Necklace"], ["nk3", "nk", "Regal Beaded Gold Necklace"], ["nk4", "nk", "Sculpted Fan Gold Necklace"], ["nk5", "nk", "Gilded Garland Gold Necklace"],
  ["bg1", "bg", "Minimalistic Gold Bangle"], ["bg2", "bg", "Slender Gold Bangles"], ["bg3", "bg", "Everlasting Grace Bangle"], ["bg4", "bg", "Twilight Hues Gold Bangle"], ["bg5", "bg", "Cosmic Lace Gold Bangle"], ["bg6", "bg", "Starlit Rhythm Gold Bangle"], ["bg7", "bg", "Twin Rail Gold Bangles"],
  ["er1", "er", "Floral Petite Gold Stud Earrings"], ["er2", "er", "Alluring Mesh Gold Drop Earrings"], ["er3", "er", "Subtle Leaf Gold Drop Earrings"], ["er4", "er", "Delicate Floral Drop Earrings"], ["er5", "er", "Sparkling Drop Earrings"], ["er6", "er", "Eccentric Gold Flowerbud Stud Earrings"], ["er7", "er", "Lovely Dual Toned Drop Earrings"], ["er8", "er", "Fluttering Wings Stud Earrings"],
  ["rg1", "rg", "Classic Leaf Patterned Finger Ring"], ["rg2", "rg", "Alluring Gold Beaded Finger Ring"], ["rg3", "rg", "Entrancing Leaf Pattern Gold Finger Ring"], ["rg4", "rg", "Glorious Floral Ring"], ["rg5", "rg", "Enchanting Traditional Gold Mesh Ring"],
  ["pd1", "pd", "Dainty Gold Pendant with Om and Ganesha Design"], ["pd2", "pd", "Surreal Gold Pendant"], ["pd3", "pd", "Intricate Floral Pattern Gold Pendant"], ["pd4", "pd", "Ethereal Ganpati Gold Pendant"], ["pd5", "pd", "Minimalistic Leaf Motif Gold Pendant"], ["pd6", "pd", "Refined Simplicity Pendant"], ["pd7", "pd", "Luminous Charm Pendant"], ["pd8", "pd", "Golden Flame Pendant"],
  ["ch1", "ch", "Sleek Gold Foxtail Chain"], ["ch2", "ch", "Sleek Gold Kamal Chain"], ["ch3", "ch", "Stylish Gold Chain"], ["ch4", "ch", "Minimal Style Chain"], ["ch5", "ch", "Slender Gold Chain"],
  ["br1", "br", "Petite Floral Bracelet"], ["br2", "br", "Aura Of Timeless Grace Bracelet"], ["br3", "br", "Nature-Inspired Gold Bracelet"], ["br4", "br", "Delicate Charms Bracelet"], ["br5", "br", "Contemporary Opulence Bracelet"], ["br6", "br", "Radiant Charms Bracelet"], ["br7", "br", "Intricate Grace Bracelet"], ["br8", "br", "Pyramid Elegance Gold Bracelet"],
  ["ms1", "ms", "Filigree Halo Gold Mangalsutra"], ["ms2", "ms", "Geometric Filigree Gold Mangalsutra"], ["ms3", "ms", "Sunrise Aura Gold Mangalsutra"],
];

export const PIECES: Piece[] = ROWS.map(([id, cat, name], order) => ({
  id,
  cat,
  name,
  order,
  no: `RL ${id.toUpperCase()}`,
  a: `/img/${id}a.jpg`,
  b: `/img/${id}b.jpg`,
}));

export const getCategory = (key: string) => CATEGORIES.find((c) => c.key === key);
export const getPiece = (id: string) => PIECES.find((p) => p.id === id);
export const countIn = (key: string) => (key === "all" ? PIECES.length : PIECES.filter((p) => p.cat === key).length);

/** Copy written for a piece the design describes. Anything else falls back to its category. */
export const PIECE_NOTES: Record<string, string> = {
  nk3: "Polished gold beads graduated toward the centre, on a fine chain. Try it on with your saree at the counter.",
};
