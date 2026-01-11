import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: "https://charlieallen.dev/sitemap.xml", // replace with real domain
    host: "https://charlieallen.dev",
  };
}
