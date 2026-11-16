import type { Metadata } from "next";
import { agency } from "@/data/agency-config";

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  /** Override the geo.placename meta tag for location pages. */
  placename?: string;
  noIndex?: boolean;
};

/** Consistent title, canonical, OpenGraph, Twitter and geo meta tags for every route. */
export function pageMetadata({
  title,
  description,
  path,
  placename = agency.address.city,
  noIndex,
}: PageMetaInput): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    robots: noIndex ? { index: false, follow: true } : undefined,
    openGraph: {
      title,
      description,
      url: path,
      siteName: agency.name,
      locale: "en_US",
      type: "website",
    },
    twitter: { card: "summary_large_image", title, description },
    other: {
      "geo.region": "US-IN",
      "geo.placename": placename,
      "geo.position": `${agency.geo.latitude};${agency.geo.longitude}`,
      ICBM: `${agency.geo.latitude}, ${agency.geo.longitude}`,
    },
  };
}
