# Path -- Error Recovery

AI tools make mistakes. They will break your code, misunderstand your intent, and confidently do the wrong thing. This path is about fixing those situations efficiently without starting over.

## The Core Idea

The worst thing you can do when AI breaks something is panic and undo everything. The second worst thing is let the AI keep going deeper into the wrong direction. The skill is surgical correction -- fix exactly what went wrong and keep moving.

## Exercise 1 -- The Surgical Fix (5 min)

Deliberately let your AI tool make a mistake (or recall a recent one):

1. Give it a task with ambiguous instructions and let it make its best guess
2. When the result is wrong, resist the urge to say "undo everything"
3. Instead, say exactly what is wrong: "The function name should be X not Y" or "You changed file A but should have changed file B"
4. Let it fix just that part

Practice giving corrections that are as specific as the mistake. "That is wrong, try again" will get worse results than "Line 42 should return an empty array, not null."

## Exercise 2 -- The Undo Stack (5 min)

Know your escape routes before you need them:

1. Ask your tool: "How do I undo your last change?"
2. Try it. Does it work?
3. Ask: "How do I see what you changed?"
4. Review the diff

Different tools have different undo mechanisms:

| Tool | How to Undo |
|------|------------|
| Claude Code | Git -- the changes are in your working tree, use `git diff` and `git checkout` |
| Cursor | Ctrl/Cmd+Z in the editor, or reject the suggestion |
| VS Code Copilot | Ctrl/Cmd+Z or dismiss the suggestion |
| Desktop apps | The code is only in the chat -- you control what you paste |

The key insight: if you are using a tool that edits files directly, make sure you are committing often. Small commits are your undo stack.

## Exercise 3 -- The Redirect (5 min)

Sometimes the AI is not wrong about the code but wrong about the approach. Practice redirecting:

1. Start a task and let the AI begin its approach
2. After 1-2 steps, change direction: "Stop. I do not want to refactor the whole module. Just add the new function to the existing file."
3. See how well it pivots

Good redirects are:
- "Stop. Instead, do X."
- "Keep what you did in file A but revert file B."
- "That approach is too complex. Do the simplest thing that works."

Bad redirects are:
- "That is wrong." (No direction)
- "Try again." (Same approach, same result)

## What to Notice

- Was the surgical fix faster than starting over?
- Do you know how to undo changes in your tool without losing other work?
- How well did your tool handle a redirect mid-task?
- What is your instinct when AI breaks something -- panic, undo, or fix?

## Going Deeper

- **Commit before you prompt**: Make it a habit to commit (or stash) before asking the AI to make changes. This gives you a clean rollback point.
- **Diff review habit**: After every AI-generated change, review the diff before moving on. Catch mistakes early.
- **The "what did you change" prompt**: Always ask the AI to explain what it did. If it cannot explain it clearly, something is probably wrong.
- **Error patterns**: Track the kinds of mistakes your tool makes most often. You will start anticipating them.
