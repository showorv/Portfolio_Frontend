"use client";

import { useEffect, useState } from "react";
import SectionTitle from "@/components/ui/SectionTitle";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import Link from "next/link";
import { fetchBlogs } from "@/actions/public/getPublicBlogs";
import { IBlogs } from "@/types/blogTypes";

export default function Blogs() {
  const [blogs, setBlogs] = useState<IBlogs[]>([]);

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const response = await fetchBlogs();
        setBlogs(response.data);
        
        
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      }
    };
    getBlogs();
  }, []);

  return (
    <section id="blogs" className="py-20 bg-background/50">
      <SectionTitle title="My Blogs" subtitle="Read my latest articles" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog, index) => (
          <motion.div
            key={blog._id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="hover:shadow-xl transition-shadow">
              {blog.thumbnail && (
                <img
                  src={blog.thumbnail}
                  alt={blog.title}
                  className="w-full h-48 object-cover rounded-t-md"
                />
              )}
              <CardHeader>
                <CardTitle>{blog.title}</CardTitle>
                <CardDescription>{blog.content.slice(0,100)}</CardDescription>
              </CardHeader>
              <CardContent className="mt-2">
                <Link href={`/blog/${blog.slug}`}>
                  <Button variant="outline" size="sm">
                    Read More
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
