import { FieldValues } from "react-hook-form";
import { setCookie } from "./tokenHandle";
import { parse } from "cookie";

export const login= async (data: FieldValues) => {
  let accessTokenObject: null | any = null;

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

  const setCookieHeaders = res.headers.getSetCookie();

        if (setCookieHeaders && setCookieHeaders.length > 0) {
            setCookieHeaders.forEach((cookie: string) => {
                const parsedCookie = parse(cookie);

                if (parsedCookie['accessToken']) {
                    accessTokenObject = parsedCookie;
                   
                    
                }
              
            })
        } else {
            throw new Error("No Set-Cookie header found");
        }

        if (!accessTokenObject) {
            throw new Error("Tokens not found in cookies");
        }

      
  await setCookie("accessToken", accessTokenObject.accessToken, {
    secure: true,
    httpOnly: true,
    maxAge: parseInt(accessTokenObject['Max-Age']) || 1000 * 60 * 60,
    path: accessTokenObject.Path || "/",
    sameSite: accessTokenObject['SameSite'] || "none",
});
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