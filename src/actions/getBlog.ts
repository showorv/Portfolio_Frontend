
"use server"

import { revalidateTag } from "next/cache"


 

export const getBlog = async ({page, limit}: {page:number, limit:number})=>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blog?page=${page}&limit=${limit}`, {
      next: { tags: ["blogs"] },
      cache: "no-store"
      })

      const result = await res.json()

      return result
}

export const deleteBlog = async (id: string)=>{

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blog/${id}`, {
       method: "DELETE",
       credentials: "include"
      })

      if(!res.ok){
        const errorText = await res.text();
        console.error("Error in delete Blog:", errorText);
      }



      const result = await res.json()


      return result

}
export const updateBlog = async (id: string, data: FormData)=>{

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blog/${id}`, {
       method: "PATCH",
       body: data,
       credentials: "include",
      
      })

      if(!res.ok){
        const errorText = await res.text();
        console.error("Error in update Blog:", errorText);
      }



      const result = await res.json()

      // if(result){
      //   revalidateTag("blogs")
      // }


      return result

}


