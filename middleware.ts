import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Handle top-menu demo routes
  if (pathname.startsWith("/demo/top-menu/") && pathname !== "/demo/top-menu/") {
    // Extract the actual route path after /demo/top-menu/
    const actualPath = pathname.replace("/demo/top-menu/", "/")

    // Rewrite to the actual route but keep the URL as /demo/top-menu/...
    return NextResponse.rewrite(new URL(actualPath, request.url))
  }

  // Handle top-menu2 demo routes
  if (pathname.startsWith("/demo/top-menu2/") && pathname !== "/demo/top-menu2/") {
    // Extract the actual route path after /demo/top-menu2/
    const actualPath = pathname.replace("/demo/top-menu2/", "/")

    // Rewrite to the actual route but keep the URL as /demo/top-menu2/...
    return NextResponse.rewrite(new URL(actualPath, request.url))
  }

  // Handle top-menu3 demo routes
  if (pathname.startsWith("/demo/top-menu3/") && pathname !== "/demo/top-menu3/") {
    // Extract the actual route path after /demo/top-menu3/
    const actualPath = pathname.replace("/demo/top-menu3/", "/")

    // Rewrite to the actual route but keep the URL as /demo/top-menu3/...
    return NextResponse.rewrite(new URL(actualPath, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/demo/top-menu/:path*", "/demo/top-menu2/:path*", "/demo/top-menu3/:path*"],
}
