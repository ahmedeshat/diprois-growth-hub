import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart3, ShoppingCart, Utensils, AlertTriangle, TrendingUp,
  Leaf, Users, DollarSign, ChefHat, Megaphone, ArrowRight, CheckCircle2, X
} from "lucide-react";

const demoSteps = [
  {
    icon: BarChart3,
    title: "Real-Time Analytics Dashboard",
    description: "Monitor revenue, food costs, average ticket size, and waste metrics at a glance. All KPIs update in real-time so you always know where your restaurant stands.",
    highlights: ["Live revenue tracking", "Cost % monitoring", "Daily/weekly/monthly views"],
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: ShoppingCart,
    title: "Smart Inventory Management",
    description: "AI tracks stock levels, predicts when you'll run out, and auto-generates purchase orders. Never over-order or run out of key ingredients again.",
    highlights: ["Auto stock alerts", "Predictive reordering", "Supplier integration"],
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    icon: ChefHat,
    title: "Menu Engineering & Optimization",
    description: "Identify your most profitable dishes, spot underperformers, and get AI-powered pricing suggestions to maximize margin on every plate.",
    highlights: ["Profit margin analysis", "Menu item ranking", "Dynamic pricing hints"],
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Leaf,
    title: "Waste Tracking & Reduction",
    description: "Log and categorize waste, identify patterns, and receive actionable suggestions to cut food waste — saving money and helping the planet.",
    highlights: ["Waste logging by category", "Trend detection", "Sustainability reports"],
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    icon: Megaphone,
    title: "Marketing & Customer Insights",
    description: "Understand your customers better with AI-driven insights. Launch targeted campaigns, track ROI, and grow repeat visits effortlessly.",
    highlights: ["Customer segmentation", "Campaign ROI tracking", "Automated promotions"],
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Users,
    title: "Expert Human Support",
    description: "Beyond AI, get access to restaurant industry consultants who review your data and give personalized strategies to accelerate growth.",
    highlights: ["1-on-1 advisory sessions", "Custom action plans", "Ongoing optimization"],
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
];

// Mini animated mockup bars for the dashboard preview
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

export function DemoDialog({ open, onOpenChange, onStartTrial }: { open: boolean; onOpenChange: (o: boolean) => void; onStartTrial?: () => void }) {
  const [step, setStep] = useState(0);
  const current = demoSteps[step];
  const Icon = current.icon;

  const next = () => {
    if (step < demoSteps.length - 1) setStep(step + 1);
  };
  const prev = () => {
    if (step > 0) setStep(step - 1);
  };
  const handleClose = () => {
    setStep(0);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) handleClose(); else onOpenChange(o); }}>
      <DialogContent className="sm:max-w-2xl p-0 overflow-hidden gap-0">
        <DialogHeader className="sr-only">
          <DialogTitle>Diprois Platform Demo</DialogTitle>
          <DialogDescription>Interactive walkthrough of Diprois features</DialogDescription>
        </DialogHeader>

        {/* Progress bar */}
        <div className="flex gap-1 px-6 pt-6">
          {demoSteps.map((_, i) => (
            <div key={i} className="flex-1 h-1 rounded-full bg-muted overflow-hidden">
              <motion.div
                className="h-full bg-accent rounded-full"
                initial={false}
                animate={{ width: i <= step ? "100%" : "0%" }}
                transition={{ duration: 0.4 }}
              />
            </div>
          ))}
        </div>

        <div className="p-6 pt-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              {/* Animated mockup area */}
              <div className="rounded-xl bg-muted/50 border border-border/50 p-4 mb-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-destructive/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-accent/60" />
                  <span className="text-[10px] text-muted-foreground ml-2 font-medium">diprois.app/dashboard</span>
                </div>

                {step === 0 && (
                  <div className="space-y-3">
                    <div className="grid grid-cols-4 gap-2">
                      <MiniKPI label="Revenue" value="€42.5k" delay={0.1} />
                      <MiniKPI label="Food Cost" value="28.4%" delay={0.2} />
                      <MiniKPI label="Avg Ticket" value="€38.50" delay={0.3} />
                      <MiniKPI label="Waste" value="-18%" delay={0.4} />
                    </div>
                    <MiniChart />
                  </div>
                )}
                {step === 1 && (
                  <div className="space-y-2">
                    {["Fresh Salmon — 2.5 kg ⚠️ Low", "Truffle Oil — 0.3 L 🔴 Critical", "Parmesan — 4 kg ⏰ Expiring", "Fresh Basil — 150g ⚠️ Low"].map((item, i) => (
                      <motion.div
                        key={item}
                        className="flex items-center justify-between bg-card rounded-lg px-3 py-2 border border-border/30"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 + i * 0.1 }}
                      >
                        <span className="text-xs font-medium text-foreground">{item}</span>
                        <motion.div
                          className="text-[10px] px-2 py-0.5 rounded bg-accent/10 text-accent font-medium"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.5 + i * 0.1 }}
                        >
                          Auto-Reorder
                        </motion.div>
                      </motion.div>
                    ))}
                  </div>
                )}
                {step === 2 && (
                  <div className="space-y-2">
                    {[
                      { dish: "Caesar Salad", margin: "82%", status: "⭐ Star" },
                      { dish: "Grilled Sea Bass", margin: "72%", status: "⭐ Star" },
                      { dish: "Truffle Risotto", margin: "68%", status: "📈 Rising" },
                      { dish: "Beef Wellington", margin: "61%", status: "⚠️ Review" },
                    ].map((d, i) => (
                      <motion.div
                        key={d.dish}
                        className="flex items-center justify-between bg-card rounded-lg px-3 py-2 border border-border/30"
                        initial={{ opacity: 0, x: -15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15 + i * 0.1 }}
                      >
                        <span className="text-xs font-medium text-foreground">{d.dish}</span>
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-bold text-accent">{d.margin}</span>
                          <span className="text-[10px]">{d.status}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
                {step === 3 && (
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-2">
                      <MiniKPI label="This Week" value="€320" delay={0.1} />
                      <MiniKPI label="Last Week" value="€410" delay={0.2} />
                      <MiniKPI label="Saved" value="€90 ↓" delay={0.3} />
                    </div>
                    <motion.div
                      className="bg-accent/10 rounded-lg p-3 border border-accent/20"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <p className="text-xs text-accent font-medium">💡 AI Tip: Switch to smaller lunch prep batches to reduce weekday waste by ~22%</p>
                    </motion.div>
                  </div>
                )}
                {step === 4 && (
                  <div className="space-y-2">
                    {[
                      { campaign: "Weekend Brunch Promo", roi: "+340%", reach: "2.4k" },
                      { campaign: "Loyalty Rewards Email", roi: "+180%", reach: "1.8k" },
                      { campaign: "New Menu Launch", roi: "+260%", reach: "3.1k" },
                    ].map((c, i) => (
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
                          <span className="text-xs font-bold text-accent">{c.roi}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
                {step === 5 && (
                  <div className="space-y-3">
                    <motion.div
                      className="bg-card rounded-lg p-3 border border-border/30 flex items-start gap-3"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 }}
                    >
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Users size={14} className="text-primary" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-foreground">Expert Consultation Available</p>
                        <p className="text-[11px] text-muted-foreground mt-1">Schedule a 1-on-1 session with a restaurant growth specialist who reviews your data and provides tailored strategies.</p>
                      </div>
                    </motion.div>
                    <motion.div
                      className="bg-accent/10 rounded-lg p-3 border border-accent/20"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      <p className="text-xs text-accent font-medium">🎯 Restaurants with advisory support grow 2.3x faster on average</p>
                    </motion.div>
                  </div>
                )}
              </div>

              {/* Text content */}
              <div className="flex items-start gap-3 mb-4">
                <div className={`w-10 h-10 rounded-xl ${current.bgColor} flex items-center justify-center flex-shrink-0`}>
                  <Icon size={20} className={current.color} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">{current.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{current.description}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {current.highlights.map((h, i) => (
                  <motion.span
                    key={h}
                    className="inline-flex items-center gap-1.5 text-xs font-medium bg-muted px-3 py-1.5 rounded-full text-foreground"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                  >
                    <CheckCircle2 size={12} className="text-accent" />
                    {h}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" onClick={prev} disabled={step === 0}>
              ← Back
            </Button>
            <span className="text-xs text-muted-foreground">{step + 1} / {demoSteps.length}</span>
            {step < demoSteps.length - 1 ? (
              <Button size="sm" className="bg-accent text-accent-foreground hover:bg-green-dark gap-1" onClick={next}>
                Next <ArrowRight size={14} />
              </Button>
            ) : (
              <Button size="sm" className="bg-accent text-accent-foreground hover:bg-green-dark gap-1" onClick={() => { handleClose(); onStartTrial?.(); }}>
                Start Free Trial <ArrowRight size={14} />
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
