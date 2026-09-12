
export default function About() {
  return (
    <main className="text-white">
      <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">

        {/* Header */}
        <div className="max-w-2xl">
          <p className="mb-2 text-sm font-medium tracking-wide text-zinc-500 uppercase">
            ProjectNeo
          </p>

          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            About Neo
          </h1>

          <p className="mt-5 text-lg leading-relaxed text-zinc-400 sm:text-xl">
            A lightweight desktop IDE with agentic coding, built to stay fast on
            modest hardware.
          </p>
        </div>
        {/* Sections */}
        <div className="mt-16 space-y-16 sm:mt-20 sm:space-y-20">

          {/* The project */}
          <div>
            <h2 className="text-xl font-semibold sm:text-2xl">
              The project
            </h2>

            <div className="mt-4 space-y-4 leading-7 text-zinc-400">
              <p>
                Neo is a desktop IDE with agentic coding capabilities. Rather
                than bolting a chat box onto another editor, Neo is built
                around an agent that can work alongside you, inside your
                project.
              </p>

              <p>
                It stays intentionally lightweight: a Rust backend instead of
                Electron, so it idles small and stays usable on modest
                hardware. The goal is a tool that feels like a development
                environment first — supported wherever the OS is.
              </p>
            </div>
          </div>
          {/* Why */}
          <div>
            <h2 className="text-xl font-semibold sm:text-2xl">
              Why Neo?
            </h2>

            <div className="mt-4 space-y-4 leading-7 text-zinc-400">
              <p>
                Neo started as a hobby project — small experiments in editors,
                agents, and desktop tooling that grew into a real application.
              </p>
            </div>
          </div>

          {/* Technology */}
          <div className="border-t border-zinc-800 pt-12 sm:pt-16">
            <h2 className="text-xl font-semibold sm:text-2xl">
              Under the hood
            </h2>

            <div className="mt-4 space-y-4 leading-7 text-zinc-400">
              <p>
                Neo is built as a desktop application using Tauri, with a
                TypeScript and React frontend. The project uses Rust on the native
                side and is designed to keep the desktop layer substantially
                lighter than traditional webview-based desktop applications.
              </p>

              <p>
                The architecture is still evolving. Some parts of Neo are
                experimental, and the project will continue to change as new
                approaches are tested.
              </p>
            </div>
          </div>

          {/* Lumorix */}
          <div className="border-t border-zinc-800 pt-12 sm:pt-16">
            <h2 className="text-xl font-semibold sm:text-2xl">
              Lumorix Studios
            </h2>

            <p className="mt-4 leading-7 text-zinc-400">
              Lumorix Studios is the GitHub organization where Neo and its
              related repositories are maintained. It isn't a separate company
              or legal entity. Think of it as the home for the project's code,
              releases, and other work.
            </p>
          </div>

          {/* Status */}
          <div className="border-t border-zinc-800 pt-12 sm:pt-16">
            <h2 className="text-xl font-semibold sm:text-2xl">
              Where Neo is now
            </h2>

            <div className="mt-4 space-y-4 leading-7 text-zinc-400">
              <p>
                Neo is still actively being built. Releases are incremental, and
                the project is nowhere near finished. Features will change, things
                will break, and parts of the application will be rewritten when
                they need to be.
              </p>

              <p>
                That's part of building software from scratch.
              </p>
            </div>
          </div>

        </div>

      </section>
    </main>
  );
}
