import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Package } from "lucide-react";
import { inventoryItems } from "./dashboardData";

const statusConfig: Record<string, { label: string; variant: "default" | "destructive" | "secondary" | "outline" }> = {
  critical: { label: "Critical", variant: "destructive" },
  low: { label: "Low Stock", variant: "default" },
  expiring: { label: "Expiring", variant: "secondary" },
  ok: { label: "In Stock", variant: "outline" },
  overstock: { label: "Overstock", variant: "secondary" },
};

export function InventorySection() {
  return (
    <Card className="border-border/40">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold flex items-center gap-2">
          <Package size={16} className="text-primary" />
          Inventory Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2.5">
          {inventoryItems.map((item) => {
            const status = statusConfig[item.status];
            return (
              <div key={item.name} className="flex items-center justify-between py-2.5 border-b border-border/20 last:border-0">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-foreground">{item.name}</p>
                    <Badge variant={status.variant} className="text-[9px] h-4 px-1.5">
                      {status.label}
                    </Badge>
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    {item.category} · {item.stock} · {item.cost}
                  </p>
                </div>
                {item.reorder && (
                  <Button size="sm" variant="outline" className="text-[10px] h-6 px-2.5 shrink-0">
                    Reorder
                  </Button>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
