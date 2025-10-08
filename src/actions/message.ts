"use server"

import { FieldValues } from "react-hook-form";


export const createMessage = async (data: FieldValues)=>{

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/message/create`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(data),
        credentials: "include"
    })

    if (!res.ok) {
        const errorText = await res.text();
        console.error("Error in create message:", errorText);
      }

    const result = await res.json()

    return result

}


export const getMessage = async ()=>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/message`,{
       cache: "no-store"
    })
    
    const result = await res.json()

    return result

}