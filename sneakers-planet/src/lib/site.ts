export const SITE = {
  name: "Sneakers Planet",
  handle: "_sneakers_planet",
  instagram: "https://www.instagram.com/_sneakers_planet/",
  // Bio link is wa.me/9643554474; wa.me needs the country code to resolve.
  whatsapp: "919643554474",
  whatsappDisplay: "+91 96435 54474",
  tagline: "The right shoe can make everything different",
  posts: 66,
};

export const waLink = (text?: string) =>
  `https://wa.me/${SITE.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
