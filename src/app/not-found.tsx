import Link from "next/link";
import { agency } from "@/data/agency-config";

export default function NotFound() {
  return (
    <div className="container-page py-24 text-center">
      <p className="eyebrow">Page not found</p>
      <h1 className="mt-2 text-4xl font-extrabold text-navy-900">We could not find that page</h1>
      <p className="mx-auto mt-4 max-w-xl text-lg text-slate-700">
        The page may have moved. Head back home, start a quote, or call us at{" "}
        <a href={agency.phone.href} className="font-mono font-semibold text-royal hover:underline">
          {agency.phone.display}
        </a>
        .
      </p>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Link href="/" className="btn-outline">
          Back to home
        </Link>
        <Link href="/quote" className="btn-cta">
          Get a Free Quote
        </Link>
      </div>
    </div>
  );
}
