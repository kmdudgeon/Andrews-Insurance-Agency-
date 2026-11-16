import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { InformationalNotice } from "@/components/Notices";
import { PageHero } from "@/components/PageHero";
import { broker } from "@/data/agency-config";
import { articles, getArticle } from "@/data/resources";
import { pageMetadata } from "@/lib/metadata";
import { articleNode, buildPageSchema } from "@/lib/schema";

export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: PageProps<"/resources/[slug]">): Promise<Metadata> {
  const article = getArticle((await params).slug);
  if (!article) return {};
  return pageMetadata({
    title: article.title,
    description: article.description,
    path: `/resources/${article.slug}`,
  });
}

const dateFormat = new Intl.DateTimeFormat("en-US", { dateStyle: "long", timeZone: "UTC" });

export default async function ArticlePage({ params }: PageProps<"/resources/[slug]">) {
  const article = getArticle((await params).slug);
  if (!article) notFound();
  const path = `/resources/${article.slug}`;
  const crumbs = [
    { name: "Resources", path: "/resources" },
    { name: article.title, path },
  ];

  return (
    <article>
      <JsonLd
        schema={buildPageSchema({
          path,
          title: article.title,
          description: article.description,
          crumbs,
          extra: [articleNode(path, article.title, article.description, article.updated)],
        })}
      />
      <PageHero title={article.title} crumbs={crumbs} quickAnswer={article.quickAnswer} />
      <div className="container-page max-w-3xl py-12">
        <p className="text-sm text-muted">
          Reviewed by {broker.name}, {broker.title} · Updated{" "}
          <time dateTime={article.updated}>{dateFormat.format(new Date(article.updated))}</time>
        </p>
        {article.sections.map((section) => (
          <section key={section.heading} className="mt-10">
            <h2 className="text-2xl font-bold text-navy-900">{section.heading}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph} className="mt-4 text-lg leading-relaxed text-slate-700">
                {paragraph}
              </p>
            ))}
            {section.list ? (
              <ul className="mt-4 list-disc space-y-2 pl-6 text-lg text-slate-700">
                {section.list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}
        <Link href={article.related.href} className="mt-10 inline-flex items-center gap-1.5 text-lg font-semibold text-royal hover:underline">
          {article.related.label}
          <ArrowRight size={18} aria-hidden="true" />
        </Link>
        <InformationalNotice className="mt-10" />
      </div>
      <CtaBand />
    </article>
  );
}
