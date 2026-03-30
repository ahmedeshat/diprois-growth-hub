import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface SignupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  plan?: string;
}

export function SignupDialog({ open, onOpenChange, plan }: SignupDialogProps) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone) {
      toast({ title: "Please fill in all fields", variant: "destructive" });
      return;
    }
    setLoading(true);

    try {
      const { error } = await supabase.functions.invoke("submit-trial-lead", {
        body: {
          name: form.name,
          email: form.email,
          phone: form.phone,
          plan: plan || null,
        },
      });
      if (error) throw error;
      toast({
        title: "Thank you for your interest!",
        description: "We'll be in touch shortly to get you started.",
      });
      setForm({ name: "", email: "", phone: "" });
      onOpenChange(false);
    } catch {
      toast({ title: "Something went wrong", description: "Please try again.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black text-foreground">
            Start Your Free Trial
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {plan
              ? `You selected the ${plan} plan. Fill in your details and we'll get you started.`
              : "Fill in your details and we'll get you started with 14 days free."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-foreground">Full Name</Label>
            <Input
              id="name"
              placeholder="John Doe"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="bg-secondary border-border"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="john@restaurant.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="bg-secondary border-border"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-foreground">Contact Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+353 1 234 5678"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="bg-secondary border-border"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-accent text-accent-foreground hover:bg-green-dark h-11 text-base font-semibold"
          >
            {loading ? <Loader2 className="animate-spin mr-2" size={18} /> : null}
            {loading ? "Submitting..." : "Get Started"}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            No credit card required. 14-day free trial on all plans.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
