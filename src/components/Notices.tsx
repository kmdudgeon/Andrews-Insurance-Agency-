import { Info, ShieldAlert } from "lucide-react";
import { legal } from "@/data/agency-config";

export function NonBindingNotice({ className = "" }: { className?: string }) {
  return (
    <p
      role="note"
      className={`flex gap-3 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm leading-relaxed text-amber-950 ${className}`}
    >
      <ShieldAlert size={20} className="mt-0.5 shrink-0 text-cta" aria-hidden="true" />
      <span>{legal.nonBinding}</span>
    </p>
  );
}

export function InformationalNotice({ className = "" }: { className?: string }) {
  return (
    <p
      role="note"
      className={`flex gap-3 rounded-xl border border-line bg-white p-4 text-sm leading-relaxed text-muted ${className}`}
    >
      <Info size={20} className="mt-0.5 shrink-0 text-royal" aria-hidden="true" />
      <span>{legal.informational}</span>
    </p>
  );
}

export function PlainNotice({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <aside className="rounded-xl border border-line bg-white p-5 text-sm leading-relaxed text-slate-700">
      <h2 className="mb-1.5 font-sans text-sm font-bold tracking-wider text-navy-900 uppercase">
        {title}
      </h2>
      {children}
    </aside>
  );
}
