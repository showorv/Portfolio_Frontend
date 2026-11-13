import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const TOKEN_COOKIE = "accessToken";

export interface ApiResult<T> {
  success: boolean;
  message: string;
  data: T;
  metaData?: { total: number; page?: number; limit?: number; totalPage?: number };
}

interface ApiOptions {
  method?: "GET" | "POST" | "PATCH" | "DELETE";
  body?: unknown;
  /** Send the admin token. A rejected token ends the session. */
  auth?: boolean;
}

/**
 * Server-side call to the backend. The admin token lives in an httpOnly cookie
 * on this site's own domain and is forwarded as an Authorization header, so
 * nothing depends on the browser accepting cookies from the backend's domain.
 */
export async function api<T = unknown>(path: string, options: ApiOptions = {}): Promise<ApiResult<T>> {
  const { method = "GET", body, auth = false } = options;
  const headers: Record<string, string> = {};

  if (body !== undefined) headers["Content-Type"] = "application/json";

  if (auth) {
    const token = (await cookies()).get(TOKEN_COOKIE)?.value;
    if (!token) redirect("/logout");
    headers.Authorization = token;
  }

  let res: Response;
  try {
    res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}${path}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
      cache: "no-store",
    });
  } catch {
    return { success: false, message: "Could not reach the server", data: null as T };
  }

  if (auth && res.status === 401) redirect("/logout");

  const json = await res.json().catch(() => null);

  if (!json) {
    return { success: false, message: `Request failed (${res.status})`, data: null as T };
  }

  return { ...json, success: res.ok && json.success !== false };
}
