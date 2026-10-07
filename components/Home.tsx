import { Link } from "react-router-dom";
import RotatingText from "./RotatingText";
import { IoLogoGithub } from "react-icons/io5";

const ORG_URL = "https://github.com/Lumorix-studios";

type Product = {
  name: string;
  description: string;
  href: string;
  external?: boolean;
};

// Every public repository is listed here. Add an entry to ship a new product
// to the lineup — Struct is the only one with an on-site product page so far.
const products: Product[] = [
  {
    name: "Struct",
    description:
      "A lightweight desktop IDE with a built-in agent, for Windows and Linux.",
    href: "/products/struct",
  },
  // {
  //   name: "Lumorix Studios HQ",
  //   description:
  //     "The site you're on documentation, downloads, and everything else we publish.",
  //   href: "https://github.com/Lumorix-studios/LumorixStudiosHq",
  //   external: true,
  // },
  // {
  //   name: "TeamDiscussions",
  //   description:
  //     "Where members talk through projects, plans, and general stuff in the open.",
  //   href: "https://github.com/Lumorix-studios/TeamDiscussions",
  //   external: true,
  // },
  // {
  //   name: ".github",
  //   description:
  //     "The organization profile and the guidelines shared by every project.",
  //   href: "https://github.com/Lumorix-studios/.github",
  //   external: true,
  // },
];

// const principles = [
//   {
//     n: "1",
//     title: "Open source by default",
//     body: "Every repository is public. Source, releases, and issue tracking live on GitHub, so anyone can read how a thing works or send a fix.",
//   },
//   {
//     n: "2",
//     title: "Lightweight by design",
//     body: "Tools are built to stay fast on modest hardware with native backends instead of heavyweight runtimes, and interfaces that stay out of the way.",
//   },
  
// ];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section>
        <div className="mx-auto max-w-4xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="max-w-3xl">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
              Open source git org
            </p>

            <h1 className="text-5xl font-semibold tracking-[-0.03em] text-white sm:text-6xl lg:text-7xl">
              Lumorix Studios
            </h1>

            <div className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-lg text-zinc-400 sm:text-xl">
              <span></span>

              <RotatingText
                texts={[
                  "developer tools",
                  "Desktop apps",
                  "Completely free",
                  "open source",
                ]}
                mainClassName="inline-flex font-medium text-white"
                staggerFrom="last"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden"
                transition={{
                  type: "spring",
                  damping: 30,
                  stiffness: 400,
                }}
                rotationInterval={3000}
                splitBy="characters"
                auto
                loop
              />
            </div>

            <p className="mt-6 max-w-xl text-base leading-7 text-zinc-400 sm:text-lg">
              {/*A technology-focused team developing modern applications,
              developer tools, and experimental projects at the intersection
              of software engineering, AI, and user-focused design.*/}
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href="#products"
                className="rounded-md bg-white px-5 py-2.5 text-sm font-medium text-zinc-950 transition hover:bg-zinc-200"
              >
                Explore products
              </a>

              <a
                href={ORG_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-white/20 px-5 py-2.5 text-sm font-medium text-white transition hover:border-white/40 hover:bg-white/5"
              >
                <IoLogoGithub className="mr-2 inline-block" />
                GitHub organization
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="scroll-mt-24">
        <div className="mx-auto max-w-4xl px-4 py-24 sm:px-6 sm:py-28 lg:px-8">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-600">
            
          </p>

          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Projects
          </h2>

          
          <div className = "">
          <ul className="mt-12 space-y-10">
            {products.map((p) => {
              const inner = (
                <>
                  <span className="block text-lg font-medium text-white transition group-hover:text-zinc-300">
                    {p.name}
                  </span>

                  <span className="mt-1 block max-w-2xl text-sm leading-6 text-zinc-400">
                    {p.description}
                  </span>

                  <span className="mt-2 inline-block text-sm text-zinc-500 transition group-hover:text-blue-600">
                    {p.external ? "View repository" : "View product"} →
                  </span>
                </>
              );

              return (
                <li key={p.name}>
                  {p.external ? (
                    <a
                      href={p.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block"
                    >
                      {inner}
                    </a>
                  ) : (
                    <Link to={p.href} className="group block">
                      {inner}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
          </div>
        </div>
      </section>
      

      {/* How we work */}
      <section>
        <div className="mx-auto max-w-4xl px-4 py-24 sm:px-6 sm:py-28 lg:px-8">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-600">
            
          </p>

          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          
          </h2>

         

        </div>
      </section>

      {/* Closing call to action */}
      <section>
        <div className="mx-auto max-w-4xl px-4 pb-28 pt-4 sm:px-6 sm:pb-32 lg:px-8">
          <h2 className="max-w-2xl text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Everything we ship is free and open source.
          </h2>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={ORG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-white px-5 py-2.5 text-sm font-medium text-zinc-950 transition hover:bg-zinc-200"
            >
              <IoLogoGithub className="mr-2 inline-block" />
              View on GitHub
            </a>

            <Link
              to="/about"
              className="rounded-md border border-white/20 px-5 py-2.5 text-sm font-medium text-white transition hover:border-white/40 hover:bg-white/5"
            >
              About the studio
            </Link>

            <Link
              to="/contact"
              className="rounded-md border border-white/20 px-5 py-2.5 text-sm font-medium text-white transition hover:border-white/40 hover:bg-white/5"
            >
              Get in touch
            </Link>
          </div>
        </div>
      </section>

    </>
  );
}
