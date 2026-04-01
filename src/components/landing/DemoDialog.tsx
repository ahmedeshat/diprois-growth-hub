import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart3, ShoppingCart, Utensils, AlertTriangle, TrendingUp,
  Leaf, Users, DollarSign, ChefHat, Megaphone, ArrowRight, CheckCircle2, X
} from "lucide-react";
import { DemoMockup } from "./demo/DemoMockup";
import { demoSteps } from "./demo/demoData";

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
              <div className="rounded-xl bg-muted/50 border border-border/50 p-4 mb-5 relative overflow-hidden">
                {/* Animated gradient background */}
                <motion.div
                  className="absolute inset-0 opacity-30 pointer-events-none"
                  animate={{
                    background: [
                      "radial-gradient(circle at 20% 50%, hsl(160 84% 39% / 0.15), transparent 60%)",
                      "radial-gradient(circle at 80% 50%, hsl(215 55% 23% / 0.15), transparent 60%)",
                      "radial-gradient(circle at 20% 50%, hsl(160 84% 39% / 0.15), transparent 60%)",
                    ],
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />

                <div className="flex items-center gap-2 mb-3 relative">
                  <div className="w-2.5 h-2.5 rounded-full bg-destructive/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-accent/60" />
                  <span className="text-[10px] text-muted-foreground ml-2 font-medium">diprois.app/dashboard</span>

                  {/* Animated typing indicator */}
                  <motion.div
                    className="ml-auto flex items-center gap-1 px-2 py-0.5 rounded-full bg-accent/10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 1, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                  >
                    <motion.div className="w-1 h-1 rounded-full bg-accent" animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0 }} />
                    <motion.div className="w-1 h-1 rounded-full bg-accent" animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }} />
                    <motion.div className="w-1 h-1 rounded-full bg-accent" animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }} />
                    <span className="text-[9px] text-accent font-medium ml-1">AI analyzing</span>
                  </motion.div>
                </div>

                <div className="relative">
                  <DemoMockup step={step} />
                </div>
              </div>

              {/* Text content */}
              <div className="flex items-start gap-3 mb-4">
                <motion.div
                  className={`w-10 h-10 rounded-xl ${current.bgColor} flex items-center justify-center flex-shrink-0`}
                  animate={{ rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Icon size={20} className={current.color} />
                </motion.div>
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
