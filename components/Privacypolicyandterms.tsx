
export default function Legal() {
  return (
    <main className="bg-zinc-950 text-zinc-300">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">

        <article className="space-y-10">

          {/* Header */}
          <header className="border-b border-zinc-800 pb-8">
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Privacy Policy &amp; Terms of Use
            </h1>

            <p className="mt-4 text-sm text-zinc-500">
              <span className="text-zinc-400">ProjectNeo</span>
              <br />
              Last updated: August 28, 2026
            </p>
          </header>

          {/* 1. Privacy Policy */}
          <section className="space-y-8">
            <h2 className="text-2xl font-bold text-white">
              1. Privacy Policy
            </h2>

            <p>
              ProjectNeo ("Neo") is a desktop development environment
              developed as an independent software project.
            </p>

            <p>
              This policy explains what information may be processed when
              using Neo or visiting the ProjectNeo website.
            </p>

            {/* 1.1 */}
            <div>
              <h3 className="text-lg font-semibold text-white">
                1.1 Information We Collect
              </h3>

              <p className="mt-3">
                Neo is designed to minimize unnecessary data collection.
              </p>

              <p className="mt-3">
                Neo does not intentionally collect personal information simply
                because you download or use the application.
              </p>

              <p className="mt-3">
                Depending on the features you use, Neo may process information
                you provide to the application, including:
              </p>

              <ul className="mt-3 list-disc space-y-1.5 pl-6 text-zinc-400">
                <li>Code</li>
                <li>Project files</li>
                <li>Prompts</li>
                <li>Configuration</li>
                <li>API credentials</li>
                <li>Other information required by specific features</li>
              </ul>
            </div>

            {/* 1.2 */}
            <div>
              <h3 className="text-lg font-semibold text-white">
                1.2 Local Data
              </h3>

              <p className="mt-3">
                Neo may store certain application data locally on your device.
              </p>

              <p className="mt-3">
                This can include:
              </p>

              <ul className="mt-3 list-disc space-y-1.5 pl-6 text-zinc-400">
                <li>Application settings</li>
                <li>Provider configuration</li>
                <li>API credentials</li>
                <li>Project-related configuration</li>
                <li>Other data required for the application to function</li>
              </ul>

              <p className="mt-3">
                You are responsible for securing access to your device and
                protecting any credentials stored on it.
              </p>
            </div>

            {/* 1.3 */}
            <div>
              <h3 className="text-lg font-semibold text-white">
                1.3 AI Providers
              </h3>

              <p className="mt-3">
                Neo may allow you to connect third-party AI providers using
                your own API credentials.
              </p>

              <p className="mt-3">
                When you use an external AI provider, information sent to that
                provider is subject to the provider's own privacy policy and
                terms of service.
              </p>

              <p className="mt-3">
                Neo does not control how third-party providers process
                information submitted to their services.
              </p>
            </div>

            {/* 1.4 */}
            <div>
              <h3 className="text-lg font-semibold text-white">
                1.4 Third-Party Services
              </h3>

              <p className="mt-3">
                Neo may interact with third-party services, including:
              </p>

              <ul className="mt-3 list-disc space-y-1.5 pl-6 text-zinc-400">
                <li>GitHub</li>
                <li>AI model providers</li>
                <li>Package repositories</li>
                <li>Other services required by specific features</li>
              </ul>

              <p className="mt-3">
                These services operate independently from Neo and may collect
                or process information according to their own policies.
              </p>
            </div>
          </section>

          {/* Divider */}
          <div className="border-t border-zinc-800" />

          {/* 2. Terms of Use */}
          <section className="space-y-8">
            <h2 className="text-2xl font-bold text-white">
              2. Terms of Use
            </h2>

            <p>
              By downloading, installing, accessing, or using Neo, you agree
              to these Terms of Use.
            </p>

            {/* 2.1 */}
            <div>
              <h3 className="text-lg font-semibold text-white">
                2.1 Use of Neo
              </h3>

              <p className="mt-3">
                You may use Neo for lawful purposes and in accordance with
                applicable laws and regulations.
              </p>

              <p className="mt-3">
                You are responsible for how you use the software and for any
                actions performed through third-party services connected to Neo.
              </p>
            </div>

            {/* 2.2 */}
            <div>
              <h3 className="text-lg font-semibold text-white">
                2.2 Your Content
              </h3>

              <p className="mt-3">
                You retain ownership of content you create or provide through
                Neo, including:
              </p>

              <ul className="mt-3 list-disc space-y-1.5 pl-6 text-zinc-400">
                <li>Source code</li>
                <li>Project files</li>
                <li>Prompts</li>
                <li>Documentation</li>
                <li>Other original content</li>
              </ul>

              <p className="mt-3">
                When using a third-party service through Neo, that service's
                terms may apply to content sent to it.
              </p>
            </div>

            {/* 2.3 */}
            <div>
              <h3 className="text-lg font-semibold text-white">
                2.3 AI-Generated Content
              </h3>

              <p className="mt-3">
                Neo may provide access to AI models and agentic development
                features.
              </p>

              <p className="mt-3">
                AI-generated output may contain:
              </p>

              <ul className="mt-3 list-disc space-y-1.5 pl-6 text-zinc-400">
                <li>Errors</li>
                <li>Incorrect information</li>
                <li>Security issues</li>
                <li>Unexpected changes</li>
                <li>Incomplete or unsuitable code</li>
              </ul>

              <p className="mt-3">
                You are responsible for reviewing AI-generated output before
                using it in a project.
              </p>
            </div>

            {/* 2.4 */}
            <div>
              <h3 className="text-lg font-semibold text-white">
                2.4 Software License
              </h3>

              <p className="mt-3">
                Neo is distributed under the license specified by the project.
                Your rights to use, modify, distribute, or otherwise interact
                with the software are determined by that license.
              </p>
            </div>

            {/* 2.5 */}
            <div>
              <h3 className="text-lg font-semibold text-white">
                2.5 Availability
              </h3>

              <p className="mt-3">
                Neo is provided on an "as is" and "as available" basis to the
                extent permitted by applicable law.
              </p>

              <p className="mt-3">
                We do not guarantee that Neo will always be available,
                error-free, secure, or compatible with every device.
              </p>
            </div>
          </section>

          {/* Divider */}
          <div className="border-t border-zinc-800" />

          {/* 3. Lumorix Studios */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-white">
              3. Lumorix Studios
            </h2>

            <p>
              Lumorix Studios is the GitHub organization used to host and
              organize ProjectNeo and related repositories.
            </p>

            <p>
              Lumorix Studios is not being represented as a separate company
              or legal entity by this website.
            </p>
          </section>

          {/* 4. Changes */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-white">
              4. Changes
            </h2>

            <p>
              These Terms and Privacy Policy may be updated as Neo develops.
              The latest version will be published on this page with an
              updated date.
            </p>
          </section>

          {/* 5. Contact */}
          <section className="space-y-6 border-t border-zinc-800 pt-10">
            <h2 className="text-2xl font-bold text-white">
              5. Contact
            </h2>

            <p>
              Questions and project-related inquiries can be submitted
              through the ProjectNeo GitHub repository.
            </p>

            <p className="text-sm text-zinc-500">
              ProjectNeo
              <br />
              Lumorix Studios
              <br />
              GitHub: Lumorix-studios/Neo
            </p>
          </section>

        </article>
      </div>
    </main>
  );
}
