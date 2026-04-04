import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import { revenueData } from "./dashboardData";

const maxVal = Math.max(...revenueData.map(d => d.revenue));

export function RevenueChart() {
  return (
    <Card className="border-border/40">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold flex items-center gap-2">
          <TrendingUp size={16} className="text-accent" />
          Revenue Trend
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-end gap-3 h-44">
          {revenueData.map((d) => (
            <div key={d.month} className="flex-1 flex flex-col items-center gap-1.5">
              <span className="text-[10px] font-semibold text-foreground">€{(d.revenue / 1000).toFixed(1)}k</span>
              <div className="w-full relative">
                <div
                  className="w-full rounded-t-md bg-primary/15"
                  style={{ height: `${(d.target / maxVal) * 120}px` }}
                />
                <div
                  className="w-full rounded-t-md bg-accent/80 absolute bottom-0"
                  style={{ height: `${(d.revenue / maxVal) * 120}px` }}
                />
              </div>
              <span className="text-[10px] text-muted-foreground font-medium">{d.month}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-4 mt-3 pt-3 border-t border-border/30">
          <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
            <div className="w-2.5 h-2.5 rounded-sm bg-accent/80" /> Revenue
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
            <div className="w-2.5 h-2.5 rounded-sm bg-primary/15" /> Target
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
