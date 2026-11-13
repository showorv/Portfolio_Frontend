"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import { toast } from "sonner";
import { saveBlog } from "@/actions/admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { IBlogs } from "@/types/blogTypes";
import ImagePicker from "./ImagePicker";
import { Field, PageHeader, Panel, TagInput, Toggle } from "./ui";

export default function BlogForm({ blog }: { blog?: IBlogs }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: blog?.title ?? "",
    content: blog?.content ?? "",
    category: blog?.category ?? "",
    tags: blog?.tags ?? [],
    thumbnail: blog?.thumbnail ?? "",
    isPublished: blog?.isPublished ?? true,
  });

  const set = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.title.trim().length < 2) return void toast.error("Give the post a title");
    if (form.content.trim().length < 10) return void toast.error("Content needs at least 10 characters");

    setSaving(true);
    const res = await saveBlog(blog?._id ?? null, form);
    setSaving(false);

    if (!res.success) return void toast.error(res.message || "Could not save the post");
    toast.success(blog ? "Post updated" : "Post created");
    router.push("/dashboard/blogs");
  };

  return (
    <form onSubmit={submit}>
      <PageHeader title={blog ? "Edit post" : "New post"} description={blog ? blog.title : "Write a new blog post."}>
        <Button variant="outline" asChild>
          <Link href="/dashboard/blogs">
            <ArrowLeft /> Back
          </Link>
        </Button>
        <Button type="submit" disabled={saving}>
          {saving ? <Loader2 className="animate-spin" /> : <Save />}
          {blog ? "Save changes" : form.isPublished ? "Publish" : "Save draft"}
        </Button>
      </PageHeader>

      <div className="grid gap-6 lg:grid-cols-3">
        <Panel className="space-y-5 p-5 lg:col-span-2">
          <Field label="Title" required>
            <Input value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="Post title" />
          </Field>
          <Field label="Content" required hint="HTML is supported, for example <h2>, <p>, <img src=...>. Copy image URLs from the media library.">
            <Textarea
              value={form.content}
              onChange={(e) => set("content", e.target.value)}
              placeholder="Write your post..."
              rows={18}
              className="font-mono text-sm"
            />
          </Field>
        </Panel>

        <div className="space-y-6">
          <Panel className="p-5">
            <Toggle checked={form.isPublished} onChange={(v) => set("isPublished", v)} label="Published" />
            <p className="mt-2 text-xs text-muted-foreground">
              {form.isPublished ? "Visible on your site." : "Saved as a draft."}
            </p>
          </Panel>
          <Panel className="space-y-3 p-5">
            <p className="text-sm font-medium">Cover image</p>
            <ImagePicker value={form.thumbnail} onChange={(url) => set("thumbnail", url)} />
          </Panel>
          <Panel className="space-y-5 p-5">
            <Field label="Category">
              <Input value={form.category} onChange={(e) => set("category", e.target.value)} placeholder="Web development" />
            </Field>
            <Field label="Tags" hint="Press Enter or comma after each one.">
              <TagInput value={form.tags} onChange={(v) => set("tags", v)} placeholder="react, nextjs" />
            </Field>
          </Panel>
        </div>
      </div>
    </form>
  );
}
