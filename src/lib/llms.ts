import {
  agency,
  broker,
  carriers,
  counties,
  homeFaqs,
  legal,
  SITE_URL,
} from "@/data/agency-config";
import { coverageLines } from "@/data/coverage";
import { locations } from "@/data/locations";
import { articles, glossary } from "@/data/resources";

const url = (path: string) => `${SITE_URL}${path}`;

function header() {
  return `# ${agency.name}

> ${agency.description}

## Business facts

- Name: ${agency.name} (also known as ${agency.shortName})
- Type: Independent insurance agency (multi-carrier broker working with ${agency.carrierCount} insurance companies)
- Address: ${agency.address.oneLine}
- Phone: ${agency.phone.display}
- Email: ${agency.email}
- Hours: ${agency.hours.summary}; closed Saturday and Sunday; online quote and appointment requests accepted 24/7
- Established: ${agency.foundingYear}
- Principal Broker: ${broker.name}, ${broker.title} (National Producer Number / NPN #${broker.npn}; Nonresident Health License #${broker.nonresidentHealthLicense})
- Google rating: ${agency.reputation.googleRating} out of 5
- Service area: ${counties.map((county) => `${county} County`).join(", ")}, Indiana — including ${locations.map((location) => location.city).join(", ")}
- Lines of insurance: Auto and recreational vehicles, homeowners and property, health (ACA Marketplace), dental and vision, life, short-term and long-term disability, and commercial / corporate (liability policies, garage policies, BOP, commercial auto, workers' compensation, farm)
- Not offered: Medicare and Medicaid plans

## Indiana coverage benchmarks

- Minimum auto liability limits: 25/50/25 ($25,000 bodily injury per person, $50,000 per accident, $25,000 property damage)
- Insurers must offer uninsured/underinsured motorist coverage; it may be rejected in writing
- Indiana uses the federal Health Insurance Marketplace (HealthCare.gov)
- Standard homeowners policies exclude flood and, unless endorsed, sewer or sump pump water backup
`;
}

export function buildLlmsTxt() {
  return `${header()}
## Key pages

- [Get a free quote](${url("/quote")}): 3-step online quote request; no Social Security number required
- [Service Center](${url("/service-center")}): carrier claims and billing contacts, ID card and certificate requests
- [Contact and appointments](${url("/contact")}): phone, email, directions and appointment requests
- [About the agency and broker](${url("/about")})

## Coverage

${coverageLines.map((line) => `- [${line.name}](${url(`/coverage/${line.slug}`)}): ${line.metaDescription}`).join("\n")}

## Locations served

${locations.map((location) => `- [${location.city}, IN](${url(`/locations/${location.slug}`)}): ${location.county} County`).join("\n")}

## Guides

${articles.map((article) => `- [${article.title}](${url(`/resources/${article.slug}`)}): ${article.description}`).join("\n")}
- [Insurance glossary and FAQ](${url("/resources")})

## Optional

- [Full-text version of this file](${url("/llms-full.txt")})
- [Licensing and disclaimers](${url("/disclaimers")})
- [Privacy policy](${url("/privacy-policy")})

## Important notice

${legal.nonBinding}
`;
}

export function buildLlmsFullTxt() {
  const coverage = coverageLines
    .map(
      (line) => `### ${line.name}

URL: ${url(`/coverage/${line.slug}`)}

${line.quickAnswer}

${line.facts.map((fact) => `- ${fact.term}: ${fact.detail}`).join("\n")}

Coverage options:
${line.coverages.map((item) => `- ${item.title}: ${item.description}`).join("\n")}

${line.faqs.map((faq) => `Q: ${faq.question}\nA: ${faq.answer}`).join("\n\n")}`,
    )
    .join("\n\n");

  const places = locations
    .map(
      (location) => `### ${location.city}, Indiana (${location.county} County)

URL: ${url(`/locations/${location.slug}`)}

${location.quickAnswer}

${location.insights.map((insight) => `- ${insight.title}: ${insight.description}`).join("\n")}`,
    )
    .join("\n\n");

  return `${header()}
## Coverage details

${coverage}

## Locations

${places}

## Guides

${articles.map((article) => `### ${article.title}\n\nURL: ${url(`/resources/${article.slug}`)}\n\n${article.quickAnswer}`).join("\n\n")}

## Frequently asked questions

${homeFaqs.map((faq) => `Q: ${faq.question}\nA: ${faq.answer}`).join("\n\n")}

## Carrier claims and billing directory

${carriers.map((carrier) => `- ${carrier.name} (${carrier.lines.join(", ")})${carrier.claimsPhone ? `: ${carrier.claimsPhone}` : ""} — ${carrier.website}`).join("\n")}

## Glossary

${glossary.map((entry) => `- ${entry.term}: ${entry.definition}`).join("\n")}

## Legal notices

${legal.nonBinding}

${legal.informational}

${legal.licensing}

${legal.marketplace}

${legal.notOffered}
`;
}
