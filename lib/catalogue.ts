// The Ranlanka catalogue. Every piece here is a SAMPLE: replace the names, weights
// and photos with the real stock. Photos live in public/images/; list a piece's
// photos in `images`. Pieces without a photo show a drawn placeholder.

export const RATE_22K = 39000; // LKR per gram, sample
export const RATE_24K = 42500; // LKR per gram, sample
export const PAWN = 8; // grams

export type CategoryKey =
  | 'bangles' | 'necklaces' | 'earrings' | 'rings' | 'pendants' | 'bracelets' | 'chains' | 'bridal';
export type Metal = 'yellow' | 'rose' | 'two';
export type Stone = 'diamond' | 'ruby' | 'emerald' | 'sapphire' | 'pearl';
export type Style = 'bridal' | 'everyday' | 'kandyan' | 'gifts' | 'children' | 'men';

export type Category = { key: CategoryKey; name: string; lede: string; cover?: string };

export const CATEGORIES: Category[] = [
  { key: 'necklaces', name: 'Necklaces', lede: 'Fine chains, sprays and chokers, for weddings and for every day.', cover: '/images/leaf-necklace.webp' },
  { key: 'earrings', name: 'Earrings', lede: 'Studs, stars, jhumkas and drops.', cover: '/images/star-earrings.webp' },
  { key: 'bangles', name: 'Bangles', lede: 'Openwork cuffs, kadas and slim bangles for every day.', cover: '/images/openwork-cuff.webp' },
  { key: 'rings', name: 'Rings', lede: 'Rubies, stones and plain bands.', cover: '/images/ruby-ring.webp' },
  { key: 'pendants', name: 'Pendants', lede: 'Suns, stars, leaves and traditional pendants.', cover: '/images/sun-pendant.webp' },
  { key: 'bracelets', name: 'Bracelets', lede: 'Slim chains, line bracelets and pieces for little wrists.', cover: '/images/star-bracelet-diag.webp' },
  { key: 'chains', name: 'Chains', lede: 'Rope, box and curb chains, priced by weight.' },
  { key: 'bridal', name: 'Bridal sets', lede: 'Kandyan and temple sets, made for your wedding day.', cover: '/images/look-bride.webp' }
];

export const categoryOf = (key: string) => CATEGORIES.find((c) => c.key === key);

export const METALS: Record<Metal, { name: string; swatch: string }> = {
  yellow: { name: 'Yellow gold', swatch: '#D9B46A' },
  rose: { name: 'Rose gold', swatch: '#D7A08A' },
  two: { name: 'Two-tone', swatch: 'linear-gradient(135deg,#D9B46A 50%,#D8D8D6 50%)' }
};

export const STONES: Record<Stone | 'plain', string> = {
  plain: 'Plain gold', diamond: 'Diamond', ruby: 'Ruby', emerald: 'Emerald', sapphire: 'Sapphire', pearl: 'Pearl'
};

export const STYLES: Record<Style, string> = {
  bridal: 'Bridal', everyday: 'Every day', kandyan: 'Kandyan tradition', gifts: 'Gifts', children: 'For children', men: 'For him'
};

export const SIZES: Partial<Record<CategoryKey, { name: string; values: string[] }>> = {
  rings: { name: 'Ring size', values: ['5', '6', '7', '8', '9', '10', '11', '12'] },
  bangles: { name: 'Bangle size', values: ['2.2', '2.4', '2.6', '2.8', '2.10'] },
  bracelets: { name: 'Length', values: ['6.5 in', '7 in', '7.5 in'] },
  chains: { name: 'Length', values: ['16 in', '18 in', '20 in', '22 in', '24 in'] }
};

export type Product = {
  id: string;
  cat: CategoryKey;
  name: string;
  weight: number; // grams of 22K gold
  making: number; // making charge, % of the gold value
  stoneValue: number; // LKR
  stones: Stone[];
  style: Style[];
  metals: Metal[];
  added: string;
  badge?: 'New' | 'Bestseller' | 'Made to order';
  bestseller?: boolean;
  images: string[];
  about: string;
};

type Draft = Omit<Product, 'stoneValue' | 'stones' | 'style' | 'metals' | 'images'> & Partial<Product>;
const piece = (p: Draft): Product => ({ stoneValue: 0, stones: [], style: [], metals: ['yellow'], images: [], ...p });

export const PRODUCTS: Product[] = [
  piece({ id: 'rl-b01', cat: 'bangles', name: 'Lotus Openwork Bangle', weight: 18.6, making: 14, stones: ['diamond'], stoneValue: 48000, style: ['everyday', 'gifts'], metals: ['yellow', 'rose'], added: '2026-09-28', badge: 'New', images: ['/images/lotus-bangle.webp'], about: 'A broad bangle of lotus petals cut by hand from a single sheet of gold, with small stones along the rims.' }),
  piece({ id: 'rl-b02', cat: 'bangles', name: 'Filigree Scroll Cuff', weight: 24.0, making: 16, stones: ['diamond'], stoneValue: 65000, style: ['bridal', 'kandyan'], added: '2026-06-12', bestseller: true, images: ['/images/openwork-cuff.webp'], about: 'A deep cuff of scrolling filigree, opened at the back so it slips on easily, made for the wedding day and long after.' }),
  piece({ id: 'rl-b03', cat: 'bangles', name: 'Wave Cuff with Stones', weight: 14.2, making: 13, stones: ['diamond'], stoneValue: 52000, style: ['gifts', 'everyday'], added: '2026-08-04', bestseller: true, images: ['/images/stone-cuff.webp'], about: 'An open cuff that curls into a wave at the front, set with a spiral of small stones.' }),
  piece({ id: 'rl-b04', cat: 'bangles', name: 'Slim Everyday Bangles, pair', weight: 9.8, making: 10, style: ['everyday'], metals: ['yellow', 'rose', 'two'], added: '2026-03-02', about: 'Two plain, polished bangles to wear together or apart.' }),

  piece({ id: 'rl-n01', cat: 'necklaces', name: 'Leaf Spray Necklace', weight: 16.4, making: 14, stones: ['diamond'], stoneValue: 42000, style: ['everyday', 'gifts'], added: '2026-09-10', badge: 'New', bestseller: true, images: ['/images/leaf-necklace.webp'], about: 'A fine chain gathered into a spray of curved gold leaves, each tipped with a small stone.' }),
  piece({ id: 'rl-n02', cat: 'necklaces', name: 'Orchid Necklace', weight: 11.8, making: 15, stones: ['diamond'], stoneValue: 58000, style: ['gifts', 'bridal'], metals: ['yellow', 'two'], added: '2026-07-21', images: ['/images/flower-necklace.webp'], about: 'An orchid in openwork gold, falling into a short fringe of stones from a fine chain.' }),
  piece({ id: 'rl-n03', cat: 'necklaces', name: 'Vine Necklace', weight: 13.5, making: 14, stones: ['diamond'], stoneValue: 36000, style: ['everyday', 'gifts'], added: '2026-08-18', bestseller: true, images: ['/images/vine-necklace.webp'], about: 'Two gold vines that meet at the front and end in a small flower.' }),
  piece({ id: 'rl-n04', cat: 'necklaces', name: 'Emerald Choker', weight: 38.5, making: 16, stones: ['emerald'], stoneValue: 180000, style: ['bridal'], added: '2026-05-18', about: 'A close-fitting choker of gold and emeralds, finished with a gold cord at the back.' }),
  piece({ id: 'rl-n05', cat: 'necklaces', name: 'Kandyan Bridal Necklace', weight: 62.0, making: 18, stones: ['ruby'], stoneValue: 140000, style: ['bridal', 'kandyan'], added: '2026-04-09', badge: 'Made to order', about: 'A traditional Kandyan bridal necklace of graduated gold plaques, set with rubies.' }),

  piece({ id: 'rl-e01', cat: 'earrings', name: 'Star Flower Studs', weight: 3.1, making: 12, stones: ['diamond'], stoneValue: 14000, style: ['everyday', 'gifts'], added: '2026-09-02', bestseller: true, images: ['/images/star-earrings.webp'], about: 'Pointed petals around a single small stone, on a secure screw back.' }),
  piece({ id: 'rl-e02', cat: 'earrings', name: 'Blossom Studs', weight: 3.6, making: 12, stones: ['diamond'], stoneValue: 12000, style: ['everyday', 'gifts', 'children'], metals: ['yellow', 'rose'], added: '2026-09-22', badge: 'New', images: ['/images/flower-earrings.webp'], about: 'Five rounded petals, polished to a mirror, with a stone at the heart.' }),
  piece({ id: 'rl-e03', cat: 'earrings', name: 'Pavé Dome Studs', weight: 4.8, making: 14, stones: ['diamond'], stoneValue: 46000, style: ['gifts', 'bridal'], added: '2026-08-15', bestseller: true, images: ['/images/dome-earrings.webp'], about: 'Small domes of gold covered in stones, catching light from every side.' }),
  piece({ id: 'rl-e04', cat: 'earrings', name: 'Temple Jhumkas', weight: 11.6, making: 15, stones: ['ruby'], stoneValue: 18000, style: ['bridal'], added: '2026-06-30', about: 'Bell-shaped jhumkas with a fringe of gold beads, in the temple style.' }),
  piece({ id: 'rl-e05', cat: 'earrings', name: 'Sapphire Drop Earrings', weight: 5.4, making: 13, stones: ['sapphire'], stoneValue: 75000, style: ['gifts'], metals: ['yellow', 'two'], added: '2026-07-15', about: 'A single Ceylon blue sapphire hanging from a small gold stud.' }),

  piece({ id: 'rl-r01', cat: 'rings', name: 'Ruby Solitaire Ring', weight: 4.2, making: 12, stones: ['ruby', 'diamond'], stoneValue: 45000, style: ['gifts', 'bridal'], added: '2026-09-20', badge: 'New', bestseller: true, images: ['/images/ruby-ring.webp'], about: 'A round ruby held high in four claws, with small stones down each shoulder.' }),
  piece({ id: 'rl-r02', cat: 'rings', name: 'Plain Wedding Band', weight: 5.0, making: 10, style: ['bridal', 'everyday'], metals: ['yellow', 'rose'], added: '2026-01-15', about: 'A comfort-fit band, polished inside and out.' }),
  piece({ id: 'rl-r03', cat: 'rings', name: 'Diamond Half-Eternity Ring', weight: 3.8, making: 14, stones: ['diamond'], stoneValue: 160000, style: ['bridal', 'gifts'], metals: ['yellow', 'two'], added: '2026-07-03', about: 'Small diamonds set halfway around a fine band.' }),
  piece({ id: 'rl-r04', cat: 'rings', name: 'Signet Ring', weight: 8.4, making: 11, style: ['men'], added: '2026-05-05', about: 'A heavy signet with a flat face, ready to engrave with an initial.' }),

  piece({ id: 'rl-p01', cat: 'pendants', name: 'Sun Spiral Pendant', weight: 4.6, making: 13, stones: ['diamond'], stoneValue: 22000, style: ['everyday', 'gifts'], added: '2026-08-26', bestseller: true, images: ['/images/sun-pendant.webp'], about: 'Rays of gold turning around a spiral of small stones.' }),
  piece({ id: 'rl-p02', cat: 'pendants', name: 'Starburst Pendant', weight: 5.2, making: 14, stones: ['diamond'], stoneValue: 26000, style: ['gifts'], added: '2026-09-14', badge: 'New', images: ['/images/burst-pendant.webp'], about: 'Long, curling rays of gold, some set with stones, bursting from a single point.' }),
  piece({ id: 'rl-p03', cat: 'pendants', name: 'Pavé Leaf Pendant', weight: 3.9, making: 13, stones: ['diamond'], stoneValue: 30000, style: ['gifts', 'everyday'], added: '2026-06-08', images: ['/images/leaf-pendant.webp'], about: 'Two gold leaves folded into each other, the outer one set with stones.' }),
  piece({ id: 'rl-p04', cat: 'pendants', name: 'Pancha Ayudha Pendant', weight: 2.4, making: 12, style: ['children', 'kandyan', 'gifts'], added: '2026-03-27', about: 'The traditional five-weapon pendant, given to children for protection.' }),
  piece({ id: 'rl-p05', cat: 'pendants', name: 'Initial Pendant', weight: 2.8, making: 12, style: ['gifts', 'children'], added: '2026-09-30', badge: 'Made to order', about: 'Any letter, cut in gold. Tell us the initial when you order.' }),

  piece({ id: 'rl-l01', cat: 'bracelets', name: 'Star Link Bracelet', weight: 4.4, making: 12, style: ['everyday', 'gifts'], added: '2026-07-14', bestseller: true, images: ['/images/star-bracelet-diag.webp'], about: 'A fine chain with a small gold star every few links.' }),
  piece({ id: 'rl-l02', cat: 'bracelets', name: 'Baby Bracelets, pair', weight: 3.2, making: 10, style: ['children', 'gifts'], added: '2026-04-22', about: 'Two small bracelets with an adjustable clasp, for a baby’s first year.' }),
  piece({ id: 'rl-l03', cat: 'bracelets', name: 'Diamond Line Bracelet', weight: 9.6, making: 15, stones: ['diamond'], stoneValue: 420000, style: ['bridal', 'gifts'], metals: ['yellow', 'two'], added: '2026-08-09', about: 'A single, unbroken line of diamonds in gold settings.' }),
  piece({ id: 'rl-l04', cat: 'bracelets', name: 'Curb Bracelet', weight: 18.0, making: 10, style: ['men'], added: '2026-02-28', about: 'Flat curb links with a box clasp and safety catch.' }),

  piece({ id: 'rl-c01', cat: 'chains', name: 'Fine Rope Chain', weight: 6.4, making: 9, style: ['everyday'], added: '2026-05-29', about: 'A twisted rope chain that sits well on its own or with a pendant.' }),
  piece({ id: 'rl-c02', cat: 'chains', name: 'Box Chain, one pawn', weight: 8.0, making: 9, style: ['everyday', 'gifts'], added: '2026-01-30', about: 'A square box chain weighing one pawn at 18 inches.' }),
  piece({ id: 'rl-c03', cat: 'chains', name: 'Thali Kodi Chain', weight: 24.0, making: 11, style: ['bridal'], added: '2026-06-19', about: 'A heavy wedding chain made to carry the thali.' }),
  piece({ id: 'rl-c04', cat: 'chains', name: 'Heavy Curb Chain', weight: 40.0, making: 10, style: ['men'], added: '2026-03-12', about: 'Five pawn of solid curb links.' }),

  piece({ id: 'rl-s01', cat: 'bridal', name: 'Kandyan Seven-Tier Set', weight: 120.0, making: 18, stones: ['ruby'], stoneValue: 220000, style: ['bridal', 'kandyan'], added: '2026-09-05', badge: 'Made to order', about: 'The full Kandyan bride’s set: a seven-tier necklace, earrings and a pair of kadas.' }),
  piece({ id: 'rl-s02', cat: 'bridal', name: 'Emerald Bridal Set', weight: 86.0, making: 17, stones: ['emerald'], stoneValue: 350000, style: ['bridal'], added: '2026-07-27', about: 'A choker and long necklace with matching earrings, set with emeralds.' }),
  piece({ id: 'rl-s03', cat: 'bridal', name: 'Ruby Temple Set', weight: 72.0, making: 17, stones: ['ruby'], stoneValue: 160000, style: ['bridal'], added: '2026-05-11', about: 'A temple necklace, jhumkas and a maang tikka, set with rubies.' }),
  piece({ id: 'rl-s04', cat: 'bridal', name: 'Light Bridal Set', weight: 38.0, making: 15, style: ['bridal'], added: '2026-08-31', badge: 'New', about: 'A lighter necklace and earring set in plain gold, for the homecoming or a smaller wedding.' })
];

export const productOf = (id: string) => PRODUCTS.find((p) => p.id === id);

export const priceOf = (p: Product) => {
  const gold = p.weight * RATE_22K;
  const making = (gold * p.making) / 100;
  return { gold, making, stones: p.stoneValue, total: Math.round((gold + making + p.stoneValue) / 100) * 100 };
};

export const lkr = (n: number) => 'LKR ' + Math.round(n).toLocaleString('en-US');

// Pieces with a real photo first, then newest first.
export const byShowcase = (a: Product, b: Product) =>
  Number(b.images.length > 0) - Number(a.images.length > 0) || b.added.localeCompare(a.added);

export const newIn = () => [...PRODUCTS].filter((p) => p.images.length).sort((a, b) => b.added.localeCompare(a.added)).slice(0, 10);
export const bestsellers = (cat?: CategoryKey) => PRODUCTS.filter((p) => p.bestseller && (!cat || p.cat === cat));
export const related = (p: Product) =>
  [
    ...PRODUCTS.filter((o) => o.id !== p.id && o.cat === p.cat).sort(byShowcase),
    ...PRODUCTS.filter((o) => o.cat !== p.cat && o.images.length).sort(byShowcase)
  ].slice(0, 8);
