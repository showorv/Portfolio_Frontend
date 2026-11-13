"use server";

import { revalidatePath } from "next/cache";
import { api } from "@/lib/server-api";
import type { IMedia, IUploadSignature } from "@/types/mediaTypes";
import type { IMessage } from "@/types/messageTypes";
import type { IProject } from "@/types/projectTypes";
import type { ISite } from "@/types/siteTypes";
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

/** Saves the list order; ids are in the order they should appear on the site. */
export const reorderProjects = async (ids: string[]) => {
  const result = await api<number>("/project/reorder", { method: "PATCH", body: { ids }, auth: true });
  if (result.success) refresh();
  return result;
};

export const setProjectFeatured = async (id: string, featured: boolean) => {
  const result = await api<IProject>(`/project/${id}`, { method: "PATCH", body: { featured }, auth: true });
  if (result.success) refresh();
  return result;
};

export const deleteProject = async (id: string) => {
  const result = await api<IProject>(`/project/${id}`, { method: "DELETE", auth: true });
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

/* ---------- site content ---------- */

export const saveSite = async (data: ISite) => {
  const result = await api<ISite>("/site", { method: "PUT", body: data, auth: true });
  if (result.success) refresh();
  return result;
};

/* ---------- account ---------- */

export const changePassword = async (currentPassword: string, newPassword: string) =>
  api<null>("/auth/change-password", { method: "POST", body: { currentPassword, newPassword }, auth: true });
