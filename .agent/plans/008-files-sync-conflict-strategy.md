# Plan: Files Sync Conflict Strategy

## Objective
Establish a robust strategy for handling edge cases where frontend data for files (metadata, CDN URLs) needs to sync to the backend, especially when multiple partial updates happen or when backend state differs from local state.

## Context
Files are attachments that don't have a user-editable "content" in the traditional sense, but their metadata (CDN URLs, thumbnails) is populated asynchronously. Currently, we use `.merge()` on creation to ensure subsequent metadata updates are captured as "backups". We need to handle scenarios where:
1. Frontend has a "create" pending but backend has a partial record.
2. Multiple tabs/workers attempt to update the same file record.
3. Offline edits to file metadata (if allowed) conflict with backend updates.

## Proposed Strategy
1. **Analyze existing sync logic**: Review how `DataWorker` and `SSEManager` handle incoming updates for "pending" records.
2. **Define Conflict Resolution**: Determine if "Last Write Wins" (current `.merge()` behavior) is sufficient or if we need field-level merging.
3. **Handle Delta Updates**: Research how to differentiate between "Initial Creation" and "Metadata Enrichment" at the API layer.
4. **Implement Safeguards**: Add checks to ensure `_pendingAction` stays "create" until fully synced, preventing accidental state transitions.

## Success Criteria
- Deterministic behavior when syncing file metadata from multiple sources.
- No data loss for CDN URLs or thumbnails during concurrent updates.
- Clear separation between creation idempotency and metadata enrichment.
