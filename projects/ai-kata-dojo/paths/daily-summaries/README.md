# Path -- Daily Summaries

By the end of this path, you will have generated a real daily summary of your work using your AI tool -- and a repeatable process for doing it every day.

## The Goal

Produce a daily summary that you could paste into a standup message, a work log, or a status update. In under 2 minutes.

## Exercise 1 -- Summarize Today (5 min)

Ask your AI tool to help you build a summary of what you did today (or yesterday):

> "Help me write a daily summary. Here is what I worked on: [briefly list 2-3 things]. For each item, write one sentence about what I did and one sentence about what is next."

If your tool can see your git history:

> "Look at my git commits from today and write a summary of what I accomplished."

If your tool can see your open PRs:

> "Check my open PRs and summarize their status -- which are ready for review, which have feedback, which are blocked."

## Exercise 2 -- Build a Template (5 min)

Create a reusable daily summary template that you can run every day:

```
What I did:
- [completed items]

What is in progress:
- [open items and their status]

Blockers:
- [anything blocking you, or "none"]

Tomorrow:
- [what you plan to work on next]
```

Ask your tool:

> "Every time I ask you for a daily summary, use this format. Pull from my git history, open PRs, and anything I tell you about my day."

Save this as a custom instruction or persistent prompt so you do not have to repeat it.

## Exercise 3 -- Automate It (5 min)

If your tool supports it, set up a way to generate this with minimal effort:

- **Claude Code**: Create a custom slash command or skill that generates the summary
- **CLI tools**: Write a shell alias that runs the summary prompt
- **Desktop apps**: Save the prompt as a template you can reuse with one click

Try running it right now. How close is the output to something you would actually send?

## What You Built

A daily summary for today and a repeatable process for generating one every day. If you committed to using this for one week, you would never miss a standup update again.

## Going Deeper

- Generate weekly summaries from your daily summaries
- Include links to PRs, tickets, and commits in your summaries automatically
- Set up a morning briefing: "What is on my plate today?" based on your calendar, tickets, and open PRs
- Share your summary template with your team and make it a team practice
