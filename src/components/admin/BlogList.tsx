"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ExternalLink, Eye, FileText, ImageOff, Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { deleteBlog } from "@/actions/admin";
import { Button } from "@/components/ui/button";
import { thumb } from "@/lib/upload";
import { cn } from "@/lib/utils";
import type { IBlogs } from "@/types/blogTypes";
import { ConfirmDialog, EmptyState, PageHeader, Panel } from "./ui";
import { formatDate } from "@/lib/format";

export default function BlogList({ blogs }: { blogs: IBlogs[] }) {
  const router = useRouter();
  const [toDelete, setToDelete] = useState<IBlogs | null>(null);

  const remove = async () => {
    if (!toDelete?._id) return;
    const res = await deleteBlog(toDelete._id);
    setToDelete(null);
    if (!res.success) return void toast.error(res.message || "Delete failed");
    toast.success("Post deleted");
    router.refresh();
  };

  const newPost = (
    <Button asChild>
      <Link href="/dashboard/blogs/create">
        <Plus /> New post
      </Link>
    </Button>
  );

  return (
    <>
      <PageHeader title="Blogs" description={`${blogs.length} post${blogs.length === 1 ? "" : "s"}`}>
        {newPost}
      </PageHeader>

      {blogs.length === 0 ? (
        <EmptyState icon={FileText} title="No posts yet" description="Write your first blog post.">
          {newPost}
        </EmptyState>
      ) : (
        <Panel className="divide-y divide-border">
          {blogs.map((blog) => (
            <div key={blog._id} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
              <div className="flex min-w-0 flex-1 items-center gap-3">
                <div className="size-14 shrink-0 overflow-hidden rounded-lg bg-muted sm:h-14 sm:w-20">
                  {blog.thumbnail ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={thumb(blog.thumbnail, 240)} alt="" loading="lazy" className="size-full object-cover" />
                  ) : (
                    <div className="grid size-full place-items-center text-muted-foreground">
                      <ImageOff className="size-5" />
                    </div>
                  )}
                </div>
                <div className="min-w-0">
                  <p className="truncate font-medium">{blog.title}</p>
                  <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 font-medium",
                        blog.isPublished ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400" : "bg-muted text-muted-foreground"
                      )}
                    >
                      {blog.isPublished ? "Published" : "Draft"}
                    </span>
                    {blog.category && <span>{blog.category}</span>}
                    <span className="inline-flex items-center gap-1">
                      <Eye className="size-3.5" /> {blog.views ?? 0}
                    </span>
                    <span>{formatDate(blog.publishedAt)}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" asChild className="flex-1 sm:flex-none">
                  <Link href={`/dashboard/blogs/edit/${blog._id}`}>
                    <Pencil /> Edit
                  </Link>
                </Button>
                <Button variant="outline" size="icon-sm" asChild>
                  <Link href={`/blogs/${blog.slug}`} target="_blank" aria-label="View on site">
                    <ExternalLink />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="icon-sm"
                  onClick={() => setToDelete(blog)}
                  aria-label="Delete post"
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 />
                </Button>
              </div>
            </div>
          ))}
        </Panel>
      )}

      <ConfirmDialog
        open={Boolean(toDelete)}
        onOpenChange={(open) => !open && setToDelete(null)}
        title="Delete this post?"
        description={`“${toDelete?.title}” will be removed permanently.`}
        onConfirm={remove}
      />
    </>
  );
}
