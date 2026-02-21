import React, { useCallback, useEffect, useRef } from 'react';
import { ulid } from "ulid";
import { MediaUploader, type MediaFile } from "@connected-repo/ui-mui/components/MediaUploader";

interface SmartMediaUploaderProps {
  value: MediaFile[];
  onChange: React.Dispatch<React.SetStateAction<MediaFile[]>>;
  maxFiles?: number;
}

/**
 * A truly "Smart" version of MediaUploader.
 * Handles adding/removing files with ObjectURL management and 
 * triggers background thumbnail generation automatically.
 */
export const SmartMediaUploader: React.FC<SmartMediaUploaderProps> = ({
  value,
  onChange,
  maxFiles = 20
}) => {
  const processingIds = useRef(new Set<string>());

  const handleAddFiles = useCallback((newFiles: File[]) => {
    const newMedia: MediaFile[] = newFiles.map(file => ({
      id: ulid(),
      file,
      previewUrl: URL.createObjectURL(file),
    }));
    onChange(prev => [...prev, ...newMedia]);
  }, [onChange]);

  const handleRemoveFile = useCallback((id: string) => {
    onChange(prev => {
      const target = prev.find(f => f.id === id);
      if (target) {
        URL.revokeObjectURL(target.previewUrl);
        if (target.thumbnailUrl) URL.revokeObjectURL(target.thumbnailUrl);
      }
      return prev.filter(f => f.id !== id);
    });
  }, [onChange]);

  // Background thumbnail generation watcher
  useEffect(() => {
    const toProcess = value.filter(f => !f.thumbnailUrl && !processingIds.current.has(f.id));

    toProcess.forEach(async (media) => {
      processingIds.current.add(media.id);
      
      try {
        let thumbnailFile: File | null = null;

        if (media.file.type.startsWith("video/")) {
          const { generateVideoThumbnailUI } = await import("../utils/thumbnail-video-ui");
          thumbnailFile = await generateVideoThumbnailUI(media.file);
        } else if (media.file.type.startsWith("image/") || media.file.type === "application/pdf") {
          const { getMediaProxy } = await import("../worker/worker.proxy");
          const result = await getMediaProxy().media.generateThumbnail(media.file);
          thumbnailFile = result.thumbnailFile;
        }

        if (thumbnailFile) {
          const thumbUrl = URL.createObjectURL(thumbnailFile);
          // Emit atomic update via functional approach to prevent race conditions
          onChange(prev => prev.map(item => 
            item.id === media.id ? { ...item, thumbnailUrl: thumbUrl } : item
          ));
        }
      } catch (err) {
        console.error("[SmartMediaUploader] Thumbnail error:", err);
      }
    });
  }, [value, onChange]);

  return (
    <MediaUploader
      files={value}
      onAddFiles={handleAddFiles}
      onRemoveFile={handleRemoveFile}
      maxFiles={maxFiles}
    />
  );
};
