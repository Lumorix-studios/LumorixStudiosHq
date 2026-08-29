
export default function About() {
  return (
    <main className="bg-zinc-900 text-white">
      <section className="mx-auto max-w-5xl px-6 py-24 lg:px-8">

        {/* Header */}
        <div className="max-w-3xl">
          <h1 className="text-5xl font-semibold tracking-tight sm:text-6xl">
            About Neo
          </h1>

          <p className="mt-6 text-xl leading-8 text-zinc-400">
            Neo started as a project to build the kind of development
            environment I actually wanted to use.
          </p>
        </div>

        {/* The project */}
        <div className="mt-20 max-w-3xl">
          <h2 className="text-2xl font-semibold">
            The project
          </h2>

          <p className="mt-5 leading-7 text-zinc-400">
            Neo is a desktop IDE with agentic coding capabilities. The idea
            isn't to make another editor with an AI chat box attached to it.
            Neo is built around the idea that an agent should be able to work
            alongside the developer and the project itself.
          </p>

          <p className="mt-5 leading-7 text-zinc-400">
            The project is intentionally lightweight. I don't want the editor
            to consume a huge amount of resources just to sit open while I'm
            coding. The goal is for Neo to feel like a development tool first
            and an AI application second.
          </p>
        </div>

        {/* Why */}
        <div className="mt-20 max-w-3xl">
          <h2 className="text-2xl font-semibold">
            Why Neo?
          </h2>

          <p className="mt-5 leading-7 text-zinc-400">
            I wanted more control over the development environment I was
            building. That meant experimenting with different models,
            providers, interfaces, and ways of letting an agent interact with
            a codebase.
          </p>

          <p className="mt-5 leading-7 text-zinc-400">
            Neo is the result of those experiments turning into an actual
            application.
          </p>
        </div>

        {/* Technology */}
        <div className="mt-20 border-t border-zinc-800 pt-16">
          <h2 className="text-2xl font-semibold">
            Under the hood
          </h2>

          <p className="mt-5 max-w-3xl leading-7 text-zinc-400">
            Neo is built as a desktop application using Tauri, with a
            TypeScript and React frontend. The project uses Rust on the native
            side and is designed to keep the desktop layer substantially
            lighter than traditional webview-based desktop applications.
          </p>

          <p className="mt-5 max-w-3xl leading-7 text-zinc-400">
            The architecture is still evolving. Some parts of Neo are
            experimental, and the project will continue to change as new
            approaches are tested.
          </p>
        </div>

        {/* Lumorix */}
        <div className="mt-20 border-t border-zinc-800 pt-16">
          <h2 className="text-2xl font-semibold">
            Lumorix Studios
          </h2>

          <p className="mt-5 max-w-3xl leading-7 text-zinc-400">
            Lumorix Studios is the GitHub organization where Neo and its
            related repositories are maintained. It isn't a separate company
            or legal entity. Think of it as the home for the project's code,
            releases, and other work.
          </p>
        </div>

        {/* Status */}
        <div className="mt-20 border-t border-zinc-800 pt-16">
          <h2 className="text-2xl font-semibold">
            Where Neo is now
          </h2>

          <p className="mt-5 max-w-3xl leading-7 text-zinc-400">
            Neo is still actively being built. Releases are incremental, and
            the project is nowhere near finished. Features will change, things
            will break, and parts of the application will be rewritten when
            they need to be.
          </p>

          <p className="mt-5 max-w-3xl leading-7 text-zinc-400">
            That's part of building software from scratch.
          </p>
        </div>

      </section>
    </main>
  );
}
