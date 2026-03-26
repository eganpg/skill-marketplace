# Path -- Notes and Memory

By the end of this path, you will have set up a system where your AI tool remembers useful things across sessions -- so you stop repeating yourself.

## The Goal

Configure your tool's memory so that your next session starts smarter than your last one ended.

## Exercise 1 -- Discover Your Tool's Memory (5 min)

Every major AI tool now has some form of persistent memory. Find yours:

| Tool | Memory Mechanism |
|------|-----------------|
| Claude Code | `CLAUDE.md` files + memory directory in `~/.claude/` |
| Claude Desktop | Project knowledge, or ask "remember this" |
| Cursor | `.cursorrules`, notepad feature, or project context |
| ChatGPT | Memory (Settings > Personalization > Memory) |
| Copilot | Custom instructions in VS Code settings |

Ask your tool:

> "Do you have any memory of previous conversations with me? What do you know about me or my project right now?"

Then ask:

> "How do I save something so you remember it next time?"

## Exercise 2 -- Teach It About You (5 min)

Give your tool 3 things to remember:

1. **Your role**: "I am a [frontend/backend/full-stack] engineer working on [project]"
2. **A preference**: "I prefer [testing framework / code style / communication style]"
3. **A project fact**: "[Project] uses [specific architecture / convention / constraint]"

Use whatever mechanism your tool supports. Then:

1. Close the session entirely
2. Start a brand new session
3. Ask: "What do you know about me?"

Did it stick?

## Exercise 3 -- Build a Working Notes Flow (5 min)

Try using your AI tool to manage notes from a real meeting or work session:

> "I just finished a meeting about [topic]. Here are my rough notes: [paste notes]. Clean these up, extract action items, and save them somewhere I can find them later."

If your tool has integrations (file system, notes app, etc.), have it save the notes to an actual file. If not, at least get a clean summary you can paste somewhere.

The goal is to start building the habit of using AI as a note-taking and memory partner, not just a code generator.

## What You Built

A configured memory system and a notes workflow. Your next AI session will start with context instead of from scratch.

## Going Deeper

- Set up a daily summary workflow: at the end of each day, ask your AI to summarize what you worked on
- Build a "people" memory: teach your tool about your teammates, what they work on, and how to reference them
- Create project-specific memory files for each repo you work in
- Experiment with memory hygiene: periodically ask "what do you know about me" and correct anything outdated
