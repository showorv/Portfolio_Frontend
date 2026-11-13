"use server";

import { revalidatePath } from "next/cache";
import { api } from "@/lib/server-api";
import type { IBlogs } from "@/types/blogTypes";
import type { IMedia, IUploadSignature } from "@/types/mediaTypes";
import type { IMessage } from "@/types/messageTypes";
import type { IProject } from "@/types/projectTypes";
import type { ISkill } from "@/types/skillTypes";
import type { IStats } from "@/types/statsTypes";

const refresh = () => {
  revalidatePath("/dashboard", "layout");
  revalidatePath("/", "layout");
};

/* ---------- overview ---------- */

export const getStats = async () => api<IStats>("/stats", { auth: true });

/* ---------- projects ---------- */

export type ProjectInput = Omit<IProject, "_id">;

export const getProjects = async () => api<IProject[]>("/project");

export const getProjectById = async (id: string) => api<IProject>(`/project/${id}`);

export const saveProject = async (id: string | null, data: ProjectInput) => {
  const result = id
    ? await api<IProject>(`/project/${id}`, { method: "PATCH", body: data, auth: true })
    : await api<IProject>("/project/create", { method: "POST", body: data, auth: true });
  if (result.success) refresh();
  return result;
};

export const deleteProject = async (id: string) => {
  const result = await api<IProject>(`/project/${id}`, { method: "DELETE", auth: true });
  if (result.success) refresh();
  return result;
};

/* ---------- blogs ---------- */

export type BlogInput = Pick<IBlogs, "title" | "content" | "tags" | "category" | "isPublished" | "thumbnail">;

export const getBlogs = async () => api<IBlogs[]>("/blog?page=1&limit=100");

export const getBlogById = async (id: string) => api<IBlogs>(`/blog/id/${id}`, { auth: true });

export const saveBlog = async (id: string | null, data: BlogInput) => {
  const result = id
    ? await api<IBlogs>(`/blog/${id}`, { method: "PATCH", body: data, auth: true })
    : await api<IBlogs>("/blog/create", { method: "POST", body: data, auth: true });
  if (result.success) refresh();
  return result;
};

export const deleteBlog = async (id: string) => {
  const result = await api<IBlogs>(`/blog/${id}`, { method: "DELETE", auth: true });
  if (result.success) refresh();
  return result;
};

/* ---------- skills ---------- */

export type SkillInput = Omit<ISkill, "_id">;

export const getSkills = async () => api<ISkill[]>("/skill");

export const saveSkill = async (id: string | null, data: SkillInput) => {
  const result = id
    ? await api<ISkill>(`/skill/${id}`, { method: "PATCH", body: data, auth: true })
    : await api<ISkill>("/skill/create", { method: "POST", body: data, auth: true });
  if (result.success) refresh();
  return result;
};

export const deleteSkill = async (id: string) => {
  const result = await api<ISkill>(`/skill/${id}`, { method: "DELETE", auth: true });
  if (result.success) refresh();
  return result;
};

/* ---------- messages ---------- */

export const getMessages = async () => api<IMessage[]>("/message", { auth: true });

export const setMessageRead = async (id: string, isRead: boolean) => {
  const result = await api<IMessage>(`/message/${id}`, { method: "PATCH", body: { isRead }, auth: true });
  if (result.success) revalidatePath("/dashboard", "layout");
  return result;
};

export const deleteMessage = async (id: string) => {
  const result = await api<IMessage>(`/message/${id}`, { method: "DELETE", auth: true });
  if (result.success) revalidatePath("/dashboard", "layout");
  return result;
};

/* ---------- media library ---------- */

export const getMedia = async (page = 1, search = "") =>
  api<IMedia[]>(`/media?page=${page}&limit=24&search=${encodeURIComponent(search)}`, { auth: true });

export const getUploadSignature = async () =>
  api<IUploadSignature>("/media/sign", { method: "POST", auth: true });

export const registerMedia = async (publicId: string, name: string) =>
  api<IMedia>("/media/register", { method: "POST", body: { publicId, name }, auth: true });

export const deleteMedia = async (id: string, force = false) =>
  api<IMedia>(`/media/${id}${force ? "?force=true" : ""}`, { method: "DELETE", auth: true });

export const syncMedia = async () =>
  api<{ found: number; added: number }>("/media/sync", { method: "POST", auth: true });
