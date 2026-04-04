import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";
import { foodCostData } from "./dashboardData";

export function FoodCostChart() {
  return (
    <Card className="border-border/40">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold flex items-center gap-2">
          <ShoppingCart size={16} className="text-primary" />
          Food Cost vs Target
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {foodCostData.map((d) => (
            <div key={d.month} className="flex items-center gap-3">
              <span className="text-[11px] font-medium text-muted-foreground w-8">{d.month}</span>
              <div className="flex-1 h-6 bg-muted/50 rounded-full overflow-hidden relative">
                <div
                  className={`h-full rounded-full transition-all ${d.actual <= d.target ? "bg-accent/70" : "bg-destructive/70"}`}
                  style={{ width: `${(d.actual / 40) * 100}%` }}
                />
                <div
                  className="absolute top-0 h-full w-0.5 bg-foreground/30"
                  style={{ left: `${(d.target / 40) * 100}%` }}
                />
              </div>
              <span className="text-[11px] font-semibold text-foreground w-10 text-right">{d.actual}%</span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-4 mt-3 pt-3 border-t border-border/30">
          <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
            <div className="w-2.5 h-2.5 rounded-sm bg-accent/70" /> At/Below Target
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
            <div className="w-2.5 h-2.5 rounded-sm bg-destructive/70" /> Above Target
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
            <div className="w-0.5 h-2.5 bg-foreground/30" /> 30% Target
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
