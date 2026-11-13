import { notFound } from "next/navigation";
import { getBlogById } from "@/actions/admin";
import BlogForm from "@/components/admin/BlogForm";

export default async function EditBlogPage({ params }: { params: Promise<{ blogId: string }> }) {
  const { blogId } = await params;
  const res = await getBlogById(blogId);

  if (!res.success || !res.data) notFound();

  return <BlogForm blog={res.data} />;
}
