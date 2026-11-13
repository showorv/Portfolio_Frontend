import { getProjects } from "@/actions/admin";
import ProjectList from "@/components/admin/ProjectList";

export default async function ProjectsPage() {
  const res = await getProjects();
  return <ProjectList projects={res.data ?? []} />;
}
