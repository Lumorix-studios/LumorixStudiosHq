import { Link } from "react-router-dom";
import { IoLogoGithub } from "react-icons/io5";
import structPreview from "../src/assets/newtest.png";

const ORG_URL = "https://github.com/Lumorix-studios";
const STRUCT_URL = "https://github.com/Lumorix-studios/Struct";

export default function Home() {
  return (
    <>
      <section>
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:px-8 lg:py-24">
          <div>
            <p className="mb-5 text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
              Independent software studio
            </p>

            <h1 className="max-w-xl text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
              Practical software, shared openly.
            </h1>

            <p className="mt-6 max-w-lg text-base leading-7 text-zinc-400 sm:text-lg sm:leading-8">
              Lumorix Studios builds focused tools for people who make things.
              Start with Struct, a lightweight desktop IDE with a built-in
              coding agent.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
              <Link
                to="/products/struct"
                className="rounded-md bg-white px-5 py-3 font-medium text-zinc-950 transition hover:bg-zinc-200"
              >
                Explore Struct
              </Link>
              <a
                href={ORG_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 transition hover:text-white"
              >
                <IoLogoGithub className="mr-2 inline-block" />
                GitHub
              </a>
            </div>

            <p className="mt-5 text-sm text-zinc-500">
              Available for Windows and Linux
            </p>
          </div>

          <Link
            to="/products/struct"
            aria-label="See the Struct product page"
            className="group block"
          >
            <img
              src={structPreview}
              alt="Struct desktop IDE with its code editor and agent panel"
              className="block h-auto w-full rounded-lg"
            />
            <p className="mt-3 text-sm text-zinc-500 transition group-hover:text-zinc-300">
              Struct <span aria-hidden="true">↗</span>
            </p>
          </Link>
        </div>
      </section>

      <section id="products" className="scroll-mt-24">
        <div className="mx-auto max-w-6xl px-4 pb-16 pt-8 sm:px-6 sm:pb-20 sm:pt-10 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
              The work
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Built to be useful.
            </h2>
            <p className="mt-4 text-sm leading-6 text-zinc-400 sm:text-base">
              Struct is a lightweight desktop IDE with an agent that works in
              your project. Review changes before accepting them, use your
              preferred provider, and keep your editor and terminal together.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm">
            <Link
              to="/products/struct"
              className="font-medium text-white transition hover:text-zinc-300"
            >
              Product details <span aria-hidden="true">→</span>
            </Link>
            <Link
              to="/downloads"
              className="text-zinc-400 transition hover:text-white"
            >
              Download
            </Link>
            <Link
              to="/documentation"
              className="text-zinc-400 transition hover:text-white"
            >
              Documentation
            </Link>
            <a
              href={STRUCT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 transition hover:text-white"
            >
              Source code
            </a>
            <Link
              to="/about"
              className="text-zinc-400 transition hover:text-white"
            >
              About the studio
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
