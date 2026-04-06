import { InventorySection } from "@/components/dashboard/InventorySection";
import { useSheetId, useSheetData } from "@/hooks/useSheetData";

const DashboardInventory = () => {
  const { sheetId } = useSheetId();
  const { data: inventoryItems } = useSheetData("Inventory", sheetId);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-foreground">Inventory Management</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Track stock levels, alerts, and reorder needs</p>
      </div>
      <InventorySection data={inventoryItems} />
    </div>
  );
};

export default DashboardInventory;
