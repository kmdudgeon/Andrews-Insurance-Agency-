/**
 * Single source of truth for Andrews Insurance Agency business facts:
 * NAP, licensing, service area, carriers, navigation and legal disclaimers.
 * Change a fact here and it updates across pages, metadata, JSON-LD and llms.txt.
 */

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.andrewsinsagency.net"
).replace(/\/$/, "");

export const agency = {
  name: "Andrews Insurance Agency",
  shortName: "Andrews Insurance",
  tagline: "The Sensible Approach to Risk Management",
  description:
    "Andrews Insurance Agency is an independent insurance agency in Kendallville, Indiana that compares auto, home, health, life and business coverage from multiple carriers for families and businesses across Northeast Indiana.",
  foundingYear: "2023",
  priceRange: "$$",
  phone: {
    display: "(260) 582-7681",
    e164: "+12605827681",
    schema: "+1-260-582-7681",
    href: "tel:+12605827681",
  },
  email: "justin@andrewsinsagency.net",
  address: {
    street: "119 West Mitchell Street #3",
    city: "Kendallville",
    state: "IN",
    stateName: "Indiana",
    zip: "46755",
    country: "US",
    oneLine: "119 West Mitchell Street #3, Kendallville, IN 46755",
  },
  geo: { latitude: 41.4414, longitude: -85.265 },
  mapsQuery: "119+West+Mitchell+Street+%233,+Kendallville,+IN+46755",
  hours: {
    summary: "Monday–Friday, 9:00 AM – 5:00 PM ET",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "17:00",
    table: [
      { day: "Monday – Friday", hours: "9:00 AM – 5:00 PM ET" },
      { day: "Saturday – Sunday", hours: "Closed" },
      { day: "Online quotes & requests", hours: "24 hours a day, 7 days a week" },
    ],
  },
  reputation: {
    googleRating: "5.0",
    googleReviewsUrl:
      "https://www.google.com/search?q=Andrews+Insurance+Agency+Kendallville+IN+reviews",
  },
  social: {
    facebook: "https://www.facebook.com/profile.php?id=61589122799046",
  },
} as const;

export const broker = {
  name: "Justin Michael Andrews",
  shortName: "Justin Andrews",
  title: "Principal Insurance Broker",
  npn: "19991623",
  nonresidentHealthLicense: "W925384",
} as const;

export const counties = ["Noble", "DeKalb", "Allen", "LaGrange", "Steuben"] as const;

export type CoverageKey = "auto" | "home" | "health" | "life" | "commercial";

export const coverageOptions: {
  key: CoverageKey;
  label: string;
  short: string;
  slug: string;
}[] = [
  { key: "auto", label: "Auto & Recreational", short: "Auto", slug: "auto-insurance" },
  { key: "home", label: "Home & Property", short: "Home", slug: "homeowners-insurance" },
  { key: "health", label: "Health, Dental & Vision", short: "Health", slug: "health-insurance" },
  { key: "life", label: "Life Insurance", short: "Life", slug: "life-insurance" },
  { key: "commercial", label: "Business & Farm", short: "Business", slug: "commercial-insurance" },
];

export type Carrier = {
  name: string;
  slug: string;
  lines: string[];
  claimsPhone?: string;
  claimsUrl?: string;
  billingUrl?: string;
  website: string;
};

/** Carrier claims & billing directory. Add carriers here as appointments are confirmed. */
export const carriers: Carrier[] = [
  {
    name: "Ameritas",
    slug: "ameritas",
    lines: ["Dental", "Vision"],
    claimsPhone: "800-487-5553",
    claimsUrl: "https://www.ameritas.com/claims/",
    billingUrl: "https://www.ameritas.com/digital/member-account",
    website: "https://www.ameritas.com",
  },
  {
    name: "VSP Vision Care",
    slug: "vsp",
    lines: ["Vision"],
    claimsPhone: "800-877-7195",
    claimsUrl: "https://www.vsp.com",
    billingUrl: "https://www.vsp.com",
    website: "https://www.vsp.com",
  },
];

export const navigation = {
  coverage: [
    {
      href: "/coverage/auto-insurance",
      label: "Auto & Recreational",
      blurb: "Cars, motorcycles, RVs, boats and SR-22 filings",
    },
    {
      href: "/coverage/homeowners-insurance",
      label: "Home & Property",
      blurb: "Homes, condos, renters, manufactured and lake homes",
    },
    {
      href: "/coverage/health-insurance",
      label: "Health, Dental & Vision",
      blurb: "ACA Marketplace plans, dental, vision and Medicare",
    },
    {
      href: "/coverage/life-insurance",
      label: "Life Insurance",
      blurb: "Term, whole life, final expense and mortgage protection",
    },
    {
      href: "/coverage/commercial-insurance",
      label: "Business & Farm",
      blurb: "Liability, BOP, commercial auto, workers' comp and farm",
    },
  ],
  primary: [
    { href: "/service-center", label: "Service Center" },
    { href: "/locations/kendallville-in", label: "Locations" },
    { href: "/resources", label: "Resources" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ],
  legal: [
    { href: "/privacy-policy", label: "Privacy Policy" },
    { href: "/terms-of-service", label: "Terms of Service" },
    { href: "/disclaimers", label: "Licensing & Disclaimers" },
    { href: "/accessibility", label: "Accessibility" },
  ],
} as const;

export const legal = {
  nonBinding:
    "IMPORTANT NOTICE: Insurance coverage cannot be bound, altered, added, or cancelled via website submission, email, voicemail, or online chat. No coverage is in effect until an application is approved by an underwriting carrier, all required signatures are obtained, and confirmation is issued in writing by a licensed representative of Andrews Insurance Agency.",
  informational:
    "Statements on this website regarding insurance policies, coverages, limits, and discounts provide general informational summaries only. This information does not constitute an offer to sell insurance or a contract of insurance, nor does it amend, extend, or alter the terms, exclusions, or conditions of any actual policy issued by an underwriting carrier.",
  /** Exact text stored with each lead. If you edit it, older leads keep the text they agreed to. */
  tcpaConsent:
    "By checking this box and submitting this form, I provide my express written consent to receive insurance quotes, policy information, and follow-up communications from Andrews Insurance Agency (and Principal Broker Justin Andrews) via telephone calls, text messages (SMS), and email at the phone number and email address provided above, including via automated dialing systems, even if my number is on a federal or state Do Not Call list. I understand that my consent is not a condition of purchasing any insurance product and that I may revoke consent at any time by replying STOP or calling (260) 582-7681.",
  licensing:
    "Andrews Insurance Agency is an independent insurance agency headquartered at 119 West Mitchell Street #3, Kendallville, IN 46755. Principal Broker: Justin Michael Andrews (National Producer Number / NPN #19991623; Nonresident Health License #W925384). Licensed to solicit and transact insurance in the State of Indiana and applicable nonresident jurisdictions.",
  marketplace:
    "Andrews Insurance Agency is a licensed independent insurance brokerage. This website is not the Health Insurance Marketplace® website and is not operated by, affiliated with, or endorsed by the federal government, the Centers for Medicare & Medicaid Services (CMS), or HealthCare.gov. Plan availability, premiums, and eligibility for premium tax credits or cost-sharing reductions are determined by the Marketplace and the issuing carrier.",
  medicare:
    "We do not offer every plan available in your area. Any information we provide is limited to those plans we do offer in your area. Please contact Medicare.gov, 1-800-MEDICARE (TTY 1-877-486-2048), or your local State Health Insurance Program (SHIP) to get information on all of your options. Andrews Insurance Agency is not connected with or endorsed by the U.S. government or the federal Medicare program.",
  sensitiveData:
    "For your protection, please do not enter Social Security numbers, driver's license numbers, payment card numbers, or medical history into this form.",
} as const;

export const homeFaqs = [
  {
    question: "What does an independent insurance agency do differently?",
    answer:
      "An independent agency is not tied to one insurance company. Andrews Insurance Agency compares coverage and pricing from multiple carriers on your behalf, explains the differences in plain English, and stays with you as your advocate when you have a billing question or a claim.",
  },
  {
    question: "Does it cost more to buy insurance through Andrews Insurance Agency?",
    answer:
      "No. Quotes and coverage reviews are free. Agencies are paid a commission by the insurance carrier that is already built into the premium, so you pay the same carrier rate whether or not you use a local broker.",
  },
  {
    question: "Which areas of Indiana do you serve?",
    answer:
      "Our office is in downtown Kendallville, and we serve clients across Northeast Indiana, including Noble, DeKalb, Allen, LaGrange and Steuben counties — Kendallville, Auburn, Fort Wayne, Garrett, Angola, Albion, Avilla, Ligonier and nearby communities.",
  },
  {
    question: "What auto insurance is required in Indiana?",
    answer:
      "Indiana requires liability limits of at least $25,000 for bodily injury per person, $50,000 per accident, and $25,000 for property damage, commonly written as 25/50/25. Many drivers choose higher limits because a serious accident can exceed the state minimum quickly.",
  },
  {
    question: "Can I get an insurance quote online?",
    answer:
      "Yes. Our online quote request takes about two minutes and never asks for a Social Security number. A licensed broker reviews your request and follows up with options. Coverage is not bound until a carrier approves your application and you receive written confirmation.",
  },
  {
    question: "Can you help with Health Insurance Marketplace (ACA) plans?",
    answer:
      "Yes. We help individuals and families compare ACA Marketplace plans during open enrollment and special enrollment periods, check eligibility for premium tax credits, and add dental and vision coverage. There is no extra charge for enrolling with a broker.",
  },
];

export const independentComparison = {
  columns: ["Independent agency (Andrews)", "Captive agent", "1-800 direct writer"],
  rows: [
    {
      feature: "Carriers compared for you",
      values: ["Multiple carriers", "One company", "One company"],
    },
    {
      feature: "Who you talk to",
      values: ["The same local broker every time", "A local agent for one brand", "Whoever answers the call queue"],
    },
    {
      feature: "If your rate goes up",
      values: ["We can re-shop other carriers", "Limited to that company's rates", "You re-shop on your own"],
    },
    {
      feature: "Help during a claim",
      values: ["Personal advocacy from your broker", "Varies by agent", "Call center claims line"],
    },
    {
      feature: "Auto, home, health, life and business in one place",
      values: ["Yes", "Depends on the company", "Usually limited lines"],
    },
    {
      feature: "In-person meetings in Kendallville",
      values: ["Yes", "Depends on office location", "No"],
    },
  ],
} as const;
