# Path -- Large Project Orchestration

By the end of this path, you will have planned and started executing a multi-step project using your AI tool -- breaking a big task into manageable pieces that an AI can actually handle.

## The Goal

Take a large task that feels too big for AI and break it down into a plan that works.

## Exercise 1 -- Break It Down (5 min)

Pick a real project or task that has been sitting on your backlog because it feels too big. Examples:

- Migrate a codebase from one framework to another
- Add accessibility compliance across 20 pages
- Refactor a monolithic module into smaller services
- Set up CI/CD for a project that has none

Ask your AI tool:

> "I need to [big task]. Break this down into steps I can do one at a time. Each step should be small enough to complete in one session, testable on its own, and safe to merge independently."

Review the plan. Push back:

> "Step 3 is too big. Break it into smaller pieces. And reorder so the riskiest step comes first."

## Exercise 2 -- Execute One Step (5 min)

Pick the first step from the plan and actually do it:

> "Let us do step 1: [the step]. Here are the relevant files. Go."

As you work through it, notice:
- Did the AI remember the overall plan while executing the step?
- Did it try to do too much (scope creep)?
- Did the step turn out to be the right size, or did it need to be broken down further?

## Exercise 3 -- Track Progress (5 min)

After completing one step, update the plan:

> "Step 1 is done. Here is what actually happened: [brief summary]. Update the plan -- does anything need to change for the remaining steps?"

This is the orchestration skill: plans change when they meet reality. The AI should help you adapt, not rigidly follow the original plan.

If your tool supports it, save the updated plan somewhere persistent (a markdown file, a project doc, memory) so your next session picks up where you left off.

## What You Built

A real plan for a real project, with one step completed and the rest scoped. You now have a pattern for tackling any large task with AI assistance.

## Going Deeper

- **Parallel execution**: If steps are independent, run them in parallel sessions or background agents
- **Progress files**: Keep a `PLAN.md` in your repo that tracks the state of a multi-session project
- **Handoff documents**: At the end of each session, generate a handoff note so the next session (or another person) can pick up cleanly
- **Risk-first ordering**: Always do the riskiest or most uncertain step first. If it fails, you want to know early, not after you have done 9 other steps
- **Spike and commit**: For steps you are unsure about, do a quick spike (exploratory work), evaluate the result, then commit to the full implementation
