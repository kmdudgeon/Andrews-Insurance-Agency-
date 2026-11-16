export type Article = {
  slug: string;
  title: string;
  description: string;
  quickAnswer: string;
  updated: string;
  sections: { heading: string; paragraphs: string[]; list?: string[] }[];
  related: { href: string; label: string };
};

export const articles: Article[] = [
  {
    slug: "indiana-auto-insurance-requirements",
    title: "Indiana Auto Insurance Requirements Explained",
    description:
      "What 25/50/25 means, what Indiana requires drivers to carry, and why many Northeast Indiana drivers choose higher limits.",
    quickAnswer:
      "Indiana requires drivers to carry liability insurance of at least $25,000 per person and $50,000 per accident for bodily injury, and $25,000 for property damage, known as 25/50/25. Insurers must also offer uninsured and underinsured motorist coverage, which can be rejected only in writing.",
    updated: "2026-11-01",
    sections: [
      {
        heading: "What 25/50/25 means",
        paragraphs: [
          "Liability insurance pays for injuries and damage you cause to other people. The three numbers are the most your policy pays: $25,000 for one injured person, $50,000 total for everyone injured in one accident, and $25,000 for damage to other people's property.",
          "Liability coverage does not pay to repair your own vehicle. That is what collision and comprehensive coverage are for.",
        ],
      },
      {
        heading: "Why the minimum is often not enough",
        paragraphs: [
          "A new pickup truck can cost more than $50,000, and a single hospital stay can exceed $25,000. If the damage you cause is more than your limits, you can be personally responsible for the difference.",
          "Raising liability limits to 100/300/100 is usually a modest increase in premium compared with the protection it adds.",
        ],
      },
      {
        heading: "Coverages worth considering",
        paragraphs: ["Beyond liability, most drivers should review:"],
        list: [
          "Uninsured / underinsured motorist coverage, for when the at-fault driver has little or no insurance",
          "Comprehensive, which covers deer strikes, hail, theft and glass",
          "Collision, which repairs your vehicle after a crash regardless of fault",
          "Medical payments, rental reimbursement and roadside assistance",
        ],
      },
      {
        heading: "Proof of insurance and SR-22",
        paragraphs: [
          "Indiana drivers must be able to show proof of financial responsibility. After certain violations the BMV may require an SR-22, a certificate your insurer files with the state to confirm you carry at least the minimum coverage.",
        ],
      },
    ],
    related: { href: "/coverage/auto-insurance", label: "Auto insurance coverage options" },
  },
  {
    slug: "independent-agent-vs-captive-agent",
    title: "Independent Agent vs. Captive Agent vs. Buying Direct",
    description:
      "How the three ways to buy insurance differ, and when working with an independent agency makes the most sense.",
    quickAnswer:
      "An independent agent represents multiple insurance companies and can compare them for you. A captive agent sells for one company. Buying direct means dealing with a single insurer's website or call center. Independent agents cost nothing extra and can move your coverage if rates rise.",
    updated: "2026-11-01",
    sections: [
      {
        heading: "Independent agents",
        paragraphs: [
          "Independent agencies such as Andrews Insurance Agency are appointed with multiple carriers. We gather your information once, compare coverage and price across companies, and recommend the best fit.",
          "If your premium increases at renewal or your needs change, we can re-shop the market without you starting over with a new agent.",
        ],
      },
      {
        heading: "Captive agents",
        paragraphs: [
          "A captive agent works for or contracts with a single insurance company. You get local service, but the agent can only offer that company's products and prices.",
        ],
      },
      {
        heading: "Direct writers",
        paragraphs: [
          "Direct insurers sell online or by phone without a local agent. It can be quick for simple needs, but you compare companies on your own and work with a call center when you have a claim.",
        ],
      },
      {
        heading: "Does an independent agent cost more?",
        paragraphs: [
          "No. Agents are paid a commission by the carrier that is already part of the premium. You pay the carrier's filed rate whether you buy through an agent or not.",
        ],
      },
    ],
    related: { href: "/quote", label: "Request a multi-carrier quote" },
  },
  {
    slug: "water-backup-coverage-indiana-homes",
    title: "Water Backup Coverage: Why Indiana Homeowners Add It",
    description:
      "Sump pump failures and sewer backups are excluded from most homeowners policies. Here is how the water backup endorsement works.",
    quickAnswer:
      "Standard homeowners insurance excludes water that backs up through sewers or drains or overflows from a sump pump. A water backup endorsement adds this coverage, typically with limits from $5,000 to $25,000 or more. It is one of the most commonly recommended add-ons for Indiana homes with basements.",
    updated: "2026-11-01",
    sections: [
      {
        heading: "What a standard policy excludes",
        paragraphs: [
          "Homeowners policies generally cover sudden, accidental water damage such as a burst pipe. They exclude water that enters through a backed-up sewer or drain, or that overflows when a sump pump fails or loses power.",
        ],
      },
      {
        heading: "What the endorsement covers",
        paragraphs: [
          "A water backup endorsement pays to clean up and repair damage to the building and your belongings, up to the limit you select. Choose a limit that reflects how your basement is finished and what you store there.",
        ],
      },
      {
        heading: "Backup is not flood",
        paragraphs: [
          "Water backup coverage does not cover flooding from rising surface water, such as an overflowing river or lake. That requires a separate flood insurance policy.",
        ],
      },
      {
        heading: "Simple prevention steps",
        paragraphs: ["A few inexpensive steps reduce the odds of a claim:"],
        list: [
          "Test your sump pump each spring and before long trips",
          "Add a battery backup or water-powered backup pump",
          "Keep gutters clear and downspouts extended away from the foundation",
          "Store valuables off the basement floor",
        ],
      },
    ],
    related: { href: "/coverage/homeowners-insurance", label: "Homeowners insurance coverage options" },
  },
  {
    slug: "aca-marketplace-enrollment-guide-indiana",
    title: "ACA Marketplace Enrollment Guide for Indiana Families",
    description:
      "When you can enroll, how premium tax credits work, and how a local broker helps at no extra cost.",
    quickAnswer:
      "Indiana residents buy individual health insurance through the federal Marketplace at HealthCare.gov. You can enroll during annual open enrollment, which typically begins November 1, or within about 60 days of a qualifying life event. Premium tax credits are based on household income, and broker help is free.",
    updated: "2026-11-01",
    sections: [
      {
        heading: "When you can enroll",
        paragraphs: [
          "Open enrollment happens once a year. Outside that window you need a special enrollment period triggered by a qualifying life event, such as losing employer coverage, marriage, the birth of a child or a move.",
          "Deadlines can change from year to year, so confirm current dates at HealthCare.gov or call us.",
        ],
      },
      {
        heading: "Metal levels in plain English",
        paragraphs: ["Plans are grouped by how costs are shared between you and the insurer:"],
        list: [
          "Bronze: lowest premiums, highest costs when you need care",
          "Silver: moderate premiums and costs; the only level eligible for cost-sharing reductions",
          "Gold: higher premiums, lower costs when you need care",
          "Catastrophic: available to people under 30 or with a hardship exemption",
        ],
      },
      {
        heading: "Premium tax credits",
        paragraphs: [
          "Many households qualify for tax credits that lower the monthly premium. The amount depends on your projected household income and family size for the coverage year. We help you estimate it before you apply.",
        ],
      },
      {
        heading: "What to have ready",
        paragraphs: ["To compare plans efficiently, gather:"],
        list: [
          "Household size and ages",
          "Projected annual household income",
          "Your preferred doctors, hospitals and prescriptions",
          "Details of any employer coverage offered to you",
        ],
      },
    ],
    related: { href: "/coverage/health-insurance", label: "Health, dental and vision coverage" },
  },
];

export function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug);
}

export const glossary: { term: string; definition: string }[] = [
  { term: "Actual cash value (ACV)", definition: "The value of damaged property after subtracting depreciation for age and wear. Pays less than replacement cost." },
  { term: "Binder", definition: "Temporary written proof that coverage is in effect until the formal policy is issued. Only a licensed representative or carrier can issue a binder." },
  { term: "Bodily injury liability", definition: "Auto coverage that pays for injuries you cause to other people in an accident." },
  { term: "Business owners policy (BOP)", definition: "A package policy for small businesses that combines property, general liability and business income coverage." },
  { term: "Certificate of insurance (COI)", definition: "A document that summarizes a business's coverage as proof of insurance for a customer, landlord or general contractor." },
  { term: "Collision coverage", definition: "Auto coverage that pays to repair or replace your vehicle after a crash with another vehicle or object, regardless of fault." },
  { term: "Comprehensive coverage", definition: "Auto coverage for damage not caused by a collision, such as theft, hail, fire, falling objects and animal strikes." },
  { term: "Copay", definition: "A fixed dollar amount you pay for a covered health service, such as a doctor visit or prescription." },
  { term: "Declarations page", definition: "The first page of a policy listing who and what is insured, coverage limits, deductibles and premium." },
  { term: "Deductible", definition: "The amount you pay out of pocket on a covered claim before insurance pays." },
  { term: "Endorsement", definition: "A written change to a policy that adds, removes or modifies coverage. Also called a rider." },
  { term: "Exclusion", definition: "A cause of loss, property or situation that a policy specifically does not cover." },
  { term: "General liability", definition: "Business coverage for claims that your operations caused bodily injury or property damage to others." },
  { term: "Liability limit", definition: "The maximum amount an insurer will pay for a covered liability claim." },
  { term: "Out-of-pocket maximum", definition: "The most you pay for covered health services in a plan year. After you reach it, the plan pays 100% of covered costs." },
  { term: "Premium", definition: "The amount you pay for an insurance policy, typically billed monthly, semiannually or annually." },
  { term: "Premium tax credit", definition: "A federal subsidy that lowers the monthly premium for eligible households who buy health coverage through the Marketplace." },
  { term: "Replacement cost", definition: "The cost to repair or replace damaged property with new materials of like kind and quality, without subtracting depreciation." },
  { term: "SR-22", definition: "A certificate of financial responsibility that an insurer files with the state to prove a driver carries the required liability insurance." },
  { term: "Term life insurance", definition: "Life insurance that covers a set period, such as 20 years, and pays a death benefit only if the insured dies during the term." },
  { term: "Umbrella policy", definition: "Extra liability insurance that pays after the limits of your home, auto or watercraft policies are used up." },
  { term: "Underwriting", definition: "The process an insurance carrier uses to evaluate risk and decide whether to offer coverage and at what price." },
  { term: "Uninsured motorist coverage", definition: "Auto coverage that pays for your injuries, and in some cases property damage, when the at-fault driver has no insurance." },
  { term: "Whole life insurance", definition: "Permanent life insurance with level premiums, a guaranteed death benefit and cash value that grows over time." },
  { term: "Workers' compensation", definition: "Coverage that pays medical bills and lost wages for employees injured on the job, and protects employers from related lawsuits." },
];
