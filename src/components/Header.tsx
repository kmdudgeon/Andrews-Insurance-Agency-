import Link from "next/link";
import { Phone } from "lucide-react";
import { agency, navigation } from "@/data/agency-config";
import { CoverageMenu, MobileNav } from "./HeaderNav";
import { Logo } from "./Logo";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/95 backdrop-blur">
      <div className="container-page flex h-18 items-center justify-between gap-4 py-3">
        <Link href="/" className="text-navy-900">
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          <CoverageMenu />
          {navigation.primary.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="inline-flex min-h-11 items-center rounded-lg px-2.5 py-2 text-[15px] font-semibold whitespace-nowrap text-navy-900 hover:bg-navy-50"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={agency.phone.href}
            className="hidden items-center gap-2 rounded-lg px-2 py-2 font-mono text-[15px] font-medium whitespace-nowrap text-navy-900 hover:bg-navy-50 sm:inline-flex lg:hidden xl:inline-flex"
          >
            <Phone size={18} aria-hidden="true" />
            <span className="sr-only">Call </span>
            {agency.phone.display}
          </a>
          <Link href="/quote" className="btn-cta hidden !min-h-11 !px-4 !py-2 !text-[15px] whitespace-nowrap md:inline-flex">
            Get a Free Quote
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
