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

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: Home,
  },

  {
    title: "Posts",
    url: "/admin/posts",
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
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
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
