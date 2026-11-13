import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Only decides where to send the browser. The backend verifies the token's
// signature on every admin request, so reading the expiry here is enough.
function isTokenLive(token: string | undefined) {
  if (!token) return false;
  try {
    const payload = JSON.parse(atob(token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")));
    return typeof payload.exp !== "number" || payload.exp * 1000 > Date.now();
  } catch {
    return false;
  }
}

export async function proxy(req: NextRequest) {
  const loggedIn = isTokenLive(req.cookies.get("accessToken")?.value);
  const { pathname } = req.nextUrl;

  if (!loggedIn && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (loggedIn && pathname === "/login") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
