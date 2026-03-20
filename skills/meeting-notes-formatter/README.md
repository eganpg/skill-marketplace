# Meeting Notes Formatter

**Version:** 1.0.0
**Author:** Pete Egan
**Category:** Communication & Drafting

## Overview

Transforms raw meeting transcripts or bullet-point notes into a structured, consistently formatted summary that your team can act on immediately. No more hours lost deciphering cryptic notes — just paste and get a clean output.

## What It Does

Given raw meeting input (transcript, bullet points, or a mix), this skill produces:

- **Meeting summary** — 2–3 sentence overview of what was discussed
- **Key decisions** — bulleted list of decisions made during the meeting
- **Action items** — table with columns: Task, Owner, Due Date
- **Open questions** — items that were raised but not resolved
- **Next meeting agenda** (optional) — suggested topics to carry forward

## How to Use

1. Open Claude and activate the **Meeting Notes Formatter** skill
2. Paste your raw notes into the chat, or share a transcript
3. Optionally include context: `"This was a weekly engineering standup"` or `"We were discussing Q2 roadmap planning"`
4. Claude will return the structured output — copy it into your note-taking tool (Notion, Confluence, Google Docs, etc.)

## Example Input

```
standup today - john said he finished the auth PR, needs review by thursday
sarah is blocked on the design mockup waiting for brand colors from marketing
we decided to push the mobile release to april 15
nobody is sure who owns the analytics dashboard ticket
next standup tuesday
```

## Example Output

**Meeting Summary**
Weekly engineering standup covering current sprint blockers, a release timeline adjustment, and outstanding ticket ownership.

**Decisions**
- Mobile release pushed to April 15

**Action Items**
| Task | Owner | Due |
|------|-------|-----|
| Review auth PR | Team | Thursday |
| Send brand colors to Sarah | Marketing | ASAP |
| Clarify analytics dashboard ticket ownership | Team | Next standup |

**Open Questions**
- Who owns the analytics dashboard ticket?

## Tips

- The more context you give (team name, meeting type, attendees), the better the output
- Works with Zoom/Meet auto-generated transcripts — just paste the raw text
- For recurring meetings, save the output format you prefer and mention it: "Use the same format as last week"

## Installation

After downloading, drag the `.skill` file into the Claude desktop app. The skill will appear in your skills list.
