
export interface IBlogs{
    _id?: string
    title: string;
    slug: string
    thumbnail?: string;
    content: string;
    tags: string[];
    category?: string;
    isPublished: boolean;
    publishedAt?: Date;
    views?: number
}