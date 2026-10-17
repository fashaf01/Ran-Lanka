// The Ranlanka catalogue. Every piece here is a SAMPLE: replace the names, weights
// and photos with the real stock. To use real photos, put them in images/products/
// and list them in the piece's `images`, e.g. images: ['images/products/rl-r01-1.webp', …].

// 22 karat gold, LKR per gram. Matches the sample rate on the home page.
export const RATE_22K = 39000;
export const PAWN = 8; // grams

export const CATEGORIES = [
  { key: 'all', name: 'All jewellery', title: 'All jewellery.', lede: 'Twenty-two karat gold, weighed in front of you. Save the pieces you like to a viewing list and we will have them ready at the counter.' },
  { key: 'bangles', name: 'Bangles', title: 'Bangles.', lede: 'Openwork cuffs, kadas and slim bangles for every day.' },
  { key: 'necklaces', name: 'Necklaces', title: 'Necklaces.', lede: 'Fine chains, sprays and chokers, for weddings and for every day.' },
  { key: 'earrings', name: 'Earrings', title: 'Earrings.', lede: 'Studs, stars, jhumkas and drops.' },
  { key: 'rings', name: 'Rings', title: 'Rings.', lede: 'Rubies, stones and plain bands.' },
  { key: 'pendants', name: 'Pendants', title: 'Pendants.', lede: 'Suns, stars, leaves and traditional pendants.' },
  { key: 'bracelets', name: 'Bracelets', title: 'Bracelets.', lede: 'Slim chains, line bracelets and pieces for little wrists.' },
  { key: 'chains', name: 'Chains', title: 'Chains.', lede: 'Rope, box and curb chains, priced by weight.' },
  { key: 'bridal', name: 'Bridal sets', title: 'Bridal sets.', lede: 'Kandyan and temple sets, made for your wedding day.' }
];

export const FILTERS = [
  { key: 'stone', name: 'Stone', options: [['plain', 'Plain gold'], ['diamond', 'Diamond'], ['ruby', 'Ruby'], ['emerald', 'Emerald'], ['sapphire', 'Sapphire'], ['pearl', 'Pearl']] },
  { key: 'style', name: 'Occasion', options: [['bridal', 'Bridal'], ['everyday', 'Every day'], ['kandyan', 'Kandyan tradition'], ['gifts', 'Gifts'], ['children', 'For children'], ['men', 'For him']] },
  { key: 'weight', name: 'Weight', options: [['0-4', 'Under 4 g'], ['4-8', '4 to 8 g · up to a pawn'], ['8-16', '8 to 16 g · 1 to 2 pawn'], ['16-40', '16 to 40 g'], ['40-', '40 g and over']] },
  { key: 'metal', name: 'Gold colour', options: [['yellow', 'Yellow gold'], ['rose', 'Rose gold'], ['two', 'Two-tone']] }
];

export const METALS = { yellow: 'Yellow gold', rose: 'Rose gold', two: 'Two-tone' };

export const SIZES = {
  rings: { name: 'Ring size', values: ['5', '6', '7', '8', '9', '10', '11', '12'] },
  bangles: { name: 'Bangle size', values: ['2.2', '2.4', '2.6', '2.8', '2.10'] },
  bracelets: { name: 'Length', values: ['6.5 in', '7 in', '7.5 in'] },
  chains: { name: 'Length', values: ['16 in', '18 in', '20 in', '22 in', '24 in'] }
};

const dummy = (cat) => [1, 2, 3].map((n) => `images/dummy/${cat}-${n}.svg`);

// weight: grams of 22K gold · making: making charge, % of the gold value · stoneValue: LKR
const piece = (p) => ({ metals: ['yellow'], stones: [], style: [], stoneValue: 0, badge: '', images: dummy(p.cat), ...p });

export const PRODUCTS = [
  piece({ id: 'rl-b01', cat: 'bangles', name: 'Openwork Lotus Cuff', weight: 18.6, making: 14, style: ['everyday', 'gifts'], metals: ['yellow', 'rose'], added: '2026-09-28', badge: 'New', about: 'An open cuff of lotus petals cut by hand from a single sheet of gold, light enough to wear every day.' }),
  piece({ id: 'rl-b02', cat: 'bangles', name: 'Kandyan Filigree Kada', weight: 24.0, making: 16, style: ['bridal', 'kandyan'], added: '2026-06-12', about: 'A broad kada worked in fine Kandyan filigree, made in pairs for the wedding day.' }),
  piece({ id: 'rl-b03', cat: 'bangles', name: 'Ruby Line Bangle', weight: 14.2, making: 12, stones: ['ruby'], stoneValue: 60000, style: ['bridal', 'gifts'], added: '2026-08-04', about: 'A slim bangle set with a single line of rubies around the front.' }),
  piece({ id: 'rl-b04', cat: 'bangles', name: 'Slim Everyday Bangles, pair', weight: 9.8, making: 10, style: ['everyday'], metals: ['yellow', 'rose', 'two'], added: '2026-03-02', about: 'Two plain, polished bangles to wear together or apart.' }),

  piece({ id: 'rl-n01', cat: 'necklaces', name: 'Leaf Spray Necklace', weight: 16.4, making: 14, style: ['everyday', 'gifts'], added: '2026-09-10', badge: 'New', about: 'A fine chain gathered into a spray of three curved leaves.' }),
  piece({ id: 'rl-n02', cat: 'necklaces', name: 'Emerald Choker', weight: 38.5, making: 16, stones: ['emerald'], stoneValue: 180000, style: ['bridal'], added: '2026-07-21', about: 'A close-fitting choker of gold and emeralds, finished with a gold cord at the back.' }),
  piece({ id: 'rl-n03', cat: 'necklaces', name: 'Pearl Station Necklace', weight: 7.2, making: 12, stones: ['pearl'], stoneValue: 25000, style: ['everyday', 'gifts'], added: '2026-05-18', about: 'Freshwater pearls spaced along a fine gold chain.' }),
  piece({ id: 'rl-n04', cat: 'necklaces', name: 'Kandyan Bridal Necklace', weight: 62.0, making: 18, stones: ['ruby'], stoneValue: 140000, style: ['bridal', 'kandyan'], added: '2026-04-09', badge: 'Made to order', about: 'A traditional Kandyan bridal necklace of graduated gold plaques, set with rubies.' }),

  piece({ id: 'rl-e01', cat: 'earrings', name: 'Star Flower Studs', weight: 3.1, making: 12, style: ['everyday', 'gifts'], added: '2026-09-02', about: 'Five-petal studs with a small star at the centre.' }),
  piece({ id: 'rl-e02', cat: 'earrings', name: 'Temple Jhumkas', weight: 11.6, making: 15, stones: ['ruby'], stoneValue: 18000, style: ['bridal'], added: '2026-06-30', about: 'Bell-shaped jhumkas with a fringe of gold beads, in the temple style.' }),
  piece({ id: 'rl-e03', cat: 'earrings', name: 'Sapphire Drop Earrings', weight: 5.4, making: 13, stones: ['sapphire'], stoneValue: 75000, style: ['gifts'], metals: ['yellow', 'two'], added: '2026-08-15', badge: 'New', about: 'A single Ceylon blue sapphire hanging from a small gold stud.' }),
  piece({ id: 'rl-e04', cat: 'earrings', name: 'First Studs for Children', weight: 1.6, making: 10, style: ['children', 'gifts'], added: '2026-02-11', about: 'Small, smooth studs with screw backs for a child’s first earrings.' }),

  piece({ id: 'rl-r01', cat: 'rings', name: 'Ruby Solitaire Ring', weight: 4.2, making: 12, stones: ['ruby'], stoneValue: 45000, style: ['gifts'], added: '2026-09-20', badge: 'New', about: 'A round ruby held high in four claws on a slim band.' }),
  piece({ id: 'rl-r02', cat: 'rings', name: 'Plain Wedding Band', weight: 5.0, making: 10, style: ['bridal', 'everyday'], metals: ['yellow', 'rose'], added: '2026-01-15', about: 'A comfort-fit band, polished inside and out.' }),
  piece({ id: 'rl-r03', cat: 'rings', name: 'Diamond Half-Eternity Ring', weight: 3.8, making: 14, stones: ['diamond'], stoneValue: 160000, style: ['bridal', 'gifts'], metals: ['yellow', 'two'], added: '2026-07-03', about: 'Small diamonds set halfway around a fine band.' }),
  piece({ id: 'rl-r04', cat: 'rings', name: 'Signet Ring', weight: 8.4, making: 11, style: ['men'], added: '2026-05-05', about: 'A heavy signet with a flat face, ready to engrave with an initial.' }),

  piece({ id: 'rl-p01', cat: 'pendants', name: 'Sun Spiral Pendant', weight: 4.6, making: 13, style: ['everyday', 'gifts'], added: '2026-08-26', about: 'Rays of gold turning around a spiral of small stones.' }),
  piece({ id: 'rl-p02', cat: 'pendants', name: 'Pancha Ayudha Pendant', weight: 2.4, making: 12, style: ['children', 'kandyan', 'gifts'], added: '2026-03-27', about: 'The traditional five-weapon pendant, given to children for protection.' }),
  piece({ id: 'rl-p03', cat: 'pendants', name: 'Emerald Leaf Pendant', weight: 3.9, making: 13, stones: ['emerald'], stoneValue: 38000, style: ['gifts'], added: '2026-06-08', about: 'A single leaf of gold with an emerald at its heart.' }),
  piece({ id: 'rl-p04', cat: 'pendants', name: 'Initial Pendant', weight: 2.8, making: 12, style: ['gifts', 'children'], added: '2026-09-30', badge: 'Made to order', about: 'Any letter, cut in gold. Tell us the initial when you book.' }),

  piece({ id: 'rl-l01', cat: 'bracelets', name: 'Star Link Bracelet', weight: 4.4, making: 12, style: ['everyday', 'gifts'], added: '2026-07-14', about: 'A fine chain with a small gold star every few links.' }),
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

export const priceOf = (p) => {
  const gold = p.weight * RATE_22K;
  const making = (gold * p.making) / 100;
  return { gold, making, stones: p.stoneValue, total: Math.round((gold + making + p.stoneValue) / 100) * 100 };
};
