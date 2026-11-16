import { z } from "zod";

const name = z.string({ error: "Enter your name" }).trim().min(1, "Enter your name").max(80);
const email = z.string().trim().toLowerCase().email("Enter a valid email address").max(200);
const phone = z
  .string()
  .trim()
  .refine((value) => value.replace(/\D/g, "").length === 10, "Enter a 10-digit phone number");
const optionalText = (max: number) => z.string().trim().max(max).optional().default("");

/** Blocks values that look like SSNs or payment card numbers in free-text fields. */
const noSensitiveData = (value: string) =>
  !/\b\d{3}-\d{2}-\d{4}\b/.test(value) && !/\b(?:\d[ -]?){13,16}\b/.test(value);
const sensitiveMessage = "Please remove Social Security or card numbers from this field.";

export const coverageKeys = ["auto", "home", "health", "life", "commercial"] as const;

export const quoteSchema = z.object({
  coverageTypes: z.array(z.enum(coverageKeys)).min(1, "Choose at least one coverage type"),
  firstName: name,
  lastName: name,
  email,
  phone,
  streetAddress: optionalText(200),
  city: optionalText(100),
  state: z.string().trim().max(2).optional().default("IN"),
  zipCode: z.string().trim().regex(/^\d{5}$/, "Enter a 5-digit ZIP code"),
  currentCarrier: optionalText(100),
  policyExpirationWindow: optionalText(50),
  coverageDetails: z
    .record(z.string().max(40), z.string().trim().max(300).refine(noSensitiveData, sensitiveMessage))
    .default({}),
  preferredContactMethod: z.enum(["phone", "email", "text"]),
  tcpaConsent: z.literal(true, { error: "Consent is required to submit this form" }),
  utmSource: optionalText(100),
  utmMedium: optionalText(100),
  utmCampaign: optionalText(100),
  landingPagePath: optionalText(300),
});

export const appointmentSchema = z.object({
  clientName: name,
  email,
  phone,
  consultationType: z.enum(["in_person_kendallville", "phone", "video"], { error: "Choose a meeting type" }),
  insuranceTopic: z.string({ error: "Choose a topic" }).trim().min(1, "Choose a topic").max(100),
  requestedDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Choose a date"),
  requestedTimeSlot: z.string({ error: "Choose a time" }).trim().min(1, "Choose a time").max(50),
  notes: optionalText(1000).refine(noSensitiveData, sensitiveMessage),
  tcpaConsent: z.literal(true, { error: "Consent is required to submit this form" }),
});

export const serviceRequestTypes = [
  "id_card_request",
  "certificate_of_insurance",
  "policy_review",
  "mortgagee_change",
  "claims_advocacy_callback",
  "billing_question",
] as const;

export const serviceRequestSchema = z.object({
  requestType: z.enum(serviceRequestTypes, { error: "Choose what you need help with" }),
  clientName: name,
  email,
  phone,
  carrierName: optionalText(100),
  message: z.string().trim().min(1, "Tell us how we can help").max(2000).refine(noSensitiveData, sensitiveMessage),
  nonBindingAcknowledged: z.literal(true, { error: "Please acknowledge the notice above" }),
});

export type QuoteInput = z.input<typeof quoteSchema>;
export type AppointmentInput = z.input<typeof appointmentSchema>;
export type ServiceRequestInput = z.input<typeof serviceRequestSchema>;

export type ActionResult =
  | { ok: true; preview: boolean }
  | { ok: false; message: string; fieldErrors?: Record<string, string> };
