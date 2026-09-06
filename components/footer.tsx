import React from "react";
import { Link } from "react-router-dom";
import { FaDiscord, FaGithub, FaXTwitter } from "react-icons/fa6";
import icon from "../src/assets/icon.png";

const productLinks = [
  { label: "Downloads", href: "/downloads" },
  { label: "Documentation", href: "/Documentation" },
  { label: "About Neo", href: "/about" },
];

const resourceLinks = [
  { label: "Contact", href: "/contact" },
  { label: "Privacy Policy", href: "/Privacypolicyandterms" },
  { label: "Terms of Service", href: "/Privacypolicyandterms" },
  {
    label: "GitHub Repository",
    href: "https://github.com/Lumorix-studios/Neo",
  },
];

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/Lumorix-studios",
    Icon: FaGithub,
  },
  {
    label: "Discord",
    href: "https://discord.gg/nMfbNrebs",
    Icon: FaDiscord,
  },
  // {
  //   label: "X (Twitter)",
  //   href: "https://x.com",
  //   Icon: FaXTwitter,
  // },
];

const Footer: React.FC = () => (
  <footer className="border-t border-zinc-800/60 bg-zinc-950">
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div className="lg:col-span-2">
          <Link
            to="/"
            className="flex items-center gap-2.5 text-base font-semibold tracking-tight text-white sm:text-lg"
          >
            <img
              src={icon}
              alt="Lumorix Studios"
              className="h-7 w-7 rounded-md"
            />
            <span>Lumorix Studios</span>
          </Link>

          <p className="mt-4 max-w-sm text-sm leading-6 text-zinc-500">
            Home of ProjectNeo — a lightweight desktop IDE with agentic coding
            capabilities, built to run on any hardware.
          </p>

          <div className="mt-5 flex gap-3">
            {socials.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                title={label}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-800 text-zinc-400 transition hover:border-zinc-600 hover:bg-zinc-800/60 hover:text-white"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Product */}
        <div>
          <h3 className="text-sm font-semibold text-white">Product</h3>
          <ul className="mt-4 space-y-2.5">
            {productLinks.map(({ label, href }) => (
              <li key={label}>
                <Link
                  to={href}
                  className="text-sm text-zinc-500 transition-colors hover:text-zinc-200"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-sm font-semibold text-white">Resources</h3>
          <ul className="mt-4 space-y-2.5">
            {resourceLinks.map(({ label, href }) =>
              href.startsWith("http") ? (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-zinc-500 transition-colors hover:text-zinc-200"
                  >
                    {label}
                  </a>
                </li>
              ) : (
                /* Internal links go through the router so the GitHub Pages
                   basename (e.g. /LumorixStudiosHq/) is applied automatically */
                <li key={label}>
                  <Link
                    to={href}
                    className="text-sm text-zinc-500 transition-colors hover:text-zinc-200"
                  >
                    {label}
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-zinc-800/60 pt-6 text-xs text-zinc-600 sm:flex-row">
        <span>
          © {new Date().getFullYear()} Lumorix Studios. All rights reserved.
        </span>
        <span>Built with React, TypeScript &amp; Rust (Tauri)</span>
      </div>
    </div>
  </footer>
);

export default Footer;