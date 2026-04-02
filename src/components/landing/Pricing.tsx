import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "135",
    description: "Perfect for independent restaurants getting started with AI-powered operations.",
    features: [
      "AI Inventory Management",
      "Menu Engineering (basic)",
      "Cost Control Dashboard",
      "Waste Tracking",
      "Analytics & Reporting",
      "Email Support",
      "1 Location",
    ],
    highlight: false,
  },
  {
    name: "Professional",
    price: "325",
    description: "For growing restaurants that need full optimization and expert guidance.",
    features: [
      "Everything in Starter",
      "Advanced Menu Engineering",
      "Marketing Optimization",
      "Expert Support Portal",
      "POS & Accounting Integrations",
      "Priority Support",
      "Up to 3 Locations",
    ],
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For restaurant chains needing centralized control and dedicated support.",
    features: [
      "Everything in Professional",
      "Multi-Location Management",
      "Custom Integrations",
      "Dedicated Account Manager",
      "Custom Reporting",
      "SLA & Onboarding",
      "Unlimited Locations",
    ],
    highlight: false,
  },
];

interface PricingProps {
  onSelectPlan: (plan: string) => void;
}

export function Pricing({ onSelectPlan }: PricingProps) {
  return (
    <section id="pricing" className="section-padding bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest text-accent font-semibold">Pricing</span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mt-3 text-foreground">
            Simple, Transparent Pricing
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg">
            Start with a 14-day free trial. No credit card required. Scale as you grow.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`rounded-2xl p-8 flex flex-col relative ${
                plan.highlight
                  ? "bg-navy-gradient text-primary-foreground shadow-2xl ring-2 ring-accent/30 scale-[1.03]"
                  : "glass-card"
              }`}
            >
              {plan.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-gradient text-accent-foreground text-xs font-bold px-4 py-1 rounded-full">
                  Most Popular
                </span>
              )}

              <h3 className={`text-xl font-bold mb-1 ${plan.highlight ? "" : "text-foreground"}`}>
                {plan.name}
              </h3>
              <p className={`text-sm mb-6 ${plan.highlight ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                {plan.description}
              </p>

              <div className="mb-6">
                {plan.price === "Custom" ? (
                  <span className="text-4xl font-black">Custom</span>
                ) : (
                  <>
                    <span className="text-4xl font-black">€{plan.price}</span>
                    <span className={`text-sm ml-1 ${plan.highlight ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
                      /month
                    </span>
                  </>
                )}
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check size={16} className={`shrink-0 mt-0.5 ${plan.highlight ? "text-accent" : "text-accent"}`} />
                    <span className={plan.highlight ? "text-primary-foreground/90" : "text-foreground"}>{f}</span>
                  </li>
                ))}
              </ul>

              <Button
                onClick={() => onSelectPlan(plan.name)}
                className={`w-full h-11 text-base font-semibold gap-2 ${
                  plan.highlight
                    ? "bg-accent text-accent-foreground hover:bg-green-dark"
                    : "bg-primary text-primary-foreground hover:bg-navy-dark"
                }`}
              >
                {plan.price === "Custom" ? "Contact Sales" : "Start Free Trial"} <ArrowRight size={16} />
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
