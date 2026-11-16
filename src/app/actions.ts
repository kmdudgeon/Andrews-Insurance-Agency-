"use server";

import type { z } from "zod";
import { agency, legal } from "@/data/agency-config";
import { getSupabaseServer } from "@/lib/supabase/server";
import {
  appointmentSchema,
  quoteSchema,
  serviceRequestSchema,
  type ActionResult,
} from "@/lib/validation";

const GENERIC_ERROR = `We could not send your request. Please try again or call ${agency.phone.display}.`;

function invalid(error: z.ZodError): ActionResult {
  const fieldErrors: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    fieldErrors[key] ??= issue.message;
  }
  return { ok: false, message: "Please correct the highlighted fields.", fieldErrors };
}

async function insert(table: string, row: Record<string, unknown>): Promise<ActionResult> {
  const supabase = getSupabaseServer();
  // Preview mode: database not connected yet, so nothing is stored.
  if (!supabase) return { ok: true, preview: true };
  const { error } = await supabase.from(table).insert(row);
  if (error) {
    console.error(`[${table}] insert failed:`, error.message);
    return { ok: false, message: GENERIC_ERROR };
  }
  return { ok: true, preview: false };
}

const digits = (value: string) => value.replace(/\D/g, "");

export async function submitQuote(input: unknown): Promise<ActionResult> {
  const parsed = quoteSchema.safeParse(input);
  if (!parsed.success) return invalid(parsed.error);
  const data = parsed.data;
  return insert("quote_leads", {
    coverage_types: data.coverageTypes,
    first_name: data.firstName,
    last_name: data.lastName,
    email: data.email,
    phone: digits(data.phone),
    street_address: data.streetAddress || null,
    city: data.city || null,
    state: data.state || "IN",
    zip_code: data.zipCode,
    current_carrier: data.currentCarrier || null,
    policy_expiration_window: data.policyExpirationWindow || null,
    coverage_details: data.coverageDetails,
    preferred_contact_method: data.preferredContactMethod,
    tcpa_consent_granted: true,
    tcpa_consent_text: legal.tcpaConsent,
    tcpa_consent_timestamp: new Date().toISOString(),
    utm_source: data.utmSource || null,
    utm_medium: data.utmMedium || null,
    utm_campaign: data.utmCampaign || null,
    landing_page_path: data.landingPagePath || null,
  });
}

export async function submitAppointment(input: unknown): Promise<ActionResult> {
  const parsed = appointmentSchema.safeParse(input);
  if (!parsed.success) return invalid(parsed.error);
  const data = parsed.data;
  return insert("appointments", {
    client_name: data.clientName,
    email: data.email,
    phone: digits(data.phone),
    consultation_type: data.consultationType,
    insurance_topic: data.insuranceTopic,
    requested_date: data.requestedDate,
    requested_time_slot: data.requestedTimeSlot,
    notes: data.notes || null,
    tcpa_consent_granted: true,
    tcpa_consent_text: legal.tcpaConsent,
    tcpa_consent_timestamp: new Date().toISOString(),
  });
}

export async function submitServiceRequest(input: unknown): Promise<ActionResult> {
  const parsed = serviceRequestSchema.safeParse(input);
  if (!parsed.success) return invalid(parsed.error);
  const data = parsed.data;
  return insert("service_requests", {
    request_type: data.requestType,
    client_name: data.clientName,
    email: data.email,
    phone: digits(data.phone),
    carrier_name: data.carrierName || null,
    message: data.message,
    non_binding_acknowledged: true,
  });
}
