import { Link } from "react-router-dom";
import RotatingText from "./RotatingText";

const steps = [
  {
    n: "1",
    title: "Install it",
    body: "Windows installer or Linux package from downloads. Roughly 7-10 MB, no account.",
    href: "/downloads",
    link: "Downloads",
  },
  {
    n: "2",
    title: "Connect a model",
    body: "Paste an API key or point Neo at local Ollama. Credentials never leave your device.",
    href: "/documentation#providers",
    link: "Provider setup",
  },
  {
    n: "3",
    title: "Open a folder",
    body: "Explorer, editor and agent operate on the same project. Start with one small task.",
    href: "/documentation#how-to-add-agents",
    link: "Getting started",
  },
];
export default function Home() {
  return (
    <>
      <section>
        <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 sm:py-28">
            <p className="mb-3 text-sm font-medium tracking-wide text-zinc-500 uppercase">
              Lumorix Studios
            </p>
              <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                ProjectNeo
              </h1>
              <div className="mt-4 flex flex-wrap items-center gap-x-2 text-lg text-zinc-400 sm:text-xl">
                <span>Built to be</span>
                <RotatingText
                  texts={["Efficient", "Easy to use", "Lightweight", "Free (Currently)"]}
                  mainClassName="inline-flex font-medium text-white"
                  staggerFrom="last"
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-120%" }}
                  staggerDuration={0.025}
                  splitLevelClassName="overflow-hidden"
                  transition={{ type: "spring", damping: 30, stiffness: 400 }}
                  rotationInterval={2000}
                  splitBy="characters"
                  auto
                  loop
                />
              </div>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-zinc-400 sm:text-lg">
                A lightweight agentic interface for developers who want
                their tools to stay out of the way.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/downloads"
                  className="rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-zinc-950 transition hover:bg-zinc-200"
                >
                  Download
                </Link>
                <a
                  href="https://github.com/Lumorix-studios/Neo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-zinc-700 px-5 py-2.5 text-sm font-medium text-white transition hover:border-zinc-500 hover:bg-zinc-800"
                >
                  GitHub
                </a>
              </div>
              <p className="mt-6 text-xs leading-5 text-zinc-500">
                Windows 10+ / Ubuntu 20.04+ / Fedora 34+ · No account · Beta
              </p>
        </div>
      </section>

      <section className="border-t border-zinc-800/60">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
          <h2 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
            What Neo actually is
          </h2>
          <div className="mt-5 space-y-4 text-sm leading-7 text-zinc-400 sm:text-base">
            <p>
              Neo is a desktop IDE with an agent that works inside your project.
              It can read, edit, and search files, and anything it proposes
              shows up as a diff before it touches your code.
            </p>
            <p>
              It runs on a Rust backend instead of Electron, so it stays light
              at idle. No account, no cloud — your settings, keys, and history
              stay on your machine.{" "}
              <Link
                to="/documentation"
                className="font-medium text-white underline decoration-zinc-600 underline-offset-4 transition hover:decoration-zinc-300"
              >
                Read the docs
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-800/60">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
          <h2 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
            Getting started
          </h2>
          <ol className="mt-6 space-y-5">
            {steps.map((s) => (
              <li key={s.n}>
                <p className="text-sm font-semibold text-white">
                  <span className="mr-2 text-zinc-600">{s.n}.</span>{s.title}
                </p>
                <p className="mt-1 text-sm leading-6 text-zinc-400">{s.body}</p>
                <Link
                  to={s.href}
                  className="mt-1 inline-block text-sm font-medium text-white underline decoration-zinc-600 underline-offset-4 transition hover:decoration-zinc-300"
                >
                  {s.link}
                </Link>
              </li>
            ))}
          </ol>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              to="/downloads"
              className="rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-zinc-950 transition hover:bg-zinc-200"
            >
              Download Neo
            </Link>
            <Link
              to="/documentation"
              className="rounded-lg border border-zinc-700 px-5 py-2.5 text-sm font-medium text-white transition hover:border-zinc-500 hover:bg-zinc-800"
            >
              Read the docs
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

