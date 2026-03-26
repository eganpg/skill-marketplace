# SOP Creator

![Community](https://img.shields.io/badge/status-community-blue)

## Purpose

Guides users step by step through creating a Standard Operating Procedure (SOP) document. Handles both fresh creation and pre-filling from an existing document (draft SOP, meeting notes, Google Drive doc). Produces a finished Markdown file structured around a 10-section SOP template.

Use this skill when you need to document a process, formalize an existing workflow, or create a new SOP from scratch.

## Compatibility

- **Tool:** Claude Code
- **File:** `SKILL.md`

## Usage

1. Copy `SKILL.md` into your project at `skills/sop-creator/SKILL.md`.
2. Register the skill in your `CLAUDE.md` skills table:
   ```
   | sop-creator | `skills/sop-creator/SKILL.md` | Guides user through creating a Standard Operating Procedure |
   ```
3. In a Claude Code session, invoke it:
   ```
   use the sop-creator skill
   ```
4. Claude asks if you have an existing document to start from (paste content, share a Google Drive link, or start fresh).
5. Claude walks through each of the 10 sections one at a time, waiting for your input before moving on.
6. When all sections are complete, Claude saves the result as `[sop-name-kebab-case].md`.

## Example

**User:**
```
use the sop-creator skill
```

**Claude:**
> Before we begin — do you have an existing document to start from? This could be a draft SOP, a Google Drive doc, or any other company document with relevant content.
>
> - If yes: paste the content here, or share a Google Drive link and I'll read it
> - If no: just say **start fresh** and we'll go section by section

**User:** start fresh

**Claude:**
> Here's what we'll work through:
> 1. **Name** — What's this SOP called?
> 2. **Purpose** — Why does this SOP exist?
> 3. **Scope** — Who does it apply to?
> 4. **Responsibilities** — Roles and what they're responsible for
> 5. **Procedure** — The actual steps
> 6. **Supporting Processes & Historical Context**
> 7. **Considerations**
> 8. **Tools and Formats**
> 9. **Additional Notes**
> 10. **References**
> 11. **Deviations**
>
> For any section you don't have content for, just say **N/A** and we'll skip it. Let's go!
>
> **What is the name of this SOP?**

**User:** Quarterly Conversations SOP

**Claude:**
> Got it. **Section 1 — Purpose:** Describe the purpose of this SOP. Why is it important, and what should it accomplish? (N/A to skip)

*(Claude continues through each section, then assembles and saves `quarterly-conversations-sop.md`.)*
