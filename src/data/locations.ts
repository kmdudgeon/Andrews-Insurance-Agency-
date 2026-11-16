import type { Faq } from "./coverage";

export type Location = {
  slug: string;
  city: string;
  county: string;
  isHeadquarters?: boolean;
  metaDescription: string;
  quickAnswer: string;
  intro: string;
  insights: { title: string; description: string }[];
  nearby: string[];
  faqs: Faq[];
};

const minimums =
  "Indiana requires auto liability limits of at least 25/50/25: $25,000 per person and $50,000 per accident for bodily injury, and $25,000 for property damage.";

export const locations: Location[] = [
  {
    slug: "kendallville-in",
    city: "Kendallville",
    county: "Noble",
    isHeadquarters: true,
    metaDescription:
      "Andrews Insurance Agency is a local independent insurance agency at 119 W. Mitchell St. #3 in downtown Kendallville, IN. Compare auto, home, health, life and business coverage.",
    quickAnswer:
      "Andrews Insurance Agency is an independent insurance agency located at 119 West Mitchell Street #3 in downtown Kendallville, Indiana. Principal Broker Justin Andrews compares auto, home, health, life and business insurance from multiple carriers for Noble County residents. Call (260) 582-7681, Monday through Friday, 9 AM to 5 PM.",
    intro:
      "Kendallville is home. Our office sits on West Mitchell Street in the heart of downtown, a short walk from Main Street, and we work with neighbors from Bixler Lake to the east side industrial park. When you call, you reach your broker, not a call tree.",
    insights: [
      { title: "Bixler Lake and nearby lake homes", description: "Homes near Bixler Lake, and seasonal cottages on Sylvan Lake in nearby Rome City, raise questions a standard policy may not answer: docks and lifts, watercraft liability, and flood exposure. We match lake properties with carriers that understand them." },
      { title: "US-6 and SR-3 traffic", description: "Kendallville sits at the crossing of US-6 and State Road 3, with steady truck traffic and commuters headed to Fort Wayne. Uninsured motorist coverage and liability limits above the state minimum are worth a look." },
      { title: "Older downtown homes", description: "Many Kendallville homes were built generations ago. Updates to roofing, wiring, plumbing and heating can affect both eligibility and price, and replacement cost can be much higher than market value." },
      { title: "Local employers and small business", description: "From Main Street storefronts to manufacturers and contractors, we help Kendallville businesses with liability, property, commercial auto and workers' compensation coverage." },
    ],
    nearby: ["Rome City", "Wolcottville", "Brimfield", "Wawaka", "Corunna"],
    faqs: [
      { question: "Where is Andrews Insurance Agency located in Kendallville?", answer: "Our office is at 119 West Mitchell Street #3, Kendallville, IN 46755, in downtown Kendallville. Office hours are Monday through Friday, 9:00 AM to 5:00 PM Eastern." },
      { question: "What auto insurance do Kendallville drivers need?", answer: minimums + " We often recommend higher limits for drivers who commute on US-6 or SR-3." },
      { question: "Can I meet with a broker in person?", answer: "Yes. In-person consultations are available at our Kendallville office by appointment, along with phone and video meetings. Request a time on our contact page or call (260) 582-7681." },
    ],
  },
  {
    slug: "auburn-in",
    city: "Auburn",
    county: "DeKalb",
    metaDescription:
      "Independent insurance for Auburn, IN and DeKalb County. Compare auto, home, health, life and business coverage with a local Northeast Indiana broker.",
    quickAnswer:
      "Andrews Insurance Agency serves Auburn and DeKalb County, Indiana from its Kendallville office about 20 minutes west. As an independent agency, we compare auto, home, health, life and commercial insurance from multiple carriers and meet Auburn clients by phone, video or in person.",
    intro:
      "Auburn is the DeKalb County seat and one of Northeast Indiana's busiest small cities. We work with Auburn families, commuters and business owners who want a broker who answers the phone and shops more than one company.",
    insights: [
      { title: "I-69 commuters", description: "With Interstate 69 on Auburn's west side, many residents commute to Fort Wayne or north toward Angola. Highway miles raise the stakes for liability, uninsured motorist and rental reimbursement coverage." },
      { title: "Classic and collector cars", description: "Auburn is known worldwide for its automotive heritage. Collector vehicles are best insured on an agreed-value policy rather than a standard auto policy that pays depreciated value." },
      { title: "New construction and growth", description: "Newer subdivisions around Auburn can qualify for new-home discounts, while replacement cost estimates should keep pace with rising building costs." },
      { title: "Manufacturing and trades", description: "DeKalb County's manufacturers, suppliers and contractors need general liability, workers' compensation and commercial auto coverage that satisfies customer contract requirements." },
    ],
    nearby: ["Garrett", "Waterloo", "Butler", "St. Joe", "Corunna"],
    faqs: [
      { question: "Do you serve clients in Auburn, Indiana?", answer: "Yes. We serve Auburn and all of DeKalb County by phone, email, video and in person at our Kendallville office, roughly 20 minutes from Auburn." },
      { question: "How should I insure a classic car in Auburn?", answer: "Collector vehicles are usually best protected with an agreed-value classic car policy, which sets the payout amount in advance and often costs less than standard auto coverage because of limited mileage." },
      { question: "What are Indiana's minimum auto insurance limits?", answer: minimums },
    ],
  },
  {
    slug: "fort-wayne-in",
    city: "Fort Wayne",
    county: "Allen",
    metaDescription:
      "Independent insurance broker serving Fort Wayne and Allen County, IN. Personal service on auto, home, health, life and business insurance from multiple carriers.",
    quickAnswer:
      "Andrews Insurance Agency serves Fort Wayne and Allen County, Indiana as an independent broker based in nearby Kendallville. We compare auto, home, health, life and business insurance from multiple carriers and give Fort Wayne clients direct access to their broker instead of a corporate call center.",
    intro:
      "Fort Wayne has no shortage of insurance offices. What our Allen County clients tell us they value is simple: one person who knows their policies, shops multiple carriers at renewal, and picks up the phone.",
    insights: [
      { title: "City traffic and I-69 / I-469", description: "More vehicles mean more claims. Fort Wayne drivers on I-69, I-469, US-30 and Coldwater Road benefit from higher liability limits and uninsured/underinsured motorist coverage." },
      { title: "Three rivers and flood risk", description: "Fort Wayne sits where the St. Marys, St. Joseph and Maumee rivers meet. Homeowners insurance does not cover flood, so homes near the rivers may need a separate flood policy." },
      { title: "Renters and condo owners", description: "For apartments and condos, renters and condo-unit policies protect belongings and liability at a low monthly cost and often qualify for an auto bundle discount." },
      { title: "Growing small businesses", description: "From home-based businesses to contractors and professional offices, we help Allen County owners line up liability, property and workers' compensation coverage." },
    ],
    nearby: ["Huntertown", "Leo-Cedarville", "New Haven", "Grabill", "Churubusco"],
    faqs: [
      { question: "Can a Kendallville agency insure my home or car in Fort Wayne?", answer: "Yes. We are licensed in Indiana and serve Fort Wayne and Allen County clients by phone, email and video, with in-person appointments available at our Kendallville office." },
      { question: "Is flood damage covered by homeowners insurance in Fort Wayne?", answer: "No. Standard homeowners policies exclude flood from rising water. Flood insurance is purchased separately, and we can help you determine whether it makes sense for your address." },
      { question: "What are Indiana's minimum auto insurance limits?", answer: minimums },
    ],
  },
  {
    slug: "garrett-in",
    city: "Garrett",
    county: "DeKalb",
    metaDescription:
      "Insurance for Garrett, IN families and businesses. Compare auto, home, health, life and commercial coverage with independent broker Andrews Insurance Agency.",
    quickAnswer:
      "Andrews Insurance Agency serves Garrett and southwestern DeKalb County, Indiana from its nearby Kendallville office. We compare auto, home, health, life and business insurance from multiple carriers so Garrett residents get coverage that fits, with a local broker to call for service and claims.",
    intro:
      "Garrett is a proud railroad town with deep roots. We help Garrett homeowners, drivers and business owners compare coverage without driving to Fort Wayne to do it.",
    insights: [
      { title: "Historic homes", description: "Many Garrett homes date to the city's railroad era. Roof age, wiring and heating updates influence which carriers will offer replacement cost coverage and at what price." },
      { title: "State Road 8 and SR-327", description: "Garrett drivers regularly travel SR-8 toward Auburn and Kendallville and SR-327 toward Fort Wayne. Rural two-lane roads make comprehensive coverage for deer strikes worth having." },
      { title: "Rail crossings and commuting", description: "Active rail lines run through town. Collision coverage and roadside assistance are inexpensive additions for daily commuters." },
    ],
    nearby: ["Auburn", "Altona", "Avilla", "Corunna", "LaOtto"],
    faqs: [
      { question: "Do you offer insurance in Garrett, Indiana?", answer: "Yes. We serve Garrett and DeKalb County with auto, home, health, life and business insurance, by phone, online, or in person at our Kendallville office." },
      { question: "Can I insure an older home in Garrett?", answer: "Usually, yes. Carriers will ask about updates to the roof, electrical, plumbing and heating systems. Because we work with multiple carriers, we can look for one that fits an older home." },
      { question: "What are Indiana's minimum auto insurance limits?", answer: minimums },
    ],
  },
  {
    slug: "angola-in",
    city: "Angola",
    county: "Steuben",
    metaDescription:
      "Insurance for Angola, IN and Steuben County lake country. Lake home, boat, auto, health, life and business coverage from an independent Northeast Indiana broker.",
    quickAnswer:
      "Andrews Insurance Agency serves Angola and Steuben County, Indiana, including Lake James and Hamilton Lake. As an independent agency, we compare lake home, boat, auto, health, life and business insurance from multiple carriers, with special attention to seasonal properties and watercraft.",
    intro:
      "Steuben County has more than a hundred lakes, and Angola is at the center of them. Lake living brings its own insurance questions, and we help year-round residents and seasonal owners answer them.",
    insights: [
      { title: "Lake James, Hamilton Lake and seasonal cottages", description: "Seasonal and secondary homes may have vacancy conditions, different water damage rules and separate limits for docks and boat lifts. We review how the property is used before recommending a carrier." },
      { title: "Boats and personal watercraft", description: "Pontoons, ski boats and jet skis need their own liability and physical damage coverage. Ask about coverage for guests operating your boat and off-season storage." },
      { title: "I-69 and the Indiana Toll Road", description: "Angola sits near the junction of I-69 and I-80/90. Heavy interstate and tourist traffic in summer makes strong liability limits important." },
      { title: "Lake-effect snow", description: "Steuben County winters bring heavy snow and ice. Roof collapse from the weight of snow is typically covered, while damage from poor maintenance is not." },
    ],
    nearby: ["Fremont", "Pleasant Lake", "Hamilton", "Orland", "Hudson"],
    faqs: [
      { question: "Do you insure lake homes around Angola?", answer: "Yes. We help owners of primary, seasonal and rental lake homes in Steuben County compare coverage, including docks, lifts and watercraft liability." },
      { question: "Does homeowners insurance cover my boat?", answer: "Only in a very limited way, if at all. Most boats and all personal watercraft should be insured on a separate boat policy that covers liability on the water and damage to the boat, motor and trailer." },
      { question: "What are Indiana's minimum auto insurance limits?", answer: minimums },
    ],
  },
  {
    slug: "albion-in",
    city: "Albion",
    county: "Noble",
    metaDescription:
      "Insurance for Albion, IN and central Noble County. Farm, home, auto, health, life and business coverage compared by a local independent broker.",
    quickAnswer:
      "Andrews Insurance Agency serves Albion, the Noble County seat, from its office in nearby Kendallville. We compare auto, home, farm, health, life and business insurance from multiple carriers for Albion-area families, farms and small businesses.",
    intro:
      "Albion is the heart of Noble County, surrounded by farmland and Chain O'Lakes State Park. We help Albion-area residents insure homes, vehicles, farms and families through one local broker.",
    insights: [
      { title: "Farms and rural property", description: "Acreage, pole barns, machinery and livestock are usually not covered properly by a homeowners policy. A farm policy combines the home, outbuildings, equipment and farm liability." },
      { title: "Chain O'Lakes area", description: "Homes and cabins near Chain O'Lakes State Park and area lakes may need attention to seasonal occupancy and watercraft." },
      { title: "State Roads 8 and 9", description: "Rural highways around Albion see farm equipment, deer and long distances between services. Comprehensive coverage, towing and rental reimbursement are practical additions." },
    ],
    nearby: ["Wolf Lake", "Kimmell", "Brimfield", "Merriam", "Wawaka"],
    faqs: [
      { question: "Do you write farm insurance near Albion?", answer: "Yes. We quote farm and agribusiness coverage for Noble County operations, including dwellings, outbuildings, machinery, livestock and farm liability." },
      { question: "Does homeowners insurance cover my pole barn?", answer: "A detached building used only for personal storage is usually covered under other structures, with a limit. If it is used for farming or business, it generally needs farm or commercial coverage." },
      { question: "What are Indiana's minimum auto insurance limits?", answer: minimums },
    ],
  },
  {
    slug: "avilla-in",
    city: "Avilla",
    county: "Noble",
    metaDescription:
      "Insurance for Avilla, IN. Independent quotes on auto, home, health, life and business insurance from Andrews Insurance Agency in nearby Kendallville.",
    quickAnswer:
      "Andrews Insurance Agency serves Avilla, Indiana, just a few minutes south of its Kendallville office on State Road 3. We compare auto, home, health, life and business insurance from multiple carriers for Avilla residents and offer in-person, phone and video appointments.",
    intro:
      "Avilla is right down the road from our office. Whether you commute to Fort Wayne or work in town, we make it simple to compare coverage and get answers from a neighbor.",
    insights: [
      { title: "SR-3 commuters", description: "State Road 3 is a main route between Kendallville and Fort Wayne. Daily commuters should review liability limits, uninsured motorist coverage and rental car reimbursement." },
      { title: "Bundling for families", description: "Insuring home and auto with the same carrier is one of the most reliable ways to lower premiums. We compare bundle pricing across carriers rather than assuming one is cheapest." },
      { title: "Storm season", description: "Hail and wind are the most common causes of roof claims in Noble County. Know whether your policy pays replacement cost or actual cash value on the roof." },
    ],
    nearby: ["Kendallville", "LaOtto", "Garrett", "Swan", "Huntertown"],
    faqs: [
      { question: "How close is your office to Avilla?", answer: "Our office at 119 West Mitchell Street #3 in Kendallville is roughly ten minutes north of Avilla on State Road 3." },
      { question: "Will my roof be covered at replacement cost?", answer: "It depends on the policy and the roof's age. Some carriers pay replacement cost, while others pay actual cash value on older roofs. We point out the difference when we compare quotes." },
      { question: "What are Indiana's minimum auto insurance limits?", answer: minimums },
    ],
  },
  {
    slug: "ligonier-in",
    city: "Ligonier",
    county: "Noble",
    metaDescription:
      "Insurance for Ligonier, IN and western Noble County. Compare auto, home, health, life and business coverage with independent broker Andrews Insurance Agency.",
    quickAnswer:
      "Andrews Insurance Agency serves Ligonier and western Noble County, Indiana from its Kendallville office on US-6. We compare auto, home, health, life and business insurance from multiple carriers for Ligonier families, manufacturers' employees and small business owners.",
    intro:
      "Ligonier is a hard-working community with a historic downtown and a strong manufacturing base. We help Ligonier households and businesses find coverage that fits their budget.",
    insights: [
      { title: "US-6 and US-33", description: "Ligonier sits where US-6 meets US-33 and State Road 5. Truck traffic and shift-change commutes make liability and uninsured motorist coverage important." },
      { title: "Health coverage for working families", description: "If employer coverage is unavailable or too expensive for dependents, a Marketplace plan with premium tax credits may cost less. We run the comparison for you at no charge." },
      { title: "Historic downtown buildings", description: "Older commercial buildings and homes need accurate replacement cost estimates and may benefit from ordinance or law coverage to pay for code upgrades after a loss." },
      { title: "Buggy and farm traffic", description: "Western Noble and neighboring LaGrange County roads are shared with horse-drawn buggies and farm equipment. Drive with care, and carry enough liability coverage." },
    ],
    nearby: ["Cromwell", "Wawaka", "Kimmell", "Topeka", "Millersburg"],
    faqs: [
      { question: "Do you serve Ligonier, Indiana?", answer: "Yes. We serve Ligonier and western Noble County by phone, online and in person at our Kendallville office, a straight drive east on US-6." },
      { question: "Can you help my family find health insurance?", answer: "Yes. We compare ACA Marketplace plans and check whether your household qualifies for premium tax credits. There is no extra cost for enrolling with a broker." },
      { question: "What are Indiana's minimum auto insurance limits?", answer: minimums },
    ],
  },
];

export function getLocation(slug: string) {
  return locations.find((location) => location.slug === slug);
}
