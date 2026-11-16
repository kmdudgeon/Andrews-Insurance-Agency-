"use client";

import Link from "next/link";
import { useState } from "react";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const inputs = [
  { key: "income", label: "Annual income to replace", initial: 60000, step: 1000, prefix: "$" },
  { key: "years", label: "Years of income needed", initial: 10, step: 1, prefix: "" },
  { key: "mortgage", label: "Mortgage balance", initial: 150000, step: 1000, prefix: "$" },
  { key: "debts", label: "Other debts", initial: 15000, step: 500, prefix: "$" },
  { key: "children", label: "Children to put through school", initial: 2, step: 1, prefix: "" },
  { key: "education", label: "Education fund per child", initial: 50000, step: 1000, prefix: "$" },
  { key: "finalExpenses", label: "Funeral and final expenses", initial: 15000, step: 500, prefix: "$" },
  { key: "assets", label: "Savings and existing life insurance", initial: 50000, step: 1000, prefix: "$" },
] as const;

type Key = (typeof inputs)[number]["key"];

export function LifeEstimator() {
  const [values, setValues] = useState<Record<Key, number>>(
    () => Object.fromEntries(inputs.map((input) => [input.key, input.initial])) as Record<Key, number>,
  );

  const incomeNeed = values.income * values.years;
  const educationNeed = values.children * values.education;
  const total = incomeNeed + values.mortgage + values.debts + educationNeed + values.finalExpenses;
  const estimate = Math.max(0, total - values.assets);

  return (
    <section aria-labelledby="estimator-heading" className="card !p-5 sm:!p-8">
      <h2 id="estimator-heading" className="text-2xl font-bold text-navy-900 sm:text-3xl">
        Life insurance needs estimator
      </h2>
      <p className="mt-2 text-muted">
        Adjust the numbers to match your household. Everything is calculated in your browser, and
        nothing you enter here is sent or stored.
      </p>
      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_20rem]">
        <div className="grid gap-5 sm:grid-cols-2">
          {inputs.map((input) => (
            <div key={input.key}>
              <label htmlFor={`life-${input.key}`} className="field-label">
                {input.label}
              </label>
              <div className="relative">
                {input.prefix ? (
                  <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-muted">
                    {input.prefix}
                  </span>
                ) : null}
                <input
                  id={`life-${input.key}`}
                  type="number"
                  inputMode="numeric"
                  min={0}
                  step={input.step}
                  className={`field-input font-mono ${input.prefix ? "pl-8" : ""}`}
                  value={Number.isNaN(values[input.key]) ? "" : values[input.key]}
                  onChange={(event) =>
                    setValues((current) => ({
                      ...current,
                      [input.key]: Math.max(0, event.target.valueAsNumber || 0),
                    }))
                  }
                />
              </div>
            </div>
          ))}
        </div>
        <div className="on-dark flex min-h-[22rem] flex-col rounded-2xl bg-navy-900 p-6 text-white">
          <p className="text-sm font-semibold tracking-wider text-gold uppercase">Estimated need</p>
          <p className="mt-2 font-mono text-4xl font-medium" aria-live="polite">
            {currency.format(estimate)}
          </p>
          <dl className="mt-5 space-y-2 text-sm text-navy-100">
            {[
              ["Income replacement", incomeNeed],
              ["Mortgage payoff", values.mortgage],
              ["Other debts", values.debts],
              ["Education funding", educationNeed],
              ["Final expenses", values.finalExpenses],
              ["Less savings & coverage", -values.assets],
            ].map(([label, amount]) => (
              <div key={label} className="flex justify-between gap-4">
                <dt>{label}</dt>
                <dd className="font-mono text-white">{currency.format(amount as number)}</dd>
              </div>
            ))}
          </dl>
          <Link href="/quote?coverage=life" className="btn-gold mt-auto">
            Get life insurance quotes
          </Link>
        </div>
      </div>
      <p className="mt-5 text-sm text-muted">
        This estimate is for general education only and is not financial advice or an offer of
        coverage. Your actual needs may differ; a licensed broker can review them with you.
      </p>
    </section>
  );
}
