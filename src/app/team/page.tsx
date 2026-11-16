import type { Metadata } from "next";
import Link from "next/link";
import { BadgeCheck, CircleCheck, Mail, Phone, UserRound } from "lucide-react";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { agency, team } from "@/data/agency-config";
import { pageMetadata } from "@/lib/metadata";
import { buildPageSchema } from "@/lib/schema";

const title = "Meet the Team";
const description =
  "Meet the people behind Andrews Insurance Agency in Kendallville, Indiana, including owner and Principal Insurance Broker Justin Michael Andrews.";
const crumbs = [{ name: "Our Team", path: "/team" }];

export const metadata: Metadata = pageMetadata({ title, description, path: "/team" });

export default function TeamPage() {
  return (
    <>
      <JsonLd schema={buildPageSchema({ path: "/team", title, description, crumbs })} />
      <PageHero
        title="Who we are"
        eyebrow="Meet the team"
        crumbs={crumbs}
        quickAnswer={`Andrews Insurance Agency is a small, local team in downtown Kendallville. When you call ${agency.phone.display}, you reach the people on this page, not a call center.`}
      />

      <section aria-label="Team members" className="container-page py-14">
        <ul className="grid gap-6 lg:grid-cols-2">
          {team.map((member) => (
            <li key={member.name} className={`card flex flex-col !p-6 sm:!p-8 ${member.placeholder ? "border-dashed bg-surface" : ""}`}>
              <div className="flex items-center gap-5">
                <span
                  aria-hidden="true"
                  className={`flex size-24 shrink-0 items-center justify-center rounded-full font-display text-3xl font-extrabold ${
                    member.placeholder ? "bg-navy-100 text-navy-700" : "bg-navy-900 text-gold"
                  }`}
                >
                  {member.initials || <UserRound size={40} />}
                </span>
                <div>
                  <h2 className="text-2xl font-bold text-navy-900">{member.name}</h2>
                  <p className="mt-0.5 font-semibold text-royal">{member.title}</p>
                </div>
              </div>

              <div className="mt-5 space-y-3 leading-relaxed text-slate-700">
                {member.bio.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              {member.helpsWith.length ? (
                <>
                  <h3 className="mt-6 font-sans text-sm font-bold tracking-wider text-navy-900 uppercase">
                    Can help you with
                  </h3>
                  <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                    {member.helpsWith.map((item) => (
                      <li key={item} className="flex gap-2 text-slate-700">
                        <CircleCheck size={18} className="mt-1 shrink-0 text-royal" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </>
              ) : null}

              {member.credentials.length ? (
                <dl className="mt-6 space-y-2 border-t border-line pt-5 text-sm">
                  {member.credentials.map((credential) => (
                    <div key={credential.label} className="flex items-start gap-2.5">
                      <BadgeCheck size={18} className="mt-0.5 shrink-0 text-royal" aria-hidden="true" />
                      <div>
                        <dt className="font-semibold text-navy-900">{credential.label}</dt>
                        <dd className="font-mono text-slate-700">{credential.value}</dd>
                      </div>
                    </div>
                  ))}
                </dl>
              ) : null}

              {member.placeholder ? null : (
                <div className="mt-auto flex flex-col gap-3 pt-6 sm:flex-row">
                  <a href={agency.phone.href} className="btn-outline font-mono">
                    <Phone size={18} aria-hidden="true" />
                    {agency.phone.display}
                  </a>
                  <a href={`mailto:${agency.email}`} className="btn-outline">
                    <Mail size={18} aria-hidden="true" />
                    Email {member.name.split(" ")[0]}
                  </a>
                </div>
              )}
            </li>
          ))}
        </ul>

        <p className="mt-10 max-w-3xl text-lg text-slate-700">
          Want to know more about how we work?{" "}
          <Link href="/about" className="font-semibold text-royal hover:underline">
            Read our story
          </Link>{" "}
          or{" "}
          <Link href="/contact" className="font-semibold text-royal hover:underline">
            schedule a conversation
          </Link>
          .
        </p>
      </section>

      <CtaBand heading="Talk with our team" />
    </>
  );
}
