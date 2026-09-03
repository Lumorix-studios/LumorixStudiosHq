
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import icon from "../src/assets/icon.png";

const navigation = [
  { label: "Home", href: "/" },
  { label: "Downloads", href: "/downloads" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label : "Documentation", href : "/Documentation"},
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  // location.pathname is relative to the router basename (e.g. "/downloads")
  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-zinc-800/60 bg-zinc-950/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5 text-base font-semibold tracking-tight text-white sm:text-xl"
        >
          <img
            src={icon}
            alt="Lumorix Studios"
            className="h-7 w-7 rounded-md"
          />
          <span>Lumorix Studios</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 md:flex">
          {navigation.map(({ label, href }) => (
            <Link
              key={label}
              to={href}
              className={`rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                isActive(href)
                  ? "bg-zinc-800/80 text-white"
                  : "text-zinc-400 hover:bg-zinc-800/50 hover:text-white"
              }`}
            >
              {label}
            </Link>
          ))}

          <a
            href="https://github.com/Lumorix-studios/Neo"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-zinc-950 transition hover:bg-zinc-200"
          >
            GitHub
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setMobileOpen((o) => !o)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-zinc-400 transition hover:bg-zinc-800 hover:text-white md:hidden"
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-zinc-800 bg-zinc-950 px-4 pb-4 pt-2 md:hidden">
          {navigation.map(({ label, href }) => (
            <Link
              key={label}
              to={href}
              onClick={() => setMobileOpen(false)}
              className={`block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive(href)
                  ? "bg-zinc-800/80 text-white"
                  : "text-zinc-400 hover:bg-zinc-800/50 hover:text-white"
              }`}
            >
              {label}
            </Link>
          ))}
          <a
            href="https://github.com/Lumorix-studios/Neo"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 block rounded-lg bg-white px-3 py-2.5 text-center text-sm font-medium text-zinc-950 transition hover:bg-zinc-200"
          >
            GitHub
          </a>
        </div>
      )}
    </nav>
  );
}
