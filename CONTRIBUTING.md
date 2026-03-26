# Contributing to va-ai

Thanks for your interest in contributing. This repo is a community resource, and contributions - whether a single prompt, a full project, or a typo fix - make it better for everyone.

---

## Before You Start

Take a quick look at the [repo structure](./README.md#repo-structure) and [status labels](./STATUS.md) to understand how content is organized. Every item in this repo lives in one of these top-level categories:

| Category | What belongs here |
|---|---|
| `prompts/` | System prompts, task prompts, prompt chains |
| `skills/` | CLAUDE.md configs, SKILL.md skills, Copilot workspace configs |
| `agents/` | Sub-agent definitions, workflows, MCP configs, custom Copilot agents |
| `cross-tool/` | OpenSkills, shared patterns, migration guides |
| `guides/` | Getting started walkthroughs, deep-dive setup guides |
| `projects/` | Full working example projects |

Within `prompts/`, `skills/`, and `agents/`, content is further split by tool (`claude/` or `copilot/`). Each tool folder also has a `_samples/` directory for reference examples.

---

## What We're Looking For

**High-value contributions:**

- Prompts, skills, or agent configs you've actually used and found effective
- CLAUDE.md or copilot-instructions.md configurations that improved your workflow
- OpenSkills that demonstrate portability across tools
- Guides or guide improvements based on hands-on experience
- Example projects that show how multiple pieces work together
- Bug fixes, documentation improvements, or clarifications on existing items

**What we'll likely decline:**

- Untested or purely theoretical content with no real-world usage
- Items that duplicate something already in the repo without meaningful improvement
- Content that is tool-version-specific to the point of being fragile
- Marketing or promotional content

---

## Contribution Types

### Adding an Item (Prompt, Skill, Agent Config)

This is the most common contribution. An "item" is a self-contained piece of content that lives in its own folder.

**1. Pick the right location.**

Use this decision tree:

- Is it tool-specific? Place it under `prompts/`, `skills/`, or `agents/` in the appropriate `claude/` or `copilot/` subfolder.
- Is it a reference example from real usage? Place it in the `_samples/` folder within the relevant category.
- Does it work across tools? Place it under `cross-tool/`.

**2. Create a folder using `kebab-case` naming.**

Name it by purpose or capability, not by implementation detail.

Good: `code-review-system-prompt/`, `test-generation/`, `mcp-postgres-config/`
Avoid: `my-prompt/`, `v2-updated/`, `claude-thing/`

**3. Include a README.md in your item folder.**

For prompts, use the [prompt template](./templates/prompt-template.md). For all other items (skills, agent configs, etc.), use the [item README template](./templates/item-readme-template.md). At minimum, your README must include:

- **Name and status badge** - See [status labels](#status-labels-for-contributions)
- **Purpose** - What it does and when to use it
- **Compatibility** - Which tool(s) and version(s) it targets
- **Usage** - Clear steps to use the item
- **Example** - A concrete example showing the item in action

**4. Add your item's files alongside the README.**

The actual prompt, config, skill definition, or whatever the item is should live in the same folder as the README.

### Adding an OpenSkill

OpenSkills follow a specific structure since they're designed for portability. Use the [OpenSkill template](./templates/openskill-template.md) and place your skill under `cross-tool/openskills/[skill-name]/`.

An OpenSkill folder should contain:

- `README.md` - Canonical skill definition, purpose, and usage
- `claude/` - Claude-specific adapter (SKILL.md, CLAUDE.md snippet, or prompt)
- `copilot/` - Copilot-specific adapter (instructions file, workspace config, or prompt)
- `examples/` - Usage examples showing the skill in action

### Adding or Updating a Guide

Guides live under `guides/claude-code/` or `guides/copilot/`. If you're adding a new guide, open an issue first to discuss scope and avoid overlap with existing content.

Guide contributions should:

- Be based on hands-on experience, not just documentation summaries
- Include practical examples and concrete steps
- Call out gotchas, common mistakes, and non-obvious tips
- Stay focused - a guide should cover one topic well rather than many topics superficially

### Adding a Project

Projects are self-contained and live under `projects/[project-name]/`. Use the [project README template](./templates/project-readme-template.md) and include:

- A clear purpose statement (what does this project demonstrate?)
- Setup instructions that work from a clean clone
- Documentation of which va-ai items the project uses or demonstrates

### Fixing or Improving Existing Content

Bug fixes, typo corrections, documentation improvements, and compatibility updates are always welcome. For small fixes, go ahead and open a PR directly. For larger reworks, open an issue first.

---

## Templates

All templates live in the [`/templates`](./templates/) directory. Copy the appropriate template into your new folder and fill it in - don't modify the originals.

| Template | Use for | Location |
|---|---|---|
| [Item README](./templates/item-readme-template.md) | Any individual skill, agent config, or other standalone item | `templates/item-readme-template.md` |
| [Prompt](./templates/prompt-template.md) | Prompt contributions (system prompts, task prompts, chains) | `templates/prompt-template.md` |
| [Project README](./templates/project-readme-template.md) | Full working example projects under `/projects` | `templates/project-readme-template.md` |
| [OpenSkill](./templates/openskill-template.md) | Cross-tool portable skill definitions under `/cross-tool/openskills` | `templates/openskill-template.md` |

**Item README template** covers the basics every item needs: purpose, compatibility, usage, example, and notes. Use this for anything in `skills/`, `agents/`, or `cross-tool/shared-patterns/`.

**Prompt template** extends the item structure with prompt-specific sections: the prompt text in a copy-friendly code block, a variables table for placeholders, input/output examples, optional variations, and a "how it works" section explaining the prompt engineering techniques used. Use this for anything in `prompts/`.

**Project README template** adds project-specific sections: prerequisites, setup from a clean clone, project structure map, a walkthrough explaining how pieces fit together, and a list of va-ai items the project uses.

**OpenSkill template** includes the canonical tool-agnostic skill definition, separate adapter sections for Claude and Copilot, cross-tool examples, and portability notes documenting parity and gaps between tools.

---

## Status Labels for Contributions

Every item needs a status badge. New community contributions should use one of these:

| Label | When to use it |
|---|---|
| ![Community](https://img.shields.io/badge/status-community-blue) | Default for community contributions. You've used it, it works, but it hasn't been deeply tested across environments. |
| ![Experimental](https://img.shields.io/badge/status-experimental-orange) | Proof of concept or early-stage work. You think the approach is sound but it needs more refinement. |

Maintainers may promote items to higher maturity levels (Beta, Stable, Production-Ready) over time based on testing, feedback, and community validation. Don't assign these labels to your own contributions.

Badge markdown for your README:

```markdown
![Community](https://img.shields.io/badge/status-community-blue)
![Experimental](https://img.shields.io/badge/status-experimental-orange)
```

---

## Branch and PR Process

### Branch Naming

Use the pattern: `type/tool/short-description`

Examples:
- `prompts/claude/code-review-system-prompt`
- `skills/copilot/workspace-config-react`
- `cross-tool/openskill-test-generation`
- `guides/claude-code/mcp-setup-improvements`
- `projects/context-engine-starter`
- `fix/typo-in-agents-readme`

### Pull Request Process

**1. Fork the repo and create your branch.**

```bash
git checkout -b prompts/claude/code-review-system-prompt
```

**2. Add your content following the guidelines above.**

**3. Self-review checklist before opening the PR:**

- [ ] Item has its own folder with a `kebab-case` name
- [ ] README.md is present and follows the appropriate template
- [ ] Status badge is included (Community or Experimental for new contributions)
- [ ] Compatibility section lists the specific tool(s) and version(s) tested
- [ ] Usage instructions are clear enough for someone unfamiliar with the item
- [ ] At least one concrete example is included
- [ ] Files are in the correct category and tool subfolder
- [ ] No sensitive, proprietary, or personally identifiable information is included

**4. Open a PR with a clear description.**

Your PR description should include:

- What the contribution is and where it lives in the repo
- What tool(s) and version(s) you tested it with
- Any context on how you've used it in practice
- The status label you've assigned and why

**5. Respond to review feedback.**

Maintainers will review for quality, accuracy, proper placement, and documentation completeness. We aim to review PRs within a week.

---

## Writing Style

Keep content practical and direct. A few guidelines:

- **Show, don't just tell.** Include concrete examples. A prompt with an example input/output is far more useful than a prompt alone.
- **Be specific about compatibility.** "Works with Claude Code" is less useful than "Tested with Claude Code v1.x on macOS, using Node 20."
- **Use hyphens, not em-dashes.** This is a repo-wide convention.
- **Name things by purpose.** `code-review-system-prompt` tells you what it does. `prompt-v3-final` does not.
- **Keep READMEs scannable.** Someone should be able to understand what an item does and whether it's relevant within 30 seconds of reading the README.

---

## Folder and File Conventions

- **Folder names**: `kebab-case` (e.g., `code-review-system-prompt/`)
- **File names**: `kebab-case` (e.g., `review-prompt.md`)
- **Standard files**: Keep their conventional casing (README.md, CLAUDE.md, SKILL.md)
- **Samples**: Go in the `_samples/` folder within the relevant type/tool directory
- **Templates**: Reference templates live in `/templates` - copy them, don't modify the originals

---

## Code of Conduct

Be respectful, constructive, and helpful. We're building a resource for the community and that works best when everyone contributes in good faith. Unhelpful, dismissive, or hostile behavior won't be tolerated.

---

## Questions?

If you're unsure where something belongs, what status to assign, or whether an idea is in scope, open an issue and ask. We'd rather help you get a contribution right than have you guess and get discouraged.
