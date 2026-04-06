import { AIInsights } from "@/components/dashboard/AIInsights";
import { useSheetId, useSheetData } from "@/hooks/useSheetData";

const DashboardRecommendations = () => {
  const { sheetId } = useSheetId();
  const { data: aiInsights } = useSheetData("AIInsights", sheetId);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-foreground">AI Recommendations</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Smart, actionable insights powered by AI</p>
      </div>
      <AIInsights data={aiInsights} />
    </div>
  );
};

export default DashboardRecommendations;
