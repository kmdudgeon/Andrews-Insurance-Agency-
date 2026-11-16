"use client";

import { useState, useTransition } from "react";
import { submitAppointment } from "@/app/actions";
import { Field, FormError, SensitiveDataNote, SuccessPanel, TcpaConsent } from "./form";
import { NonBindingNotice } from "./Notices";

const topics = ["Auto", "Home / property", "Health, dental or vision", "Life", "Business or farm", "Policy review", "Other"];
const slots = ["Morning (9 AM – 12 PM)", "Early afternoon (12 – 3 PM)", "Late afternoon (3 – 5 PM)"];

export function AppointmentForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string>();
  const [result, setResult] = useState<{ preview: boolean } | null>(null);
  const [pending, startTransition] = useTransition();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    startTransition(async () => {
      const response = await submitAppointment({
        clientName: data.get("clientName"),
        email: data.get("email"),
        phone: data.get("phone"),
        consultationType: data.get("consultationType"),
        insuranceTopic: data.get("insuranceTopic"),
        requestedDate: data.get("requestedDate"),
        requestedTimeSlot: data.get("requestedTimeSlot"),
        notes: data.get("notes") ?? "",
        tcpaConsent: data.get("tcpaConsent") === "on",
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
      <SuccessPanel title="Appointment request received" preview={result.preview}>
        <p>
          We will confirm your date and time by phone or email, usually within one business day.
          Your appointment is not final until we confirm it.
        </p>
      </SuccessPanel>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="appt-name" label="Full name" error={errors.clientName}>
          {(props) => <input {...props} name="clientName" className="field-input" autoComplete="name" required />}
        </Field>
        <Field id="appt-phone" label="Phone" error={errors.phone}>
          {(props) => <input {...props} name="phone" type="tel" className="field-input" autoComplete="tel" required />}
        </Field>
        <Field id="appt-email" label="Email" error={errors.email}>
          {(props) => <input {...props} name="email" type="email" className="field-input" autoComplete="email" required />}
        </Field>
        <Field id="appt-type" label="Meeting type" error={errors.consultationType}>
          {(props) => (
            <select {...props} name="consultationType" className="field-input" defaultValue="phone" required>
              <option value="in_person_kendallville">In person — Kendallville office</option>
              <option value="phone">Phone call</option>
              <option value="video">Video call</option>
            </select>
          )}
        </Field>
        <Field id="appt-topic" label="What would you like to discuss?" error={errors.insuranceTopic}>
          {(props) => (
            <select {...props} name="insuranceTopic" className="field-input" defaultValue="" required>
              <option value="" disabled>
                Select…
              </option>
              {topics.map((topic) => (
                <option key={topic}>{topic}</option>
              ))}
            </select>
          )}
        </Field>
        <Field id="appt-date" label="Preferred date" hint="Monday through Friday" error={errors.requestedDate}>
          {(props) => <input {...props} name="requestedDate" type="date" className="field-input" required />}
        </Field>
        <Field id="appt-slot" label="Preferred time" error={errors.requestedTimeSlot}>
          {(props) => (
            <select {...props} name="requestedTimeSlot" className="field-input" defaultValue="" required>
              <option value="" disabled>
                Select…
              </option>
              {slots.map((slot) => (
                <option key={slot}>{slot}</option>
              ))}
            </select>
          )}
        </Field>
      </div>
      <Field id="appt-notes" label="Anything we should know?" optional error={errors.notes}>
        {(props) => <textarea {...props} name="notes" rows={3} maxLength={1000} className="field-input" />}
      </Field>
      <TcpaConsent id="tcpa-appointment" name="tcpaConsent" error={errors.tcpaConsent} />
      <NonBindingNotice />
      <SensitiveDataNote />
      <FormError message={formError} />
      <button type="submit" className="btn-cta w-full disabled:opacity-70 sm:w-auto" disabled={pending}>
        {pending ? "Sending…" : "Request Appointment"}
      </button>
    </form>
  );
}
