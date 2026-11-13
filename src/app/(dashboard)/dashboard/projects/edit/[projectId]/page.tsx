import { notFound } from "next/navigation";
import { getProjectById } from "@/actions/admin";
import ProjectForm from "@/components/admin/ProjectForm";

export default async function EditProjectPage({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await params;
  const res = await getProjectById(projectId);

  if (!res.success || !res.data) notFound();

  return <ProjectForm project={res.data} />;
}
