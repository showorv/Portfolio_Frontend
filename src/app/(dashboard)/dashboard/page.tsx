import Link from "next/link";
import { ArrowRight, Eye, FileText, FolderKanban, Images, Mail, Plus, Sparkles, Upload } from "lucide-react";
import { getStats } from "@/actions/admin";
import { PageHeader, Panel } from "@/components/admin/ui";
import { formatDate } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { thumb } from "@/lib/upload";

export default async function Dashboard() {
  const res = await getStats();

  if (!res.success) {
    return (
      <Panel className="px-6 py-14 text-center">
        <p className="font-semibold">Overview unavailable</p>
        <p className="mt-1 text-sm text-muted-foreground">
          {res.message}. If you just updated the site, make sure the latest backend is deployed too.
        </p>
      </Panel>
    );
  }

  const stats = res.data;

  const cards = [
    { label: "Projects", value: stats.projects, icon: FolderKanban, href: "/dashboard/projects" },
    { label: "Blog posts", value: stats.blogs, icon: FileText, href: "/dashboard/blogs" },
    { label: "Skills", value: stats.skills, icon: Sparkles, href: "/dashboard/skills" },
    { label: "Images", value: stats.media, icon: Images, href: "/dashboard/media" },
    { label: "Unread messages", value: stats.unreadMessages, icon: Mail, href: "/dashboard/messages" },
    { label: "Blog views", value: stats.blogViews, icon: Eye, href: "/dashboard/blogs" },
  ];

  return (
    <>
      <PageHeader title="Welcome back" description="Here is what is on your portfolio right now.">
        <Button variant="outline" asChild>
          <Link href="/dashboard/media">
            <Upload /> Upload image
          </Link>
        </Button>
        <Button asChild>
          <Link href="/dashboard/projects/create">
            <Plus /> New project
          </Link>
        </Button>
      </PageHeader>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
        {cards.map((card) => (
          <Link key={card.label} href={card.href} className="group">
            <Panel className="flex items-center gap-3 p-4 transition-all group-hover:-translate-y-0.5 group-hover:border-primary/50 group-hover:shadow-md sm:gap-4 sm:p-5">
              <div className="grid size-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary sm:size-12">
                <card.icon className="size-5 sm:size-6" />
              </div>
              <div className="min-w-0">
                <p className="text-2xl font-bold leading-none tabular-nums sm:text-3xl">{card.value}</p>
                <p className="mt-1.5 truncate text-xs text-muted-foreground sm:text-sm">{card.label}</p>
              </div>
            </Panel>
          </Link>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Panel>
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <h3 className="font-semibold">Recent messages</h3>
            <Link href="/dashboard/messages" className="inline-flex items-center gap-1 text-sm text-primary hover:underline">
              View all <ArrowRight className="size-3.5" />
            </Link>
          </div>
          {stats.recentMessages.length === 0 ? (
            <p className="px-5 py-10 text-center text-sm text-muted-foreground">No messages yet.</p>
          ) : (
            <ul className="divide-y divide-border">
              {stats.recentMessages.map((message) => (
                <li key={message._id}>
                  <Link href="/dashboard/messages" className="flex items-start gap-3 px-5 py-3 hover:bg-accent/50">
                    <span className={`mt-1.5 size-2 shrink-0 rounded-full ${message.isRead ? "bg-border" : "bg-primary"}`} />
                    <span className="min-w-0 flex-1">
                      <span className="flex justify-between gap-3 text-sm">
                        <span className="truncate font-medium">{message.name || message.email}</span>
                        <span className="shrink-0 text-xs text-muted-foreground">{formatDate(message.createdAt)}</span>
                      </span>
                      <span className="block truncate text-sm text-muted-foreground">{message.description}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Panel>

        <Panel>
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <h3 className="font-semibold">Latest projects</h3>
            <Link href="/dashboard/projects" className="inline-flex items-center gap-1 text-sm text-primary hover:underline">
              View all <ArrowRight className="size-3.5" />
            </Link>
          </div>
          {stats.recentProjects.length === 0 ? (
            <p className="px-5 py-10 text-center text-sm text-muted-foreground">No projects yet.</p>
          ) : (
            <ul className="divide-y divide-border">
              {stats.recentProjects.map((project) => (
                <li key={project._id}>
                  <Link href={`/dashboard/projects/edit/${project._id}`} className="flex items-center gap-3 px-5 py-3 hover:bg-accent/50">
                    <span className="h-10 w-16 shrink-0 overflow-hidden rounded-md bg-muted">
                      {project.thumbnail && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={thumb(project.thumbnail, 160)} alt="" className="size-full object-cover" />
                      )}
                    </span>
                    <span className="min-w-0 flex-1 truncate text-sm font-medium">{project.title}</span>
                    <span className="shrink-0 text-xs text-muted-foreground">{formatDate(project.createdAt)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Panel>
      </div>
    </>
  );
}
