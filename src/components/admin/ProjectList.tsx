"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowDown, ArrowUp, ExternalLink, FolderKanban, ImageOff, Pencil, Plus, Search, Star, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { deleteProject, reorderProjects, setProjectFeatured } from "@/actions/admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { thumb } from "@/lib/upload";
import { cn } from "@/lib/utils";
import type { IProject } from "@/types/projectTypes";
import { ConfirmDialog, EmptyState, PageHeader, Panel } from "./ui";

export default function ProjectList({ projects }: { projects: IProject[] }) {
  const router = useRouter();
  const [items, setItems] = useState(projects);
  const [search, setSearch] = useState("");
  const [toDelete, setToDelete] = useState<IProject | null>(null);

  // pick up fresh data after a save or delete refreshes the page
  useEffect(() => setItems(projects), [projects]);

  const term = search.trim().toLowerCase();
  const visible = term
    ? items.filter(
        (p) => p.title.toLowerCase().includes(term) || p.techStacks?.some((t) => t.toLowerCase().includes(term))
      )
    : items;
  const featuredCount = items.filter((p) => p.featured).length;

  // the list shown here is the order used on the site
  const move = async (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= items.length) return;

    const previous = items;
    const next = [...items];
    [next[index], next[target]] = [next[target], next[index]];
    setItems(next);

    const res = await reorderProjects(next.map((p) => p._id!));
    if (!res.success) {
      setItems(previous);
      toast.error(res.message || "Could not save the order");
    }
  };

  const toggleFeatured = async (project: IProject) => {
    const featured = !project.featured;
    setItems((prev) => prev.map((p) => (p._id === project._id ? { ...p, featured } : p)));

    const res = await setProjectFeatured(project._id!, featured);
    if (!res.success) {
      setItems((prev) => prev.map((p) => (p._id === project._id ? { ...p, featured: !featured } : p)));
      toast.error(res.message || "Could not update the project");
    }
  };

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
      <PageHeader
        title="Projects"
        description={`${items.length} project${items.length === 1 ? "" : "s"}, ${featuredCount} featured`}
      >
        <Button asChild>
          <Link href="/dashboard/projects/create">
            <Plus /> New project
          </Link>
        </Button>
      </PageHeader>

      {items.length === 0 ? (
        <EmptyState icon={FolderKanban} title="No projects yet" description="Add your first project to show it on the landing page.">
          <Button asChild>
            <Link href="/dashboard/projects/create">
              <Plus /> New project
            </Link>
          </Button>
        </EmptyState>
      ) : (
        <>
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by title or tech" className="pl-9" />
            </div>
            <p className="text-xs text-muted-foreground">
              {term
                ? "Clear the search to change the order."
                : "Use the arrows to set the order shown on your site. Star a project to feature it on the home page."}
            </p>
          </div>

          {visible.length === 0 && <p className="py-10 text-center text-sm text-muted-foreground">No projects match “{search}”.</p>}

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {visible.map((project, index) => (
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

                  {!term && (
                    <div className="absolute left-2 top-2 flex items-center gap-1 rounded-lg bg-background/90 p-1 shadow backdrop-blur">
                      <span className="min-w-6 px-1 text-center text-xs font-semibold tabular-nums">{index + 1}</span>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => move(index, -1)}
                        disabled={index === 0}
                        aria-label={`Move ${project.title} earlier`}
                      >
                        <ArrowUp />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => move(index, 1)}
                        disabled={index === items.length - 1}
                        aria-label={`Move ${project.title} later`}
                      >
                        <ArrowDown />
                      </Button>
                    </div>
                  )}

                  <button
                    onClick={() => toggleFeatured(project)}
                    aria-pressed={Boolean(project.featured)}
                    aria-label={project.featured ? `Remove ${project.title} from featured` : `Feature ${project.title}`}
                    title={project.featured ? "Featured on the home page" : "Feature on the home page"}
                    className={cn(
                      "absolute right-2 top-2 grid size-9 cursor-pointer place-items-center rounded-lg shadow backdrop-blur transition-colors",
                      project.featured
                        ? "bg-amber-400 text-amber-950"
                        : "bg-background/90 text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <Star className={cn("size-4", project.featured && "fill-current")} />
                  </button>
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
