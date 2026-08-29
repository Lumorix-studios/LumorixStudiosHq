
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivacyPolicy from "../components/Privacypolicyandterms";
import RotatingText from "../components/RotatingText";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Downloads from "../components/Downloads";
import About from "../components/About";
import testImage from "./assets/TEST004.png";
import Contact from  "../components/Contact";
export default function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen flex-col bg-zinc-900">
        <Navbar />

        <main className="flex-1">
          <Routes>

            {/* Home */}
            <Route
              path="/"
              element={
                <section className="bg-zinc-900">
                  <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
                    <div className="grid items-center gap-16 lg:grid-cols-2">

                      {/* Hero text */}
                      <div>
                        <h1 className="text-5xl font-semibold tracking-tight text-white sm:text-6xl">
                          ProjectNeo
                        </h1>

                        <div className="mt-5 flex items-center gap-2 text-xl text-zinc-400 sm:text-2xl">
                          <span>Built to be</span>

                          <RotatingText
                            texts={[
                              "Efficient",
                              "Easy to use",
                              "Lightweight",
                              "Free",
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

                        <p className="mt-4 max-w-lg text-lg leading-8 text-zinc-400">
                          A lightweight agentic IDE for developers who want
                          their tools to stay out of the way.
                        </p>

                        <div className="mt-8 flex gap-3">
                          <a
                            href="/downloads"
                            className="rounded-md bg-white px-5 py-2.5 text-sm font-medium text-black transition hover:bg-zinc-200"
                          >
                            Download
                          </a>

                          <a
                            href="https://github.com/Lumorix-studios/Neo"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-md border border-zinc-700 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800"
                          >
                            GitHub
                          </a>
                        </div>
                      </div>

                      {/* Application window */}
                      <div className="w-full overflow-hidden rounded-xl border border-zinc-700 bg-zinc-950 shadow-2xl">

                        {/* Window header */}
                        <div className="flex h-10 items-center border-b border-zinc-800 bg-zinc-900 px-4">
                          <div className="flex gap-2">
                            <span className="h-3 w-3 rounded-full bg-zinc-600" />
                            <span className="h-3 w-3 rounded-full bg-zinc-600" />
                            <span className="h-3 w-3 rounded-full bg-zinc-600" />
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
            <Route path = "/Privacypolicyandterms"
            element = {<PrivacyPolicy/>}
            />
            <Route path = "/Contact"
            element = {<Contact/>}
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}
