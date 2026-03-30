import { motion } from "framer-motion";
import {
  Package, UtensilsCrossed, DollarSign, Recycle,
  Megaphone, HeadphonesIcon, BarChart3, Building2,
  Plug, Smartphone,
} from "lucide-react";

const features = [
  { icon: Package, title: "AI Inventory Management", desc: "Real-time stock tracking, automated reorder points, and predictive forecasting based on historical data and seasonal trends." },
  { icon: UtensilsCrossed, title: "Menu Engineering", desc: "AI-driven menu optimization, profitability analysis per dish, portion control, and dynamic pricing suggestions." },
  { icon: DollarSign, title: "Cost Control Dashboard", desc: "Real-time expense tracking, labor cost analysis, profit margin calculations, and budget variance reporting." },
  { icon: Recycle, title: "Waste Tracking System", desc: "Digital waste logs, pattern analysis, reduction recommendations, and ROI tracking for waste initiatives." },
  { icon: Megaphone, title: "Marketing Optimization", desc: "Customer segmentation, campaign management, loyalty program integration, and performance analytics." },
  { icon: HeadphonesIcon, title: "Expert Support Portal", desc: "Direct access to restaurant consultants, scheduled advisory sessions, and personalized recommendations." },
  { icon: BarChart3, title: "Analytics & Reporting", desc: "Comprehensive dashboards, custom report generation, KPI tracking, and trend analysis tools." },
  { icon: Building2, title: "Multi-Location Management", desc: "Centralized control for chains, location comparison tools, and standardized operations management." },
  { icon: Plug, title: "Integration Hub", desc: "POS systems, accounting software, food distributors, and third-party service API connections." },
  { icon: Smartphone, title: "Mobile Responsive", desc: "Full functionality across all devices with offline capability for critical restaurant functions." },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export function Features() {
  return (
    <section id="features" className="section-padding bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest text-accent font-semibold">Core Features</span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mt-3 text-foreground">
            Everything Your Restaurant Needs
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg">
            One unified platform replacing multiple tools — from inventory to marketing, powered by AI and expert insights.
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4"
        >
          {features.map((f) => (
            <motion.div
              key={f.title}
              variants={item}
              className="glass-card rounded-xl p-6 hover:shadow-xl hover:border-accent/30 transition-all duration-300 group"
            >
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                <f.icon size={20} className="text-accent" />
              </div>
              <h3 className="text-sm font-bold text-foreground mb-2">{f.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
