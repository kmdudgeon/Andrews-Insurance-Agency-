import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data/agency-config";
import { coverageLines } from "@/data/coverage";
import { locations } from "@/data/locations";
import { articles } from "@/data/resources";

export default function sitemap(): MetadataRoute.Sitemap {
  const entry = (
    path: string,
    priority: number,
    changeFrequency: "weekly" | "monthly" | "yearly" = "monthly",
  ) => ({ url: `${SITE_URL}${path}`, priority, changeFrequency });

  return [
    entry("", 1.0, "weekly"),
    entry("/quote", 1.0),
    ...coverageLines.map((line) => entry(`/coverage/${line.slug}`, 0.9)),
    ...locations.map((location) =>
      entry(`/locations/${location.slug}`, location.isHeadquarters ? 0.9 : 0.8),
    ),
    entry("/service-center", 0.7),
    entry("/about", 0.7),
    entry("/team", 0.7),
    entry("/contact", 0.7),
    entry("/resources", 0.7, "weekly"),
    ...articles.map((article) => entry(`/resources/${article.slug}`, 0.6)),
    entry("/privacy-policy", 0.3, "yearly"),
    entry("/terms-of-service", 0.3, "yearly"),
    entry("/disclaimers", 0.3, "yearly"),
    entry("/accessibility", 0.3, "yearly"),
  ];
}
