# PM Ticket Writer

**Version:** 1.0.0
**Author:** Pete Egan
**Category:** Code & Development

## Overview

Stop spending 10 minutes writing Jira tickets. Describe a bug or feature in plain English, and this skill generates a fully structured ticket ready to copy into Jira — complete with summary, description, acceptance criteria, reproduction steps (for bugs), and a story point estimate with reasoning.

## What It Does

For **bug reports**, generates:
- Concise summary line
- Description with observed vs. expected behavior
- Step-by-step reproduction steps
- Severity suggestion (Critical / High / Medium / Low)
- Affected components / labels suggestion
- Story point estimate with reasoning

For **feature requests**, generates:
- Summary line
- User story (`As a [user], I want [goal] so that [reason]`)
- Acceptance criteria (checklist format)
- Out-of-scope notes
- Dependencies / blockers to flag
- Story point estimate with reasoning

## How to Use

1. Activate the **Jira Ticket Writer** skill
2. Describe the bug or feature in plain English — no special format required
3. Optionally add context: `"This is for the mobile app team"` or `"This is a P1 bug reported by a customer"`
4. Copy the output into your Jira create-ticket form

## Example Input (Bug)

```
users are getting logged out randomly after about 20 minutes even when they haven't done anything.
started happening after the auth refactor last week. only seems to affect users on safari.
```

## Example Output (Bug)

**Summary:** Users unexpectedly logged out after ~20 minutes on Safari following auth refactor

**Description:**
Users are being logged out without action after approximately 20 minutes of inactivity, but only on Safari. Issue began following the auth refactor deployed last week.

**Steps to Reproduce:**
1. Log in on Safari (any version)
2. Leave the browser tab open without interaction
3. After ~20 minutes, attempt any action
4. Observe: user is redirected to login page

**Expected:** User session persists for the configured session timeout duration
**Severity:** High
**Labels:** `auth`, `safari`, `regression`
**Story Points:** 3 — Root cause likely a Safari-specific session storage or cookie behavior; fix should be isolated once identified.

## Tips

- Mention the team or component for better label suggestions
- Include any error messages you've seen for more precise descriptions
- Works great for capturing bugs reported in Slack — paste the Slack thread and let Claude structure it

## Installation

After downloading, drag the `.skill` file into the Claude desktop app.
