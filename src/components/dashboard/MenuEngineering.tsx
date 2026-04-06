import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChefHat } from "lucide-react";

const quadrantLabel = (pop: string, prof: string) => {
  if (pop === "high" && prof === "high") return { label: "⭐ Star", color: "bg-accent/10 text-accent" };
  if (pop === "high" && (prof === "medium" || prof === "low")) return { label: "🐴 Workhorse", color: "bg-primary/10 text-primary" };
  if (pop === "low" && prof === "high") return { label: "💎 Hidden Gem", color: "bg-sidebar-primary/10 text-sidebar-primary" };
  return { label: "⚠️ Underperformer", color: "bg-destructive/10 text-destructive" };
};

interface MenuItem {
  name: string; orders: number; revenue: string; cost: string; margin: string; popularity: string; profitability: string;
}

export function MenuEngineering({ data }: { data: MenuItem[] }) {
  return (
    <Card className="border-border/40">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold flex items-center gap-2">
          <ChefHat size={16} className="text-primary" />
          Menu Performance Matrix
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left py-2.5 text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Dish</th>
                <th className="text-right py-2.5 text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Orders</th>
                <th className="text-right py-2.5 text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Revenue</th>
                <th className="text-right py-2.5 text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Food Cost</th>
                <th className="text-right py-2.5 text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Margin</th>
                <th className="text-right py-2.5 text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Category</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => {
                const quad = quadrantLabel(item.popularity, item.profitability);
                return (
                  <tr key={item.name} className="border-b border-border/20 last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="py-3 font-medium text-foreground">{item.name}</td>
                    <td className="py-3 text-right text-muted-foreground">{item.orders}</td>
                    <td className="py-3 text-right font-medium text-foreground">{item.revenue}</td>
                    <td className="py-3 text-right text-muted-foreground">{item.cost}</td>
                    <td className="py-3 text-right font-semibold text-accent">{item.margin}</td>
                    <td className="py-3 text-right">
                      <span className={`inline-flex text-[10px] font-medium px-2 py-0.5 rounded-full ${quad.color}`}>{quad.label}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
