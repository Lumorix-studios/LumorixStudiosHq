/**
 * Account page — the signed-in profile for the shared Lumorix / Neo Supabase
 * account: display name + avatar, current plan and purchase history, plus the
 * security actions (change password, reset link, sign out).
 *
 * Everything editable here is the same `profiles` row the Neo desktop app
 * reads, so a save shows up in both places.
 *
 * Deliberately plain: one narrow column, hairline separators, no cards, glows
 * or pills — this page should read like settings, not a dashboard.
 */

import {
  useCallback,
  useEffect,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { Link } from "react-router-dom";
import {
  IoCheckmarkCircle,
  IoCheckmarkOutline,
  IoChevronForward,
  IoCloseOutline,
  IoLogoGithub,
  IoLogoGoogle,
  IoMailOutline,
} from "react-icons/io5";
import {
  resetPassword,
  signOut,
  signOutEverywhere,
  updatePassword,
  updateProfile,
} from "../src/lib/auth";
import { openAuthModal } from "../src/lib/authModal";
import { isSupabaseConfigured } from "../src/lib/supabase";
import { notifyAccountRefresh, useAccount } from "../src/lib/useAccount";
import { listOrders, PLAN_DISPLAY, type BillingOrder, type OrderStatus } from "../src/lib/billing";

const PAID_PLANS = new Set(["pro", "team", "enterprise", "admin", "paid"]);

/** Order status is tinted text — no pills, no tiles. */
const STATUS_TONE: Record<OrderStatus, string> = {
  paid: "text-emerald-400",
  pending: "text-amber-400",
  failed: "text-red-400",
  cancelled: "text-zinc-500",
};

/* ── Shared classes (single source so every block matches) ── */

const FIELD_CLASS =
  "w-full border-b border-zinc-800 bg-transparent py-1.5 text-sm text-white placeholder:text-zinc-600 transition focus:border-zinc-500 focus:outline-none";
/** Compact label rhythm shared by the page and password dialog. */
const LABEL_CLASS = "mb-1.5 block text-xs font-medium text-zinc-500";
const PRIMARY_BUTTON =
  "inline-flex items-center justify-center rounded-md bg-white px-4 py-2.5 text-sm font-medium text-zinc-950 transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-40";
const GHOST_BUTTON =
  "inline-flex items-center justify-center rounded-md border border-zinc-800 px-4 py-2.5 text-sm font-medium text-zinc-300 transition hover:border-zinc-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-50";
const TEXT_BUTTON =
  "text-sm text-zinc-400 transition hover:text-white disabled:cursor-not-allowed disabled:opacity-50";
/** One clickable line in a hairline-separated list. */
const ROW_CLASS =
  "flex w-full items-center justify-between gap-4 py-2.5 text-left text-sm text-zinc-300 transition hover:text-white";
const LIST_CLASS = "divide-y divide-zinc-800/70";

function messageOf(err: unknown): string {
  return err instanceof Error ? err.message : String(err);
}

function formatPlan(plan: string | null | undefined): string {
  const clean = (plan ?? "free").trim();
  if (!clean) return "Free";
  if (clean.toLowerCase() === "unavailable") return "Unavailable";
  return clean.charAt(0).toUpperCase() + clean.slice(1);
}

function formatAmount(cents: number, currency: string): string {
  const symbol = currency.toLowerCase() === "usd" ? "$" : currency.toUpperCase() + " ";
  return symbol + (cents / 100).toFixed(2);
}

function formatDate(iso: string | null): string {
  if (!iso) return "—";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

function providerLabel(provider: string): string {
  if (provider === "github") return "GitHub";
  if (provider === "google") return "Google";
  return "Email & password";
}

/** Icon for the account's sign-in provider. */
function ProviderIcon({ provider }: { provider: string }) {
  if (provider === "github") return <IoLogoGithub className="h-3.5 w-3.5" />;
  if (provider === "google") return <IoLogoGoogle className="h-3.5 w-3.5" />;
  return <IoMailOutline className="h-3.5 w-3.5" />;
}

function planBlurb(plan: string, isPaid: boolean): string {
  if (isPaid) {
    return `Your ${formatPlan(plan)} plan is active on this account — it unlocks the same features in the Neo app.`;
  }
  return "Free forever — the full editor, local projects and BYOK keys stored on your machine.";
}

function planFeatures(plan: string, isPaid: boolean): string[] {
  if (isPaid) {
    return [
      `The complete ${formatPlan(plan)} feature set in the Neo app`,
      "Encrypted cloud storage for your provider keys",
      "Priority support from the team",
    ];
  }
  return [
    "The core Neo editor, CLI and project tools",
    "Unlimited local projects",
    "Community support on Discord",
  ];
}

/* ── UI primitives ── */

/** One settings block: a hairline rule, a quiet title, optional action on the right. */
function Section({
  title,
  description,
  action,
  children,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="border-t border-zinc-800 pt-6">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h2 className="text-sm font-medium text-white">{title}</h2>
        {action}
      </div>
      {description && <p className="mt-2 text-sm leading-5 text-zinc-500">{description}</p>}
      <div className="mt-5">{children}</div>
    </section>
  );
}

/** Full-width action line used by the Security list. */
function ActionRow({
  label,
  onClick,
  disabled,
  danger,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  danger?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`${ROW_CLASS} disabled:cursor-not-allowed disabled:opacity-50 ${
        danger ? "text-red-400 hover:text-red-300" : ""
      }`}
    >
      <span className="min-w-0 truncate">{label}</span>
      <IoChevronForward className="h-4 w-4 shrink-0 text-zinc-600" />
    </button>
  );
}

/** Inline status message — a left rule and tinted text, nothing boxed. */
function Alert({
  tone,
  children,
}: {
  tone: "error" | "success" | "warning";
  children: ReactNode;
}) {
  const styles =
    tone === "error"
      ? "border-red-500/40 text-red-300/90"
      : tone === "success"
        ? "border-emerald-500/40 text-emerald-300/90"
        : "border-amber-500/40 text-amber-200/90";
  return <p className={`border-l-2 pl-3 text-sm leading-5 ${styles}`}>{children}</p>;
}

/** Centered modal shell: dimmed backdrop, Escape + backdrop close, scroll lock. */
function Dialog({
  titleId,
  onClose,
  width = "max-w-md",
  children,
}: {
  titleId: string;
  onClose: () => void;
  width?: string;
  children: ReactNode;
}) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close dialog"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-black/70 backdrop-blur-sm"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={`relative w-full ${width} rounded-lg border border-zinc-800 bg-zinc-900`}
      >
        {children}
      </div>
    </div>
  );
}

interface PasswordDialogProps {
  email: string;
  onClose: () => void;
  onSubmit: (event: FormEvent) => void;
  value: string;
  confirmValue: string;
  onValueChange: (value: string) => void;
  onConfirmChange: (value: string) => void;
  busy: boolean;
  error: string | null;
  note: string | null;
  reveal: boolean;
  onToggleReveal: () => void;
  onResetLink: () => void;
  resetBusy: boolean;
}

/** Focused "change password" modal, opened from the Security list. */
function PasswordDialog({
  email,
  onClose,
  onSubmit,
  value,
  confirmValue,
  onValueChange,
  onConfirmChange,
  busy,
  error,
  note,
  reveal,
  onToggleReveal,
  onResetLink,
  resetBusy,
}: PasswordDialogProps) {
  const inputType = reveal ? "text" : "password";
  return (
    <Dialog titleId="account-password-title" onClose={onClose}>
      <div className="flex items-start justify-between gap-4 px-5 py-4">
        <div>
          <h2 id="account-password-title" className="text-sm font-medium text-white">
            Change password
          </h2>
          <p className="mt-1 text-xs leading-5 text-zinc-500">
            Signed in as {email || "your account"} · at least 6 characters.
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="-m-1 shrink-0 rounded p-1 text-zinc-500 transition hover:text-white"
        >
          <IoCloseOutline className="h-4 w-4" />
        </button>
      </div>

      <form onSubmit={onSubmit} className="border-t border-zinc-800 px-5 py-4">
        <div className="flex items-baseline justify-between gap-3">
          <label htmlFor="account-new-password" className={LABEL_CLASS}>
            New password
          </label>
          <button
            type="button"
            onClick={onToggleReveal}
            className="text-xs text-zinc-500 transition hover:text-zinc-300"
          >
            {reveal ? "Hide" : "Show"}
          </button>
        </div>
        <input
          id="account-new-password"
          type={inputType}
          value={value}
          onChange={(event) => onValueChange(event.target.value)}
          autoComplete="new-password"
          autoFocus
          placeholder="At least 6 characters"
          className={FIELD_CLASS}
        />
        <label htmlFor="account-confirm-password" className={`${LABEL_CLASS} mt-4`}>
          Confirm new password
        </label>
        <input
          id="account-confirm-password"
          type={inputType}
          value={confirmValue}
          onChange={(event) => onConfirmChange(event.target.value)}
          autoComplete="new-password"
          placeholder="Repeat it"
          className={FIELD_CLASS}
        />

        {(error || note) && (
          <div className="mt-4 space-y-2">
            {error && <Alert tone="error">{error}</Alert>}
            {note && <Alert tone="success">{note}</Alert>}
          </div>
        )}

        <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button type="button" onClick={onClose} className={GHOST_BUTTON}>
            Cancel
          </button>
          <button type="submit" disabled={busy} className={PRIMARY_BUTTON}>
            {busy ? "Updating…" : "Update password"}
          </button>
        </div>

        <p className="mt-5 border-t border-zinc-800 pt-4 text-xs leading-5 text-zinc-500">
          Don&apos;t know your current password?{" "}
          <button
            type="button"
            onClick={onResetLink}
            disabled={resetBusy}
            className="text-zinc-300 underline underline-offset-4 transition hover:text-white disabled:opacity-50"
          >
            {resetBusy ? "Sending the reset email…" : "Email me a reset link"}
          </button>
          .
        </p>
      </form>
    </Dialog>
  );
}

/** Small confirmation modal for destructive session actions. */
function ConfirmDialog({
  title,
  body,
  confirmLabel,
  onClose,
  onConfirm,
}: {
  title: string;
  body: string;
  confirmLabel: string;
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <Dialog titleId="account-confirm-title" onClose={onClose} width="max-w-sm">
      <div className="p-5">
        <h2 id="account-confirm-title" className="text-sm font-medium text-white">
          {title}
        </h2>
        <p className="mt-2 text-sm leading-5 text-zinc-400">{body}</p>
        <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button type="button" onClick={onClose} className={GHOST_BUTTON}>
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="inline-flex items-center justify-center rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-400"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </Dialog>
  );
}

export default function AccountPage() {
  const { loading, user, profile } = useAccount();

  // Profile drafts. `from` tracks the profile values the draft was derived
  // from, so a saved/loaded profile resets the draft during render instead of
  // via a cascading setState-in-effect (same pattern as AccountSection in Neo).
  const loadedName = profile?.name ?? "";
  const loadedAvatar = profile?.avatarUrl ?? "";
  const source = `${loadedName}\u0000${loadedAvatar}`;
  const [draft, setDraft] = useState({ name: loadedName, avatar: loadedAvatar, from: source });
  if (draft.from !== source) setDraft({ name: loadedName, avatar: loadedAvatar, from: source });
  const dirty = draft.name !== loadedName || draft.avatar !== loadedAvatar;

  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [savedNote, setSavedNote] = useState<string | null>(null);

  // Password dialog + security actions.
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordBusy, setPasswordBusy] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordNote, setPasswordNote] = useState<string | null>(null);
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [passwordReveal, setPasswordReveal] = useState(false);
  const [resetBusy, setResetBusy] = useState(false);
  const [confirmSignOutAll, setConfirmSignOutAll] = useState(false);

  const [orders, setOrders] = useState<BillingOrder[] | null>(null);
  const [ordersError, setOrdersError] = useState<string | null>(null);
  const [ordersBusy, setOrdersBusy] = useState(false);

  const userId = user?.id ?? null;

  // Purchase history — RLS only ever returns the signed-in user's own orders.
  useEffect(() => {
    if (!userId) return;
    let cancelled = false;
    void (async () => {
      try {
        const next = await listOrders();
        if (cancelled) return;
        setOrders(next);
        setOrdersError(null);
      } catch (e) {
        if (cancelled) return;
        setOrdersError(messageOf(e));
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [userId]);

  const reloadOrders = async () => {
    setOrdersBusy(true);
    setOrdersError(null);
    try {
      setOrders(await listOrders());
    } catch (e) {
      setOrdersError(messageOf(e));
    } finally {
      setOrdersBusy(false);
    }
  };

  const handleProfileSave = async (event: FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setSaveError(null);
    setSavedNote(null);
    try {
      await updateProfile({
        displayName: draft.name.trim() || undefined,
        avatarUrl: draft.avatar.trim() || null,
      });
      // No supabase auth event fires for a profiles update — tell every
      // useAccount() instance (navbar menu, Pricing banner…) to re-read.
      notifyAccountRefresh();
      setSavedNote("Profile saved — it's updated in the Neo app too.");
    } catch (e) {
      setSaveError(messageOf(e));
    } finally {
      setSaving(false);
    }
  };

  const discardDraft = () => {
    setDraft({ name: loadedName, avatar: loadedAvatar, from: source });
    setSaveError(null);
    setSavedNote(null);
  };

  const handlePasswordChange = async (event: FormEvent) => {
    event.preventDefault();
    setPasswordError(null);
    setPasswordNote(null);
    if (newPassword.length < 6) {
      setPasswordError("Password is too short — use at least 6 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("The two passwords don't match.");
      return;
    }
    setPasswordBusy(true);
    try {
      await updatePassword(newPassword);
      setNewPassword("");
      setConfirmPassword("");
      setPasswordNote("Password updated — use it next time you sign in.");
    } catch (e) {
      setPasswordError(messageOf(e));
    } finally {
      setPasswordBusy(false);
    }
  };

  const handleResetLink = async () => {
    if (!user) return;
    setPasswordError(null);
    setPasswordNote(null);
    setResetBusy(true);
    try {
      await resetPassword(user.email);
      setPasswordNote(`Reset link sent to ${user.email}.`);
    } catch (e) {
      setPasswordError(messageOf(e));
    } finally {
      setResetBusy(false);
    }
  };

  const openPasswordDialog = useCallback(() => {
    setPasswordError(null);
    setPasswordNote(null);
    setPasswordOpen(true);
  }, []);
  const closePasswordDialog = useCallback(() => {
    setPasswordOpen(false);
    setPasswordReveal(false);
  }, []);
  const closeConfirmDialog = useCallback(() => setConfirmSignOutAll(false), []);

  const handleSignOutEverywhere = () => {
    setConfirmSignOutAll(false);
    void signOutEverywhere();
  };

  const plan = (profile?.plan ?? "free").trim().toLowerCase();
  const isPaid = PAID_PLANS.has(plan);

  const paidOrders = (orders ?? []).filter((order) => order.status === "paid");
  const paidCurrencies = new Set(paidOrders.map((order) => order.currency.toLowerCase()));
  const lifetimeNote =
    paidOrders.length > 0 && paidCurrencies.size === 1
      ? `${formatAmount(
          paidOrders.reduce((sum, order) => sum + order.amountCents, 0),
          paidOrders[0].currency
        )} lifetime`
      : null;

  return (
    <div className="bg-zinc-950 text-white">
      <section className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        {/* Page header */}
        <div className="max-w-xl">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Your account</h1>
          <p className="mt-2 text-sm leading-5 text-zinc-400">
            One account for this site and the Neo app — your profile, plan and receipts live here.
          </p>
        </div>

        {/* Result of a security action taken from the Security list */}
        {user && !passwordOpen && (passwordError || passwordNote) && (
          <div className="mt-8 flex items-start justify-between gap-4">
            <Alert tone={passwordError ? "error" : "success"}>
              {passwordError ?? passwordNote}
            </Alert>
            <button
              type="button"
              aria-label="Dismiss"
              onClick={() => {
                setPasswordError(null);
                setPasswordNote(null);
              }}
              className="-m-1 shrink-0 rounded p-1 text-zinc-500 transition hover:text-white"
            >
              <IoCloseOutline className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Supabase not configured on this deployment */}
        {!isSupabaseConfigured && (
          <div className="mt-10 max-w-xl">
            <Alert tone="warning">
              Accounts aren&apos;t switched on for this deployment yet. Add{" "}
              <code className="text-zinc-300">VITE_SUPABASE_URL</code> and{" "}
              <code className="text-zinc-300">VITE_SUPABASE_ANON_KEY</code> (see{" "}
              <code className="text-zinc-300">.env.example</code>) to the build environment and
              redeploy.
            </Alert>
          </div>
        )}

        {/* First session probe */}
        {isSupabaseConfigured && loading && (
          <p className="mt-10 text-sm text-zinc-500">Loading your account…</p>
        )}

        {/* Signed out gate */}
        {isSupabaseConfigured && !loading && !user && (
          <div className="mt-10 max-w-xl">
            <h2 className="text-xl font-semibold tracking-tight">Sign in to view your account</h2>
            <p className="mt-3 text-sm leading-6 text-zinc-400">
              Your profile, plan and purchase history show up here once you&apos;re signed in. Use
              the same account you sign into inside the Neo app.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => openAuthModal("sign-in")}
                className={PRIMARY_BUTTON}
              >
                Sign in
              </button>
              <button
                type="button"
                onClick={() => openAuthModal("sign-up")}
                className={GHOST_BUTTON}
              >
                Create an account
              </button>
            </div>
            <p className="mt-6 text-xs text-zinc-500">
              Free to create · no card required · cancel any time.
            </p>
          </div>
        )}

        {user && (
          <>
            {/* Who you are */}
            <div className="mt-6 flex items-start gap-3">
              {user.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt=""
                  className="h-10 w-10 shrink-0 rounded-full object-cover"
                />
              ) : (
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-800 text-sm font-medium text-zinc-300">
                  {(user.name || user.email || "A").charAt(0).toUpperCase()}
                </span>
              )}
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-white">{user.name}</p>
                <p className="mt-0.5 truncate text-sm text-zinc-500">
                  {user.email || providerLabel(user.provider)}
                </p>
                <p className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-zinc-500">
                  <ProviderIcon provider={user.provider} />
                  <span>{providerLabel(user.provider)}</span>
                  <span aria-hidden="true">·</span>
                  <span>
                    Member since {profile?.createdAt ? formatDate(profile.createdAt) : "—"}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono" title={user.id}>
                    {user.id.slice(0, 8)}…{user.id.slice(-4)}
                  </span>
                </p>
              </div>
            </div>

            <div className="mt-8 space-y-8">

              {/* ── Profile ── */}
              <Section
                title="Profile"
                description="Shows on this page and inside the Neo app."
                action={
                  dirty ? <span className="text-xs text-amber-300/90">Unsaved changes</span> : undefined
                }
              >
                <form onSubmit={(event) => void handleProfileSave(event)}>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="account-name" className={LABEL_CLASS}>
                        Display name
                      </label>
                      <input
                        id="account-name"
                        value={draft.name}
                        onChange={(event) => {
                          setSavedNote(null);
                          setDraft((value) => ({ ...value, name: event.target.value }));
                        }}
                        placeholder="Your name"
                        maxLength={80}
                        className={FIELD_CLASS}
                      />
                    </div>
                    <div>
                      <label htmlFor="account-avatar" className={LABEL_CLASS}>
                        Avatar URL <span className="text-zinc-600">(optional)</span>
                      </label>
                      <input
                        id="account-avatar"
                        value={draft.avatar}
                        onChange={(event) => {
                          setSavedNote(null);
                          setDraft((value) => ({ ...value, avatar: event.target.value }));
                        }}
                        placeholder="https://example.com/avatar.png"
                        className={FIELD_CLASS}
                      />
                    </div>
                  </div>
                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <button type="submit" disabled={saving || !dirty} className={PRIMARY_BUTTON}>
                      {saving ? "Saving…" : "Save changes"}
                    </button>
                    {dirty && (
                      <button type="button" onClick={discardDraft} className={TEXT_BUTTON}>
                        Discard
                      </button>
                    )}
                    {savedNote && (
                      <p className="flex items-center gap-1.5 text-xs text-emerald-300">
                        <IoCheckmarkCircle className="h-3.5 w-3.5" />
                        {savedNote}
                      </p>
                    )}
                  </div>
                  {saveError && (
                    <div className="mt-6">
                      <Alert tone="error">{saveError}</Alert>
                    </div>
                  )}
                </form>
              </Section>

              {/* ── Plan ── */}
              <Section
                title="Plan"
                description="The same entitlements the Neo app uses."
                action={
                  <span className={isPaid ? "text-xs text-emerald-400" : "text-xs text-zinc-500"}>
                    {isPaid ? "Active" : "Free forever"}
                  </span>
                }
              >
                <p className="text-base font-medium tracking-tight text-white">
                  {formatPlan(profile?.plan)}
                </p>
                <p className="mt-2 text-sm leading-5 text-zinc-400">{planBlurb(plan, isPaid)}</p>
                <ul className="mt-4 space-y-2">
                  {planFeatures(plan, isPaid).map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2.5 text-sm leading-5 text-zinc-400"
                    >
                      <IoCheckmarkOutline className="mt-1 h-3.5 w-3.5 shrink-0 text-zinc-600" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                {profile?.dbError && (
                  <div className="mt-6">
                    <Alert tone="warning">
                      Couldn&apos;t read your profile row ({profile.dbError}) — plan changes may not
                      show until the database grants in SUPABASE_SETUP.md are applied.
                    </Alert>
                  </div>
                )}
                <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2">
                  <Link to="/pricing" className={PRIMARY_BUTTON}>
                    {isPaid ? "Change plan" : `Upgrade to ${PLAN_DISPLAY.pro.name}`}
                  </Link>
                  {/* <p className="max-w-sm text-xs leading-5 text-zinc-500">
                    {profile?.byokEnabled
                      ? `BYOK is included on your ${formatPlan(
                          profile?.plan
                        )} plan — provider API keys stay encrypted in your account.`
                      : `BYOK isn't included in your ${formatPlan(
                          profile?.plan
                        )} plan yet — upgrade to Pro to store encrypted provider API keys.`}
                  </p> */}
                </div>
              </Section>

              {/* ── Purchase history ── */}
              <Section
                title="Purchase history"
                description="Receipts from the same checkout the Neo app uses."
                action={
                  <button
                    type="button"
                    onClick={() => void reloadOrders()}
                    disabled={ordersBusy}
                    className={TEXT_BUTTON}
                  >
                    {ordersBusy ? "Refreshing…" : "Refresh"}
                  </button>
                }
              >
                {ordersError && <Alert tone="error">{ordersError}</Alert>}
                {!ordersError && orders === null && (
                  <p className="text-sm text-zinc-500">Loading your orders…</p>
                )}
                {!ordersError && orders?.length === 0 && (
                  <p className="text-sm text-zinc-500">
                    No purchases yet.{" "}
                    <Link
                      to="/pricing"
                      className="text-zinc-300 underline underline-offset-4 transition hover:text-white"
                    >
                      Compare plans
                    </Link>
                  </p>
                )}
                {!ordersError && orders && orders.length > 0 && (
                  <>
                    <p className="text-xs text-zinc-500">
                      {orders.length} {orders.length === 1 ? "order" : "orders"}
                      {lifetimeNote && (
                        <>
                          {" "}
                          <span aria-hidden="true">·</span>{" "}
                          <span className="text-zinc-400">{lifetimeNote}</span>
                        </>
                      )}
                    </p>
                    <ul className={`mt-2 ${LIST_CLASS}`}>
                      {orders.map((order) => (
                        <li key={order.id} className="flex items-baseline gap-3 py-2.5">
                          <div className="min-w-0 flex-1">
                            <p className="flex flex-wrap items-baseline gap-x-2 text-sm text-zinc-200">
                              {formatPlan(order.plan)}
                              <span
                                className={`text-[11px] uppercase tracking-wide ${
                                  STATUS_TONE[order.status] ?? "text-zinc-500"
                                }`}
                              >
                                {order.status}
                              </span>
                            </p>
                            <p className="mt-0.5 flex flex-wrap items-center gap-x-2 text-xs text-zinc-500">
                              <span>{formatDate(order.createdAt)}</span>
                              {order.provider && (
                                <>
                                  <span aria-hidden="true">·</span>
                                  <span>via {order.provider}</span>
                                </>
                              )}
                              <span aria-hidden="true">·</span>
                              <span className="font-mono">{order.id.slice(0, 8)}…</span>
                            </p>
                          </div>
                          <p className="shrink-0 text-sm tabular-nums text-zinc-200">
                            {formatAmount(order.amountCents, order.currency)}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </Section>

              {/* ── Security ── */}
              <Section
                title="Security"
                description="Applies to this site and the Neo app on every device."
              >
                <div className={LIST_CLASS}>
                  <ActionRow label="Change password" onClick={openPasswordDialog} />
                  <ActionRow
                    label={resetBusy ? "Sending the reset email…" : "Email me a reset link"}
                    onClick={() => void handleResetLink()}
                    disabled={resetBusy}
                  />
                  <ActionRow label="Sign out" onClick={() => void signOut()} />
                  <ActionRow
                    label="Sign out of all devices"
                    onClick={() => setConfirmSignOutAll(true)}
                    danger
                  />
                </div>
              </Section>

              {/* ── Help ── */}
              <Section
                title="Need a hand?"
                description="Billing question, or something off with your account? We read everything that comes in."
              >
                <div className={LIST_CLASS}>
                  <Link to="/contact" className={ROW_CLASS}>
                    <span>Contact support</span>
                    <IoChevronForward className="h-4 w-4 shrink-0 text-zinc-600" />
                  </Link>
                  <a
                    href="https://discord.gg/nMfbNrebs"
                    target="_blank"
                    rel="noreferrer"
                    className={ROW_CLASS}
                  >
                    <span>Join the Discord</span>
                    <IoChevronForward className="h-4 w-4 shrink-0 text-zinc-600" />
                  </a>
                </div>
              </Section>
            </div>
          </>
        )}
      </section>

      {/* Change password — opened from the Security list */}
      {passwordOpen && (
        <PasswordDialog
          email={user?.email ?? ""}
          onClose={closePasswordDialog}
          onSubmit={(event) => void handlePasswordChange(event)}
          value={newPassword}
          confirmValue={confirmPassword}
          onValueChange={setNewPassword}
          onConfirmChange={setConfirmPassword}
          busy={passwordBusy}
          error={passwordError}
          note={passwordNote}
          reveal={passwordReveal}
          onToggleReveal={() => setPasswordReveal((value) => !value)}
          onResetLink={() => void handleResetLink()}
          resetBusy={resetBusy}
        />
      )}

      {/* Destructive session action */}
      {confirmSignOutAll && (
        <ConfirmDialog
          title="Sign out of all devices?"
          body="This revokes every active session — including the Neo app on any machine you've signed into. You'll need to sign in again there."
          confirmLabel="Sign out everywhere"
          onClose={closeConfirmDialog}
          onConfirm={handleSignOutEverywhere}
        />
      )}
    </div>
  );
}

