import { LayoutDashboard, Users, FileText, Globe, Mail, Sun, Moon } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { useTheme } from "@/hooks/use-theme";
import { Button } from "@/components/ui/button";

const navItems = [
  { title: "Dashboard",       url: "/",        icon: LayoutDashboard },
  { title: "User Management", url: "/users",   icon: Users },
  { title: "API Logs",        url: "/logs",    icon: FileText },
  { title: "B2B Portal",      url: "/portal",  icon: Globe },
  { title: "Contact Form",    url: "/contact", icon: Mail },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const { theme, toggleTheme } = useTheme();

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          {/* Logo / brand */}
          <div className="flex items-center gap-2 px-3 py-5">
            <div className="w-7 h-7 rounded-lg bg-violet-600 flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-bold">V</span>
            </div>
            {!collapsed && (
              <span className="text-sm font-semibold text-sidebar-foreground tracking-tight">
                VillageAPI
              </span>
            )}
          </div>

          {/* Nav label */}
          {!collapsed && (
            <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-widest text-sidebar-foreground/40">
              Main Menu
            </p>
          )}

          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/"}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
                      activeClassName="bg-sidebar-accent text-sidebar-foreground font-medium border-l-2 border-violet-500 rounded-l-none"
                    >
                      <item.icon className="h-4 w-4 flex-shrink-0" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border pt-2 pb-3 space-y-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="w-full justify-start px-3 text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent"
        >
          {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          {!collapsed && (
            <span className="ml-2 text-sm">
              {theme === "light" ? "Dark Mode" : "Light Mode"}
            </span>
          )}
        </Button>
        {!collapsed && (
          <p className="text-[10px] text-sidebar-foreground/30 text-center pb-1">
            VillageAPI Dashboard v1.0
          </p>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
