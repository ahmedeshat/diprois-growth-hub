import { KPICards } from "@/components/dashboard/KPICards";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { FoodCostChart } from "@/components/dashboard/FoodCostChart";
import { InventorySection } from "@/components/dashboard/InventorySection";
import { WasteSection } from "@/components/dashboard/WasteSection";
import { MenuEngineering } from "@/components/dashboard/MenuEngineering";
import { MarketingSection } from "@/components/dashboard/MarketingSection";
import { AIInsights } from "@/components/dashboard/AIInsights";
import { ActivityPanel } from "@/components/dashboard/ActivityPanel";

const DashboardOverview = () => {
  // Get user from outlet context is complex; just use supabase directly
  const userName = "Restaurant Owner";
  <div className="space-y-6">
    <div>
      <h1 className="text-xl font-bold text-foreground">
        Welcome back, {userName}
      </h1>
      <p className="text-sm text-muted-foreground mt-0.5">
        Here's your restaurant performance overview for June 2025
      </p>
    </div>
    <KPICards />
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <RevenueChart />
      <FoodCostChart />
    </div>
    <div>
      <h2 className="text-sm font-semibold text-foreground mb-3">Waste Management</h2>
      <WasteSection />
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <InventorySection />
      <ActivityPanel />
    </div>
    <MenuEngineering />
    <MarketingSection />
    <AIInsights />
  </div>
);

export default DashboardOverview;
