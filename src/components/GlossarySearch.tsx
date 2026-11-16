"use client";

import { useState, useSyncExternalStore } from "react";
import { Search } from "lucide-react";
import { glossary } from "@/data/resources";

const subscribe = () => () => {};
const readQuery = () => new URLSearchParams(window.location.search).get("q") ?? "";

export function GlossarySearch() {
  // Supports /resources?q=term (used by the WebSite SearchAction) without making the page dynamic.
  const urlQuery = useSyncExternalStore(subscribe, readQuery, () => "");
  const [typed, setTyped] = useState<string | null>(null);
  const query = typed ?? urlQuery;
  const term = query.trim().toLowerCase();
  const results = glossary.filter(
    (entry) =>
      !term ||
      entry.term.toLowerCase().includes(term) ||
      entry.definition.toLowerCase().includes(term),
  );

  return (
    <div>
      <label htmlFor="glossary-search" className="field-label">
        Search insurance terms
      </label>
      <div className="relative max-w-md">
        <Search size={18} aria-hidden="true" className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-muted" />
        <input
          id="glossary-search"
          type="search"
          className="field-input pl-10"
          placeholder="e.g. deductible"
          value={query}
          onChange={(event) => setTyped(event.target.value)}
        />
      </div>
      <p className="mt-3 text-sm text-muted" aria-live="polite">
        {results.length} {results.length === 1 ? "term" : "terms"}
      </p>
      <dl className="mt-4 grid gap-4 md:grid-cols-2">
        {results.map((entry) => (
          <div key={entry.term} className="rounded-xl border border-line bg-white p-5">
            <dt className="font-display text-lg font-bold text-navy-900">{entry.term}</dt>
            <dd className="mt-1.5 leading-relaxed text-slate-700">{entry.definition}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
