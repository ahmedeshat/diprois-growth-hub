import { WasteSection } from "@/components/dashboard/WasteSection";
import { useSheetId, useSheetData } from "@/hooks/useSheetData";

const DashboardWaste = () => {
  const { sheetId } = useSheetId();
  const { data: wasteData } = useSheetData("Waste", sheetId);
  const { data: wasteCategoryData } = useSheetData("WasteCategories", sheetId);
  const { data: topWastedIngredients } = useSheetData("WastedIngredients", sheetId);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-foreground">Waste Management</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Monitor waste trends and reduce costs</p>
      </div>
      <WasteSection wasteData={wasteData} wasteCategoryData={wasteCategoryData} topWastedIngredients={topWastedIngredients} />
    </div>
  );
};

export default DashboardWaste;
