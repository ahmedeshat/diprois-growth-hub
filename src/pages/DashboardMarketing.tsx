import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Megaphone, ArrowUpRight, ArrowDownRight, TrendingUp, Users,
  Target, DollarSign, BarChart3, Mail, Instagram, Facebook, Globe, Star
} from "lucide-react";
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Area, AreaChart
} from "recharts";
import { marketingChannels } from "@/components/dashboard/dashboardData";

const monthlySpendData = [
  { month: "Jan", spend: 2200, leads: 580, bookings: 145 },
  { month: "Feb", spend: 2400, leads: 620, bookings: 158 },
  { month: "Mar", spend: 2600, leads: 710, bookings: 178 },
  { month: "Apr", spend: 2500, leads: 680, bookings: 168 },
  { month: "May", spend: 2800, leads: 820, bookings: 205 },
  { month: "Jun", spend: 2950, leads: 945, bookings: 235 },
];

const conversionFunnel = [
  { stage: "Impressions", value: 48200 },
  { stage: "Clicks", value: 6840 },
  { stage: "Leads", value: 945 },
  { stage: "Bookings", value: 235 },
  { stage: "Repeat Customers", value: 82 },
];

const channelBreakdown = [
  { name: "Instagram", value: 36, color: "hsl(var(--primary))" },
  { name: "Google", value: 22, color: "hsl(var(--accent))" },
  { name: "Email", value: 16, color: "hsl(var(--chart-3))" },
  { name: "Facebook", value: 14, color: "hsl(var(--chart-4))" },
  { name: "TripAdvisor", value: 12, color: "hsl(var(--chart-5))" },
];

const campaignData = [
  { name: "Summer Menu Launch", channel: "Instagram", status: "active", spend: "€480", leads: 142, bookings: 38, roi: "6.1x", trend: "up" },
  { name: "Weekend Brunch Promo", channel: "Facebook", status: "active", spend: "€220", leads: 86, bookings: 18, roi: "3.2x", trend: "up" },
  { name: "Email: Loyalty Rewards", channel: "Email", status: "active", spend: "€45", leads: 68, bookings: 24, roi: "12.4x", trend: "up" },
  { name: "Google Local Search", channel: "Google", status: "active", spend: "€380", leads: 98, bookings: 26, roi: "4.5x", trend: "up" },
  { name: "TripAdvisor Feature", channel: "TripAdvisor", status: "paused", spend: "€120", leads: 42, bookings: 12, roi: "2.8x", trend: "down" },
  { name: "Spring Tasting Event", channel: "Instagram", status: "completed", spend: "€350", leads: 210, bookings: 52, roi: "7.8x", trend: "up" },
];

const kpis = [
  { title: "Total Spend (MTD)", value: "€2,950", change: "+5.4%", up: true, icon: DollarSign },
  { title: "Total Leads", value: "945", change: "+15.2%", up: true, icon: Users },
  { title: "Bookings", value: "235", change: "+14.6%", up: true, icon: Target },
  { title: "Avg. CAC", value: "€12.55", change: "-8.3%", up: true, icon: TrendingUp },
  { title: "Conversion Rate", value: "24.9%", change: "+2.1%", up: true, icon: BarChart3 },
  { title: "Overall ROI", value: "4.8x", change: "+0.6x", up: true, icon: Star },
];

const channelIcons: Record<string, any> = {
  Instagram: Instagram,
  Facebook: Facebook,
  Google: Globe,
  Email: Mail,
  TripAdvisor: Star,
};

const statusStyles: Record<string, { label: string; variant: "default" | "secondary" | "outline" }> = {
  active: { label: "Active", variant: "default" },
  paused: { label: "Paused", variant: "secondary" },
  completed: { label: "Completed", variant: "outline" },
};

const DashboardMarketing = () => (
  <div className="space-y-6">
    {/* Header */}
    <div>
      <h1 className="text-xl font-bold text-foreground">Marketing Performance</h1>
      <p className="text-sm text-muted-foreground mt-0.5">
        Analyze campaign performance, track ROI, and optimize your marketing budget
      </p>
    </div>

    {/* KPI Row */}
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
      {kpis.map((kpi) => (
        <Card key={kpi.title} className="border-border/40">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <kpi.icon size={14} className="text-muted-foreground" />
              <span className={`text-[10px] font-medium flex items-center gap-0.5 ${kpi.up ? "text-accent" : "text-destructive"}`}>
                {kpi.up ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                {kpi.change}
              </span>
            </div>
            <p className="text-lg font-bold text-foreground">{kpi.value}</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">{kpi.title}</p>
          </CardContent>
        </Card>
      ))}
    </div>

    {/* Charts Row */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Spend & Leads Trend */}
      <Card className="lg:col-span-2 border-border/40">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <TrendingUp size={16} className="text-primary" />
            Spend, Leads & Bookings Trend
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlySpendData}>
                <defs>
                  <linearGradient id="spendGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "12px" }} />
                <Legend iconSize={8} wrapperStyle={{ fontSize: "11px" }} />
                <Area type="monotone" dataKey="spend" stroke="hsl(var(--primary))" fill="url(#spendGrad)" strokeWidth={2} name="Spend (€)" />
                <Line type="monotone" dataKey="leads" stroke="hsl(var(--accent))" strokeWidth={2} dot={{ r: 3 }} name="Leads" />
                <Line type="monotone" dataKey="bookings" stroke="hsl(var(--chart-3))" strokeWidth={2} dot={{ r: 3 }} name="Bookings" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Budget Allocation Pie */}
      <Card className="border-border/40">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <DollarSign size={16} className="text-primary" />
            Budget Allocation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[260px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={channelBreakdown} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value">
                  {channelBreakdown.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "12px" }} formatter={(value: number) => `${value}%`} />
                <Legend iconSize={8} wrapperStyle={{ fontSize: "11px" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>

    {/* Conversion Funnel */}
    <Card className="border-border/40">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold flex items-center gap-2">
          <Target size={16} className="text-primary" />
          Conversion Funnel
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between gap-2">
          {conversionFunnel.map((stage, i) => {
            const widthPct = (stage.value / conversionFunnel[0].value) * 100;
            const convRate = i > 0 ? ((stage.value / conversionFunnel[i - 1].value) * 100).toFixed(1) : null;
            return (
              <div key={stage.stage} className="flex-1 text-center">
                <div className="relative mx-auto mb-2" style={{ width: `${Math.max(widthPct, 20)}%`, minWidth: "40px" }}>
                  <div className="h-12 rounded-lg bg-primary/15 flex items-center justify-center border border-primary/20">
                    <span className="text-sm font-bold text-foreground">{stage.value.toLocaleString()}</span>
                  </div>
                </div>
                <p className="text-[10px] font-medium text-foreground">{stage.stage}</p>
                {convRate && (
                  <p className="text-[9px] text-muted-foreground mt-0.5">{convRate}% conv.</p>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>

    {/* Channel Performance Table */}
    <Card className="border-border/40">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold flex items-center gap-2">
          <Megaphone size={16} className="text-primary" />
          Channel Performance
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
              {marketingChannels.map((ch) => (
                <tr key={ch.channel} className="border-b border-border/20 last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="py-3 font-medium text-foreground flex items-center gap-2">
                    {(() => { const Icon = channelIcons[ch.channel.split(" ")[0]] || Megaphone; return <Icon size={14} className="text-muted-foreground" />; })()}
                    {ch.channel}
                  </td>
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

    {/* Active Campaigns */}
    <Card className="border-border/40">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold flex items-center gap-2">
          <BarChart3 size={16} className="text-primary" />
          Campaign Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left py-2.5 text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Campaign</th>
                <th className="text-left py-2.5 text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Channel</th>
                <th className="text-center py-2.5 text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Status</th>
                <th className="text-right py-2.5 text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Spend</th>
                <th className="text-right py-2.5 text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Leads</th>
                <th className="text-right py-2.5 text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Bookings</th>
                <th className="text-right py-2.5 text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">ROI</th>
              </tr>
            </thead>
            <tbody>
              {campaignData.map((c) => {
                const st = statusStyles[c.status];
                return (
                  <tr key={c.name} className="border-b border-border/20 last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="py-3 font-medium text-foreground">{c.name}</td>
                    <td className="py-3 text-muted-foreground">{c.channel}</td>
                    <td className="py-3 text-center">
                      <Badge variant={st.variant} className="text-[9px] h-4 px-1.5">{st.label}</Badge>
                    </td>
                    <td className="py-3 text-right text-muted-foreground">{c.spend}</td>
                    <td className="py-3 text-right text-muted-foreground">{c.leads}</td>
                    <td className="py-3 text-right font-medium text-foreground">{c.bookings}</td>
                    <td className="py-3 text-right font-semibold text-accent">{c.roi}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>

    {/* Recommendations */}
    <Card className="border-border/40 border-l-4 border-l-primary">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold flex items-center gap-2">
          💡 Marketing Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { title: "Shift budget from Facebook to Email", desc: "Facebook CAC is 33% higher than average. Reallocating €300/mo to Email could generate 76 additional bookings at lower cost.", priority: "high" },
            { title: "Scale Instagram Summer Campaign", desc: "6.1x ROI — best performing active campaign. Consider increasing spend by 40% to capture peak season demand.", priority: "high" },
            { title: "Pause TripAdvisor Feature", desc: "Lowest ROI at 2.8x with declining trend. Reallocate to Google Local Search which shows stronger booking conversion.", priority: "medium" },
            { title: "Launch Repeat Customer Campaign", desc: "82 repeat customers from marketing — create a loyalty email sequence to increase retention rate by estimated 18%.", priority: "medium" },
          ].map((rec) => (
            <div key={rec.title} className="p-3 rounded-lg bg-muted/30 border border-border/30">
              <div className="flex items-start justify-between gap-2 mb-1">
                <p className="text-xs font-semibold text-foreground">{rec.title}</p>
                <Badge variant={rec.priority === "high" ? "destructive" : "secondary"} className="text-[8px] h-3.5 px-1 shrink-0">
                  {rec.priority}
                </Badge>
              </div>
              <p className="text-[11px] text-muted-foreground leading-relaxed">{rec.desc}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  </div>
);

export default DashboardMarketing;
