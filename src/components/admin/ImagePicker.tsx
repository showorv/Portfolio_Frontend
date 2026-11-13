"use client";

import { useRef, useState } from "react";
import { ImagePlus, Images, Loader2, Trash2, Upload } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { thumb, uploadImage } from "@/lib/upload";
import { cn } from "@/lib/utils";
import MediaBrowser from "./MediaBrowser";

/** Image field: upload a new file or pick one from the media library. */
export default function ImagePicker({
  value,
  onChange,
  compact = false,
}: {
  value?: string;
  onChange: (url: string) => void;
  /** Small square preview, for icons. */
  compact?: boolean;
}) {
  const [uploading, setUploading] = useState(false);
  const [libraryOpen, setLibraryOpen] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);

  const upload = async (file?: File) => {
    if (!file) return;
    setUploading(true);
    try {
      const media = await uploadImage(file);
      onChange(media.url);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={cn("flex gap-3", compact ? "items-center" : "flex-col")}>
      <button
        type="button"
        onClick={() => fileInput.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          upload(e.dataTransfer.files[0]);
        }}
        className={cn(
          "relative grid shrink-0 cursor-pointer place-items-center overflow-hidden rounded-lg border border-dashed border-input bg-muted/40 text-muted-foreground transition-colors hover:border-primary hover:text-primary",
          compact ? "size-20" : "aspect-video w-full"
        )}
      >
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={thumb(value, 800)} alt="Selected" className={cn("size-full", compact ? "object-contain p-2" : "object-cover")} />
        ) : (
          <span className="flex flex-col items-center gap-1.5 px-2 text-center text-xs">
            <ImagePlus className="size-6" />
            {!compact && "Click or drop an image to upload"}
          </span>
        )}
        {uploading && (
          <span className="absolute inset-0 grid place-items-center bg-background/70">
            <Loader2 className="size-6 animate-spin text-primary" />
          </span>
        )}
      </button>

      <div className="flex flex-wrap gap-2">
        <Button type="button" variant="outline" size="sm" onClick={() => fileInput.current?.click()} disabled={uploading}>
          <Upload /> Upload
        </Button>
        <Button type="button" variant="outline" size="sm" onClick={() => setLibraryOpen(true)}>
          <Images /> Library
        </Button>
        {value && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onChange("")}
            className="text-destructive hover:text-destructive"
          >
            <Trash2 /> Remove
          </Button>
        )}
      </div>

      <input
        ref={fileInput}
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => {
          upload(e.target.files?.[0]);
          e.target.value = "";
        }}
      />

      <Dialog open={libraryOpen} onOpenChange={setLibraryOpen}>
        <DialogContent className="max-h-[88dvh] overflow-y-auto sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle>Media library</DialogTitle>
            <DialogDescription>Pick an image you have already uploaded, or add a new one.</DialogDescription>
          </DialogHeader>
          <MediaBrowser
            onSelect={(media) => {
              onChange(media.url);
              setLibraryOpen(false);
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
