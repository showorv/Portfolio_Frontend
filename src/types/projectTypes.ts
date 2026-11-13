export interface IProject {
  _id?: string;
  title: string;
  thumbnail?: string;
  projectLink?: string;
  liveSite?: string;
  description: string;
  features?: string[];
  techStacks?: string[];
  /** Shown on the home page when at least one project is featured. */
  featured?: boolean;
  order?: number;
}
