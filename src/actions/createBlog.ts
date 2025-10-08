
"use server"

import { revalidateTag } from "next/cache";

export const createBog = async (data: FormData) => {
  try {
 

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blog/create`, {
      method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
        
    //   },
      body:data,
      credentials: "include"
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Error in createBlog:", errorText);
    }

    const result = await res.json();

    // if(result){
    //   revalidateTag("BLOGS")
    // }
   

    return result;
  } catch (err) {
    console.error("createBog error:", err);
    throw err;
  }
};


