---
description: Review staged changes for edge cases, resiliency, and redundancy.
---

# Review Staged Changes Workflow

Follow these steps to perform a comprehensive code review of staged changes.

1. **Capture staged changes**:
   - Run `git diff --staged -- . ':!package-lock.json' ':!yarn.lock' ':!pnpm-lock.yaml'` (excluding lock files).

2. **Perform Review**:
   - Analyze the diff using the `code-reviewer` skill.
   - Address the three core pillars:
     1. **Edge-Cases & Gotchas**: Are there any missing boundaries or potential IO failures?
     2. **Resiliency**: Is the code fail-safe and self-healing?
     3. **Simplicity**: Is there unnecessary redundancy? Can it be simpler/standard?

3. **Report to User**:
   - Present the findings to the user clearly.
   - Categorize issues by impact (Critical, Improvement, Simplification).

4. **Iterate**:
   - Discuss improvements with the user.
   - Refactor if necessary before proceeding to commit.