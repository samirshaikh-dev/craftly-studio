import type { MetadataRoute } from "next";
import { BUSINESS_INFO, SITE_NAME } from "@/lib/seo/constants";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: SITE_NAME,
    description: BUSINESS_INFO.shortDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0b",
    theme_color: "#0a0a0b",
    icons: [
      {
        src: "/icon.jpg",
        sizes: "any",
        type: "image/jpeg",
      },
    ],
  };
}
