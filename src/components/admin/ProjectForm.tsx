"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import { toast } from "sonner";
import { saveProject } from "@/actions/admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { IProject } from "@/types/projectTypes";
import ImagePicker from "./ImagePicker";
import { Field, PageHeader, Panel, TagInput, Toggle } from "./ui";

export default function ProjectForm({ project }: { project?: IProject }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: project?.title ?? "",
    description: project?.description ?? "",
    thumbnail: project?.thumbnail ?? "",
    projectLink: project?.projectLink ?? "",
    liveSite: project?.liveSite ?? "",
    features: project?.features ?? [],
    techStacks: project?.techStacks ?? [],
    featured: project?.featured ?? false,
  });

  const set = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.title.trim().length < 2) return void toast.error("Give the project a title");
    if (form.description.trim().length < 10) return void toast.error("Description needs at least 10 characters");

    setSaving(true);
    const res = await saveProject(project?._id ?? null, form);
    setSaving(false);

    if (!res.success) return void toast.error(res.message || "Could not save the project");
    toast.success(project ? "Project updated" : "Project created");
    router.push("/dashboard/projects");
  };

  return (
    <form onSubmit={submit}>
      <PageHeader
        title={project ? "Edit project" : "New project"}
        description={project ? project.title : "Add a project to your portfolio."}
      >
        <Button variant="outline" asChild>
          <Link href="/dashboard/projects">
            <ArrowLeft /> Back
          </Link>
        </Button>
        <Button type="submit" disabled={saving}>
          {saving ? <Loader2 className="animate-spin" /> : <Save />}
          {project ? "Save changes" : "Create project"}
        </Button>
      </PageHeader>

      <div className="grid gap-6 lg:grid-cols-3">
        <Panel className="space-y-5 p-5 lg:col-span-2">
          <Field label="Title" required>
            <Input value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="My awesome project" />
          </Field>
          <Field label="Description" required>
            <Textarea
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              placeholder="What it is, who it is for, and what you built."
              rows={6}
            />
          </Field>
          <Field label="Tech stack" hint="Press Enter or comma after each one.">
            <TagInput value={form.techStacks} onChange={(v) => set("techStacks", v)} placeholder="Next.js, Express, MongoDB" />
          </Field>
          <Field label="Features" hint="Press Enter after each feature. Commas are kept as part of the text.">
            <TagInput
              value={form.features}
              onChange={(v) => set("features", v)}
              placeholder="Role based dashboard"
              splitOnComma={false}
            />
          </Field>
        </Panel>

        <div className="space-y-6">
          <Panel className="p-5">
            <Toggle checked={form.featured} onChange={(v) => set("featured", v)} label="Featured" />
            <p className="mt-2 text-xs text-muted-foreground">
              When any project is featured, the home page shows only the featured ones and links to the full list.
            </p>
          </Panel>
          <Panel className="space-y-3 p-5">
            <p className="text-sm font-medium">Thumbnail</p>
            <ImagePicker value={form.thumbnail} onChange={(url) => set("thumbnail", url)} />
          </Panel>
          <Panel className="space-y-5 p-5">
            <Field label="Live site">
              <Input
                type="url"
                value={form.liveSite}
                onChange={(e) => set("liveSite", e.target.value)}
                placeholder="https://"
              />
            </Field>
            <Field label="Source code">
              <Input
                type="url"
                value={form.projectLink}
                onChange={(e) => set("projectLink", e.target.value)}
                placeholder="https://github.com/..."
              />
            </Field>
          </Panel>
        </div>
      </div>
    </form>
  );
}
