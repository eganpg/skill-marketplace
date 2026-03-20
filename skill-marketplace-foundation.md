# Skill Marketplace — Foundation Document

**Project:** Internal Claude Skill Marketplace
**Author:** Pete Egan
**Date:** March 2026
**Status:** Pre-development foundation / PRD

---

## Overview

The Skill Marketplace is an internal company website where employees can discover, download, and install Claude skills and workflows. As the team creates new automations and skills, they are published to the marketplace for the rest of the company to use. The site is a static HTML/CSS/JS site powered by Tailwind CSS, with skill files stored and version-controlled in a GitHub repository.

---

## Goals

- Give employees a single place to find and install company-built Claude skills
- Make skill discovery easy through search, filtering, and tagging
- Create a lightweight submission + admin approval pipeline so any employee can contribute
- Make installation as frictionless as possible — ideally one click
- Keep the stack simple enough that non-developers can contribute skill files via GitHub

---

## Tech Stack

| Layer | Choice | Rationale |
|---|---|---|
| Frontend | HTML + CSS + vanilla JS | No build step, easy to host, no framework lock-in |
| Styling | Tailwind CSS (CDN) | Utility-first, fast to write, consistent design |
| Storage | GitHub repository | Version-controlled, free, easy PR-based approval workflow |
| Hosting | GitHub Pages | Free static hosting, auto-deploys on merge to `main` |
| Skill manifest | `manifest.json` | Single source of truth for all skill metadata |
| Skill files | `.skill` (zip archive) | Native Claude format — drag-and-drop installable |

---

## Repository Structure

```
skill-marketplace/
├── index.html                  # Main marketplace page
├── skill.html                  # Individual skill detail page
├── submit.html                 # Skill submission form / instructions
├── admin.html                  # (Optional) Admin review dashboard
├── assets/
│   ├── css/
│   │   └── styles.css          # Custom overrides on top of Tailwind
│   ├── js/
│   │   ├── marketplace.js      # Skill listing, search, filter logic
│   │   ├── skill-detail.js     # Individual skill page logic
│   │   └── submit.js           # Submission form logic
│   └── img/
│       └── logo.svg            # Company / marketplace logo
├── skills/
│   ├── manifest.json           # Master index of all published skills
│   └── [skill-name]/
│       ├── [skill-name].skill  # The installable .skill file
│       ├── icon.png            # Optional skill icon (128x128)
│       └── README.md           # Human-readable skill documentation
├── submissions/                # Pending skill PRs land here (not served)
│   └── [pending-skill]/
│       └── ...
└── README.md                   # Repo setup and contribution guide
```

---

## Skill Manifest Format

The `skills/manifest.json` file is the backbone of the marketplace. Every published skill has an entry here. The frontend reads this file to populate the catalog.

```json
{
  "lastUpdated": "2026-03-20",
  "skills": [
    {
      "id": "pdf-extractor",
      "name": "PDF Extractor",
      "description": "Extract text, tables, and images from PDF files. Supports OCR for scanned documents.",
      "version": "1.2.0",
      "author": "Pete Egan",
      "authorEmail": "eganpg@gmail.com",
      "tags": ["pdf", "extraction", "documents"],
      "category": "Document Processing",
      "file": "skills/pdf-extractor/pdf-extractor.skill",
      "icon": "skills/pdf-extractor/icon.png",
      "readme": "skills/pdf-extractor/README.md",
      "downloads": 142,
      "publishedAt": "2026-01-15",
      "updatedAt": "2026-03-01",
      "featured": true
    }
  ]
}
```

### Required Fields
- `id` — unique kebab-case identifier
- `name` — human-readable name
- `description` — 1–2 sentence summary shown in cards
- `version` — semver string
- `author` — display name of creator
- `tags` — array of searchable tags
- `category` — one of the defined categories (see below)
- `file` — relative path to the `.skill` file in the repo

### Optional Fields
- `icon` — path to a 128x128 PNG icon
- `readme` — path to detailed documentation
- `downloads` — tracked manually or via a lightweight serverless counter
- `featured` — boolean, surfaces skill in a "Featured" section

### Defined Categories
The following categories should be defined upfront and enforced to keep the catalog organized:

- Document Processing
- Data & Spreadsheets
- Communication & Drafting
- Research & Summarization
- Code & Development
- Scheduling & Automation
- Presentations
- Other

---

## Pages

### 1. `index.html` — Marketplace Home

The main catalog page. Should load skills from `manifest.json` and render them as cards.

**Key sections:**
- **Hero / header** — marketplace name, tagline, search bar
- **Featured Skills** — 2–3 hand-curated skills surfaced prominently
- **Skill Catalog** — grid of skill cards, filterable by category and tag
- **Sidebar / filter panel** — category filter, tag filter, sort (newest, popular, alphabetical)

**Skill card should show:**
- Icon (or default placeholder)
- Skill name
- Short description (truncated at ~100 chars)
- Author name
- Category badge
- Tags (up to 3 visible)
- Version number
- "View & Download" button

**Search behavior:**
- Client-side search over `name`, `description`, `tags`, and `author` fields
- Debounced input (300ms) for smooth UX
- No server required — all done with JS filtering over the manifest

---

### 2. `skill.html` — Skill Detail Page

Loaded with a query param: `skill.html?id=pdf-extractor`

**Sections:**
- Skill name, icon, version, author, category
- Full description / README rendered as markdown (use a lightweight MD parser like `marked.js`)
- Tags
- Version history (if documented in manifest)
- **Download / Install section** (see Install Flow below)
- "Report an issue" link (opens a GitHub Issue template)

---

### 3. `submit.html` — Submission Page

Walk employees through how to submit a new skill for review.

**Two submission paths to support:**

**Path A — GitHub Pull Request (preferred for technical users):**
1. Fork or branch the marketplace repo
2. Add your `.skill` file and metadata to `skills/[your-skill-name]/`
3. Add your entry to `manifest.json` (use the template provided)
4. Open a PR against `main` — title it `[SKILL SUBMISSION] Your Skill Name`
5. An admin will review and merge

**Path B — Form submission (non-technical users):**
- A simple HTML form that collects: skill name, description, author, category, tags, and a file upload field for the `.skill` file
- On submit, this can either:
  - **Option 1:** Email the form contents + attachment to a designated admin email (use `mailto:` or a free service like Formspree)
  - **Option 2:** Open a pre-filled GitHub Issue with the metadata filled in, and ask the user to attach the `.skill` file
  - **Recommended:** Start with Option 2 (GitHub Issue) to avoid needing a backend

**Submission checklist to display on the page:**
- [ ] Skill has a clear name and description
- [ ] `.skill` file is tested and working in Claude
- [ ] Tags are relevant and specific
- [ ] README or documentation is included

---

## Install Flow (Three Tiers — Implement in Order)

Design the download button to support a progressive enhancement approach. Start with Tier 1, add Tiers 2 and 3 as the platform matures.

### Tier 1: Direct `.skill` Download (Launch with this)
- A standard `<a href="...skill" download>` button
- Downloads the `.skill` file to the browser's default Downloads folder
- Instruction text: *"Once downloaded, drag this file into the Claude desktop app to install."*
- **Pros:** Works today, no special setup, zero infrastructure
- **Cons:** Manual final step for users

### Tier 2: Download to Watched Folder (Near-term)
- A small companion script or browser extension that, when active, automatically moves downloaded `.skill` files from Downloads to the correct Claude skills directory
- Claude watches this directory and auto-installs new `.skill` files
- Default Claude skills path (to document for users):
  - macOS: `~/Library/Application Support/Claude/skills/`
  - Windows: `%APPDATA%\Claude\skills\`
- **Pros:** One click, no drag-and-drop
- **Cons:** Requires a companion helper tool or extension

### Tier 3: `claude://` Protocol Handler (Aspirational)
- Register a custom URL protocol on each machine: `claude://install?skill=https://...`
- Clicking "Install" in the browser triggers Claude directly to fetch and install the skill
- **Pros:** Truly native, best UX
- **Cons:** Requires Claude app support for custom protocol + corporate IT rollout

**Recommendation:** Ship with Tier 1 and design the download button UI to support swapping in Tier 2/3 logic later without redesigning the page.

---

## Submit + Admin Approval Workflow

Since skills are stored in a GitHub repo, the natural approval workflow is a GitHub Pull Request.

### Happy Path
```
Employee creates skill
      ↓
Opens PR on the marketplace repo
      ↓
Admin reviews PR:
  - Tests the .skill file in Claude
  - Checks manifest.json entry is correct
  - Reviews README / description
      ↓
Admin merges PR to main
      ↓
GitHub Pages auto-deploys
      ↓
Skill appears in marketplace
```

### PR Template
Create a `.github/PULL_REQUEST_TEMPLATE/skill_submission.md` to standardize submissions:

```markdown
## Skill Submission

**Skill Name:**
**Version:**
**Category:**
**Tags:**

### Description
<!-- What does this skill do? -->

### Testing
- [ ] I've tested this skill in Claude and it works as expected
- [ ] The .skill file is included in this PR
- [ ] The manifest.json entry is filled out correctly
- [ ] A README is included

### Notes for reviewers
<!-- Anything the admin should know? -->
```

### Admin Responsibilities
Admins should:
1. Test the `.skill` file in their own Claude instance
2. Ensure the description and tags are accurate and useful
3. Increment the version if this is an update to an existing skill
4. Merge the PR once satisfied

---

## UI/UX Requirements

### Design System

- **Colors:** Use a neutral dark sidebar with a light content area. Accent color should be consistent with company brand. If no brand color, use Indigo (`indigo-600`) as the default primary.
- **Typography:** System font stack — no custom font loading needed for performance.
- **Card radius:** `rounded-xl` for cards, `rounded-lg` for buttons and inputs
- **Spacing:** Consistent `gap-6` grid, `p-6` card padding
- **Dark mode:** Nice-to-have, implement with `prefers-color-scheme` media query

### Responsiveness
- Mobile-first approach with Tailwind breakpoints
- Single-column on mobile, 2-column on `md:`, 3-column on `xl:`
- Sidebar filter panel collapses into a modal/drawer on mobile

### Accessibility
- All interactive elements must have focus styles
- Skill cards should be keyboard-navigable
- Download button must have descriptive `aria-label`
- Images need `alt` text

---

## Download Counter (Optional)

Since GitHub Pages is purely static, a simple approach for tracking download counts without a backend:

- **Option A:** Use [Countapi.xyz](https://countapi.xyz) or a similar free hit-counter API — one line of JS per skill, increments on download click
- **Option B:** Use a Cloudflare Worker (free tier) as a lightweight counter endpoint
- **Option C:** Skip counters initially — display author name and date instead

---

## Open Questions / Decisions for Dev Phase

These should be resolved before or during development:

1. **Domain / hosting URL:** Will this be served from GitHub Pages at `your-org.github.io/skill-marketplace`, or on a custom internal domain?
2. **Repo visibility:** Public GitHub org repo or private? If private, GitHub Pages requires a paid plan — consider using a deployment action to push to a public repo instead.
3. **Download counter:** Which option (A, B, or C above) fits your ops comfort level?
4. **Admin notifications:** Should GitHub send email notifications to admins when a new skill PR is opened? Set this up in repo notification settings.
5. **Versioning:** When a skill is updated, does the old version remain downloadable? Consider a `versions/` subfolder structure if version history matters.
6. **Skill icons:** Should there be a default icon set to choose from, or auto-generate icons from skill category?
7. **Install instructions:** Where do employees get Claude desktop app instructions if they're new? Link to internal onboarding doc.

---

## Development Phases

### Phase 1 — MVP (Launch-ready)
- [ ] `index.html` with skill catalog, search, and category filter
- [ ] `skill.html` detail page
- [ ] `manifest.json` schema and at least 3–5 seed skills
- [ ] Tier 1 download (direct `.skill` download)
- [ ] GitHub Pages deployment
- [ ] Submission instructions page

### Phase 2 — Contributor Experience
- [ ] GitHub PR template for skill submissions
- [ ] Form-based submission path (Path B) using GitHub Issues
- [ ] Improved skill README rendering on detail page
- [ ] Download counter integration

### Phase 3 — Power Features
- [ ] Tier 2 install (watched folder / companion helper)
- [ ] Version history on skill detail pages
- [ ] "Featured" and "New" badges
- [ ] Admin review dashboard (`admin.html`) for managing pending submissions
- [ ] Email or Slack notification when a new submission PR is opened

---

## Reference Links

- [Tailwind CSS CDN](https://tailwindcss.com/docs/installation/play-cdn)
- [marked.js — lightweight Markdown renderer](https://marked.js.org)
- [GitHub Pages documentation](https://docs.github.com/en/pages)
- [Formspree — form backend for static sites](https://formspree.io)
- [Countapi — free hit counter](https://countapi.xyz)
- Claude `.skill` file format: a standard zip archive containing a `SKILL.md` at the root
