import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ReactNode } from "react";

export function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">

          {/* Header — clean white/dark, no purple tint */}
          <header className="h-14 flex items-center gap-3 border-b border-border px-4 bg-card shrink-0">
            <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
            <div className="w-px h-5 bg-border" />
            <span className="text-sm font-medium text-muted-foreground">
              VillageAPI Admin Panel
            </span>
          </header>

          {/* Main content — neutral background */}
          <main className="flex-1 p-4 md:p-6 overflow-auto bg-background">
            {children}
          </main>

        </div>
      </div>
    </SidebarProvider>
  );
}
