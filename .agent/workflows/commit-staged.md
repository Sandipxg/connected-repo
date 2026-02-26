---
description: Semantic commit with integrated review and documentation lifecycle sync.
---

# Semantic Commit Workflow

Follow these steps to safely commit staged changes while maintaining documentation integrity.

1. **Review Staged Changes**:
   - Run the `/review-staged` workflow.
   - Present findings to the user and wait for approval/refactoring.

2. **Update Documentation**:
   - After user approval of the code, use the `agent-state-manager` skill to update relevant documentation.
   - Sync `DEVELOPMENT_PLAN.md` (mark tasks done/update approach).
   - Sync `AGENTS.md` (Update `Active Task`, add `Decision Records` if major).
   - `git add DEVELOPMENT_PLAN.md AGENTS.md` (and any other updated docs).

3. **Check for Plan Completion**:
   - Review existing plans in `.agent/plans/`.
   - If any plan is fully implemented by the current changes, delete the plan file.
   - Update `DEVELOPMENT_PLAN.md` to reflect the completion if necessary.

4. **Generate Commit Message**:
   - Analyze context from `git diff --staged -- . ':!package-lock.json' ':!yarn.lock' ':!pnpm-lock.yaml'`.
   - Draft a SEMANTIC commit message based on `.opencode/command/commit.md`:
     - Concise, bullet points for details.
     - Grammar < Brevity.
     - No quotes/backticks.

5. **Execute Commit**:
   - Run: `git commit -m "MESSAGE"`

6. **Cleanup**:
   - Ensure temporary context files are removed.