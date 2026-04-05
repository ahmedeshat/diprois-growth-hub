import { MarketingSection } from "@/components/dashboard/MarketingSection";

const DashboardMarketing = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-xl font-bold text-foreground">Marketing Performance</h1>
      <p className="text-sm text-muted-foreground mt-0.5">Analyze campaign performance and optimize spend</p>
    </div>
    <MarketingSection />
  </div>
);

export default DashboardMarketing;
