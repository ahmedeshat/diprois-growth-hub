import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, ArrowUpRight, DollarSign, ShoppingCart, Utensils, AlertTriangle, Star, Leaf, Users, Package, ChefHat } from "lucide-react";

function AnimatedCounter({ value, prefix = "", suffix = "", delay = 0 }: { value: number; prefix?: string; suffix?: string; delay?: number }) {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay }}
    >
      {prefix}{value}{suffix}
    </motion.span>
  );
}

function KPICard({ icon: Icon, label, value, change, up, delay }: { icon: any; label: string; value: string; change: string; up: boolean; delay: number }) {
  return (
    <motion.div
      className="rounded-xl bg-card border border-border/50 p-3 space-y-1.5"
      initial={{ opacity: 0, y: 15, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.4, type: "spring", stiffness: 150 }}
    >
      <div className="flex items-center justify-between">
        <span className="text-[10px] text-muted-foreground font-medium">{label}</span>
        <Icon size={12} className="text-muted-foreground/60" />
      </div>
      <p className="text-base font-bold text-foreground leading-none">{value}</p>
      <div className={`flex items-center gap-0.5 text-[10px] font-semibold ${up ? "text-accent" : "text-destructive"}`}>
        {up ? <ArrowUpRight size={10} /> : <TrendingDown size={10} />}
        {change}
      </div>
    </motion.div>
  );
}

function MiniBarChart() {
  const data = [
    { day: "M", value: 52, color: "bg-accent/60" },
    { day: "T", value: 48, color: "bg-accent/50" },
    { day: "W", value: 61, color: "bg-accent/60" },
    { day: "T", value: 59, color: "bg-accent/55" },
    { day: "F", value: 84, color: "bg-accent/80" },
    { day: "S", value: 92, color: "bg-accent" },
    { day: "S", value: 78, color: "bg-accent/70" },
  ];
  return (
    <div className="flex items-end gap-1.5 h-20 px-1">
      {data.map((d, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1">
          <motion.div
            className={`w-full rounded-t-md ${d.color} relative group cursor-pointer`}
            initial={{ height: 0 }}
            animate={{ height: `${(d.value / 92) * 60}px` }}
            transition={{ delay: 0.4 + i * 0.08, duration: 0.6, ease: "backOut" }}
            whileHover={{ scaleY: 1.1 }}
            style={{ transformOrigin: "bottom" }}
          >
            <motion.span
              className="absolute -top-4 left-1/2 -translate-x-1/2 text-[8px] font-bold text-accent opacity-0 group-hover:opacity-100 transition-opacity"
            >
              €{(d.value / 10).toFixed(1)}k
            </motion.span>
          </motion.div>
          <span className="text-[8px] text-muted-foreground font-medium">{d.day}</span>
        </div>
      ))}
    </div>
  );
}

function TrendLine() {
  return (
    <motion.svg viewBox="0 0 300 50" className="w-full h-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
      <defs>
        <linearGradient id="trendGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(160 84% 39%)" stopOpacity="0.3" />
          <stop offset="100%" stopColor="hsl(160 84% 39%)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path
        d="M 0 40 Q 30 35, 60 30 T 120 22 T 180 18 T 240 10 T 300 5"
        fill="none"
        stroke="hsl(160 84% 39%)"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 1.1, duration: 1.5, ease: "easeInOut" }}
      />
      <motion.path
        d="M 0 40 Q 30 35, 60 30 T 120 22 T 180 18 T 240 10 T 300 5 L 300 50 L 0 50 Z"
        fill="url(#trendGrad)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      />
    </motion.svg>
  );
}

function DishRow({ name, orders, revenue, margin, trend, delay }: { name: string; orders: string; revenue: string; margin: string; trend: "up" | "down"; delay: number }) {
  return (
    <motion.div
      className="flex items-center justify-between py-1.5 border-b border-border/20 last:border-0"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.3 }}
    >
      <span className="text-[11px] font-medium text-foreground flex-1">{name}</span>
      <span className="text-[10px] text-muted-foreground w-10 text-right">{orders}</span>
      <span className="text-[10px] font-semibold text-foreground w-14 text-right">{revenue}</span>
      <span className="text-[10px] font-bold text-accent w-10 text-right">{margin}</span>
      <div className="w-6 flex justify-end">
        {trend === "up" ? <TrendingUp size={10} className="text-accent" /> : <TrendingDown size={10} className="text-destructive" />}
      </div>
    </motion.div>
  );
}

function InventoryItem({ name, status, qty, critical, delay }: { name: string; status: string; qty: string; critical: boolean; delay: number }) {
  return (
    <motion.div
      className={`flex items-center justify-between py-1.5 px-2 rounded-lg ${critical ? "bg-destructive/5" : "bg-card"}`}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <div className="flex items-center gap-2">
        <motion.div
          className={`w-1.5 h-1.5 rounded-full ${critical ? "bg-destructive" : "bg-amber-400"}`}
          animate={critical ? { scale: [1, 1.4, 1] } : {}}
          transition={{ duration: 1.2, repeat: Infinity }}
        />
        <div>
          <p className="text-[10px] font-medium text-foreground">{name}</p>
          <p className={`text-[8px] font-medium ${critical ? "text-destructive" : "text-amber-500"}`}>{status} · {qty}</p>
        </div>
      </div>
      <motion.span
        className="text-[8px] px-1.5 py-0.5 rounded bg-accent/10 text-accent font-semibold cursor-pointer"
        whileHover={{ scale: 1.05 }}
      >
        Reorder
      </motion.span>
    </motion.div>
  );
}

function InsightCard({ icon: Icon, title, text, color, delay }: { icon: any; title: string; text: string; color: string; delay: number }) {
  return (
    <motion.div
      className="flex items-start gap-2 p-2.5 rounded-lg bg-card border border-border/30"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <Icon size={14} className={`${color} mt-0.5 flex-shrink-0`} />
      <div>
        <p className="text-[10px] font-semibold text-foreground">{title}</p>
        <p className="text-[9px] text-muted-foreground leading-relaxed mt-0.5">{text}</p>
      </div>
    </motion.div>
  );
}

// Step 0: Full Analytics Dashboard
function AnalyticsDashboard() {
  return (
    <div className="space-y-3">
      {/* KPI row */}
      <div className="grid grid-cols-4 gap-2">
        <KPICard icon={DollarSign} label="Revenue" value="€42.5k" change="+12.3%" up={true} delay={0.1} />
        <KPICard icon={ShoppingCart} label="Food Cost" value="28.4%" change="-2.1%" up={true} delay={0.2} />
        <KPICard icon={Utensils} label="Avg Ticket" value="€38.50" change="+5.7%" up={true} delay={0.3} />
        <KPICard icon={AlertTriangle} label="Waste" value="€1.2k" change="-18.2%" up={true} delay={0.4} />
      </div>

      {/* Chart + sidebar */}
      <div className="grid grid-cols-3 gap-2">
        <div className="col-span-2 rounded-xl bg-card border border-border/50 p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-semibold text-foreground">Weekly Revenue</span>
            <motion.span
              className="text-[9px] px-1.5 py-0.5 rounded bg-accent/10 text-accent font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              +12% vs last week
            </motion.span>
          </div>
          <MiniBarChart />
          <TrendLine />
        </div>

        <div className="rounded-xl bg-card border border-border/50 p-3 space-y-1.5">
          <span className="text-[10px] font-semibold text-foreground flex items-center gap-1">
            <Package size={10} /> Alerts
          </span>
          <InventoryItem name="Salmon" status="Low" qty="2.5kg" critical={false} delay={0.5} />
          <InventoryItem name="Truffle Oil" status="Critical" qty="0.3L" critical={true} delay={0.6} />
          <InventoryItem name="Basil" status="Low" qty="150g" critical={false} delay={0.7} />
        </div>
      </div>

      {/* AI Insights row */}
      <div className="grid grid-cols-3 gap-2">
        <InsightCard icon={Leaf} title="Waste Down 18%" text="Smaller lunch batches recommended" color="text-accent" delay={0.9} />
        <InsightCard icon={Star} title="Menu Opportunity" text="Caesar Salad: 82% margin — promote it" color="text-primary" delay={1.0} />
        <InsightCard icon={Users} title="Peak Days" text="Fri & Sat = 36% of weekly revenue" color="text-amber-500" delay={1.1} />
      </div>
    </div>
  );
}

// Step 1: Inventory
function InventoryDashboard() {
  const items = [
    { name: "Fresh Salmon", status: "Low Stock", qty: "2.5 kg", critical: false },
    { name: "Truffle Oil", status: "Critical", qty: "0.3 L", critical: true },
    { name: "Parmesan Cheese", status: "Expiring Soon", qty: "4 kg", critical: false },
    { name: "Fresh Basil", status: "Low Stock", qty: "150g", critical: false },
    { name: "Olive Oil (EV)", status: "Adequate", qty: "5 L", critical: false },
  ];
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-2">
        <KPICard icon={Package} label="Total Items" value="142" change="5 alerts" up={false} delay={0.1} />
        <KPICard icon={ShoppingCart} label="Pending Orders" value="3" change="Auto-reorder" up={true} delay={0.2} />
        <KPICard icon={DollarSign} label="Stock Value" value="€8.4k" change="-4.2%" up={true} delay={0.3} />
      </div>
      <div className="rounded-xl bg-card border border-border/50 p-3 space-y-1.5">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] font-semibold text-foreground">Inventory Alerts</span>
          <motion.span className="text-[8px] text-accent font-medium" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            AI monitoring active
          </motion.span>
        </div>
        {items.map((item, i) => (
          <InventoryItem key={item.name} {...item} delay={0.3 + i * 0.1} />
        ))}
      </div>
      <motion.div className="rounded-xl bg-card border border-border/50 p-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>
        <div className="flex justify-between text-[10px] text-muted-foreground mb-1.5">
          <span className="font-medium">Auto-Reorder Queue</span>
          <span>3 items processing</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <motion.div className="h-full bg-accent rounded-full" initial={{ width: "0%" }} animate={{ width: "72%" }} transition={{ delay: 1, duration: 1.2, ease: "easeOut" }} />
        </div>
      </motion.div>
    </div>
  );
}

// Step 2: Menu Engineering
function MenuDashboard() {
  const dishes = [
    { name: "Caesar Salad", orders: "412", revenue: "€4,944", margin: "82%", trend: "up" as const },
    { name: "Grilled Sea Bass", orders: "342", revenue: "€8,208", margin: "72%", trend: "up" as const },
    { name: "Truffle Risotto", orders: "289", revenue: "€7,514", margin: "68%", trend: "up" as const },
    { name: "Beef Wellington", orders: "198", revenue: "€7,920", margin: "61%", trend: "down" as const },
    { name: "Chocolate Fondant", orders: "267", revenue: "€3,204", margin: "75%", trend: "up" as const },
  ];
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-2">
        <KPICard icon={ChefHat} label="Menu Items" value="24" change="5 stars" up={true} delay={0.1} />
        <KPICard icon={DollarSign} label="Avg Margin" value="71.6%" change="+3.2%" up={true} delay={0.2} />
        <KPICard icon={TrendingUp} label="Best Seller" value="Salad" change="412 orders" up={true} delay={0.3} />
      </div>
      <div className="rounded-xl bg-card border border-border/50 p-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-semibold text-foreground">Top Performing Items</span>
          <div className="flex gap-3 text-[8px] text-muted-foreground font-medium">
            <span className="w-10 text-right">Orders</span>
            <span className="w-14 text-right">Revenue</span>
            <span className="w-10 text-right">Margin</span>
            <span className="w-6" />
          </div>
        </div>
        {dishes.map((d, i) => (
          <DishRow key={d.name} {...d} delay={0.4 + i * 0.1} />
        ))}
      </div>
      <InsightCard icon={Star} title="AI Recommendation" text="Promote Caesar Salad as featured item — highest margin at 82% with strong demand." color="text-accent" delay={1} />
    </div>
  );
}

// Step 3: Waste Tracking
function WasteDashboard() {
  const weeklyWaste = [85, 78, 70, 62, 55, 48, 42];
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-2">
        <KPICard icon={Leaf} label="This Week" value="€320" change="-22%" up={true} delay={0.1} />
        <KPICard icon={AlertTriangle} label="Last Week" value="€410" change="Baseline" up={false} delay={0.2} />
        <KPICard icon={DollarSign} label="Monthly Saved" value="€1,180" change="+€90" up={true} delay={0.3} />
      </div>
      <div className="rounded-xl bg-card border border-border/50 p-3">
        <span className="text-[10px] font-semibold text-foreground mb-2 block">Waste Trend (7 weeks)</span>
        <div className="flex items-end gap-1.5 h-16 px-1">
          {weeklyWaste.map((h, i) => (
            <motion.div
              key={i}
              className="flex-1 rounded-t-md"
              style={{ background: `hsl(${150 + i * 4} ${70 + i * 2}% ${35 + i * 4}%)` }}
              initial={{ height: 0 }}
              animate={{ height: `${h}%` }}
              transition={{ delay: 0.4 + i * 0.08, duration: 0.6, ease: "backOut" }}
            />
          ))}
        </div>
        <motion.div className="flex items-center justify-center gap-1 mt-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
          <TrendingDown size={10} className="text-accent" />
          <span className="text-[9px] text-accent font-semibold">Consistent reduction — great progress!</span>
        </motion.div>
      </div>
      <InsightCard icon={Leaf} title="AI Tip" text="Switch to smaller lunch prep batches to reduce weekday waste by ~22%." color="text-accent" delay={1} />
    </div>
  );
}

// Step 4: Marketing
function MarketingDashboard() {
  const campaigns = [
    { name: "Weekend Brunch Promo", roi: "+340%", reach: "2.4k", status: "Active" },
    { name: "Loyalty Rewards Email", roi: "+180%", reach: "1.8k", status: "Active" },
    { name: "New Menu Launch", roi: "+260%", reach: "3.1k", status: "Completed" },
  ];
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-2">
        <KPICard icon={Users} label="Customers" value="1,847" change="+8.3%" up={true} delay={0.1} />
        <KPICard icon={TrendingUp} label="Retention" value="74%" change="+12%" up={true} delay={0.2} />
        <KPICard icon={DollarSign} label="Campaign ROI" value="+260%" change="Avg" up={true} delay={0.3} />
      </div>
      <div className="rounded-xl bg-card border border-border/50 p-3 space-y-2">
        <span className="text-[10px] font-semibold text-foreground">Active Campaigns</span>
        {campaigns.map((c, i) => (
          <motion.div
            key={c.name}
            className="flex items-center justify-between py-1.5 border-b border-border/20 last:border-0"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + i * 0.1 }}
          >
            <div>
              <p className="text-[10px] font-medium text-foreground">{c.name}</p>
              <p className="text-[8px] text-muted-foreground">{c.reach} reached</p>
            </div>
            <div className="flex items-center gap-2">
              <motion.span
                className="text-[10px] font-bold text-accent"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6 + i * 0.15, type: "spring" }}
              >
                {c.roi}
              </motion.span>
            </div>
          </motion.div>
        ))}
      </div>
      {/* Retention ring */}
      <motion.div className="flex items-center justify-center gap-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>
        <div className="relative w-14 h-14">
          <svg viewBox="0 0 36 36" className="w-14 h-14 -rotate-90">
            <circle cx="18" cy="18" r="15.9" fill="none" stroke="hsl(var(--muted))" strokeWidth="2.5" />
            <motion.circle
              cx="18" cy="18" r="15.9" fill="none" stroke="hsl(var(--accent))" strokeWidth="2.5"
              strokeDasharray="100" strokeLinecap="round"
              initial={{ strokeDashoffset: 100 }}
              animate={{ strokeDashoffset: 26 }}
              transition={{ delay: 1, duration: 1.5, ease: "easeOut" }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[10px] font-bold text-foreground">74%</span>
          </div>
        </div>
        <div>
          <p className="text-[10px] font-semibold text-foreground">Customer Retention</p>
          <p className="text-[8px] text-muted-foreground">+12% vs last quarter</p>
        </div>
      </motion.div>
    </div>
  );
}

// Step 5: Expert Support
function SupportDashboard() {
  return (
    <div className="space-y-3">
      <motion.div
        className="rounded-xl bg-card border border-border/50 p-3 flex items-start gap-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        <motion.div
          className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Users size={14} className="text-primary" />
        </motion.div>
        <div>
          <p className="text-[10px] font-semibold text-foreground">Expert Consultation Available</p>
          <p className="text-[9px] text-muted-foreground mt-0.5 leading-relaxed">Schedule a 1-on-1 session with a restaurant growth specialist who reviews your data and provides tailored strategies.</p>
        </div>
      </motion.div>
      <div className="grid grid-cols-3 gap-2">
        {["Mon 10am", "Wed 2pm", "Fri 11am"].map((slot, i) => (
          <motion.div
            key={slot}
            className="text-center py-2.5 rounded-xl border border-accent/20 bg-accent/5 text-[10px] font-semibold text-accent cursor-pointer"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05, borderColor: "hsl(160 84% 39%)" }}
            transition={{ delay: 0.3 + i * 0.1 }}
          >
            {slot}
          </motion.div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2">
        <InsightCard icon={Star} title="Growth Plan" text="Custom action plan based on your restaurant's data and goals." color="text-primary" delay={0.6} />
        <InsightCard icon={TrendingUp} title="2.3x Faster" text="Restaurants with advisory support grow 2.3x faster on average." color="text-accent" delay={0.7} />
      </div>
      <motion.div
        className="rounded-xl bg-accent/10 border border-accent/20 p-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
      >
        <p className="text-[10px] text-accent font-semibold">🎯 Next session: Optimize your weekend menu pricing for 15-20% margin improvement</p>
      </motion.div>
    </div>
  );
}

export function DemoMockup({ step }: { step: number }) {
  switch (step) {
    case 0: return <AnalyticsDashboard />;
    case 1: return <InventoryDashboard />;
    case 2: return <MenuDashboard />;
    case 3: return <WasteDashboard />;
    case 4: return <MarketingDashboard />;
    case 5: return <SupportDashboard />;
    default: return null;
  }
}
