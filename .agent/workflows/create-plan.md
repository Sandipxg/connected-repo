---
description: How to create a new atomic plan in .agent/plans
---

# Create Atomic Plan Workflow

Follow these steps to create a new atomic plan.

1. **Determine the next number**:
   - Run `ls .agent/plans` to see the current list.
   - Increment the highest number by 1 (e.g., if `003` exists, the next is `004`).

2. **Create the file**:
   - Create a new file in `.agent/plans/NNN-slug.md` where `NNN` is the number and `slug` is a concise description.

3. **Populate the template**:
   - Use the following markdown structure:
   ```markdown
   # Plan: [Concise Title]

   ## Objective
   [What are we trying to achieve?]

   ## Context
   [Background information, related tickets, or issues.]

   ## Proposed Strategy
   [Step-by-step technical plan.]

   ## Success Criteria
   [Verifiable outcomes.]
   ```

4. **Review**:
   - Ensure the plan is atomic and follows the `plan-manager` skill guidelines.
