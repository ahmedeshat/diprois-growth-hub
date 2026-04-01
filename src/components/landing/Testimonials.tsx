import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    name: "Marco Rossi",
    role: "Owner, Trattoria del Sole",
    location: "Milan, Italy",
    image: "MR",
    quote: "Diprois transformed our restaurant. We reduced food waste by 32% in just three months, and our profit margins have never been better. The AI insights are incredibly accurate.",
    stats: { label: "Waste Reduced", value: "32%" },
    rating: 5,
  },
  {
    name: "Sophie Laurent",
    role: "GM, Le Petit Bistro",
    location: "Paris, France",
    image: "SL",
    quote: "The menu engineering module alone paid for itself within weeks. We identified our top performers and repriced strategically — revenue went up 24% without changing a single recipe.",
    stats: { label: "Revenue Increase", value: "24%" },
    rating: 5,
  },
  {
    name: "Andreas Weber",
    role: "Owner, Gasthaus Weber",
    location: "Berlin, Germany",
    image: "AW",
    quote: "I used to spend hours managing inventory manually. With Diprois, everything is automated. The predictive reordering saved us from running out of stock during our busiest weekends.",
    stats: { label: "Hours Saved Weekly", value: "15+" },
    rating: 5,
  },
  {
    name: "Elena Papas",
    role: "Owner, Olive & Vine",
    location: "Athens, Greece",
    image: "EP",
    quote: "The expert consultation sessions were a game-changer. Our advisor helped us restructure our entire operation, and the AI keeps us on track with daily insights.",
    stats: { label: "Profit Growth", value: "41%" },
    rating: 5,
  },
];

export function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const goTo = (index: number) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };

  const prev = () => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  };

  const next = () => {
    setDirection(1);
    setCurrent((c) => (c + 1) % testimonials.length);
  };

  const t = testimonials[current];

  return (
    <section id="testimonials" className="section-padding bg-background relative overflow-hidden">
      {/* Subtle background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-64 h-64 rounded-full bg-accent/5 blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-64 h-64 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-4">
            Trusted by Restaurants Across Europe
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            What Our Clients Say
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real results from real restaurant owners who transformed their businesses with Diprois.
          </p>
        </motion.div>

        <div className="relative">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              initial={{ opacity: 0, x: direction * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -60 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="glass-card rounded-2xl p-8 md:p-12"
            >
              <div className="flex flex-col md:flex-row gap-8 items-center">
                {/* Left: Avatar + Info */}
                <div className="flex flex-col items-center md:items-start gap-4 md:w-1/3">
                  <div className="w-20 h-20 rounded-2xl bg-navy-gradient flex items-center justify-center text-primary-foreground text-2xl font-bold shadow-lg">
                    {t.image}
                  </div>
                  <div className="text-center md:text-left">
                    <p className="font-bold text-foreground text-lg">{t.name}</p>
                    <p className="text-sm text-muted-foreground">{t.role}</p>
                    <p className="text-xs text-muted-foreground">{t.location}</p>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} size={16} className="fill-accent text-accent" />
                    ))}
                  </div>
                  {/* Stat badge */}
                  <motion.div
                    className="bg-accent/10 border border-accent/20 rounded-xl px-5 py-3 text-center"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <p className="text-2xl font-bold text-accent">{t.stats.value}</p>
                    <p className="text-xs text-muted-foreground">{t.stats.label}</p>
                  </motion.div>
                </div>

                {/* Right: Quote */}
                <div className="md:w-2/3 relative">
                  <Quote size={48} className="text-accent/10 absolute -top-2 -left-2" />
                  <p className="text-lg md:text-xl leading-relaxed text-foreground/90 pl-8 italic">
                    "{t.quote}"
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation arrows */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <Button variant="outline" size="icon" className="rounded-full" onClick={prev}>
              <ChevronLeft size={18} />
            </Button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    i === current ? "bg-accent w-8" : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                />
              ))}
            </div>
            <Button variant="outline" size="icon" className="rounded-full" onClick={next}>
              <ChevronRight size={18} />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
