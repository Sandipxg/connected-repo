# Plan: Architecture Simplification

## Objective
Reduce boilerplate and improve maintainability by centralizing worker proxies and automating context scoping.

## Context
Multiple redundant `await getDataProxy()` calls exist in UI components, and `teamId` is often manually drilled through several layers instead of being implicitly scoped.

## Proposed Strategy
1. **Centralized Proxy**: Create a `useWorkerApp()` hook to memoize the Comlink proxy and provide it via context.
2. **Implicit Scoping**: Update `DbManager` to maintain an `activeTeamId` state and automatically apply it to queries (e.g., `getAll()`).
3. **View Logic Extraction**: Move file-to-media mapping and Blob URL management from Pages (e.g., `PendingSyncJournalEntryDetail`) into `FilesDBManager.getAttachments()`.

## Success Criteria
- UI components contain less worker-resolution boilerplate.
- Database calls no longer require explicit `teamId` arguments in standard scenarios.
- View-specific media logic is decoupled from UI pages.
