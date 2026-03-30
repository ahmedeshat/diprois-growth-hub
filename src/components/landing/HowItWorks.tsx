import { motion } from "framer-motion";

const steps = [
  { num: "01", title: "Connect & Set Up", desc: "Sign up, add your business details, upload your menu, and connect your POS and accounting systems in minutes." },
  { num: "02", title: "AI Analyzes Operations", desc: "Diprois instantly analyzes your inventory, costs, menu performance, and waste patterns to build your baseline." },
  { num: "03", title: "Get Actionable Insights", desc: "Receive daily AI-generated recommendations on pricing, ordering, waste reduction, and marketing strategies." },
  { num: "04", title: "Grow Profitably", desc: "Implement insights, track results on your dashboard, and consult with experts to continuously optimize operations." },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="section-padding bg-background">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest text-accent font-semibold">How It Works</span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mt-3 text-foreground">
            Up and Running in Minutes
          </h2>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

          <div className="space-y-12">
            {steps.map((s, i) => (
              <motion.div
                key={s.num}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative flex items-start gap-6 md:gap-12 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
              >
                <div className={`flex-1 ${i % 2 === 0 ? "md:text-right" : "md:text-left"} hidden md:block`}>
                  <h3 className="text-lg font-bold text-foreground mb-2">{s.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>

                <div className="relative z-10 w-12 h-12 rounded-full bg-navy-gradient flex items-center justify-center shrink-0 shadow-lg">
                  <span className="text-sm font-black text-primary-foreground">{s.num}</span>
                </div>

                <div className="flex-1 md:hidden">
                  <h3 className="text-lg font-bold text-foreground mb-2">{s.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>

                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
