import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://www.technosahotsava.in/",
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
