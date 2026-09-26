# Lumorix Studios HQ

Official website for **Lumorix Studios** and **ProjectNeo** (a.k.a. AgenticCoder /
Neo) — a lightweight, local-first, agentic integrated development environment.

Live site: https://lumorix-studios.github.io/LumorixStudiosHq/

## What this repo is

A React + TypeScript + Vite single-page app that serves:

* **Home** — product landing page
* **Downloads** — desktop build downloads
* **Documentation** — guides, provider setup, and FAQ
* **Account** — sign-in and profile, backed by the same Supabase project the
  Neo desktop app uses

The desktop app source lives in a separate repository (see the app README).

## Accounts

The website and the Neo app share one Supabase backend, so a single account
works across both. An account is optional — it is only needed for features that
require a backend (cloud sync and encrypted provider-key storage). All local
features work without signing in.

## Pricing

**ProjectNeo is free.** There are no paid plans, no subscriptions, and no
paywall. Every feature is available to all users at no cost, and Lumorix
Studios does not process payments.

## Getting started

```bash
npm install
npm run dev      # start the dev server
npm run build    # typecheck + production build
npm run preview  # preview the production build
npm run deploy   # publish to GitHub Pages
```

## Environment

Copy `.env.example` to `.env` and fill in your Supabase project values:

| Variable | Purpose |
| --- | --- |
| `VITE_SUPABASE_URL` | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon (public) key |

Accounts are disabled if these are missing — the site still builds and the
non-account pages still work.

## Tech stack

React 19 · TypeScript · Vite · React Router · Tailwind CSS v4 · Supabase JS ·
Three.js · GSAP

## Legal

* [Privacy Policy & Terms of Use](https://lumorix-studios.github.io/LumorixStudiosHq/privacypolicyandterms)
* [`LICENSE`](LICENSE) — MIT, covering this website's own source code
* The Neo desktop app is licensed separately under the NEO Source-Available
  License 1.0 — see that repository's `LICENSE` file

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) and
[CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).

---

Copyright © 2026 Lumorix Studios
