import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const docGroups = [
  {
    label: "Introduction",
    items: [
      { id: "what-is-neo", label: "What is Neo?" },
      { id: "how-to-add-agents", label: "How to add agents" },
    ],
  },
  {
    label: "The agent",
    items: [
      { id: "agentic-tools", label: "Agent & filesystem tools" },
      { id: "change-review", label: "Reviewing changes" },
    ],
  },
  {
    label: "Workspace",
    items: [
      { id: "editor", label: "Code editor" },
      { id: "terminal", label: "Integrated terminal" },
    ],
  },
  {
    label: "AI & extensibility",
    items: [
      { id: "providers", label: "Model providers" },
      { id: "mcp", label: "MCP support" },
    ],
  },
  {
    label: "Reference",
    items: [
      { id: "shortcuts", label: "Keyboard shortcuts" },
      { id: "privacy", label: "Privacy & local data" },
    ],
  },
  {
    label: "Development",
    items: [
      { id: "building", label: "Building from source" },
      { id: "status", label: "Project status" },
    ],
  },
];

const shortcuts = [
  { keys: "Ctrl+B", action: "Toggle AI settings sidebar" },
  { keys: "Ctrl+Shift+H", action: "Toggle chat history" },
  { keys: "Ctrl+Shift+P", action: "Open command palette" },
  { keys: "Ctrl+Shift+E", action: "Toggle code editor" },
  { keys: "Ctrl+S", action: "Save active file" },
];

const agentTools = [
  "read_file",
  "read_file_range",
  "write_file",
  "append_file",
  "replace_in_file",
  "delete_file",
  "delete_dir",
  "create_dir",
  "list_dir",
  "search_files",
  "rename",
];

const providerConfig = [
  "API keys",
  "Model names",
  "Base URLs",
  "System prompts",
  "Provider-specific configuration",
];

const devRequirements = ["Node.js", "npm", "Rust", "Cargo", "Tauri prerequisites", "Git"];

function CodeBlock({ children, label }: { children: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(children);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900">
      <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-2">
        <span className="text-xs text-zinc-500">{label ?? "Terminal"}</span>
        <button
          type="button"
          onClick={copy}
          className="rounded-md px-2 py-1 text-xs font-medium text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-sm leading-6 text-zinc-300">
        <code>{children}</code>
      </pre>
    </div>
  );
}

export default function Documentation() {
  const [openGroup, setOpenGroup] = useState<string | null>(docGroups[0].label);
  const [activeId, setActiveId] = useState<string>("what-is-neo");

  // Keep the sidebar group open for whichever section is in view.
  // activeId is event-driven (IntersectionObserver), so derive the visible
  // group during render instead of syncing it in a second effect.
  const activeGroupLabel =
    docGroups.find((group) =>
      group.items.some((item) => item.id === activeId)
    )?.label ?? docGroups[0].label;
  const visibleGroup = openGroup ?? activeGroupLabel;

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    window.history.replaceState(null, "", `#${id}`);
  };

  // Support deep links like /documentation#terminal
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.slice(1);
      window.setTimeout(() => scrollToSection(id), 50);
    }
  }, []);

  // Scroll spy: highlight the sidebar entry for the section in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-15% 0px -70% 0px" }
    );

    docGroups.forEach((group) =>
      group.items.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      })
    );

    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-zinc-950 text-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="lg:grid lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-14">

          {/* Sidebar */}
          <aside className="hidden lg:block">
            <nav aria-label="Documentation sections" className="sticky top-24 space-y-1">
              {docGroups.map((group) => {
                const open = visibleGroup === group.label;
                return (
                  <div key={group.label}>
                    <button
                      type="button"
                      onClick={() => setOpenGroup(open ? null : group.label)}
                      aria-expanded={open}
                      className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${
                        open
                          ? "text-white"
                          : "text-zinc-400 hover:text-zinc-200"
                      }`}
                    >
                      {group.label}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className={`h-4 w-4 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                      </svg>
                    </button>

                    {open && (
                      <ul className="ml-4 mt-1 space-y-0.5 border-l border-zinc-800 pl-2">
                        {group.items.map(({ id, label }) => (
                          <li key={id}>
                            <a
                              href={`#${id}`}
                              onClick={(e) => {
                                e.preventDefault();
                                scrollToSection(id);
                              }}
                              className={`block rounded-md px-3 py-1.5 text-sm transition-colors ${
                                activeId === id
                                  ? "bg-zinc-800/80 text-white"
                                  : "text-zinc-500 hover:bg-zinc-800/50 hover:text-zinc-300"
                              }`}
                            >
                              {label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
            </nav>
          </aside>

          {/* Content */}
          <div className="min-w-0">

            {/* Mobile quick nav: same links as the sidebar, no JS needed */}
            <nav aria-label="On this page" className="mb-10 flex flex-wrap gap-2 lg:hidden">
              {docGroups.flatMap((group) =>
                group.items.map(({ id, label }) => (
                  <a
                    key={id}
                    href={`#${id}`}
                    className="rounded-full border border-zinc-800 bg-zinc-900/60 px-3 py-1.5 text-xs font-medium text-zinc-300 transition hover:border-zinc-600 hover:text-white"
                  >
                    {label}
                  </a>
                ))
              )}
            </nav>

        {/* Header */}
        <div className="max-w-2xl">
          <p className="mb-2 text-sm font-medium tracking-wide text-zinc-500 uppercase">
            ProjectNeo
          </p>

          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Documentation
          </h1>

          <p className="mt-5 text-lg leading-relaxed text-zinc-400 sm:text-xl">
            Everything you need to know about Neo — what it does, how to set
            it up, and how to get the most out of the agent.
          </p>
        </div>

        {/* Sections */}
        <div className="mt-16 space-y-16 sm:mt-20 sm:space-y-20">

          {/* What is Neo */}
          <section id="what-is-neo" className="scroll-mt-24">
            <h2 className="text-xl font-semibold sm:text-2xl">
              What is Neo?
            </h2>

            <div className="mt-4 space-y-4 leading-7 text-zinc-400">
              <p>
                Neo is a lightweight agentic coding environment built with
                React, TypeScript, Tauri, and Rust. It combines an integrated
                code editor, an AI agent, filesystem tools, Git integration,
                terminals, debugging infrastructure, MCP support, and
                configurable model providers — including locally hosted models
                — into a single desktop application for Windows and Linux.
              </p>

              <p>
                Instead of being a chat box bolted onto an editor, Neo lets
                models interact with your project through controlled tools.
                The agent can inspect files, search your workspace, propose
                and apply modifications, and work with Git while you stay in
                control of every change.
              </p>

              <p>
                Neo is designed around local data ownership and
                user-controlled AI infrastructure. There is no Neo-operated
                cloud service storing your conversations, configuration, or
                project data — everything lives on your machine.
              </p>
            </div>
          </section>

          {/* Getting started */}
          <section id="how-to-add-agents" className="scroll-mt-24">
            <h2 className="text-xl font-semibold sm:text-2xl" >
              Getting started
            </h2>

            <div className="mt-4 space-y-4 leading-7 text-zinc-400">
              <ol className="list-decimal space-y-3 pl-5">
                <li>
                  <span className="font-medium text-zinc-200">
                    Install Neo.
                  </span>{" "}
                  Grab the latest release for Windows or Linux from the{" "}
                  <Link
                    to="/downloads"
                    className="text-white underline decoration-zinc-600 underline-offset-4 transition hover:decoration-zinc-300"
                  >
                    Downloads page
                  </Link>
                  .
                </li>
                <li>
                  <span className="font-medium text-zinc-200" >
                    Open a workspace.
                  </span>{" "}
                  Neo works on folder-based workspaces. Open your project
                  folder and the file explorer, editor, and agent all operate
                  inside it.
                </li>
                <li>
                  <span className="font-medium text-zinc-200" >
                    Configure a model provider.
                  </span>{" "}
                  Point Neo at a compatible AI endpoint using your own
                  credentials — or run a local model through Ollama and keep
                  inference entirely on your device.
                </li>
                <li>
                  <span className="font-medium text-zinc-200">
                    Start working with the agent.
                  </span>{" "}
                  Describe what you want in the chat. The agent reads,
                  searches, and modifies files through its tools, showing each
                  step in an activity timeline. You review and approve changes
                  before they land in your project.
                </li>
              </ol>
            </div>
          </section>

          {/* The agent */}
          <section id="agentic-tools" className="scroll-mt-24 border-t border-zinc-800 pt-12 sm:pt-16">
            <h2 className="text-xl font-semibold sm:text-2xl">
              The agent &amp; filesystem tools
            </h2>

            <div className="mt-4 space-y-4 leading-7 text-zinc-400">
              <p>
                The agent works through a set of filesystem tools rather than
                only generating code in chat. The available tools are:
              </p>

              <CodeBlock>{agentTools.join("\n")}</CodeBlock>

              <p>
                Destructive operations require explicit user approval, and all
                agent activity is displayed through an activity timeline with
                tool status and output — so you always know what the agent is
                doing.
              </p>

              <p>
                Context is managed explicitly rather than automatically
                exposing your entire repository. The agent can work with files
                currently open in the editor, files you explicitly select,
                files discovered through search, and files accessed through
                its own filesystem tools — keeping unnecessary context out of
                the model.
              </p>
            </div>
          </section>

          {/* Change review */}
          <section id="change-review" className="scroll-mt-24 border-t border-zinc-800 pt-12 sm:pt-16">
            <h2 className="text-xl font-semibold sm:text-2xl">
              Reviewing changes
            </h2>

            <div className="mt-4 space-y-4 leading-7 text-zinc-400">
              <p>
                Agent-generated modifications are never applied silently. When
                the agent proposes changes, you can review them through the
                change and diff interfaces before anything becomes part of
                your project.
              </p>

              <CodeBlock>{"{reading file}\n\n{searching files}\n\n{added changes}\n\nApply?"}</CodeBlock>

              <p>
                The integrated Git diff view also lets you inspect everything
                produced during an agent session, with full repository
                awareness while you work. Git is also available independently
                through the integrated terminal.
              </p>
            </div>
          </section>

          {/* Editor */}
          <section id="editor" className="scroll-mt-24 border-t border-zinc-800 pt-12 sm:pt-16">
            <h2 className="text-xl font-semibold sm:text-2xl">
              The code editor
            </h2>

            <div className="mt-4 space-y-4 leading-7 text-zinc-400">
              <p>
                Neo includes a built-in code editor designed to operate
                alongside the agent. It supports a workspace file explorer,
                multi-tab editing with up to 10 simultaneously open tabs
                (least-recently-used tabs are evicted automatically),
                dirty-state indicators, syntax highlighting, a line-number
                gutter, active-line highlighting, breadcrumb navigation,
                cursor position indicators, smart and automatic indentation,
                and native undo history.
              </p>

              <p>
                When files are modified externally — or by the agent — open
                editor tabs update live without requiring the file to be
                reopened.
              </p>

              <p>
                Toggle the editor with{" "}
                <kbd className="rounded border border-zinc-700 bg-zinc-900 px-1.5 py-0.5 font-mono text-xs text-zinc-300">
                  Ctrl+Shift+E
                </kbd>
                .
              </p>
            </div>
          </section>

          {/* Terminal */}
          <section id="terminal" className="scroll-mt-24 border-t border-zinc-800 pt-12 sm:pt-16">
            <h2 className="text-xl font-semibold sm:text-2xl">
              Integrated terminal
            </h2>

            <div className="mt-4 space-y-4 leading-7 text-zinc-400">
              <p>
                Neo ships with an integrated PowerShell terminal backed by a
                native PTY implementation. It's a real interactive shell, so
                it can run anything already installed on your system —
                Python, Node.js, npm, Git, Rust, Cargo, and more.
              </p>

              <p>
                Multiple terminal sessions are supported, letting you keep
                separate environments for development servers, long-running
                commands, and debugging. Neo doesn't bundle compiler
                toolchains — it works with the development environments
                already on your machine.
              </p>
            </div>
          </section>

          {/* Providers */}
          <section id="providers" className="scroll-mt-24 border-t border-zinc-800 pt-12 sm:pt-16">
            <h2 className="text-xl font-semibold sm:text-2xl">
              Model providers &amp; local models
            </h2>

            <div className="mt-4 space-y-4 leading-7 text-zinc-400">
              <p>
                Neo is provider-independent. You configure compatible AI
                endpoints with your own credentials, including:
              </p>

              <ul className="list-disc space-y-1 pl-5">
                {providerConfig.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <p>
                This means you choose the AI infrastructure that fits your
                workflow — no lock-in to a single provider.
              </p>

              <p>
                Neo also supports locally hosted models through{" "}
                <a
                  href="https://ollama.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white underline decoration-zinc-600 underline-offset-4 transition hover:decoration-zinc-300"
                >
                  Ollama
                </a>
                . Run an Ollama server on your own machine, pull the models
                you want, and point Neo at them — inference can stay entirely
                on your device.
              </p>
            </div>
          </section>

          {/* MCP */}
          <section id="mcp" className="scroll-mt-24 border-t border-zinc-800 pt-12 sm:pt-16">
            <h2 className="text-xl font-semibold sm:text-2xl">
              Extending Neo with MCP
            </h2>

            <div className="mt-4 leading-7 text-zinc-400">
              <p>
                Neo supports the Model Context Protocol (MCP), an extensible
                mechanism for connecting additional tools and services to the
                agent environment — without each integration needing to be
                built directly into the application.
              </p>
            </div>
          </section>

          {/* Shortcuts */}
          <section id="shortcuts" className="scroll-mt-24 border-t border-zinc-800 pt-12 sm:pt-16">
            <h2 className="text-xl font-semibold sm:text-2xl">
              Keyboard shortcuts
            </h2>

            <p className="mt-4 leading-7 text-zinc-400">
              Neo includes a keyboard-driven command palette (
              <kbd className="rounded border border-zinc-700 bg-zinc-900 px-1.5 py-0.5 font-mono text-xs text-zinc-300">
                Ctrl+Shift+P
              </kbd>
              ) for accessing functionality quickly.
            </p>

            <div className="mt-6 overflow-hidden rounded-xl border border-zinc-800">
              <table className="w-full text-left text-sm">
                <thead className="bg-zinc-900/80 text-xs uppercase tracking-wide text-zinc-500">
                  <tr>
                    <th className="px-5 py-3 font-medium">Shortcut</th>
                    <th className="px-5 py-3 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800 text-zinc-400">
                  {shortcuts.map(({ keys, action }) => (
                    <tr key={keys}>
                      <td className="px-5 py-3 font-mono text-zinc-200">
                        {keys}
                      </td>
                      <td className="px-5 py-3">{action}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Privacy */}
          <section id="privacy" className="scroll-mt-24 border-t border-zinc-800 pt-12 sm:pt-16">
            <h2 className="text-xl font-semibold sm:text-2xl">
              Privacy &amp; local data
            </h2>

            <div className="mt-4 space-y-4 leading-7 text-zinc-400">
              <p>
                Application data is stored locally on your device — chat
                history, settings, API and model configuration, system
                prompts, and other persisted data. Neo does not require a Neo
                cloud account.
              </p>

              <p>
                Note that when you use a third-party AI provider, data sent to
                that provider is subject to the provider's own privacy policy
                and terms of service. For the full details, see the{" "}
                <Link
                  to="/privacypolicyandterms"
                  className="text-white underline decoration-zinc-600 underline-offset-4 transition hover:decoration-zinc-300"
                >
                  Privacy Policy &amp; Terms
                </Link>
                .
              </p>
            </div>
          </section>

          {/* Build from source */}
          <section id="building" className="scroll-mt-24 border-t border-zinc-800 pt-12 sm:pt-16">
            <h2 className="text-xl font-semibold sm:text-2xl">
              Building from source
            </h2>

            <div className="mt-4 space-y-4 leading-7 text-zinc-400">
              <p>
                Development requires the Tauri prerequisites for your platform
                along with: {devRequirements.join(", ")}.
              </p>

              <CodeBlock>{"git clone https://github.com/Lumorix-studios/Neo.git\ncd Neo\nnpm install\nnpm run tauri dev"}</CodeBlock>
            </div>
          </section>

          {/* Status */}
          <section id="status" className="scroll-mt-24 border-t border-zinc-800 pt-12 sm:pt-16">
            <h2 className="text-xl font-semibold sm:text-2xl">
              Project status
            </h2>

            <div className="mt-4 space-y-4 leading-7 text-zinc-400">
              <p>
                Neo is currently in <span className="text-zinc-200">beta</span>.
                Development began in May 2026 and the project remains under
                active development. Architecture, agent capabilities, APIs,
                and platform support may change between releases, and some
                functionality may be incomplete.
              </p>

              <p>
                Found a bug or want to follow development? The source lives on{" "}
                <a
                  href="https://github.com/Lumorix-studios/Neo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white underline decoration-zinc-600 underline-offset-4 transition hover:decoration-zinc-300"
                >
                  GitHub
                </a>
                .
              </p>
            </div>
          </section>

          </div>
          </div>
        </div>
      </div>
    </main>
  );
}

