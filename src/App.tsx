import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Auth from "./pages/Auth.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import DashboardOverview from "./pages/DashboardOverview.tsx";
import DashboardInventory from "./pages/DashboardInventory.tsx";
import DashboardWaste from "./pages/DashboardWaste.tsx";
import DashboardMenu from "./pages/DashboardMenu.tsx";
import DashboardMarketing from "./pages/DashboardMarketing.tsx";
import DashboardAnalytics from "./pages/DashboardAnalytics.tsx";
import DashboardRecommendations from "./pages/DashboardRecommendations.tsx";
import DashboardSettings from "./pages/DashboardSettings.tsx";
import ResetPassword from "./pages/ResetPassword.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/auth" element={<Navigate to="/" replace />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<DashboardOverview />} />
            <Route path="inventory" element={<DashboardInventory />} />
            <Route path="waste" element={<DashboardWaste />} />
            <Route path="menu" element={<DashboardMenu />} />
            <Route path="marketing" element={<DashboardMarketing />} />
            <Route path="analytics" element={<DashboardAnalytics />} />
            <Route path="recommendations" element={<DashboardRecommendations />} />
            <Route path="settings" element={<DashboardSettings />} />
          </Route>
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
