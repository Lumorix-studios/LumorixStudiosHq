export default function Legal() {
  return (
    <main className="bg-zinc-950 text-zinc-300">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <article className="space-y-12">
          {/* Header */}
          <header className="border-b border-zinc-800 pb-8">
            <p className="mb-3 text-sm font-medium uppercase tracking-widest text-zinc-500">
              Lumorix Studios · ProjectNeo
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Privacy Policy &amp; Terms of Use
            </h1>
            <p className="mt-4 text-sm text-zinc-500">
              Effective date: September 15, 2026
              <br />
              Last updated: September 15, 2026
            </p>
          </header>

          <section className="rounded-lg border border-emerald-900/60 bg-emerald-950/20 p-5 text-sm leading-6 text-emerald-100">
            <h2 className="font-semibold text-emerald-200">Plain-language summary</h2>
            <p className="mt-2">
              ProjectNeo is designed as a local-first, agentic integrated
              development environment. Your projects, source code, prompts,
              settings, agent history, crash information, and generated files
              are designed to remain on your device. Lumorix Studios does not
              operate cloud infrastructure for Neo, does not provide cloud
              synchronization or hosted workspaces, and does not have routine
              access to your local files, crash data, or the API credentials
              you configure.
            </p>
            <p className="mt-3">
              The important exception is a request you intentionally send to a
              third-party service. If you connect an AI provider, package
              registry, Git host, browser, or other external service, the
              information required for that request leaves your device and is
              processed under that provider&apos;s terms and privacy policy.
              Review the provider&apos;s policies before sending confidential,
              regulated, or sensitive information.
            </p>
          </section>

          {/* 1. Privacy Policy */}
          <section className="space-y-8">
            <h2 className="text-2xl font-bold text-white">
              1. Privacy Policy
            </h2>

            <p>
              This Privacy Policy describes how Lumorix Studios
              (&quot;Lumorix,&quot; &quot;we,&quot; &quot;us,&quot; or
              &quot;our&quot;) handles information in connection with
              ProjectNeo (&quot;Neo&quot; or the &quot;Application&quot;).
              (LUMORIX-STUDIOS IS NOT A LEGAL ENTITY IT IS MERELY A GITHUB .ORG NAME USED TO HOST AND ORGANIZE PROJECTNEO AND RELATED REPOSITORIES.)
              It applies to the desktop application and any ProjectNeo website
              or documentation that links to this policy. If a separate
              notice applies to a particular feature, that notice controls for
              that feature.
            </p>

            {/* 1.1 */}
            <div>
              <h3 className="text-lg font-semibold text-white">
                1.1 Privacy-by-design architecture
              </h3>
              <p className="mt-3">
                Neo is local-first rather than account-first. The Application
                does not require a Lumorix account, upload your workspace to
                Lumorix, synchronize your project data to Lumorix, or depend
                on Lumorix-operated cloud infrastructure for its local editor,
                local tools, or agent workflow. Lumorix does not sell, rent, or
                license your project content, prompts, source code, or
                generated output.
              </p>
              <p className="mt-3">
                References in this policy to data being &quot;local&quot; mean
                that the data is stored or processed by the Application on
                storage controlled by your device, subject to the operating
                system, installed extensions, connected services, backups, and
                other software on that device. Local-first does not mean that
                your device is immune from malware, unauthorized access, theft,
                compromise, or accidental disclosure.
              </p>
            </div>

            {/* 1.2 */}
            <div>
              <h3 className="text-lg font-semibold text-white">
                1.2 Information processed locally
              </h3>
              <p className="mt-3">
                Depending on the features you use, Neo may create, read,
                modify, index, or otherwise process the following information
                locally:
              </p>
              <ul className="mt-3 list-disc space-y-1.5 pl-6 text-zinc-400">
                <li>Source code, repositories, project files, and file paths</li>
                <li>Prompts, instructions, agent plans, and conversation history</li>
                <li>Generated code, patches, build output, logs, and diagnostics</li>
                <li>Editor preferences, workspace settings, and local metadata</li>
                <li>Provider configuration, model preferences, and feature settings</li>
                <li>Local extension, tool, terminal, and automation configuration</li>
                <li>Credentials or tokens that you choose to configure locally</li>
              </ul>
              <p className="mt-3">
                Unless a feature explicitly tells you otherwise, this
                information is not transmitted to Lumorix. You are responsible
                for choosing the folders Neo can access and for deciding which
                files an agent or tool is permitted to inspect or change.
              </p>
            </div>

            {/* 1.3 */}
            <div>
              <h3 className="text-lg font-semibold text-white">
                1.3 Information sent to AI providers
              </h3>
              <p className="mt-3">
                Neo can connect directly to AI model providers using credentials
                that you supply. When you invoke an AI feature, the request may
                include the prompt, selected files, code context, tool results,
                conversation history, system instructions, and other content
                needed to produce the requested response. The exact payload
                depends on the provider, model, Neo configuration, and action
                you choose.
              </p>
              <p className="mt-3">
                Requests are sent to the provider endpoint configured by you or
                by the provider integration. Lumorix is not the processor of
                those requests merely because Neo provides the interface.
                Lumorix does not control whether a provider retains requests,
                uses them for model improvement, shares them with subprocessors,
                stores them in a particular region, or applies additional
                safety or abuse-monitoring review.
              </p>
              <p className="mt-3">
                Before using an AI provider, review its current privacy policy,
                data-use controls, retention settings, security documentation,
                and applicable business or enterprise terms. Do not send
                secrets, personal data, regulated data, customer data, or
                confidential code to a provider unless you have confirmed that
                the provider and your configuration are authorized for that
                data.
              </p>
            </div>

            {/* 1.4 */}
            <div>
              <h3 className="text-lg font-semibold text-white">
                1.4 API keys and credentials
              </h3>
              <p className="mt-3">
                API keys, access tokens, SSH keys, OAuth tokens, environment
                variables, and similar credentials are sensitive information.
                Neo may store provider credentials on your device when you ask
                it to do so, using the storage mechanisms available to the
                Application and operating system. Lumorix does not receive
                those credentials through a Lumorix-operated backend.
              </p>
              <p className="mt-3">
                Storage protections vary by platform, installation method, key
                storage choice, permissions, extensions, and device
                configuration. You should prefer your operating system&apos;s
                secure credential store when available, use least-privilege
                provider keys, set spending and rate limits, rotate keys
                periodically, and revoke a key immediately if you suspect
                exposure. Never commit credentials to a repository or place
                them in source files, prompts, issue reports, screenshots, or
                logs.
              </p>
            </div>

            {/* 1.5 */}
            <div>
              <h3 className="text-lg font-semibold text-white">
                1.5 Network requests and third-party services
              </h3>
              <p className="mt-3">
                Neo may make network requests only when required by a feature
                you use or by a tool, extension, provider, or service that you
                configure. These are optional external destinations or
                integrations, not Lumorix-hosted cloud features. Depending on
                your choices, this may include:
              </p>
              <ul className="mt-3 list-disc space-y-1.5 pl-6 text-zinc-400">
                <li>AI model and inference providers</li>
                <li>Git hosting, issue tracking, or source-control services</li>
                <li>Package registries, dependency indexes, and update servers</li>
                <li>Documentation, browser, search, or web-fetch services</li>
                <li>Remote development, deployment, or collaboration services</li>
                <li>Operating-system, runtime, and extension services</li>
              </ul>
              <p className="mt-3">
                These services are independent third parties. Their collection,
                use, retention, international transfer, and security practices
                are governed by their own terms and notices, not this policy.
                A service may receive your IP address, account identifier,
                request metadata, content, or credentials as necessary for the
                request. Check the destination and payload before approving
                agent actions that can access the network.
              </p>
            </div>

            {/* 1.6 */}
            <div>
              <h3 className="text-lg font-semibold text-white">
                1.6 Telemetry, diagnostics, and support
              </h3>
              <p className="mt-3">
                Neo includes a local crash handler intended to record crash
                information on your device so that the Application can fail
                safely and provide local diagnostic information. The crash
                handler does not, by itself, create a Lumorix-hosted copy of
                your crash data or transmit it to Lumorix. Neo does not require
                Lumorix analytics, advertising identifiers, behavioral
                profiling, remote project telemetry, or a Lumorix cloud
                service to function.
              </p>
              <p className="mt-3">
                If you choose to export, copy, attach, or submit a crash log,
                diagnostic report, screenshot, or other support material to
                Lumorix, a provider, a repository, or another recipient, that
                information leaves your device and is governed by the
                recipient&apos;s terms and privacy practices. Review and
                redact diagnostics before sharing them; they may contain file
                paths, operating-system details, extension information,
                prompts, logs, or other local context.
              </p>
              <p className="mt-3">
                If you voluntarily contact Lumorix or open a public issue,
                information you choose to include may become available to the
                recipients or the public. Do not include private code,
                credentials, personal data, or security-sensitive details in a
                public issue. Redact logs and reproduce a problem with a
                minimal example whenever possible.
              </p>
            </div>

            {/* 1.7 */}
            <div>
              <h3 className="text-lg font-semibold text-white">
                1.7 Retention and deletion
              </h3>
              <p className="mt-3">
                Neo does not maintain a Lumorix-hosted copy of your local
                workspace under this local-first design. Local data remains on
                your device until you delete it, uninstall the Application,
                remove the relevant workspace or configuration, or it is
                overwritten by your operating system, backup system, or other
                software. Deleting a local file may not remove copies held in
                backups, version control, caches, crash dumps, logs, or provider
                systems.
              </p>
              <p className="mt-3">
                Data sent to a third-party provider is retained and deleted
                according to that provider&apos;s controls and policies. To
                delete information held by a provider, use that provider&apos;s
                account, privacy, or support process. Lumorix generally cannot
                retrieve, inspect, or delete data that was sent directly from
                your device to a third party.
              </p>
            </div>

            {/* 1.8 */}
            <div>
              <h3 className="text-lg font-semibold text-white">
                1.8 Security responsibilities and limitations
              </h3>
              <p className="mt-3">
                Neo provides approval prompts for agentic tool actions and may
                provide workspace boundaries, command approval, file-diff
                review, tool controls, and other safeguards. Agentic actions
                that require approval are not intended to run silently without
                your review. These safeguards reduce risk but do not guarantee
                that an agent, extension, dependency, script, model, provider,
                or user-approved action will be safe or correct.
              </p>
              <p className="mt-3">
                You are responsible for maintaining a supported operating
                system, applying security updates, using full-disk encryption
                and device lock controls where appropriate, restricting
                workspace permissions, reviewing agent plans and diffs,
                sandboxing untrusted code, verifying package sources, and
                maintaining independent backups. Treat every generated command,
                dependency, patch, and external link as untrusted until
                reviewed and tested.
              </p>
            </div>

            {/* 1.9 */}
            <div>
              <h3 className="text-lg font-semibold text-white">
                1.9 Children and sensitive information
              </h3>
              <p className="mt-3">
                Neo is a developer tool. Do
                not use Neo to process information subject to special legal
                protections unless you have the required authorization,
                safeguards, contracts, and provider configuration. Neo is not
                represented as suitable for processing protected health
                information, payment-card data, government-classified
                information, export-controlled information, or other regulated
                data.
              </p>
            </div>

            {/* 1.10 */}
            <div>
              <h3 className="text-lg font-semibold text-white">
                1.10 Privacy questions
              </h3>
              <p className="mt-3">
                For a privacy question concerning Lumorix or Neo, contact us
                through the official ProjectNeo repository listed below. We may
                need enough information to understand your request, but do not
                send us credentials, complete private repositories, or other
                unnecessary sensitive material.
              </p>
            </div>
          </section>

          <div className="border-t border-zinc-800" />

          {/* 2. Terms of Use */}
          <section className="space-y-8">
            <h2 className="text-2xl font-bold text-white">
              2. Terms of Use
            </h2>

            <p>
              By downloading, installing, accessing, or using Neo, you agree
              to these Terms of Use. If you do not agree, do not install or use
              the Application. If you use Neo on behalf of an organization, you
              represent that you are authorized to accept these terms for that
              organization, and &quot;you&quot; includes that organization.
            </p>

            {/* 2.1 */}
            <div>
              <h3 className="text-lg font-semibold text-white">
                2.1 Eligibility and lawful use
              </h3>
              <p className="mt-3">
                You may use Neo only in compliance with applicable law,
                contract, export controls, sanctions, intellectual-property
                rights, privacy obligations, and the rules of the services you
                connect to it. You must have permission to access every
                workspace, repository, system, account, API, and data source
                that you use with Neo.
              </p>
            </div>

            {/* 2.2 */}
            <div>
              <h3 className="text-lg font-semibold text-white">
                2.2 Agentic actions and human review
              </h3>
              <p className="mt-3">
                Neo may use AI agents to inspect files, propose or apply
                changes, execute commands, call tools, access configured
                services, or perform other development actions. Agentic tool
                actions are presented for your approval before execution where
                the Application requires approval. You remain the
                decision-maker and are responsible for reading the proposed
                action, deciding whether to approve it, supervising the
                result, reviewing changes, testing the result, and reverting
                actions when necessary.
              </p>
              <p className="mt-3">
                Do not grant an agent broader access than necessary. Use
                separate workspaces, branches, accounts, credentials, and
                environments for high-risk work. Never rely on an AI model,
                generated code, or an automated approval as a substitute for
                code review, security review, testing, backups, or professional
                judgment.
              </p>
            </div>

            {/* 2.3 */}
            <div>
              <h3 className="text-lg font-semibold text-white">
                2.3 Prohibited uses
              </h3>
              <p className="mt-3">
                You must not use Neo to:
              </p>
              <ul className="mt-3 list-disc space-y-1.5 pl-6 text-zinc-400">
                <li>Access, alter, destroy, or exfiltrate data without authorization</li>
                <li>Deploy malware, ransomware, spyware, credential theft, or destructive code</li>
                <li>Evade authentication, access controls, rate limits, or security monitoring</li>
                <li>Infringe intellectual-property, privacy, publicity, or other rights</li>
                <li>Process regulated or classified information without appropriate authorization</li>
                <li>Abuse a provider, overload a service, or bypass provider restrictions</li>
                <li>Generate or deploy content that violates applicable law or a connected service&apos;s terms</li>
                <li>Misrepresent AI-generated work as reviewed, tested, or human-authored when it was not</li>
              </ul>
              <p className="mt-3">
                This list is illustrative, not exhaustive. Lumorix may restrict
                distribution or support for uses that create a material legal,
                security, or safety risk.
              </p>
            </div>

            {/* 2.4 */}
            <div>
              <h3 className="text-lg font-semibold text-white">
                2.4 Your content and permissions
              </h3>
              <p className="mt-3">
                You retain your rights in code, files, prompts, instructions,
                documentation, and other content that you create or provide.
                You are responsible for having the rights and permissions
                necessary to use that content with Neo and with any provider
                you select.
              </p>
              <p className="mt-3">
                You grant Lumorix no ownership of your content merely by using
                Neo. A third-party provider may receive content under the
                provider&apos;s own terms when you send a request to that
                provider. You are responsible for reviewing those terms and for
                any license, confidentiality, privacy, or disclosure
                consequences of your configuration.
              </p>
            </div>

            {/* 2.5 */}
            <div>
              <h3 className="text-lg font-semibold text-white">
                2.5 AI-generated output
              </h3>
              <p className="mt-3">
                AI output is probabilistic and may be inaccurate, incomplete,
                biased, insecure, outdated, unavailable, or similar to output
                generated for other users. It may contain vulnerable code,
                license conflicts, hallucinated APIs, destructive commands,
                malicious instructions from untrusted files, or content that
                violates a third party&apos;s rights.
              </p>
              <p className="mt-3">
                You must independently review output for correctness,
                security, privacy, licensing, originality, compatibility,
                performance, and fitness for purpose before relying on it,
                shipping it, or using it in a production or safety-critical
                environment. Lumorix does not guarantee that output is
                original, non-infringing, or suitable for any particular use.
              </p>
            </div>

            {/* 2.6 */}
            <div>
              <h3 className="text-lg font-semibold text-white">
                2.6 Third-party services and software
              </h3>
              <p className="mt-3">
                Neo may include or interoperate with open-source software,
                extensions, runtimes, package managers, model providers, and
                other third-party technology. Those components may be subject
                to separate licenses, notices, acceptable-use rules, service
                limits, pricing, and changes outside Lumorix&apos;s control.
                You must comply with the applicable terms and preserve required
                notices.
              </p>
              <p className="mt-3">
                Lumorix does not endorse, guarantee, or assume responsibility
                for a third-party service, model, package, repository, tool,
                recommendation, or result accessed through Neo.
              </p>
            </div>

            {/* 2.7 */}
            <div>
              <h3 className="text-lg font-semibold text-white">
                2.7 License to the Application
              </h3>
              <p className="mt-3">
                Neo is provided under the license included with the relevant
                ProjectNeo source distribution or release. That license
                controls your rights to use, copy, modify, distribute, and
                sublicense the software. If a component has a separate
                license, that component&apos;s license controls to the extent
                applicable. Nothing in these terms grants rights that the
                applicable software license does not grant.
              </p>
            </div>

            {/* 2.8 */}
            <div>
              <h3 className="text-lg font-semibold text-white">
                2.8 Availability, updates, and changes
              </h3>
              <p className="mt-3">
                Neo may change, be discontinued, lose compatibility, or contain
                defects. Lumorix does not promise uninterrupted availability,
                continued support for a provider or operating system, backward
                compatibility, or that updates will preserve local settings or
                workflows. Updates may introduce security fixes, feature
                changes, dependency changes, or behavior changes. Review release
                notes and maintain backups before updating.
              </p>
            </div>

            {/* 2.9 */}
            <div>
              <h3 className="text-lg font-semibold text-white">
                2.9 Disclaimers
              </h3>
              <p className="mt-3">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, NEO AND ALL RELATED
                MATERIALS ARE PROVIDED &quot;AS IS&quot; AND &quot;AS
                AVAILABLE,&quot; WITHOUT WARRANTIES OF ANY KIND, EXPRESS,
                IMPLIED, OR STATUTORY. LUMORIX DISCLAIMS WARRANTIES OF
                MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE,
                NON-INFRINGEMENT, TITLE, ACCURACY, SECURITY, AND QUIET
                ENJOYMENT.
              </p>
              <p className="mt-3">
                LUMORIX DOES NOT WARRANT THAT NEO, AN AGENT, GENERATED OUTPUT,
                A PROVIDER, OR A CONNECTED SERVICE WILL BE ERROR-FREE, SECURE,
                PRIVATE, UNINTERRUPTED, COMPATIBLE, OR FREE FROM MALWARE OR
                OTHER HARMFUL COMPONENTS. YOU USE AUTOMATED ACTIONS AND
                THIRD-PARTY SERVICES AT YOUR OWN RISK.
              </p>
            </div>

            {/* 2.10 */}
            <div>
              <h3 className="text-lg font-semibold text-white">
                2.10 Limitation of liability
              </h3>
              <p className="mt-3">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, LUMORIX STUDIOS AND
                ITS CONTRIBUTORS, MAINTAINERS, LICENSORS, AND AFFILIATES WILL
                NOT BE LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL,
                EXEMPLARY, OR PUNITIVE DAMAGES, OR FOR LOSS OF DATA, CODE,
                PROFITS, REVENUE, BUSINESS, GOODWILL, SECURITY, OR SYSTEM
                AVAILABILITY, ARISING FROM OR RELATED TO NEO, EVEN IF ADVISED
                OF THE POSSIBILITY OF SUCH DAMAGES.
              </p>
              <p className="mt-3">
                To the extent liability cannot be excluded, the total
                aggregate liability of the foregoing parties will be limited to
                the greater of the amount you paid for Neo in the twelve
                months before the event giving rise to the claim or the minimum
                amount permitted by applicable law. Some jurisdictions do not
                allow certain exclusions or limitations, so some of the
                foregoing terms may not apply to you.
              </p>
            </div>

            {/* 2.11 */}
            <div>
              <h3 className="text-lg font-semibold text-white">
                2.11 Indemnity
              </h3>
              <p className="mt-3">
                To the extent permitted by law, you agree to defend, indemnify,
                and hold harmless Lumorix and its contributors from claims,
                liabilities, damages, losses, and expenses arising from your
                unlawful use of Neo, your breach of these terms, your content,
                your credentials, your connected services, or your violation of
                another person&apos;s rights. This obligation does not apply
                to the extent caused by Lumorix&apos;s own willful misconduct
                or liability that cannot legally be shifted.
              </p>
            </div>

            {/* 2.12 */}
            <div>
              <h3 className="text-lg font-semibold text-white">
                2.12 Suspension and termination
              </h3>
              <p className="mt-3">
                You may stop using Neo at any time. These terms end when you
                permanently stop using the Application, except provisions that
                by their nature should survive, including ownership,
                third-party terms, disclaimers, limitations of liability,
                indemnity, and dispute-related provisions. Lumorix may stop
                distributing or supporting Neo, or restrict access to related
                services, where necessary to address legal, security, abuse,
                or operational risk.
              </p>
            </div>

            {/* 2.13 */}
            <div>
              <h3 className="text-lg font-semibold text-white">
                2.13 Changes to these terms
              </h3>
              <p className="mt-3">
                We may update this page as Neo, its distribution, or its data
                practices change. The latest version will include an updated
                effective date. Your continued use after an update means that
                you accept the updated terms to the extent permitted by law.
                If a change materially affects your rights, review the updated
                text before continuing to use Neo.
              </p>
            </div>
          </section>

          <div className="border-t border-zinc-800" />

          {/* 3. Lumorix Studios and contact */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-white">
              3. Lumorix Studios and contact
            </h2>
            <p>
              Questions, security reports, and project-related inquiries can be
              submitted through the official ProjectNeo repository. For a
              suspected security issue, avoid public disclosure of exploit
              details or credentials until a private reporting channel is
              available.
            </p>
            <p className="text-sm text-zinc-500">
              ProjectNeo
              <br />
              Lumorix Studios
              <br />
              GitHub: Lumorix-studios/Neo
            </p>
          </section>

          <section className="rounded-lg border border-amber-900/60 bg-amber-950/20 p-5 text-sm leading-6 text-amber-100">
            <h2 className="font-semibold text-amber-200">Release note</h2>
            <p className="mt-2">
              LUMORIX-STUDIOS IS NOT A LEGAL ENTITY. IT IS MERELY A NAME USED TO HOST AND ORGANIZE PROJECTNEO AND RELATED REPOSITORIES IN GITHUB.
            </p>
          </section>
        </article>
      </div>
    </main>
  );
}