# Plan: Standardized Maintenance Patterns

## Objective
Standardize sync state management and introduce server-driven reconciliation for foolproof data consistency.

## Context
The UI currently checks individual fields (like `_pendingAction`) for sync status, which is fragile. Additionally, the system relies entirely on client-side "push" logic with no server-side reconciliation.

## Proposed Strategy
1. **Status Abstraction**: Implement a `useSyncStatus(id)` hook providing high-level states: `UPLOADING`, `SYNC_METADATA`, `SUCCESS`, etc.
2. **ULID Symmetry**: Align ULID generation between Frontend workers and Backend to maintain consistent identity from creation.
3. **State Hashing**: Implement a reconciliation flow where the Backend sends a state checksum via SSE, triggering a local vs remote diff on the Frontend.

## Success Criteria
- UI components use a unified hook for sync states.
- Client and server share a common identity for records via ULIDs.
- Background reconciliation automatically fixes gaps missed by the standard sync push.
