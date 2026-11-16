import { ChevronDown } from "lucide-react";
import type { Faq as FaqItem } from "@/data/coverage";

/** Accessible accordion built on native <details>, so it needs no client JavaScript. */
export function Faq({ faqs, heading = "Frequently asked questions" }: { faqs: FaqItem[]; heading?: string }) {
  return (
    <section aria-labelledby="faq-heading">
      <h2 id="faq-heading" className="text-2xl font-bold text-navy-900 sm:text-3xl">
        {heading}
      </h2>
      <div className="mt-6 divide-y divide-line rounded-2xl border border-line bg-white">
        {faqs.map((faq) => (
          <details key={faq.question} className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 text-left text-lg font-semibold text-navy-900 hover:bg-navy-50 [&::-webkit-details-marker]:hidden">
              <h3 className="font-sans text-lg font-semibold tracking-normal">{faq.question}</h3>
              <ChevronDown
                size={20}
                aria-hidden="true"
                className="shrink-0 transition-transform group-open:rotate-180"
              />
            </summary>
            <p className="px-5 pb-5 leading-relaxed text-slate-700">{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
