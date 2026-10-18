// The Ranlanka catalogue: one entry for each photograph supplied from the old website.
//
// THE PHOTOS ARE REAL; THE FIGURES ARE NOT. Every name, weight, making charge, stone
// value and "added" date below is a placeholder written from the photograph. Replace
// them with the real stock details. Stones are described by what shows in the photo
// ("white stones", "red stone"); set the exact stone once it is known.
// Photos live in public/images/products/ and are named <collection>-<number>.jpg.

export const RATE_22K = 39000; // LKR per gram, sample
export const RATE_24K = 42500; // LKR per gram, sample
export const PAWN = 8; // grams

export type CategoryKey = 'bangles' | 'necklaces' | 'earrings' | 'rings' | 'pendants' | 'bracelets';
export type Metal = 'yellow' | 'two';
export type Stone = 'clear' | 'red' | 'blue';
export type Style = 'bridal' | 'everyday' | 'gifts' | 'men';

export type Collection = { key: string; name: string; lede: string };
export type Category = Collection & { key: CategoryKey };

// The six collections of the shop, in the order they are shown.
export const CATEGORIES: Category[] = [
  { key: 'necklaces', name: 'Necklaces', lede: 'Fine chains, sprays and collars, for weddings and for every day.' },
  { key: 'earrings', name: 'Earrings', lede: 'Studs, stars, flowers and temple jhumkas.' },
  { key: 'bangles', name: 'Bangles', lede: 'Openwork cuffs and slim hinged bangles.' },
  { key: 'rings', name: 'Rings', lede: 'Stone-set rings, eternity bands and plain wedding bands.' },
  { key: 'pendants', name: 'Pendants', lede: 'Suns, stars and leaves in twenty-two karat gold.' },
  { key: 'bracelets', name: 'Bracelets', lede: 'Curb, mesh and fine chain bracelets for every wrist.' }
];

// A curated edit that runs across the collections.
export const EDITS: Collection[] = [
  { key: 'bridal', name: 'Bridal', lede: 'Pieces chosen for the wedding day: necklaces, earrings, bangles and bands.' }
];

export const categoryOf = (key: string) => CATEGORIES.find((c) => c.key === key);
export const collectionOf = (key: string): Collection | undefined => categoryOf(key) ?? EDITS.find((e) => e.key === key);

export const METALS: Record<Metal, { name: string; swatch: string }> = {
  yellow: { name: 'Yellow gold', swatch: '#D9B46A' },
  two: { name: 'Two-tone', swatch: 'linear-gradient(135deg,#D9B46A 50%,#D8D8D6 50%)' }
};

export const STONES: Record<Stone | 'plain', string> = {
  plain: 'Plain gold', clear: 'White stones', red: 'Red stone', blue: 'Blue stone'
};

export const STYLES: Record<Style, string> = {
  bridal: 'Bridal', everyday: 'Every day', gifts: 'Gifts', men: 'For him'
};

export const SIZES: Partial<Record<CategoryKey, { name: string; values: string[] }>> = {
  rings: { name: 'Ring size', values: ['5', '6', '7', '8', '9', '10', '11', '12'] },
  bangles: { name: 'Bangle size', values: ['2.2', '2.4', '2.6', '2.8', '2.10'] },
  bracelets: { name: 'Length', values: ['6.5 in', '7 in', '7.5 in'] }
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

const photo = (cat: CategoryKey, n: number) => `/images/products/${cat}-${n}.jpg`;
type Draft = Omit<Product, 'id' | 'stoneValue' | 'stones' | 'style' | 'metals' | 'images' | 'cat'> & Partial<Product>;
// id: rl-<letter><photo number>, for example rl-n14 is necklaces-14.jpg
const piece = (cat: CategoryKey, letter: string, n: number, p: Draft): Product => ({
  id: `rl-${letter}${n}`, cat, stoneValue: 0, stones: [], style: [], metals: ['yellow'], images: [photo(cat, n)], ...p
});

const b = (n: number, p: Draft) => piece('bangles', 'b', n, p);
const l = (n: number, p: Draft) => piece('bracelets', 'l', n, p);
const e = (n: number, p: Draft) => piece('earrings', 'e', n, p);
const nk = (n: number, p: Draft) => piece('necklaces', 'n', n, p);
const pd = (n: number, p: Draft) => piece('pendants', 'p', n, p);
const r = (n: number, p: Draft) => piece('rings', 'r', n, p);

export const PRODUCTS: Product[] = [
  b(12, { name: 'Leaf Openwork Cuff', weight: 22.0, making: 15, stones: ['clear'], stoneValue: 52000, style: ['everyday', 'gifts'], added: '2026-09-26', about: 'A wide cuff of long, sweeping leaves in openwork gold, set with small stones along each stem.' }),
  b(13, { name: 'Peacock Crest Bangle', weight: 14.0, making: 14, stones: ['clear'], stoneValue: 38000, style: ['gifts', 'bridal'], added: '2026-08-12', about: 'A slim hinged bangle that rises into a crest of curved gold feathers and a cluster of small stones.' }),
  b(14, { name: 'Plume Bangle', weight: 12.5, making: 13, stones: ['clear'], stoneValue: 34000, style: ['everyday', 'gifts'], added: '2026-07-30', about: 'A hinged bangle with a fan of gold plumes and a spray of small stones.' }),
  b(15, { name: 'Windmill Bangle', weight: 11.0, making: 13, stones: ['clear'], stoneValue: 30000, style: ['gifts'], added: '2026-06-20', about: 'Four open gold petals turn around a central stone on a slim hinged band.' }),
  b(16, { name: 'Filigree Scroll Cuff', weight: 24.0, making: 16, stones: ['clear'], stoneValue: 65000, style: ['bridal'], added: '2026-06-12', bestseller: true, about: 'A deep cuff of scrolling filigree with small stones, made for the wedding day and long after.' }),
  b(17, { name: 'Wave Cuff with Stones', weight: 14.2, making: 13, stones: ['clear'], stoneValue: 52000, style: ['gifts', 'everyday'], added: '2026-08-04', bestseller: true, about: 'An open cuff that curls into a wave at the front, set with a spiral of small stones.' }),
  b(18, { name: 'Garden Openwork Bangle', weight: 19.0, making: 14, stones: ['clear'], stoneValue: 44000, style: ['bridal', 'gifts'], added: '2026-09-02', about: 'A broad bangle of crossing leaves in openwork gold, scattered with small stones.' }),
  b(19, { name: 'Lotus Openwork Bangle', weight: 18.6, making: 14, stones: ['clear'], stoneValue: 48000, style: ['everyday', 'gifts'], added: '2026-09-28', badge: 'New', bestseller: true, about: 'A hinged bangle with a fan of lotus petals cut from gold and small stones in the gaps.' }),

  nk(12, { name: 'Vine Necklace', weight: 13.5, making: 14, stones: ['clear'], stoneValue: 36000, style: ['everyday', 'gifts'], added: '2026-08-18', bestseller: true, about: 'Two gold vines that meet at the front and end in a small flower.' }),
  nk(13, { name: 'Feather Spray Necklace', weight: 15.0, making: 14, stones: ['clear'], stoneValue: 40000, style: ['gifts'], added: '2026-07-05', about: 'A fine chain that gathers into a spray of gold feathers set with small stones.' }),
  nk(14, { name: 'Leaf Spray Necklace', weight: 16.4, making: 14, stones: ['clear'], stoneValue: 42000, style: ['everyday', 'gifts'], added: '2026-09-10', badge: 'New', bestseller: true, about: 'A fine chain gathered into a spray of curved gold leaves, each tipped with a small stone.' }),
  nk(15, { name: 'Loop Drop Necklace', weight: 14.0, making: 13, style: ['everyday', 'gifts'], added: '2026-06-02', about: 'A fine collar that falls into a looped gold drop.' }),
  nk(16, { name: 'Orchid Spray Necklace', weight: 17.0, making: 14, stones: ['clear'], stoneValue: 38000, style: ['bridal', 'gifts'], added: '2026-07-25', about: 'An orchid in openwork gold on a chain of small zigzag links.' }),
  nk(17, { name: 'Crescent Collar Necklace', weight: 22.0, making: 15, stones: ['clear'], stoneValue: 48000, style: ['bridal'], added: '2026-05-14', about: 'A broad crescent collar with a pale inlay and a gold flower at the front.' }),
  nk(18, { name: 'Branch Necklace', weight: 18.0, making: 14, stones: ['clear'], stoneValue: 44000, style: ['bridal', 'gifts'], added: '2026-08-27', about: 'Branching gold stems set with small stones, ending in a pointed drop.' }),
  nk(19, { name: 'Orchid Necklace', weight: 11.8, making: 14, stones: ['clear'], stoneValue: 34000, style: ['gifts', 'everyday'], added: '2026-04-16', about: 'An orchid pendant with a fringe of stones, on a light chain.' }),

  e(12, { name: 'Blossom Studs', weight: 3.6, making: 12, stones: ['clear'], stoneValue: 12000, style: ['everyday', 'gifts'], added: '2026-09-22', badge: 'New', bestseller: true, about: 'Five rounded petals polished to a mirror, with a stone at the heart.' }),
  e(13, { name: 'Rosette Studs', weight: 3.2, making: 12, stones: ['clear'], stoneValue: 10000, style: ['everyday', 'gifts'], added: '2026-08-02', about: 'Layered gold petals in the shape of a rose, with small stones among them.' }),
  e(14, { name: 'Pavé Dome Studs', weight: 4.8, making: 14, stones: ['clear'], stoneValue: 46000, style: ['gifts', 'bridal'], added: '2026-08-15', bestseller: true, about: 'Small domes of gold covered in stones, catching light from every side.' }),
  e(15, { name: 'Temple Jhumkas', weight: 11.6, making: 15, style: ['bridal'], added: '2026-06-30', about: 'Bell-shaped jhumkas with a fringe of gold beads, in the temple style.' }),
  e(16, { name: 'Blue Stone Star Earrings', weight: 3.4, making: 13, stones: ['blue'], stoneValue: 22000, style: ['gifts'], added: '2026-07-08', about: 'A blue stone held in a four-pointed gold frame.' }),
  e(17, { name: 'Filigree Ball Studs', weight: 5.0, making: 14, style: ['everyday', 'bridal'], added: '2026-04-28', about: 'Round studs worked in fine granulated gold.' }),
  e(18, { name: 'Halo Circle Studs', weight: 2.8, making: 12, stones: ['clear'], stoneValue: 14000, style: ['everyday'], added: '2026-05-30', about: 'A smooth gold circle around a curl of small stones.' }),
  e(19, { name: 'Star Flower Studs', weight: 3.1, making: 12, stones: ['clear'], stoneValue: 14000, style: ['everyday', 'gifts'], added: '2026-09-02', bestseller: true, about: 'Pointed petals around a single small stone, on a secure screw back.' }),

  r(12, { name: 'Red Stone Solitaire Ring', weight: 4.2, making: 12, stones: ['red', 'clear'], stoneValue: 45000, style: ['gifts', 'bridal'], added: '2026-09-20', badge: 'New', bestseller: true, about: 'A round red stone held high in four claws, with small stones down each shoulder.' }),
  r(13, { name: 'Wedding Band Pair', weight: 11.0, making: 10, style: ['bridal'], added: '2026-01-15', about: 'A matching pair of broad gold bands, polished smooth.' }),
  r(14, { name: 'Channel Eternity Ring', weight: 3.6, making: 13, stones: ['clear'], stoneValue: 40000, style: ['bridal', 'gifts'], added: '2026-07-03', about: 'Small stones set in a channel all the way round a slim band.' }),
  r(15, { name: 'Prong Stone Band', weight: 3.8, making: 13, stones: ['clear'], stoneValue: 36000, style: ['gifts', 'everyday'], added: '2026-05-20', about: 'Evenly spaced stones in raised claws along a plain band.' }),
  r(16, { name: 'Cluster Flower Ring', weight: 4.5, making: 14, stones: ['clear'], stoneValue: 38000, style: ['gifts', 'bridal'], added: '2026-06-27', about: 'A flower of small stones set in a cluster, on a curving band.' }),
  r(17, { name: 'Leaf Wave Ring', weight: 3.4, making: 13, stones: ['clear'], stoneValue: 24000, style: ['everyday', 'gifts'], added: '2026-08-21', about: 'A band that sweeps into a leaf, with a row of small stones.' }),
  r(18, { name: 'Two-tone Dome Ring', weight: 6.5, making: 14, style: ['gifts'], metals: ['two'], added: '2026-04-11', about: 'A faceted dome ring with a pattern in two tones of gold.' }),
  r(19, { name: 'Wheat Leaf Ring', weight: 3.9, making: 13, stones: ['clear'], stoneValue: 26000, style: ['everyday', 'gifts'], added: '2026-09-06', about: 'Overlapping gold leaves with a line of small stones along the top.' }),

  pd(12, { name: 'Starburst Pendant', weight: 5.2, making: 14, stones: ['clear'], stoneValue: 26000, style: ['gifts'], added: '2026-09-14', badge: 'New', about: 'Long, curling rays of gold, some set with stones, bursting from a single point.' }),
  pd(13, { name: 'Sun Spiral Pendant', weight: 4.6, making: 13, stones: ['clear'], stoneValue: 22000, style: ['everyday', 'gifts'], added: '2026-08-26', bestseller: true, about: 'Rays of gold turning around a spiral of small stones.' }),
  pd(14, { name: 'Radiant Star Pendant', weight: 6.0, making: 14, style: ['gifts'], added: '2026-06-18', about: 'A large star whose long rays curve out from a bright centre.' }),
  pd(15, { name: 'Sun Ray Pendant', weight: 5.0, making: 13, stones: ['clear'], stoneValue: 20000, style: ['everyday', 'gifts'], added: '2026-07-12', about: 'A sun with stone-set rays around a small centre stone.' }),
  pd(16, { name: 'Pavé Leaf Pendant', weight: 3.9, making: 13, stones: ['clear'], stoneValue: 30000, style: ['gifts', 'everyday'], added: '2026-06-08', about: 'Two gold leaves folded into each other, the outer one set with stones.' }),
  pd(17, { name: 'Stellar Pendant', weight: 3.2, making: 12, stones: ['clear'], stoneValue: 12000, style: ['everyday', 'gifts'], added: '2026-05-03', about: 'A small, many-pointed star with a finely textured face.' }),

  l(12, { name: 'Curb Link Bracelet', weight: 18.0, making: 10, style: ['men', 'everyday'], added: '2026-02-28', about: 'Flat curb links with a secure clasp.' }),
  l(13, { name: 'Mesh Band Bracelet', weight: 14.0, making: 11, style: ['everyday'], added: '2026-04-10', about: 'A flat band of fine woven gold mesh with a box clasp.' }),
  l(14, { name: 'Stone Bar Bracelet', weight: 5.5, making: 12, stones: ['clear'], stoneValue: 18000, style: ['gifts'], added: '2026-07-02', about: 'A fine chain with small bars set with stones.' }),
  l(15, { name: 'Bead Station Bracelet', weight: 4.8, making: 12, stones: ['clear'], stoneValue: 12000, style: ['gifts', 'everyday'], added: '2026-05-22', about: 'A fine chain with a small bead set at regular points along it.' }),
  l(16, { name: 'Star Link Bracelet', weight: 4.4, making: 12, style: ['everyday', 'gifts'], added: '2026-07-14', bestseller: true, about: 'A fine chain with a small gold star every few links.' }),
  l(17, { name: 'Twist Link Bracelet', weight: 5.2, making: 11, style: ['everyday'], added: '2026-03-19', about: 'Twisted gold links in a fine, light chain.' }),
  l(18, { name: 'Heavy Curb Bracelet', weight: 20.0, making: 10, style: ['men'], added: '2026-01-25', about: 'Dense, heavy curb links for a bracelet with presence.' }),
  l(19, { name: 'Fine Box Chain Bracelet', weight: 6.0, making: 10, style: ['everyday', 'gifts'], added: '2026-05-09', about: 'A slim box chain bracelet that sits well alone or stacked.' })
];

export const productOf = (id: string) => PRODUCTS.find((p) => p.id === id);

// The pieces in one collection or edit; no key means everything.
export const productsIn = (key?: string) =>
  !key ? PRODUCTS : key === 'bridal' ? PRODUCTS.filter((p) => p.style.includes('bridal')) : PRODUCTS.filter((p) => p.cat === key);

export const priceOf = (p: Product) => {
  const gold = p.weight * RATE_22K;
  const making = (gold * p.making) / 100;
  return { gold, making, stones: p.stoneValue, total: Math.round((gold + making + p.stoneValue) / 100) * 100 };
};

export const lkr = (n: number) => 'LKR ' + Math.round(n).toLocaleString('en-US');

export const byShowcase = (a: Product, b: Product) =>
  Number(Boolean(b.bestseller)) - Number(Boolean(a.bestseller)) || b.added.localeCompare(a.added);

export const newIn = () => [...PRODUCTS].sort((a, b) => b.added.localeCompare(a.added)).slice(0, 10);
export const bestsellers = (cat?: CategoryKey) => PRODUCTS.filter((p) => p.bestseller && (!cat || p.cat === cat));
export const related = (p: Product) =>
  [
    ...PRODUCTS.filter((o) => o.id !== p.id && o.cat === p.cat).sort(byShowcase),
    ...PRODUCTS.filter((o) => o.cat !== p.cat).sort(byShowcase)
  ].slice(0, 8);
