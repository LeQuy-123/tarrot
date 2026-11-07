import type { MetadataRoute } from "next";
import { SITE_NAME } from "@/lib/site";

// Icons are rendered from app/icon.svg; the maskable one keeps the card inside the 80% safe zone.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: "ARCANA",
    description: "An immersive 3D tarot reading chamber with an original 78-card deck.",
    start_url: "/",
    display: "standalone",
    background_color: "#05060d",
    theme_color: "#05060d",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
