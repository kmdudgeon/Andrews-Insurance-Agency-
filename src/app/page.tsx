import type { Metadata } from "next";
import Link from "next/link";
import {
  Activity,
  ArrowRight,
  BadgeCheck,
  Briefcase,
  Car,
  HandHeart,
  HeartPulse,
  Home,
  MapPin,
  Phone,
  Scale,
  Star,
  Umbrella,
} from "lucide-react";
import { ComparisonMatrix } from "@/components/ComparisonMatrix";
import { CtaBand } from "@/components/CtaBand";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { agency, broker, counties, coverageOptions, homeFaqs } from "@/data/agency-config";
import { coverageLines } from "@/data/coverage";
import { locations } from "@/data/locations";
import { pageMetadata } from "@/lib/metadata";
import { buildPageSchema } from "@/lib/schema";

const title = "Andrews Insurance Agency | Independent Insurance in Kendallville, IN";
const description =
  "Independent insurance agency in Kendallville, Indiana. Compare auto, home, health, life, disability and business insurance from about 50 companies with a local broker. Free quotes.";

export const metadata: Metadata = {
  ...pageMetadata({ title, description, path: "/" }),
  title: { absolute: title },
};

const icons = {
  auto: Car,
  home: Home,
  health: HeartPulse,
  life: Umbrella,
  disability: Activity,
  commercial: Briefcase,
};

const trust = [
  { icon: Scale, title: "Independent agency freedom", text: `We shop ${agency.carrierCount} insurance companies for you.` },
  { icon: Star, title: `${agency.reputation.googleRating}-star local reputation`, text: "Rated 5.0 out of 5 on Google Reviews." },
  { icon: BadgeCheck, title: "Licensed Indiana broker", text: `NPN #${broker.npn}`, mono: true },
  { icon: HandHeart, title: "Direct claims advocacy", text: "We stand with you when you file a claim." },
];

export default function HomePage() {
  return (
    <>
      <JsonLd schema={buildPageSchema({ path: "/", title, description, faqs: homeFaqs })} />

      <section className="on-dark relative overflow-hidden bg-gradient-to-br from-navy-950 via-navy-900 to-navy-700 text-white">
        <svg aria-hidden="true" className="pointer-events-none absolute -top-10 -right-24 hidden h-[34rem] w-[34rem] opacity-20 lg:block" viewBox="0 0 200 200" fill="none">
          <path d="M100 12 28 40v52c0 46 30 80 72 96 42-16 72-50 72-96V40Z" stroke="#fbbf24" strokeWidth="2" />
          <path d="M100 30 44 52v40c0 37 23 64 56 78 33-14 56-41 56-78V52Z" stroke="#fff" strokeWidth="1.5" />
          <path d="m72 98 20 20 38-42" stroke="#fbbf24" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div className="container-page relative py-14 sm:py-20">
          <p className="text-sm font-semibold tracking-wider text-gold uppercase">
            Welcome to Andrews Insurance
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-extrabold sm:text-5xl lg:text-6xl">
            The Sensible Approach to Risk Management
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-navy-100 sm:text-xl">
            We are an independent agency in Kendallville that shops {agency.carrierCount} insurance
            companies for your auto, home, health, life, disability and business coverage, so
            Northeast Indiana families get the right protection at a fair price.
          </p>

          <div className="mt-8 max-w-4xl rounded-2xl border border-white/20 bg-white/10 p-4 sm:p-5">
            <h2 className="font-sans text-base font-semibold tracking-normal text-white">
              What would you like a quote for?
            </h2>
            <ul className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-6">
              {coverageOptions.map((option) => {
                const Icon = icons[option.key];
                return (
                  <li key={option.key}>
                    <Link
                      href={`/quote?coverage=${option.key}`}
                      className="flex min-h-20 flex-col items-center justify-center gap-1.5 rounded-xl bg-white px-2 py-3 text-center text-sm font-semibold text-navy-900 transition-colors hover:bg-gold"
                    >
                      <Icon size={24} aria-hidden="true" className="text-royal" />
                      {option.short}
                      <span className="sr-only"> insurance quote</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link href="/quote" className="btn-gold">
              Get My Free Quote
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <a href={agency.phone.href} className="btn-ghost-dark font-mono">
              <Phone size={18} aria-hidden="true" />
              {agency.phone.display}
            </a>
          </div>
        </div>
      </section>

      <section aria-label="Why clients choose us" className="border-b border-line bg-white">
        <ul className="container-page grid gap-6 py-8 sm:grid-cols-2 lg:grid-cols-4">
          {trust.map((item) => (
            <li key={item.title} className="flex items-start gap-3">
              <item.icon size={28} className="mt-0.5 shrink-0 text-royal" aria-hidden="true" />
              <div>
                <p className="font-display font-bold text-navy-900">{item.title}</p>
                <p className={`text-sm text-muted ${item.mono ? "font-mono" : ""}`}>{item.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="solutions-heading" className="container-page py-16">
        <p className="eyebrow">Customized solutions</p>
        <h2 id="solutions-heading" className="mt-2 text-3xl font-bold text-navy-900 sm:text-4xl">
          Coverage for every part of your life
        </h2>
        <p className="mt-3 max-w-2xl text-lg text-muted">
          No one-size-fits-all packages. We compare carriers and tailor each policy to you.
        </p>
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {coverageLines.map((line) => {
            const Icon = icons[line.key];
            return (
              <li key={line.slug}>
                <Link href={`/coverage/${line.slug}`} className="card group flex h-full flex-col transition-shadow hover:shadow-md">
                  <span className="flex size-12 items-center justify-center rounded-xl bg-navy-50 text-royal">
                    <Icon size={26} aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-xl font-bold text-navy-900">{line.name}</h3>
                  <p className="mt-2 flex-1 text-slate-700">{line.coverages.slice(0, 4).map((item) => item.title).join(", ")} and more.</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 font-semibold text-royal group-hover:underline">
                    Explore {line.name.toLowerCase()}
                    <ArrowRight size={16} aria-hidden="true" />
                  </span>
                </Link>
              </li>
            );
          })}
          <li className="sm:col-span-2 lg:col-span-3">
            <Link href="/service-center" className="on-dark group flex h-full flex-col rounded-2xl bg-navy-900 p-6 text-white transition-colors hover:bg-navy-800">
              <h3 className="text-xl font-bold">Already a client?</h3>
              <p className="mt-2 flex-1 text-navy-100">
                Request ID cards and certificates, find your carrier&apos;s claims line, or ask for a
                policy review any time.
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 font-semibold text-gold group-hover:underline">
                Visit the Service Center
                <ArrowRight size={16} aria-hidden="true" />
              </span>
            </Link>
          </li>
        </ul>
      </section>

      <section aria-labelledby="compare-heading" className="border-y border-line bg-white">
        <div className="container-page py-16">
          <p className="eyebrow">Why go independent?</p>
          <h2 id="compare-heading" className="mt-2 text-3xl font-bold text-navy-900 sm:text-4xl">
            Independent agency vs. captive agent vs. 1-800 call center
          </h2>
          <p className="mt-3 mb-8 max-w-2xl text-lg text-muted">
            The company you buy from matters less than who is in your corner. Here is how the three
            ways to buy insurance compare.
          </p>
          <ComparisonMatrix />
        </div>
      </section>

      <section aria-labelledby="about-heading" className="container-page grid gap-10 py-16 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="eyebrow">We take care of you</p>
          <h2 id="about-heading" className="mt-2 text-3xl font-bold text-navy-900 sm:text-4xl">
            Individual solutions, and an advocate when you need one
          </h2>
          <p className="mt-4 text-lg text-slate-700">
            Every client is unique. Since {agency.foundingYear}, we have provided individual
            solutions for each of our clients and served as their advocate when it is time to file a
            claim. When you call, you talk with {broker.shortName}, your broker, not a call tree.
          </p>
          <Link href="/team" className="mt-6 inline-flex items-center gap-1.5 font-semibold text-royal hover:underline">
            Meet the team
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <div className="card !p-8">
          <div className="flex gap-1 text-cta" role="img" aria-label="5 out of 5 stars">
            {Array.from({ length: 5 }, (_, index) => (
              <Star key={index} size={28} fill="currentColor" aria-hidden="true" />
            ))}
          </div>
          <p className="mt-4 font-display text-2xl font-bold text-navy-900">
            Rated {agency.reputation.googleRating} out of 5 on Google
          </p>
          <p className="mt-2 text-slate-700">
            We let our clients speak for themselves. Read what your neighbors say about working with
            Andrews Insurance Agency.
          </p>
          <a href={agency.reputation.googleReviewsUrl} rel="noopener noreferrer" className="btn-outline mt-6">
            Read our Google reviews
          </a>
        </div>
      </section>

      <section aria-labelledby="areas-heading" className="border-y border-line bg-white">
        <div className="container-page py-16">
          <p className="eyebrow">Local to Northeast Indiana</p>
          <h2 id="areas-heading" className="mt-2 text-3xl font-bold text-navy-900 sm:text-4xl">
            Serving {counties.slice(0, -1).join(", ")} and {counties.at(-1)} counties
          </h2>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {locations.map((location) => (
              <li key={location.slug}>
                <Link href={`/locations/${location.slug}`} className="flex min-h-16 items-center gap-3 rounded-xl border border-line bg-surface p-4 font-semibold text-navy-900 hover:border-royal hover:bg-blue-50">
                  <MapPin size={20} className="shrink-0 text-royal" aria-hidden="true" />
                  <span>
                    {location.city}, IN
                    <span className="block text-sm font-normal text-muted">
                      {location.isHeadquarters ? "Our office" : `${location.county} County`}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="container-page max-w-4xl py-16">
        <Faq faqs={homeFaqs} />
      </div>

      <CtaBand />
    </>
  );
}
