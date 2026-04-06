import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { FoodCostChart } from "@/components/dashboard/FoodCostChart";
import { KPICards } from "@/components/dashboard/KPICards";
import { useSheetId, useSheetData } from "@/hooks/useSheetData";

const DashboardAnalytics = () => {
  const { sheetId } = useSheetId();
  const { data: kpiData } = useSheetData("KPIs", sheetId);
  const { data: revenueData } = useSheetData("Revenue", sheetId);
  const { data: foodCostData } = useSheetData("FoodCost", sheetId);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-foreground">Analytics</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Deep dive into your restaurant performance data</p>
      </div>
      <KPICards data={kpiData} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <RevenueChart data={revenueData} />
        <FoodCostChart data={foodCostData} />
      </div>
    </div>
  );
};

export default DashboardAnalytics;
