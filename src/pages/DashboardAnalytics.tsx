import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { FoodCostChart } from "@/components/dashboard/FoodCostChart";
import { KPICards } from "@/components/dashboard/KPICards";

const DashboardAnalytics = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-xl font-bold text-foreground">Analytics</h1>
      <p className="text-sm text-muted-foreground mt-0.5">Deep dive into your restaurant performance data</p>
    </div>
    <KPICards />
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <RevenueChart />
      <FoodCostChart />
    </div>
  </div>
);

export default DashboardAnalytics;
