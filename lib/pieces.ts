// What the landing page shows: the pieces in the case, the gold rate and the bespoke example.
//
// THE PHOTOS ARE REAL; THE NAMES ARE NOT. Each piece is cut out of a photograph supplied
// from the old website, with its watermark taken off. The names and notes are written
// from what the photo shows; replace them with the real stock names.
// Cut-outs live in public/images/pieces/ and are named <collection>-<number>.webp.

export const RATE_22K = 39000; // LKR per gram, sample: change each morning
export const RATE_24K = 42500; // LKR per gram, sample
export const PAWN = 8; // grams

export const lkr = (n: number) => `LKR ${Math.round(n).toLocaleString('en-US')}`;

export type Cat = 'necklaces' | 'earrings' | 'pendants';
export const CATS: { key: Cat; name: string; one: string }[] = [
  { key: 'necklaces', name: 'Necklaces', one: 'Necklace' },
  { key: 'earrings', name: 'Earrings', one: 'Earrings' },
  { key: 'pendants', name: 'Pendants', one: 'Pendant' }
];

export type Piece = { id: string; cat: Cat; name: string; note: string; src: string; w: number; h: number };

// @generated pieces start
export const PIECES: Piece[] = [
  { id: 'necklaces-14', cat: 'necklaces', name: 'Leaf Spray Necklace', note: 'Curved leaves tipped with stones', src: '/images/pieces/necklaces-14.webp', w: 441, h: 395 },
  { id: 'pendants-13', cat: 'pendants', name: 'Sun Spiral Pendant', note: 'Rays turning around a spiral of stones', src: '/images/pieces/pendants-13.webp', w: 325, h: 340 },
  { id: 'earrings-12', cat: 'earrings', name: 'Blossom Studs', note: 'Five polished petals and a stone', src: '/images/pieces/earrings-12.webp', w: 449, h: 198 },
  { id: 'necklaces-16', cat: 'necklaces', name: 'Orchid Spray Necklace', note: 'An orchid on zigzag links', src: '/images/pieces/necklaces-16.webp', w: 352, h: 423 },
  { id: 'pendants-16', cat: 'pendants', name: 'Pavé Leaf Pendant', note: 'Two leaves folded into each other', src: '/images/pieces/pendants-16.webp', w: 222, h: 371 },
  { id: 'earrings-14', cat: 'earrings', name: 'Pavé Dome Studs', note: 'Small domes covered in stones', src: '/images/pieces/earrings-14.webp', w: 418, h: 186 },
  { id: 'necklaces-18', cat: 'necklaces', name: 'Branch Necklace', note: 'Branching stems and a pointed drop', src: '/images/pieces/necklaces-18.webp', w: 484, h: 424 },
  { id: 'pendants-12', cat: 'pendants', name: 'Starburst Pendant', note: 'Curling rays bursting from one point', src: '/images/pieces/pendants-12.webp', w: 260, h: 401 },
  { id: 'earrings-16', cat: 'earrings', name: 'Blue Stone Star Earrings', note: 'A blue stone in a four-pointed frame', src: '/images/pieces/earrings-16.webp', w: 474, h: 246 },
  { id: 'necklaces-12', cat: 'necklaces', name: 'Vine Necklace', note: 'Two vines that meet in a flower', src: '/images/pieces/necklaces-12.webp', w: 359, h: 391 },
  { id: 'pendants-15', cat: 'pendants', name: 'Sun Ray Pendant', note: 'Stone-set rays around a centre stone', src: '/images/pieces/pendants-15.webp', w: 333, h: 378 },
  { id: 'earrings-17', cat: 'earrings', name: 'Filigree Ball Studs', note: 'Granulated gold, worked by hand', src: '/images/pieces/earrings-17.webp', w: 354, h: 169 },
  { id: 'necklaces-19', cat: 'necklaces', name: 'Orchid Necklace', note: 'An orchid with a fringe of stones', src: '/images/pieces/necklaces-19.webp', w: 374, h: 405 },
  { id: 'pendants-14', cat: 'pendants', name: 'Radiant Star Pendant', note: 'Long rays from a bright centre', src: '/images/pieces/pendants-14.webp', w: 391, h: 405 },
  { id: 'earrings-13', cat: 'earrings', name: 'Rosette Studs', note: 'Layered petals in the shape of a rose', src: '/images/pieces/earrings-13.webp', w: 326, h: 166 },
  { id: 'necklaces-15', cat: 'necklaces', name: 'Loop Drop Necklace', note: 'A fine collar with a looped drop', src: '/images/pieces/necklaces-15.webp', w: 433, h: 420 },
  { id: 'pendants-17', cat: 'pendants', name: 'Stellar Pendant', note: 'A many-pointed star, set with stones', src: '/images/pieces/pendants-17.webp', w: 273, h: 333 },
  { id: 'necklaces-13', cat: 'necklaces', name: 'Feather Spray Necklace', note: 'A spray of feathers, set with stones', src: '/images/pieces/necklaces-13.webp', w: 421, h: 422 }
];
// @generated pieces end

export const BESPOKE = PIECES.find((p) => p.id === 'pendants-14') ?? PIECES[0];
