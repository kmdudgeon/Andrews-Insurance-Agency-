import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { agency, legal, navigation } from "@/data/agency-config";
import { locations } from "@/data/locations";
import { Logo } from "./Logo";

const linkClass = "inline-block py-1 text-navy-100 underline-offset-4 hover:text-white hover:underline";

export function Footer() {
  return (
    <footer className="on-dark bg-navy-950 text-navy-100">
      <div className="container-page grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link href="/" className="text-white">
            <Logo />
          </Link>
          <p className="mt-4 text-sm leading-relaxed">
            Independent insurance for Northeast Indiana families and businesses since{" "}
            {agency.foundingYear}.
          </p>
          <address className="mt-5 space-y-3 text-sm not-italic">
            <p className="flex gap-2.5">
              <MapPin size={18} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
              <span>
                {agency.address.street}
                <br />
                {agency.address.city}, {agency.address.state} {agency.address.zip}
              </span>
            </p>
            <p className="flex gap-2.5">
              <Phone size={18} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
              <a href={agency.phone.href} className={`font-mono ${linkClass}`}>
                {agency.phone.display}
              </a>
            </p>
            <p className="flex gap-2.5">
              <Mail size={18} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
              <a href={`mailto:${agency.email}`} className={`break-all ${linkClass}`}>
                {agency.email}
              </a>
            </p>
            <p className="flex gap-2.5">
              <Clock size={18} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
              <span>{agency.hours.summary}</span>
            </p>
          </address>
        </div>

        <nav aria-label="Coverage">
          <h2 className="text-sm font-bold tracking-wider text-white uppercase">Coverage</h2>
          <ul className="mt-4 space-y-1 text-sm">
            {navigation.coverage.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/quote" className={linkClass}>
                Get a Free Quote
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="Service areas">
          <h2 className="text-sm font-bold tracking-wider text-white uppercase">Service Areas</h2>
          <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-1 text-sm md:grid-cols-1 lg:grid-cols-2">
            {locations.map((location) => (
              <li key={location.slug}>
                <Link href={`/locations/${location.slug}`} className={linkClass}>
                  {location.city}, IN
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Agency">
          <h2 className="text-sm font-bold tracking-wider text-white uppercase">Agency</h2>
          <ul className="mt-4 space-y-1 text-sm">
            {navigation.primary.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <a href={agency.social.facebook} rel="noopener noreferrer" className={linkClass}>
                Facebook
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <div className="border-t border-white/15">
        <div className="container-page space-y-4 py-8 text-xs leading-relaxed text-navy-100">
          <p>{legal.nonBinding}</p>
          <p>{legal.licensing}</p>
          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
            <p>© {agency.name}. All rights reserved.</p>
            <ul className="flex flex-wrap gap-x-5 gap-y-1">
              {navigation.legal.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
