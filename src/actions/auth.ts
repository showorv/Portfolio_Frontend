"use server";

import { cookies } from "next/headers";
import { TOKEN_COOKIE } from "@/lib/server-api";

const WEEK = 7 * 24 * 60 * 60;

export const login = async (data: { email: string; password: string }) => {
  let res: Response;
  try {
    res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      cache: "no-store",
    });
  } catch {
    return { success: false, message: "Could not reach the server" };
  }

  const result = await res.json().catch(() => null);

  if (!res.ok || !result?.success) {
    return { success: false, message: result?.message || "Login failed" };
  }

  // The backend sets its cookie on its own domain, which this site can never
  // read. Take the token from the response and store it on this domain instead.
  const token: string | undefined =
    result.data?.accessToken ||
    res.headers
      .getSetCookie()
      .map((c) => c.match(/^accessToken=([^;]+)/)?.[1])
      .find(Boolean);

  if (!token) {
    return { success: false, message: "Login succeeded but no token was returned" };
  }

  (await cookies()).set(TOKEN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: WEEK,
  });

  return { success: true, message: "Logged in successfully" };
};

export const logout = async () => {
  (await cookies()).delete(TOKEN_COOKIE);
  return { success: true };
};
