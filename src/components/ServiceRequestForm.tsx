"use client";

import { useState, useTransition } from "react";
import { submitServiceRequest } from "@/app/actions";
import { Field, FormError, SensitiveDataNote, SuccessPanel } from "./form";
import { NonBindingNotice } from "./Notices";

const requestTypes = [
  { value: "id_card_request", label: "Auto ID card" },
  { value: "certificate_of_insurance", label: "Certificate of insurance (COI)" },
  { value: "policy_review", label: "Policy review" },
  { value: "mortgagee_change", label: "Mortgagee / lienholder change" },
  { value: "claims_advocacy_callback", label: "Claim help — request a callback" },
  { value: "billing_question", label: "Billing question" },
];

export function ServiceRequestForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string>();
  const [result, setResult] = useState<{ preview: boolean } | null>(null);
  const [pending, startTransition] = useTransition();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    startTransition(async () => {
      const response = await submitServiceRequest({
        requestType: data.get("requestType"),
        clientName: data.get("clientName"),
        email: data.get("email"),
        phone: data.get("phone"),
        carrierName: data.get("carrierName") ?? "",
        message: data.get("message"),
        nonBindingAcknowledged: data.get("nonBindingAcknowledged") === "on",
      });
      if (response.ok) {
        setResult({ preview: response.preview });
      } else {
        setErrors(response.fieldErrors ?? {});
        setFormError(response.message);
      }
    });
  };

  if (result) {
    return (
      <SuccessPanel title="Service request received" preview={result.preview}>
        <p>
          We will follow up during business hours. Remember that no coverage is added, changed or
          cancelled until you receive written confirmation from a licensed representative.
        </p>
      </SuccessPanel>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="svc-type" label="What do you need?" error={errors.requestType}>
          {(props) => (
            <select {...props} name="requestType" className="field-input" defaultValue="" required>
              <option value="" disabled>
                Select…
              </option>
              {requestTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          )}
        </Field>
        <Field id="svc-carrier" label="Insurance company" optional error={errors.carrierName}>
          {(props) => <input {...props} name="carrierName" className="field-input" />}
        </Field>
        <Field id="svc-name" label="Full name" error={errors.clientName}>
          {(props) => <input {...props} name="clientName" className="field-input" autoComplete="name" required />}
        </Field>
        <Field id="svc-phone" label="Phone" error={errors.phone}>
          {(props) => <input {...props} name="phone" type="tel" className="field-input" autoComplete="tel" required />}
        </Field>
        <Field id="svc-email" label="Email" error={errors.email}>
          {(props) => <input {...props} name="email" type="email" className="field-input" autoComplete="email" required />}
        </Field>
      </div>
      <Field
        id="svc-message"
        label="How can we help?"
        hint="For certificates, include the certificate holder's name and address."
        error={errors.message}
      >
        {(props) => <textarea {...props} name="message" rows={4} maxLength={2000} className="field-input" required />}
      </Field>
      <NonBindingNotice />
      <div>
        <div className="flex items-start gap-3">
          <input
            id="svc-ack"
            name="nonBindingAcknowledged"
            type="checkbox"
            required
            aria-describedby={errors.nonBindingAcknowledged ? "svc-ack-error" : undefined}
            className="mt-1 size-5 shrink-0 accent-royal"
          />
          <label htmlFor="svc-ack" className="text-sm leading-relaxed text-slate-700">
            I understand that submitting this request does not bind, change or cancel coverage, and
            that changes take effect only when confirmed in writing by a licensed representative.
          </label>
        </div>
        {errors.nonBindingAcknowledged ? (
          <p id="svc-ack-error" className="field-error">
            {errors.nonBindingAcknowledged}
          </p>
        ) : null}
      </div>
      <SensitiveDataNote />
      <FormError message={formError} />
      <button type="submit" className="btn-cta w-full disabled:opacity-70 sm:w-auto" disabled={pending}>
        {pending ? "Sending…" : "Send Request"}
      </button>
    </form>
  );
}
