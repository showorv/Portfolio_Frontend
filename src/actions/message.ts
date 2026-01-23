"use server"

import { FieldValues } from "react-hook-form";

export const createMessage = async (data: any) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/message/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  
    const result = await res.json(); // read body only once
  
    if (!res.ok) {
      console.error("Error in create message:", result);
      throw new Error(result.message || "Failed to create message");
    }
  
    return result;
  };
  


export const getMessage = async ()=>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/message`,{
       cache: "no-store"
    })
    
    const result = await res.json()

    return result

}