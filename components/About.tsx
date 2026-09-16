export default function About() {
  return (
    <main className="min-h-screen text-white">
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">

        {/* Header */}
        <header className="pb-10">
          <h1 className="text-4xl font-medium tracking-tight sm:text-5xl">
            About Neo
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-white/60 sm:text-lg">
            A lightweight desktop IDE with agentic coding, built to stay fast
            on modest hardware.
          </p>
        </header>

        {/* Content */}
        <div className="space-y-14">

          {/* The Project */}
          <section>
            <h2 className="text-xl font-medium">
              The project
            </h2>

            <div className="mt-4 max-w-3xl space-y-4 leading-7 text-white/60">
              <p>
                Neo is a desktop IDE with agentic coding capabilities. Rather
                than bolting a chat box onto another editor, Neo is built around
                an agent that can work alongside you, inside your project.
              </p>

              <p>
                It stays intentionally lightweight: a Rust backend instead of
                Electron, so it idles small and stays usable on modest hardware.
                The goal is a tool that feels like a development environment
                first — supported wherever the OS is.
              </p>
            </div>
          </section>

          {/* Why Neo */}
          <section className="border-t border-white/15 pt-10">
            <h2 className="text-xl font-medium">
              Why Neo?
            </h2>

            <p className="mt-4 max-w-3xl leading-7 text-white/60">
              Neo started as a hobby project — small experiments in editors,
              agents, and desktop tooling that grew into a real application.
            </p>
          </section>

          {/* Under the Hood */}
          <section className="border-t border-white/15 pt-10">
            <h2 className="text-xl font-medium">
              Under the hood
            </h2>

            <div className="mt-4 max-w-3xl space-y-4 leading-7 text-white/60">
              <p>
                Neo is built as a desktop application using Tauri, with a
                TypeScript and React frontend. The project uses Rust on the
                native side and is designed to keep the desktop layer
                substantially lighter than traditional webview-based desktop
                applications.
              </p>

              <p>
                The architecture is still evolving. Some parts of Neo are
                experimental, and the project will continue to change as new
                approaches are tested.
              </p>
            </div>
          </section>

          {/* Lumorix Studios */}
          <section className="border-t border-white/15 pt-10">
            <h2 className="text-xl font-medium">
              Lumorix Studios
            </h2>

            <p className="mt-4 max-w-3xl leading-7 text-white/60">
              Lumorix Studios is the GitHub organization where Neo and its
              related repositories are maintained. It isn't a separate
              company or legal entity. Think of it as the home for the
              project's code, releases, and other work.
            </p>
          </section>

          {/* Current Status */}
          <section className="border-t border-white/15 pt-10">
            <h2 className="text-xl font-medium">
              Where Neo is now
            </h2>

            <div className="mt-4 max-w-3xl space-y-4 leading-7 text-white/60">
              <p>
                Neo is still actively being built. Releases are incremental,
                and the project is nowhere near finished. Features will change,
                things will break, and parts of the application will be
                rewritten when they need to be.
              </p>

              <p>
                That's part of building software from scratch.
              </p>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}