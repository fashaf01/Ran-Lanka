// Sample figures. The shop posts the rate every morning; swap these for a live feed when there is one.
export const GRAM22 = 39000;
export const GRAM24 = 42500;
export const PAWN_GRAMS = 8;

export const FX = [
  { code: "USD", name: "US dollar", rate: "297.40" },
  { code: "EUR", name: "Euro", rate: "344.80" },
  { code: "GBP", name: "Pound sterling", rate: "397.20" },
  { code: "AUD", name: "Australian dollar", rate: "194.30" },
];

export const PHONE = "031 222 2202";
export const PHONE_HREF = "tel:0312222202";
export const PHONE_2 = "031 223 8383";
export const PHONE_2_HREF = "tel:0312238383";
export const EMAIL = "ranlankanegombo@gmail.com";
export const MAPS_URL = "https://www.google.com/maps/search/?api=1&query=Ranlanka%2C%20192%20Main%20Street%2C%20Negombo";

export const money = (n: number) => Math.round(n).toLocaleString("en-US");

export const NAV_MAIN = [
  { label: "Collection", href: "/collection" },
  { label: "Bridal", href: "/bridal" },
  { label: "Bespoke", href: "/bespoke" },
  { label: "Gold rate", href: "/gold-rate" },
];
export const NAV_MORE = [
  { label: "Our story", href: "/about" },
  { label: "Visit", href: "/visit" },
];
