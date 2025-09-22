
export const BRAND = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || "Fíbaro",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://mejiasbusiness.es",
  logo: "/fibaro-azul.png"
};

export const LANGS = ["es","en","ca","gl","eu"] as const;
export type Lang = typeof LANGS[number];

export const PAYMENTS = {
  bizum: true,
  transfer: true,
  cod: true,
  sepa: true
}
