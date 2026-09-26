import { useSyncExternalStore } from "react";

/**
 * Tiny shared store so any page (e.g. the Account page) can open the global auth modal
 * rendered by the navbar's AccountMenu — no prop-drilling or context needed.
 */
export type AuthModalMode = "sign-in" | "sign-up" | "set-password";

export interface AuthModalState {
  open: boolean;
  mode: AuthModalMode;
}

let state: AuthModalState = { open: false, mode: "sign-in" };
const listeners = new Set<() => void>();

function emit(): void {
  for (const listener of listeners) listener();
}

/** Open the auth modal in the given mode (idempotent). */
export function openAuthModal(mode: AuthModalMode = "sign-in"): void {
  state = { open: true, mode };
  emit();
}

/** Close the auth modal (mode is preserved for the next open). */
export function closeAuthModal(): void {
  state = { ...state, open: false };
  emit();
}

export function getAuthModalState(): AuthModalState {
  return state;
}

export function subscribeAuthModal(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/** React binding for the store above. */
export function useAuthModal(): AuthModalState {
  return useSyncExternalStore(subscribeAuthModal, getAuthModalState, getAuthModalState);
}
