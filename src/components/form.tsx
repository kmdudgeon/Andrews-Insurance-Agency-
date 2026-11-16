import { CircleCheck } from "lucide-react";
import { agency, legal } from "@/data/agency-config";

type FieldProps = {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  optional?: boolean;
  children: (props: {
    id: string;
    "aria-describedby"?: string;
    "aria-invalid"?: true;
  }) => React.ReactNode;
};

/** Label + control + hint + error, wired together with htmlFor / aria-describedby. */
export function Field({ id, label, error, hint, optional, children }: FieldProps) {
  const describedBy =
    [hint ? `${id}-hint` : null, error ? `${id}-error` : null].filter(Boolean).join(" ") ||
    undefined;
  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label}
        {optional ? <span className="font-normal text-muted"> (optional)</span> : null}
      </label>
      {children({ id, "aria-describedby": describedBy, "aria-invalid": error ? true : undefined })}
      {hint ? (
        <p id={`${id}-hint`} className="mt-1.5 text-sm text-muted">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} className="field-error">
          {error}
        </p>
      ) : null}
    </div>
  );
}

type ConsentProps = {
  id: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  name?: string;
  error?: string;
};

/** Required, never pre-checked TCPA express written consent checkbox. */
export function TcpaConsent({ id, checked, onChange, name, error }: ConsentProps) {
  return (
    <div className="rounded-xl border border-line bg-surface p-4">
      <div className="flex items-start gap-3">
        <input
          id={id}
          name={name}
          type="checkbox"
          required
          checked={checked}
          onChange={onChange ? (event) => onChange(event.target.checked) : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          aria-invalid={error ? true : undefined}
          className="mt-1 size-5 shrink-0 accent-royal"
        />
        <label htmlFor={id} className="text-sm leading-relaxed text-slate-700">
          {legal.tcpaConsent}
        </label>
      </div>
      {error ? (
        <p id={`${id}-error`} className="field-error">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function SensitiveDataNote() {
  return <p className="text-sm text-muted">{legal.sensitiveData}</p>;
}

export function FormError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p role="alert" className="rounded-lg border border-red-300 bg-red-50 p-3 text-sm font-medium text-red-800">
      {message}
    </p>
  );
}

export function SuccessPanel({
  title,
  preview,
  children,
}: {
  title: string;
  preview: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      role="status"
      tabIndex={-1}
      ref={(node) => node?.focus()}
      className="rounded-2xl border border-emerald-300 bg-emerald-50 p-6 text-emerald-950 outline-none"
    >
      <p className="flex items-center gap-2 font-display text-xl font-bold">
        <CircleCheck size={24} className="text-emerald-700" aria-hidden="true" />
        {title}
      </p>
      <div className="mt-2 space-y-2 leading-relaxed">{children}</div>
      {preview ? (
        <p className="mt-4 rounded-lg bg-white p-3 text-sm text-slate-700">
          <strong>Preview mode:</strong> this site is not yet connected to its database, so this
          request was not saved. Please call {agency.phone.display} to reach us.
        </p>
      ) : null}
    </div>
  );
}
