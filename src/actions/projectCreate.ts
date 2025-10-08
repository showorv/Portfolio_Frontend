"use server"

export const createProject = async (data: FormData)=>{

    try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/project/create`, {
        method: "POST",
        body: data,
        credentials: "include"
    })

    if(!res.ok){
        const errorText = await res.text();
        console.error("Error in createproject:", errorText);
    }

    const result = await res.json()

    return result;
    } catch (err) {
        console.error("create project error:", err);
    throw err;
    }

}