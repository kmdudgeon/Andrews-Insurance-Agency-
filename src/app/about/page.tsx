import type { Metadata } from "next";
import Link from "next/link";
import { BadgeCheck, HandHeart, Scale, Users } from "lucide-react";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { agency, broker, counties, legal } from "@/data/agency-config";
import { pageMetadata } from "@/lib/metadata";
import { buildPageSchema } from "@/lib/schema";

const title = "About Andrews Insurance Agency & Broker Justin Andrews";
const description =
  "Meet Justin Michael Andrews, Principal Broker of Andrews Insurance Agency in Kendallville, IN. Independent, licensed, and serving Northeast Indiana since 2023.";
const crumbs = [{ name: "About", path: "/about" }];

export const metadata: Metadata = pageMetadata({ title, description, path: "/about" });

const values = [
  { icon: Users, title: "Every client is unique", text: "We reject one-size-fits-all insurance. Coverage is tailored to your household, your property and your budget." },
  { icon: Scale, title: "Independent by design", text: "We are not owned by an insurance company, so our recommendations are based on what fits you." },
  { icon: HandHeart, title: "Advocates at claim time", text: "When something goes wrong, we help you report the claim and stay involved until it is resolved." },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd schema={buildPageSchema({ path: "/about", title, description, crumbs })} />
      <PageHero
        title="We take care of you"
        eyebrow="About Andrews Insurance Agency"
        crumbs={crumbs}
        quickAnswer={`Andrews Insurance Agency is an independent insurance agency founded in ${agency.foundingYear} and located at ${agency.address.oneLine}. Principal Broker ${broker.name} (NPN #${broker.npn}) compares coverage from about 50 insurance companies and personally advocates for clients during claims.`}
      />

      <section aria-labelledby="story-heading" className="container-page grid gap-10 py-14 lg:grid-cols-[1fr_22rem]">
        <div>
          <h2 id="story-heading" className="text-2xl font-bold text-navy-900 sm:text-3xl">
            Our story
          </h2>
          <div className="mt-4 space-y-4 text-lg leading-relaxed text-slate-700">
            <p>
              Andrews Insurance Agency opened in {agency.foundingYear} with a simple idea: insurance
              works better when someone local knows your name, shops the market for you, and picks
              up the phone when you need help.
            </p>
            <p>
              We provide individual solutions for each of our clients and serve as advocates should
              you need to file a claim. From our office in downtown Kendallville, we work with
              families, farms and businesses across {counties.slice(0, -1).join(", ")} and{" "}
              {counties.at(-1)} counties.
            </p>
            <p>
              Whether you are insuring your first car, a lake home, a growing business, or looking
              for health coverage for your family, you will work directly with your broker from the
              first quote through every renewal.
            </p>
          </div>
        </div>

        <section aria-labelledby="broker-heading" className="card h-fit">
          <p className="eyebrow">Principal broker</p>
          <h2 id="broker-heading" className="mt-1 text-2xl font-bold text-navy-900">
            {broker.name}
          </h2>
          <p className="text-muted">{broker.title}</p>
          <dl className="mt-5 space-y-3 text-sm">
            <div className="flex items-start gap-2.5">
              <BadgeCheck size={18} className="mt-0.5 shrink-0 text-royal" aria-hidden="true" />
              <div>
                <dt className="font-semibold text-navy-900">National Producer Number</dt>
                <dd className="font-mono text-slate-700">NPN #{broker.npn}</dd>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <BadgeCheck size={18} className="mt-0.5 shrink-0 text-royal" aria-hidden="true" />
              <div>
                <dt className="font-semibold text-navy-900">Nonresident Health License</dt>
                <dd className="font-mono text-slate-700">#{broker.nonresidentHealthLicense}</dd>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <BadgeCheck size={18} className="mt-0.5 shrink-0 text-royal" aria-hidden="true" />
              <div>
                <dt className="font-semibold text-navy-900">Lines of insurance</dt>
                <dd className="text-slate-700">Auto, home, health, life, disability and commercial</dd>
              </div>
            </div>
          </dl>
          <p className="mt-5 text-sm text-muted">
            You can verify any producer license through the Indiana Department of Insurance or the
            National Insurance Producer Registry (NIPR).
          </p>
          <Link href="/team" className="btn-outline mt-5 w-full">
            Meet the team
          </Link>
        </section>
      </section>

      <section aria-labelledby="values-heading" className="border-y border-line bg-white">
        <div className="container-page py-14">
          <h2 id="values-heading" className="text-2xl font-bold text-navy-900 sm:text-3xl">
            What you can expect from us
          </h2>
          <ul className="mt-8 grid gap-6 md:grid-cols-3">
            {values.map((value) => (
              <li key={value.title}>
                <value.icon size={30} className="text-royal" aria-hidden="true" />
                <h3 className="mt-3 text-xl font-bold text-navy-900">{value.title}</h3>
                <p className="mt-2 text-slate-700">{value.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-label="Licensing" className="container-page max-w-4xl py-10">
        <p className="text-sm leading-relaxed text-muted">{legal.licensing}</p>
      </section>

      <CtaBand />
    </>
  );
}
