import { Link } from "react-router-dom";
import RotatingText from "./RotatingText";
import ScreenshotFrame from "./ScreenshotFrame";
import previewSss from "../src/assets/newtest.png";
import { IoLogoGithub } from "react-icons/io5";
import { IoLogoWindows } from "react-icons/io";
import { IoLogoTux} from "react-icons/io";
const steps = [
  {
    n: "1",
    title: "Install it",
    body: "Windows installer or Linux package from downloads. No account needed to get started.",
    href: "/downloads",
    link: "Downloads",
  },
  {
    n: "2",
    title: "Connect a model",
    body: "Paste an API key for a hosted provider, or point Neo at a local Ollama server. Keys stay in Neo's settings, not in your repository.",
    href: "/documentation#providers",
    link: "Provider setup",
  },
  {
    n: "3",
    title: "Open a folder",
    body: "Explorer, editor, terminal, and agent operate on the same project. Start with one small task.",
    href: "/documentation#first-workspace",
    link: "Open a workspace",
  },
];

// const capabilities = [
  // {
    // title: "Editor and terminal",
    // body: "A code editor and an integrated terminal working on the same project as the explorer.",
  // },
  // {
    // title: "Agent tools",
    // body: "Read, search, write, replace, rename, and delete inside the workspace you opened. Deletions ask first.",
  // },
  // {
    // title: "Review before you accept",
    // body: "The agent shows exactly what changed, so consequential edits are yours to keep or discard.",
  // },
  // {
    // title: "Any provider",
    // body: "Bring a hosted endpoint or run inference locally through Ollama. You control the model and the cost.",
  // },
  // {
    // title: "MCP connections",
    // body: "Connect compatible tools and services, reviewing what each server can read and change first.",
  // },
  // {
    // title: "Lightweight by design",
    // body: "A Rust backend via Tauri with a React and TypeScript frontend, so it stays usable on modest hardware.",
  // },
// ];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section>
        <div className="mx-auto max-w-4xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="max-w-3xl justify-content-center align-items-center">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
              
            </p>

            <h1 className="text-5xl font-semibold tracking-[-0.03em] text-white sm:text-6xl lg:text-7xl">
              Neo
            </h1>

            <div className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-lg text-zinc-400 sm:text-xl">
              <span>Built to be</span>

              <RotatingText
                texts={[
                  "Efficient",
                  "Easy to use",
                  "Lightweight",
                  "",
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
                rotationInterval={2000}
                splitBy="characters"
                auto
                loop
              />
            </div>

            <p className="mt-6 max-w-xl text-base leading-7 text-zinc-400 sm:text-lg">
              A lightweight agentic interface 
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                to="/downloads"
                className="rounded-md bg-white px-5 py-2.5 text-sm font-medium text-zinc-950 transition hover:bg-zinc-200"
              >
                Download Neo
              </Link>

              <a
                href="https://github.com/Lumorix-studios/Neo"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-white/20 px-5 py-2.5 text-sm font-medium text-white transition hover:border-white/40 hover:bg-white/5"
              >
                <IoLogoGithub className="inline-block mr-2" />
                GitHub
              </a>
            </div>

            
            
            // ... inside your component:
            <a 
              href="https://lumorix-studios.github.io/LumorixStudiosHq/downloads" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-blue-500"
            > 
              <p className="m-1 text-xs text-zinc-500 flex items-center gap-2 hover:text-blue-500"> 
                <IoLogoWindows />
                <span>Windows 10+</span>
                <IoLogoTux />
                <span>Linux Distros</span>
              </p> 
            </a>

          </div>
        </div>
      </section>

      {/* Preview */}
      <section className="">
        <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
          <div className="mb-8 max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-600">
              The workspace
            </p>

            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              A quick look at Neo
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-400 sm:text-base">
              The workspace, editor, terminal, and AI chat  all running on
              your machine.
            </p>
          </div>

          <div className="overflow-hidden  bg-black/30">
            <ScreenshotFrame
              src={previewSss}
              alt="Neo workspace preview"
              title="Main chat interface"
            />
          </div>
        </div>
      </section>

      {/* Getting started */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-600">
              Start here
            </p>

            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Getting started
            </h2>

            <p className="mt-3 text-sm leading-6 text-zinc-400 sm:text-base">
              Get Neo running and working on a real project in three steps.
            </p>
          </div>

          <ol className="mt-10 divide-y divide-white/10 border-y border-white/10">
            {steps.map((s) => (
              <li
                key={s.n}
                className="grid gap-4 py-7 sm:grid-cols-[40px_1fr] sm:gap-5"
              >
                <span className="text-sm font-medium text-zinc-600">
                  {s.n}
                </span>

                <div>
                  <h3 className="text-base font-medium text-white">
                    {s.title}
                  </h3>

                  <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400">
                    {s.body}
                  </p>

                  <Link
                    to={s.href}
                    className="mt-3 inline-block text-sm font-medium text-white underline decoration-zinc-600 underline-offset-4 transition hover:decoration-zinc-300"
                  >
                    {s.link}
                  </Link>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      

      {/* Closing call to action */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
          <h2 className="max-w-2xl text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Neo is still in beta. Grab it and tell us what breaks.
          </h2>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/downloads"
              className="rounded-md bg-white px-5 py-2.5 text-sm font-medium text-zinc-950 transition hover:bg-zinc-200"
            >
              Download Neo
            </Link>

            <Link
              to="/documentation"
              className="rounded-md border border-white/20 px-5 py-2.5 text-sm font-medium text-white transition hover:border-white/40 hover:bg-white/5"
            >
              Read the docs
            </Link>

            <a
              href="https://github.com/Lumorix-studios/Neo/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-white/20 px-5 py-2.5 text-sm font-medium text-white transition hover:border-white/40 hover:bg-white/5"
            >
              Report an issue
            </a>
          </div>
        </div>
      </section>
    </>
  );
}