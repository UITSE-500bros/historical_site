import AppSidebar from "@/components/AppSideBar";
import { SidebarProvider } from "@/components/ui/sidebar";

import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <SidebarProvider>
        <div className="flex w-full">
            <AppSidebar/>
            <main className="flex-1">
                {children}
            </main>
        </div>
      </SidebarProvider>
    </div>
  );
}
