# Path -- Prompt Craft

The difference between a frustrating AI experience and a productive one is almost always the prompt. This path is about building the instinct to write prompts that work on the first try.

## The Core Idea

Most people prompt like this:

> "Fix the bug"

And then wonder why the AI did the wrong thing. The fix is not longer prompts -- it is more specific prompts. Specificity beats verbosity every time.

## Exercise 1 -- The Specificity Ladder (5 min)

Take this vague prompt and rewrite it four times, each more specific:

**Starting prompt:** "Fix the bug in the login"

Try these levels:

1. **Add the symptom.** What is actually happening vs what should happen?
2. **Add the location.** Which file, which function, which line?
3. **Add a test case.** What input produces the wrong output?
4. **Add a constraint.** What must not change?

Give each version to your tool and compare the results. Notice when the tool stops asking clarifying questions -- that is the level of specificity it needed.

## Exercise 2 -- Constraint-Driven Prompting (5 min)

Telling AI what NOT to do is often more useful than telling it what to do.

Try this: pick any task (add logging, refactor a function, write a test) and write a prompt that includes at least 3 constraints:

Example:
> "Add error logging to the checkout function. Do not change the function signature. Do not add any new dependencies. Do not log sensitive data like credit card numbers. Keep each log statement to one line."

Compare the result to what you get without constraints. Notice how constraints prevent the AI from over-engineering.

## Exercise 3 -- Show, Do Not Tell (5 min)

When a pattern is hard to describe, show an example instead.

Try this:
1. Find two similar functions in any codebase (or make them up)
2. Manually refactor one to the style you want
3. Show the AI the before/after of that one function
4. Ask it to apply the same pattern to the second function

This works for renaming conventions, error handling patterns, test styles -- anything where "do it like this" is clearer than a paragraph of rules.

## What to Notice

- At what specificity level did your tool start giving good results?
- Did constraints reduce the number of follow-up corrections?
- Was showing an example faster than describing the rule?
- What is your default prompting style, and what would you change?

## Going Deeper

- Read your last 5 AI conversations. Find the moment it went wrong. Rewrite that prompt.
- Build a personal prompt template for a task you do repeatedly (code review, PR description, test writing).
- Practice "prompt before you prompt" -- before typing, spend 10 seconds deciding what the AI needs to know.
