import { Link } from "react-router-dom";

const projects = [
  {
    name: "Struct",
    body: "A lightweight desktop IDE with agentic coding, for Windows and Linux.",
    href: "/products/struct",
    external: false,
  },
  {
    name: "TeamDiscussions",
    body: "Where members talk through projects, plans, and general stuff.",
    href: "https://github.com/Lumorix-studios/TeamDiscussions",
    external: true,
  },
  {
    name: "Lumorix Studios HQ",
    body: "This website — documentation, downloads, and everything we publish.",
    href: "https://github.com/Lumorix-studios/LumorixStudiosHq",
    external: true,
  },
];

export default function About() {
  return (
    <main className="min-h-screen text-white">
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">

        {/* Header */}
        <header className="pb-10">
          <h1 className="text-4xl font-medium tracking-tight sm:text-5xl">
            About Lumorix Studios
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-white/60 sm:text-lg">
            A technology-focused team developing modern applications,
            developer tools, and experimental projects — open source by
            default.
          </p>
        </header>

        {/* Content */}
        <div className="space-y-14">

          {/* Who we are */}
          <section>
            <h2 className="text-xl font-medium">
              Who we are
            </h2>

            <div className="mt-4 max-w-3xl space-y-4 leading-7 text-white/60">
              <p>
                Lumorix Studios is a GitHub organization where our projects,
                releases, and issue tracking live. It isn't a separate company
                or legal entity — think of it as the home for the code and the
                team behind it.
              </p>

              <p>
                We explore the intersection of software engineering,
                artificial intelligence, and user-focused design to create
                practical, forward-thinking tools. Some projects ship; some
                stay experiments. All of them are public.
              </p>
            </div>
          </section>

          {/* Projects */}
          <section>
            <h2 className="text-xl font-medium">
              Our projects
            </h2>

            <ul className="mt-4 space-y-6">
              {projects.map((p) => {
                const inner = (
                  <>
                    <span className="block font-medium text-white/90">
                      {p.name}
                    </span>

                    <span className="mt-1 block max-w-3xl leading-7 text-white/60">
                      {p.body}
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
                        className="block transition hover:text-white"
                      >
                        {inner}
                      </a>
                    ) : (
                      <Link
                        to={p.href}
                        className="block transition hover:text-white"
                      >
                        {inner}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>

          {/* How we work */}
          <section>
            <h2 className="text-xl font-medium">
              How we work
            </h2>

            <div className="mt-4 max-w-3xl space-y-4 leading-7 text-white/60">
              <p>
                Everything is built in the open. Repositories are public,
                releases are published on GitHub, and issues are the front door
                for bug reports and feature requests.
              </p>

              <p>
                We keep things lightweight on purpose — native backends instead
                of heavyweight runtimes, and interfaces that stay out of the
                way. The goal is tools that remain usable on modest hardware.
              </p>
            </div>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-xl font-medium">
              Get in touch
            </h2>

            <p className="mt-4 max-w-3xl leading-7 text-white/60">
              For questions, collaboration opportunities, or project inquiries,
              open an issue in the relevant repository or reach out on the{" "}
              <Link
                to="/contact"
                className="text-white/90 underline decoration-white/30 underline-offset-4 transition hover:decoration-white/70"
              >
                contact page
              </Link>
              .
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}

