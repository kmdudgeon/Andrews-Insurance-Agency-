"use client";

import { useState } from "react";
import { independentComparison } from "@/data/agency-config";

const { columns, rows } = independentComparison;

/** Independent vs. captive vs. direct. On small screens the visitor picks which alternative to compare. */
export function ComparisonMatrix() {
  const [compare, setCompare] = useState(1);

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-2 md:hidden" role="group" aria-label="Compare against">
        <span className="text-sm font-semibold text-muted">Compare with:</span>
        {columns.slice(1).map((column, index) => (
          <button
            key={column}
            type="button"
            aria-pressed={compare === index + 1}
            onClick={() => setCompare(index + 1)}
            className={`min-h-11 rounded-full border-2 px-4 text-sm font-semibold ${
              compare === index + 1
                ? "border-navy-900 bg-navy-900 text-white"
                : "border-line bg-white text-navy-900"
            }`}
          >
            {column}
          </button>
        ))}
      </div>
      <div className="overflow-hidden rounded-2xl border border-line bg-white">
        <table className="w-full table-fixed text-left text-sm sm:text-base">
          <caption className="sr-only">
            How an independent insurance agency compares with a captive agent and a direct insurer
          </caption>
          <thead>
            <tr className="bg-navy-900 text-white">
              <th scope="col" className="p-3 font-semibold sm:p-4">
                <span className="sr-only">Feature</span>
              </th>
              {columns.map((column, index) => (
                <th
                  key={column}
                  scope="col"
                  className={`p-3 font-display font-bold sm:p-4 ${index === 0 ? "bg-royal" : ""} ${
                    index > 0 && index !== compare ? "hidden md:table-cell" : ""
                  }`}
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {rows.map((row) => (
              <tr key={row.feature}>
                <th scope="row" className="p-3 align-top font-semibold text-navy-900 sm:p-4">
                  {row.feature}
                </th>
                {row.values.map((value, index) => (
                  <td
                    key={columns[index]}
                    className={`p-3 align-top sm:p-4 ${
                      index === 0 ? "bg-blue-50 font-semibold text-navy-900" : "text-slate-700"
                    } ${index > 0 && index !== compare ? "hidden md:table-cell" : ""}`}
                  >
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
