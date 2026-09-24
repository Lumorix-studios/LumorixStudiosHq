import React from "react";
import { Link } from "react-router-dom";
import { FaDiscord, FaGithub } from "react-icons/fa6";
import { IoInformationCircleOutline } from "react-icons/io5";


const productLinks = [
  { label: "Downloads", href: "/downloads" },
  { label: "Documentation", href: "/documentation" },
  { label: "About Neo", href: "/about" },
];

const resourceLinks = [
  { label: "Contact", href: "/contact" },
  { label: "Privacy Policy", href: "/privacypolicyandterms" },
  { label: "Terms of Service", href: "/privacypolicyandterms" },
  {
    label: "GitHub Repository",
    href: "https://github.com/Lumorix-studios/Neo",
  },
];

const socials = [
  {
    label: "ProjectNeo repository",
    href: "https://github.com/Lumorix-studios/Neo",
    Icon: FaGithub,
  },
  {
    label: "Discord",
    href: "https://discord.gg/nMfbNrebs",
    Icon: FaDiscord,
  },
];

const Footer: React.FC = () => (
  <footer className="border-t border-zinc-800/60 bg-zinc-950">
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

      {/* Main footer */}
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">

        {/* Brand */}
        <div className="lg:col-span-2">
          <Link
            to="/"
            className="flex items-center gap-2.5 text-base font-semibold tracking-tight text-white sm:text-lg"
          >
            

            <span>Lumorix Studios</span>
          </Link>

          <p className="mt-4 max-w-sm text-sm leading-6 text-zinc-500">
            Home of ProjectNeo, a lightweight desktop IDE with agentic coding
            capabilities. Beta, Pricings are listed in the Pricings tab
          </p>

          {/* Socials */}
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
          <h3 className="text-sm font-semibold text-white">
            Product
          </h3>

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
          <h3 className="text-sm font-semibold text-white">
            Resources
          </h3>

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

        {/* Copyright */}
        <span>
          © {new Date().getFullYear()} Lumorix Studios. All rights reserved.
        </span>

        {/* Info */}
        <div className="relative">
          <button
            type="button"
            aria-label="Feedback information"
            className="inline-flex items-center justify-center text-white/40 transition hover:text-white/70"
            onClick={(e) => {
              const popover = e.currentTarget.nextElementSibling;

              popover?.classList.toggle("hidden");
            }}
          >
            
            <IoInformationCircleOutline className="h-5 w-5" />
          </button>

          {/* Info popover */}
          <div className="absolute right-0 bottom-full z-50 mb-3 hidden w-64 border border-white/20 bg-zinc-950 p-3 text-left shadow-xl">
            <p className="text-xs leading-5 text-white/50">
              If you want to share feedback, we'd appreciate it. Join our
              Discord server and share your thoughts in the feedback channel.
              We're always looking for ways to improve Neo and make it more
              user-friendly.
            </p>
          </div>
        </div>

      </div>
    </div>
  </footer>
);

export default Footer;