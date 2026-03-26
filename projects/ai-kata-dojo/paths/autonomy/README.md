# Path -- Autonomy

Most people use AI tools in a tight back-and-forth loop: prompt, review, prompt, review. But many tools now support a more autonomous mode where the AI plans, executes, and delivers a complete result. This path is about learning when to let go of the steering wheel.

## The Core Idea

There is a spectrum:

```
Manual ---- Copilot ---- Conversation ---- Agent ---- Autonomous
(you type)  (suggestions) (back & forth)   (plans+acts) (runs alone)
```

Most people are stuck in the middle. The skill is knowing when to move right (let the AI do more) and when to move left (take back control).

## Exercise 1 -- Plan Before Execute (5 min)

Instead of asking the AI to make a change directly, ask it to plan first:

1. Pick a task (refactor, new feature, bug fix)
2. Ask: "Do not make any changes yet. First, tell me your plan -- what files you would change, in what order, and why."
3. Review the plan. Is it right? Ask for changes if not.
4. Then say: "Go ahead and execute the plan."

Compare this to your normal workflow. Did planning first reduce the number of corrections you had to make?

## Exercise 2 -- Let It Run (5 min)

Give the AI a well-defined task and let it run without interrupting:

> "Add input validation to the signup form. Validate email format, password length (min 8), and that the password confirmation matches. Add tests for each validation rule. Do everything -- do not stop to ask me questions."

The key phrase is "do not stop to ask me questions." This forces the AI into autonomous mode. Review the result as a whole instead of step by step.

Was the result better or worse than your usual interactive approach?

## Exercise 3 -- Scope the Autonomy (5 min)

Autonomy works best when the task is well-scoped. Practice defining the boundaries:

Try writing a prompt that includes:
- **What to do**: the specific task
- **Where to do it**: which files or directories
- **What not to touch**: explicit boundaries
- **How to verify**: what "done" looks like (tests pass, lint passes, etc.)

The more clearly you scope it, the more safely you can let the AI run on its own.

## What to Notice

- Did planning first improve the final result?
- Was the autonomous result better or worse than interactive?
- How much did scoping affect the quality of autonomous work?
- At what task complexity did you lose trust in the autonomous result?

## Going Deeper

- **Background agents**: Some tools (Claude Code, Cursor) can run tasks in the background while you do other work. Try spinning one up for a well-scoped task.
- **Worktree agents**: For CLI tools, you can run an agent in a separate git worktree so it cannot break your current branch. This is the safest way to experiment with autonomy.
- **Iterative autonomy**: Start with a small autonomous task. If it works, give a bigger one. Build trust incrementally.
- **Review, do not redo**: When an autonomous result is 80% right, fix the 20% instead of starting over. This is usually faster.
