import type { Metadata } from "next";
import { CarrierDirectory } from "@/components/CarrierDirectory";
import { JsonLd } from "@/components/JsonLd";
import { NonBindingNotice } from "@/components/Notices";
import { PageHero } from "@/components/PageHero";
import { ServiceRequestForm } from "@/components/ServiceRequestForm";
import { agency } from "@/data/agency-config";
import { pageMetadata } from "@/lib/metadata";
import { buildPageSchema } from "@/lib/schema";

const title = "Service Center | Claims, Billing & Policy Requests";
const description =
  "Policyholder support for Andrews Insurance Agency clients: carrier claims and billing contacts, ID card and certificate of insurance requests, and policy reviews.";
const crumbs = [{ name: "Service Center", path: "/service-center" }];

export const metadata: Metadata = pageMetadata({ title, description, path: "/service-center" });

export default function ServiceCenterPage() {
  return (
    <>
      <JsonLd schema={buildPageSchema({ path: "/service-center", title, description, crumbs })} />
      <PageHero
        title="Policyholder Service Center"
        crumbs={crumbs}
        quickAnswer="Find your insurance carrier's claims and billing contacts, or send us a request for an auto ID card, certificate of insurance, mortgagee change or policy review at any hour. Requests are handled during business hours and do not change coverage until confirmed in writing."
      />
      <div className="container-page space-y-14 py-12">
        <NonBindingNotice />

        <section aria-labelledby="claim-heading" className="card border-l-4 !border-l-cta">
          <h2 id="claim-heading" className="text-2xl font-bold text-navy-900">
            Need to report a claim right now?
          </h2>
          <p className="mt-2 max-w-3xl text-slate-700">
            If anyone is hurt or in danger, call 911 first. To start a claim, contact your insurance
            company directly using the claims number on your policy or ID card; carrier claims
            lines are typically staffed around the clock. Then call us at{" "}
            <a href={agency.phone.href} className="font-mono font-semibold text-royal hover:underline">
              {agency.phone.display}
            </a>{" "}
            so we can advocate for you through the process.
          </p>
        </section>

        <section aria-labelledby="directory-heading">
          <h2 id="directory-heading" className="text-2xl font-bold text-navy-900 sm:text-3xl">
            Carrier claims &amp; billing directory
          </h2>
          <p className="mt-2 mb-6 max-w-2xl text-muted">
            Direct links and phone numbers for our carrier partners.
          </p>
          <CarrierDirectory />
        </section>

        <section aria-labelledby="request-heading" className="grid gap-8 lg:grid-cols-[20rem_1fr]">
          <div>
            <h2 id="request-heading" className="text-2xl font-bold text-navy-900 sm:text-3xl">
              Send a service request
            </h2>
            <p className="mt-3 text-slate-700">Use this form for:</p>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-slate-700">
              <li>Auto ID cards</li>
              <li>Certificates of insurance (COI)</li>
              <li>Policy reviews</li>
              <li>Mortgagee or lienholder changes</li>
              <li>Claim help and billing questions</li>
            </ul>
          </div>
          <div className="card !p-5 sm:!p-8">
            <ServiceRequestForm />
          </div>
        </section>
      </div>
    </>
  );
}
