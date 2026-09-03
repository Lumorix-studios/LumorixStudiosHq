import React from "react";
import { Link } from "react-router-dom";

const links = [
  { label: "GitHub", href: "https://github.com/Lumorix-studios/Neo" },
  { label: "Privacy", href: "/Privacypolicyandterms" },
  { label: "Terms", href: "/Privacypolicyandterms" },
];

const Footer: React.FC = () => (
  <footer className="border-t border-zinc-800/60 bg-zinc-950">
    <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-6 text-xs text-zinc-500 sm:flex-row sm:justify-between sm:px-6 sm:py-8 sm:text-sm lg:px-8">
      <span className="font-medium text-zinc-300">
        Lumorix Studios
      </span>

      <nav className="flex flex-wrap justify-center gap-x-5 gap-y-2 sm:gap-x-6">
        {links.map(({ label, href }) =>
          href.startsWith("http") ? (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-zinc-200"
            >
              {label}
            </a>
          ) : (
            /* Internal links go through the router so the GitHub Pages
               basename (e.g. /LumorixStudiosHq/) is applied automatically */
            <Link
              key={label}
              to={href}
              className="transition-colors hover:text-zinc-200"
            >
              {label}
            </Link>
          )
        )}
      </nav>

      <span className="text-center sm:text-right">
        © {new Date().getFullYear()} Lumorix Studios
      </span>
    </div>
  </footer>
);

export default Footer;