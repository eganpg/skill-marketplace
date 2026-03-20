# Skill Marketplace — User Flows

_Last updated: 2026-03-20_

---

## Overview

There are four types of people who interact with the site, each with a distinct path:

| Who | What they do | Where they start |
|---|---|---|
| **Browser** | Find and install a published skill | `index.html` |
| **Idea submitter** | Request a skill they need built | `roadmap.html` |
| **Skill submitter** | Submit a skill they've already built | `submit.html` |
| **Admin (Pete)** | Manage the pipeline, trigger builds, publish | `admin.html` |

---

## Flow 1 — Browsing and installing a skill

1. Land on **`index.html`** — the main catalog with all published skills in a card grid
2. Filter by category (sidebar) or search by keyword (search bar)
3. Click a skill card → go to **`skill.html?id=...`**
4. Read the description, tags, and README in the detail panel
5. Click **"Install Skill"** → downloads the `.skill` zip file
6. Install it in Claude

No account or login required at any step.

---

## Flow 2 — Submitting a skill idea

**Entry points:** "Submit an Idea" button in any nav, or directly via `roadmap.html`

1. Visit **`roadmap.html`** — see the kanban board showing all current roadmap items across four columns: Ideas → Approved → Building → Done
2. Click **"+ Submit an Idea"** → a form panel opens inline on the page
3. Fill in:
   - Skill name
   - Your name
   - What the skill should do (1–2 sentences, 200 char limit)
   - Why you need it / the use case (300 char limit)
   - Templates or documentation _(optional — copy/paste only, no file uploads)_
4. Click **"Open GitHub Issue"** → a pre-filled `[SKILL IDEA]` GitHub Issue opens in a new tab with the `skill-idea` label applied
5. Submit the issue — done

> **Note:** The idea does **not** appear on the roadmap automatically. Pete reviews the issue and manually adds it to `roadmap.json` when approving it.

---

## Flow 3 — Submitting a built skill

**Entry points:** "Submit a Skill" button in any nav, or directly via `submit.html`

### Path A — GitHub Pull Request _(preferred for developers)_

1. Fork the repo or create a branch: `git checkout -b skill/your-skill-name`
2. Add skill files:
   ```
   skills/your-skill-name/
   ├── your-skill-name.skill
   └── README.md
   ```
3. Add an entry to `skills/manifest.json`
4. Open a PR titled `[SKILL SUBMISSION] Your Skill Name`
5. Pete reviews, tests the skill, and merges

### Path B — Form submission _(for non-developers)_

1. Complete the pre-submission checklist:
   - Skill has been tested in Claude
   - `.skill` file is ready to attach
   - Tags are relevant and specific
   - README or documentation is included
2. Checklist completion unlocks the submit button
3. Fill in: skill name, your name, description, category, tags, optional reviewer notes
4. Click **"Open GitHub Issue"** → a pre-filled `[SKILL SUBMISSION]` issue opens
5. **Attach the `.skill` file directly to the GitHub Issue**
6. Pete reviews and opens a PR to add it to the marketplace

> This path bypasses the roadmap. The skill goes straight to review without appearing in the kanban board.

---

## Flow 4 — Admin managing the pipeline

**Entry point:** `admin.html` (linked from the Roadmap page footer, labeled "Pete only")

The admin page shows all roadmap items grouped by status. Each status has a specific action.

---

### 💡 Idea — submitted, not yet reviewed

**Action:** Review the idea. If it's worth building, click **"✅ Approve"**.

- A blue reminder banner appears with instructions
- Edit `roadmap.json`: set `"status"` to `"approved"` for that item ID
- Commit and push → item moves to the Approved column on the roadmap

---

### ✅ Approved — reviewed, queued to build

Two variants depending on how the item entered the roadmap:

#### Standard idea (no `.skill` file exists yet)

**Action:** Click **"🤖 Start Building"**

- A pre-filled `[SKILL BUILD]` GitHub Issue opens with full instructions for Claude:
  - What to build, the use case, any templates
  - Checklist: attach `.skill` zip, open PR, update roadmap
- An amber reminder banner appears with instructions
- Edit `roadmap.json`: set `"status"` to `"building"`, set `"githubIssue"` to the URL of the issue just created
- Commit and push → item moves to Building column

#### Submitted skill (`.skill` file already exists, `type: "ready"`)

**Action:** Click **"🔍 Review & Publish"** _(purple button)_

- A review-focused `[SKILL REVIEW]` GitHub Issue opens with a QA checklist:
  - Download and test the `.skill` file attached to the issue
  - Verify `SKILL.md` is present and well-formed
  - Verify `manifest.json` entry is complete
  - QA skill output against description
- A violet reminder banner appears with instructions
- Edit `roadmap.json`: set `"githubIssue"` to the issue URL
- Once QA passes and the PR merges: set `"status"` to `"done"`, add `"skillId"`

---

### 🔨 Building — actively in progress

No action button. Informational only.

- The linked GitHub Issue is visible at the bottom of the card
- Expand **"Update status instructions"** for a reminder of all valid status values

---

### 🚀 Done — published to marketplace

- A **"View in marketplace →"** link appears, pointing to `skill.html?id=...`
- Requires `"skillId"` in `roadmap.json` to match the `"id"` in `skills/manifest.json`

---

## The manual step

The roadmap kanban is **read-only** for all users — it reflects the current state of `roadmap.json`. There is no write API. Every status transition requires Pete to:

1. Edit `roadmap.json` directly
2. Commit and push to the repo
3. GitHub Pages rebuilds automatically (~1 min)

The reminder banners in the admin page bridge the gap between clicking a CTA and remembering to do the JSON edit.

---

## Data files

| File | Purpose |
|---|---|
| `skills/manifest.json` | Source of truth for all published skills |
| `roadmap/roadmap.json` | Source of truth for all roadmap items |

---

## Status reference

| Status | Meaning | Who sets it |
|---|---|---|
| `idea` | Submitted, pending review | Pete (after reviewing a GitHub Issue) |
| `approved` | Reviewed, cleared to build or publish | Pete (after clicking Approve in admin) |
| `building` | Build or review in progress | Pete (after clicking Start Building / Review & Publish) |
| `done` | Published to marketplace | Pete (after PR merges) |
