import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/hooks/use-theme";
import { DashboardLayout } from "@/components/DashboardLayout";
import Index from "./pages/Index";
import UserManagement from "./pages/UserManagement";
import ApiLogs from "./pages/ApiLogs";
import B2BPortal from "./pages/B2BPortal";
import ContactForm from "./pages/ContactForm";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <DashboardLayout>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/users" element={<UserManagement />} />
              <Route path="/logs" element={<ApiLogs />} />
              <Route path="/portal" element={<B2BPortal />} />
              <Route path="/contact" element={<ContactForm />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </DashboardLayout>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
