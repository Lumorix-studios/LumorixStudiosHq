/**
 * Global auth modal — sign in / sign up / set-new-password / forgot password
 * against the same Supabase account the Neo app uses. Rendered once by the
 * AccountMenu in the navbar; any page opens it via openAuthModal()
 * (src/lib/authModal.ts).
 */

import { useEffect, useState, type FormEvent } from "react";
import { IoCloseOutline, IoLogoGithub, IoLogoGoogle } from "react-icons/io5";
import {
  providerDisabledMessage,
  refreshEnabledProviders,
  resetPassword,
  signInWithEmail,
  signInWithOAuth,
  signUpWithEmail,
  updatePassword,
  type AuthProvider,
  type EnabledProviders,
} from "../src/lib/auth";
import { arrivedWithRecoveryToken, supabase } from "../src/lib/supabase";
import { closeAuthModal, openAuthModal, useAuthModal, type AuthModalMode } from "../src/lib/authModal";

function messageOf(err: unknown): string {
  return err instanceof Error ? err.message : String(err);
}

export default function AuthModal() {
  const modal = useAuthModal();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [providers, setProviders] = useState<EnabledProviders | null>(null);

  // Each open starts from a clean slate (Escape / backdrop / X all go through
  // `close`, mode switches through `switchMode` — no resets needed in effects).
  const close = () => {
    setError(null);
    setNotice(null);
    setPassword("");
    closeAuthModal();
  };
  const switchMode = (mode: AuthModalMode) => {
    setError(null);
    setNotice(null);
    setPassword("");
    openAuthModal(mode);
  };

  // Re-probe enabled providers whenever the modal opens, and lock scrolling.
  useEffect(() => {
    if (!modal.open) return;
    void refreshEnabledProviders().then(setProviders);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
    // `close` is recreated each render; only re-run when open/mode changes.
  }, [modal.open, modal.mode]);

  // A password-recovery link redirects back here with a one-shot token; once
  // the session lands, open the "set new password" form (and scrub the URL so
  // a refresh doesn't reopen it).
  useEffect(() => {
    if (!arrivedWithRecoveryToken) return;
    const sb = supabase();
    if (!sb) return;
    let opened = false;
    const open = () => {
      if (opened) return;
      opened = true;
      window.history.replaceState({}, "", window.location.pathname);
      openAuthModal("set-password");
    };
    void sb.auth.getSession().then(({ data }) => {
      if (data.session) open();
    });
    const { data } = sb.auth.onAuthStateChange((_event, session) => {
      if (session) open();
    });
    return () => data.subscription.unsubscribe();
  }, []);

  const isSignUp = modal.mode === "sign-up";
  const isSetPassword = modal.mode === "set-password";

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setBusy(true);
    setError(null);
    setNotice(null);
    try {
      if (isSetPassword) {
        await updatePassword(password);
        close();
      } else if (isSignUp) {
        const { needsEmailConfirmation } = await signUpWithEmail(email, password);
        if (needsEmailConfirmation) {
          setNotice("Check your inbox to confirm your email, then sign in.");
          setEmail("");
          setPassword("");
        } else {
          close();
        }
      } else {
        await signInWithEmail(email, password);
        close();
      }
    } catch (err) {
      setError(messageOf(err));
    }
    setBusy(false);
  };

  const handleForgot = async () => {
    if (!email.trim()) {
      setError("Enter your email above first, then click Forgot password.");
      return;
    }
    setBusy(true);
    setError(null);
    setNotice(null);
    try {
      await resetPassword(email.trim());
      setNotice("Check your inbox for a reset link — it opens back on this site.");
    } catch (err) {
      setError(messageOf(err));
    }
    setBusy(false);
  };

  const handleOAuth = async (provider: AuthProvider) => {
    setBusy(true);
    setError(null);
    setNotice(null);
    try {
      await signInWithOAuth(provider);
      /* the browser navigates away to the provider */
    } catch (err) {
      setError(messageOf(err));
      setBusy(false);
    }
  };

  if (!modal.open) return null;

  const githubOff = providers?.github === false;
  const googleOff = providers?.google === false;

  return (
    <>
      <div
        className="fixed inset-0 z-[60] flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
      >
        <button
          type="button"
          aria-label="Close sign-in"
          onClick={close}
          className="absolute inset-0 h-full w-full cursor-default bg-zinc-950/80 backdrop-blur-sm"
        />
        <div className="relative w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-2xl shadow-black/50 sm:p-8">
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute right-4 top-4 rounded-lg p-1 text-zinc-500 transition hover:bg-zinc-800 hover:text-white"
          >
            <IoCloseOutline className="h-5 w-5" />
          </button>

          <h2 id="auth-modal-title" className="text-xl font-semibold text-white">
            {isSetPassword ? "Set a new password" : isSignUp ? "Create your account" : "Sign in to Lumorix"}
          </h2>
          <p className="mt-2 text-sm leading-6 text-zinc-400">
            {isSetPassword
              ? "Choose a new password for your account."
              : "The same account you use in the Neo app — plans, chats and settings follow you across devices."}
          </p>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            {!isSetPassword && (
              <div>
                <label htmlFor="auth-email" className="block text-sm font-medium text-zinc-300">
                  Email
                </label>
                <input
                  id="auth-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  className="mt-1.5 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-600 outline-none transition focus:border-zinc-400"
                />
              </div>
            )}

            <div>
              <label htmlFor="auth-password" className="block text-sm font-medium text-zinc-300">
                {isSetPassword ? "New password" : "Password"}
              </label>
              <input
                id="auth-password"
                type="password"
                required
                minLength={6}
                autoComplete={isSetPassword || isSignUp ? "new-password" : "current-password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder={isSetPassword ? "At least 6 characters" : "Your password"}
                className="mt-1.5 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-600 outline-none transition focus:border-zinc-400"
              />
            </div>

            {error && (
              <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm leading-5 text-red-300">
                {error}
              </p>
            )}
            {notice && !error && (
              <p className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm leading-5 text-emerald-300">
                {notice}
              </p>
            )}

            <button
              type="submit"
              disabled={busy}
              className="w-full rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-zinc-950 transition hover:bg-zinc-200 disabled:opacity-50"
            >
              {busy ? "Working…" : isSetPassword ? "Save password" : isSignUp ? "Create account" : "Sign in"}
            </button>
          </form>

          {!isSetPassword && (
            <>
              {!isSignUp && (
                <button
                  type="button"
                  onClick={() => void handleForgot()}
                  disabled={busy}
                  className="mt-3 text-sm text-zinc-400 underline underline-offset-4 transition hover:text-white disabled:opacity-50"
                >
                  Forgot password?
                </button>
              )}

              <div className="my-5 flex items-center gap-3">
                <span className="h-px flex-1 bg-zinc-800" />
                <span className="text-[11px] uppercase tracking-widest text-zinc-500">or continue with</span>
                <span className="h-px flex-1 bg-zinc-800" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  disabled={busy || githubOff}
                  title={githubOff ? providerDisabledMessage("github") : "Continue with GitHub"}
                  onClick={() => void handleOAuth("github")}
                  className="flex items-center justify-center gap-2 rounded-lg border border-zinc-700 px-3 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:opacity-50"
                >
                  <IoLogoGithub className="h-4 w-4" />
                  GitHub
                </button>
                <button
                  type="button"
                  disabled={busy || googleOff}
                  title={googleOff ? providerDisabledMessage("google") : "Continue with Google"}
                  onClick={() => void handleOAuth("google")}
                  className="flex items-center justify-center gap-2 rounded-lg border border-zinc-700 px-3 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:opacity-50"
                >
                  <IoLogoGoogle className="h-4 w-4" />
                  Google
                </button>
              </div>
              {(githubOff || googleOff) && (
                <p className="mt-2 text-xs leading-5 text-amber-400/90">
                  {[githubOff ? "GitHub" : null, googleOff ? "Google" : null].filter(Boolean).join(" and ")}{" "}
                  sign-in is switched off in Supabase.
                </p>
              )}

              <p className="mt-5 text-center text-sm text-zinc-400">
                {isSignUp ? "Already have an account?" : "New to Lumorix?"}{" "}
                <button
                  type="button"
                  onClick={() => switchMode(isSignUp ? "sign-in" : "sign-up")}
                  className="font-medium text-white underline underline-offset-4 transition hover:text-zinc-300"
                >
                  {isSignUp ? "Sign in" : "Create one"}
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );
}
