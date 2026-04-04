import { LayoutDashboard, Users, FileText, Globe, Mail, Sun, Moon } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { useTheme } from "@/hooks/use-theme";
import { Button } from "@/components/ui/button";

const navItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "User Management", url: "/users", icon: Users },
  { title: "API Logs", url: "/logs", icon: FileText },
  { title: "B2B Portal", url: "/portal", icon: Globe },
  { title: "Contact Form", url: "/contact", icon: Mail },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const { theme, toggleTheme } = useTheme();

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-lg font-bold tracking-tight text-primary py-4">
            {collapsed ? "V" : "🌍 VillageAPI"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/"}
                      className="hover:bg-sidebar-accent rounded-lg"
                      activeClassName="bg-sidebar-accent text-sidebar-primary font-medium rounded-lg"
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t pt-2">
        <Button variant="ghost" size="icon" onClick={toggleTheme} className="w-full justify-start px-3">
          {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          {!collapsed && <span className="ml-2 text-sm">{theme === "light" ? "Dark Mode" : "Light Mode"}</span>}
        </Button>
        {!collapsed && <p className="text-xs text-muted-foreground text-center pb-2">VillageAPI Dashboard v1.0</p>}
      </SidebarFooter>
    </Sidebar>
  );
}
