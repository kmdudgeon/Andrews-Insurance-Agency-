import type { Metadata } from "next";
import { Clock, Lock, Scale } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { QuoteWizard } from "@/components/QuoteWizard";
import { agency } from "@/data/agency-config";
import { pageMetadata } from "@/lib/metadata";
import { buildPageSchema } from "@/lib/schema";

const title = "Get a Free Insurance Quote";
const description =
  "Request auto, home, health, life or business insurance quotes from multiple carriers in about two minutes. No Social Security number required.";
const crumbs = [{ name: "Free Quote", path: "/quote" }];

export const metadata: Metadata = pageMetadata({ title, description, path: "/quote" });

const points = [
  { icon: Clock, title: "About two minutes", text: "Three short steps. Your progress is saved in this browser tab if you step away." },
  { icon: Scale, title: "Multiple carriers", text: "One request lets us compare options from several insurance companies." },
  { icon: Lock, title: "No sensitive data", text: "We never ask for a Social Security number, driver's license or payment card online." },
];

export default function QuotePage() {
  return (
    <>
      <JsonLd schema={buildPageSchema({ path: "/quote", title, description, crumbs })} />
      <PageHero title="Get your free insurance quote" crumbs={crumbs} />
      <div className="container-page grid gap-10 py-12 lg:grid-cols-[1fr_20rem]">
        <QuoteWizard />
        <aside aria-label="What to expect" className="space-y-5">
          {points.map((point) => (
            <div key={point.title} className="flex gap-3">
              <point.icon size={24} className="mt-0.5 shrink-0 text-royal" aria-hidden="true" />
              <div>
                <h2 className="font-sans text-base font-bold tracking-normal text-navy-900">{point.title}</h2>
                <p className="text-sm text-slate-700">{point.text}</p>
              </div>
            </div>
          ))}
          <div className="card">
            <h2 className="text-lg font-bold text-navy-900">Prefer to talk?</h2>
            <p className="mt-1 text-sm text-slate-700">{agency.hours.summary}</p>
            <a href={agency.phone.href} className="btn-outline mt-4 w-full font-mono">
              {agency.phone.display}
            </a>
          </div>
        </aside>
      </div>
    </>
  );
}
