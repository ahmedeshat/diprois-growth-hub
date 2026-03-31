import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart3, TrendingUp, TrendingDown, DollarSign, ShoppingCart,
  Utensils, AlertTriangle, Users, LogOut, ChefHat, Leaf, Star,
  Package, ArrowUpRight, ArrowDownRight
} from "lucide-react";
import { motion } from "framer-motion";

// Sample demo data
const kpiCards = [
  { title: "Revenue (MTD)", value: "€42,580", change: "+12.3%", up: true, icon: DollarSign },
  { title: "Food Cost %", value: "28.4%", change: "-2.1%", up: true, icon: ShoppingCart },
  { title: "Avg. Ticket", value: "€38.50", change: "+5.7%", up: true, icon: Utensils },
  { title: "Waste Cost", value: "€1,230", change: "-18.2%", up: true, icon: AlertTriangle },
];

const topDishes = [
  { name: "Grilled Sea Bass", orders: 342, revenue: "€8,208", margin: "72%", trend: "up" },
  { name: "Truffle Risotto", orders: 289, revenue: "€7,514", margin: "68%", trend: "up" },
  { name: "Beef Wellington", orders: 198, revenue: "€7,920", margin: "61%", trend: "down" },
  { name: "Caesar Salad", orders: 412, revenue: "€4,944", margin: "82%", trend: "up" },
  { name: "Chocolate Fondant", orders: 267, revenue: "€3,204", margin: "75%", trend: "up" },
];

const inventoryAlerts = [
  { item: "Fresh Salmon", status: "Low Stock", qty: "2.5 kg", reorder: true },
  { item: "Truffle Oil", status: "Critical", qty: "0.3 L", reorder: true },
  { item: "Parmesan Cheese", status: "Expiring Soon", qty: "4 kg", reorder: false },
  { item: "Fresh Basil", status: "Low Stock", qty: "150g", reorder: true },
];

const revenueByDay = [
  { day: "Mon", amount: 5200 },
  { day: "Tue", amount: 4800 },
  { day: "Wed", amount: 6100 },
  { day: "Thu", amount: 5900 },
  { day: "Fri", amount: 8400 },
  { day: "Sat", amount: 9200 },
  { day: "Sun", amount: 7800 },
];

const maxRevenue = Math.max(...revenueByDay.map(d => d.amount));

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
      if (!session?.user) navigate("/auth");
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (!session?.user) navigate("/auth");
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-16">
          <div className="flex items-center gap-3">
            <a href="/" className="text-xl font-black tracking-tight text-primary">Diprois</a>
            <span className="text-xs font-medium bg-accent/10 text-accent px-2 py-0.5 rounded-full">Demo Dashboard</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden sm:block">{user.email}</span>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut size={16} className="mr-2" /> Log Out
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Welcome */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Welcome, {user.user_metadata?.full_name || "Restaurant Owner"} 👋
          </h1>
          <p className="text-muted-foreground mt-1">Here's a preview of your restaurant analytics dashboard</p>
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpiCards.map((kpi, i) => (
            <motion.div key={kpi.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Card className="border-border/50">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-muted-foreground">{kpi.title}</span>
                    <kpi.icon size={18} className="text-muted-foreground" />
                  </div>
                  <div className="text-2xl font-bold text-foreground">{kpi.value}</div>
                  <div className={`flex items-center gap-1 mt-1 text-sm font-medium ${kpi.up ? "text-accent" : "text-destructive"}`}>
                    {kpi.up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                    {kpi.change} vs last month
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Revenue chart */}
          <Card className="lg:col-span-2 border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <BarChart3 size={18} /> Weekly Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end gap-2 h-48">
                {revenueByDay.map((d, i) => (
                  <motion.div
                    key={d.day}
                    className="flex-1 flex flex-col items-center gap-2"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    style={{ transformOrigin: "bottom" }}
                  >
                    <span className="text-xs font-medium text-muted-foreground">€{(d.amount / 1000).toFixed(1)}k</span>
                    <div
                      className="w-full rounded-t-md bg-accent/80 hover:bg-accent transition-colors"
                      style={{ height: `${(d.amount / maxRevenue) * 140}px` }}
                    />
                    <span className="text-xs text-muted-foreground">{d.day}</span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Inventory alerts */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Package size={18} /> Inventory Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {inventoryAlerts.map((item) => (
                <div key={item.item} className="flex items-center justify-between py-2 border-b border-border/30 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-foreground">{item.item}</p>
                    <p className={`text-xs font-medium ${item.status === "Critical" ? "text-destructive" : "text-amber-500"}`}>
                      {item.status} • {item.qty}
                    </p>
                  </div>
                  {item.reorder && (
                    <Button size="sm" variant="outline" className="text-xs h-7">
                      Reorder
                    </Button>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Top dishes */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <ChefHat size={18} /> Top Menu Items (This Month)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 font-medium text-muted-foreground">Dish</th>
                    <th className="text-right py-3 font-medium text-muted-foreground">Orders</th>
                    <th className="text-right py-3 font-medium text-muted-foreground">Revenue</th>
                    <th className="text-right py-3 font-medium text-muted-foreground">Margin</th>
                    <th className="text-right py-3 font-medium text-muted-foreground">Trend</th>
                  </tr>
                </thead>
                <tbody>
                  {topDishes.map((dish, i) => (
                    <motion.tr
                      key={dish.name}
                      className="border-b border-border/30 last:border-0"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + i * 0.1 }}
                    >
                      <td className="py-3 font-medium text-foreground">{dish.name}</td>
                      <td className="py-3 text-right text-muted-foreground">{dish.orders}</td>
                      <td className="py-3 text-right text-foreground font-medium">{dish.revenue}</td>
                      <td className="py-3 text-right text-accent font-medium">{dish.margin}</td>
                      <td className="py-3 text-right">
                        {dish.trend === "up" ? (
                          <TrendingUp size={16} className="inline text-accent" />
                        ) : (
                          <TrendingDown size={16} className="inline text-destructive" />
                        )}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Quick insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-border/50 bg-accent/5">
            <CardContent className="p-5 flex items-start gap-3">
              <Leaf size={20} className="text-accent mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-foreground">Waste Reduction</p>
                <p className="text-xs text-muted-foreground mt-1">Your food waste decreased 18% this month. AI suggests switching to smaller prep batches for weekday lunches.</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border/50 bg-primary/5">
            <CardContent className="p-5 flex items-start gap-3">
              <Star size={20} className="text-primary mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-foreground">Menu Opportunity</p>
                <p className="text-xs text-muted-foreground mt-1">Caesar Salad has the highest margin at 82%. Consider promoting it as a featured item to boost profits.</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border/50 bg-amber-500/5">
            <CardContent className="p-5 flex items-start gap-3">
              <Users size={20} className="text-amber-500 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-foreground">Customer Insight</p>
                <p className="text-xs text-muted-foreground mt-1">Friday & Saturday account for 36% of weekly revenue. Consider adding special weekend menus.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
