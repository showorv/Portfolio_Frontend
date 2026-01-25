"use client";

import { motion } from "framer-motion";
import { IBlogs } from "@/types/blogTypes";
import SectionTitle from "../ui/SectionTitle";
import Image from "next/image";



export default function SingleBlog({blog}: {blog: IBlogs}) {

    if (!blog) {
        return (
          <div className="py-20 text-center text-gray-500">Blog not found.</div>
        );
      }

  return (
<section className="py-30 max-w-4xl mx-auto px-6">
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
  >

    <SectionTitle
      title={blog.title}
      subtitle={`Category: ${blog.category || "Uncategorized"}`}
    />



    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
      {blog.publishedAt && (
        <p>
          🗓️ {new Date(blog.publishedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </p>
      )}
      {blog.views !== undefined && (
        <p>👁️ {blog.views} {blog.views === 1 ? "view" : "views"}</p>
      )}
      {blog.tags && blog.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {blog.tags.map((tag: string, index: number) => (
            <span
              key={index}
              className="bg-primary/10 text-primary px-2 py-1 rounded-md text-xs font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>


    {blog.thumbnail && (
      <Image
        src={blog.thumbnail}
        alt={blog.title}
        className="w-full h-64 object-cover rounded-md mb-6"
      />
    )}

    <div
      className="prose dark:prose-invert max-w-full"
      dangerouslySetInnerHTML={{ __html: blog.content }}
    ></div>
  </motion.div>
</section>

  );
}
