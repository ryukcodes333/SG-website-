import { NextRequest, NextResponse } from "next/server";
import { verifySession } from "@/lib/auth";

const protectedPaths = ["/profile"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isProtected = protectedPaths.some((p) => pathname.startsWith(p));

  if (isProtected) {
    const token = req.cookies.get("sg_session")?.value;
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    const session = await verifySession(token);
    if (!session) {
      const response = NextResponse.redirect(new URL("/login", req.url));
      response.cookies.delete("sg_session");
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
