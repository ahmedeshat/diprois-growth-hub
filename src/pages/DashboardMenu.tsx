import { MenuEngineering } from "@/components/dashboard/MenuEngineering";
import { useSheetId, useSheetData } from "@/hooks/useSheetData";

const DashboardMenu = () => {
  const { sheetId } = useSheetId();
  const { data: menuItems } = useSheetData("Menu", sheetId);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-foreground">Menu Engineering</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Optimize your menu for profitability and popularity</p>
      </div>
      <MenuEngineering data={menuItems} />
    </div>
  );
};

export default DashboardMenu;
