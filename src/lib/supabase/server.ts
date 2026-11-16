import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Server-side Supabase client used by Server Actions.
 * Returns null when environment variables are missing so the site still
 * builds and runs in preview mode before live keys are added.
 */
export function getSupabaseServer(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
