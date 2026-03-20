# Policy Doc Summarizer

**Version:** 1.0.0
**Author:** Pete Egan
**Category:** Research & Summarization

## Overview

Long policy documents, HR handbooks, vendor contracts, and legal agreements are painful to read. This skill cuts through the dense language and gives you a plain-English summary of what matters — obligations, deadlines, restrictions, and what it all means for you in practice.

## What It Does

Given a policy document or contract (pasted text or described sections), returns:

- **Executive summary** — what this document is and why it exists (2–3 sentences)
- **Key obligations** — what you or your company are required to do
- **Important dates and deadlines** — renewal dates, notice periods, expiration
- **Restrictions and prohibitions** — what is not allowed
- **Plain-English translation** — "What this means for you" in everyday language
- **Questions to ask** — things that are unclear or that you should clarify with legal/HR before signing

## How to Use

1. Activate the **Policy Doc Summarizer** skill
2. Paste the document text (or the relevant sections) into the chat
3. Optionally provide context: `"I'm an employee reviewing this before signing"` or `"We're considering this vendor for our SaaS stack"`
4. Review the summary, then ask follow-up questions about specific clauses

## Example Use Cases

- **HR policies** — PTO, remote work, code of conduct, expense policies
- **Vendor agreements** — MSAs, SaaS subscription agreements, NDAs
- **Compliance documents** — data processing agreements, security policies
- **Legal contracts** — freelancer agreements, client SOWs

## Tips

- For long documents, paste section by section and ask Claude to build a running summary
- Ask Claude to `"flag anything unusual or worth negotiating"` for contracts
- Works well alongside a real lawyer — use this skill to understand the document before your legal review, not instead of it

## Important Note

This skill is for informational purposes to help you understand documents faster. It is not a substitute for legal advice. Always consult your legal team before signing contracts with significant business implications.

## Installation

After downloading, drag the `.skill` file into the Claude desktop app.
