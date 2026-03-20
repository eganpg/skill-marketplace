# PR Review Assistant

**Version:** 1.0.0
**Author:** Pete Egan
**Category:** Code & Development

## Overview

Get a thorough, structured code review in seconds. Paste a Git diff or describe a code change, and this skill provides the kind of feedback a senior engineer would give — covering correctness, edge cases, naming, performance considerations, and a clear recommendation.

## What It Does

Given a code diff or description of a change, returns:

- **Change summary** — what the code does in plain English
- **Correctness review** — logic errors, off-by-one errors, incorrect assumptions
- **Edge cases** — inputs or states the code doesn't handle
- **Naming and readability** — variable/function names, comment quality, clarity
- **Performance notes** — obvious inefficiencies worth flagging (not premature optimization)
- **Security considerations** — XSS, injection, auth issues, secrets in code
- **Recommendation** — Approve / Request Changes / Needs Discussion, with reasoning

## How to Use

1. Activate the **PR Review Assistant** skill
2. Paste your Git diff (output of `git diff` or the diff from your PR page) into the chat
3. Optionally add context: `"This is a Python/Django service"` or `"This change is performance-critical"`
4. Review the feedback and use it to improve your PR before requesting human review

## Example Input

```diff
- def get_user(user_id):
-     return db.query(f"SELECT * FROM users WHERE id = {user_id}")
+ def get_user(user_id: int) -> dict:
+     return db.query("SELECT * FROM users WHERE id = ?", (user_id,))
```

## Example Output

**Change Summary**
Fixes a SQL injection vulnerability in `get_user` by replacing string interpolation with a parameterized query. Also adds type hints.

**Correctness**
✅ The parameterized query correctly prevents SQL injection.
⚠️ No handling for the case where `user_id` doesn't exist — consider what `db.query` returns for a missing ID and whether callers handle `None`.

**Edge Cases**
- What if `user_id` is 0 or negative? Should be validated before hitting the DB.
- What does this return if the query returns multiple rows? `SELECT *` could return many.

**Naming & Readability**
✅ Type hints improve clarity. Consider adding a return type that reflects actual behavior (`Optional[dict]`).

**Security**
✅ This change directly fixes a critical SQL injection vulnerability.

**Recommendation:** ✅ **Approve** — This is a clear security improvement. Suggest addressing the `None` return case in a follow-up.

## Tips

- Works with any language — JavaScript, Python, Go, Ruby, SQL, etc.
- For large PRs, paste one file's diff at a time for more focused feedback
- Ask follow-up questions: `"Can you show me how to fix the edge case you flagged?"`

## Installation

After downloading, drag the `.skill` file into the Claude desktop app.
