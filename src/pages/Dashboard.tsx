import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { KPICards } from "@/components/dashboard/KPICards";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { FoodCostChart } from "@/components/dashboard/FoodCostChart";
import { InventorySection } from "@/components/dashboard/InventorySection";
import { WasteSection } from "@/components/dashboard/WasteSection";
import { MenuEngineering } from "@/components/dashboard/MenuEngineering";
import { MarketingSection } from "@/components/dashboard/MarketingSection";
import { AIInsights } from "@/components/dashboard/AIInsights";
import { ActivityPanel } from "@/components/dashboard/ActivityPanel";
import { Menu } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
      if (!session?.user) navigate("/");
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (!session?.user) navigate("/");
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  if (!user) return null;

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <DashboardSidebar onLogout={handleLogout} />

        <div className="flex-1 flex flex-col min-w-0">
          {/* Top bar */}
          <header className="sticky top-0 z-40 h-14 bg-card/80 backdrop-blur-xl border-b border-border/40 flex items-center justify-between px-4 lg:px-6">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
              <div className="h-5 w-px bg-border/50 hidden sm:block" />
              <span className="text-xs font-medium text-muted-foreground hidden sm:block">Restaurant Operations Intelligence</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground hidden md:block">{user.email}</span>
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-xs font-semibold text-primary">
                  {(user.user_metadata?.full_name || user.email || "U")[0].toUpperCase()}
                </span>
              </div>
            </div>
          </header>

          {/* Dashboard content */}
          <main className="flex-1 overflow-y-auto">
            <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-6 space-y-6">
              {/* Welcome */}
              <div>
                <h1 className="text-xl font-bold text-foreground">
                  Welcome back, {user.user_metadata?.full_name || "Restaurant Owner"}
                </h1>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Here's your restaurant performance overview for June 2025
                </p>
              </div>

              {/* KPIs */}
              <KPICards />

              {/* Charts row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <RevenueChart />
                <FoodCostChart />
              </div>

              {/* Waste section */}
              <div>
                <h2 className="text-sm font-semibold text-foreground mb-3">Waste Management</h2>
                <WasteSection />
              </div>

              {/* Inventory + Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <InventorySection />
                <ActivityPanel />
              </div>

              {/* Menu Engineering */}
              <MenuEngineering />

              {/* Marketing */}
              <MarketingSection />

              {/* AI Insights */}
              <AIInsights />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
