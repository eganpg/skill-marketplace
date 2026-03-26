# Oddball AI Resources

A curated collection of AI skills, prompts, agents, and resources for Claude and GitHub Copilot — plus a live web marketplace for browsing and installing skills built by your team.

---

## What's Inside

**Skill Marketplace** - A browsable web catalog for discovering, downloading, and installing Claude skills. Filter by category, read docs, and install with one click. Live at [GitHub Pages](#github-pages-setup).

**Prompts** - Reusable system prompts, task prompts, and multi-step prompt chains for Claude and Copilot. Drop them into your workflow or adapt them to your needs.

**Skills** - Claude Code skills (SKILL.md format), CLAUDE.md configurations, context engineering patterns, and Copilot workspace configs. Practical setups that make your AI tools more effective.

**Agents** - Sub-agent definitions, multi-step workflow configs, MCP server setups for Claude, and custom agent definitions for Copilot. Patterns for building AI that does more than answer questions.

**Cross-Tool** - Tool-agnostic patterns, OpenSkills that port across Claude and Copilot, shared prompting and context techniques, and migration guides for moving between tools.

**Guides** - Deep-dive getting started guides and setup walkthroughs for Claude Code and Copilot. Instructional content to go from zero to productive.

**Projects** - Full working example projects that demonstrate how these pieces fit together. Each project is self-contained with its own setup instructions and documentation.

---

## Quick Start

| I want to... | Go to |
|---|---|
| Browse and install skills | [Marketplace site](https://eganpg.github.io/skill-marketplace/) |
| Find a reusable prompt | [`/engineering/prompts`](./engineering/prompts/) |
| Set up Claude Code skills or CLAUDE.md | [`/engineering/skills/claude`](./engineering/skills/claude/) |
| Configure Copilot for my workspace | [`/engineering/skills/copilot`](./engineering/skills/copilot/) |
| Build an agent workflow | [`/engineering/agents`](./engineering/agents/) |
| Use a pattern that works across tools | [`/engineering/cross-tool`](./engineering/cross-tool/) |
| Find an OpenSkill | [`/engineering/cross-tool/openskills`](./engineering/cross-tool/openskills/) |
| Get started with Claude Code | [`/engineering/guides/claude-code`](./engineering/guides/claude-code/) |
| Get started with Copilot | [`/engineering/guides/copilot`](./engineering/guides/copilot/) |
| See a full working example | [`/projects`](./projects/) |

Each item includes its own README with purpose, usage instructions, compatibility info, and examples.

---

## Status Labels

Every resource item carries a maturity label so you know what to expect:

| Label | What it means |
|---|---|
| ![Production-Ready](https://img.shields.io/badge/status-production--ready-brightgreen) | Tested and reliable for real use |
| ![Stable](https://img.shields.io/badge/status-stable-green) | Works well, minor edge cases possible |
| ![Beta](https://img.shields.io/badge/status-beta-yellow) | Functional, still being refined |
| ![Experimental](https://img.shields.io/badge/status-experimental-orange) | Proof of concept, expect rough edges |
| ![Community](https://img.shields.io/badge/status-community-blue) | Community contributed, reviewed but not deeply tested |

See [STATUS.md](./STATUS.md) for full criteria.

---

## Repository Structure

```
oddball-ai-resources/
├── index.html                        # Marketplace catalog (GitHub Pages)
├── skill.html                        # Skill detail page
├── submit.html                       # Skill submission page
├── roadmap.html                      # Skill pipeline / roadmap
├── admin.html                        # Admin review tools
├── assets/                           # Marketplace CSS, JS, logo
├── skills/
│   ├── manifest.json                 # Master index of all published marketplace skills
│   └── [skill-name]/
│       ├── [skill-name].skill        # Installable .skill file (zip archive)
│       └── README.md                 # Skill documentation
├── roadmap/roadmap.json              # Roadmap pipeline data
├── engineering/
│   ├── skills/
│   │   ├── claude/                   # SKILL.md skills, CLAUDE.md configs, context patterns
│   │   └── copilot/                  # Extensions, workspace configs
│   ├── prompts/
│   │   ├── claude/                   # System prompts, task prompts, prompt chains
│   │   └── copilot/                  # Instruction files, chat prompt patterns
│   ├── agents/
│   │   ├── claude/                   # Sub-agents, workflows, MCP configs
│   │   └── copilot/                  # Custom agents, agent mode configs
│   ├── cross-tool/
│   │   ├── openskills/               # Tool-agnostic skill definitions
│   │   ├── shared-patterns/          # Universal prompt and context patterns
│   │   └── migration-guides/         # Translating setups between Claude and Copilot
│   ├── guides/
│   │   ├── claude-code/              # Getting started, CLAUDE.md, skills, MCP, etc.
│   │   └── copilot/                  # Getting started, instructions, agent mode, etc.
│   └── templates/                    # README and OpenSkill templates for contributors
├── projects/                         # Full working example projects
├── docs/                             # Marketplace dev docs and user flows
├── submissions/                      # Staging area for pending skill PRs
└── .github/
    ├── CODEOWNERS
    └── PULL_REQUEST_TEMPLATE/
        └── skill_submission.md
```

---

## Marketplace: Adding a Skill

### Option A — Pull Request (preferred)

1. Branch off `main`: `git checkout -b skill/your-skill-name`
2. Create `skills/your-skill-name/` with:
   - `your-skill-name.skill` — a valid zip archive containing `SKILL.md`
   - `README.md` — documentation
3. Add an entry to `skills/manifest.json` (see schema below)
4. Open a PR titled `[SKILL SUBMISSION] Your Skill Name`
5. An admin reviews, tests the skill, and merges

### Option B — GitHub Issue

Use the form on the [submit page](submit.html). A pre-filled GitHub Issue will open — attach your `.skill` file there.

---

## Marketplace: Manifest Schema

`skills/manifest.json` is the single source of truth for all published marketplace skills.

```json
{
  "lastUpdated": "YYYY-MM-DD",
  "version": "1",
  "skills": [
    {
      "id": "your-skill-name",
      "name": "Your Skill Name",
      "description": "1-2 sentence summary.",
      "version": "1.0.0",
      "author": "Display Name",
      "authorEmail": "you@company.com",
      "tags": ["tag1", "tag2"],
      "category": "Code & Development",
      "file": "skills/your-skill-name/your-skill-name.skill",
      "icon": null,
      "readme": "skills/your-skill-name/README.md",
      "downloads": 0,
      "publishedAt": "YYYY-MM-DD",
      "updatedAt": "YYYY-MM-DD",
      "featured": false
    }
  ]
}
```

### Defined Categories

- Document Processing
- Data & Spreadsheets
- Communication & Drafting
- Research & Summarization
- Code & Development
- Scheduling & Automation
- Presentations
- Other

---

## Marketplace: Skill File Format

A `.skill` file is a standard zip archive containing a `SKILL.md` at the root:

```
your-skill-name.skill (zip)
└── SKILL.md
```

**Creating a `.skill` file:**

```bash
mkdir tmpdir
echo "# Your Skill\n\nDescription and instructions." > tmpdir/SKILL.md
(cd tmpdir && zip -r ../your-skill-name.skill SKILL.md)
rm -rf tmpdir
```

---

## Marketplace: Admin Review Checklist

When reviewing a skill submission PR:

- [ ] Test the `.skill` file in your own Claude instance
- [ ] Verify the `manifest.json` entry is complete and accurate
- [ ] Check that description and tags are useful and specific
- [ ] Confirm the README explains how to use the skill
- [ ] Increment the version if this is an update to an existing skill
- [ ] Merge when satisfied — GitHub Pages auto-deploys

---

## Local Development (Marketplace)

No build step required. Serve the repo root with any static file server:

```bash
# Python
python3 -m http.server 8080

# Node (npx)
npx serve .

# VS Code: use the Live Server extension
```

Then open `http://localhost:8080`.

---

## GitHub Pages Setup

1. Go to repo **Settings → Pages**
2. Source: Deploy from branch → `main` → `/ (root)`
3. Save — the site deploys automatically on every merge to `main`

---

## Contributing

Contributions are welcome. Whether it's a prompt that saved you hours, a CLAUDE.md config that works great for your team, or a Copilot setup that boosts productivity - we'd love to include it.

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines on:

- How to structure your contribution
- README requirements for new items
- The PR review process
- How status labels are assigned and promoted

---

## Tools Covered

**[Claude](https://claude.ai)** by Anthropic - Claude Code, Claude API, claude.ai, CLAUDE.md configs, MCP integrations, sub-agents, and skills.

**[GitHub Copilot](https://github.com/features/copilot)** - Copilot Chat, custom instructions, agent mode, extensions, and workspace configurations.
