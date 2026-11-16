import Link from "next/link";
import { Phone } from "lucide-react";
import { agency } from "@/data/agency-config";

type Props = { heading?: string; text?: string; coverage?: string };

export function CtaBand({
  heading = "Ready to compare your options?",
  text = "Tell us what you need in about two minutes. A licensed broker reviews every request personally.",
  coverage,
}: Props) {
  return (
    <section className="on-dark bg-navy-900 text-white">
      <div className="container-page flex flex-col items-start gap-6 py-12 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-bold sm:text-3xl">{heading}</h2>
          <p className="mt-2 text-lg text-navy-100">{text}</p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Link href={coverage ? `/quote?coverage=${coverage}` : "/quote"} className="btn-gold">
            Get My Free Quote
          </Link>
          <a href={agency.phone.href} className="btn-ghost-dark font-mono">
            <Phone size={18} aria-hidden="true" />
            {agency.phone.display}
          </a>
        </div>
      </div>
    </section>
  );
}
