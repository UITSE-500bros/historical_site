"use client";

import AppSidebar from "@/components/AppSideBar";
import { SidebarProvider } from "@/components/ui/sidebar";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const isLoginPage = pathname === "/admin/login";

  // Client-side authentication check
  useEffect(() => {
    if (isLoginPage) {
      setIsAuthenticated(true);
      return;
    }

    // Check for accessToken in cookies
    const checkAuth = () => {
      const token = document.cookie
        .split(";")
        .find((row) => row.trim().startsWith("accessToken="))
        ?.split("=")[1];

      console.log("Client-side auth check:", {
        hasToken: !!token,
        pathname,
      });

      if (!token) {
        console.log("No token found, redirecting to login");
        router.push("/admin/login");
        return;
      }

      setIsAuthenticated(true);
    };

    checkAuth();
  }, [pathname, router, isLoginPage]);

  // Show loading or nothing while checking authentication
  if (!isLoginPage && isAuthenticated === null) {
    return (
      <div className="fixed inset-0 w-screen h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang kiểm tra xác thực...</p>
        </div>
      </div>
    );
  }

  // Nếu là trang login, hiển thị full screen không có sidebar
  if (isLoginPage) {
    return (
      <div className="fixed inset-0 w-screen h-screen overflow-hidden">
        {children}
      </div>
    );
  }

  // Các trang admin khác sẽ có sidebar và full screen
  return (
    <div className=" w-screen h-screen bg-[#F0F1F3] overflow-hidden py-10">
      <SidebarProvider>
        <div className="flex w-full h-full">
          <AppSidebar />
          <main className="flex-1 min-w-0 overflow-auto">{children}</main>
        </div>
      </SidebarProvider>
    </div>
  );
}
