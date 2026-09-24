import { useEffect, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import ScreenshotFrame from "./ScreenshotFrame";

const BASE_URL = import.meta.env.BASE_URL;

const docGroups = [
  {
    label: "Getting started",
    items: [
      { id: "what-is-neo", label: "What is Neo?" },
      { id: "installation", label: "Installation" },
      { id: "first-workspace", label: "Open a workspace" },
      { id: "first-task", label: "Run your first task" },
    ],
  },
  {
    label: "Agent workflow",
    items: [
      { id: "agentic-tools", label: "Agent tools" },
      { id: "prompting", label: "Writing effective prompts" },
      { id: "change-review", label: "Reviewing changes" },
      { id: "git-workflow", label: "Git workflow" },
    ],
  },
  {
    label: "Workspace",
    items: [
      { id: "editor", label: "Code editor" },
      { id: "terminal", label: "Integrated terminal" },
      { id: "project-context", label: "Project context" },
    ],
  },
  {
    label: "AI & extensibility",
    items: [
      { id: "providers", label: "Model providers" },
      { id: "local-models", label: "Local models" },
      { id: "mcp", label: "MCP connections" },
      { id: "ai-troubleshooting", label: "AI troubleshooting" },
    ],
  },
  {
    label: "Reference",
    items: [
      { id: "shortcuts", label: "Keyboard shortcuts" },
      { id: "privacy", label: "Privacy & local data" },
      { id: "accounts", label: "Accounts & plans" },
      { id: "faq", label: "Frequently asked questions" },
    ],
  },
  {
    label: "Development",
    items: [
      { id: "building", label: "Building from source" },
      { id: "status", label: "Project status" },
    ],
  },
] as const;

const shortcuts = [
  { keys: "Ctrl+B", action: "Toggle AI settings sidebar" },
  { keys: "Ctrl+Shift+H", action: "Toggle chat history" },
  { keys: "Ctrl+Shift+P", action: "Open command palette" },
  { keys: "Ctrl+Shift+E", action: "Toggle code editor" },
  { keys: "Ctrl+S", action: "Save active file" },
  { keys: "Escape", action: "Close an open panel or dialog" },
];

const agentTools = [
  ["read_file", "Read a complete file from the workspace."],
  ["read_file_range", "Read a targeted line range from a large file."],
  ["search_files", "Find files by name or content."],
  ["list_dir", "Inspect the contents of a workspace directory."],
  ["write_file", "Create a file or replace its full contents."],
  ["append_file", "Add content without replacing existing content."],
  ["replace_in_file", "Apply a targeted edit to an existing file."],
  ["create_dir", "Create a workspace directory."],
  ["rename", "Rename a file or directory."],
  ["delete_file", "Delete a file after confirmation."],
  ["delete_dir", "Delete a directory after confirmation."],
] as const;

const devRequirements = [
  "Node.js and npm",
  "Rust and Cargo",
  "the Tauri prerequisites for your platform",
  "Git",
];

function CodeBlock({ children, label = "Terminal" }: { children: string; label?: string }) {
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
    <div className="my-6 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">
      <div className="flex min-h-10 items-center justify-between gap-3 border-b border-zinc-800 px-3 py-2 sm:px-4">
        <span className="truncate text-xs text-zinc-500">{label}</span>
        <button
          type="button"
          onClick={copy}
          className="min-h-9 rounded-md px-2.5 text-xs font-medium text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="max-w-full overflow-x-auto p-4 text-[0.8125rem] leading-6 text-zinc-300 sm:text-sm">
        <code>{children}</code>
      </pre>
    </div>
  );
}

function DocSection({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section
      id={id}
      className="doc-section scroll-mt-28 border-t border-zinc-800/80 pt-10 first:border-t-0 first:pt-0 sm:pt-12"
    >
      <h2 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">{title}</h2>
      <div className="mt-4 space-y-4 text-[0.9375rem] leading-7 text-zinc-400 sm:text-base sm:leading-8">
        {children}
      </div>
    </section>
  );
}

function Callout({ title, children, warning = false }: { title: string; children: ReactNode; warning?: boolean }) {
  return (
    <aside className={`rounded-xl border p-4 sm:p-5 ${warning ? "border-amber-500/25 bg-amber-500/[0.06]" : "border-zinc-800 bg-zinc-900/60"}`}>
      <p className={`text-sm font-semibold ${warning ? "text-amber-200" : "text-zinc-200"}`}>{title}</p>
      <div className="mt-1.5 text-sm leading-6 text-zinc-400">{children}</div>
    </aside>
  );
}

function Steps({ items }: { items: { title: string; body: ReactNode }[] }) {
  return (
    <ol className="mt-6 space-y-3">
      {items.map((item, index) => (
        <li key={item.title} className="grid grid-cols-[2rem_minmax(0,1fr)] gap-3 rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-sm font-semibold text-zinc-950">{index + 1}</span>
          <div>
            <h3 className="text-sm font-semibold text-zinc-100">{item.title}</h3>
            <p className="mt-1 text-sm leading-6 text-zinc-400">{item.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

function DocsImage({ name, alt, title }: { name: string; alt: string; title: string }) {
  return (
    <ScreenshotFrame
      src={`${BASE_URL}docs/${name}-960.webp`}
      srcSet={`${BASE_URL}docs/${name}-960.webp 960w, ${BASE_URL}docs/${name}-1440.webp 1440w`}
      sizes="(min-width: 1024px) 720px, calc(100vw - 2rem)"
      width={1440}
      height={860}
      alt={alt}
      title={title}
      loading="lazy"
      decoding="async"
    />
  );
}

export default function Documentation() {
  const [openGroup, setOpenGroup] = useState<string | null>(docGroups[0].label);
  const [activeId, setActiveId] = useState<string>("what-is-neo");

  const activeGroupLabel =
    docGroups.find((group) => group.items.some((item) => item.id === activeId))?.label ?? docGroups[0].label;
  const visibleGroup = openGroup ?? activeGroupLabel;

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ block: "start" });
    window.history.replaceState(null, "", `#${id}`);
    setActiveId(id);
  };

  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (id) window.setTimeout(() => scrollToSection(id), 50);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-18% 0px -68% 0px", threshold: 0 }
    );
    docGroups.forEach((group) => group.items.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    }));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-zinc-950 text-white">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="lg:grid lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-12 xl:gap-16">
          <aside className="hidden lg:block">
            <nav aria-label="Documentation sections" className="sticky top-28 max-h-[calc(100vh-9rem)] overflow-y-auto pr-2">
              <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-600">Guide</p>
              {docGroups.map((group) => {
                const open = visibleGroup === group.label;
                return (
                  <div key={group.label} className="mb-2">
                    <button
                      type="button"
                      onClick={() => setOpenGroup(open ? null : group.label)}
                      aria-expanded={open}
                      className={`flex min-h-10 w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${open ? "text-white" : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200"}`}
                    >
                      {group.label}
                      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`h-4 w-4 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                      </svg>
                    </button>
                    {open && (
                      <ul className="ml-3 border-l border-zinc-800 pl-2">
                        {group.items.map(({ id, label }) => (
                          <li key={id}>
                            <a
                              href={`#${id}`}
                              onClick={(event) => { event.preventDefault(); scrollToSection(id); }}
                              aria-current={activeId === id ? "location" : undefined}
                              className={`block rounded-md px-3 py-2 text-sm transition-colors ${activeId === id ? "bg-zinc-800/80 text-white" : "text-zinc-500 hover:bg-zinc-900 hover:text-zinc-300"}`}
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

          <article className="min-w-0">
            <div className="mb-8 lg:hidden">
              <label htmlFor="docs-mobile-nav" className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">On this page</label>
              <select
                id="docs-mobile-nav"
                value={activeId}
                onChange={(event) => scrollToSection(event.target.value)}
                className="min-h-11 w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3 text-sm text-zinc-200 outline-none"
              >
                {docGroups.map((group) => (
                  <optgroup key={group.label} label={group.label}>
                    {group.items.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
                  </optgroup>
                ))}
              </select>
            </div>

            <header className="max-w-3xl border-b border-zinc-800 pb-10 sm:pb-12">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">ProjectNeo handbook</p>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">Documentation</h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg sm:leading-8">
                Install Neo, open a project, connect a model, and learn a safe, repeatable workflow for working with an AI agent.
              </p>
              <div className="mt-6 flex flex-wrap gap-2 text-xs text-zinc-400">
                <span className="rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1.5">21 chapters</span>
                <span className="rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1.5">Windows & Linux</span>
                <span className="rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1.5">Beginner friendly</span>
              </div>
            </header>

            <div className="mt-10 space-y-12 sm:mt-12 sm:space-y-16">


              <DocSection id="what-is-neo" title="What is Neo?">
                <p>Neo is a lightweight desktop coding environment built with React, TypeScript, Tauri, and Rust. It combines an editor, an AI agent, filesystem tools, Git, terminals, and extensible model connections in one application.</p>
                <p>The important idea is not only that Neo can generate text. It can operate on a real folder: inspect project structure, read relevant files, search code, propose edits, run commands, and show you exactly what changed before you accept it.</p>
                <DocsImage name="workspace" alt="Neo workspace with the editor, agent, and terminal" title="Neo workspace" />
                <Callout title="What Neo does not do"><p>Neo does not silently take ownership of your repository. The agent is a collaborator: it works from the context you provide and the files it is allowed to inspect, while you keep control of consequential changes.</p></Callout>
              </DocSection>

              <DocSection id="installation" title="Installation">
                <p>Neo is distributed through GitHub Releases. Use the Downloads page to get the installer for your operating system, or build the application from source if you need unreleased changes.</p>
                <Steps items={[
                  { title: "Check your platform", body: <>Use Windows 10 or later, Ubuntu 20.04 or later, or Fedora 34 or later. Hosted providers need a connection; local models can work offline.</> },
                  { title: "Download the release", body: <>Open the <Link className="text-zinc-100 underline decoration-zinc-600 underline-offset-4" to="/downloads">Downloads page</Link> and choose the asset for your operating system and processor.</> },
                  { title: "Install and launch", body: <>Run the installer, open Neo, and create or open a folder. Neo uses the development tools already installed on your machine rather than bundling every compiler.</> },
                ]} />
                <Callout title="Keep the installer name" warning><p>If Windows SmartScreen warns you about an unfamiliar installer, verify that the download came from the official Lumorix Studios GitHub release before continuing.</p></Callout>
              </DocSection>

              <DocSection id="first-workspace" title="Open a workspace">
                <p>Neo is folder-based. A workspace is the project directory that the explorer, editor, terminal, and agent operate on. Choose the repository root when possible so searches and Git operations have the full project context.</p>
                <h3 className="text-base font-semibold text-zinc-200">A good first workspace</h3>
                <ul className="list-disc space-y-2 pl-5 marker:text-zinc-600">
                  <li>Use a project you understand well enough to verify the result.</li>
                  <li>Make sure important work is committed or backed up before an agent session.</li>
                  <li>Avoid opening your entire home directory or a drive containing unrelated personal files.</li>
                  <li>Keep generated dependencies and large build folders in mind when asking for repository-wide searches.</li>
                </ul>
                <Callout title="Workspace access is powerful"><p>The agent can read and modify files inside the workspace you open. Use a dedicated folder or a clean repository when experimenting for the first time.</p></Callout>
              </DocSection>

              <DocSection id="first-task" title="Run your first task">
                <p>Start with a small, verifiable change. The goal is to learn the workflow, not to hand the entire repository to the model at once.</p>
                <Steps items={[
                  { title: "Describe one outcome", body: <>Write what should be different when the task is complete, where the relevant code appears, and any constraints.</> },
                  { title: "Watch the activity", body: <>The agent may list directories, read files, or search content. Interrupt it if it starts exploring somewhere unrelated.</> },
                  { title: "Review every proposed edit", body: <>Open the diff, read the changed lines in context, and reject changes you cannot explain.</> },
                  { title: "Run the checks yourself", body: <>Use the integrated terminal for tests, builds, linters, and formatters. A successful edit is not the same as a verified feature.</> },
                ]} />
                <CodeBlock label="Example first prompt">{`Goal: add input validation to the sign-in form.\n\nScope:\n- Inspect the existing form and its tests.\n- Follow the current validation style.\n- Do not change the visual design.\n\nBefore finishing:\n- Run the smallest relevant test suite.\n- Summarize the files you changed.`}</CodeBlock>
              </DocSection>

              <DocSection id="agentic-tools" title="Agent tools">
                <p>The agent works through explicit tools rather than only generating code in chat. The exact set can evolve, but the current core covers these filesystem operations:</p>
                <div className="overflow-hidden rounded-xl border border-zinc-800">
                  {agentTools.map(([name, description]) => (
                    <div key={name} className="grid gap-1 border-b border-zinc-800 px-4 py-3 last:border-b-0 sm:grid-cols-[10rem_1fr] sm:gap-4">
                      <code className="text-sm text-zinc-200">{name}</code>
                      <p className="text-sm leading-6 text-zinc-500">{description}</p>
                    </div>
                  ))}
                </div>
                <p>Agent activity appears in a timeline with tool status and output. Destructive operations require explicit approval, but approval alone is not a substitute for reviewing the resulting diff.</p>
                <Callout title="Context is selected"><p>Neo does not automatically send your entire repository to a provider. The agent can work with open editor files, files you select, files discovered by search, and files reached through its tools.</p></Callout>
              </DocSection>

              <DocSection id="prompting" title="Writing effective prompts">
                <p>A useful request gives the agent an outcome, constraints, and a definition of done. More context is not always better; relevant context is.</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    ["State the outcome", "Describe the behavior or change in plain language before implementation details."],
                    ["Set boundaries", "Name files, folders, dependencies, APIs, or patterns the agent must not change."],
                    ["Explain why", "Share the bug, requirement, or user experience behind the request."],
                    ["Define verification", "Specify the test, command, or manual check that proves the task worked."],
                  ].map(([title, body]) => (
                    <div key={title} className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
                      <h3 className="text-sm font-semibold text-zinc-200">{title}</h3>
                      <p className="mt-1.5 text-sm leading-6 text-zinc-500">{body}</p>
                    </div>
                  ))}
                </div>
                <h3 className="pt-2 text-base font-semibold text-zinc-200">Break large requests into stages</h3>
                <p>For broad work, ask the agent to investigate and propose a plan first. Then approve the plan, implement one stage, verify it, and only then continue. This creates clear checkpoints and reduces accidental scope.</p>
                <CodeBlock label="Prompt structure">{`Outcome: [what should work afterward]\nContext: [relevant behavior, error, or architecture]\nConstraints: [what must remain unchanged]\nVerification: [tests or checks to run]\n\nFirst inspect the relevant files and summarize your plan before editing.`}</CodeBlock>
              </DocSection>

              <DocSection id="change-review" title="Reviewing changes">
                <p>Agent-generated modifications are not the same as finished work. Review the diff at three levels: what changed, whether it belongs in the requested scope, and whether the project still passes its own checks.</p>
                <ol className="list-decimal space-y-3 pl-5 marker:text-zinc-500">
                  <li><span className="font-medium text-zinc-200">Read the summary.</span> Compare the claimed files and behavior with your request.</li>
                  <li><span className="font-medium text-zinc-200">Inspect every hunk.</span> Look for unrelated formatting, silent behavior changes, and weakened error handling.</li>
                  <li><span className="font-medium text-zinc-200">Check surrounding code.</span> A small diff can still break assumptions elsewhere in the module.</li>
                  <li><span className="font-medium text-zinc-200">Run focused checks first.</span> Start with the relevant test file, then broaden when it passes.</li>
                  <li><span className="font-medium text-zinc-200">Verify manually.</span> Exercise the user flow when tests cannot capture the behavior.</li>
                </ol>
                <Callout title="Never approve a change you cannot explain" warning><p>If a diff introduces a dependency, changes security behavior, deletes data, or rewrites unrelated code, pause and investigate before accepting it.</p></Callout>
              </DocSection>

              <DocSection id="git-workflow" title="Git workflow">
                <p>Git is your safety net, history, and review tool. The integrated terminal gives you the same Git commands you already know, while the interface can display repository-aware changes.</p>
                <CodeBlock label="Safe starting point">{`git status
git branch --show-current
git diff
git log -5 --oneline`}</CodeBlock>
                <h3 className="pt-2 text-base font-semibold text-zinc-200">A practical agent loop</h3>
                <ol className="list-decimal space-y-2 pl-5 marker:text-zinc-500">
                  <li>Start from a clean branch with current work committed.</li>
                  <li>Ask the agent for one bounded change.</li>
                  <li>Review the diff and run checks.</li>
                  <li>Commit the verified result with a useful message.</li>
                  <li>Use a new branch when exploring a larger refactor.</li>
                </ol>
                <p>Do not ask the agent to commit, push, rewrite history, or create a pull request unless that action is part of your request. Those operations can affect collaborators and remote systems.</p>
              </DocSection>


              <DocSection id="editor" title="Code editor">
                <p>Neo includes a built-in editor designed to operate alongside the agent. It supports a workspace explorer, multi-tab editing, dirty-state indicators, syntax highlighting, line numbers, active-line highlighting, breadcrumbs, cursor position, indentation, and native undo history.</p>
                <p>Up to 10 tabs stay open at once. Least-recently-used tabs can be evicted automatically, so save important work before closing or replacing a tab. When the agent or another process modifies a file, an open tab updates live rather than requiring the file to be reopened.</p>
                <DocsImage name="editor" alt="Neo code editor showing a project file" title="Code editor" />
                <p>Use the command palette to reach editor actions quickly. Save with <kbd className="rounded border border-zinc-700 bg-zinc-900 px-1.5 py-0.5 font-mono text-xs text-zinc-300">Ctrl+S</kbd> and toggle the editor with <kbd className="rounded border border-zinc-700 bg-zinc-900 px-1.5 py-0.5 font-mono text-xs text-zinc-300">Ctrl+Shift+E</kbd>.</p>
              </DocSection>

              <DocSection id="terminal" title="Integrated terminal">
                <p>Neo includes an integrated PowerShell terminal backed by a native PTY. It is a real interactive shell, so it can run tools already installed on your system, including Python, Node.js, npm, Git, Rust, Cargo, and project-specific commands.</p>
                <h3 className="pt-2 text-base font-semibold text-zinc-200">Use the terminal for verification</h3>
                <ul className="list-disc space-y-2 pl-5 marker:text-zinc-600">
                  <li>Run the smallest relevant test before the full suite.</li>
                  <li>Use the project&apos;s package scripts instead of inventing command variants.</li>
                  <li>Capture the exact failure when a command does not behave as expected.</li>
                  <li>Stop long-running processes before closing Neo or changing ports.</li>
                </ul>
                <p>Multiple sessions let you keep a development server, test run, and debugging shell separate. Neo does not install your toolchain; it uses what is available in the environment you launch it from.</p>
                <CodeBlock label="Common checks">{`npm test
npm run lint
npm run build
git status --short`}</CodeBlock>
              </DocSection>

              <DocSection id="project-context" title="Project context">
                <p>Good context is relevant, small, and current. Neo can gather context through the files you open, selections you make, searches you request, and the filesystem tools it uses. You remain in control of what the model sees.</p>
                <h3 className="pt-2 text-base font-semibold text-zinc-200">A practical context checklist</h3>
                <ul className="list-disc space-y-2 pl-5 marker:text-zinc-600">
                  <li>Name the entry point, component, route, or package involved.</li>
                  <li>Include the current error message when debugging a failure.</li>
                  <li>Share the relevant type, schema, or API contract.</li>
                  <li>Point out generated folders that should not be edited.</li>
                  <li>Ask the agent to search for an existing pattern before creating a new one.</li>
                </ul>
                <Callout title="Large repositories"><p>Ask for targeted searches such as “find where user sessions are created” rather than “read everything.” It is faster, less expensive, and reduces irrelevant context.</p></Callout>
              </DocSection>

              <DocSection id="providers" title="Model providers">
                <p>Neo is provider-independent. Configure a compatible endpoint with the model name, base URL, credentials, and optional system prompt or provider-specific settings. This keeps you in control of cost, privacy, latency, and model choice.</p>
                <Steps items={[
                  { title: "Choose an endpoint", body: <>Select a hosted service or a compatible local endpoint. Confirm that it supports the model format Neo expects.</> },
                  { title: "Enter the model and base URL", body: <>Use the exact model identifier and API path from the provider. A wrong URL usually produces a connection or parsing error.</> },
                  { title: "Add credentials securely", body: <>Treat API keys like passwords. Do not paste them into source files, screenshots, prompts, or issue reports.</> },
                  { title: "Test with a small prompt", body: <>Start with a short request before giving the agent a large repository task.</> },
                ]} />
                <h3 className="pt-2 text-base font-semibold text-zinc-200">Provider checklist</h3>
                <ul className="list-disc space-y-2 pl-5 marker:text-zinc-600">
                  <li>The endpoint is reachable from the machine running Neo.</li>
                  <li>The model name is spelled exactly as the provider documents it.</li>
                  <li>The API key has permission for that model and account.</li>
                  <li>The selected context window can hold the files you plan to send.</li>
                  <li>You understand the provider&apos;s retention and training terms.</li>
                </ul>
              </DocSection>


              <DocSection id="local-models" title="Local models with Ollama">
                <p>Neo can connect to a model server running on your own machine through <a className="text-zinc-100 underline decoration-zinc-600 underline-offset-4" href="https://ollama.com" target="_blank" rel="noopener noreferrer">Ollama</a>. This is useful when you want inference to stay local or need to work without a hosted provider connection.</p>
                <CodeBlock label="Ollama setup">{`# install Ollama from ollama.com
ollama pull llama3.1
ollama serve`}</CodeBlock>
                <p>In Neo, use the local endpoint and the model identifier reported by Ollama. The exact setup varies by machine and model, so check the Ollama documentation and Neo&apos;s provider settings if the names do not match.</p>
                <DocsImage name="local-models" alt="Neo configured to use a local Ollama model" title="Local model provider" />
                <Callout title="Local does not automatically mean private" warning><p>Check what the model, OS, and any extensions can access. Avoid sending secrets or sensitive files to a model simply because the interface is running locally.</p></Callout>
              </DocSection>

              <DocSection id="mcp" title="MCP connections">
                <p>MCP, or Model Context Protocol, lets Neo connect to compatible tools and services. Treat a connection as adding another capable system to your agent session: review what data it can access and which actions it can perform before enabling it.</p>
                <Steps items={[
                  { title: "Choose a trusted server", body: <>Prefer a server you understand, with a clear source, documentation, and permission model.</> },
                  { title: "Review the configuration", body: <>Look at the command, arguments, environment variables, network destination, and exposed tools.</> },
                  { title: "Connect with minimal scope", body: <>Start in a test workspace. Do not grant broad filesystem or network access to an unfamiliar server.</> },
                  { title: "Test one action", body: <>Confirm the tool appears, returns expected output, and does not perform unexpected writes.</> },
                ]} />
                <Callout title="MCP servers can be powerful"><p>Use the same review discipline for MCP as for a shell command. A server that can write files, run commands, or call external APIs can change your project and your accounts.</p></Callout>
              </DocSection>

              <DocSection id="ai-troubleshooting" title="AI troubleshooting">
                <p>When an agent task fails, separate the problem into the model, the connection, the context, and the task itself. The fastest diagnostic is usually a small, deterministic request.</p>
                <div className="overflow-x-auto rounded-xl border border-zinc-800">
                  <table className="w-full min-w-[34rem] text-left text-sm">
                    <thead className="bg-zinc-900 text-zinc-300"><tr><th className="px-4 py-3 font-medium">Symptom</th><th className="px-4 py-3 font-medium">Check first</th></tr></thead>
                    <tbody className="divide-y divide-zinc-800 text-zinc-500">
                      <tr><td className="px-4 py-3">Connection error</td><td className="px-4 py-3">Base URL, network, firewall, and provider status</td></tr>
                      <tr><td className="px-4 py-3">Authentication error</td><td className="px-4 py-3">API key, account permissions, and model availability</td></tr>
                      <tr><td className="px-4 py-3">Empty or truncated answer</td><td className="px-4 py-3">Context size, model name, and provider response format</td></tr>
                      <tr><td className="px-4 py-3">Agent misses relevant code</td><td className="px-4 py-3">Scope the search and name the entry point or existing pattern</td></tr>
                      <tr><td className="px-4 py-3">Changes break the build</td><td className="px-4 py-3">Inspect the diff and run the smallest relevant check</td></tr>
                    </tbody>
                  </table>
                </div>
                <p>Capture the exact error, the provider, the model, and the smallest prompt that reproduces it. That information is much more useful than saying “the AI is broken.”</p>
              </DocSection>


              <DocSection id="shortcuts" title="Keyboard shortcuts">
                <p>Use the command palette for actions that are not listed here. On Windows, the primary modifier is Ctrl; keyboard bindings can depend on your operating system.</p>
                <div className="overflow-x-auto rounded-xl border border-zinc-800">
                  <table className="w-full min-w-[28rem] text-left text-sm">
                    <thead className="bg-zinc-900 text-zinc-300"><tr><th className="px-4 py-3 font-medium">Shortcut</th><th className="px-4 py-3 font-medium">Action</th></tr></thead>
                    <tbody className="divide-y divide-zinc-800 text-zinc-400">
                      {shortcuts.map(({ keys, action }) => <tr key={keys}><td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-zinc-200">{keys}</td><td className="px-4 py-3">{action}</td></tr>)}
                    </tbody>
                  </table>
                </div>
              </DocSection>

              <DocSection id="privacy" title="Privacy & local data">
                <p>Neo stores application data locally on your device, including chat history, settings, model and API configuration, system prompts, and other persisted data. Core local file operations do not require a Neo cloud account.</p>
                <p>If you use a hosted AI provider, the context sent to that provider is subject to that provider&apos;s privacy policy and terms. Review what you include before sending proprietary code, credentials, customer data, or personal information.</p>
                <ul className="list-disc space-y-2 pl-5 marker:text-zinc-600">
                  <li>Keep API keys out of prompts, source files, screenshots, and bug reports.</li>
                  <li>Use a local endpoint when local inference is required by your workflow.</li>
                  <li>Remove generated or sensitive files from a workspace when they are not needed.</li>
                  <li>Review the <Link className="text-zinc-100 underline decoration-zinc-600 underline-offset-4" to="/privacypolicyandterms">Privacy Policy &amp; Terms</Link> for the website and account services.</li>
                </ul>
              </DocSection>

              <DocSection id="accounts" title="Accounts & plans">
                <p>The Lumorix Studios website and Neo use the same account system. Signing in on the website gives you access to your profile, plan information, and purchase history, so your plan follows you between the site and the app.</p>
                <Steps items={[
                  { title: "Sign in", body: <>Use the account menu in the navbar or the <Link className="text-zinc-100 underline decoration-zinc-600 underline-offset-4" to="/account">Account page</Link>.</> },
                  { title: "Choose a plan", body: <>Open <Link className="text-zinc-100 underline decoration-zinc-600 underline-offset-4" to="/pricing">Pricing</Link> to compare plans and start checkout.</> },
                  { title: "Check your account", body: <>Return to your profile to see the current plan and recent orders. Plan changes may take a moment to appear while a payment settles.</> },
                ]} />
                <Callout title="Keep control of your account"><p>Use a unique password, sign out of shared devices, and review sign-in methods from account settings. Payment details are handled by the payment provider and are not stored in Neo.</p></Callout>
              </DocSection>

              <DocSection id="faq" title="Frequently asked questions">
                <div className="divide-y divide-zinc-800 rounded-xl border border-zinc-800">
                  {[
                    ["Does Neo need an account?", "The core desktop workspace and local file tools can be used without a cloud account. An account is useful for website plan management, billing, and shared app features."],
                    ["Can I use my own API key?", "Yes. Neo supports provider-independent configuration, including API keys, model names, base URLs, system prompts, and provider-specific options."],
                    ["Can I use a local model?", "Yes. Neo can connect to a local Ollama server so inference can remain on your machine."],
                    ["Will the agent delete my files?", "Destructive actions require explicit approval. You should still read the diff and understand the requested action before approving it."],
                    ["Can I use MCP?", "Yes, with compatible MCP servers. Review each server's commands, permissions, network access, and available tools before connecting it."],
                    ["Where should I report a bug?", "Use the relevant issue or discussion on the official Neo GitHub repository. Include your platform, version, exact steps, and a minimal reproduction when possible."],
                  ].map(([question, answer]) => (
                    <details key={question} className="group p-4 sm:p-5">
                      <summary className="cursor-pointer list-none pr-6 text-sm font-semibold text-zinc-200 marker:hidden">{question}<span className="float-right text-zinc-600 transition group-open:rotate-45">+</span></summary>
                      <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-500">{answer}</p>
                    </details>
                  ))}
                </div>
              </DocSection>


              <DocSection id="building" title="Building from source">
                <p>Development requires {devRequirements.join(", ")}. Then clone the official repository and start the development shell.</p>
                <CodeBlock label="Development setup">{`git clone https://github.com/Lumorix-studios/Neo.git
cd Neo
npm install
npm run tauri dev`}</CodeBlock>
                <h3 className="pt-2 text-base font-semibold text-zinc-200">Before opening a pull request</h3>
                <ul className="list-disc space-y-2 pl-5 marker:text-zinc-600">
                  <li>Run the project&apos;s lint, type-check, and test commands.</li>
                  <li>Keep changes focused and explain the user-facing behavior.</li>
                  <li>Do not commit secrets, local model files, build output, or personal paths.</li>
                  <li>Test the affected platform when the change touches native behavior.</li>
                </ul>
              </DocSection>

              <DocSection id="status" title="Project status">
                <p>Neo is currently in beta and under active development. Architecture, agent capabilities, APIs, shortcuts, and platform support may change between releases. Some features are experimental or incomplete.</p>
                <p>Development began in May 2026. The project source, releases, and issue tracking live on <a className="text-zinc-100 underline decoration-zinc-600 underline-offset-4" href="https://github.com/Lumorix-studios/Neo" target="_blank" rel="noopener noreferrer">GitHub</a>.</p>
                <Callout title="Help improve Neo"><p>Bug reports with a minimal reproduction, focused feature requests, documentation fixes, and careful contributions are all useful. Do not include API keys, private code, or personal data in a public issue.</p></Callout>
              </DocSection>
            </div>
          </article>
        </div>
      </div>
    </main>
  );
}
