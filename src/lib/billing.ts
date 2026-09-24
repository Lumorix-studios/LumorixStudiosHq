/**
 * Billing client for the Lumorix Studios site — subscription checkout against
 * the same `billing` Supabase Edge Function the Neo desktop app uses, so a
 * purchase here promotes `profiles.plan` in the shared database and unlocks in
 * the app for the same account.
 *
 * Flow (identical to the app):
 *   1. createCheckout()  → server creates a `payment_orders` row (pending)
 *   2. (real providers)  → open `checkoutUrl` / render the provider widget
 *   3. pollOrder()       → watch the order until the payment settles
 *   4. when status=paid  → the server has already promoted the buyer's profile;
 *      the caller just refreshes the account
 *
 * Real payment methods (Stripe, Razorpay, …) plug into the edge function —
 * this file only ever talks to it, so the UI stays provider-agnostic.
 */

import { supabase, isSupabaseConfigured } from "./supabase";

/** Plans the site can sell. `pro` is the BYOK-unlocking default. */
export const PAID_PLANS = ["pro", "team", "enterprise"] as const;
export type PaidPlan = (typeof PAID_PLANS)[number];

/** Client-side display pricing (server amounts are authoritative). */
export const PLAN_DISPLAY: Record<PaidPlan, { name: string; price: string; cadence: string }> = {
  pro: { name: "Pro", price: "$9", cadence: "per month" },
  team: { name: "Team", price: "$29", cadence: "per month" },
  enterprise: { name: "Enterprise", price: "$99", cadence: "per month" },
};

export type OrderStatus = "pending" | "paid" | "failed" | "cancelled";

export interface BillingOrder {
  id: string;
  plan: string;
  status: OrderStatus;
  provider: string | null;
  providerRef: string | null;
  amountCents: number;
  currency: string;
  createdAt: string | null;
}

export interface CheckoutResult {
  orderId: string;
  status: OrderStatus;
  /** True when the server is in PAYMENTS_TEST_MODE (dev auto-completes). */
  testMode: boolean;
  /** Provider checkout URL — null until a real provider is wired in. */
  checkoutUrl: string | null;
}

/** Turn a functions error into a readable message. */
async function billingErrorMessage(error: unknown, fallback: string): Promise<string> {
  const ctx = (error as { context?: unknown } | null)?.context;
  if (ctx && typeof (ctx as Response).clone === "function") {
    try {
      const body = (await (ctx as Response).clone().json()) as { error?: string };
      if (body?.error) return body.error;
    } catch {
      /* body already consumed, or not JSON */
    }
  }
  const message = (error as { message?: string } | null)?.message;
  return message && message.trim() ? message : fallback;
}

/** Create a pending checkout order on the server for the given plan. */
export async function createCheckout(plan: PaidPlan): Promise<CheckoutResult> {
  if (!isSupabaseConfigured) throw new Error("Cloud sync is not configured — sign-in is required to upgrade.");
  const sb = supabase();
  if (!sb) throw new Error("Not signed in.");
  const { data, error } = await sb.functions.invoke("billing", {
    body: { action: "checkout", plan },
  });
  if (error) {
    throw new Error(await billingErrorMessage(error, "Could not start the checkout — try again."));
  }
  const res = data as CheckoutResult | null;
  if (!res?.orderId) throw new Error("Checkout did not return an order id — try again.");
  return res;
}

/** Map a `payment_orders` row (snake_case, straight from PostgREST). */
interface PaymentOrderRow {
  id: string;
  plan: string;
  status: string;
  provider: string | null;
  provider_ref: string | null;
  amount_cents: number;
  currency: string;
  created_at: string | null;
}

/** Columns selected for every order read (poll fallback + purchase history). */
const ORDER_COLUMNS = "id, plan, status, provider, provider_ref, amount_cents, currency, created_at";

/** snake_case row → camelCase order (shared by pollOrder + listOrders). */
function toBillingOrder(row: PaymentOrderRow): BillingOrder {
  return {
    id: row.id,
    plan: row.plan,
    status: row.status as OrderStatus,
    provider: row.provider,
    providerRef: row.provider_ref,
    amountCents: row.amount_cents,
    currency: row.currency,
    createdAt: row.created_at,
  };
}

/**
 * Poll a checkout order's current status.
 *
 * Preferred path is the `billing` edge function (the order id rides in a
 * header because functions.invoke has no query-string option) — the same call
 * the Neo app makes. A browser-originated GET additionally needs `x-neo-order`
 * in the function's CORS allow-list (and a redeploy of the function); if that
 * call fails, fall back to reading the row directly — RLS
 * (`payment_orders_select_own`) always lets the signed-in owner read their own
 * order, so checkout doesn't stall waiting for the redeploy.
 */
export async function pollOrder(orderId: string): Promise<BillingOrder> {
  if (!isSupabaseConfigured) throw new Error("Cloud sync is not configured.");
  const sb = supabase();
  if (!sb) throw new Error("Not signed in.");

  let edgeFailure: unknown;
  try {
    const { data, error } = await sb.functions.invoke("billing", {
      method: "GET",
      headers: { "x-neo-order": orderId },
    });
    if (error) throw new Error(await billingErrorMessage(error, "Could not read the order status."));
    const order = (data as { order?: BillingOrder } | null)?.order;
    if (!order) throw new Error("Order not found.");
    return order;
  } catch (e) {
    edgeFailure = e;
  }

  const { data, error } = await sb
    .from("payment_orders")
    .select(ORDER_COLUMNS)
    .eq("id", orderId)
    .maybeSingle();
  if (error || !data) {
    throw edgeFailure instanceof Error ? edgeFailure : new Error("Could not read the order status.");
  }
  return toBillingOrder(data as PaymentOrderRow);
}

/**
 * The signed-in user's own orders, newest first — served straight by RLS
 * (`payment_orders_select_own`), so no edge function call is needed. Powers
 * the purchase history on the Account page.
 */
export async function listOrders(limit = 25): Promise<BillingOrder[]> {
  if (!isSupabaseConfigured) throw new Error("Cloud sync is not configured.");
  const sb = supabase();
  if (!sb) throw new Error("Not signed in.");
  const { data, error } = await sb
    .from("payment_orders")
    .select(ORDER_COLUMNS)
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) throw new Error(error.message?.trim() || "Could not load your purchase history.");
  return ((data ?? []) as PaymentOrderRow[]).map(toBillingOrder);
}
