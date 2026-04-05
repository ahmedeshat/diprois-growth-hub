import { WasteSection } from "@/components/dashboard/WasteSection";

const DashboardWaste = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-xl font-bold text-foreground">Waste Management</h1>
      <p className="text-sm text-muted-foreground mt-0.5">Monitor waste trends and reduce costs</p>
    </div>
    <WasteSection />
  </div>
);

export default DashboardWaste;
