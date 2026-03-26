# [Skill Name]

<!-- Replace with the appropriate status badge. -->
![Community](https://img.shields.io/badge/status-community-blue)

<!-- One-line summary: what capability this skill provides. -->
A brief description of this skill and the capability it enables, independent of any specific tool.

---

## Skill Definition

<!-- This is the canonical, tool-agnostic definition of the skill. Describe the knowledge, behavior, and patterns this skill encapsulates without referencing any specific tool's format or features. This section should be understandable and useful even if someone has never heard of Claude or Copilot. -->

### What This Skill Does

<!-- Describe the capability in plain terms. What does an AI assistant know or do when it has this skill? -->

### When to Use It

<!-- Describe the triggers or situations where this skill is relevant. -->

### Core Behaviors

<!-- List the key behaviors, rules, or patterns this skill defines. These are the portable "truths" that any tool-specific adapter should implement. -->

1. Behavior or rule one
2. Behavior or rule two
3. Behavior or rule three

### Knowledge

<!-- Optional. Any domain knowledge, reference material, or factual context the skill requires. -->

---

## Tool Adapters

<!-- Each adapter translates the canonical skill definition into a format that works with a specific tool. The goal is faithful translation - the adapter should implement the same behaviors and knowledge defined above, just in the tool's native format. -->

### Claude

<!-- Adapter files live in the `claude/` subfolder. -->

**Format**: <!-- e.g., SKILL.md, CLAUDE.md snippet, system prompt -->
**Location in this folder**: `claude/[filename]`

**Setup**:

<!-- Step-by-step instructions to use this skill with Claude. -->

1. Step one
2. Step two

**Notes**: <!-- Any Claude-specific considerations, limitations, or tips. -->

### Copilot

<!-- Adapter files live in the `copilot/` subfolder. -->

**Format**: <!-- e.g., copilot-instructions.md, workspace settings, custom agent config -->
**Location in this folder**: `copilot/[filename]`

**Setup**:

<!-- Step-by-step instructions to use this skill with Copilot. -->

1. Step one
2. Step two

**Notes**: <!-- Any Copilot-specific considerations, limitations, or tips. -->

---

## Examples

<!-- Show this skill in action. Ideally include examples for both tools so people can see how the same skill behaves across environments. -->

### Example: [Scenario Name]

**Input / Trigger**:

```
[What the user does or asks]
```

**Expected behavior (Claude)**:

```
[What Claude does with this skill active]
```

**Expected behavior (Copilot)**:

```
[What Copilot does with this skill active]
```

---

## Portability Notes

<!-- Discuss any differences in how this skill behaves across tools. Be honest about gaps - if one tool handles a behavior better than the other, say so. This helps people set expectations and helps future contributors improve the adapters. -->

- **Parity**: <!-- Which behaviors work equally well in both tools? -->
- **Gaps**: <!-- Which behaviors are limited or missing in one tool? -->
- **Workarounds**: <!-- Any creative solutions for gaps? -->

---

## Folder Structure

<!-- Standard structure for an OpenSkill. Adapters for each tool get their own subfolder. -->

```
[skill-name]/
|-- README.md              # This file - canonical definition and overview
|-- claude/
|   |-- [adapter file(s)]  # Claude-specific implementation
|-- copilot/
|   |-- [adapter file(s)]  # Copilot-specific implementation
|-- examples/              # Optional - extended examples, test cases, or demos
```

---

## Changelog

<!-- Optional. Track meaningful changes. -->

| Date | Change |
|---|---|
| YYYY-MM-DD | Initial skill definition |
