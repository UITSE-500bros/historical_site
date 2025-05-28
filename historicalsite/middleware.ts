import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ✅ Bỏ qua middleware cho trang login để tránh infinite loop
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  // Kiểm tra accessToken trong cookies
  const token = req.cookies.get("accessToken")?.value;

  // Debug log (có thể xóa sau khi test xong)
  console.log("🔍 Middleware check:", {
    path: pathname,
    hasToken: !!token,
    tokenValue: token ? "***EXISTS***" : "NO_TOKEN",
    isAdminRoute: pathname.startsWith("/admin"),
    cookies: req.cookies.getAll().map((c) => c.name),
  });

  // Nếu không có token và đang truy cập admin routes (trừ login)
  if (!token && pathname.startsWith("/admin")) {
    console.log("❌ No token found, redirecting to login");
    const loginUrl = new URL("/admin/login", req.url);

    // Add the attempted URL as a query parameter for redirect after login
    loginUrl.searchParams.set("redirect", pathname);

    return NextResponse.redirect(loginUrl);
  }

  console.log("✅ Access granted");
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all admin routes except login
    "/admin/((?!login).*)",
    // Also match the admin root path
    "/admin",
  ],
};
