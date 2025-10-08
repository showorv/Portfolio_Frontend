
"use server"

export const skillCreate = async (data: FormData)=>{
    try {
        
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/skill/create`, {
            method: "POST",
        body: data,
        credentials: "include"
        })

        if(!res.ok){
            const errorText = await res.text();
            console.error("Error in createskill:", errorText);
        }
    
        const result = await res.json()
    
        return result;
        } catch (err) {
            console.error("create skill error:", err);
        throw err;
        }
}