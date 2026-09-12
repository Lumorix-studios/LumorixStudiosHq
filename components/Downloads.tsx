
import { useEffect, useMemo, useState } from "react";

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
const REPO_PAGE = "https://github.com/Lumorix-studios/Neo";

type OsKey = "windows" | "linux" | "macos" | "other";

function detectOs(): OsKey {
  if (typeof navigator === "undefined") return "other";
  const ua = navigator.userAgent.toLowerCase();
  if (ua.includes("win")) return "windows";
  if (ua.includes("linux")) return "linux";
  if (ua.includes("mac")) return "macos";
  return "other";
}

const OS_LABEL: Record<OsKey, string> = {
  windows: "Windows",
  linux: "Linux",
  macos: "macOS",
  other: "your platform",
};

function formatSize(bytes: number) {
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

function formatDate(iso?: string) {
  if (!iso) return null;
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return null;
  }
}

/** Pull a human version (e.g. "1.0.7") out of a tag like "Release_v_1.0.7-revamped". */
function parseVersion(tag: string) {
  const match = tag.match(/(\d+\.\d+\.\d+)/);
  return match ? match[1] : tag.replace(/^release[_v-]*/i, "");
}

function findAsset(assets: ReleaseAsset[], ext: string) {
  return assets.find((a) => a.name.toLowerCase().endsWith(ext));
}

export default function Downloads() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [release, setRelease] = useState<ReleaseInfo | null>(null);
  const os = useMemo(() => detectOs(), []);

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();
    const load = async () => {
      try {
        const response = await fetch(RELEASE_URL, { signal: controller.signal });
        if (!response.ok) throw new Error("Could not reach the releases service.");
        const data = (await response.json()) as ReleaseInfo;
        if (!cancelled) setRelease(data);
      } catch (err) {
        if (!cancelled && !(err instanceof DOMException && err.name === "AbortError")) {
          setError(err instanceof Error ? err.message : "Could not load release info.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
      controller.abort();
    };
  }, []);

  const assets = release?.assets ?? [];
  const version = release ? parseVersion(release.tag_name) : null;
  const date = formatDate(release?.published_at);

  const exe = findAsset(assets, ".exe");
  const msi = findAsset(assets, ".msi");
  const deb = findAsset(assets, ".deb");
  const rpm = findAsset(assets, ".rpm");
  const dmg = findAsset(assets, ".dmg");

  const primary =
    (os === "windows" ? exe ?? msi : os === "macos" ? dmg : deb ?? rpm) ?? null;
  const hasPrimaryForOs = primary !== null;

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
              Free while in beta. No account needed.
              {version && (
                <span className="text-zinc-500">
                  {" "}
                  Latest: v{version}
                  {date ? `, released ${date}` : ""}.
                </span>
              )}
            </p>
          </div>

          {/* Primary download */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 sm:p-8">
            {loading ? (
              <div aria-live="polite" aria-busy="true">
                <p className="text-sm text-zinc-500">Fetching the latest release…</p>
              </div>
            ) : error ? (
              <div role="alert">
                <p className="text-sm text-red-200">
                  {error}{" "}
                  <a
                    href={RELEASES_PAGE}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4 hover:text-red-100"
                  >
                    Open the releases page
                  </a>{" "}
                  to grab a build directly.
                </p>
              </div>
            ) : hasPrimaryForOs && primary ? (
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-xl font-medium">
                    Neo {version ? `v${version}` : ""}
                  </h2>
                  <p className="mt-1.5 text-sm text-zinc-500">
                    {primary.name} · {formatSize(primary.size)}
                  </p>
                </div>
                <a
                  href={primary.browser_download_url}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-zinc-950 transition hover:bg-zinc-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-4 w-4"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                    />
                  </svg>
                  Download for {OS_LABEL[os]}
                </a>
              </div>
            ) : (
              <div>
                <h2 className="text-xl font-medium">Neo {version ? `v${version}` : ""}</h2>
                <p className="mt-1.5 text-sm text-zinc-400">
                  No prebuilt package for {OS_LABEL[os]} in this release yet. Check the{" "}
                  <a
                    href={RELEASES_PAGE}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white underline decoration-zinc-600 underline-offset-4 hover:decoration-zinc-300"
                  >
                    releases page
                  </a>{" "}
                  or{" "}
                  <a
                    href={REPO_PAGE}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white underline decoration-zinc-600 underline-offset-4 hover:decoration-zinc-300"
                  >
                    build from source
                  </a>
                  .
                </p>
              </div>
            )}

            {/* Windows alternates */}
            {exe && msi && (
              <div className="mt-5 border-t border-zinc-800 pt-4">
                <p className="text-sm text-zinc-400">
                  Prefer the MSI?{" "}
                  <a
                    href={msi.browser_download_url}
                    className="text-white underline decoration-zinc-600 underline-offset-4 hover:decoration-zinc-300"
                  >
                    {msi.name}
                  </a>{" "}
                  <span className="text-zinc-500">({formatSize(msi.size)})</span>
                </p>
              </div>
            )}
          </div>

          {/* Platform details */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5">
              <h3 className="text-sm font-medium text-white">Windows</h3>
              <p className="mt-1.5 text-xs leading-5 text-zinc-500">
                Windows 10 or later · 64-bit
              </p>
              <ul className="mt-3 space-y-1.5 text-xs">
                {exe ? (
                  <li>
                    <a
                      href={exe.browser_download_url}
                      className="text-zinc-300 underline decoration-zinc-700 underline-offset-4 transition hover:text-white hover:decoration-zinc-400"
                    >
                      {exe.name}
                    </a>{" "}
                    <span className="text-zinc-500">({formatSize(exe.size)})</span>
                  </li>
                ) : (
                  <li className="text-zinc-500">Installer not published in this release.</li>
                )}
                {msi && (
                  <li>
                    <a
                      href={msi.browser_download_url}
                      className="text-zinc-300 underline decoration-zinc-700 underline-offset-4 transition hover:text-white hover:decoration-zinc-400"
                    >
                      {msi.name}
                    </a>{" "}
                    <span className="text-zinc-500">({formatSize(msi.size)})</span>
                  </li>
                )}
              </ul>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5">
              <h3 className="text-sm font-medium text-white">Linux &amp; macOS</h3>
              <p className="mt-1.5 text-xs leading-5 text-zinc-500">
                {deb || rpm || dmg
                  ? "Packages from the current release:"
                  : "No prebuilt packages in this release yet."}
              </p>
              <ul className="mt-3 space-y-1.5 text-xs">
                {[deb, rpm, dmg]
                  .filter((a): a is ReleaseAsset => a != null)
                  .map((a) => (
                    <li key={a.name}>
                      <a
                        href={a.browser_download_url}
                        className="text-zinc-300 underline decoration-zinc-700 underline-offset-4 transition hover:text-white hover:decoration-zinc-400"
                      >
                        {a.name}
                      </a>{" "}
                      <span className="text-zinc-500">({formatSize(a.size)})</span>
                    </li>
                  ))}
                {!deb && !rpm && !dmg && (
                  <li>
                    <a
                      href={REPO_PAGE}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-300 underline decoration-zinc-700 underline-offset-4 transition hover:text-white hover:decoration-zinc-400"
                    >
                      Build from source on GitHub
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>

          {/* Footer note */}
          <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5">
            <p className="text-sm leading-6 text-zinc-400">
              Looking for an older build or release notes?{" "}
              <a
                href={RELEASES_PAGE}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white underline decoration-zinc-600 underline-offset-4 transition hover:decoration-zinc-300"
              >
                Browse all releases on GitHub
              </a>
              .
            </p>
            <p className="mt-2 text-xs leading-5 text-zinc-500">
              Windows builds are unsigned while Neo is in beta, so SmartScreen may show a
              warning. Only download Neo from this page or the Lumorix-studios GitHub.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
