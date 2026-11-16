import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { AppointmentForm } from "@/components/AppointmentForm";
import { JsonLd } from "@/components/JsonLd";
import { MapFacade } from "@/components/MapFacade";
import { PageHero } from "@/components/PageHero";
import { agency } from "@/data/agency-config";
import { pageMetadata } from "@/lib/metadata";
import { buildPageSchema } from "@/lib/schema";

const title = "Contact & Appointments";
const description =
  "Call (260) 582-7681, email, or visit Andrews Insurance Agency at 119 West Mitchell Street #3, Kendallville, IN. Request an in-person, phone or video appointment.";
const crumbs = [{ name: "Contact", path: "/contact" }];

export const metadata: Metadata = pageMetadata({ title, description, path: "/contact" });

export default function ContactPage() {
  return (
    <>
      <JsonLd schema={buildPageSchema({ path: "/contact", title, description, crumbs })} />
      <PageHero
        title="Get in touch"
        crumbs={crumbs}
        quickAnswer={`Call Andrews Insurance Agency at ${agency.phone.display} or visit ${agency.address.oneLine}. The office is open ${agency.hours.summary}. Online quote and appointment requests are accepted 24 hours a day.`}
      />
      <div className="container-page grid gap-10 py-12 lg:grid-cols-2">
        <div className="space-y-8">
          <section aria-labelledby="reach-heading">
            <h2 id="reach-heading" className="text-2xl font-bold text-navy-900">
              Reach us directly
            </h2>
            <ul className="mt-5 space-y-4">
              <li>
                <a href={agency.phone.href} className="card flex items-center gap-4 !p-4 hover:border-royal">
                  <Phone size={24} className="shrink-0 text-royal" aria-hidden="true" />
                  <span>
                    <span className="block text-sm text-muted">Call or text</span>
                    <span className="font-mono text-lg font-medium text-navy-900">{agency.phone.display}</span>
                  </span>
                </a>
              </li>
              <li>
                <a href={`mailto:${agency.email}`} className="card flex items-center gap-4 !p-4 hover:border-royal">
                  <Mail size={24} className="shrink-0 text-royal" aria-hidden="true" />
                  <span>
                    <span className="block text-sm text-muted">Email</span>
                    <span className="text-lg font-medium break-all text-navy-900">{agency.email}</span>
                  </span>
                </a>
              </li>
              <li className="card flex items-center gap-4 !p-4">
                <MapPin size={24} className="shrink-0 text-royal" aria-hidden="true" />
                <address className="not-italic">
                  <span className="block text-sm text-muted">Office</span>
                  <span className="text-lg font-medium text-navy-900">
                    {agency.address.street}, {agency.address.city}, {agency.address.state}{" "}
                    {agency.address.zip}
                  </span>
                </address>
              </li>
            </ul>
          </section>

          <section aria-labelledby="hours-heading">
            <h2 id="hours-heading" className="flex items-center gap-2 text-xl font-bold text-navy-900">
              <Clock size={22} className="text-royal" aria-hidden="true" />
              Office hours
            </h2>
            <dl className="mt-3 divide-y divide-line rounded-xl border border-line bg-white">
              {agency.hours.table.map((row) => (
                <div key={row.day} className="flex justify-between gap-4 p-3.5">
                  <dt className="text-slate-700">{row.day}</dt>
                  <dd className="text-right font-medium text-navy-900">{row.hours}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section aria-labelledby="map-heading">
            <h2 id="map-heading" className="mb-3 text-xl font-bold text-navy-900">
              Find our office
            </h2>
            <MapFacade />
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${agency.mapsQuery}`}
              rel="noopener noreferrer"
              className="mt-2 inline-block py-2 font-semibold text-royal hover:underline"
            >
              Get driving directions
            </a>
          </section>
        </div>

        <section aria-labelledby="appointment-heading" className="card h-fit !p-5 sm:!p-8">
          <h2 id="appointment-heading" className="text-2xl font-bold text-navy-900">
            Request an appointment
          </h2>
          <p className="mt-2 mb-6 text-muted">
            Meet in person in Kendallville, by phone or by video. We will confirm your time.
          </p>
          <AppointmentForm />
        </section>
      </div>
    </>
  );
}
