import type { IMessage } from "./messageTypes";

export interface IStats {
  projects: number;
  featuredProjects: number;
  skills: number;
  media: number;
  messages: number;
  unreadMessages: number;
  recentMessages: IMessage[];
  recentProjects: { _id: string; title: string; thumbnail?: string; createdAt?: string }[];
}
