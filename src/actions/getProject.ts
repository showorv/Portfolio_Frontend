
"use server"
import { revalidateTag } from "next/cache"

 

export const getProject = async ()=>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/project`, {
      next: {tags: ["projects"]},
        cache: "no-store",
      })

      const result = await res.json()

      return result
}

export const deleteProject = async (id: string)=>{

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/project/${id}`, {
       method: "DELETE",
       credentials: "include"
      })

      if(!res.ok){
        const errorText = await res.text();
        console.error("Error in delete project:", errorText);
      }



      const result = await res.json()


      return result

}

export const updateProject = async (id: string, data: FormData)=>{

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/project/${id}`, {
     method: "PATCH",
     body: data,
     credentials: "include",
    
    })

    if(!res.ok){
      const errorText = await res.text();
      console.error("Error in update project:", errorText);
    }



    const result = await res.json()

    if(result){
      revalidateTag("projects")
    }


    return result

}
