import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import heroDashboard from "@/assets/hero-dashboard.jpg";

export function Hero({ onStartTrial }: { onStartTrial?: () => void }) {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-32">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-accent/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-accent/10 text-accent border border-accent/20 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-soft" />
              AI-Powered Restaurant Intelligence
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight leading-[1.1] mb-6"
          >
            <span className="text-gradient-navy">Grow Your Restaurant</span>
            <br />
            <span className="text-gradient-green">Profitably & Sustainably</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Diprois combines AI-powered analytics with expert human support to optimize
            inventory, menus, costs, and marketing — all from one unified dashboard.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-green-dark h-12 px-8 text-base font-semibold gap-2" onClick={onStartTrial}>
              Start Free Trial <ArrowRight size={18} />
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-8 text-base font-medium gap-2 border-border hover:bg-muted">
              <Play size={16} /> Watch Demo
            </Button>
          </motion.div>
        </div>

        {/* Dashboard preview */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative max-w-5xl mx-auto"
        >
          <div className="rounded-xl overflow-hidden shadow-2xl border border-border/50 ring-1 ring-primary/5">
            <img src={heroDashboard} alt="Diprois restaurant management dashboard showing real-time analytics and KPI tracking" className="w-full" />
          </div>
          {/* Floating glow */}
          <div className="absolute -inset-4 bg-accent/5 rounded-2xl blur-2xl -z-10" />
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4 font-medium">Trusted by forward-thinking restaurants</p>
          <div className="flex items-center justify-center gap-8 md:gap-12 opacity-40 flex-wrap">
            {["Fine Dining Co.", "Urban Eats", "Bistro Group", "ChainFresh", "Savory Labs"].map((name) => (
              <span key={name} className="text-sm font-bold text-foreground tracking-wide">{name}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
