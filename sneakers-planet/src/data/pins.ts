export type Category = "dunk" | "af1" | "watch";

export type ProductPin = {
  kind: "product";
  id: string;
  category: Category;
  name: string;
  colorway: string;
  description: string;
  image: { src: string; width: number; height: number };
  sizes: string[];
};

export type TextPin = {
  kind: "text";
  id: string;
  tone: "red" | "peach" | "plain" | "stat";
  title: string;
  body: string;
};

export type Pin = ProductPin | TextPin;

export const CATEGORIES: { id: Category | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "dunk", label: "Dunks" },
  { id: "af1", label: "Air Force 1" },
  { id: "watch", label: "Watches" },
];

export const categoryLabel = (c: Category) =>
  CATEGORIES.find((x) => x.id === c)?.label ?? c;

const UK_SIZES = ["6", "7", "8", "9", "10", "11"];

// Photos are cropped from the brand's Instagram grid. Swap in full-res shots in /public/pins.
export const PINS: Pin[] = [
  {
    kind: "product",
    id: "dunk-parra",
    category: "dunk",
    name: 'Nike SB Dunk Low "Parra"',
    colorway: "Multicolor / Gum",
    description: "Graffiti-print overlays on a sail base with a gum sole. The board favourite.",
    image: { src: "/pins/dunk-parra.jpg", width: 694, height: 848 },
    sizes: UK_SIZES,
  },
  {
    kind: "text",
    id: "quote",
    tone: "red",
    title: "The right shoe can make everything different.",
    body: "Our whole store, in one line.",
  },
  {
    kind: "product",
    id: "af1-brown",
    category: "af1",
    name: "Nike Air Force 1 '07",
    colorway: "Chocolate suede",
    description: "All-brown suede with a tonal swoosh. Goes with denim, cargos, everything.",
    image: { src: "/pins/af1-brown.jpg", width: 694, height: 848 },
    sizes: UK_SIZES,
  },
  {
    kind: "product",
    id: "armani-watch",
    category: "watch",
    name: "Emporio Armani Chronograph",
    colorway: "Two-tone rose gold",
    description: "Gradient dial, three sub-dials and a two-tone link bracelet.",
    image: { src: "/pins/armani-watch.jpg", width: 694, height: 848 },
    sizes: ["One size"],
  },
  {
    kind: "text",
    id: "stat",
    tone: "stat",
    title: "66",
    body: "drops posted on the gram so far. New pairs land every week.",
  },
  {
    kind: "product",
    id: "dunk-blue",
    category: "dunk",
    name: "Nike SB Dunk Low",
    colorway: "Denim navy / Red tab",
    description: "Washed-denim suede panels, a navy swoosh and a red heel tab. Box fresh.",
    image: { src: "/pins/dunk-blue.jpg", width: 694, height: 848 },
    sizes: UK_SIZES,
  },
  {
    kind: "product",
    id: "af1-brown-detail",
    category: "af1",
    name: "Air Force 1 · Up close",
    colorway: "Chocolate suede",
    description: "A closer look at the suede nap and stitching on the brown AF1.",
    image: { src: "/pins/af1-brown-detail.jpg", width: 520, height: 540 },
    sizes: UK_SIZES,
  },
  {
    kind: "text",
    id: "cod",
    tone: "peach",
    title: "Cash on delivery.",
    body: "Pay when the box is in your hands.",
  },
  {
    kind: "product",
    id: "dunk-parra-detail",
    category: "dunk",
    name: '"Parra" · Up close',
    colorway: "Multicolor / Gum",
    description: "Every panel is a different print. This is the pair people stop you for.",
    image: { src: "/pins/dunk-parra-detail.jpg", width: 632, height: 500 },
    sizes: UK_SIZES,
  },
  {
    kind: "product",
    id: "dunk-blue-detail",
    category: "dunk",
    name: "SB Dunk · Up close",
    colorway: "Denim navy / Red tab",
    description: "Embroidered heel graphic and two-tone blue suede.",
    image: { src: "/pins/dunk-blue-detail.jpg", width: 644, height: 500 },
    sizes: UK_SIZES,
  },
  {
    kind: "text",
    id: "delivery",
    tone: "plain",
    title: "Delivery all over India.",
    body: "Every pin code our couriers reach, from Srinagar to Kanyakumari.",
  },
];
