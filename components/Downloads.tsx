
import { useEffect, useState } from "react";

interface ReleaseAsset {
  name: string;
  size: number;
  browser_download_url: string;
}

interface ReleaseInfo {
  tag_name: string;
  published_at?: string;
  html_url?: string;
  assets?: ReleaseAsset[];
}

const RELEASE_URL =
  "https://api.github.com/repos/Lumorix-studios/Neo/releases/latest";
const RELEASES_PAGE = "https://github.com/Lumorix-studios/Neo/releases";

function formatSize(bytes: number) {
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

export default function Downloads() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [release, setRelease] = useState<ReleaseInfo | null>(null);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const response = await fetch(RELEASE_URL);
        if (!response.ok) throw new Error("Could not reach the releases service.");
        const data = (await response.json()) as ReleaseInfo;
        if (!cancelled) setRelease(data);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Could not load release info.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const assets = release?.assets ?? [];

  return (
    <main className="min-h-[calc(100vh-4rem)] text-white">
      <div className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">

        {/* Header */}
        <div className="mb-10">
          <p className="mb-2 text-sm font-medium tracking-wide text-zinc-500 uppercase">
            ProjectNeo
          </p>

          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Downloads
          </h1>

          <p className="mt-3 max-w-xl text-base text-zinc-400 sm:text-lg">
            Get the latest stable release of Neo for your platform.
          </p>
        </div>

        {/* Download Card */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

            {/* Info */}
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-medium">
                  Neo{version ? ` ${version}` : ""}
                </h2>

                
              </div>

              <p className="mt-1.5 text-sm text-zinc-500">
                Latest stable release
              </p>
            </div>

            {/* Controls */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <label htmlFor="platform" className="sr-only">
                Choose your platform
              </label>
              <select
                id="platform"
                value={platform}
                onChange={(e) =>
                  setPlatform(e.target.value as Platform)
                }
                className="rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-sm text-white outline-none transition focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500"
              >
                {platforms.map((p) => (
                  <option key={p.value} value={p.value}>
                    {p.label}
                  </option>
                ))}
              </select>

              <button
                onClick={handleDownload}
                disabled={loading}
                aria-live="polite"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-zinc-950 transition hover:bg-zinc-200 disabled:opacity-60"
              >
                {loading ? (
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
                    <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="opacity-75" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                )}
                {loading ? "Fetching…" : "Download"}
              </button>
            </div>
          </div>

          {error && (
            <p role="alert" className="mt-4 rounded-lg border border-red-900/60 bg-red-950/40 px-4 py-3 text-sm text-red-200">
              {error}{" "}
              <a
                href="https://github.com/Lumorix-studios/Neo/releases"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 hover:text-red-100"
              >
                Open the releases page
              </a>
              .
            </p>
          )}
        </div>

        {/* System requirements */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5">
          
            <h3 className="text-sm font-medium text-white">Windows</h3>
            <p className="mt-1.5 text-xs text-zinc-500">
              Windows 10 or later · 64-bit · ~7 MB
            </p>
          </div>
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5">
            <h3 className="text-sm font-medium text-white">Linux</h3>
            <p className="mt-1.5 text-xs text-zinc-500">
              Ubuntu 20.04+ / Fedora 34+ · 64-bit · ~10 MB
            </p>
          </div>
        </div>
        <div className = " rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4 m-5">
          <p className="text-sm font-medium text-white">
            Prefer to browse every build yourself?{" "}
            
            <a
              href="https://github.com/Lumorix-studios/Neo/releases"
              className="ml-1 text-blue-400 hover:text-blue-300 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit the releases page
            </a>
          </p>

        </div>
      </div>
      </div>
    </main>
  );
}
