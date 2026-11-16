"use client";

import { useState } from "react";
import { ExternalLink, Phone, Search } from "lucide-react";
import { agency, carriers } from "@/data/agency-config";

export function CarrierDirectory() {
  const [query, setQuery] = useState("");
  const term = query.trim().toLowerCase();
  const results = carriers.filter(
    (carrier) =>
      !term ||
      carrier.name.toLowerCase().includes(term) ||
      carrier.lines.some((line) => line.toLowerCase().includes(term)),
  );

  return (
    <div>
      <label htmlFor="carrier-search" className="field-label">
        Search by carrier or coverage type
      </label>
      <div className="relative max-w-md">
        <Search size={18} aria-hidden="true" className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-muted" />
        <input
          id="carrier-search"
          type="search"
          className="field-input pl-10"
          placeholder="e.g. Ameritas or vision"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>
      <p className="sr-only" aria-live="polite">
        {results.length} {results.length === 1 ? "carrier" : "carriers"} shown
      </p>
      <ul className="mt-6 grid gap-4 md:grid-cols-2">
        {results.map((carrier) => (
          <li key={carrier.slug} className="card">
            <h3 className="text-xl font-bold text-navy-900">{carrier.name}</h3>
            <p className="mt-1 text-sm text-muted">{carrier.lines.join(" · ")}</p>
            <ul className="mt-4 space-y-2.5 text-[15px]">
              {carrier.claimsPhone ? (
                <li>
                  <a href={`tel:+1${carrier.claimsPhone.replace(/\D/g, "")}`} className="inline-flex items-center gap-2 font-semibold text-royal hover:underline">
                    <Phone size={16} aria-hidden="true" />
                    Claims &amp; service: <span className="font-mono">{carrier.claimsPhone}</span>
                  </a>
                </li>
              ) : null}
              {carrier.claimsUrl ? (
                <li>
                  <a href={carrier.claimsUrl} rel="noopener noreferrer" className="inline-flex items-center gap-2 font-semibold text-royal hover:underline">
                    <ExternalLink size={16} aria-hidden="true" />
                    File or check a claim<span className="sr-only"> with {carrier.name}</span>
                  </a>
                </li>
              ) : null}
              {carrier.billingUrl ? (
                <li>
                  <a href={carrier.billingUrl} rel="noopener noreferrer" className="inline-flex items-center gap-2 font-semibold text-royal hover:underline">
                    <ExternalLink size={16} aria-hidden="true" />
                    Account &amp; billing<span className="sr-only"> for {carrier.name}</span>
                  </a>
                </li>
              ) : null}
            </ul>
          </li>
        ))}
        <li className="card border-dashed bg-surface">
          <h3 className="text-xl font-bold text-navy-900">
            {results.length ? "Don't see your carrier?" : "No matching carrier listed"}
          </h3>
          <p className="mt-2 text-slate-700">
            The claims number on your policy or ID card is always the fastest route. You can also
            call us at{" "}
            <a href={agency.phone.href} className="font-mono font-semibold text-royal hover:underline">
              {agency.phone.display}
            </a>{" "}
            and we will connect you with the right claims or billing department.
          </p>
        </li>
      </ul>
    </div>
  );
}
