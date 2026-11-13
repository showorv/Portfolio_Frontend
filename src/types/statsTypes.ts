import type { IMessage } from "./messageTypes";

export interface IStats {
  projects: number;
  blogs: number;
  skills: number;
  media: number;
  messages: number;
  unreadMessages: number;
  blogViews: number;
  recentMessages: IMessage[];
  recentProjects: { _id: string; title: string; thumbnail?: string; createdAt?: string }[];
}
