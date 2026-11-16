import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, MapPin, Phone } from "lucide-react";
import { CtaBand } from "@/components/CtaBand";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { InformationalNotice } from "@/components/Notices";
import { PageHero } from "@/components/PageHero";
import { agency } from "@/data/agency-config";
import { coverageLines } from "@/data/coverage";
import { getLocation, locations } from "@/data/locations";
import { pageMetadata } from "@/lib/metadata";
import { buildPageSchema } from "@/lib/schema";

export const dynamicParams = false;

export function generateStaticParams() {
  return locations.map((location) => ({ city: location.slug }));
}

const titleFor = (city: string) => `Insurance Agency Serving ${city}, IN | Auto, Home, Health & Life`;

export async function generateMetadata({ params }: PageProps<"/locations/[city]">): Promise<Metadata> {
  const location = getLocation((await params).city);
  if (!location) return {};
  return pageMetadata({
    title: titleFor(location.city),
    description: location.metaDescription,
    path: `/locations/${location.slug}`,
    placename: location.city,
  });
}

export default async function LocationPage({ params }: PageProps<"/locations/[city]">) {
  const location = getLocation((await params).city);
  if (!location) notFound();
  const path = `/locations/${location.slug}`;
  const crumbs = [
    { name: "Locations", path: "/locations/kendallville-in" },
    { name: `${location.city}, IN`, path },
  ];

  return (
    <article>
      <JsonLd
        schema={buildPageSchema({
          path,
          title: titleFor(location.city),
          description: location.metaDescription,
          crumbs: location.isHeadquarters ? [crumbs[1]] : crumbs,
          faqs: location.faqs,
        })}
      />
      <PageHero
        eyebrow={`${location.county} County, Indiana`}
        title={`Insurance in ${location.city}, Indiana`}
        crumbs={location.isHeadquarters ? [crumbs[1]] : crumbs}
        quickAnswer={location.quickAnswer}
      >
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link href="/quote" className="btn-gold">
            Get My Free Quote
          </Link>
          <a href={agency.phone.href} className="btn-ghost-dark font-mono">
            <Phone size={18} aria-hidden="true" />
            {agency.phone.display}
          </a>
        </div>
      </PageHero>

      <div className="container-page grid gap-10 py-14 lg:grid-cols-[1fr_22rem]">
        <section aria-labelledby="intro-heading">
          <h2 id="intro-heading" className="text-2xl font-bold text-navy-900 sm:text-3xl">
            Your independent agency for {location.city}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-700">{location.intro}</p>
        </section>
        <section aria-labelledby="office-heading" className="card h-fit">
          <h2 id="office-heading" className="text-lg font-bold text-navy-900">
            {location.isHeadquarters ? "Visit our office" : "Our nearest office"}
          </h2>
          <address className="mt-3 flex gap-2.5 not-italic text-slate-700">
            <MapPin size={20} className="mt-0.5 shrink-0 text-royal" aria-hidden="true" />
            <span>
              {agency.address.street}
              <br />
              {agency.address.city}, {agency.address.state} {agency.address.zip}
            </span>
          </address>
          <dl className="mt-4 space-y-1 text-sm">
            {agency.hours.table.map((row) => (
              <div key={row.day} className="flex justify-between gap-4">
                <dt className="text-muted">{row.day}</dt>
                <dd className="text-right font-medium text-navy-900">{row.hours}</dd>
              </div>
            ))}
          </dl>
          <Link href="/contact" className="btn-outline mt-5 w-full">
            Directions &amp; appointments
          </Link>
        </section>
      </div>

      <section aria-labelledby="insights-heading" className="border-y border-line bg-white">
        <div className="container-page py-14">
          <h2 id="insights-heading" className="text-2xl font-bold text-navy-900 sm:text-3xl">
            Local insurance insights for {location.city}
          </h2>
          <ul className="mt-8 grid gap-5 md:grid-cols-2">
            {location.insights.map((insight) => (
              <li key={insight.title} className="rounded-2xl border border-line bg-surface p-6">
                <h3 className="text-lg font-bold text-navy-900">{insight.title}</h3>
                <p className="mt-2 text-slate-700">{insight.description}</p>
              </li>
            ))}
          </ul>
          <table className="mt-10 w-full max-w-xl overflow-hidden rounded-xl border border-line text-left">
            <caption className="mb-3 text-left font-display text-lg font-bold text-navy-900">
              Indiana minimum auto liability limits (25/50/25)
            </caption>
            <tbody className="divide-y divide-line bg-white">
              {[
                ["Bodily injury, per person", "$25,000"],
                ["Bodily injury, per accident", "$50,000"],
                ["Property damage", "$25,000"],
              ].map(([label, amount]) => (
                <tr key={label}>
                  <th scope="row" className="p-3 font-medium text-slate-700">
                    {label}
                  </th>
                  <td className="p-3 text-right font-mono text-navy-900">{amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section aria-labelledby="lines-heading" className="container-page py-14">
        <h2 id="lines-heading" className="text-2xl font-bold text-navy-900 sm:text-3xl">
          Coverage available in {location.city}
        </h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {coverageLines.map((line) => (
            <li key={line.slug}>
              <Link href={`/coverage/${line.slug}`} className="flex min-h-14 items-center justify-between gap-2 rounded-xl border border-line bg-white p-4 font-semibold text-navy-900 hover:border-royal hover:bg-blue-50">
                {line.name}
                <ArrowRight size={16} className="shrink-0 text-royal" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-slate-700">
          <strong className="text-navy-900">Also serving nearby:</strong> {location.nearby.join(", ")}.
        </p>
      </section>

      <div className="container-page max-w-4xl space-y-8 pb-14">
        <Faq faqs={location.faqs} heading={`${location.city} insurance questions`} />
        <InformationalNotice />
      </div>

      <nav aria-labelledby="other-areas-heading" className="border-t border-line bg-white">
        <div className="container-page py-10">
          <h2 id="other-areas-heading" className="text-lg font-bold text-navy-900">
            Other Northeast Indiana communities we serve
          </h2>
          <ul className="mt-4 flex flex-wrap gap-2.5">
            {locations
              .filter((other) => other.slug !== location.slug)
              .map((other) => (
                <li key={other.slug}>
                  <Link href={`/locations/${other.slug}`} className="inline-flex min-h-11 items-center rounded-full border border-line bg-surface px-4 text-sm font-semibold text-navy-900 hover:border-royal">
                    {other.city}, IN
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </nav>

      <CtaBand heading={`Get a quote for ${location.city}, Indiana`} />
    </article>
  );
}
