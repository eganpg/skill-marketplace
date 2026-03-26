# Path -- Custom Instructions

Every time you correct your AI tool, you are doing work that could be done once and saved forever. Custom instructions let you encode your preferences so the tool remembers them across sessions.

## The Core Idea

Most AI tools support some form of persistent configuration:

| Tool | Config File |
|------|------------|
| Claude Code | `CLAUDE.md` in your project root (or `~/.claude/CLAUDE.md` for global) |
| Cursor | `.cursorrules` in your project root |
| Copilot | `.github/copilot-instructions.md` or VS Code settings |
| Aider | `.aider.conf.yml` or conventions file |
| Others | Check your tool's docs -- most have something |

The file tells the AI about your codebase, your conventions, and your preferences before you type a single prompt.

## Exercise 1 -- Write Your First Config (5 min)

If you do not already have a custom instructions file for your current project, create one now.

Start with just these sections:

```markdown
## Tech Stack
[List your languages, frameworks, and key tools]

## Conventions
[List 3-5 rules your team follows -- naming, testing, formatting]

## Do Not
[List 2-3 things the AI should never do in this codebase]
```

That is it. Keep it short. You can always add more later.

## Exercise 2 -- Turn Corrections Into Instructions (5 min)

Think about the last 3 times you corrected your AI tool. Things like:
- "No, we use single quotes not double quotes"
- "Do not add comments to every line"
- "We never use any in TypeScript"
- "Always run tests after making changes"

Write each correction as a persistent instruction in your config file. Be specific -- "use single quotes for JavaScript strings" is better than "follow our style guide."

## Exercise 3 -- Test Your Config (5 min)

Now verify it works:

1. Start a fresh session (clear context or open a new conversation)
2. Ask the AI to do a small task in your codebase
3. Check whether it followed your custom instructions without you reminding it
4. If it did not, your instructions might be too vague -- tighten them up

## What to Notice

- How much did the config reduce your need to correct the AI?
- Were any of your instructions ignored? Why?
- What is the minimum effective config -- the smallest file that still makes a difference?
- Does your tool load the config automatically, or do you need to reference it?

## Going Deeper

- Add a section for common gotchas ("the tests in /legacy are broken, do not try to fix them")
- Add architecture notes so the AI understands your project structure without exploring every folder
- Try folder-level configs for monorepos -- different rules for frontend vs backend
- Review someone else's config file and steal ideas
