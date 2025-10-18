"use client";

import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import Link from "next/link";


export default function BlogCard( {post, index}: {post: any, index?:any}) {


  return (

          <motion.div
            key={post._id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="hover:shadow-xl transition-shadow">
              {post.thumbnail && (
                <img
                  src={post.thumbnail}
                  alt={post.title}
                  className="w-full h-48 object-cover rounded-t-md"
                />
              )}
              <CardHeader>
                <div className="flex justify-between items-center">
                <CardTitle>{post.title}</CardTitle>
                    {post.views !== undefined && (
            <p className="opacity-50">{post.views} {post.views === 1 || post.views===0 ? "view" : "views"}</p>
        )}
                </div>
              
                <CardDescription>{post.content.slice(0,100)}</CardDescription>
              </CardHeader>
              <CardContent className="mt-2">
                <Link href={`/blogs/${post.slug}`}>
                  <Button variant="outline" size="sm">
                    Read More
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>

  );
}
