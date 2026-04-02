import { motion } from "framer-motion";
import { TrendingUp, ShieldCheck, Zap, Brain } from "lucide-react";

const modules = [
  {
    icon: Brain,
    title: "AI-Powered Insights",
    desc: "A high-performance LLM analyzes your operations daily and delivers personalized recommendations on menu pricing, waste reduction, and cost optimization to drive measurable ROI.",
    stats: "30% avg cost reduction",
  },
  {
    icon: TrendingUp,
    title: "Revenue Optimization",
    desc: "Menu engineering and dynamic pricing powered by real sales data. Identify your stars and dogs, optimize positioning, and maximize every plate's contribution to profit.",
    stats: "22% revenue increase",
  },
  {
    icon: Zap,
    title: "Operational Efficiency",
    desc: "Automated inventory reorders, waste pattern detection, and labor cost analysis eliminate manual work and prevent costly mistakes before they happen.",
    stats: "15 hrs/week saved",
  },
  {
    icon: ShieldCheck,
    title: "Expert Human Support",
    desc: "Beyond AI — get direct access to seasoned restaurant consultants for strategic planning, crisis management, and personalized growth strategies.",
    stats: "1-on-1 advisory",
  },
];

export function Modules() {
  return (
    <section id="modules" className="section-padding bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest text-accent font-semibold">Why Diprois</span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mt-3 text-foreground">
            AI Meets Human Expertise
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg">
            The only platform that pairs cutting-edge artificial intelligence with hands-on restaurant industry expertise.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {modules.map((m, i) => (
            <motion.div
              key={m.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card rounded-2xl p-8 hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-accent/10 transition-colors" />
              <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <m.icon size={24} className="text-primary" />
                  </div>
                  <span className="text-xs font-bold text-accent bg-accent/10 px-3 py-1 rounded-full">{m.stats}</span>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{m.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{m.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
