import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, AlertCircle, AlertTriangle, Info } from "lucide-react";
import { recentAlerts } from "./dashboardData";

const alertIcons: Record<string, any> = {
  critical: AlertCircle,
  warning: AlertTriangle,
  info: Info,
};

const alertColors: Record<string, string> = {
  critical: "text-destructive bg-destructive/10",
  warning: "text-amber-500 bg-amber-500/10",
  info: "text-primary bg-primary/10",
};

export function ActivityPanel() {
  return (
    <Card className="border-border/40">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold flex items-center gap-2">
          <Bell size={16} className="text-primary" />
          Recent Alerts & Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2.5">
          {recentAlerts.map((alert, i) => {
            const Icon = alertIcons[alert.type];
            const color = alertColors[alert.type];
            return (
              <div key={i} className="flex items-start gap-3 py-2 border-b border-border/20 last:border-0">
                <div className={`h-6 w-6 rounded-md flex items-center justify-center shrink-0 mt-0.5 ${color}`}>
                  <Icon size={12} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground leading-snug">{alert.message}</p>
                  <p className="text-[10px] text-muted-foreground mt-1">{alert.time}</p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
