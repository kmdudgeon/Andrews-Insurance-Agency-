"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { agency, navigation } from "@/data/agency-config";

function useDismiss(open: boolean, close: () => void) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    const onPointer = (event: PointerEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) close();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open, close]);
  return ref;
}

export function CoverageMenu() {
  const [openPath, setOpenPath] = useState<string | null>(null);
  const pathname = usePathname();
  // Derived state: the menu closes automatically when the route changes.
  const open = openPath === pathname;
  const buttonRef = useRef<HTMLButtonElement>(null);
  const ref = useDismiss(open, () => {
    setOpenPath(null);
    buttonRef.current?.focus();
  });

  return (
    <div ref={ref} className="relative">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls="coverage-menu"
        onClick={() => setOpenPath(open ? null : pathname)}
        className="inline-flex items-center gap-1 rounded-lg px-2.5 py-2 text-[15px] font-semibold whitespace-nowrap text-navy-900 hover:bg-navy-50"
      >
        Coverage
        <ChevronDown
          size={16}
          aria-hidden="true"
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        id="coverage-menu"
        hidden={!open}
        className="absolute top-full left-0 mt-2 w-[34rem] rounded-2xl border border-line bg-white p-3 shadow-xl"
      >
        <ul className="grid grid-cols-2 gap-1">
          {navigation.coverage.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="block rounded-xl p-3 hover:bg-navy-50">
                <span className="block font-semibold text-navy-900">{item.label}</span>
                <span className="mt-0.5 block text-sm text-muted">{item.blurb}</span>
              </Link>
            </li>
          ))}
          <li>
            <Link href="/quote" className="block rounded-xl bg-navy-900 p-3 text-white hover:bg-navy-800">
              <span className="block font-semibold">Compare quotes</span>
              <span className="mt-0.5 block text-sm text-navy-100">
                One request, about 50 companies
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export function MobileNav() {
  const [openPath, setOpenPath] = useState<string | null>(null);
  const pathname = usePathname();
  const open = openPath === pathname;
  const buttonRef = useRef<HTMLButtonElement>(null);
  const ref = useDismiss(open, () => {
    setOpenPath(null);
    buttonRef.current?.focus();
  });

  return (
    <div ref={ref} className="lg:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpenPath(open ? null : pathname)}
        className="inline-flex size-12 items-center justify-center rounded-lg text-navy-900 hover:bg-navy-50"
      >
        {open ? <X size={26} aria-hidden="true" /> : <Menu size={26} aria-hidden="true" />}
      </button>
      <div
        id="mobile-menu"
        hidden={!open}
        className="absolute inset-x-0 top-full max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-b border-line bg-white shadow-xl"
      >
        <nav aria-label="Mobile" className="container-page py-4">
          <p className="px-3 pb-1 text-xs font-semibold tracking-wider text-muted uppercase">
            Coverage
          </p>
          <ul>
            {navigation.coverage.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block rounded-lg px-3 py-3 font-semibold text-navy-900 hover:bg-navy-50"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <hr className="my-3 border-line" />
          <ul>
            {navigation.primary.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block rounded-lg px-3 py-3 font-semibold text-navy-900 hover:bg-navy-50"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <Link href="/quote" className="btn-cta">
              Get a Free Quote
            </Link>
            <a href={agency.phone.href} className="btn-outline font-mono">
              <Phone size={18} aria-hidden="true" />
              {agency.phone.display}
            </a>
          </div>
        </nav>
      </div>
    </div>
  );
}
