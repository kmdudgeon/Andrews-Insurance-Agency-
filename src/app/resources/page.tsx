import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CtaBand } from "@/components/CtaBand";
import { Faq } from "@/components/Faq";
import { GlossarySearch } from "@/components/GlossarySearch";
import { JsonLd } from "@/components/JsonLd";
import { InformationalNotice } from "@/components/Notices";
import { PageHero } from "@/components/PageHero";
import { homeFaqs } from "@/data/agency-config";
import { articles } from "@/data/resources";
import { pageMetadata } from "@/lib/metadata";
import { buildPageSchema } from "@/lib/schema";

const title = "Insurance Guides, Glossary & FAQ";
const description =
  "Plain-English insurance guides for Indiana drivers, homeowners and families, plus a searchable glossary of insurance terms and answers to common questions.";
const crumbs = [{ name: "Resources", path: "/resources" }];

export const metadata: Metadata = pageMetadata({ title, description, path: "/resources" });

export default function ResourcesPage() {
  return (
    <>
      <JsonLd schema={buildPageSchema({ path: "/resources", title, description, crumbs, faqs: homeFaqs })} />
      <PageHero
        title="Insurance resources in plain English"
        crumbs={crumbs}
        quickAnswer="Guides, definitions and answers written for Indiana residents by a licensed local broker. Learn how coverage works before you buy, then request quotes when you are ready."
      />
      <div className="container-page space-y-16 py-14">
        <section aria-labelledby="guides-heading">
          <h2 id="guides-heading" className="text-2xl font-bold text-navy-900 sm:text-3xl">
            Guides
          </h2>
          <ul className="mt-6 grid gap-5 md:grid-cols-2">
            {articles.map((article) => (
              <li key={article.slug}>
                <Link href={`/resources/${article.slug}`} className="card group flex h-full flex-col transition-shadow hover:shadow-md">
                  <h3 className="text-xl font-bold text-navy-900">{article.title}</h3>
                  <p className="mt-2 flex-1 text-slate-700">{article.description}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 font-semibold text-royal group-hover:underline">
                    Read the guide
                    <ArrowRight size={16} aria-hidden="true" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="glossary-heading" id="glossary">
          <h2 id="glossary-heading" className="mb-6 text-2xl font-bold text-navy-900 sm:text-3xl">
            Insurance glossary
          </h2>
          <GlossarySearch />
        </section>

        <div className="max-w-4xl space-y-8">
          <Faq faqs={homeFaqs} />
          <InformationalNotice />
        </div>
      </div>
      <CtaBand />
    </>
  );
}
