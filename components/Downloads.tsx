
import { useEffect, useMemo, useState } from "react";
import {
  IoLogoApple,
  IoLogoTux,
  IoLogoWindows,
  IoDownloadOutline,
  IoOpenOutline,
  IoInformationCircleOutline,
} from "react-icons/io5";

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

function parseVersion(tag: string) {
  const match = tag.match(/(\d+\.\d+\.\d+)/);
  return match ? match[1] : tag.replace(/^release[_v-]*/i, "");
}

function findAsset(assets: ReleaseAsset[], ext: string) {
  return assets.find((a) => a.name.toLowerCase().endsWith(ext));
}

function PlatformIcon({ os }: { os: OsKey }) {
  if (os === "windows") {
    return <IoLogoWindows className="h-5 w-5" />;
  }

  if (os === "macos") {
    return <IoLogoApple className="h-5 w-5" />;
  }

  return <IoLogoTux className="h-5 w-5" />;
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
        const response = await fetch(RELEASE_URL, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Could not reach the releases service.");
        }

        const data = (await response.json()) as ReleaseInfo;

        if (!cancelled) {
          setRelease(data);
        }
      } catch (err) {
        if (
          !cancelled &&
          !(err instanceof DOMException && err.name === "AbortError")
        ) {
          setError(
            err instanceof Error
              ? err.message
              : "Could not load release info."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
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
    os === "windows"
      ? exe ?? msi
      : os === "macos"
        ? dmg
        : os === "linux"
          ? deb ?? rpm
          : exe ?? msi ?? dmg ?? deb ?? rpm;

  return (
    <main className="min-h-[calc(100vh-4rem)] text-white">
      <div className="px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="mx-auto max-w-5xl">

          {/* Header */}
          <header className="mb-8 border-b border-white/20 pb-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                {/* <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-white/50">
                  NEO / DOWNLOADS
                </p> */}

                <h1 className="text-4xl font-medium tracking-tight sm:text-5xl">
                  Downloads
                </h1>
                {/*lazy way of spacing it lol*/}
                <span className = "m-4"></span>

                {/* <p className="mt-3 text-sm text-white/60">
                  Get the latest Neo build for your platform.
                </p> */}
              </div>

              {version && (
                <div className="font-mono text-xs text-white/50">
                  v{version}
                  {date && ` · ${date}`}
                </div>
              )}
            </div>
          </header>

          {/* Recommended */}
          <section className="border border-white/30 bg-black/50">
            <div className="p-6 sm:p-7">
              {loading ? (
                <div className="font-mono text-sm text-white/60">
                  Loading...
                </div>
              ) : error ? (
                <div>
                  <p className="text-sm text-white/70">{error}</p>

                  <a
                    href={RELEASES_PAGE}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 text-sm text-white underline underline-offset-4 hover:text-white/70"
                  >
                    Open releases
                    <IoOpenOutline />
                  </a>
                </div>
              ) : primary ? (
                <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 items-center justify-center border border-white/25 bg-black/60">
                      <PlatformIcon os={os} />
                    </div>

                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-widest text-white/40">
                        Recommended build
                      </p>

                      <h2 className="mt-1 text-lg font-medium">
                        Neo v{version}
                      </h2>

                      <p className="mt-1 text-sm text-white/55">
                        {OS_LABEL[os]} · {primary.name} ·{" "}
                        {formatSize(primary.size)}
                      </p>
                    </div>
                  </div>

                  <a
                    href={primary.browser_download_url}
                    className="inline-flex h-11 items-center justify-center gap-2 bg-white px-6 text-sm font-medium text-black transition hover:bg-white/80"
                  >
                    Download
                    <IoDownloadOutline className="h-4 w-4" />
                  </a>
                </div>
              ) : (
                <div>
                  <h2 className="text-lg font-medium">
                    Neo {version ? `v${version}` : ""}
                  </h2>

                  <p className="mt-2 text-sm text-white/55">
                    No prebuilt package for {OS_LABEL[os]} is available.
                  </p>

                  <div className="mt-4 flex gap-5">
                    <a
                      href={RELEASES_PAGE}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-white underline underline-offset-4"
                    >
                      View releases
                    </a>

                    <a
                      href={REPO_PAGE}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-white/60 underline underline-offset-4"
                    >
                      Build from source
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* {exe && msi && (
              <div className="border-t border-white/15 bg-white/[0.03] px-6 py-4">
                <p className="text-xs text-white/50">
                  Alternate Windows installer:{" "}
                  <a
                    href={msi.browser_download_url}
                    className="text-white/80 underline underline-offset-4 hover:text-white"
                  >
                    {msi.name}
                  </a>{" "}
                  ({formatSize(msi.size)})
                </p>
              </div>
            )} */}
          </section>

          {/* Builds */}
          <section className="mt-10">
            <div className="mb-5">
              <h2 className="text-lg font-medium">
                Available builds
              </h2>

              {/* <p className="mt-1 text-sm text-white/50">
                Installers included with the latest release.
              </p> */}
            </div>

            <div className="grid gap-6 md:grid-cols-2">

              {/* Windows */}
              <section className="border border-white/25 bg-black/40">
                <div className="flex items-center gap-3 border-b border-white/20 px-5 py-4">
                  <IoLogoWindows className="h-5 w-5 text-white/80" />

                  <div>
                    <h3 className="text-sm font-medium">
                      Windows
                    </h3>

                    <p className="mt-0.5 text-xs text-white/45">
                      Windows 10 or later · 64-bit
                    </p>
                  </div>
                </div>

                <div className="px-5">
                  {exe && (
                    <a
                      href={exe.browser_download_url}
                      className="group flex items-center justify-between border-b border-white/10 py-4"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-sm text-white/80 group-hover:text-white">
                          {exe.name}
                        </p>

                        <p className="mt-1 font-mono text-[11px] text-white/40">
                          {formatSize(exe.size)}
                        </p>
                      </div>

                      <IoDownloadOutline className="ml-4 h-4 w-4 shrink-0 text-white/40 group-hover:text-white" />
                    </a>
                  )}

                  {msi && (
                    <a
                      href={msi.browser_download_url}
                      className="group flex items-center justify-between border-b border-white/10 py-4"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-sm text-white/80 group-hover:text-white">
                          {msi.name}
                        </p>

                        <p className="mt-1 font-mono text-[11px] text-white/40">
                          {formatSize(msi.size)}
                        </p>
                      </div>

                      <IoDownloadOutline className="ml-4 h-4 w-4 shrink-0 text-white/40 group-hover:text-white" />
                    </a>
                  )}

                  {!exe && !msi && (
                    <p className="py-5 text-sm text-white/40">
                      No Windows installer available.
                    </p>
                  )}
                </div>
              </section>

              {/* Linux / macOS */}
              <section className="border border-white/25 bg-black/40">
                <div className="flex items-center gap-3 border-b border-white/20 px-5 py-4">
                  {dmg ? (
                    <IoLogoApple className="h-5 w-5 text-white/80" />
                  ) : (
                    <IoLogoTux className="h-5 w-5 text-white/80" />
                  )}

                  <div>
                    <h3 className="text-sm font-medium">
                      Linux & macOS
                    </h3>

                    <p className="mt-0.5 text-xs text-white/45">
                      Available release packages
                    </p>
                  </div>
                </div>

                <div className="px-5">
                  {deb && (
                    <a
                      href={deb.browser_download_url}
                      className="group flex items-center justify-between border-b border-white/10 py-4"
                    >
                      <div>
                        <p className="text-sm text-white/80 group-hover:text-white">
                          {deb.name}
                        </p>

                        <p className="mt-1 font-mono text-[11px] text-white/40">
                          {formatSize(deb.size)}
                        </p>
                      </div>

                      <IoDownloadOutline className="h-4 w-4 text-white/40 group-hover:text-white" />
                    </a>
                  )}

                  {rpm && (
                    <a
                      href={rpm.browser_download_url}
                      className="group flex items-center justify-between border-b border-white/10 py-4"
                    >
                      <div>
                        <p className="text-sm text-white/80 group-hover:text-white">
                          {rpm.name}
                        </p>

                        <p className="mt-1 font-mono text-[11px] text-white/40">
                          {formatSize(rpm.size)}
                        </p>
                      </div>

                      <IoDownloadOutline className="h-4 w-4 text-white/40 group-hover:text-white" />
                    </a>
                  )}

                  {dmg && (
                    <a
                      href={dmg.browser_download_url}
                      className="group flex items-center justify-between border-b border-white/10 py-4"
                    >
                      <div>
                        <p className="text-sm text-white/80 group-hover:text-white">
                          {dmg.name}
                        </p>

                        <p className="mt-1 font-mono text-[11px] text-white/40">
                          {formatSize(dmg.size)}
                        </p>
                      </div>

                      <IoDownloadOutline className="h-4 w-4 text-white/40 group-hover:text-white" />
                    </a>
                  )}

                  {!deb && !rpm && !dmg && (
                    <a
                      href={REPO_PAGE}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between py-5 text-sm text-white/55 hover:text-white"
                    >
                      Build from source on GitHub
                      <IoOpenOutline className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </section>
            </div>
          </section>

          {/* Footer */}
          <footer className="mt-8 flex flex-col gap-4 pt-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm text-white/50">
            Looking for an older build or release notes?
          </p>

          <a
            href={RELEASES_PAGE}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-2 text-sm text-white hover:text-white/70"
          >
            Browse all releases
            <IoOpenOutline />
          </a>
        </div>

        <div className="relative max-w-md sm:text-right">
          <button
            type="button"
            className="inline-flex items-center gap-2 text-xs text-white/40 transition hover:text-white/70"
            onClick={(e) => {
              const popover = e.currentTarget.nextElementSibling;
              popover?.classList.toggle("hidden");
            }}
          >
            Important information !
            <IoInformationCircleOutline className="h-4 w-4" />
          </button>

          <div className="absolute right-0 z-50 mt-3 hidden w-80 border border-white/20 bg-zinc-950 p-4 text-left shadow-xl">
            <p className="text-xs font-medium text-white">
              About builds
            </p>

            <p className="mt-2 text-xs leading-5 text-white/50">
              Neo is currently in beta and Windows builds are unsigned, so
              Microsoft Defender SmartScreen may display a warning.
            </p>

            <p className="mt-2 text-xs leading-5 text-white/50">
              Only download Neo from this page or the official Lumorix-studios
              GitHub repository. Never trust third-party builds or installers.
              Verify the source before installing.
            </p>
          </div>
        </div>
      </footer>
              </div>
            </div>
          </main>
        
      );
      }