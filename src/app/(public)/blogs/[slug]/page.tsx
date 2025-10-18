import SingleBlog from '@/components/shared/singleBlog';
import React from 'react'

export default async function SingleBlogPage({params}: {params: Promise<{slug: string}>}) {
  const {slug} = await params
  console.log(slug);
  
 
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blog/${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return (
      <div className="py-20 text-center text-muted-foreground">
        Blog not found.
      </div>
    );
  }

  const blog = await res.json();
  
  console.log(blog);
  

  return (
    <div>
      <SingleBlog blog={blog.data || blog}/>
    </div>
  )
}
