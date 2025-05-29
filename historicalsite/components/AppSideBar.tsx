import { FileText, Home, Landmark, Ticket } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: Home,
  },

  {
    title: "Articles",
    url: "/admin/articles?page=1",
    icon: FileText,
  },
  {
    title: "Museums",
    url: "/admin/museums",
    icon: Landmark,
  },
];

export default function AppSidebar() {
  return (
    <Sidebar variant="floating" className="bg-transparent">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-lg mb-4">
            Historical Site Admin
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className="mb-4">
                  <SidebarMenuButton
                    asChild
                    className="py-3 px-5 text-lg gap-4 h-14 rounded-md hover:bg-gray-100 transition-all"
                  >
                    <Link href={item.url} className="flex items-center gap-4">
                      <item.icon size={26} />
                      <span className="font-semibold tracking-wide">
                        {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
