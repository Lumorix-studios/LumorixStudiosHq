/**
 * Navbar account control — "Sign in" when signed out; avatar + profile
 * dropdown when signed in. Opens the global AuthModal (rendered once in
 * App.tsx). Uses the same Supabase account as the Neo app.
 */

import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  IoChevronDown,
  IoChevronForward,
  IoLogOutOutline,
  IoPersonCircleOutline,
} from "react-icons/io5";
import { signOut } from "../src/lib/auth";
import { openAuthModal } from "../src/lib/authModal";
import { isSupabaseConfigured } from "../src/lib/supabase";
import { useAccount } from "../src/lib/useAccount";

export default function AccountMenu() {
  const { user } = useAccount();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // Close the dropdown on outside click or Escape.
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  // Close on route change (derived state — same pattern as the navbar).
  const path = location.pathname;
  const [lastPath, setLastPath] = useState(path);
  if (lastPath !== path) {
    setLastPath(path);
    if (open) setOpen(false);
  }

  if (!isSupabaseConfigured) return null;

  if (!user) {
    return (
      <>
        <button
          type="button"
          onClick={() => openAuthModal("sign-in")}
          className="min-h-11 rounded-lg border border-zinc-700 px-[clamp(0.625rem,0.9vw,0.875rem)] py-[clamp(0.5rem,0.8vw,0.625rem)] text-[clamp(0.8125rem,0.95vw,0.875rem)] font-medium text-zinc-200 transition hover:border-zinc-500 hover:bg-zinc-800 hover:text-white"
        >
          Sign in
        </button>
      </>
    );
  }

  const initial = (user.name || user.email || "A").charAt(0).toUpperCase();

  return (
    <>
      <div ref={containerRef} className="relative">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-haspopup="menu"
          aria-expanded={open}
          className="flex min-h-11 items-center gap-2 rounded-lg border border-zinc-700 px-[clamp(0.5rem,0.8vw,0.75rem)] py-[clamp(0.375rem,0.6vw,0.5rem)] text-[clamp(0.8125rem,0.95vw,0.875rem)] text-zinc-200 transition hover:border-zinc-500 hover:bg-zinc-800 hover:text-white"
        >
          {user.avatarUrl ? (
            <img src={user.avatarUrl} alt="" className="h-6 w-6 rounded-full object-cover" />
          ) : (
            <span
              className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-700 text-xs font-semibold text-zinc-200"
            >
              {initial}
            </span>
          )}
          <span className="hidden max-w-32 truncate font-medium sm:block">{user.name}</span>
          <IoChevronDown className={`h-3.5 w-3.5 text-zinc-500 transition ${open ? "rotate-180" : ""}`} />
        </button>

        {open && (
          <div
            role="menu"
            className="absolute right-0 top-full z-50 mt-2 w-[clamp(15rem,70vw,16rem)] rounded-xl border border-zinc-800 bg-zinc-900 p-4 shadow-2xl shadow-black/50"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-white">{user.name}</p>
                <p className="truncate text-xs text-zinc-500">{user.email || user.provider}</p>
              </div>
            </div>
            <p className="mt-3 text-xs leading-5 text-zinc-500">
              The same account you sign into inside the Neo app.
            </p>

            <div className="mt-4 space-y-1">
              <Link
                to="/account"
                onClick={() => setOpen(false)}
                className="flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-zinc-200 transition hover:bg-zinc-800 hover:text-white"
              >
                <span className="flex items-center gap-2">
                  <IoPersonCircleOutline className="h-4 w-4" />
                  Account &amp; profile
                </span>
                <IoChevronForward className="h-3.5 w-3.5 text-zinc-500" />
              </Link>
            </div>

            <button
              type="button"
              onClick={() => {
                setOpen(false);
                void signOut();
              }}
              className="mt-3 flex w-full items-center gap-2 rounded-lg border border-zinc-700 px-3 py-2 text-sm font-medium text-zinc-200 transition hover:bg-zinc-800 hover:text-white"
            >
              <IoLogOutOutline className="h-4 w-4" />
              Sign out
            </button>
          </div>
        )}
      </div>
    </>
  );
}
