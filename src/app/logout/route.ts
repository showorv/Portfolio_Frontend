import { NextRequest, NextResponse } from "next/server";
import { TOKEN_COOKIE } from "@/lib/server-api";

// Ends the session and returns to the login page. Also the landing spot when
// the backend rejects a token, since only a route handler can clear the cookie.
export async function GET(req: NextRequest) {
  const res = NextResponse.redirect(new URL("/login", req.url));
  res.cookies.delete(TOKEN_COOKIE);
  return res;
}
