---
name: plan-manager
description: High-precision manager for creating and maintaining atomic plans in `.agent/plans`. Enforces sequential numbering, standardized formatting, and clear objectives for each plan.
---

# Plan Manager

This skill standardizes the creation and management of atomic plans within the `.agent/plans` directory.

## Core Principles

1. **Atomic & Focused**: Each plan must address a single, well-defined problem or feature set. Avoid "mega-plans".
2. **Sequential Numbering**: Files must be named with a 3-digit prefix (e.g., `004-my-plan.md`), following the existing sequence.
3. **Structured Content**: Every plan must include:
   - **Objective**: Concise statement of what the plan achieves.
   - **Context**: Brief explanation of "why" and any relevant background.
   - **Proposed Strategy**: Step-by-step technical approach.
   - **Success Criteria**: Clear, verifiable goals.

## Guidelines for Creating Plans

- **Check existing plans**: Before creating a new plan, review `.agent/plans/` to ensure no duplication and to determine the next sequential number.
- **Reference context correctly**: Use absolute or context-relative paths when referring to files.
- **Update documentation**: When a plan is created or updated, ensure relevant `AGENTS.md` files or other documentation are synced if necessary.

## Workflow Integration

Use the `create-plan` workflow to initialize new plans.
