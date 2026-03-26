# Path -- Multiple Sessions

Real work is not one task at a time. You get interrupted. You context-switch. You need to pick up where you left off. This path is about managing multiple streams of work with your AI tool.

## The Core Idea

Most AI tools are built around a single conversation. But you are not working on a single thing. The skill here is knowing how to:

- Start a new session without losing your current one
- Resume a previous session with full context
- Work on two things in parallel without them bleeding into each other

## Exercise 1 -- The Clean Switch (5 min)

Practice switching between two tasks:

1. Start a conversation about Task A (any real task or a made-up one)
2. Get 2-3 messages deep -- enough that the AI has context
3. Now switch to Task B without losing Task A
4. Come back to Task A and verify the context is intact

How you do this depends on your tool:

| Tool | How to Switch |
|------|--------------|
| Claude Code | Start a new session with `claude`, resume the old one from session history |
| Cursor | Open a new chat panel or composer |
| VS Code Copilot | Start a new chat thread |
| Desktop apps | Open a new conversation, go back to the old one |

The key question: when you came back to Task A, how much context did you lose?

## Exercise 2 -- The Handoff Note (5 min)

When you cannot resume a session cleanly, you need a handoff. Practice writing one:

1. Work on any task for a few minutes
2. Before closing the session, ask the AI: "Summarize where we are, what we decided, and what is left to do"
3. Start a fresh session
4. Paste the summary and continue working

Compare: how much faster is the handoff vs starting from scratch? This is a critical skill for when sessions expire, context fills up, or you switch machines.

## Exercise 3 -- Parallel Tracks (5 min)

If your tool supports it, try running two conversations at the same time:

- Session 1: working on a feature
- Session 2: investigating a bug

Keep them separate. Do not let context from one bleed into the other.

For CLI tools, this might mean two terminal windows. For IDE tools, two chat panels. For desktop apps, two browser tabs.

Notice: is it easy to keep them separate, or does your tool fight you?

## What to Notice

- Does your tool preserve session history automatically, or do you need to manage it?
- How much context survives a switch? All of it, some, none?
- Is the handoff note technique faster than re-explaining everything?
- Can your tool genuinely run two parallel sessions, or is it faking it?

## Going Deeper

- **Git worktrees**: For CLI tools, you can have separate sessions in separate worktrees -- each with its own branch and context. This is the cleanest way to do true parallel work.
- **Session naming**: Some tools let you name or tag sessions. Build a habit of naming them by task or ticket number.
- **Context budgeting**: If you know you will switch, keep each session focused. Do not let one session become a dumping ground for everything.
- **Handoff templates**: Create a standard format for your handoff notes so they are fast to write and easy to load.
