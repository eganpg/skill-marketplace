---
name: sop-creator
description: >
  Guides the user step by step through creating a Standard Operating Procedure (SOP)
  using the company SOP template. Use this skill whenever the user says anything like
  "create an SOP", "new SOP", "write a procedure", "fill out the SOP template",
  "I need an SOP for...", or "help me document a process". Can optionally read an
  existing document (draft SOP, Google Drive doc, meeting notes, project brief) and
  pre-fill sections from it, then prompt the user only for missing information.
  Walk through all 10 sections interactively and produce a finished Markdown file.
---

# SOP Creator Skill

## Overview

This skill guides the user through creating a completed SOP document, section by section,
based on the company SOP template. It optionally reads an existing source document to
pre-fill what it can, shows the user what it found section by section for confirmation,
prompts only for gaps, and produces a final `.md` file.

---

## Step 0: Document Intake

Start by asking:

> "Before we begin — do you have an existing document to start from?
> This could be a draft SOP, a Google Drive doc, or any other company document
> with relevant content.
>
> - If yes: paste the content here, or share a Google Drive link and I'll read it
> - If no: just say 'start fresh' and we'll go section by section"

### If the user shares a document or link:

1. Read the full content.
   - If a Google Drive link is provided, use the Google Drive tool to fetch it.
   - If content is pasted directly, read it as-is.

2. Silently map content to each of the 10 SOP sections.

3. Present findings **one section at a time**, waiting for confirmation before moving on:

> "Here's what I found — I'll go through each section and you can confirm, correct, or skip.
>
> **SOP Name:** [extracted name, or 'Not found — I'll ask you']
> Does this look right? (confirm / edit / skip)"

For each subsequent section, follow the same pattern:
> "**Section X — [Name]:**
> [extracted content, or 'Nothing found — I'll ask you to fill this in']
> Does this look right? (confirm / edit / skip)"

- **Confirm / "looks good"**: store as-is, move to next section
- **Edit / provides correction**: update with their input, move to next section
- **Skip**: mark as N/A, move to next section
- **Nothing found**: ask the user to provide it (same prompts as the fresh flow)

### If the user starts fresh:

Skip document intake and go directly to Step 1.

---

## Step 1: Show the Plan

After document intake (or at the start if fresh), show the plan:

> "Here's what we'll work through:
> 1. **Name** — What's this SOP called?
> 2. **Purpose** — Why does this SOP exist?
> 3. **Scope** — Who does it apply to?
> 4. **Responsibilities** — Roles and what they're responsible for (built as a table)
> 5. **Procedure** — The actual steps
> 6. **Supporting Processes & Historical Context** — Related processes and history
> 7. **Considerations** — Anything else worth noting
> 8. **Tools and Formats** — Any required tools or formats
> 9. **Additional Notes** — Quick-reference or overview
> 10. **References** — Links and sources
> 11. **Deviations** — Known exceptions to the process
>
> For any section you don't have content for, just say **N/A** and we'll skip it.
> Let's go!"

Then proceed through only sections that still need input (not already confirmed above).

---

## Steps 2–12: Section Prompts

For each section not already confirmed during document intake, prompt as follows.
Always wait for a response before moving to the next section.

**SOP Name:** "What is the name of this SOP?"

**Section 1 — Purpose:** "Describe the purpose of this SOP. Why is it important, and what should it accomplish? (N/A to skip)"

**Section 2 — Scope:** "Which roles does this SOP apply to, and who does it impact? (N/A to skip)"

**Section 3 — Responsibilities:** Build conversationally — never ask the user to write a table.
  - "The template includes these default roles: Program Manager, Engineering Lead, Division Lead. Are these right, or would you like to add/remove/rename any? (N/A to skip)"
  - For each role: "What are the responsibilities of the [Role]?"
  - After each: "Any additional roles to add?"
  - Build the markdown table internally from responses.

**Section 4 — Procedure:** "Outline the steps in the procedure. Give me a rough list and I'll format it. (N/A to skip)"

**Section 5 — Supporting Processes & Historical Context:** "Any related processes (with links) or relevant historical context? (N/A to skip)"

**Section 6 — Considerations:** "Any additional considerations? Include links where appropriate. (N/A to skip)"

**Section 7 — Tools and Formats:** "Is there a specific tool or format required? (N/A to skip)"

**Section 8 — Additional Notes:** "Any additional information, like an overview or quick-reference? (N/A to skip)"

**Section 9 — References:** "Any references to link here? (N/A to skip)"

**Section 10 — Deviations:** "Any known deviations from the process to document? (N/A to skip)"

---

## Final Assembly

Say: "Great — assembling your SOP now..."

Produce a `.md` file, omitting any N/A sections:
```markdown
# [SOP_NAME]

## 1. Purpose
[content]

## 2. Scope
[content]

## 3. Responsibilities
| Role | Responsibilities |
| ------ | ------ |
| [Role] | [Responsibilities] |

## 4. Procedure
[content]

## 5. Supporting Processes and Historical Context
[content]

## 6. Considerations
[content]

## 7. Tools and Formats
[content]

## 8. Additional Notes
[content]

## 9. References
[content]

## 10. Deviations
[content]
```

Save as `[sop-name-kebab-case].md` and present to the user.

---

## Key Behaviors

- **One section at a time** — always wait for a response before moving on.
- **Never show the raw template** — guide conversationally.
- **Reformat freely** — clean up rough notes into proper lists/prose.
- **N/A handling** — omit skipped sections from the final document.
- **Responsibilities table** — always build conversationally, never ask for raw markdown.
- **Document intake** — present findings one section at a time for confirmation. Never silently assume content is correct.
- **Google Drive** — use the Google Drive tool if a link is provided. If unavailable, ask the user to paste the content.
- **Only ask about gaps** — skip sections already confirmed during document intake.
