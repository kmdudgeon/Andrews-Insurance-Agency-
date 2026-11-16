import type { CoverageKey } from "./agency-config";

export type Faq = { question: string; answer: string };

export type CoverageLine = {
  slug: string;
  key: CoverageKey;
  name: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  quickAnswer: string;
  intro: string;
  facts: { term: string; detail: string }[];
  coverages: { title: string; description: string }[];
  localInsights: { title: string; description: string }[];
  comparison?: {
    caption: string;
    headers: string[];
    rows: string[][];
  };
  faqs: Faq[];
};

export const coverageLines: CoverageLine[] = [
  {
    slug: "auto-insurance",
    key: "auto",
    name: "Auto Insurance",
    h1: "Auto & Recreational Vehicle Insurance in Kendallville, Indiana",
    metaTitle: "Auto Insurance in Kendallville, IN | Car, Motorcycle, RV & Boat",
    metaDescription:
      "Compare auto, motorcycle, RV and boat insurance from multiple carriers with a local Kendallville broker. Indiana 25/50/25 minimums, SR-22 filings and multi-policy bundles.",
    quickAnswer:
      "Andrews Insurance Agency compares auto insurance from multiple carriers for drivers in Kendallville and Northeast Indiana. Indiana requires at least 25/50/25 liability coverage. We quote personal auto, teen drivers, SR-22 filings, motorcycles, classic cars, RVs and boats, and can bundle auto with home for additional savings.",
    intro:
      "Protecting your vehicle and your peace of mind is our priority. Because we are independent, we shop your auto insurance with multiple carriers and tailor the limits, deductibles and endorsements to how you actually drive, so you are covered in every situation and have reliable protection on the road.",
    facts: [
      { term: "Indiana minimum liability", detail: "25/50/25 ($25,000 per person, $50,000 per accident, $25,000 property damage)" },
      { term: "Vehicles we insure", detail: "Cars, trucks, motorcycles, classic cars, RVs, boats and personal watercraft" },
      { term: "Filings", detail: "SR-22 certificates of financial responsibility" },
      { term: "Ways to save", detail: "Multi-car, multi-policy bundle, safe driver and good student discounts (vary by carrier)" },
    ],
    coverages: [
      { title: "Personal auto", description: "Liability, collision, comprehensive, medical payments, and uninsured/underinsured motorist coverage for your daily drivers." },
      { title: "Teen & new drivers", description: "Guidance on adding a young driver, good student discounts and telematics programs that can lower the cost of a new license." },
      { title: "SR-22 filings", description: "If the Indiana BMV requires proof of financial responsibility, we help you find a carrier that files the SR-22 for you." },
      { title: "Motorcycle & classic car", description: "Agreed-value options for collector vehicles and seasonal coverage choices for bikes that are stored over winter." },
      { title: "RV & camper", description: "Coverage for motorhomes and travel trailers, including personal belongings and campsite liability." },
      { title: "Boat & watercraft", description: "Protection for pontoons, fishing boats and personal watercraft on Northeast Indiana lakes, on the water and on the trailer." },
    ],
    localInsights: [
      { title: "Lake season on Sylvan, Bixler, James and Hamilton", description: "A homeowners policy usually offers very limited boat coverage. A separate watercraft policy covers liability on the water, physical damage, and the trailer ride to and from the launch." },
      { title: "Deer and rural roads", description: "Deer collisions are common across Noble and DeKalb counties, especially in fall. They are covered under comprehensive, not collision, so your comprehensive deductible matters." },
      { title: "Commuting on US-6, SR-3 and I-69", description: "If you commute to Auburn or Fort Wayne, higher liability limits and uninsured motorist coverage help protect your income after a serious highway crash." },
    ],
    comparison: {
      caption: "Indiana minimum limits compared with a commonly chosen higher limit",
      headers: ["Coverage", "Indiana minimum", "Commonly chosen"],
      rows: [
        ["Bodily injury per person", "$25,000", "$100,000"],
        ["Bodily injury per accident", "$50,000", "$300,000"],
        ["Property damage", "$25,000", "$100,000"],
      ],
    },
    faqs: [
      { question: "What is the minimum car insurance required in Indiana?", answer: "Indiana requires liability coverage of at least $25,000 per person and $50,000 per accident for bodily injury, plus $25,000 for property damage (25/50/25). Insurers must also offer uninsured and underinsured motorist coverage, which you may reject in writing." },
      { question: "Can you file an SR-22 for me in Indiana?", answer: "Yes. If the Indiana BMV requires an SR-22, we help you find a carrier that will issue the policy and file the certificate electronically with the state. Call (260) 582-7681 to get started." },
      { question: "Does my auto policy cover my boat or RV?", answer: "Generally no. Boats, personal watercraft, motorhomes and campers need their own policies or endorsements. We can quote them alongside your auto policy and look for multi-policy discounts." },
      { question: "How can I lower my auto insurance premium?", answer: "Common options include bundling auto with home or renters insurance, raising deductibles, insuring multiple vehicles together, and asking about safe driver, good student or telematics discounts. Because we compare multiple carriers, we can also re-shop your coverage when rates change." },
    ],
  },
  {
    slug: "homeowners-insurance",
    key: "home",
    name: "Homeowners Insurance",
    h1: "Home, Condo, Manufactured & Lake Property Insurance",
    metaTitle: "Homeowners Insurance in Kendallville, IN | Home, Condo & Lake Property",
    metaDescription:
      "Independent homeowners insurance quotes in Kendallville and Northeast Indiana for homes, condos, renters, manufactured homes, lake properties, landlords and umbrella policies.",
    quickAnswer:
      "Andrews Insurance Agency compares homeowners insurance from multiple carriers for Northeast Indiana properties, including single-family homes, condos, rentals, manufactured and modular homes, and lake or seasonal properties. We review dwelling limits, wind and hail deductibles, water backup coverage and personal umbrella options so your policy matches your home.",
    intro:
      "Our clients trust us to cover them for every eventuality. Your home is likely your largest asset, so we look past the premium to the details that decide how a claim is paid: replacement cost, deductibles, and the endorsements Indiana homes commonly need.",
    facts: [
      { term: "Properties we insure", detail: "Houses, condos, rentals, manufactured and modular homes, lakefront and seasonal homes" },
      { term: "Often overlooked", detail: "Water backup / sump pump overflow, service line, and equipment breakdown endorsements" },
      { term: "Deductibles", detail: "Flat dollar or percentage wind/hail deductibles, depending on carrier" },
      { term: "Extra liability", detail: "Personal umbrella policies, commonly starting at $1 million" },
    ],
    coverages: [
      { title: "Homeowners (HO-3 / HO-5)", description: "Dwelling, other structures, personal property, loss of use and personal liability for owner-occupied homes." },
      { title: "Condo & renters", description: "Coverage for your belongings, interior improvements and liability, whether you own a unit or rent." },
      { title: "Manufactured & modular homes", description: "Policies built for factory-built homes, on private land or in a community." },
      { title: "Lakefront & seasonal homes", description: "Coverage for cottages and second homes, including docks, lifts and vacancy considerations." },
      { title: "Landlord / dwelling fire", description: "Protection for rental houses and investment property, including loss of rental income." },
      { title: "Personal umbrella", description: "Additional liability protection that sits on top of your home and auto policies." },
    ],
    localInsights: [
      { title: "Sump pumps and basements", description: "Water that backs up through a sewer, drain or failed sump pump is normally excluded from a standard homeowners policy. A water backup endorsement adds it back and is one of the most valuable add-ons for Indiana homes." },
      { title: "Wind and hail deductibles", description: "Spring and summer storms bring hail and straight-line winds to Northeast Indiana. Some carriers apply a separate percentage deductible for wind or hail, so it pays to know which one your policy uses." },
      { title: "Flood is separate", description: "Flood damage from rising water is not covered by homeowners insurance. Properties near lakes, rivers and low-lying areas may need a separate flood policy." },
    ],
    faqs: [
      { question: "Does homeowners insurance cover a flooded basement?", answer: "It depends on the cause. A burst pipe is usually covered. Water backing up through a drain or failed sump pump is covered only if you add a water backup endorsement. Flooding from rising surface water requires a separate flood insurance policy." },
      { question: "Can you insure a manufactured or modular home?", answer: "Yes. We work with carriers that write manufactured and modular homes, whether the home sits on your own land or in a community. Coverage can include the home, your belongings, liability and attached structures." },
      { question: "How much dwelling coverage do I need?", answer: "Dwelling coverage should reflect the cost to rebuild your home at today's labor and material prices, not its market value or tax assessment. We run a replacement cost estimate with each quote." },
      { question: "Do I need special coverage for a lake house?", answer: "Seasonal and lakefront homes often need attention to vacancy rules, docks and boat lifts, watercraft liability and flood exposure. Tell us how the property is used and we will match it with a carrier that fits." },
    ],
  },
  {
    slug: "health-insurance",
    key: "health",
    name: "Health Insurance",
    h1: "Individual & Family Health, Dental & Vision Insurance",
    metaTitle: "Health Insurance in Kendallville, IN | ACA Marketplace, Dental & Vision",
    metaDescription:
      "Local help comparing ACA Marketplace health plans, dental and vision coverage, and short-term medical options in Kendallville and Northeast Indiana.",
    quickAnswer:
      "Andrews Insurance Agency helps Northeast Indiana individuals and families compare ACA Marketplace health plans, off-exchange medical, short-term health, and dental and vision coverage. Indiana uses the federal HealthCare.gov Marketplace. Enrolling through a licensed broker costs nothing extra, and we check your eligibility for premium tax credits.",
    intro:
      "With established relationships with numerous carriers, we can put together a reliable health insurance plan for you and your family. We walk you through networks, deductibles and out-of-pocket maximums so you understand what you are buying before you enroll.",
    facts: [
      { term: "Marketplace", detail: "Indiana uses the federal Health Insurance Marketplace (HealthCare.gov)" },
      { term: "Open enrollment", detail: "Typically begins November 1 each year; confirm current deadlines at HealthCare.gov" },
      { term: "Special enrollment", detail: "Generally 60 days after a qualifying life event such as losing coverage, marriage, a move or a birth" },
      { term: "Dental & vision", detail: "Standalone plans available year-round from carriers including Ameritas and VSP" },
    ],
    coverages: [
      { title: "ACA Marketplace plans", description: "Bronze, Silver, Gold and Catastrophic plans with help applying premium tax credits and cost-sharing reductions when you qualify." },
      { title: "Off-exchange & short-term medical", description: "Options outside the Marketplace, including temporary coverage to bridge a gap between plans." },
      { title: "Dental insurance", description: "Individual and family dental plans covering preventive care, basic services and major work." },
      { title: "Vision insurance", description: "Plans that help pay for eye exams, frames, lenses and contacts." },
      { title: "HSA-compatible plans", description: "High-deductible health plans that pair with a tax-advantaged Health Savings Account." },
    ],
    localInsights: [
      { title: "Check your doctors and hospitals first", description: "Plan networks differ. Before you enroll, we confirm that the Northeast Indiana physicians and hospital systems you rely on are in network for the plan you are considering." },
      { title: "Self-employed and farm families", description: "If you do not have employer coverage, a Marketplace plan with tax credits is often the most affordable path. We estimate your subsidy from your projected household income." },
      { title: "Losing employer coverage", description: "A job change usually opens a 60-day special enrollment period. Compare a Marketplace plan with COBRA before you decide; COBRA is frequently the more expensive option." },
    ],
    faqs: [
      { question: "Does it cost extra to enroll in a Marketplace plan through a broker?", answer: "No. Premiums are the same whether you enroll through HealthCare.gov directly or with a licensed broker. Our help comparing plans and completing the application is free to you." },
      { question: "When can I enroll in health insurance?", answer: "You can enroll during the annual open enrollment period, which typically begins November 1, or within about 60 days of a qualifying life event such as losing other coverage, getting married, having a baby or moving. Check HealthCare.gov for current deadlines." },
      { question: "Can I buy dental and vision insurance without a health plan?", answer: "Yes. Standalone dental and vision plans can be purchased at any time of year, on their own or alongside a medical plan." },
      { question: "Do you offer Medicare or Medicaid plans?", answer: "No. We do not sell or enroll Medicare or Medicaid plans. For Medicare, visit Medicare.gov or call 1-800-MEDICARE. For Indiana Medicaid programs, contact the Indiana Family and Social Services Administration (FSSA)." },
    ],
  },
  {
    slug: "life-insurance",
    key: "life",
    name: "Life Insurance",
    h1: "Term, Whole Life & Final Expense Insurance",
    metaTitle: "Life Insurance in Kendallville, IN | Term, Whole Life & Final Expense",
    metaDescription:
      "Compare term life, whole life, universal life, final expense and mortgage protection with a local independent broker. Free life insurance needs estimator.",
    quickAnswer:
      "Andrews Insurance Agency helps Northeast Indiana families compare term life, whole life, universal life, final expense and mortgage protection insurance from multiple carriers. A common starting point is enough coverage to replace income, pay off the mortgage and fund education. Use our free estimator below, then request quotes.",
    intro:
      "We offer different packages tailored to meet your personal, ever-changing needs. Marriage, a new home, a child or a business are all moments to revisit how much protection your family would need if your income stopped.",
    facts: [
      { term: "Term life", detail: "Coverage for a set period, commonly 10, 20 or 30 years; generally the lowest cost per dollar of coverage" },
      { term: "Whole life", detail: "Lifetime coverage with level premiums and guaranteed cash value" },
      { term: "Final expense", detail: "Smaller whole life policies intended to cover funeral and end-of-life costs" },
      { term: "Mortgage protection", detail: "Term coverage sized and timed to pay off your home loan" },
    ],
    coverages: [
      { title: "Term life", description: "Affordable protection for the years your family depends on your income most." },
      { title: "Whole life", description: "Permanent coverage that builds cash value and never expires while premiums are paid." },
      { title: "Universal life", description: "Permanent coverage with flexible premiums and adjustable death benefits." },
      { title: "Final expense", description: "Simplified-issue policies to keep funeral and medical bills from falling on family." },
      { title: "Mortgage protection", description: "Coverage designed so your family can stay in the home if you pass away." },
      { title: "Business & key person", description: "Life insurance to fund buy-sell agreements or protect a business from the loss of an owner." },
    ],
    localInsights: [
      { title: "Employer coverage is rarely enough", description: "Group life insurance through work is often one or two times salary and usually ends when you leave the job. A personal policy stays with you." },
      { title: "Lock in rates while you are healthy", description: "Premiums are based largely on age and health at the time you apply. Buying earlier typically means a lower rate for the full term." },
    ],
    comparison: {
      caption: "Term vs. whole life vs. final expense at a glance",
      headers: ["Feature", "Term life", "Whole life", "Final expense"],
      rows: [
        ["Length of coverage", "10–30 years", "Lifetime", "Lifetime"],
        ["Typical coverage amount", "$100,000 – $1,000,000+", "$25,000 – $500,000+", "$5,000 – $35,000"],
        ["Builds cash value", "No", "Yes", "Yes, modest"],
        ["Relative cost", "Lowest", "Higher", "Moderate for small amounts"],
        ["Best suited for", "Income replacement, mortgage", "Lifelong needs, legacy", "Funeral and final bills"],
      ],
    },
    faqs: [
      { question: "How much life insurance do I need?", answer: "A common approach adds up the income your family would need to replace, your mortgage and other debts, and future costs such as college, then subtracts savings and existing coverage. Our estimator on this page does the math in your browser." },
      { question: "What is the difference between term and whole life insurance?", answer: "Term life covers you for a fixed period and pays only if you die during the term, which makes it the most affordable. Whole life lasts your entire life, has level premiums and builds cash value, at a higher cost." },
      { question: "Do I need a medical exam?", answer: "Not always. Many carriers offer accelerated or simplified underwriting with health questions instead of an exam, depending on your age, health and the coverage amount." },
      { question: "What is final expense insurance?", answer: "Final expense insurance is a small whole life policy, often $5,000 to $35,000, designed to pay funeral costs and remaining bills. It usually has simplified underwriting and premiums that never increase." },
    ],
  },
  {
    slug: "disability-insurance",
    key: "disability",
    name: "Disability Insurance",
    h1: "Short-Term & Long-Term Disability Insurance",
    metaTitle: "Disability Insurance in Kendallville, IN | Short-Term & Long-Term",
    metaDescription:
      "Protect your paycheck with short-term and long-term disability insurance. A local independent broker compares disability income coverage from many insurance companies.",
    quickAnswer:
      "Andrews Insurance Agency helps Northeast Indiana workers, self-employed people and employers compare short-term and long-term disability insurance. Disability insurance replaces part of your income if an illness or injury keeps you from working. We compare benefit amounts, waiting periods and benefit periods across many insurance companies.",
    intro:
      "Your ability to earn a living is likely your most valuable asset. If an illness or injury kept you off the job for months, disability insurance keeps money coming in for the mortgage, groceries and bills. We help you choose coverage that fits your occupation, income and budget.",
    facts: [
      { term: "Short-term disability", detail: "Replaces part of your income for a limited time, commonly a few months up to a year" },
      { term: "Long-term disability", detail: "Starts after a longer waiting period and can pay for years, or to retirement age, depending on the policy" },
      { term: "Typical benefit", detail: "A percentage of your income, often around 50% to 70%, depending on the policy" },
      { term: "Who it is for", detail: "Employees, self-employed people, business owners and employer groups" },
    ],
    coverages: [
      { title: "Short-term disability", description: "Income replacement for shorter absences such as recovery from surgery, an injury or a serious illness." },
      { title: "Long-term disability", description: "Protection against a lasting illness or injury that keeps you out of work for an extended period." },
      { title: "Individual policies", description: "Coverage you own personally, so it stays with you if you change jobs." },
      { title: "Self-employed & business owners", description: "Income protection when there is no employer plan or paid leave to fall back on." },
      { title: "Employer group plans", description: "Short-term and long-term disability benefits that businesses can offer to their employees." },
      { title: "Supplementing work coverage", description: "Additional coverage to fill the gap when an employer plan replaces only part of your pay." },
    ],
    localInsights: [
      { title: "Workers' compensation only covers work injuries", description: "Most disabilities come from illnesses and injuries that happen off the job, which workers' compensation does not cover. Disability insurance covers you whether or not it happened at work." },
      { title: "Trades, manufacturing and farm work", description: "If your income depends on physical work, even a moderate injury can stop your paycheck. How a policy defines disability for your occupation matters, and we walk you through it." },
      { title: "Check what your employer already provides", description: "Many employer plans cover only part of your pay and end if you leave. Bring your benefits summary and we will show you where the gaps are." },
    ],
    comparison: {
      caption: "Short-term vs. long-term disability at a glance",
      headers: ["Feature", "Short-term disability", "Long-term disability"],
      rows: [
        ["Waiting period before benefits", "Often 0–14 days", "Often 90–180 days"],
        ["How long benefits can last", "Months, up to about a year", "Years, or to retirement age"],
        ["Typical use", "Surgery, injury, short illness", "Lasting illness or injury"],
      ],
    },
    faqs: [
      { question: "What is the difference between short-term and long-term disability insurance?", answer: "Short-term disability starts quickly and pays for a limited time, commonly a few months up to a year. Long-term disability begins after a longer waiting period, often 90 to 180 days, and can pay for years or until retirement age, depending on the policy." },
      { question: "How much of my income does disability insurance replace?", answer: "It depends on the policy. Many plans replace roughly 50% to 70% of your income, up to a monthly maximum. We compare benefit amounts and costs across insurance companies so you can choose what fits." },
      { question: "Can I get disability insurance if I am self-employed?", answer: "Yes. Individual disability policies are available to self-employed people and business owners. The insurance company will ask about your occupation and income to determine the benefit you qualify for." },
      { question: "Doesn't workers' compensation cover me if I can't work?", answer: "Only for injuries and illnesses caused by your job. Disability insurance covers conditions that happen off the job as well, which is where most disabilities come from." },
    ],
  },
  {
    slug: "commercial-insurance",
    key: "commercial",
    name: "Commercial Insurance",
    h1: "Business, Corporate, Garage & Liability Insurance",
    metaTitle: "Business Insurance in Kendallville, IN | Liability, Garage Policies & BOP",
    metaDescription:
      "Commercial and corporate insurance for Northeast Indiana businesses: liability policies, garage policies, business owners policies, commercial auto, workers' compensation and farm coverage.",
    quickAnswer:
      "Andrews Insurance Agency compares commercial insurance from many insurance companies for small businesses, corporations, contractors and farms in Noble, DeKalb and surrounding Indiana counties. We quote liability policies, garage policies, business owners policies (BOP), commercial auto, workers' compensation, contractor liability and farm coverage, and issue certificates of insurance on request.",
    intro:
      "Your business is unique, and a one-size-fits-all policy rarely fits. We learn how your operation works, then compare carriers to build coverage for your property, vehicles, employees and liability, with one local broker to call when you need a certificate or have a claim.",
    facts: [
      { term: "Core policies", detail: "Liability, garage policies, BOP, commercial property, commercial auto, workers' compensation" },
      { term: "Who we serve", detail: "Corporations and small businesses, auto dealers and repair shops, contractors, retail, offices, landlords and farms" },
      { term: "Workers' compensation", detail: "Generally required for Indiana employers with employees" },
      { term: "Certificates of insurance", detail: "Requested online through our Service Center" },
    ],
    coverages: [
      { title: "General liability", description: "Protection against third-party bodily injury, property damage and advertising injury claims." },
      { title: "Garage policy", description: "Coverage built for auto dealers, repair shops, body shops and towing operators, including garage liability and garagekeepers coverage for customers' vehicles in your care." },
      { title: "Professional & umbrella liability", description: "Errors and omissions coverage for professional services, plus commercial umbrella policies that add liability limits above your other policies." },
      { title: "Business owners policy (BOP)", description: "Property, liability and business income coverage bundled for small and mid-sized businesses." },
      { title: "Commercial auto", description: "Coverage for trucks, vans, trailers and employees driving on company business." },
      { title: "Workers' compensation", description: "Medical and wage benefits for employees injured on the job, plus employer liability." },
      { title: "Contractor & artisan liability", description: "Policies for builders, electricians, plumbers, landscapers and other trades, including tools and equipment." },
      { title: "Farm & agribusiness", description: "Coverage for farm dwellings, outbuildings, machinery, livestock and farm liability." },
    ],
    localInsights: [
      { title: "Contractors need certificates fast", description: "General contractors and property owners routinely require proof of insurance before work begins. Request a certificate of insurance through our Service Center and we will handle it with your carrier." },
      { title: "Farm policies are not homeowners policies", description: "A standard homeowners policy typically excludes farming operations. Noble and DeKalb County farms need a farm policy that covers equipment, structures and farm liability." },
      { title: "Protect your income, not just your building", description: "Business income coverage helps replace lost revenue and pay ongoing expenses if a covered loss such as a fire or windstorm forces you to close temporarily." },
    ],
    faqs: [
      { question: "What insurance does a small business in Indiana need?", answer: "Most small businesses start with general liability and property coverage, often combined in a business owners policy. Businesses with employees generally need workers' compensation, and those with vehicles need commercial auto. Your industry and contracts may require more." },
      { question: "Is workers' compensation required in Indiana?", answer: "Indiana generally requires employers to carry workers' compensation insurance for their employees, with limited exceptions. Sole proprietors and partners can often choose whether to cover themselves." },
      { question: "How do I get a certificate of insurance (COI)?", answer: "Existing clients can request a certificate through our online Service Center or by calling (260) 582-7681. Certificates are issued once verified with your carrier; a website request alone does not change coverage." },
      { question: "What is a garage policy?", answer: "A garage policy is commercial coverage designed for businesses that sell, service, repair, store or tow vehicles. It typically combines garage liability for your operations with garagekeepers coverage, which protects customers' vehicles while they are in your care." },
      { question: "Do you insure farms?", answer: "Yes. We quote farm and agribusiness policies covering dwellings, barns and outbuildings, machinery, livestock and farm liability for operations across Northeast Indiana." },
    ],
  },
];

export function getCoverageLine(slug: string) {
  return coverageLines.find((line) => line.slug === slug);
}
