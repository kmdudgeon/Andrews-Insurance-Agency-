import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CircleCheck } from "lucide-react";
import { CtaBand } from "@/components/CtaBand";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { LifeEstimator } from "@/components/LifeEstimator";
import { InformationalNotice, PlainNotice } from "@/components/Notices";
import { PageHero } from "@/components/PageHero";
import { legal } from "@/data/agency-config";
import { coverageLines, getCoverageLine } from "@/data/coverage";
import { pageMetadata } from "@/lib/metadata";
import { buildPageSchema, serviceNode } from "@/lib/schema";

export const dynamicParams = false;

export function generateStaticParams() {
  return coverageLines.map((line) => ({ line: line.slug }));
}

export async function generateMetadata({ params }: PageProps<"/coverage/[line]">): Promise<Metadata> {
  const line = getCoverageLine((await params).line);
  if (!line) return {};
  return pageMetadata({
    title: line.metaTitle,
    description: line.metaDescription,
    path: `/coverage/${line.slug}`,
  });
}

export default async function CoveragePage({ params }: PageProps<"/coverage/[line]">) {
  const line = getCoverageLine((await params).line);
  if (!line) notFound();
  const path = `/coverage/${line.slug}`;
  const crumbs = [{ name: line.name, path }];

  return (
    <article>
      <JsonLd
        schema={buildPageSchema({
          path,
          title: line.metaTitle,
          description: line.metaDescription,
          crumbs,
          faqs: line.faqs,
          extra: [serviceNode(line)],
        })}
      />
      <PageHero title={line.h1} crumbs={crumbs} quickAnswer={line.quickAnswer} quickAnswerLabel="Coverage summary">
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link href={`/quote?coverage=${line.key}`} className="btn-gold">
            Get My Free Quote
          </Link>
          <Link href="/contact" className="btn-ghost-dark">
            Schedule a consultation
          </Link>
        </div>
      </PageHero>

      <div className="container-page grid gap-10 py-14 lg:grid-cols-[1fr_22rem]">
        <section aria-labelledby="overview-heading">
          <h2 id="overview-heading" className="text-2xl font-bold text-navy-900 sm:text-3xl">
            {line.name} tailored to you
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-700">{line.intro}</p>
        </section>
        <section aria-labelledby="facts-heading" className="card h-fit">
          <h2 id="facts-heading" className="text-lg font-bold text-navy-900">
            Key facts
          </h2>
          <dl className="mt-4 space-y-4">
            {line.facts.map((fact) => (
              <div key={fact.term}>
                <dt className="text-sm font-semibold tracking-wide text-muted uppercase">{fact.term}</dt>
                <dd className="mt-0.5 text-navy-900">{fact.detail}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>

      <section aria-labelledby="options-heading" className="border-y border-line bg-white">
        <div className="container-page py-14">
          <h2 id="options-heading" className="text-2xl font-bold text-navy-900 sm:text-3xl">
            What we can cover
          </h2>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {line.coverages.map((item) => (
              <li key={item.title} className="flex gap-3">
                <CircleCheck size={22} className="mt-1 shrink-0 text-royal" aria-hidden="true" />
                <div>
                  <h3 className="text-lg font-bold text-navy-900">{item.title}</h3>
                  <p className="mt-1 text-slate-700">{item.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {line.key === "life" ? (
        <div className="container-page pt-14">
          <LifeEstimator />
        </div>
      ) : null}

      {line.comparison ? (
        <section aria-labelledby="table-heading" className="container-page pt-14">
          <h2 id="table-heading" className="text-2xl font-bold text-navy-900 sm:text-3xl">
            {line.comparison.caption}
          </h2>
          <div className="mt-6 overflow-x-auto rounded-2xl border border-line bg-white">
            <table className="w-full min-w-[32rem] text-left">
              <caption className="sr-only">{line.comparison.caption}</caption>
              <thead className="bg-navy-900 text-white">
                <tr>
                  {line.comparison.headers.map((header) => (
                    <th key={header} scope="col" className="p-4 font-display font-bold">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {line.comparison.rows.map((row) => (
                  <tr key={row[0]}>
                    <th scope="row" className="p-4 font-semibold text-navy-900">
                      {row[0]}
                    </th>
                    {row.slice(1).map((cell, index) => (
                      <td key={index} className="p-4 font-mono text-[15px] text-slate-700">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : null}

      <section aria-labelledby="local-heading" className="container-page py-14">
        <h2 id="local-heading" className="text-2xl font-bold text-navy-900 sm:text-3xl">
          What Northeast Indiana clients should know
        </h2>
        <ul className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {line.localInsights.map((insight) => (
            <li key={insight.title} className="card">
              <h3 className="text-lg font-bold text-navy-900">{insight.title}</h3>
              <p className="mt-2 text-slate-700">{insight.description}</p>
            </li>
          ))}
        </ul>
      </section>

      <div className="container-page max-w-4xl space-y-8 pb-14">
        <Faq faqs={line.faqs} heading={`${line.name} questions`} />
        {line.key === "health" ? (
          <>
            <PlainNotice title="Health Insurance Marketplace notice">
              <p>{legal.marketplace}</p>
            </PlainNotice>
            <PlainNotice title="Medicare notice">
              <p>{legal.medicare}</p>
            </PlainNotice>
          </>
        ) : null}
        <InformationalNotice />
      </div>

      <CtaBand heading={`Compare ${line.name.toLowerCase()} options today`} coverage={line.key} />
    </article>
  );
}
