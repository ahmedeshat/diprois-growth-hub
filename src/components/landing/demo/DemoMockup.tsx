import { motion } from "framer-motion";
import { Users, TrendingUp } from "lucide-react";

function MiniChart() {
  const bars = [40, 65, 50, 80, 60, 90, 75];
  return (
    <div className="flex items-end gap-1.5 h-16">
      {bars.map((h, i) => (
        <motion.div
          key={i}
          className="flex-1 rounded-t bg-accent/70"
          initial={{ height: 0 }}
          animate={{ height: `${h}%` }}
          transition={{ delay: 0.3 + i * 0.08, duration: 0.5, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

function MiniKPI({ label, value, delay }: { label: string; value: string; delay: number }) {
  return (
    <motion.div
      className="rounded-lg bg-card border border-border/50 p-3 text-center"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.4 }}
    >
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-sm font-bold text-foreground mt-0.5">{value}</p>
    </motion.div>
  );
}

function AnimatedLine({ delay, width }: { delay: number; width: string }) {
  return (
    <motion.div
      className="h-1 rounded-full bg-accent/40"
      initial={{ width: 0 }}
      animate={{ width }}
      transition={{ delay, duration: 0.8, ease: "easeOut" }}
    />
  );
}

function PulsingDot({ color, delay }: { color: string; delay: number }) {
  return (
    <motion.div
      className={`w-2 h-2 rounded-full ${color}`}
      animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
      transition={{ duration: 1.5, repeat: Infinity, delay }}
    />
  );
}

export function DemoMockup({ step }: { step: number }) {
  if (step === 0) {
    return (
      <div className="space-y-3">
        <div className="grid grid-cols-4 gap-2">
          <MiniKPI label="Revenue" value="€42.5k" delay={0.1} />
          <MiniKPI label="Food Cost" value="28.4%" delay={0.2} />
          <MiniKPI label="Avg Ticket" value="€38.50" delay={0.3} />
          <MiniKPI label="Waste" value="-18%" delay={0.4} />
        </div>
        <MiniChart />
        {/* Animated trend line */}
        <motion.svg viewBox="0 0 300 40" className="w-full h-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
          <motion.path
            d="M 0 35 Q 40 25, 80 28 T 160 15 T 240 10 T 300 5"
            fill="none"
            stroke="hsl(160 84% 39%)"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.9, duration: 1.5, ease: "easeInOut" }}
          />
        </motion.svg>
      </div>
    );
  }

  if (step === 1) {
    const items = [
      { name: "Fresh Salmon — 2.5 kg", status: "⚠️ Low", urgent: false },
      { name: "Truffle Oil — 0.3 L", status: "🔴 Critical", urgent: true },
      { name: "Parmesan — 4 kg", status: "⏰ Expiring", urgent: false },
      { name: "Fresh Basil — 150g", status: "⚠️ Low", urgent: false },
    ];
    return (
      <div className="space-y-2">
        {items.map((item, i) => (
          <motion.div
            key={item.name}
            className={`flex items-center justify-between bg-card rounded-lg px-3 py-2 border ${item.urgent ? "border-destructive/30" : "border-border/30"}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.1 }}
          >
            <div className="flex items-center gap-2">
              <PulsingDot color={item.urgent ? "bg-destructive" : "bg-accent"} delay={i * 0.3} />
              <span className="text-xs font-medium text-foreground">{item.name}</span>
            </div>
            <motion.div
              className="text-[10px] px-2 py-0.5 rounded bg-accent/10 text-accent font-medium cursor-pointer"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ delay: 0.5 + i * 0.1 }}
            >
              Auto-Reorder
            </motion.div>
          </motion.div>
        ))}
        {/* Animated progress bar */}
        <motion.div className="mt-2 rounded-lg bg-card border border-border/30 p-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
          <div className="flex justify-between text-[10px] text-muted-foreground mb-1">
            <span>Reorder Queue</span>
            <span>3 items processing</span>
          </div>
          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
            <motion.div className="h-full bg-accent rounded-full" initial={{ width: "0%" }} animate={{ width: "65%" }} transition={{ delay: 1, duration: 1.2, ease: "easeOut" }} />
          </div>
        </motion.div>
      </div>
    );
  }

  if (step === 2) {
    const dishes = [
      { dish: "Caesar Salad", margin: "82%", status: "⭐ Star", bar: "82%" },
      { dish: "Grilled Sea Bass", margin: "72%", status: "⭐ Star", bar: "72%" },
      { dish: "Truffle Risotto", margin: "68%", status: "📈 Rising", bar: "68%" },
      { dish: "Beef Wellington", margin: "61%", status: "⚠️ Review", bar: "61%" },
    ];
    return (
      <div className="space-y-2">
        {dishes.map((d, i) => (
          <motion.div
            key={d.dish}
            className="bg-card rounded-lg px-3 py-2 border border-border/30"
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 + i * 0.1 }}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-foreground">{d.dish}</span>
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-accent">{d.margin}</span>
                <span className="text-[10px]">{d.status}</span>
              </div>
            </div>
            <div className="h-1 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-accent/60 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: d.bar }}
                transition={{ delay: 0.4 + i * 0.15, duration: 0.8, ease: "easeOut" }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className="space-y-3">
        <div className="grid grid-cols-3 gap-2">
          <MiniKPI label="This Week" value="€320" delay={0.1} />
          <MiniKPI label="Last Week" value="€410" delay={0.2} />
          <MiniKPI label="Saved" value="€90 ↓" delay={0.3} />
        </div>
        {/* Animated waste reduction chart */}
        <div className="flex items-end gap-1 h-12 px-2">
          {[85, 78, 70, 62, 55, 48, 42].map((h, i) => (
            <motion.div
              key={i}
              className="flex-1 rounded-t"
              style={{ background: `hsl(${160 + i * 5} 84% ${35 + i * 3}%)` }}
              initial={{ height: 0 }}
              animate={{ height: `${h}%` }}
              transition={{ delay: 0.4 + i * 0.08, duration: 0.5 }}
            />
          ))}
        </div>
        <motion.div className="flex items-center gap-1 justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
          <TrendingUp size={12} className="text-accent" />
          <span className="text-[10px] text-accent font-medium">Trending downward — great progress!</span>
        </motion.div>
        <motion.div
          className="bg-accent/10 rounded-lg p-3 border border-accent/20"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <p className="text-xs text-accent font-medium">💡 AI Tip: Switch to smaller lunch prep batches to reduce weekday waste by ~22%</p>
        </motion.div>
      </div>
    );
  }

  if (step === 4) {
    const campaigns = [
      { campaign: "Weekend Brunch Promo", roi: "+340%", reach: "2.4k" },
      { campaign: "Loyalty Rewards Email", roi: "+180%", reach: "1.8k" },
      { campaign: "New Menu Launch", roi: "+260%", reach: "3.1k" },
    ];
    return (
      <div className="space-y-2">
        {campaigns.map((c, i) => (
          <motion.div
            key={c.campaign}
            className="flex items-center justify-between bg-card rounded-lg px-3 py-2 border border-border/30"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.12 }}
          >
            <span className="text-xs font-medium text-foreground">{c.campaign}</span>
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground">{c.reach} reached</span>
              <motion.span
                className="text-xs font-bold text-accent"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 + i * 0.15, type: "spring", stiffness: 200 }}
              >
                {c.roi}
              </motion.span>
            </div>
          </motion.div>
        ))}
        {/* Animated engagement ring */}
        <motion.div className="flex items-center justify-center gap-6 mt-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
          <div className="relative w-16 h-16">
            <svg viewBox="0 0 36 36" className="w-16 h-16 -rotate-90">
              <circle cx="18" cy="18" r="15.9" fill="none" stroke="hsl(var(--muted))" strokeWidth="2" />
              <motion.circle
                cx="18" cy="18" r="15.9" fill="none" stroke="hsl(var(--accent))" strokeWidth="2"
                strokeDasharray="100"
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
            <p className="text-xs font-semibold text-foreground">Customer Retention</p>
            <p className="text-[10px] text-muted-foreground">+12% vs last quarter</p>
          </div>
        </motion.div>
      </div>
    );
  }

  if (step === 5) {
    return (
      <div className="space-y-3">
        <motion.div
          className="bg-card rounded-lg p-3 border border-border/30 flex items-start gap-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <motion.div
            className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Users size={14} className="text-primary" />
          </motion.div>
          <div>
            <p className="text-xs font-semibold text-foreground">Expert Consultation Available</p>
            <p className="text-[11px] text-muted-foreground mt-1">Schedule a 1-on-1 session with a restaurant growth specialist who reviews your data and provides tailored strategies.</p>
          </div>
        </motion.div>
        {/* Animated schedule slots */}
        <div className="grid grid-cols-3 gap-2">
          {["Mon 10am", "Wed 2pm", "Fri 11am"].map((slot, i) => (
            <motion.div
              key={slot}
              className="text-center py-2 rounded-lg border border-accent/20 bg-accent/5 text-[10px] font-medium text-accent cursor-pointer"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05, borderColor: "hsl(160 84% 39%)" }}
              transition={{ delay: 0.3 + i * 0.1 }}
            >
              {slot}
            </motion.div>
          ))}
        </div>
        <motion.div
          className="bg-accent/10 rounded-lg p-3 border border-accent/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <p className="text-xs text-accent font-medium">🎯 Restaurants with advisory support grow 2.3x faster on average</p>
        </motion.div>
      </div>
    );
  }

  return null;
}
