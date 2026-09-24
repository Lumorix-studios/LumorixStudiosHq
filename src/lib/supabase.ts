/**
 * Supabase client for the Lumorix Studios site.
 *
 * Points at the SAME Supabase project the Neo desktop app uses, so an account
 * created in the app can sign in here (and vice versa) and any plan purchased
 * on this site shows up in the app.
 *
 * Configured via Vite env vars (see .env.example at the repo root):
 *   VITE_SUPABASE_URL      — e.g. https://abcdefgh.supabase.co
 *   VITE_SUPABASE_ANON_KEY — the publishable/anon key from the same project
 *
 * When either var is missing the site runs signed-out (every call in auth.ts /
 * billing.ts degrades gracefully) so a build without env vars keeps working.
 */

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/** Project URL, e.g. https://abcdefgh.supabase.co (empty when unconfigured). */
export const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL as string | undefined)?.trim() ?? "";
/** The public anon/publishable key belonging to `supabaseUrl` (empty when unconfigured). */
export const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined)?.trim() ?? "";

export const isSupabaseConfigured = supabaseUrl.length > 0 && supabaseAnonKey.length > 0;

/**
 * True when the page was opened with a Supabase password-recovery token
 * (`#access_token=…&type=recovery`). Captured BEFORE the client is created,
 * because supabase-js scrubs the token from the URL once it has consumed it.
 */
export const arrivedWithRecoveryToken =
  typeof window !== "undefined" &&
  (/[#&]type=recovery\b/.test(window.location.hash) || /[?&]type=recovery\b/.test(window.location.search));

let client: SupabaseClient | null = null;
if (isSupabaseConfigured) {
  // persistSession: keep the login across visits (storage-backed).
  // autoRefreshToken: silently refresh JWTs in the background.
  // detectSessionInUrl: Supabase redirects back to this site with a `?code=`
  // (PKCE) or `#access_token=…` after OAuth / email confirmation — let
  // supabase-js pick the session up from the URL automatically.
  client = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });
}

/** The shared Supabase client, or `null` when env vars are not configured. */
export function supabase(): SupabaseClient | null {
  return client;
}
