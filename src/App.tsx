import {
  BrowserRouter,
  Link,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";

import PrivacyPolicy from "../components/Privacypolicyandterms";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Downloads from "../components/Downloads";
import About from "../components/About";
import Contact from "../components/Contact";
import Documentation from "../components/Documentation";
import Home from "../components/Home";
import Pricings from "../components/pricings";
import AccountPage from "../components/AccountPage";
import AuthModal from "../components/AuthModal";
import CRTWarp from "../components/CrtWrap";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function PageContent() {
  const { pathname } = useLocation();

  // Pages that should not have the CRT background
  const isPlainPage =
    pathname === "/downloads" ||
    pathname === "/about";

  return (
    <div className="flex min-h-screen flex-col bg-zinc-950">
      <div className="relative flex flex-1 flex-col">

        {/* Global CRT background */}
        {/* Hidden on Downloads and About */}
        {!isPlainPage && (
          <>
            <div
              className="absolute inset-0"
              aria-hidden="true"
            >
              <CRTWarp mouseReact={false} />
            </div>

            <div
              className="absolute inset-0 bg-zinc-950/70"
              aria-hidden="true"
            />
          </>
        )}

        <Navbar />

        {/* Global auth modal (sign in / sign up) — opened by the navbar and the Pricing page. */}
        <AuthModal />

        <main className="relative z-10 flex-1">
          <Routes>

            {/* Home */}
            <Route
              path="/"
              element={<Home />}
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
              path="/privacypolicyandterms"
              element={<PrivacyPolicy />}
            />

            {/* Legacy privacy route */}
            <Route
              path="/Privacypolicyandterms"
              element={<PrivacyPolicy />}
            />

            {/* Contact */}
            <Route
              path="/contact"
              element={<Contact />}
            />

            {/* Documentation */}
            <Route
              path="/documentation"
              element={<Documentation />}
            />

            {/* Legacy documentation route */}
            <Route
              path="/Documentation"
              element={<Documentation />}
            />

            {/* Pricing */}
            <Route
              path="/pricing"
              element={<Pricings />}
            />

            {/* Legacy pricing route */}
            <Route
              path="/Pricings"
              element={<Pricings />}
            />

            {/* Account */}
            <Route
              path="/account"
              element={<AccountPage />}
            />

            {/* Legacy account route */}
            <Route
              path="/Account"
              element={<AccountPage />}
            />

            {/* 404 */}
            <Route
              path="*"
              element={
                <div className="mx-auto max-w-7xl px-4 py-32 text-center sm:px-6">
                  <h1 className="text-5xl font-semibold text-white">
                    404
                  </h1>

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
      </div>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ScrollToTop />
      <PageContent />
    </BrowserRouter>
  );
}