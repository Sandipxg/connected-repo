# Plan: Self-Healing & Sanity Checks

## Objective
Ensure the integrity of local and remote file states through proactive verification and automated recovery.

## Context
Current sync logic assumes that if a field (like `cdnUrl`) exists, the stage is complete. However, partial writes or CDN inconsistencies can lead to broken states that the system doesn't currently re-verify.

## Proposed Strategy
1. **Verification Engine**: Implement a `verifyRecordIntegrity(id)` method in `FilesDBManager`.
2. **File Check**: Verify that `_blob` is readable and checksums (if available) match.
3. **Remote Check**: Perform HEAD requests to the CDN to confirm remote file existence.
4. **Thumbnail Check**: Ensure thumbnails exist for media types and regenerate if missing.
5. **Recovery**: If verification fails, reset the stage (e.g., clear `cdnUrl`) to force a re-sync.

## Success Criteria
- Inconsistent file states are automatically detected and reset.
- Remote file existence is verified for all synced records.
