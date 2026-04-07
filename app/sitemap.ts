// app/sitemap.ts
import { MetadataRoute } from "next";
import { AdsDataService } from "@/lib/services/adsDataService";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://bazaar-963.com";

  // 1. الروابط الثابتة (Static Routes)
  const staticRoutes = ["", "/search"].flatMap((route) => [
    {
      url: `${baseUrl}/ar${route}`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/en${route}`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.8,
    },
  ]);

  // 2. روابط الإعلانات الديناميكية (Dynamic Ad Routes)
  let adRoutes: MetadataRoute.Sitemap = [];
  try {
    const response = await AdsDataService.getAllAdsForSitemap();
    const ads = response.data || [];

    adRoutes = ads.flatMap((ad) => [
      {
        url: `${baseUrl}/ar/ads/${ad.slug}`,
        lastModified: new Date(ad.updatedAt),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      },
      {
        url: `${baseUrl}/en/ads/${ad.slug}`,
        lastModified: new Date(ad.updatedAt),
        changeFrequency: "weekly" as const,
        priority: 0.6,
      },
    ]);
  } catch (error) {
    console.error("Sitemap error:", error);
  }

  return [...staticRoutes, ...adRoutes];
}
