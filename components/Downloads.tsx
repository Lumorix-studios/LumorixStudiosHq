
import { useState } from "react";

const downloadLatest = async (platform: "windows" | "linux" | "linux1") => {
  try {
    const response = await fetch(
      "https://api.github.com/repos/Lumorix-studios/Neo/releases/latest"
    );

    if (!response.ok) {
      throw new Error("Failed to fetch latest release");
    }

    const release = await response.json();

    const asset = release.assets.find(
      (asset: { name: string; browser_download_url: string }) => {
        if (platform === "windows") {
          return asset.name.endsWith(".exe");
        }

        if (platform === "linux") {
          return asset.name.endsWith(".deb");
        }
        if (platform == "linux1") {
          return asset.name.endsWith(".rpm")
        }

        return false;
      }
    );

    if (!asset) {
      throw new Error(`${platform} download not found`);
    }

    window.location.href = asset.browser_download_url;
  } catch (error) {
    console.error(error);
  }
};

export default function Downloads() {
  const [platform, setPlatform] = useState<"windows" | "linux">("windows");

  return (
    <main className="min-h-screen bg-black px-6 py-16 text-white">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-12">
          <p className="mb-3 text-sm font-medium text-zinc-400">
            Project-Neo
          </p>

          <h1 className="text-4xl font-semibold tracking-tight">
            Downloads
          </h1>

          <p className="mt-3 max-w-2xl text-zinc-400">
            Download the latest version of Neo for your platform.
          </p>
        </div>

        {/* Download Card */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

            {/* Info */}
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-medium">
                  Neo
                </h2>

                <span className="rounded-full border border-zinc-700 bg-zinc-900 px-2.5 py-1 text-xs text-zinc-300">
                  v1.0.5
                </span>
              </div>

              <p className="mt-2 text-sm text-zinc-500">
                Latest stable release
              </p>
            </div>

            {/* Controls */}
            <div className="flex flex-col gap-2 sm:flex-row">

              <select
                value={platform}
                onChange={(e) =>
                  setPlatform(e.target.value as "windows" | "linux")
                }
                className="rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-sm text-white outline-none transition focus:border-zinc-500"
              >
                <option value="windows">
                  Windows
                </option>

                <option value="linux">
                  Linux
                </option>
              </select>

              <button
                onClick={() => downloadLatest(platform)}
                className="rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-black transition hover:bg-zinc-200"
              >
                Download
              </button>

            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
