import { useState } from "react";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { Modules } from "@/components/landing/Modules";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Pricing } from "@/components/landing/Pricing";
import { CTA } from "@/components/landing/CTA";
import { Testimonials } from "@/components/landing/Testimonials";
import { Footer } from "@/components/landing/Footer";
import { SignupDialog } from "@/components/landing/SignupDialog";
import { DemoDialog } from "@/components/landing/DemoDialog";

const Index = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | undefined>();

  const openSignup = (plan?: string) => {
    setSelectedPlan(plan);
    setDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar onStartTrial={() => openSignup()} />
      <Hero onStartTrial={() => openSignup()} onWatchDemo={() => setDemoOpen(true)} />
      <Features />
      <Modules />
      <HowItWorks />
      <Pricing onSelectPlan={(plan) => openSignup(plan)} />
      <CTA onStartTrial={() => openSignup()} />
      <Footer />
      <SignupDialog open={dialogOpen} onOpenChange={setDialogOpen} plan={selectedPlan} />
      <DemoDialog open={demoOpen} onOpenChange={setDemoOpen} onStartTrial={() => openSignup()} />
    </div>
  );
};

export default Index;
