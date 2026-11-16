"use client";

import { useEffect, useRef, useState, useSyncExternalStore, useTransition } from "react";
import { Briefcase, Car, Check, HeartPulse, Home, Umbrella } from "lucide-react";
import { submitQuote } from "@/app/actions";
import { agency, coverageOptions, type CoverageKey } from "@/data/agency-config";
import { Field, FormError, SensitiveDataNote, SuccessPanel, TcpaConsent } from "./form";
import { NonBindingNotice } from "./Notices";

const STORAGE_KEY = "aia-quote-v1";
const icons: Record<CoverageKey, typeof Car> = {
  auto: Car,
  home: Home,
  health: HeartPulse,
  life: Umbrella,
  commercial: Briefcase,
};

type FormState = {
  step: 1 | 2 | 3;
  coverageTypes: CoverageKey[];
  bundle: boolean;
  zipCode: string;
  currentCarrier: string;
  policyExpirationWindow: string;
  details: Record<string, string>;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  streetAddress: string;
  city: string;
  preferredContactMethod: "phone" | "email" | "text";
};

const emptyState: FormState = {
  step: 1,
  coverageTypes: [],
  bundle: false,
  zipCode: "",
  currentCarrier: "",
  policyExpirationWindow: "",
  details: {},
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  streetAddress: "",
  city: "",
  preferredContactMethod: "phone",
};

type DetailField = {
  key: string;
  label: string;
  placeholder?: string;
  options?: string[];
  inputMode?: "numeric";
};

const detailFields: Record<CoverageKey, { title: string; fields: DetailField[] }> = {
  auto: {
    title: "Vehicles",
    fields: [
      { key: "auto_vehicles", label: "Year, make and model of each vehicle", placeholder: "e.g. 2021 Ford F-150, 2018 Honda CR-V" },
      { key: "auto_drivers", label: "Number of drivers", options: ["1", "2", "3", "4 or more"] },
    ],
  },
  home: {
    title: "Property",
    fields: [
      { key: "home_type", label: "Property type", options: ["Single-family home", "Condo", "Renter", "Manufactured / modular home", "Lake or seasonal home", "Rental property I own"] },
      { key: "home_year_built", label: "Year built", placeholder: "e.g. 1998", inputMode: "numeric" },
      { key: "home_roof_age", label: "Approximate roof age", options: ["0–5 years", "6–10 years", "11–20 years", "Over 20 years", "Not sure"] },
    ],
  },
  health: {
    title: "Household",
    fields: [
      { key: "health_household_size", label: "People needing coverage", options: ["1", "2", "3", "4", "5 or more"] },
      { key: "health_interest", label: "What are you looking for?", options: ["Marketplace (ACA) health plan", "Dental and/or vision", "Short-term medical", "Medicare consultation", "Not sure yet"] },
    ],
  },
  life: {
    title: "Life insurance",
    fields: [
      { key: "life_type", label: "Type of coverage", options: ["Term life", "Whole life", "Final expense", "Mortgage protection", "Not sure yet"] },
      { key: "life_amount", label: "Approximate coverage amount", options: ["Under $50,000", "$50,000 – $250,000", "$250,000 – $500,000", "$500,000 – $1,000,000", "Over $1,000,000", "Not sure yet"] },
    ],
  },
  commercial: {
    title: "Business",
    fields: [
      { key: "business_name", label: "Business name", placeholder: "Business or farm name" },
      { key: "business_industry", label: "Industry or type of work", placeholder: "e.g. Roofing contractor, retail shop, grain farm" },
      { key: "business_employees", label: "Number of employees", options: ["Just me", "2–5", "6–20", "21–50", "Over 50"] },
    ],
  },
};

const expirationOptions = [
  "Within 30 days",
  "In 1–3 months",
  "In 3–6 months",
  "More than 6 months",
  "I don't have coverage now",
];

const steps = ["Coverage", "Basics", "Contact"];

function loadInitialState(): FormState {
  let state = emptyState;
  try {
    const saved = window.sessionStorage.getItem(STORAGE_KEY);
    if (saved) state = { ...emptyState, ...(JSON.parse(saved) as Partial<FormState>) };
  } catch {
    // sessionStorage unavailable or corrupted: start fresh.
  }
  const requested = new URLSearchParams(window.location.search).get("coverage");
  const match = coverageOptions.find((option) => option.key === requested);
  if (match && !state.coverageTypes.includes(match.key)) {
    state = { ...state, coverageTypes: [...state.coverageTypes, match.key] };
  }
  return state;
}

const subscribe = () => () => {};

/** Renders the wizard only after hydration so saved progress can be read from sessionStorage. */
export function QuoteWizard() {
  const hydrated = useSyncExternalStore(subscribe, () => true, () => false);
  if (!hydrated) {
    return (
      <div className="card min-h-[34rem]" aria-busy="true">
        <p className="text-muted">Loading the quote form…</p>
        <noscript>
          <p className="mt-4">
            JavaScript is required for the online quote form. Please call {agency.phone.display} and
            we will be glad to help.
          </p>
        </noscript>
      </div>
    );
  }
  return <Wizard />;
}

function Wizard() {
  const [form, setForm] = useState<FormState>(loadInitialState);
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string>();
  const [result, setResult] = useState<{ preview: boolean } | null>(null);
  const [pending, startTransition] = useTransition();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);

  useEffect(() => {
    try {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(form));
    } catch {
      // Ignore storage errors (private browsing, quota).
    }
  }, [form]);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    headingRef.current?.focus();
  }, [form.step]);

  const update = (patch: Partial<FormState>) => setForm((current) => ({ ...current, ...patch }));
  const setDetail = (key: string, value: string) =>
    setForm((current) => ({ ...current, details: { ...current.details, [key]: value } }));

  const toggleCoverage = (key: CoverageKey) =>
    setForm((current) => ({
      ...current,
      coverageTypes: current.coverageTypes.includes(key)
        ? current.coverageTypes.filter((item) => item !== key)
        : [...current.coverageTypes, key],
    }));

  const validateStep = (step: number) => {
    const next: Record<string, string> = {};
    if (step === 1 && form.coverageTypes.length === 0) {
      next.coverageTypes = "Choose at least one type of coverage.";
    }
    if (step === 2 && !/^\d{5}$/.test(form.zipCode.trim())) {
      next.zipCode = "Enter a 5-digit ZIP code.";
    }
    if (step === 3) {
      if (!form.firstName.trim()) next.firstName = "Enter your first name.";
      if (!form.lastName.trim()) next.lastName = "Enter your last name.";
      if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) next.email = "Enter a valid email address.";
      if (form.phone.replace(/\D/g, "").length !== 10) next.phone = "Enter a 10-digit phone number.";
      if (!consent) next.tcpaConsent = "Please check the box to give your consent.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const goTo = (step: 1 | 2 | 3) => {
    setFormError(undefined);
    update({ step });
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (form.step < 3) {
      if (validateStep(form.step)) goTo((form.step + 1) as 2 | 3);
      return;
    }
    if (!validateStep(3)) return;
    const params = new URLSearchParams(window.location.search);
    const relevantDetails = Object.fromEntries(
      Object.entries(form.details).filter(
        ([key, value]) =>
          value.trim() &&
          form.coverageTypes.some((type) =>
            detailFields[type].fields.some((field) => field.key === key),
          ),
      ),
    );
    startTransition(async () => {
      const response = await submitQuote({
        coverageTypes: form.coverageTypes,
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phone: form.phone,
        streetAddress: form.streetAddress,
        city: form.city,
        state: "IN",
        zipCode: form.zipCode.trim(),
        currentCarrier: form.currentCarrier,
        policyExpirationWindow: form.policyExpirationWindow,
        coverageDetails: { ...relevantDetails, bundle_requested: form.bundle ? "yes" : "no" },
        preferredContactMethod: form.preferredContactMethod,
        tcpaConsent: consent,
        utmSource: params.get("utm_source") ?? "",
        utmMedium: params.get("utm_medium") ?? "",
        utmCampaign: params.get("utm_campaign") ?? "",
        landingPagePath: window.location.pathname,
      });
      if (response.ok) {
        try {
          window.sessionStorage.removeItem(STORAGE_KEY);
        } catch {
          // Nothing to clear.
        }
        setResult({ preview: response.preview });
      } else {
        setErrors(response.fieldErrors ?? {});
        setFormError(response.message);
      }
    });
  };

  if (result) {
    return (
      <SuccessPanel title={`Thank you, ${form.firstName.trim()}. Your request is in.`} preview={result.preview}>
        <p>
          A licensed broker will review your information and contact you by{" "}
          {form.preferredContactMethod === "text" ? "text message" : form.preferredContactMethod},
          usually within one business day.
        </p>
        <p>
          Submitting this request does not bind or change any insurance coverage. Need help sooner?
          Call <a href={agency.phone.href} className="font-mono font-semibold underline">{agency.phone.display}</a>.
        </p>
      </SuccessPanel>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="card min-h-[34rem] !p-5 sm:!p-8">
      <ol className="mb-8 flex items-center gap-2 text-sm font-semibold" aria-label="Progress">
        {steps.map((label, index) => {
          const number = index + 1;
          const done = form.step > number;
          const current = form.step === number;
          return (
            <li
              key={label}
              aria-current={current ? "step" : undefined}
              className="flex flex-1 items-center gap-2"
            >
              <span
                className={`flex size-8 shrink-0 items-center justify-center rounded-full ${
                  done || current ? "bg-navy-900 text-white" : "bg-navy-100 text-navy-900"
                }`}
              >
                {done ? <Check size={16} aria-hidden="true" /> : number}
              </span>
              <span className={current ? "text-navy-900" : "text-muted"}>
                <span className="sr-only">Step {number}: </span>
                {label}
                {done ? <span className="sr-only"> (completed)</span> : null}
              </span>
              {number < steps.length ? <span className="h-px flex-1 bg-line" aria-hidden="true" /> : null}
            </li>
          );
        })}
      </ol>

      {form.step === 1 ? (
        <fieldset aria-describedby={errors.coverageTypes ? "coverage-error" : undefined}>
          <legend className="contents">
            <h2 ref={headingRef} tabIndex={-1} className="text-2xl font-bold text-navy-900 outline-none">
              What would you like to insure?
            </h2>
          </legend>
          <p className="mt-1 text-muted">Select all that apply.</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {coverageOptions.map((option) => {
              const Icon = icons[option.key];
              const selected = form.coverageTypes.includes(option.key);
              return (
                <label
                  key={option.key}
                  className={`flex min-h-16 cursor-pointer items-center gap-3 rounded-xl border-2 p-4 font-semibold transition-colors has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-royal ${
                    selected
                      ? "border-royal bg-blue-50 text-navy-900"
                      : "border-line bg-white text-navy-900 hover:border-slate-400"
                  }`}
                >
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={selected}
                    onChange={() => toggleCoverage(option.key)}
                  />
                  <Icon size={24} aria-hidden="true" className={selected ? "text-royal" : "text-muted"} />
                  <span className="flex-1">{option.label}</span>
                  <span
                    aria-hidden="true"
                    className={`flex size-6 items-center justify-center rounded-md border-2 ${
                      selected ? "border-royal bg-royal text-white" : "border-slate-400"
                    }`}
                  >
                    {selected ? <Check size={16} /> : null}
                  </span>
                </label>
              );
            })}
          </div>
          {errors.coverageTypes ? (
            <p id="coverage-error" role="alert" className="field-error">
              {errors.coverageTypes}
            </p>
          ) : null}
          <label className="mt-5 flex cursor-pointer items-start gap-3 rounded-xl bg-surface p-4">
            <input
              type="checkbox"
              checked={form.bundle}
              onChange={(event) => update({ bundle: event.target.checked })}
              className="mt-0.5 size-5 shrink-0 accent-royal"
            />
            <span>
              <span className="font-semibold text-navy-900">Look for bundle savings</span>
              <span className="block text-sm text-muted">
                Ask carriers for multi-policy discounts when I combine coverage.
              </span>
            </span>
          </label>
        </fieldset>
      ) : null}

      {form.step === 2 ? (
        <div>
          <h2 ref={headingRef} tabIndex={-1} className="text-2xl font-bold text-navy-900 outline-none">
            A few basics
          </h2>
          <p className="mt-1 text-muted">Only the ZIP code is required. Share what you know.</p>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <Field id="zip" label="ZIP code" error={errors.zipCode}>
              {(props) => (
                <input
                  {...props}
                  className="field-input"
                  inputMode="numeric"
                  autoComplete="postal-code"
                  maxLength={5}
                  required
                  value={form.zipCode}
                  onChange={(event) => update({ zipCode: event.target.value })}
                />
              )}
            </Field>
            <Field id="carrier" label="Current insurance company" optional>
              {(props) => (
                <input
                  {...props}
                  className="field-input"
                  value={form.currentCarrier}
                  onChange={(event) => update({ currentCarrier: event.target.value })}
                />
              )}
            </Field>
            <Field id="expiration" label="When does your current policy renew?" optional>
              {(props) => (
                <select
                  {...props}
                  className="field-input"
                  value={form.policyExpirationWindow}
                  onChange={(event) => update({ policyExpirationWindow: event.target.value })}
                >
                  <option value="">Select…</option>
                  {expirationOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              )}
            </Field>
          </div>
          {form.coverageTypes.map((type) => (
            <fieldset key={type} className="mt-7 border-t border-line pt-5">
              <legend className="float-left mb-4 w-full font-display text-lg font-bold text-navy-900">
                {detailFields[type].title}
              </legend>
              <div className="clear-both grid gap-5 sm:grid-cols-2">
                {detailFields[type].fields.map((field) => (
                  <Field key={field.key} id={field.key} label={field.label} optional error={errors[field.key]}>
                    {(props) =>
                      field.options ? (
                        <select
                          {...props}
                          className="field-input"
                          value={form.details[field.key] ?? ""}
                          onChange={(event) => setDetail(field.key, event.target.value)}
                        >
                          <option value="">Select…</option>
                          {field.options.map((option) => (
                            <option key={option}>{option}</option>
                          ))}
                        </select>
                      ) : (
                        <input
                          {...props}
                          className="field-input"
                          placeholder={field.placeholder}
                          inputMode={field.inputMode}
                          maxLength={300}
                          value={form.details[field.key] ?? ""}
                          onChange={(event) => setDetail(field.key, event.target.value)}
                        />
                      )
                    }
                  </Field>
                ))}
              </div>
            </fieldset>
          ))}
          <div className="mt-6">
            <SensitiveDataNote />
          </div>
        </div>
      ) : null}

      {form.step === 3 ? (
        <div>
          <h2 ref={headingRef} tabIndex={-1} className="text-2xl font-bold text-navy-900 outline-none">
            Where should we send your options?
          </h2>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <Field id="first-name" label="First name" error={errors.firstName}>
              {(props) => (
                <input {...props} className="field-input" autoComplete="given-name" required value={form.firstName} onChange={(event) => update({ firstName: event.target.value })} />
              )}
            </Field>
            <Field id="last-name" label="Last name" error={errors.lastName}>
              {(props) => (
                <input {...props} className="field-input" autoComplete="family-name" required value={form.lastName} onChange={(event) => update({ lastName: event.target.value })} />
              )}
            </Field>
            <Field id="email" label="Email" error={errors.email}>
              {(props) => (
                <input {...props} type="email" className="field-input" autoComplete="email" required value={form.email} onChange={(event) => update({ email: event.target.value })} />
              )}
            </Field>
            <Field id="phone" label="Phone" error={errors.phone}>
              {(props) => (
                <input {...props} type="tel" className="field-input" autoComplete="tel" required value={form.phone} onChange={(event) => update({ phone: event.target.value })} />
              )}
            </Field>
            <Field id="street" label="Street address" optional>
              {(props) => (
                <input {...props} className="field-input" autoComplete="street-address" value={form.streetAddress} onChange={(event) => update({ streetAddress: event.target.value })} />
              )}
            </Field>
            <Field id="city" label="City" optional>
              {(props) => (
                <input {...props} className="field-input" autoComplete="address-level2" value={form.city} onChange={(event) => update({ city: event.target.value })} />
              )}
            </Field>
          </div>
          <fieldset className="mt-5">
            <legend className="field-label">How should we contact you?</legend>
            <div className="flex flex-wrap gap-3">
              {(["phone", "email", "text"] as const).map((method) => (
                <label
                  key={method}
                  className={`flex min-h-12 cursor-pointer items-center gap-2 rounded-lg border-2 px-4 font-semibold has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-royal ${
                    form.preferredContactMethod === method
                      ? "border-royal bg-blue-50 text-navy-900"
                      : "border-line text-navy-900"
                  }`}
                >
                  <input
                    type="radio"
                    name="contact-method"
                    className="accent-royal"
                    checked={form.preferredContactMethod === method}
                    onChange={() => update({ preferredContactMethod: method })}
                  />
                  {method === "text" ? "Text message" : method === "phone" ? "Phone call" : "Email"}
                </label>
              ))}
            </div>
          </fieldset>
          <div className="mt-6 space-y-4">
            <TcpaConsent
              id="tcpa-quote"
              checked={consent}
              onChange={(checked) => {
                setConsent(checked);
                if (checked) setErrors((current) => ({ ...current, tcpaConsent: "" }));
              }}
              error={errors.tcpaConsent}
            />
            <NonBindingNotice />
            <SensitiveDataNote />
          </div>
        </div>
      ) : null}

      <div className="mt-6">
        <FormError message={formError} />
      </div>

      <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
        {form.step > 1 ? (
          <button type="button" className="btn-outline" onClick={() => goTo((form.step - 1) as 1 | 2)}>
            Back
          </button>
        ) : (
          <span />
        )}
        <button type="submit" className="btn-cta disabled:opacity-70" disabled={pending}>
          {form.step < 3 ? "Continue" : pending ? "Sending…" : "Get My Free Quote"}
        </button>
      </div>
    </form>
  );
}
