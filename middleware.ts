import { NextResponse, type NextRequest } from "next/server"
import { canAccessPath, isAppRole } from "@/lib/rbac"

export function middleware(request: NextRequest) {
  const roleCookie = request.cookies.get("APP_ROLE")?.value
  const role = isAppRole(roleCookie) ? roleCookie : null

  if (!canAccessPath(request.nextUrl.pathname, role)) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/doctor/:path*"],
}
