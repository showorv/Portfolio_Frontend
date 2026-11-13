"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ExternalLink, FolderKanban, ImageOff, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { deleteProject } from "@/actions/admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { thumb } from "@/lib/upload";
import type { IProject } from "@/types/projectTypes";
import { ConfirmDialog, EmptyState, PageHeader, Panel } from "./ui";

export default function ProjectList({ projects }: { projects: IProject[] }) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [toDelete, setToDelete] = useState<IProject | null>(null);

  const term = search.trim().toLowerCase();
  const visible = term
    ? projects.filter(
        (p) => p.title.toLowerCase().includes(term) || p.techStacks?.some((t) => t.toLowerCase().includes(term))
      )
    : projects;

  const remove = async () => {
    if (!toDelete?._id) return;
    const res = await deleteProject(toDelete._id);
    setToDelete(null);
    if (!res.success) return void toast.error(res.message || "Delete failed");
    toast.success("Project deleted");
    router.refresh();
  };

  return (
    <>
      <PageHeader title="Projects" description={`${projects.length} project${projects.length === 1 ? "" : "s"} on your site`}>
        <Button asChild>
          <Link href="/dashboard/projects/create">
            <Plus /> New project
          </Link>
        </Button>
      </PageHeader>

      {projects.length === 0 ? (
        <EmptyState icon={FolderKanban} title="No projects yet" description="Add your first project to show it on the landing page.">
          <Button asChild>
            <Link href="/dashboard/projects/create">
              <Plus /> New project
            </Link>
          </Button>
        </EmptyState>
      ) : (
        <>
          <div className="relative mb-4 max-w-sm">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by title or tech" className="pl-9" />
          </div>

          {visible.length === 0 && <p className="py-10 text-center text-sm text-muted-foreground">No projects match “{search}”.</p>}

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {visible.map((project) => (
              <Panel key={project._id} className="flex flex-col overflow-hidden">
                <div className="relative aspect-video bg-muted">
                  {project.thumbnail ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={thumb(project.thumbnail, 640)} alt={project.title} loading="lazy" className="size-full object-cover" />
                  ) : (
                    <div className="grid size-full place-items-center text-muted-foreground">
                      <ImageOff className="size-6" />
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col gap-3 p-4">
                  <div>
                    <h3 className="font-semibold leading-snug">{project.title}</h3>
                    <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{project.description}</p>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStacks?.slice(0, 5).map((tech) => (
                      <span key={tech} className="rounded bg-primary/10 px-1.5 py-0.5 text-[11px] font-medium text-primary">
                        {tech}
                      </span>
                    ))}
                    {(project.techStacks?.length ?? 0) > 5 && (
                      <span className="text-[11px] text-muted-foreground">+{project.techStacks!.length - 5}</span>
                    )}
                  </div>
                  <div className="mt-auto flex items-center gap-2 pt-1">
                    <Button variant="outline" size="sm" asChild className="flex-1">
                      <Link href={`/dashboard/projects/edit/${project._id}`}>
                        <Pencil /> Edit
                      </Link>
                    </Button>
                    <Button variant="outline" size="icon-sm" asChild>
                      <Link href={`/projects/${project._id}`} target="_blank" aria-label="View on site">
                        <ExternalLink />
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon-sm"
                      onClick={() => setToDelete(project)}
                      aria-label="Delete project"
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 />
                    </Button>
                  </div>
                </div>
              </Panel>
            ))}
          </div>
        </>
      )}

      <ConfirmDialog
        open={Boolean(toDelete)}
        onOpenChange={(open) => !open && setToDelete(null)}
        title="Delete this project?"
        description={`“${toDelete?.title}” will be removed from your site. Its image stays in the media library.`}
        onConfirm={remove}
      />
    </>
  );
}
