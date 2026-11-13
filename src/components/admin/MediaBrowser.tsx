"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Check, Copy, ImageOff, Images, Loader2, RefreshCw, Search, Trash2, Upload } from "lucide-react";
import { toast } from "sonner";
import { deleteMedia, getMedia, syncMedia } from "@/actions/admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatBytes, thumb, uploadImage } from "@/lib/upload";
import { cn } from "@/lib/utils";
import type { IMedia } from "@/types/mediaTypes";
import { ConfirmDialog, EmptyState } from "./ui";

/**
 * The media library grid. On the Media page it manages images; inside the
 * picker dialog (`onSelect` set) clicking an image chooses it.
 */
export default function MediaBrowser({ onSelect }: { onSelect?: (media: IMedia) => void }) {
  const [items, setItems] = useState<IMedia[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState("");
  const [syncing, setSyncing] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [toDelete, setToDelete] = useState<{ media: IMedia; inUse?: string } | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  const request = useRef(0);

  const load = useCallback(async (nextPage: number, term: string) => {
    const id = ++request.current;
    setLoading(true);
    const res = await getMedia(nextPage, term);
    if (id !== request.current) return; // a newer search superseded this one
    setLoading(false);

    if (!res.success) {
      setError(res.message || "Could not load the media library");
      return;
    }
    setError("");
    setItems((prev) => (nextPage === 1 ? res.data : [...prev, ...res.data]));
    setTotal(res.metaData?.total ?? res.data.length);
    setPage(nextPage);
  }, []);

  // debounced so typing does not fire a request per keystroke
  useEffect(() => {
    const timer = setTimeout(() => load(1, search), search ? 300 : 0);
    return () => clearTimeout(timer);
  }, [search, load]);

  const upload = async (files: File[]) => {
    if (!files.length || uploading) return;
    let done = 0;
    const failed: string[] = [];

    for (const file of files) {
      setUploading(`Uploading ${done + 1} of ${files.length}`);
      try {
        const media = await uploadImage(file);
        setItems((prev) => [media, ...prev.filter((m) => m._id !== media._id)]);
        setTotal((t) => t + 1);
        done++;
      } catch (err) {
        failed.push(err instanceof Error ? err.message : `${file.name} failed`);
      }
    }

    setUploading("");
    if (done) toast.success(`${done} image${done > 1 ? "s" : ""} uploaded`);
    failed.forEach((message) => toast.error(message));
  };

  const sync = async () => {
    setSyncing(true);
    const res = await syncMedia();
    setSyncing(false);
    if (!res.success) return void toast.error(res.message || "Import failed");
    toast.success(res.message);
    setSearch("");
    load(1, "");
  };

  const remove = async () => {
    if (!toDelete) return;
    const res = await deleteMedia(toDelete.media._id, Boolean(toDelete.inUse));

    if (!res.success && !toDelete.inUse && /used by/i.test(res.message)) {
      // still referenced by a project, blog or skill: ask again before forcing
      setToDelete({ media: toDelete.media, inUse: res.message });
      return;
    }
    if (!res.success) {
      toast.error(res.message || "Delete failed");
    } else {
      setItems((prev) => prev.filter((m) => m._id !== toDelete.media._id));
      setTotal((t) => Math.max(0, t - 1));
      toast.success("Image deleted");
    }
    setToDelete(null);
  };

  const copy = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Image URL copied");
    } catch {
      toast.error("Could not copy the URL");
    }
  };

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);
        upload(Array.from(e.dataTransfer.files));
      }}
      className={cn("space-y-4 rounded-xl", dragging && "outline-2 outline-dashed outline-primary outline-offset-4")}
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search images by name"
            className="pl-9"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={sync} disabled={syncing} className="flex-1 sm:flex-none">
            <RefreshCw className={cn(syncing && "animate-spin")} />
            Import from Cloudinary
          </Button>
          <Button onClick={() => fileInput.current?.click()} disabled={Boolean(uploading)} className="flex-1 sm:flex-none">
            {uploading ? <Loader2 className="animate-spin" /> : <Upload />}
            {uploading || "Upload"}
          </Button>
        </div>
        <input
          ref={fileInput}
          type="file"
          accept="image/*"
          multiple
          hidden
          onChange={(e) => {
            upload(Array.from(e.target.files ?? []));
            e.target.value = "";
          }}
        />
      </div>

      <p className="text-xs text-muted-foreground">
        {total} image{total === 1 ? "" : "s"} · drag and drop files anywhere here to upload (up to 10MB each)
      </p>

      {error ? (
        <EmptyState icon={ImageOff} title="Media library unavailable" description={error}>
          <Button variant="outline" onClick={() => load(1, search)}>
            Try again
          </Button>
        </EmptyState>
      ) : !loading && items.length === 0 ? (
        <EmptyState
          icon={Images}
          title={search ? "No images match your search" : "No images yet"}
          description={
            search
              ? "Try a different name."
              : "Upload images, or import the ones already in your Cloudinary account."
          }
        />
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((media) => (
            <div key={media._id} className="group overflow-hidden rounded-lg border border-border bg-card">
              <button
                type="button"
                onClick={() => (onSelect ? onSelect(media) : window.open(media.url, "_blank", "noopener"))}
                title={onSelect ? "Use this image" : "Open full size"}
                className="relative block aspect-[4/3] w-full cursor-pointer overflow-hidden bg-muted/60"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={thumb(media.url)}
                  alt={media.name || "Uploaded image"}
                  loading="lazy"
                  className="size-full object-contain transition-transform duration-300 group-hover:scale-105"
                />
                {onSelect && (
                  <span className="absolute inset-0 grid place-items-center bg-primary/70 text-sm font-semibold text-primary-foreground opacity-0 transition-opacity group-hover:opacity-100">
                    <span className="flex items-center gap-1.5">
                      <Check className="size-4" /> Use image
                    </span>
                  </span>
                )}
              </button>
              <div className="flex items-center gap-1 p-2">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-medium" title={media.name}>
                    {media.name || "Untitled"}
                  </p>
                  <p className="truncate text-[11px] text-muted-foreground">
                    {[media.width && `${media.width}×${media.height}`, formatBytes(media.bytes)]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                </div>
                <Button variant="ghost" size="icon-sm" onClick={() => copy(media.url)} aria-label="Copy image URL">
                  <Copy />
                </Button>
                {!onSelect && (
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => setToDelete({ media })}
                    aria-label="Delete image"
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 />
                  </Button>
                )}
              </div>
            </div>
          ))}
          {loading &&
            Array.from({ length: items.length ? 4 : 8 }).map((_, i) => (
              <div key={i} className="aspect-[4/3] animate-pulse rounded-lg bg-muted" />
            ))}
        </div>
      )}

      {!loading && items.length < total && (
        <div className="flex justify-center pt-2">
          <Button variant="outline" onClick={() => load(page + 1, search)}>
            Load more
          </Button>
        </div>
      )}

      <ConfirmDialog
        open={Boolean(toDelete)}
        onOpenChange={(open) => !open && setToDelete(null)}
        title={toDelete?.inUse ? "This image is in use" : "Delete this image?"}
        description={
          toDelete?.inUse
            ? `The ${toDelete.inUse}. Deleting it will leave a broken image there. Delete anyway?`
            : "It will be removed from Cloudinary permanently. This cannot be undone."
        }
        confirmLabel={toDelete?.inUse ? "Delete anyway" : "Delete"}
        onConfirm={remove}
      />
    </div>
  );
}
