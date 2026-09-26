import {
  BrowserRouter,
  Link,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";

import Navbar from "../components/navbar";
import Footer from "../components/footer";
import AuthModal from "../components/AuthModal";
"use client";

import { BackgroundPixelStars } from "../components/background";
const PrivacyPolicy = lazy(() => import("../components/Privacypolicyandterms"));
const Downloads = lazy(() => import("../components/Downloads"));
const About = lazy(() => import("../components/About"));
const Contact = lazy(() => import("../components/Contact"));
const Documentation = lazy(() => import("../components/Documentation"));
const Home = lazy(() => import("../components/Home"));
const AccountPage = lazy(() => import("../components/AccountPage"));
const CRTWarp = lazy(() => import("../components/CrtWrap"));

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function PageContent() {
  const { pathname } = useLocation();

  // Documentation is intentionally static and dark like the rest of the site;
  // don't run the full-page WebGL effect behind an opaque reading surface.
  // Touch devices also skip the effect: a full-viewport shader is expensive on phones.
  const shouldRenderCrt =
    pathname === "/" &&
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    //credits to https://21st.dev/@uicapsule/components/background-pixel-stars for the background component
     <div className="h-dvh w-dvw bg-black bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAIElEQVR42mIUEhJiwAbevXuHVZyJgUQwqmEUDB0AEGAADd8DEPTX6ksAAAAASUVORK5CYII=')] bg-[size:10px]">
      <BackgroundPixelStars />
      
   
    <div className="flex min-h-screen flex-col bg-zinc-950">
      <div className="relative flex flex-1 flex-col">

        {/* The animated background is limited to the home route on capable,
            motion-enabled desktop pointers. */}
        {shouldRenderCrt && (
          <>
            <div
              className="absolute inset-0"
              aria-hidden="true"
            >
              <Suspense fallback={null}>
                <CRTWarp mouseReact={false} />
              </Suspense>
            </div>

            <div
              className="absolute inset-0 bg-zinc-950/70"
              aria-hidden="true"
            />
          </>
        )}

        <Navbar />

        {/* Global auth modal (sign in / sign up) — opened by the navbar. */}
        <AuthModal />

        <main className="relative z-10 flex-1">
          <Suspense fallback={<div className="mx-auto max-w-7xl px-4 py-20 sm:px-6" aria-label="Loading page" />}>
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
          </Suspense>
        </main>
      </div>

      <Footer />
    </div>
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