import { useCallback, useEffect, useState } from "react";
import {
  getProfile,
  getCurrentUser,
  onAuthChanged,
  type NeoUser,
  type Profile,
} from "./auth";
import { isSupabaseConfigured } from "./supabase";

/**
 * Tiny shared store (same pattern as authModal.ts) so any component can ask
 * every mounted useAccount() instance to re-read the account — needed after
 * updateProfile(), which changes the `profiles` row without firing a supabase
 * auth event.
 */
const accountListeners = new Set<() => void>();

/** Ask every mounted useAccount() instance to re-read user + profile. */
export function notifyAccountRefresh(): void {
  for (const listener of accountListeners) listener();
}

/** Subscribe to those refresh requests. Returns an unsubscribe fn. */
export function subscribeAccountRefresh(listener: () => void): () => void {
  accountListeners.add(listener);
  return () => {
    accountListeners.delete(listener);
  };
}

export interface AccountState {
  /** True while the very first session probe is in flight. */
  loading: boolean;
  user: NeoUser | null;
  /** Includes the informational `plan` column from `profiles`. */
  profile: Profile | null;
  /** Re-read user + profile (e.g. after a profile save). */
  refresh: () => Promise<void>;
}

/**
 * Current signed-in account, shared with the Neo app (same Supabase project).
 *
 * Each call site keeps its own state; every instance stays in sync because all
 * of them subscribe to the same supabase-js auth events.
 */
export function useAccount(): AccountState {
  const [loading, setLoading] = useState(isSupabaseConfigured);
  const [user, setUser] = useState<NeoUser | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);

  const refresh = useCallback(async () => {
    const nextUser = await getCurrentUser();
    const nextProfile = nextUser ? await getProfile() : null;
    setUser(nextUser);
    setProfile(nextProfile);
    setLoading(false);
  }, []);

  useEffect(() => {
    let cancelled = false;

    // Explicit refresh requests (e.g. after a profile save on the Account page).
    const unsubscribeLocal = subscribeAccountRefresh(() => {
      if (cancelled) return;
      void refresh();
    });

    // Initial probe — only touches React state after the awaited reads return.
    void (async () => {
      const nextUser = await getCurrentUser();
      const nextProfile = nextUser ? await getProfile() : null;
      if (cancelled) return;
      setUser(nextUser);
      setProfile(nextProfile);
      setLoading(false);
    })();

    // Stay in sync with sign-in / sign-out (subscription callback).
    const unsubscribe = onAuthChanged((nextUser) => {
      if (cancelled) return;
      setUser(nextUser);
      if (!nextUser) {
        setProfile(null);
        setLoading(false);
        return;
      }
      void getProfile().then((nextProfile) => {
        if (!cancelled) setProfile(nextProfile);
      });
    });

    return () => {
      cancelled = true;
      unsubscribe();
      unsubscribeLocal();
    };
  }, [refresh]);

  return { loading, user, profile, refresh };
}
