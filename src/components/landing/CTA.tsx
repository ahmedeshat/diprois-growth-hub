import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

const benefits = [
  "14-day free trial, no credit card required",
  "Full access to AI insights & expert support",
  "Integrates with your existing POS & tools",
];

export function CTA({ onStartTrial }: { onStartTrial?: () => void }) {
  return (
    <section className="section-padding">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto bg-navy-gradient rounded-3xl p-10 md:p-16 text-center relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-accent blur-3xl" />
          <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-accent blur-3xl" />
        </div>

        <div className="relative">
          <h2 className="text-3xl md:text-5xl font-black text-primary-foreground tracking-tight mb-4">
            Ready to Transform Your Restaurant?
          </h2>
          <p className="text-primary-foreground/70 text-lg mb-8 max-w-xl mx-auto">
            Join hundreds of restaurants already using Diprois to cut costs, reduce waste, and grow revenue.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-green-dark h-12 px-8 text-base font-semibold gap-2" onClick={onStartTrial}>
              Start Free Trial <ArrowRight size={18} />
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-8 text-base font-medium border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent">
              Schedule Demo
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            {benefits.map((b) => (
              <span key={b} className="flex items-center gap-2 text-sm text-primary-foreground/70">
                <Check size={14} className="text-accent shrink-0" /> {b}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
