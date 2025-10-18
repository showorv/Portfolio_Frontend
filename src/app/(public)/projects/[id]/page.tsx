
import SingleProject from '@/components/shared/singleProject';
import React from 'react'

export default async function SingleBlogPage({params}: {params: Promise<{id: string}>}) {
  const {id} = await params
  console.log(id);
  
 
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/project/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return (
      <div className="py-20 text-center text-muted-foreground">
        Project not found.
      </div>
    );
  }

  const project = await res.json();
  
  console.log(project);
  

  return (
    <div>
    <SingleProject project={project.data || project}/>
    </div>
  )
}
