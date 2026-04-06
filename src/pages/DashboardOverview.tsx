import { KPICards } from "@/components/dashboard/KPICards";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { FoodCostChart } from "@/components/dashboard/FoodCostChart";
import { InventorySection } from "@/components/dashboard/InventorySection";
import { WasteSection } from "@/components/dashboard/WasteSection";
import { MenuEngineering } from "@/components/dashboard/MenuEngineering";
import { MarketingSection } from "@/components/dashboard/MarketingSection";
import { AIInsights } from "@/components/dashboard/AIInsights";
import { ActivityPanel } from "@/components/dashboard/ActivityPanel";
import { useSheetId, useSheetData } from "@/hooks/useSheetData";
import { Badge } from "@/components/ui/badge";
import { FileSpreadsheet } from "lucide-react";

const DashboardOverview = () => {
  const { sheetId } = useSheetId();
  const { data: kpiData, isUsingFallback } = useSheetData("KPIs", sheetId);
  const { data: revenueData } = useSheetData("Revenue", sheetId);
  const { data: foodCostData } = useSheetData("FoodCost", sheetId);
  const { data: wasteData } = useSheetData("Waste", sheetId);
  const { data: wasteCategoryData } = useSheetData("WasteCategories", sheetId);
  const { data: topWastedIngredients } = useSheetData("WastedIngredients", sheetId);
  const { data: inventoryItems } = useSheetData("Inventory", sheetId);
  const { data: menuItems } = useSheetData("Menu", sheetId);
  const { data: marketingChannels } = useSheetData("Marketing", sheetId);
  const { data: aiInsights } = useSheetData("AIInsights", sheetId);
  const { data: recentAlerts } = useSheetData("Alerts", sheetId);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground">
            Welcome back, Restaurant Owner
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Here's your restaurant performance overview for June 2025
          </p>
        </div>
        {isUsingFallback && (
          <Badge variant="outline" className="text-[10px] gap-1 text-muted-foreground">
            <FileSpreadsheet size={10} /> Sample Data
          </Badge>
        )}
      </div>
      <KPICards data={kpiData} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <RevenueChart data={revenueData} />
        <FoodCostChart data={foodCostData} />
      </div>
      <div>
        <h2 className="text-sm font-semibold text-foreground mb-3">Waste Management</h2>
        <WasteSection wasteData={wasteData} wasteCategoryData={wasteCategoryData} topWastedIngredients={topWastedIngredients} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <InventorySection data={inventoryItems} />
        <ActivityPanel data={recentAlerts} />
      </div>
      <MenuEngineering data={menuItems} />
      <MarketingSection data={marketingChannels} />
      <AIInsights data={aiInsights} />
    </div>
  );
};

export default DashboardOverview;
