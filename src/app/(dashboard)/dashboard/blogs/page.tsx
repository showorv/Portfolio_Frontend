import { getBlogs } from "@/actions/admin";
import BlogList from "@/components/admin/BlogList";

export default async function BlogsPage() {
  const res = await getBlogs();
  return <BlogList blogs={res.data ?? []} />;
}
