
export default function Contact() {
  return (
    <main className="bg-zinc-900 text-white">
      <section className="mx-auto max-w-5xl px-6 py-24 lg:px-8">

        <div className="max-w-2xl">
          <h1 className="text-5xl font-semibold tracking-tight sm:text-6xl">
            Contact
          </h1>

          <p className="mt-6 text-lg leading-8 text-zinc-400">
            Have a question, found a bug, or want to contribute to Neo?
            GitHub is the best place to reach the project.
          </p>

          <div className="mt-10">
            <a
              href="https://github.com/Lumorix-studios"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center border border-zinc-700 px-5 py-3 text-sm font-medium text-white transition hover:border-zinc-500 hover:bg-zinc-800"
            >
              GitHub
            </a>
          </div>
        </div>

        <div className="mt-20 border-t border-zinc-800 pt-12">
          <h2 className="text-xl font-semibold">
            ProjectNeo
          </h2>

          <p className="mt-4 max-w-2xl leading-7 text-zinc-400">
            For bug reports, feature requests, questions, and contributions,
            use the appropriate repository or discussion on GitHub.
          </p>

          <div className="mt-6">
            <a
              href="https://github.com/Lumorix-studios/Neo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-zinc-300 underline underline-offset-4 hover:text-white"
            >
              ProjectNeo repository →
            </a>
          </div>
        </div>

      </section>
    </main>
  );
}
