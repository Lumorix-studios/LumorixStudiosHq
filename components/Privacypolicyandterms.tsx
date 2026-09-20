export default function Legal() {
  return (
    <main className="bg-zinc-950 text-zinc-300">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <article className="space-y-12">
          <header className="border-b border-zinc-800 pb-8">
            <p className="mb-3 text-sm font-medium uppercase tracking-widest text-zinc-500">
              Lumorix Studios · ProjectNeo
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Privacy Policy &amp; Terms of Use
            </h1>
            <p className="mt-4 text-sm text-zinc-500">
              Effective date: September 19, 2026
              <br />
              Last updated: September 19, 2026
            </p>
          </header>

          <section className="rounded-lg border border-emerald-900/60 bg-emerald-950/20 p-5 text-sm leading-6 text-emerald-100">
            <h2 className="font-semibold text-emerald-200">
              Plain-language summary
            </h2>
            <p className="mt-2">
              ProjectNeo is a local-first, agentic integrated development
              environment connected to a Lumorix-operated backend for account
              management, subscription plans, entitlement checks, and certain
              AI-provider requests. Your local workspace, source files, local
              model activity, and local agent data are intended to remain on
              your device when you use local features. Account and service
              information is processed by the backend so that accounts,
              subscriptions, and connected provider features can function.
            </p>
            <p className="mt-3">
              If you use a cloud AI provider through Neo, including a provider
              such as OpenRouter, the request may pass through Lumorix
              infrastructure before being sent to the provider. Depending on
              the feature and configuration, this can include prompts, code
              context, tool results, model settings, request metadata, and an
              API key or provider credential. Data may also be collected and
              used for service training, evaluation, security, and improvement.
            </p>
            <p className="mt-3">
              We use reasonable technical and organizational safeguards, but no
              online service, local application, storage system, provider, or
              security measure can be guaranteed to be completely safe. Do not
              submit secrets, regulated information, or confidential material
              unless you are authorized to do so and have accepted the relevant
              data-processing risks.
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
              Lumorix Studios is the GitHub organization name used to host and
              organize ProjectNeo and related repositories; it is not, by this
              statement alone, a representation that Lumorix Studios is a
              separate incorporated legal entity. The person or organization
              legally operating the service should be identified in the
              applicable purchase, account, or commercial documentation.
            </p>

            <p>
              This policy applies to the Application, the account and service
              backend, subscription and plan features, provider-routing
              features, and any website or documentation that links to this
              policy. A feature-specific notice or consent screen may provide
              additional information. If it conflicts with this policy for a
              particular feature, the more specific notice controls for that
              feature.
            </p>

            {/* 1.1 */}
            <div>
              <h3 className="text-lg font-semibold text-white">
                1.1 What data is local and what data is online
              </h3>
              <p className="mt-3">
                Neo uses two kinds of processing. Local processing occurs on
                your device and may include opening workspaces, editing files,
                running a local model, maintaining local agent history,
                executing local tools, and recording local diagnostics.
                Online processing occurs when you use account management,
                subscription services, backend-routed provider calls, or
                another feature that requires network communication.
              </p>
              <p className="mt-3">
                Local-first does not mean that every feature is offline. A
                local model can run without sending its prompt or workspace to
                a remote model provider, but account, subscription, and
                backend-routed AI features necessarily involve the relevant
                Lumorix systems and, where applicable, third-party systems.
                Review the feature description and network destination before
                using a feature with confidential content.
              </p>
            </div>

            {/* 1.2 */}
            <div>
              <h3 className="text-lg font-semibold text-white">
                1.2 Information collected for accounts
              </h3>
              <p className="mt-3">
                To create, authenticate, secure, and maintain an account, we
                may collect and process information such as:
              </p>
              <ul className="mt-3 list-disc space-y-1.5 pl-6 text-zinc-400">
                <li>Email address, username, account identifier, and profile information</li>
                <li>Authentication records, login events, session data, and security signals</li>
                <li>Account preferences, feature settings, and consent choices</li>
                <li>Plan, subscription, entitlement, usage-limit, and account-status information</li>
                <li>Communications that you send to support or through the service</li>
              </ul>
              <p className="mt-3">
                We use this information to provide account access, protect
                accounts, enforce plan limits, provide support, communicate
                service notices, prevent abuse, and maintain the Application.
              </p>
            </div>

            {/* 1.3 */}
            <div>
              <h3 className="text-lg font-semibold text-white">
                1.3 Subscription and billing information
              </h3>
              <p className="mt-3">
                If you purchase or subscribe to a paid plan, we may process
                subscription status, plan selection, renewal or cancellation
                status, invoices, transaction identifiers, tax or billing
                information, and records needed to provide the plan. Payment
                card numbers and other payment credentials may be collected
                and processed by a payment processor rather than stored
                directly by Lumorix. The processor&apos;s own privacy policy
                and terms apply to payment processing.
              </p>
              <p className="mt-3">
                Subscription information may be linked to your account so that
                Neo can enable the selected plan, including the free plan,
                paid features, usage limits, and local-model availability. We
                do not treat a paid subscription as a transfer of ownership in
                Neo or in your content.
              </p>
            </div>

            {/* 1.4 */}
            <div>
              <h3 className="text-lg font-semibold text-white">
                1.4 Information processed on your device
              </h3>
              <p className="mt-3">
                Depending on the features and permissions you use, Neo may
                create, read, modify, index, or otherwise process the following
                information locally:
              </p>
              <ul className="mt-3 list-disc space-y-1.5 pl-6 text-zinc-400">
                <li>Source code, repositories, project files, and file paths</li>
                <li>Prompts, instructions, agent plans, and local conversation history</li>
                <li>Generated code, patches, build output, logs, and diagnostics</li>
                <li>Editor preferences, workspace settings, and local metadata</li>
                <li>Local model inputs, outputs, weights, caches, and runtime data</li>
                <li>Provider configuration and credentials stored at your direction</li>
                <li>Local extension, tool, terminal, and automation configuration</li>
              </ul>
              <p className="mt-3">
                When you use a local model and do not invoke an online
                provider or backend feature, the model computation is intended
                to occur on your device. Local data can still be exposed by
                your operating system, backups, extensions, malware, device
                access, or other software installed on your device.
              </p>
            </div>

            {/* 1.5 */}
            <div>
              <h3 className="text-lg font-semibold text-white">
                1.5 Backend-routed AI requests
              </h3>
              <p className="mt-3">
                Neo may use the Lumorix backend to call AI providers on your
                behalf or to manage the credentials required for those calls.
                Providers may include OpenRouter and other providers that are
                made available through Neo. When you invoke a backend-routed AI
                feature, the backend may receive or generate a request
                containing:
              </p>
              <ul className="mt-3 list-disc space-y-1.5 pl-6 text-zinc-400">
                <li>Your account or session identifier</li>
                <li>Prompt text, selected files, code context, and conversation history</li>
                <li>Tool results, agent instructions, model settings, and requested actions</li>
                <li>IP address, timestamps, request identifiers, device information, and error data</li>
                <li>Provider API keys, access tokens, or other credentials needed to complete the call</li>
              </ul>
              <p className="mt-3">
                The actual payload depends on the provider, model, Neo
                configuration, and action you choose. A backend-routed request
                can leave your device even when your project itself is stored
                locally. Do not assume that selecting a provider in Neo makes
                the request local or private from that provider.
              </p>
              <p className="mt-3">
                Third-party providers independently determine how they retain,
                review, use, secure, transfer, or delete requests. OpenRouter
                and each underlying model provider may have separate policies,
                routing behavior, subprocessors, and data-use controls. Review
                the applicable provider terms before sending confidential,
                regulated, personal, or customer information.
              </p>
            </div>

            {/* 1.6 */}
            <div>
              <h3 className="text-lg font-semibold text-white">
                1.6 API keys and credentials
              </h3>
              <p className="mt-3">
                API keys, access tokens, OAuth tokens, SSH keys, environment
                variables, and similar credentials are sensitive information.
                Depending on the integration, a credential may be stored
                locally, transmitted to the Lumorix backend for protected
                provider calling, or passed to a provider. The relevant
                storage and transmission behavior should be disclosed in the
                integration interface.
              </p>
              <p className="mt-3">
                Lumorix uses reasonable safeguards intended to restrict
                unauthorized access to credentials and backend data. No
                storage or transmission method is guaranteed to be completely
                secure. Use least-privilege keys, provider spending limits,
                separate development credentials, key rotation, and immediate
                revocation after suspected exposure. Never commit credentials
                to a repository or place them in source files, prompts, issue
                reports, screenshots, or logs.
              </p>
            </div>

            {/* 1.7 */}
            <div>
              <h3 className="text-lg font-semibold text-white">
                1.7 Training, evaluation, and service improvement
              </h3>
              <p className="mt-3">
                Data collected through the Application or backend may be used
                for training, evaluation, abuse prevention, quality assurance,
                debugging, security analysis, and improvement of Neo and
                related services. Depending on the feature, this may include
                account and usage data, prompts, model responses, tool
                activity, request metadata, diagnostics, feedback, and
                provider-call records.
              </p>
              <p className="mt-3">
                Training or improvement processing may involve human or
                automated review, filtering, de-identification, aggregation,
                sampling, retention, and access by authorized service
                personnel or service providers. We attempt to apply
                safeguards appropriate to the data and purpose, but
                de-identification and security controls are not perfect and
                cannot guarantee that information will never be exposed,
                re-identified, misused, or accessed without authorization.
              </p>
              <p className="mt-3">
                Do not submit trade secrets, passwords, API keys, personal
                information, regulated data, or confidential source code for
                training or improvement unless you have the right to do so and
                have accepted the associated risks. Where Neo presents a
                separate training, feedback, or data-use choice, that choice
                controls the applicable collection and use for that feature.
              </p>
            </div>

            {/* 1.8 */}
            <div>
              <h3 className="text-lg font-semibold text-white">
                1.8 Usage data, logs, and crash handling
              </h3>
              <p className="mt-3">
                The backend may collect service logs and operational metadata
                needed to authenticate accounts, enforce subscriptions, route
                provider calls, measure usage, investigate abuse, troubleshoot
                failures, and improve reliability. This may include timestamps,
                request identifiers, feature usage, model and provider
                selections, response status, latency, IP address, device or
                application version, and error information.
              </p>
              <p className="mt-3">
                Neo may also include a local crash handler that records crash
                information on your device. The crash handler does not
                automatically make a local crash report available to Lumorix
                unless the product implementation expressly sends it. If you
                export or submit a crash report, log, screenshot, or diagnostic
                file, review and redact it first because it may contain file
                paths, prompts, code fragments, extension details, or other
                local context.
              </p>
            </div>

            {/* 1.9 */}
            <div>
              <h3 className="text-lg font-semibold text-white">
                1.9 Network requests and third-party services
              </h3>
              <p className="mt-3">
                In addition to Lumorix systems, Neo may interact with services
                that you choose or that are required by a connected feature,
                including:
              </p>
              <ul className="mt-3 list-disc space-y-1.5 pl-6 text-zinc-400">
                <li>AI model and inference providers, including OpenRouter where supported</li>
                <li>Payment processors and subscription infrastructure</li>
                <li>Git hosting, issue tracking, or source-control services</li>
                <li>Package registries, dependency indexes, and update services</li>
                <li>Documentation, browser, search, or web-fetch services</li>
                <li>Operating-system, runtime, and extension services</li>
              </ul>
              <p className="mt-3">
                These services are independent third parties. Their collection,
                use, retention, international transfer, and security practices
                are governed by their own notices and terms. Lumorix does not
                control a third party&apos;s processing after a request is
                delivered to that third party.
              </p>
            </div>

            {/* 1.10 */}
            <div>
              <h3 className="text-lg font-semibold text-white">
                1.10 Retention and deletion
              </h3>
              <p className="mt-3">
                We retain account, subscription, security, service, provider,
                and training-related data for as long as reasonably necessary
                for the purposes described in this policy, to provide the
                service, comply with legal obligations, resolve disputes,
                enforce agreements, prevent abuse, maintain backups, and
                improve the service. Actual retention periods may differ by
                data type, plan, provider, legal requirement, and operational
                need.
              </p>
              <p className="mt-3">
                You may be able to delete local project data directly from
                your device and may request account or service-data deletion
                through the available account controls or official support
                channel. Deletion may not immediately remove information from
                backups, security records, fraud-prevention systems, legal
                records, provider systems, or previously created
                de-identified or aggregated training materials where retention
                is permitted by law.
              </p>
              <p className="mt-3">
                Data sent to an external AI provider is also governed by that
                provider&apos;s retention and deletion controls. Lumorix may
                not be able to retrieve or delete information held by a
                provider that received a request.
              </p>
            </div>

            {/* 1.11 */}
            <div>
              <h3 className="text-lg font-semibold text-white">
                1.11 Security and its limitations
              </h3>
              <p className="mt-3">
                Neo may use account authentication, authorization controls,
                approval prompts, workspace boundaries, command approval,
                file-diff review, protected credential handling, logging,
                monitoring, and other safeguards. Agentic actions that require
                approval are intended to be presented for your review before
                execution. These controls reduce risk but cannot guarantee
                that an agent, extension, dependency, script, model, provider,
                account, backend, or user-approved action will be safe, private,
                uninterrupted, or correct.
              </p>
              <p className="mt-3">
                You are responsible for using a supported operating system,
                applying security updates, protecting your account, enabling
                device security, reviewing agent actions and network
                destinations, restricting workspace permissions, checking
                generated code, sandboxing untrusted code, verifying package
                sources, and maintaining independent backups. Report suspected
                vulnerabilities privately through the official project
                channel when possible and do not include credentials in a
                report.
              </p>
            </div>

            {/* 1.12 */}
            <div>
              <h3 className="text-lg font-semibold text-white">
                1.12 Children and sensitive information
              </h3>
              <p className="mt-3">
                Neo is a developer tool and is not directed to children. Do
                not use Neo or its backend to process protected health
                information, payment-card data, government-classified
                information, export-controlled information, or other regulated
                data unless you have confirmed the required authorization,
                contracts, safeguards, provider configuration, and legal basis.
                Lumorix does not represent Neo as compliant with any particular
                regulatory framework merely because safeguards are provided.
              </p>
            </div>

            {/* 1.13 */}
            <div>
              <h3 className="text-lg font-semibold text-white">
                1.13 Privacy rights and requests
              </h3>
              <p className="mt-3">
                Depending on where you live and subject to applicable
                exceptions, you may have rights to request access,
                correction, deletion, restriction, portability, or objection
                regarding certain personal information. Requests may require
                account verification and may be limited by legal, security,
                provider, backup, or operational requirements. Submit requests
                through the official ProjectNeo support or repository channel
                listed below. Do not send passwords, API keys, or complete
                private repositories with a request.
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
              By downloading, installing, accessing, creating an account for,
              subscribing to, or using Neo or its backend, you agree to these
              Terms of Use. If you do not agree, do not use the Application or
              related service. If you use Neo for an organization, you
              represent that you are authorized to accept these terms for that
              organization.
            </p>

            {/* 2.1 */}
            <div>
              <h3 className="text-lg font-semibold text-white">
                2.1 Accounts and account security
              </h3>
              <p className="mt-3">
                You must provide accurate information, keep your account
                information current, protect your credentials, and promptly
                report unauthorized access. You are responsible for activity
                performed through your account unless applicable law provides
                otherwise. Do not share an account, bypass account controls, or
                create accounts to evade a restriction, plan limit, payment
                obligation, or security measure.
              </p>
            </div>

            {/* 2.2 */}
            <div>
              <h3 className="text-lg font-semibold text-white">
                2.2 Plans, free access, and subscriptions
              </h3>
              <p className="mt-3">
                Neo may provide a free plan and one or more paid subscription
                plans. Features, limits, model availability, storage, usage,
                provider access, and eligibility may differ by plan and may
                change over time. Local model execution is included in the
                free plan as described by the current product documentation,
                but hardware requirements, model availability, performance,
                and local storage requirements are your responsibility.
              </p>
              <p className="mt-3">
                Paid subscriptions may be subject to pricing, taxes, billing
                cycles, renewals, cancellation rules, refunds, payment
                processor terms, and plan-specific conditions displayed at
                purchase. A plan does not grant unlimited or unrestricted use
                of third-party AI providers, models, tokens, bandwidth, or
                backend resources.
              </p>
            </div>

            {/* 2.3 */}
            <div>
              <h3 className="text-lg font-semibold text-white">
                2.3 Provider API calls and charges
              </h3>
              <p className="mt-3">
                If you connect an API provider, you authorize Neo and its
                backend to make the provider calls enabled by your
                configuration. You are responsible for having the necessary
                rights to use the provider, complying with its terms, and
                paying any provider charges associated with your account or
                credentials. A provider may change its models, pricing,
                limits, availability, routing, retention, or acceptable-use
                rules without control by Lumorix.
              </p>
              <p className="mt-3">
                Review every destination, model, prompt, selected file,
                requested tool action, and expected cost before approving an
                operation. Lumorix is not responsible for provider charges,
                inaccurate output, provider downtime, provider retention, or
                actions taken by a provider under its own terms.
              </p>
            </div>

            {/* 2.4 */}
            <div>
              <h3 className="text-lg font-semibold text-white">
                2.4 Agentic actions and human review
              </h3>
              <p className="mt-3">
                Neo may use AI agents to inspect files, propose or apply
                changes, execute commands, call tools, access configured
                services, and perform other development actions. Agentic tool
                actions are presented for your approval before execution where
                the Application requires approval. You remain responsible for
                reading the proposed action, deciding whether to approve it,
                supervising the result, reviewing changes, testing the result,
                and reverting actions when necessary.
              </p>
              <p className="mt-3">
                Approval is not a guarantee of safety. Do not grant an agent
                broader access than necessary, and do not treat a model,
                generated code, approval prompt, or automated workflow as a
                substitute for code review, security review, testing, backups,
                or professional judgment.
              </p>
            </div>

            {/* 2.5 */}
            <div>
              <h3 className="text-lg font-semibold text-white">
                2.5 Your content and permissions
              </h3>
              <p className="mt-3">
                You retain your rights in code, files, prompts, instructions,
                documentation, and other content that you create or provide,
                subject to third-party rights and the licenses that apply to
                that content. You are responsible for having the rights,
                permissions, notices, and legal authority required to use that
                content with Neo, the backend, and every provider you select.
              </p>
              <p className="mt-3">
                By submitting content to a backend feature, you grant Lumorix
                the limited rights necessary to host, store, transmit,
                process, secure, display, analyze, evaluate, train, and
                improve the service as described in this policy. This does not
                transfer ownership of your content to Lumorix. Third-party
                providers may receive content under their own terms when you
                use a provider integration.
              </p>
            </div>

            {/* 2.6 */}
            <div>
              <h3 className="text-lg font-semibold text-white">
                2.6 AI-generated output
              </h3>
              <p className="mt-3">
                AI output is probabilistic and may be inaccurate, incomplete,
                biased, insecure, outdated, unavailable, similar to output
                generated for other users, or unsuitable for your purpose. It
                may contain vulnerable code, license conflicts, hallucinated
                APIs, destructive commands, malicious instructions from
                untrusted files, or content that violates a third party&apos;s
                rights.
              </p>
              <p className="mt-3">
                You must independently review output for correctness, security,
                privacy, licensing, originality, compatibility, performance,
                and fitness for purpose before relying on it, shipping it, or
                using it in production or a safety-critical environment.
                Lumorix does not guarantee that output is original,
                non-infringing, secure, or suitable for any particular use.
              </p>
            </div>

            {/* 2.7 */}
            <div>
              <h3 className="text-lg font-semibold text-white">
                2.7 Application license
              </h3>
              <p className="mt-3">
                Neo is licensed under the custom license published in the
                ProjectNeo GitHub repository&apos;s{" "}
                <code className="rounded bg-zinc-900 px-1.5 py-0.5 text-zinc-200">
                  LICENSE.md
                </code>
                . That file is the authoritative source for the permissions,
                restrictions, attribution requirements, commercial-use terms,
                modification rights, distribution rights, warranty
                disclaimers, and other license conditions applicable to Neo.
              </p>
              <p className="mt-3">
                These Terms of Use do not replace, expand, or restrict rights
                granted by the custom license except for the separate use of
                the hosted account, subscription, backend, and provider
                features. If these Terms conflict with the applicable software
                license regarding the licensed source code, the applicable
                license controls.
              </p>
            </div>

            {/* 2.8 */}
            <div>
              <h3 className="text-lg font-semibold text-white">
                2.8 Third-party services and software
              </h3>
              <p className="mt-3">
                Neo may include or interoperate with open-source software,
                extensions, runtimes, package managers, model providers,
                OpenRouter, payment processors, and other third-party
                technology. Those components may be subject to separate
                licenses, notices, acceptable-use rules, pricing, service
                limits, and changes outside Lumorix&apos;s control. You must
                comply with all applicable terms and preserve required notices.
              </p>
              <p className="mt-3">
                Lumorix does not endorse, guarantee, or assume responsibility
                for a third-party service, model, package, repository, tool,
                recommendation, routing decision, or result accessed through
                Neo.
              </p>
            </div>

            {/* 2.9 */}
            <div>
              <h3 className="text-lg font-semibold text-white">
                2.9 Acceptable use
              </h3>
              <p className="mt-3">
                You must not use Neo or its backend to:
              </p>
              <ul className="mt-3 list-disc space-y-1.5 pl-6 text-zinc-400">
                <li>Access, alter, destroy, or exfiltrate data without authorization</li>
                <li>Deploy malware, ransomware, spyware, credential theft, or destructive code</li>
                <li>Evade authentication, access controls, rate limits, or security monitoring</li>
                <li>Infringe intellectual-property, privacy, publicity, or other rights</li>
                <li>Process regulated or classified information without required authorization</li>
                <li>Abuse a provider, overload a service, or bypass provider restrictions</li>
                <li>Use automated calls to create unreasonable cost, load, or security risk</li>
                <li>Generate or deploy content that violates applicable law or a connected service&apos;s terms</li>
                <li>Misrepresent AI-generated work as reviewed, tested, or human-authored when it was not</li>
              </ul>
              <p className="mt-3">
                This list is illustrative, not exhaustive. Lumorix may
                suspend access or restrict distribution where necessary to
                address legal, payment, security, abuse, or operational risk.
              </p>
            </div>

            {/* 2.10 */}
            <div>
              <h3 className="text-lg font-semibold text-white">
                2.10 Availability, updates, and changes
              </h3>
              <p className="mt-3">
                Neo and the backend may change, be discontinued, lose
                compatibility, experience outages, or contain defects. Lumorix
                does not promise uninterrupted availability, continued support
                for a provider or operating system, backward compatibility,
                preservation of local settings, or preservation of hosted
                account or training data beyond applicable retention
                requirements.
              </p>
              <p className="mt-3">
                Updates may introduce security fixes, feature changes,
                dependency changes, plan changes, provider changes, or
                behavior changes. Review release notes, maintain backups, and
                verify changes before using an update in a sensitive
                environment.
              </p>
            </div>

            {/* 2.11 */}
            <div>
              <h3 className="text-lg font-semibold text-white">
                2.11 Disclaimers
              </h3>
              <p className="mt-3">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, NEO, THE BACKEND, THE
                FREE AND PAID PLANS, PROVIDER ROUTING, AND ALL RELATED
                MATERIALS ARE PROVIDED &quot;AS IS&quot; AND &quot;AS
                AVAILABLE,&quot; WITHOUT WARRANTIES OF ANY KIND, EXPRESS,
                IMPLIED, OR STATUTORY. LUMORIX DISCLAIMS WARRANTIES OF
                MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE,
                NON-INFRINGEMENT, TITLE, ACCURACY, SECURITY, AVAILABILITY, AND
                QUIET ENJOYMENT.
              </p>
              <p className="mt-3">
                LUMORIX DOES NOT WARRANT THAT NEO, THE BACKEND, AN AGENT,
                GENERATED OUTPUT, A PROVIDER, A LOCAL MODEL, OR A CONNECTED
                SERVICE WILL BE ERROR-FREE, SECURE, PRIVATE, UNINTERRUPTED,
                COMPATIBLE, OR FREE FROM MALWARE OR OTHER HARMFUL COMPONENTS.
                NO REPRESENTATION THAT DATA IS &quot;PROTECTED&quot; MEANS THAT
                DATA IS GUARANTEED TO BE 100% SAFE.
              </p>
            </div>

            {/* 2.12 */}
            <div>
              <h3 className="text-lg font-semibold text-white">
                2.12 Limitation of liability
              </h3>
              <p className="mt-3">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, LUMORIX STUDIOS AND
                ITS CONTRIBUTORS, MAINTAINERS, LICENSORS, SERVICE PROVIDERS,
                AND AFFILIATES WILL NOT BE LIABLE FOR INDIRECT, INCIDENTAL,
                SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES, OR FOR
                LOSS OF DATA, CODE, PROFITS, REVENUE, BUSINESS, GOODWILL,
                SECURITY, SUBSCRIPTION VALUE, PROVIDER CREDITS, OR SYSTEM
                AVAILABILITY, ARISING FROM OR RELATED TO NEO, THE BACKEND, A
                PLAN, A PROVIDER, OR THESE TERMS, EVEN IF ADVISED OF THE
                POSSIBILITY OF SUCH DAMAGES.
              </p>
              <p className="mt-3">
                To the extent liability cannot be excluded, total aggregate
                liability will be limited to the greater of the amount you paid
                for the relevant Lumorix service in the twelve months before
                the event giving rise to the claim or the minimum amount
                permitted by applicable law. Some jurisdictions do not allow
                certain exclusions or limitations, so some terms may not apply
                to you.
              </p>
            </div>

            {/* 2.13 */}
            <div>
              <h3 className="text-lg font-semibold text-white">
                2.13 Indemnity
              </h3>
              <p className="mt-3">
                To the extent permitted by law, you agree to defend, indemnify,
                and hold harmless Lumorix and its contributors from claims,
                liabilities, damages, losses, and expenses arising from your
                unlawful use of Neo, breach of these terms, content, account,
                credentials, provider use, subscription activity, or violation
                of another person&apos;s rights. This obligation does not
                apply to the extent caused by liability that cannot legally be
                shifted.
              </p>
            </div>

            {/* 2.14 */}
            <div>
              <h3 className="text-lg font-semibold text-white">
                2.14 Suspension and termination
              </h3>
              <p className="mt-3">
                You may stop using Neo at any time and may cancel a
                subscription subject to the applicable purchase terms. Lumorix
                may suspend or terminate an account, subscription, backend
                access, or provider feature for nonpayment, abuse, security
                risk, legal requirements, violation of these terms, or
                operational reasons. Suspension may occur while an issue is
                investigated. Local software and data may remain on your
                device after hosted access ends.
              </p>
              <p className="mt-3">
                Provisions that by their nature should survive termination,
                including ownership, license conditions, third-party terms,
                data-use rights for data already collected, disclaimers,
                limitations of liability, indemnity, and dispute-related
                provisions, will survive.
              </p>
            </div>

            {/* 2.15 */}
            <div>
              <h3 className="text-lg font-semibold text-white">
                2.15 Changes to this policy and terms
              </h3>
              <p className="mt-3">
                We may update this page as Neo, the backend, plans, provider
                integrations, or data practices change. The latest version will
                include an updated date. Where required by law, we will provide
                additional notice or obtain consent for material changes. Your
                continued use after an update means that you accept the
                updated terms to the extent permitted by law.
              </p>
            </div>
          </section>

          <div className="border-t border-zinc-800" />

          {/* 3. Contact and repository license */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-white">
              3. Contact and repository license
            </h2>
            <p>
              Questions, privacy requests, security reports, billing
              questions, and project-related inquiries can be submitted through
              the official ProjectNeo repository or the support channel
              provided with your account. For a suspected security issue, do
              not publicly disclose exploit details, private code, or
              credentials until a private reporting channel is available.
            </p>
            <p>
              The custom software license for Neo is available in the GitHub
              repository file{" "}
              <code className="rounded bg-zinc-900 px-1.5 py-0.5 text-zinc-200">
                LICENSE.md
              </code>
              . Read that file before copying, modifying, distributing,
              commercially using, or creating a derivative of Neo.
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
              This page is product-language drafting, not legal advice. Before
              publishing it as a binding policy, have qualified counsel adapt
              it to the actual legal operator, supported jurisdictions,
              subscription and refund rules, payment processor, provider
              agreements, training-data controls, account-deletion process,
              security practices, open-source or custom license, and applicable
              consumer laws. Every statement must match the implementation.
              In particular, do not claim that a key is encrypted, a request
              is deleted, a provider is not used for training, or a local
              feature is offline unless the product actually enforces that
              behavior.
            </p>
          </section>
        </article>
      </div>
    </main>
  );
}