"use client";

import AppSidebar from "@/components/AppSideBar";
import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";
import { usePathname } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

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
    <div className="fixed inset-0 w-screen h-screen bg-[#F0F1F3] overflow-hidden py-10">
      <SidebarProvider>
        <div className="flex w-full h-full">
          <AppSidebar />
          <main className="flex-1 min-w-0 overflow-auto">{children}</main>
        </div>
      </SidebarProvider>
    </div>
  );
}
