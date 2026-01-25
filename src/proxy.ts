import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCookie } from "./actions/tokenHandle";

export async function proxy(req: NextRequest) {
  const token = await getCookie("accessToken") ||  null;
  if (!token && req.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};