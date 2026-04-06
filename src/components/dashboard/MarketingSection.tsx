import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Megaphone, ArrowUpRight, ArrowDownRight } from "lucide-react";

interface MarketingChannel {
  channel: string; spend: string; leads: number; bookings: number; cac: string; roi: string; trend: string;
}

export function MarketingSection({ data }: { data: MarketingChannel[] }) {
  return (
    <Card className="border-border/40">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold flex items-center gap-2">
          <Megaphone size={16} className="text-primary" />
          Marketing Channel Performance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left py-2.5 text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Channel</th>
                <th className="text-right py-2.5 text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Spend</th>
                <th className="text-right py-2.5 text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Leads</th>
                <th className="text-right py-2.5 text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Bookings</th>
                <th className="text-right py-2.5 text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">CAC</th>
                <th className="text-right py-2.5 text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">ROI</th>
                <th className="text-right py-2.5 text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Trend</th>
              </tr>
            </thead>
            <tbody>
              {data.map((ch) => (
                <tr key={ch.channel} className="border-b border-border/20 last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="py-3 font-medium text-foreground">{ch.channel}</td>
                  <td className="py-3 text-right text-muted-foreground">{ch.spend}</td>
                  <td className="py-3 text-right text-muted-foreground">{ch.leads}</td>
                  <td className="py-3 text-right font-medium text-foreground">{ch.bookings}</td>
                  <td className="py-3 text-right text-muted-foreground">{ch.cac}</td>
                  <td className="py-3 text-right font-semibold text-accent">{ch.roi}</td>
                  <td className="py-3 text-right">
                    {ch.trend === "up" ? (
                      <ArrowUpRight size={14} className="inline text-accent" />
                    ) : (
                      <ArrowDownRight size={14} className="inline text-destructive" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
