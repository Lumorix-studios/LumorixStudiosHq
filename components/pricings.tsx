/**
 * Pricing page — the same Free / Pro / Team / Enterprise plans the Neo app
 * sells, checked out through the same `billing` Supabase edge function, so a
 * purchase here promotes `profiles.plan` in the shared database and unlocks in
 * the app for the same account.
 */

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import {
  IoCardOutline,
  IoCheckmarkCircle,
  IoFlashOutline,
  IoTimeOutline,
} from "react-icons/io5";
import {
  PLAN_DISPLAY,
  PAID_PLANS,
  createCheckout,
  pollOrder,
  type BillingOrder,
  type PaidPlan,
} from "../src/lib/billing";
import { openAuthModal } from "../src/lib/authModal";
import { useAccount } from "../src/lib/useAccount";

type CheckoutState =
  | { phase: "idle" }
  | { phase: "creating" }
  | { phase: "processing"; orderId: string; testMode: boolean }
  | { phase: "done"; plan: PaidPlan }
  | { phase: "error"; message: string };

const CHECKOUT_INTERVAL_MS = 2000;
const CHECKOUT_MAX_ATTEMPTS = 30; // ~60 s of polling before giving up

function formatAmount(cents: number, currency: string): string {
  const symbol = currency.toLowerCase() === "usd" ? "$" : currency.toUpperCase() + " ";
  return symbol + (cents / 100).toFixed(2);
}

function formatPlan(raw: string): string {
  if (!raw) return "Free";
  return raw.charAt(0).toUpperCase() + raw.slice(1);
}

export default function Pricings() {
  const { user, profile, refresh } = useAccount();
  const [checkout, setCheckout] = useState<CheckoutState>({ phase: "idle" });
  const [order, setOrder] = useState<BillingOrder | null>(null);
  const pollTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (pollTimer.current) clearTimeout(pollTimer.current);
    },
    []
  );

  const plan = (profile?.plan ?? "free").trim().toLowerCase();
  const isPro =
    plan === "pro" || plan === "team" || plan === "enterprise" || plan === "admin" || plan === "paid";

  /** Poll the created order until it settles or the attempts run out. The
   *  recursion lives in a nested `tick` so the value is declared before read. */
  const poll = useCallback(
    (orderId: string, attemptsLeft: number) => {
      const tick = async (remaining: number) => {
        try {
          const next = await pollOrder(orderId);
          setOrder(next);
          if (next.status === "paid") {
            const paidPlan = PAID_PLANS.find((p) => p === next.plan) ?? "pro";
            setCheckout({ phase: "done", plan: paidPlan });
            void refresh();
            return;
          }
          if (next.status === "failed" || next.status === "cancelled") {
            setCheckout({ phase: "error", message: "Payment " + next.status + ". No charge was kept." });
            return;
          }
          if (remaining <= 1) {
            setCheckout({
              phase: "error",
              message: "Still waiting for the payment to confirm — reopen Pricing to poll again.",
            });
            return;
          }
          pollTimer.current = setTimeout(() => void tick(remaining - 1), CHECKOUT_INTERVAL_MS);
        } catch (e) {
          setCheckout({ phase: "error", message: e instanceof Error ? e.message : String(e) });
        }
      };
      pollTimer.current = setTimeout(() => void tick(attemptsLeft), CHECKOUT_INTERVAL_MS);
    },
    [refresh]
  );

  const startCheckout = useCallback(
    async (target: PaidPlan) => {
      if (!user) {
        openAuthModal("sign-in");
        return;
      }
      setCheckout({ phase: "creating" });
      setOrder(null);
      try {
        const res = await createCheckout(target);
        if (res.status === "paid") {
          // Test mode: the server auto-settled the order.
          setCheckout({ phase: "done", plan: target });
          void refresh();
          return;
        }
        if (res.checkoutUrl) {
          // A real provider is wired in — open its checkout, then poll.
          window.open(res.checkoutUrl, "_blank");
        }
        setCheckout({ phase: "processing", orderId: res.orderId, testMode: res.testMode });
        poll(res.orderId, CHECKOUT_MAX_ATTEMPTS);
      } catch (e) {
        setCheckout({ phase: "error", message: e instanceof Error ? e.message : String(e) });
      }
    },
    [user, refresh, poll]
  );

  /** Per-plan CTA: current-plan badge, sign-in gate, or buy button. */
  const ctaFor = (target: PaidPlan, label: string, primary: boolean): ReactNode => {
    const isCurrent = plan === target;
    const busy = checkout.phase === "creating" || checkout.phase === "processing";
    if (isCurrent) {
      return (
        <span className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-4 py-2.5 text-sm font-medium text-emerald-400">
          <IoCheckmarkCircle className="h-4 w-4" /> Current plan
        </span>
      );
    }
    return (
      <button
        type="button"
        disabled={busy}
        onClick={() => void startCheckout(target)}
        className={
          primary
            ? "flex w-full items-center justify-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-zinc-950 transition hover:bg-zinc-200 disabled:opacity-50"
            : "w-full rounded-lg border border-zinc-700 px-4 py-2.5 text-sm font-medium text-white transition hover:border-zinc-500 hover:bg-zinc-800 disabled:opacity-50"
        }
      >
        {primary && <IoFlashOutline className="h-4 w-4" />}
        {checkout.phase === "creating"
          ? "Starting checkout…"
          : !user
            ? "Sign in to upgrade"
            : label}
      </button>
    );
  };

  return (
    <div className="bg-zinc-950 text-white">
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        {/* Page header */}
        <div className="max-w-2xl">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Pricing</h1>
          <p className="mt-5 text-lg leading-relaxed text-zinc-400 sm:text-xl">
            Free to start, Pro when you want your own keys. Every plan is tied to your
            Lumorix account — the same one you sign into inside the Neo app.
          </p>
        </div>

        {/* Account status */}
        {user ? (
          <p className="mt-6 text-sm text-zinc-400">
            You&apos;re signed in as <span className="font-medium text-white">{user.email}</span> on the{" "}
            <span className="font-medium text-white">{formatPlan(plan)}</span> plan.
          </p>
        ) : (
          <p className="mt-6 text-sm text-zinc-400">
            <button
              type="button"
              onClick={() => openAuthModal("sign-in")}
              className="font-medium text-white underline underline-offset-4 transition hover:text-zinc-300"
            >
              Sign in
            </button>{" "}
            or create an account to subscribe — upgrades made here unlock in the Neo app.
          </p>
        )}

        {/* Checkout status banners */}
        <div className="mt-8 space-y-3">
          {checkout.phase === "done" && (
            <div className="flex items-start gap-2.5 rounded-xl border border-emerald-500/25 bg-emerald-500/[0.08] px-4 py-3">
              <IoCheckmarkCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
              <p className="text-sm leading-6 text-emerald-300/95">
                Payment received — your account is now on the{" "}
                <strong>{(PLAN_DISPLAY[checkout.plan] ?? PLAN_DISPLAY.pro).name}</strong> plan. Sign into the
                Neo app with the same account and it&apos;s already there.
              </p>
            </div>
          )}

          {checkout.phase === "error" && (
            <p className="rounded-xl border border-red-500/25 bg-red-500/[0.07] px-4 py-3 text-sm leading-6 text-red-400/90">
              {checkout.message}
            </p>
          )}

          {checkout.phase === "processing" && (
            <div className="flex items-start gap-2.5 rounded-xl border border-amber-500/25 bg-amber-500/[0.08] px-4 py-3">
              <IoTimeOutline className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
              <p className="text-sm leading-6 text-amber-300/95">
                Waiting for payment confirmation
                {order ? ` (order ${order.id.slice(0, 8)}…)` : ""}.
                {checkout.testMode && " Test mode is on — no real charge is made."}
              </p>
            </div>
          )}

          {order && checkout.phase !== "idle" && (
            <p className="text-xs text-zinc-500">
              Latest order: {order.id} · {formatAmount(order.amountCents, order.currency)} · {order.status}
            </p>
          )}
        </div>

        {/* Plan cards */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <PlanCard
            name="Free"
            price="$0"
            cadence="forever"
            current={!isPro}
            features={["Unlimited local chats", "Local models (Ollama)", "Cloud sync of chats & settings"]}
            cta={null}
          />
          <PlanCard
            name={PLAN_DISPLAY.pro.name}
            price={PLAN_DISPLAY.pro.price}
            cadence={PLAN_DISPLAY.pro.cadence}
            highlight
            current={plan === "pro"}
            features={[
              "Everything in Free",
              "BYOK — encrypted provider API keys in your account",
              "All providers: OpenAI, Anthropic, Google, Groq, OpenRouter…",
              "Priority support",
            ]}
            cta={ctaFor("pro", "Upgrade to Pro", true)}
          />
          <PlanCard
            name={PLAN_DISPLAY.team.name}
            price={PLAN_DISPLAY.team.price}
            cadence={PLAN_DISPLAY.team.cadence}
            current={plan === "team"}
            features={["Everything in Pro"]}
            cta={ctaFor("team", "Choose Team", false)}
          />
          <PlanCard
            name={PLAN_DISPLAY.enterprise.name}
            price={PLAN_DISPLAY.enterprise.price}
            cadence={PLAN_DISPLAY.enterprise.cadence}
            current={plan === "enterprise"}
            features={["Everything in Pro"]}
            cta={ctaFor("enterprise", "Choose Enterprise", false)}
          />
        </div>

        {/* Payment-method note — real providers render in the edge function. */}
        {!isPro && checkout.phase !== "done" && (
          <div className="mt-10 flex max-w-3xl items-start gap-3 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5">
            <IoCardOutline className="mt-0.5 h-5 w-5 shrink-0 text-zinc-500" />
            <p className="text-sm leading-6 text-zinc-400">
              Checkout runs through the same{" "}
              <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-300">billing</code> edge
              function the Neo app uses. Until a card provider is connected, orders are recorded end to end
              (test mode completes instantly) — wire Stripe/Razorpay into{" "}
              <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-300">
                supabase/functions/billing
              </code>{" "}
              and this UI needs no changes.
            </p>
          </div>
        )}

        <p className="mt-8 max-w-3xl text-xs leading-5 text-zinc-500">
          Prices in USD, billed monthly. Your subscription is attached to your Lumorix account — the same
          account the Neo app signs into — so purchases show up there automatically. BYOK keys are stored
          encrypted in your account, never on this site.
        </p>
      </section>
    </div>
  );
}

/* ── Plan card ─────────────────────────────────────────────────────────────── */
function PlanCard({
  name,
  price,
  cadence,
  features,
  current = false,
  highlight = false,
  cta,
}: {
  name: string;
  price: string;
  cadence: string;
  features: string[];
  current?: boolean;
  highlight?: boolean;
  cta: ReactNode;
}) {
  return (
    <div
      className={`flex flex-col rounded-2xl border p-6 ${
        highlight ? "border-zinc-500 bg-zinc-900 shadow-lg shadow-black/40" : "border-zinc-800 bg-zinc-900/40"
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-300">{name}</h2>
        {current && (
          <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-400">
            current
          </span>
        )}
      </div>
      <p className="mt-4">
        <span className="text-4xl font-semibold tracking-tight text-white">{price}</span>{" "}
        <span className="text-sm text-zinc-500">{cadence}</span>
      </p>
      <ul className="mt-5 flex-1 space-y-2.5">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-sm leading-5 text-zinc-400">
            <IoCheckmarkCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400/80" />
            {feature}
          </li>
        ))}
      </ul>
      {cta && <div className="mt-6">{cta}</div>}
    </div>
  );
}
