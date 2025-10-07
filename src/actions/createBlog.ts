"use client";




export const createBog = async (data: FormData) => {
  try {
    // Read FormData once
    // const entriesArray = Array.from(data.entries());
    // const blogInfo = Object.fromEntries(entriesArray);

    // const modifiedData = {
    //   ...blogInfo,
    //   tags: blogInfo.tags ? blogInfo.tags.toString().split(",").map(tag => tag.trim()) : [],
    //   isPublished: Boolean(blogInfo.isPublished)
    // };

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

   

    return result;
  } catch (err) {
    console.error("createBog error:", err);
    throw err;
  }
};
