# Path -- Debugging

AI can be a remarkably good debugging partner -- if you know how to point it at the right information. This path is about using AI to go from "something is broken" to "here is the fix" faster.

## The Core Idea

Debugging with AI works best when you:
1. Give it the error, not just the symptom
2. Point it at the right code, not the whole codebase
3. Ask it to form hypotheses, not just fix things

The mistake most people make is pasting an error message and saying "fix it." The skill is giving enough context for a real diagnosis.

## Exercise 1 -- Log-Driven Debugging (5 min)

Find (or create) an error in any codebase. Then:

1. Copy the error output, stack trace, or log
2. Give it to your AI tool with: "Here is the error. What are the 3 most likely causes? Do not fix anything yet -- just diagnose."
3. Read the hypotheses. Do they make sense?
4. Ask: "Which of these is most likely given [additional context]?"
5. Then ask for the fix

The two-step approach (diagnose first, then fix) produces better results than "fix this error" because it forces the AI to reason before acting.

## Exercise 2 -- Rubber Duck Debugging (5 min)

Use the AI as a rubber duck -- explain the problem to it and see if the explanation itself reveals the answer.

1. Pick a bug you are currently stuck on (or invent a tricky one)
2. Explain it to your tool step by step: what you expected, what happened, what you have tried
3. Ask: "Based on what I described, what am I missing?"

Often the AI will spot the gap in your reasoning before it even looks at the code.

## Exercise 3 -- Hypothesis Testing (5 min)

When the cause is not obvious, use the AI to design experiments:

1. Describe the bug
2. Ask: "Give me 3 hypotheses for what could cause this and a quick test I can run for each to confirm or rule it out"
3. Run the tests
4. Report results back and let the AI narrow it down

This is how experienced debuggers work -- hypothesize, test, eliminate. The AI just accelerates the cycle.

## What to Notice

- Did diagnosing before fixing produce a better result?
- Was the rubber duck approach useful even when the AI did not know the answer?
- Did hypothesis testing narrow things down faster than guessing?
- What debugging information does your tool need that it cannot access on its own?

## Going Deeper

- Practice feeding your tool different types of evidence: stack traces, log files, network responses, screenshots
- Try debugging across service boundaries -- give the AI context from multiple systems
- Experiment with asking the AI to reproduce a bug in a test before fixing it
- For production issues, practice the "timeline" technique: ask the AI to reconstruct what happened step by step from logs
