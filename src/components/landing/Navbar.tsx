import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import diproisLogo from "@/assets/diprois-logo.png";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Modules", href: "#modules" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
];

export function Navbar({ onStartTrial }: { onStartTrial?: () => void }) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border/50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-16">
        <a href="/" className="flex items-center gap-2">
          <img src={diproisLogo} alt="Diprois" className="h-8 w-8" />
          <span className="text-2xl font-black tracking-tight text-primary">Diprois</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => window.location.href = "/auth"}>Log In</Button>
          <Button size="sm" className="bg-accent text-accent-foreground hover:bg-green-dark" onClick={onStartTrial}>Get Started Free</Button>
        </div>

        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-card border-b border-border"
          >
            <div className="px-6 py-4 flex flex-col gap-3">
              {navLinks.map((l) => (
                <a key={l.href} href={l.href} className="text-sm font-medium text-muted-foreground py-2" onClick={() => setOpen(false)}>
                  {l.label}
                </a>
              ))}
              <Button variant="ghost" size="sm" className="justify-start" onClick={() => { setOpen(false); window.location.href = "/auth"; }}>Log In</Button>
              <Button size="sm" className="bg-accent text-accent-foreground hover:bg-green-dark" onClick={() => { setOpen(false); onStartTrial?.(); }}>Get Started Free</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
