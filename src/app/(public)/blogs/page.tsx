import BlogCard from '@/components/shared/BlogCard'

import SectionTitle from '@/components/ui/SectionTitle'
import React from 'react'

export default async function BlogsPage() {

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blog`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error("Failed to fetch blogs");
   const {data: blogs} = await res.json()

  return (
    <div>
        <div className="py-20 bg-background/50">
      <SectionTitle title="My Blogs"  />
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {blogs.map((blog:any) => (

          
          <BlogCard key={blog._id } post={blog}/>
      
        ))}
            </div>
    </div>
    </div>
  )
}
