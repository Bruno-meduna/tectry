import type { MetadataRoute } from "next";
import { productCategories } from "@/content/site";

const base = process.env.NEXT_PUBLIC_SITE_URL || "https://www.tecjato.com.br";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = [
    "",
    "/quem-somos",
    "/produtos",
    ...productCategories.map((c) => `/produtos/${c.id}`),
    ...productCategories.flatMap((c) =>
      c.items.map((it) => `/produtos/${c.id}/${it.slug}`)
    ),
    "/contato",
  ];
  return routes.map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.8,
  }));
}
