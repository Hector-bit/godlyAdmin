import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./app/lib/session";

const protectedRoutes = ["/", "events", '/artists', 'albums'];
const publicRoutes = ["/login"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  // const isProtectedRoute = protectedRoutes.includes(path);
  const isProtectedRoute = protectedRoutes.some((route) => {
    const matchingpath = path.trim().startsWith(`${route}`)
    if(matchingpath) return matchingpath
    console.log('path + route', `|${path}|`, `|${route}|`, path.trim().startsWith(`${route}`))
  })
  const isPublicRoute = publicRoutes.includes(path);

  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

  console.log("SESSION: ", typeof(session), !session?.userId, isProtectedRoute)

  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (isPublicRoute && session?.userId) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/events/:path*", "/artists/:path*", "/albums/:path*"]
};
