import React from "react";

const links = [
  { label: "Documentation", href: "#" },
  { label: "GitHub", href: "#" },
  { label: "Privacy", href: "/Privacypolicyandterms" },
  { label: "Terms", href: "/Privacypolicyandterms" },
];

const Footer: React.FC = () => (
  <footer className="border-t border-zinc-800 bg-zinc-900">
    <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-5 text-xs text-zinc-500 sm:flex-row sm:justify-between sm:px-6 sm:py-6 sm:text-sm lg:px-8">
      <span className="font-medium text-zinc-300">
        Lumorix Studios
      </span>

      <nav className="flex flex-wrap justify-center gap-x-5 gap-y-2 sm:gap-x-6">
        {links.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            className="transition-colors hover:text-zinc-200"
          >
            {label}
          </a>
        ))}
      </nav>

      <span className="text-center sm:text-right">
        © {new Date().getFullYear()} Lumorix Studios
      </span>
    </div>
  </footer>
);

export default Footer;