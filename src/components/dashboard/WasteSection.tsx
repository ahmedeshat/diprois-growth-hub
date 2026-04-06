import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, TrendingDown, TrendingUp } from "lucide-react";

interface WasteItem { week: string; cost: number; pct: number; }
interface WasteCategoryItem { category: string; cost: number; pct: number; }
interface WastedIngredientItem { name: string; cost: string; trend: string; }

interface WasteSectionProps {
  wasteData: WasteItem[];
  wasteCategoryData: WasteCategoryItem[];
  topWastedIngredients: WastedIngredientItem[];
}

export function WasteSection({ wasteData, wasteCategoryData, topWastedIngredients }: WasteSectionProps) {
  const totalWaste = wasteData.reduce((sum, w) => sum + w.cost, 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <Card className="border-border/40">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <Trash2 size={16} className="text-destructive/70" />
            Waste Trend
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground mb-1">€{totalWaste.toLocaleString()}</div>
          <p className="text-[10px] text-muted-foreground mb-4">Total waste cost this month</p>
          <div className="space-y-2">
            {wasteData.map((w) => (
              <div key={w.week} className="flex items-center gap-2">
                <span className="text-[10px] text-muted-foreground w-6">{w.week}</span>
                <div className="flex-1 h-5 bg-muted/50 rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-destructive/40" style={{ width: `${(w.cost / 450) * 100}%` }} />
                </div>
                <span className="text-[10px] font-semibold w-8 text-right">€{w.cost}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/40">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold">By Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {wasteCategoryData.map((c) => (
              <div key={c.category}>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="font-medium text-foreground">{c.category}</span>
                  <span className="text-muted-foreground">€{c.cost} ({c.pct}%)</span>
                </div>
                <div className="h-2 bg-muted/50 rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-primary/50" style={{ width: `${c.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/40">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold">Most Wasted Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {topWastedIngredients.map((item, i) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="text-[10px] text-muted-foreground font-mono w-4">{i + 1}</span>
                  <span className="text-sm font-medium text-foreground">{item.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-foreground">{item.cost}</span>
                  {item.trend === "down" ? (
                    <TrendingDown size={12} className="text-accent" />
                  ) : (
                    <TrendingUp size={12} className="text-destructive" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
