import { MetadataRoute } from "next";
import { getAlbums } from "@/lib/data-store";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://amarastudios.in";
  const albums = await getAlbums();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/films`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];

  const albumRoutes: MetadataRoute.Sitemap = albums.map((album) => ({
    url: `${baseUrl}/portfolio/${album.slug}`,
    lastModified: new Date(album.updatedAt || album.createdAt || new Date()),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...albumRoutes];
}
