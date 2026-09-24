/**
 * Authentication for the Lumorix Studios site — email/password + GitHub &
 * Google OAuth against the SAME Supabase project the Neo app uses, so an
 * account created in the app signs in here and any plan bought here unlocks
 * in the app.
 *
 * All functions degrade gracefully when Supabase env vars are missing
 * (isSupabaseConfigured === false): they resolve to a signed-out state with a
 * friendly message instead of throwing.
 */

import {
  supabase,
  isSupabaseConfigured,
  supabaseUrl,
  supabaseAnonKey,
} from "./supabase";

export type AuthProvider = "github" | "google";

/** Display label for an OAuth provider id ("github" → "GitHub"). */
export function providerLabel(provider: AuthProvider): string {
  return provider === "github" ? "GitHub" : "Google";
}

/** Which sign-in methods the Supabase project actually has switched on. */
export interface EnabledProviders {
  email: boolean;
  github: boolean;
  google: boolean;
}

let providersPromise: Promise<EnabledProviders | null> | null = null;

/**
 * Ask the project which sign-in providers are enabled.
 *
 * Needed because a disabled provider still builds a valid-looking OAuth URL
 * entirely client-side — supabase-js reports `error: null` and the user gets
 * dropped into the browser staring at raw GoTrue JSON. The public settings
 * endpoint is the only way to know beforehand. Cached for the session;
 * resolves to `null` when the probe fails (offline, old project…), and callers
 * should then simply let the user try.
 */
export function fetchEnabledProviders(): Promise<EnabledProviders | null> {
  if (!isSupabaseConfigured) return Promise.resolve(null);
  if (!providersPromise) {
    providersPromise = fetch(`${supabaseUrl}/auth/v1/settings`, {
      headers: { apikey: supabaseAnonKey },
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((json: { external?: Record<string, boolean> } | null) => {
        const external = json?.external;
        if (!external) return null;
        return {
          // `!== false` so an unexpected shape still lets the user try.
          email: external.email !== false,
          github: external.github === true,
          google: external.google === true,
        };
      })
      .catch(() => null);
  }
  return providersPromise;
}

/** Re-probe the project, ignoring the session cache. */
export function refreshEnabledProviders(): Promise<EnabledProviders | null> {
  providersPromise = null;
  return fetchEnabledProviders();
}

/** True when the project is known to have this provider switched off. */
export async function isProviderDisabled(provider: AuthProvider): Promise<boolean> {
  const enabled = await fetchEnabledProviders();
  return enabled ? !enabled[provider] : false;
}

/** Actionable message for a provider that isn't enabled on the project. */
export function providerDisabledMessage(provider: AuthProvider): string {
  return (
    `${providerLabel(provider)} sign-in isn't enabled on this Supabase project yet. ` +
    "Turn it on in Dashboard → Authentication → Sign In / Providers, then try again."
  );
}

export interface NeoUser {
  id: string;
  email: string;
  /** Display name (profile row if present, else email local-part). */
  name: string;
  /** Avatar URL (profile row if present, else OAuth-provided one). */
  avatarUrl: string | null;
  /** Raw auth provider ("email" | "github" | "google"). */
  provider: string;
}

export interface Profile extends NeoUser {
  /** Billing plan id from profiles.plan ("free" by default). */
  plan: string;
  /** Paywall flag — flipped server-side when a paid plan is active. */
  byokEnabled: boolean;
  createdAt: string | null;
  /** Set when the profiles row could not be loaded (grants/RLS/schema). */
  dbError?: string | null;
}

const BYOK_PLAN_IDS = new Set(["admin", "pro", "team", "enterprise", "paid"]);

function planIncludesByok(plan: string | null | undefined): boolean {
  return BYOK_PLAN_IDS.has((plan ?? "").trim().toLowerCase());
}

function resolveByokEnabled(row?: { plan?: string | null; byok_enabled?: boolean | null } | null): boolean {
  if (planIncludesByok(row?.plan)) return true;
  return row?.byok_enabled ?? true;
}

/** Map a supabase auth user + profile row to our app-level shape. */
function toNeoUser(
  authUser: {
    id: string;
    email?: string | null;
    user_metadata?: Record<string, unknown>;
    app_metadata?: Record<string, unknown>;
  },
  profile?: { display_name?: string | null; avatar_url?: string | null } | null
): NeoUser {
  const meta = authUser.user_metadata ?? {};
  const metaName =
    (typeof meta.full_name === "string" && meta.full_name) ||
    (typeof meta.user_name === "string" && meta.user_name) ||
    (typeof meta.name === "string" && meta.name) ||
    "";
  const metaAvatar =
    (typeof meta.avatar_url === "string" && meta.avatar_url) ||
    (typeof meta.picture === "string" && meta.picture) ||
    null;
  const identity = (authUser.app_metadata?.provider as string | undefined) ?? "email";
  return {
    id: authUser.id,
    email: authUser.email ?? "",
    name: profile?.display_name || metaName || authUser.email?.split("@")[0] || "Account",
    avatarUrl: profile?.avatar_url || metaAvatar,
    provider: identity,
  };
}

export function authErrorMessage(err: unknown): string {
  const msg = err instanceof Error ? err.message : String(err);

  // Supabase returns this until the provider is switched on in the dashboard.
  if (/provider is not enabled|unsupported provider/i.test(msg)) {
    return "This sign-in provider isn't enabled on your Supabase project yet — turn it on in Dashboard → Authentication → Sign In / Providers, then try again.";
  }

  // redirect_to rejected because it isn't in the allow list.
  if (/redirect/i.test(msg) && /(not allowed|not in|invalid|whitelist)/i.test(msg)) {
    return "This site's URL isn't in the Redirect URLs allow list — add it in Dashboard → Authentication → URL Configuration (e.g. https://lumorix-studios.github.io/LumorixStudiosHq/*), then try again.";
  }

  return msg
    .replace(/Email logins are disabled/, "Email sign-in is disabled for this project")
    .replace(/Invalid login credentials/, "Incorrect email or password.")
    .replace(/User already registered/, "An account with this email already exists — try signing in.")
    .replace(/Password should be at least/, "Password is too short — use at least 6 characters.");
}

/**
 * Where Supabase sends the browser back to after OAuth / email confirmation.
 * Defaults to the current origin + base path (correct for the deployed GitHub
 * Pages site and for the local dev server); override with
 * VITE_OAUTH_REDIRECT_URL when needed. Either way the URL must be listed in
 * Dashboard → Authentication → URL Configuration → Redirect URLs.
 */
export function siteRedirectUrl(): string {
  const override = (import.meta.env.VITE_OAUTH_REDIRECT_URL as string | undefined)?.trim();
  if (override) return override;
  if (typeof window === "undefined") return "";
  return window.location.origin + import.meta.env.BASE_URL;
}

/** Current signed-in user (null when signed out / Supabase unconfigured). */
export async function getCurrentUser(): Promise<NeoUser | null> {
  if (!isSupabaseConfigured) return null;
  const sb = supabase();
  if (!sb) return null;
  const { data, error } = await sb.auth.getSession();
  if (error || !data.session?.user) return null;
  const { data: profile } = await sb
    .from("profiles")
    .select("display_name, avatar_url")
    .eq("id", data.session.user.id)
    .maybeSingle();
  return toNeoUser(data.session.user, profile ?? undefined);
}

/** Full profile (includes the plan / BYOK paywall flag). Null when signed out. */
export async function getProfile(): Promise<Profile | null> {
  if (!isSupabaseConfigured) return null;
  const sb = supabase();
  if (!sb) return null;
  const { data, error } = await sb.auth.getSession();
  if (error || !data.session?.user) return null;
  const { data: row, error: rowError } = await sb
    .from("profiles")
    .select("id, display_name, avatar_url, plan, byok_enabled, created_at")
    .eq("id", data.session.user.id)
    .maybeSingle();
  const resolvedPlan = rowError ? "unavailable" : (row?.plan ?? "free");
  const resolvedByok = rowError ? false : resolveByokEnabled(row);
  const base = toNeoUser(data.session.user, row ?? undefined);
  return {
    ...base,
    plan: resolvedPlan,
    byokEnabled: resolvedByok,
    createdAt: row?.created_at ?? null,
    dbError: rowError?.message ?? null,
  };
}

/** Create the profile row on demand (backup for the DB signup trigger). */
export async function ensureProfile(): Promise<void> {
  if (!isSupabaseConfigured) return;
  const sb = supabase();
  if (!sb) return;
  const { data } = await sb.auth.getSession();
  const user = data.session?.user;
  if (!user) return;
  const { data: existing } = await sb.from("profiles").select("id").eq("id", user.id).maybeSingle();
  if (existing) return;
  const meta = user.user_metadata ?? {};
  // `ignoreDuplicates` → INSERT … ON CONFLICT DO NOTHING, so it only needs
  // INSERT privileges — the client can never touch plan / byok_enabled
  // (0002_harden_profiles); only the billing edge function promotes those.
  await sb.from("profiles").upsert(
    {
      id: user.id,
      email: user.email ?? "",
      display_name:
        (typeof meta.full_name === "string" && meta.full_name) ||
        (typeof meta.user_name === "string" && meta.user_name) ||
        user.email?.split("@")[0] ||
        "Account",
      avatar_url:
        (typeof meta.avatar_url === "string" && meta.avatar_url) ||
        (typeof meta.picture === "string" && meta.picture) ||
        null,
    },
    { onConflict: "id", ignoreDuplicates: true }
  );
}

/**
 * Update the display name / avatar on the signed-in user's profile row.
 *
 * Only `display_name`, `avatar_url` and `updated_at` are writable by the
 * client (see the project's 0002_harden_profiles migration) — plan and
 * byok_enabled stay server-managed. Supabase fires no auth event for a
 * profiles update, so callers should follow up with notifyAccountRefresh()
 * (src/lib/useAccount.ts) to refresh every mounted useAccount().
 */
export async function updateProfile(patch: {
  displayName?: string;
  avatarUrl?: string | null;
}): Promise<void> {
  if (!isSupabaseConfigured) throw new Error("Not signed in.");
  const sb = supabase();
  if (!sb) throw new Error("Not signed in.");
  // Backup for the DB trigger on accounts that predate it.
  await ensureProfile().catch(() => undefined);
  const { data } = await sb.auth.getSession();
  const uid = data.session?.user?.id;
  if (!uid) throw new Error("Not signed in.");
  const update: Record<string, unknown> = { updated_at: new Date().toISOString() };
  if (patch.displayName !== undefined) update.display_name = patch.displayName;
  if (patch.avatarUrl !== undefined) update.avatar_url = patch.avatarUrl;
  const { error } = await sb.from("profiles").update(update).eq("id", uid);
  if (error) throw new Error(authErrorMessage(error));
}

/**
 * Sign up with email + password. Supabase sends a confirmation email when
 * "Confirm email" is enabled on the project (default) — surface that to the UI.
 */
export async function signUpWithEmail(email: string, password: string): Promise<{ needsEmailConfirmation: boolean }> {
  if (!isSupabaseConfigured) throw new Error("Cloud sync is not configured.");
  const sb = supabase();
  if (!sb) throw new Error("Cloud sync is not configured.");
  const { data, error } = await sb.auth.signUp({
    email,
    password,
    options: { emailRedirectTo: siteRedirectUrl() || undefined },
  });
  if (error) throw new Error(authErrorMessage(error));
  await ensureProfile().catch(() => undefined);
  return { needsEmailConfirmation: !data.session && !!data.user };
}

/** Sign in with email + password. */
export async function signInWithEmail(email: string, password: string): Promise<void> {
  if (!isSupabaseConfigured) throw new Error("Cloud sync is not configured.");
  const sb = supabase();
  if (!sb) throw new Error("Cloud sync is not configured.");
  const { error } = await sb.auth.signInWithPassword({ email, password });
  if (error) throw new Error(authErrorMessage(error));
  await ensureProfile().catch(() => undefined);
}

/** Send a password-reset email that returns to this site. */
export async function resetPassword(email: string): Promise<void> {
  if (!isSupabaseConfigured) throw new Error("Cloud sync is not configured.");
  const sb = supabase();
  if (!sb) throw new Error("Cloud sync is not configured.");
  const { error } = await sb.auth.resetPasswordForEmail(email, {
    redirectTo: siteRedirectUrl() || undefined,
  });
  if (error) throw new Error(authErrorMessage(error));
}

/** Set a new password for the current (recovered) session. */
export async function updatePassword(password: string): Promise<void> {
  if (!isSupabaseConfigured) throw new Error("Cloud sync is not configured.");
  const sb = supabase();
  if (!sb) throw new Error("Cloud sync is not configured.");
  const { error } = await sb.auth.updateUser({ password });
  if (error) throw new Error(authErrorMessage(error));
}

/** Sign out (cloud data stays intact for the next login). */
export async function signOut(): Promise<void> {
  if (!isSupabaseConfigured) return;
  const sb = supabase();
  if (!sb) return;
  await sb.auth.signOut();
}

/** Sign out of every device — revokes all refresh tokens for the account. */
export async function signOutEverywhere(): Promise<void> {
  if (!isSupabaseConfigured) return;
  const sb = supabase();
  if (!sb) return;
  await sb.auth.signOut({ scope: "global" });
}

/**
 * OAuth sign-in (GitHub / Google). The browser navigates to the provider, then
 * Supabase redirects back to this site where supabase-js (detectSessionInUrl)
 * picks the session up from the returned URL.
 */
export async function signInWithOAuth(provider: AuthProvider): Promise<void> {
  if (!isSupabaseConfigured) throw new Error("Cloud sync is not configured.");
  const sb = supabase();
  if (!sb) throw new Error("Cloud sync is not configured.");

  // Pre-flight: a disabled provider still builds a URL locally and reports
  // error: null — without this the user ends up on GoTrue's raw JSON page.
  if (await isProviderDisabled(provider)) throw new Error(providerDisabledMessage(provider));

  const { error } = await sb.auth.signInWithOAuth({
    provider,
    options: { redirectTo: siteRedirectUrl() || undefined },
  });
  if (error) throw new Error(authErrorMessage(error));
  // supabase-js assigns window.location itself (no skipBrowserRedirect).
}

/** Subscribe to sign-in / sign-out events. Returns an unsubscribe fn. */
export function onAuthChanged(cb: (user: NeoUser | null) => void): () => void {
  if (!isSupabaseConfigured) {
    cb(null);
    return () => undefined;
  }
  const sb = supabase();
  if (!sb) {
    cb(null);
    return () => undefined;
  }
  const { data } = sb.auth.onAuthStateChange((_event, session) => {
    void (async () => {
      if (!session?.user) {
        cb(null);
        return;
      }
      cb(await getCurrentUser());
    })();
  });
  return () => data.subscription.unsubscribe();
}
