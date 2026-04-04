import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ReactNode } from "react";

export function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-14 flex items-center border-b border-border px-4 bg-white dark:bg-[hsl(270,25%,12%)] shadow-sm">
            <SidebarTrigger />
            <span className="ml-4 text-sm font-medium text-muted-foreground">VillageAPI Admin Panel</span>
          </header>
          <main className="flex-1 p-4 md:p-6 overflow-auto bg-[hsl(270,30%,96%)] dark:bg-[hsl(270,30%,8%)]">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
