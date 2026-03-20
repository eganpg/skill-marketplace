# Skill Marketplace

Internal company marketplace for discovering, downloading, and installing Claude skills built by your team.

## Live Site

Served via GitHub Pages at your org's Pages URL (configure in repo Settings → Pages → Source: `main` / `root`).

---

## Local Development

No build step required. Serve the repo root with any static file server:

```bash
# Python
python3 -m http.server 8080

# Node (npx)
npx serve .

# VS Code: use the Live Server extension
```

Then open `http://localhost:8080`.

---

## Repository Structure

```
skill-marketplace/
├── index.html                  # Main marketplace page
├── skill.html                  # Individual skill detail page
├── submit.html                 # Skill submission instructions + form
├── assets/
│   ├── css/styles.css          # Custom styles (supplements Tailwind CDN)
│   ├── js/
│   │   ├── utils.js            # Shared: fetchManifest, debounce, helpers
│   │   ├── marketplace.js      # Catalog: search, filter, render
│   │   ├── skill-detail.js     # Detail page logic + markdown rendering
│   │   └── submit.js           # Submission form logic
│   └── img/logo.svg            # Marketplace logo
├── skills/
│   ├── manifest.json           # Master index of all published skills
│   └── [skill-name]/
│       ├── [skill-name].skill  # Installable .skill file (zip archive)
│       └── README.md           # Skill documentation
├── submissions/                # Staging area for pending PRs (not served)
└── .github/
    └── PULL_REQUEST_TEMPLATE/
        └── skill_submission.md
```

---

## Adding a Skill

### Option A — Pull Request (preferred)

1. Branch off `main`: `git checkout -b skill/your-skill-name`
2. Create `skills/your-skill-name/` with:
   - `your-skill-name.skill` — a valid zip archive containing `SKILL.md`
   - `README.md` — documentation
3. Add an entry to `skills/manifest.json` (see schema below)
4. Open a PR titled `[SKILL SUBMISSION] Your Skill Name`
5. An admin reviews, tests the skill, and merges

### Option B — GitHub Issue

Use the form on the [submit page](submit.html). A pre-filled GitHub Issue will open — attach your `.skill` file there.

---

## Manifest Schema

`skills/manifest.json` is the single source of truth for all published skills.

```json
{
  "lastUpdated": "YYYY-MM-DD",
  "version": "1",
  "skills": [
    {
      "id": "your-skill-name",
      "name": "Your Skill Name",
      "description": "1-2 sentence summary.",
      "version": "1.0.0",
      "author": "Display Name",
      "authorEmail": "you@company.com",
      "tags": ["tag1", "tag2"],
      "category": "Code & Development",
      "file": "skills/your-skill-name/your-skill-name.skill",
      "icon": null,
      "readme": "skills/your-skill-name/README.md",
      "downloads": 0,
      "publishedAt": "YYYY-MM-DD",
      "updatedAt": "YYYY-MM-DD",
      "featured": false
    }
  ]
}
```

### Defined Categories

- Document Processing
- Data & Spreadsheets
- Communication & Drafting
- Research & Summarization
- Code & Development
- Scheduling & Automation
- Presentations
- Other

---

## Skill File Format

A `.skill` file is a standard zip archive containing a `SKILL.md` at the root:

```
your-skill-name.skill (zip)
└── SKILL.md
```

**Creating a `.skill` file:**

```bash
mkdir tmpdir
echo "# Your Skill\n\nDescription and instructions." > tmpdir/SKILL.md
(cd tmpdir && zip -r ../your-skill-name.skill SKILL.md)
rm -rf tmpdir
```

---

## Admin Review Checklist

When reviewing a skill submission PR:

- [ ] Test the `.skill` file in your own Claude instance
- [ ] Verify the `manifest.json` entry is complete and accurate
- [ ] Check that description and tags are useful and specific
- [ ] Confirm the README explains how to use the skill
- [ ] Increment the version if this is an update to an existing skill
- [ ] Merge when satisfied — GitHub Pages auto-deploys

---

## GitHub Pages Setup

1. Go to repo **Settings → Pages**
2. Source: Deploy from branch → `main` → `/ (root)`
3. Save — the site deploys automatically on every merge to `main`
