import { getUploadSignature, registerMedia } from "@/actions/admin";
import type { IMedia } from "@/types/mediaTypes";

const MAX_BYTES = 10 * 1024 * 1024;

/**
 * Uploads one image from the browser straight to Cloudinary using a signature
 * from the backend, then records it in the media library.
 */
export async function uploadImage(file: File): Promise<IMedia> {
  if (!file.type.startsWith("image/")) throw new Error(`${file.name} is not an image`);
  if (file.size > MAX_BYTES) throw new Error(`${file.name} is larger than 10MB`);

  const sign = await getUploadSignature();
  if (!sign.success) throw new Error(sign.message || "Could not start the upload");

  const { cloudName, apiKey, timestamp, signature, folder } = sign.data;

  const form = new FormData();
  form.append("file", file);
  form.append("api_key", apiKey);
  form.append("timestamp", String(timestamp));
  form.append("signature", signature);
  form.append("folder", folder);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: "POST",
    body: form,
  });
  const uploaded = await res.json().catch(() => null);

  if (!res.ok || !uploaded?.public_id) {
    throw new Error(uploaded?.error?.message || `Upload of ${file.name} failed`);
  }

  const saved = await registerMedia(uploaded.public_id, file.name.replace(/\.[^.]+$/, ""));
  if (!saved.success) throw new Error(saved.message || "Uploaded, but could not save to the library");

  return saved.data;
}

/** Cloudinary URL resized for grid thumbnails. Other URLs pass through. */
export const thumb = (url: string, width = 480) =>
  url.includes("res.cloudinary.com") && url.includes("/upload/")
    ? url.replace("/upload/", `/upload/c_limit,w_${width},q_auto,f_auto/`)
    : url;

export const formatBytes = (bytes?: number) => {
  if (!bytes) return "";
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
};
