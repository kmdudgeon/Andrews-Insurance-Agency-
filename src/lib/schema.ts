import { agency, broker, counties, SITE_URL } from "@/data/agency-config";
import { coverageLines, type CoverageLine, type Faq } from "@/data/coverage";
import { locations } from "@/data/locations";

export type SchemaNode = { "@type": string | string[]; [key: string]: unknown };
export type SchemaGraph = { "@context": "https://schema.org"; "@graph": SchemaNode[] };
export type Crumb = { name: string; path: string };

export const AGENCY_ID = `${SITE_URL}/#agency`;
export const FOUNDER_ID = `${SITE_URL}/#founder`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

const abs = (path: string) => `${SITE_URL}${path === "/" ? "" : path}`;

export function agencyNode(): SchemaNode {
  return {
    "@type": ["InsuranceAgency", "LocalBusiness"],
    "@id": AGENCY_ID,
    name: agency.name,
    alternateName: agency.shortName,
    description: agency.description,
    slogan: agency.tagline,
    url: SITE_URL,
    telephone: agency.phone.schema,
    email: agency.email,
    foundingDate: agency.foundingYear,
    priceRange: agency.priceRange,
    image: `${SITE_URL}/opengraph-image`,
    logo: `${SITE_URL}/icon.svg`,
    founder: { "@id": FOUNDER_ID },
    address: {
      "@type": "PostalAddress",
      streetAddress: agency.address.street,
      addressLocality: agency.address.city,
      addressRegion: agency.address.state,
      postalCode: agency.address.zip,
      addressCountry: agency.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: agency.geo.latitude,
      longitude: agency.geo.longitude,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [...agency.hours.days],
        opens: agency.hours.opens,
        closes: agency.hours.closes,
      },
    ],
    areaServed: [
      ...locations.map((location) => ({
        "@type": "City",
        name: `${location.city}, Indiana`,
      })),
      ...counties.map((county) => ({
        "@type": "AdministrativeArea",
        name: `${county} County, Indiana`,
      })),
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Insurance Services",
      itemListElement: [
        ...coverageLines.map((line) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: line.name,
            url: abs(`/coverage/${line.slug}`),
          },
        })),
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Dental & Vision Insurance",
            url: abs("/coverage/health-insurance"),
          },
        },
      ],
    },
    sameAs: [agency.social.facebook],
  };
}

export function founderNode(): SchemaNode {
  return {
    "@type": "Person",
    "@id": FOUNDER_ID,
    name: broker.name,
    jobTitle: broker.title,
    url: abs("/about"),
    worksFor: { "@id": AGENCY_ID },
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "license",
        name: `National Producer Number (NPN) #${broker.npn}`,
        identifier: broker.npn,
      },
    ],
    knowsAbout: [
      "Auto insurance",
      "Homeowners insurance",
      "Health insurance",
      "Life insurance",
      "Commercial insurance",
    ],
  };
}

export function websiteNode(): SchemaNode {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: agency.name,
    publisher: { "@id": AGENCY_ID },
    inLanguage: "en-US",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/resources?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function webPageNode(path: string, name: string, description: string): SchemaNode {
  return {
    "@type": "WebPage",
    "@id": `${abs(path)}#webpage`,
    url: abs(path),
    name,
    description,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": AGENCY_ID },
    inLanguage: "en-US",
  };
}

export function breadcrumbNode(path: string, crumbs: Crumb[]): SchemaNode {
  return {
    "@type": "BreadcrumbList",
    "@id": `${abs(path)}#breadcrumb`,
    itemListElement: [{ name: "Home", path: "/" }, ...crumbs].map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: abs(crumb.path) || SITE_URL,
    })),
  };
}

export function faqNode(path: string, faqs: Faq[]): SchemaNode {
  return {
    "@type": "FAQPage",
    "@id": `${abs(path)}#faq`,
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export function serviceNode(line: CoverageLine): SchemaNode {
  const path = `/coverage/${line.slug}`;
  return {
    "@type": ["Service", "FinancialProduct"],
    "@id": `${abs(path)}#service`,
    name: line.name,
    serviceType: line.name,
    category: "Insurance",
    description: line.quickAnswer,
    url: abs(path),
    provider: { "@id": AGENCY_ID },
    areaServed: counties.map((county) => ({
      "@type": "AdministrativeArea",
      name: `${county} County, Indiana`,
    })),
  };
}

export function articleNode(
  path: string,
  title: string,
  description: string,
  dateModified: string,
): SchemaNode {
  return {
    "@type": "Article",
    "@id": `${abs(path)}#article`,
    headline: title,
    description,
    dateModified,
    datePublished: dateModified,
    author: { "@id": FOUNDER_ID },
    publisher: { "@id": AGENCY_ID },
    mainEntityOfPage: { "@id": `${abs(path)}#webpage` },
  };
}

type PageSchemaInput = {
  path: string;
  title: string;
  description: string;
  crumbs?: Crumb[];
  faqs?: Faq[];
  extra?: SchemaNode[];
};

/** Builds the full JSON-LD @graph for a page: agency, founder, website, page, breadcrumbs and extras. */
export function buildPageSchema({
  path,
  title,
  description,
  crumbs,
  faqs,
  extra = [],
}: PageSchemaInput): SchemaGraph {
  const graph: SchemaNode[] = [
    agencyNode(),
    founderNode(),
    websiteNode(),
    webPageNode(path, title, description),
  ];
  if (crumbs?.length) graph.push(breadcrumbNode(path, crumbs));
  if (faqs?.length) graph.push(faqNode(path, faqs));
  graph.push(...extra);
  return { "@context": "https://schema.org", "@graph": graph };
}
