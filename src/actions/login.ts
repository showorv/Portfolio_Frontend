import { FieldValues } from "react-hook-form";
import { setCookie } from "./tokenHandle";
import { parse } from "cookie";

export const login= async (data: FieldValues) => {
  // let accessTokenObject: null | any = null;

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
  
  if (result.accessToken) {
    document.cookie = `accessToken=${result.accessToken}; path=/; max-age=3600; SameSite=Lax; Secure`;
  }
  return result;
    
    
}


export const logout = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Logout failed");
  }

  return res.json(); 
};