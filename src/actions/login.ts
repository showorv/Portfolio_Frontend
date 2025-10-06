import { FieldValues } from "react-hook-form";


export const login= async (data: FieldValues) => {


  const res = await fetch (`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
        credentials: "include",
    })

  const result = await res.json();
  

  if (!res.ok) {
    console.log(res?.text() || "Login failed");
  }

  return result;
    
    
}