import { Card, CardContent } from "@/components/ui/card";
import {
  DollarSign, ShoppingCart, Trash2, Package,
  AlertTriangle, Target, ShoppingBag, TrendingUp,
  ArrowUpRight, ArrowDownRight
} from "lucide-react";

const icons = [DollarSign, ShoppingCart, Trash2, Package, AlertTriangle, Target, ShoppingBag, TrendingUp];

interface KPIItem {
  title: string;
  value: string;
  change: string;
  up: boolean;
  subtitle: string;
}

export function KPICards({ data }: { data: KPIItem[] }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {data.map((kpi, i) => {
        const Icon = icons[i % icons.length];
        return (
          <Card key={kpi.title} className="border-border/40 hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{kpi.title}</span>
                <div className="h-8 w-8 rounded-lg bg-primary/5 flex items-center justify-center">
                  <Icon size={15} className="text-primary" />
                </div>
              </div>
              <div className="text-2xl font-bold text-foreground tracking-tight">{kpi.value}</div>
              <div className="flex items-center justify-between mt-2">
                <div className={`flex items-center gap-1 text-xs font-semibold ${kpi.up ? "text-accent" : "text-destructive"}`}>
                  {kpi.up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                  {kpi.change}
                </div>
                <span className="text-[10px] text-muted-foreground">{kpi.subtitle}</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
