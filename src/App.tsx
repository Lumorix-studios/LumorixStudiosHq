
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import PrivacyPolicy from "../components/Privacypolicyandterms";
import RotatingText from "../components/RotatingText";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Downloads from "../components/Downloads";
import About from "../components/About";
import testImage from "./assets/TEST001.png";
import Contact from "../components/Contact";
import Documentation from "../components/Documentation"
export default function App() {
  return (
    // basename is required on GitHub Pages project sites: the app lives at
    // /LumorixStudiosHq/, so without it no route ever matches on refresh.
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <div className="flex min-h-screen flex-col bg-zinc-950">
        <Navbar />

        <main className="flex-1">
          <Routes>

            {/* Home */}
            <Route
              path="/"
              element={
                <section className="bg-zinc-950">
                  <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
                    <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">

                      {/* Hero text */}
                      <div>
                        <p className="mb-3 text-sm font-medium tracking-wide text-zinc-500 uppercase">
                          Lumorix Studios
                        </p>

                        <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                          ProjectNeo
                        </h1>

                        <div className="mt-4 flex flex-wrap items-center gap-x-2 text-lg text-zinc-400 sm:text-xl">
                          <span>Built to be</span>
                          <RotatingText
                            texts={[
                              "Efficient",
                              "Easy to use",
                              "Lightweight",
                              "Free (Currently)",
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

                        <p className="mt-5 max-w-lg text-base leading-relaxed text-zinc-400 sm:text-lg">
                          A lightweight agentic IDE for developers who want
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
                      </div>

                      {/* Application window */}
                      <div className="w-full overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 shadow-2xl">
                        {/* Window header */}
                        <div className="flex h-10 items-center border-b border-zinc-800 bg-zinc-900 px-4">
                          <div className="flex gap-2">
                            <span className="h-3 w-3 rounded-full bg-red-500/80" />
                            <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
                            <span className="h-3 w-3 rounded-full bg-green-500/80" />
                          </div>

                          <span className="ml-4 text-xs text-zinc-500">
                            ProjectNeo
                          </span>
                        </div>

                        {/* Screenshot */}
                        <img
                          src={testImage}
                          alt="ProjectNeo interface"
                          className="block h-auto w-full"
                        />
                      </div>

                    </div>
                  </div>
                </section>
              }
            />

            {/* Downloads */}
            <Route
              path="/downloads"
              element={<Downloads />}
            />

            {/* About */}
            <Route
              path="/about"
              element={<About />}
            />

            {/* Privacy */}
            <Route
              path="/Privacypolicyandterms"
              element={<PrivacyPolicy />}
            />

            {/* Contact */}
            <Route
              path="/contact"
              element={<Contact />}
            />

            <Route
              path="/Documentation"
              element={<Documentation />}
            />

            {/* Catch-all: keeps refreshes/unknown URLs inside the app */}
            <Route
              path="*"
              element={
                <div className="mx-auto max-w-7xl px-4 py-32 text-center sm:px-6">
                  <h1 className="text-5xl font-semibold text-white">404</h1>
                  <p className="mt-4 text-zinc-400">
                    This page doesn&apos;t exist.
                  </p>
                  <Link
                    to="/"
                    className="mt-8 inline-block rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-zinc-950 transition hover:bg-zinc-200"
                  >
                    Back home
                  </Link>
                </div>
              }
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}
