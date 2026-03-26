# Path -- Code Review

Code review is one of the highest-leverage uses of AI tools. Not to replace human review, but to catch things faster and give you a head start before you read the diff yourself.

## The Core Idea

AI is good at:
- Spotting patterns across a large diff that a human might skim past
- Checking for common mistakes (missing error handling, unused imports, style violations)
- Summarizing what a PR actually does in plain language

AI is not good at:
- Judging whether the approach is right for the team
- Understanding business context behind a change
- Catching subtle design mistakes that require institutional knowledge

The skill is knowing what to delegate and what to do yourself.

## Exercise 1 -- Structured Review (5 min)

Pick any recent PR (yours or a teammate's) and ask your AI tool to review it across four dimensions:

> "Review this diff for: (1) correctness -- any bugs or logic errors, (2) performance -- anything unnecessarily slow, (3) style -- anything inconsistent with the codebase, (4) missing tests -- any new behavior that is not tested."

If your tool can access GitHub, point it at the PR directly. If not, paste the diff.

Compare the AI's review to your own read of the PR. What did it catch that you might have missed? What did it flag that does not actually matter?

## Exercise 2 -- The Pre-Review Checklist (5 min)

Before submitting your own PR, use the AI as a pre-reviewer:

1. Ask your tool to look at your uncommitted changes
2. Ask: "If you were reviewing this PR, what would you flag?"
3. Fix anything legitimate before pushing

This is the fastest way to reduce review cycles. Catch your own mistakes before anyone else sees them.

## Exercise 3 -- Summarize a Complex PR (5 min)

Find a PR with 10+ files changed. Ask your tool:

> "Summarize this PR in 3 bullet points. What is the main change, what is the riskiest part, and what should a reviewer pay the most attention to?"

This is useful both as an author (write better PR descriptions) and as a reviewer (get oriented before diving into the diff).

## What to Notice

- Did the AI catch any real issues, or was it mostly noise?
- Was the structured review (4 dimensions) more useful than an open-ended "review this"?
- How much time would pre-reviewing save across a week?
- Did the summary actually help you understand the PR faster?

## Going Deeper

- Build a reusable review prompt template tailored to your team's conventions
- Try having the AI generate review comments as GitHub-formatted suggestions (with code blocks)
- Use AI to check for security issues specifically (OWASP top 10, injection risks, auth gaps)
- Experiment with reviewing your own code immediately after writing it -- the "rubber duck" effect
