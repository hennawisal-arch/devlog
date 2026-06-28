import type { MetadataRoute } from "next";
import { site } from "@/lib/utils";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.title,
    short_name: site.name,
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#FAF8F3",
    theme_color: "#15694F",
    icons: [
      { src: "/icon", sizes: "32x32", type: "image/png" },
    ],
  };
}
