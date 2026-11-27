import type { MetadataRoute } from "next";

const BASE_URL = "https://ai-content-lab-web.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: BASE_URL, lastModified: now },
    { url: `${BASE_URL}/privacy`, lastModified: now },
  ];
}