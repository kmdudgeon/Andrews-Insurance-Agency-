import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { Crumb } from "@/lib/schema";

type Props = {
  title: string;
  eyebrow?: string;
  crumbs: Crumb[];
  quickAnswer?: string;
  quickAnswerLabel?: string;
  children?: React.ReactNode;
};

export function PageHero({
  title,
  eyebrow,
  crumbs,
  quickAnswer,
  quickAnswerLabel = "Quick answer",
  children,
}: Props) {
  return (
    <div className="on-dark bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 text-white">
      <div className="container-page py-10 sm:py-14">
        <nav aria-label="Breadcrumb" className="mb-5 text-sm text-navy-100">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href="/" className="hover:text-white hover:underline">
                Home
              </Link>
            </li>
            {crumbs.map((crumb, index) => (
              <li key={crumb.path} className="flex items-center gap-1.5">
                <ChevronRight size={14} aria-hidden="true" />
                {index === crumbs.length - 1 ? (
                  <span aria-current="page" className="font-medium text-white">
                    {crumb.name}
                  </span>
                ) : (
                  <Link href={crumb.path} className="hover:text-white hover:underline">
                    {crumb.name}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </nav>
        {eyebrow ? (
          <p className="mb-2 text-sm font-semibold tracking-wider text-gold uppercase">{eyebrow}</p>
        ) : null}
        <h1 className="max-w-4xl text-3xl font-extrabold sm:text-4xl lg:text-5xl">{title}</h1>
        {quickAnswer ? (
          <section
            aria-label={quickAnswerLabel}
            className="mt-6 max-w-3xl rounded-xl border border-white/20 bg-white/10 p-5"
          >
            <p className="text-xs font-bold tracking-wider text-gold uppercase">
              {quickAnswerLabel}
            </p>
            <p className="mt-1.5 text-lg leading-relaxed text-white">{quickAnswer}</p>
          </section>
        ) : null}
        {children}
      </div>
    </div>
  );
}
