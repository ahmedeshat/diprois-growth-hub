import { AIInsights } from "@/components/dashboard/AIInsights";

const DashboardRecommendations = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-xl font-bold text-foreground">AI Recommendations</h1>
      <p className="text-sm text-muted-foreground mt-0.5">Smart, actionable insights powered by AI</p>
    </div>
    <AIInsights />
  </div>
);

export default DashboardRecommendations;
