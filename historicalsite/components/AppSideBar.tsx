import {
  FileText,
  Home,
  Landmark,
  Ticket
} from "lucide-react";

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
  {
    title: "Tickets",
    url: "/admin/tickets",
    icon: Ticket,
  },
];

export default function AppSidebar() {
  return (
    <Sidebar variant="floating" className="bg-transparent  ">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
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
