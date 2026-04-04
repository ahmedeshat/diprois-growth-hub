import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, DollarSign, ChefHat, Megaphone, Trash2 } from "lucide-react";
import { aiInsights } from "./dashboardData";

const typeIcons: Record<string, any> = {
  cost: DollarSign,
  menu: ChefHat,
  marketing: Megaphone,
  waste: Trash2,
};

const priorityConfig: Record<string, { variant: "default" | "destructive" | "secondary" | "outline" }> = {
  high: { variant: "destructive" },
  medium: { variant: "default" },
  low: { variant: "secondary" },
};

export function AIInsights() {
  return (
    <Card className="border-border/40 bg-primary/[0.02]">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold flex items-center gap-2">
          <div className="h-6 w-6 rounded-md bg-accent/10 flex items-center justify-center">
            <Lightbulb size={14} className="text-accent" />
          </div>
          AI-Powered Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {aiInsights.map((insight, i) => {
            const Icon = typeIcons[insight.type];
            return (
              <div key={i} className="flex gap-3 p-3 rounded-lg bg-card border border-border/30 hover:border-border/60 transition-colors">
                <div className="h-8 w-8 rounded-lg bg-muted/80 flex items-center justify-center shrink-0 mt-0.5">
                  <Icon size={14} className="text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-medium text-foreground truncate">{insight.title}</p>
                    <Badge variant={priorityConfig[insight.priority].variant} className="text-[8px] h-4 px-1.5 shrink-0">
                      {insight.priority}
                    </Badge>
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">{insight.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
