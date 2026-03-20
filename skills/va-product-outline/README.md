# VA Product Outline

**Category:** Document Processing
**Author:** Pete Egan
**Version:** 1.0.0

---

## What it does

Guides you through creating a complete, OKR-aligned product outline for any VA.gov / VES product. The skill scans your workspace for existing documentation, extracts key facts, asks four targeted clarifying questions, and produces two outputs:

- **`product-outline.md`** — a GitHub-ready product outline that satisfies OCTO OKR 1.1
- **`MEMORY.md`** — a handoff file so any team member or future Claude session can resume the work

---

## Who it's for

VA and VES product managers and program managers who need to create or update product outlines, product briefs, or product vision documents for VA.gov products.

---

## How to use it

1. Open Claude in a project folder that contains your product documentation (templates, OKR images, `.docx` project plans, analytics docs, existing outlines — anything you have)
2. Install this skill and invoke it — say "create a product outline" or "update the product brief"
3. The skill will scan the folder, extract facts from your docs, and ask four targeted questions
4. Review the draft and answer any follow-up questions
5. The final `product-outline.md` and `MEMORY.md` are saved to your folder

---

## What triggers it

The skill activates when you mention any of:
- "product outline", "product brief", "product vision"
- "OKR alignment", "KPI document", "OCTO OKR"
- "document a product", "create a brief"

It also triggers automatically when you're a VA PM working in a product documentation folder and ask for any structured product definition — you don't need to name the skill explicitly.

---

## What it produces

### product-outline.md
A complete product outline including:
- Problem statement and "How might we" framing
- Desired and undesired outcomes (user + business)
- KPI table with baselines, targets, and data sources (GA, Datadog, Domo)
- OKR mapping to current OCTO objectives
- Assumptions ranked by risk
- Solution approach: what's built, what's next, what's explicitly out of scope
- Launch dates and key decisions log
- Team members and stakeholders

### MEMORY.md
A session handoff file including:
- Product summary table
- All files in the folder and their purpose
- Key facts confirmed in the session (with date and who confirmed them)
- Current analytics baselines
- Full roadmap status for every initiative
- Open questions and who to ask
- Step-by-step instructions for resuming the work

---

## OKR 1.1 compliance check

Before finalizing, the skill runs an automated compliance check to confirm the outline contains: a product vision, problem statement, KPI definitions, baseline values, OKR mapping, team members, stakeholders, launch date, and data source citations. Any failures are flagged and fixed before the document is presented.

---

## Tips

- **More docs = better output.** Drop every relevant file in the folder before invoking — OKR images, analytics exports, `.docx` project plans, old outlines. The skill reads them all before asking you anything.
- **HEC / call center data is usually missing.** If your product deflects calls or form reprints, the skill will flag this as the top open action item — it's the most commonly missing KPI baseline.
- **Works for any VES product.** The process is identical regardless of product — the skill adapts its structure to whatever template and OKR image it finds.
