
import icon from "../src/assets/icon.png";

const navigation = [
  { label: "Home", href: "/" },
  { label: "Downloads", href: "/Downloads" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a
          href="/"
          className="flex items-center gap-2 text-base font-semibold tracking-tight text-zinc-950 sm:text-xl"
        >
          <img
            src={icon}
            alt="Lumorix Studios"
            className="h-7 w-7"
          />
          <span>Lumorix Studios</span>
        </a>

        <div className="hidden items-center gap-6 md:flex lg:gap-8">
          {navigation.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-950"
            >
              {label}
            </a>
          ))}

          <a
            href="/contact"
            className="rounded-lg bg-zinc-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800"
          >
            Get Started
          </a>
        </div>

        <a
          href="/contact"
          className="rounded-lg bg-zinc-950 px-3 py-2 text-xs font-medium text-white transition hover:bg-zinc-800 sm:px-4 sm:text-sm md:hidden"
        >
          Get Started
        </a>
      </div>
    </nav>
  );
}
