# Path -- Integrations

By the end of this path, you will have connected your AI tool to at least one external service and used it to do something real.

## The Goal

Make your AI tool talk to something outside your code editor -- GitHub, Slack, Google Calendar, or any CLI tool you already use.

## The Two Ways to Integrate

### CLI Tools (The Trend)

Most AI coding tools can run shell commands. That means any CLI tool you already have installed is already an integration:

- `gh` -- GitHub CLI (PRs, issues, CI checks, releases)
- `gcloud` / `aws` / `az` -- cloud provider CLIs
- `curl` / `httpie` -- any API
- `jq` -- JSON processing
- `slack-cli` -- Slack (if available)
- Any internal script or tool your team uses

If your AI tool can run commands, it can use all of these.

### MCP Servers (The Protocol)

MCP (Model Context Protocol) is a standard for giving AI tools structured access to external services. Instead of running shell commands, MCP provides a clean interface:

- GitHub MCP -- read/write issues, PRs, reviews
- Slack MCP -- read/post messages
- Google Calendar MCP -- check schedule, create events
- Linear MCP -- read/update tickets
- Notion MCP -- read/write docs
- File system, database, and more

Claude Code, Cursor, and other tools support MCP natively.

## Exercise 1 -- Use a CLI Tool Through AI (5 min)

If your tool can run commands, try these:

**GitHub:**
> "Check if I have any PRs that need my review. Use the gh CLI."

**Git:**
> "Show me what changed on main since I last pulled. Summarize the important commits."

**Any API:**
> "Curl the [some API endpoint] and summarize what comes back."

The key insight: you do not need a special integration. If you have a CLI tool, your AI can use it.

## Exercise 2 -- Set Up an MCP Server (5 min)

If your tool supports MCP, try adding one:

1. Ask your tool: "How do I add an MCP server?"
2. Pick one that is useful to you (GitHub is the easiest starting point)
3. Configure it
4. Test it: "Use the GitHub MCP to list my open PRs"

If you cannot set one up in 5 minutes, just explore what is available. Ask: "What MCP servers exist? Which ones would be most useful for my workflow?"

## Exercise 3 -- Chain Two Tools (5 min)

The real power is combining tools in a single prompt:

> "Check my open PRs on GitHub. For any that have failing CI, read the failure logs and tell me what is wrong."

> "Look at my calendar for today and draft a Slack message to my team summarizing what I am working on."

> "Find the ticket for my current branch and update its status to 'in review'."

Try one of these (or make up your own chain). Even if it does not work perfectly, you will learn where the boundaries are.

## What You Built

A working connection between your AI tool and at least one external service. You have seen that integrations are not magic -- they are either CLI tools your AI can run or MCP servers you configure once.

## Going Deeper

- **Audit your CLI tools**: Run `which gh gcloud aws az jq curl` and see what you already have. Each one is a potential integration.
- **Build a custom MCP server**: If you have an internal API or tool, wrapping it in an MCP server is straightforward and gives your AI structured access.
- **Automation chains**: Build a prompt that chains 3+ tools together for a workflow you do regularly (morning standup prep, PR review, deploy check).
- **Security awareness**: Know what data your integrations can access. Some tools send context to external APIs. Understand your org's policies before connecting sensitive services.
