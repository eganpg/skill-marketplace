# Path -- Context Management

The most common reason AI gives bad answers is not that it is dumb -- it is that it is working with the wrong information. This path is about feeding your tool the right context and keeping it focused.

## The Core Idea

Every AI tool has a context window -- a limit on how much information it can hold at once. The skill is not stuffing it full. The skill is putting the right things in and keeping the wrong things out.

Think of it like a whiteboard. You have limited space. If you write everything on the board, nothing stands out. If you write only what matters, the AI can focus.

## Exercise 1 -- Context Audit (5 min)

Start a conversation with your AI tool about any task. Then audit what it knows:

1. Ask: "What files are you currently aware of?"
2. Ask: "What do you think this project does?"
3. Ask: "What information would you need to do [your task] well?"

Compare what it has vs what it needs. The gap is where your prompting needs to improve.

Then try:
- Explicitly reference the files it needs
- Give a one-sentence summary of the project
- Remove anything irrelevant from the context (if your tool allows it)

## Exercise 2 -- Less Is More (5 min)

Try solving the same task two ways:

**Way 1**: Give the AI your entire project as context (or let it explore freely)

**Way 2**: Give it only the 2-3 files that matter and a one-line description of the task

Compare the results. Way 2 is almost always better, faster, and cheaper.

Practice identifying the minimum context needed. Before every prompt, ask yourself: "What are the 2-3 things the AI needs to see to do this well?"

## Exercise 3 -- Context Reset (5 min)

Long conversations accumulate stale context -- old decisions, dead ends, abandoned approaches. Practice the clean restart:

1. Work on a task for several messages
2. Notice when the AI starts referencing something outdated or confused
3. Start a fresh session with a clear, focused summary: "I am working on X. The current state is Y. The remaining task is Z."

Compare: is the fresh-start response better than continuing the cluttered conversation?

Most people hold onto long conversations too long. Knowing when to reset is a skill.

## What to Notice

- Did the AI know less about your project than you assumed?
- Was the targeted approach (2-3 files) better than the broad approach?
- How long before a conversation gets stale and needs a reset?
- What context do you always need to provide that you wish your tool had automatically?

## Going Deeper

- **Custom instructions as pre-loaded context**: Put your project's architecture and conventions in CLAUDE.md or equivalent so every session starts with the right baseline.
- **Reference files over paste**: Pointing to a file is better than pasting its contents because the tool can re-read it if needed.
- **Context layering**: Start with high-level context (project overview), then add detail only when the AI asks or gets stuck.
- **Token awareness**: Learn how to check your tool's context usage. Stay under 50% for the best quality responses.
