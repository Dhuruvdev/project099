import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Link } from "wouter";

const TIERS = [
  {
    name: "Starter",
    price: "Free",
    credits: 10,
    features: ["Access to basic tools", "Standard processing speed", "Community support"],
    cta: "Get Started",
    popular: false
  },
  {
    name: "Pro",
    price: "$29",
    credits: 500,
    features: ["Access to all tools", "Priority processing", "Email support", "API Access"],
    cta: "Upgrade to Pro",
    popular: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    credits: "Unlimited",
    features: ["Dedicated infrastructure", "Custom integrations", "SLA", "24/7 Support"],
    cta: "Contact Sales",
    popular: false
  }
];

export default function Pricing() {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar />
      <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto text-center space-y-12 py-10">
          
          <div>
            <h1 className="text-4xl lg:text-5xl font-display font-bold mb-4">Simple, transparent pricing</h1>
            <p className="text-xl text-muted-foreground">Choose the plan that fits your needs.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {TIERS.map((tier) => (
              <div 
                key={tier.name}
                className={`relative bg-card rounded-3xl p-8 border ${tier.popular ? 'border-primary shadow-xl shadow-primary/10 scale-105' : 'border-border shadow-sm'} flex flex-col`}
              >
                {tier.popular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                    Most Popular
                  </div>
                )}
                
                <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-display font-bold">{tier.price}</span>
                  {tier.price !== 'Custom' && <span className="text-muted-foreground">/mo</span>}
                </div>

                <div className="space-y-4 mb-8 flex-1">
                  {tier.features.map((feat) => (
                    <div key={feat} className="flex items-center gap-3 text-sm">
                      <div className="w-5 h-5 rounded-full bg-green-500/10 text-green-600 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3" />
                      </div>
                      {feat}
                    </div>
                  ))}
                </div>

                <Button 
                  variant={tier.popular ? "default" : "outline"} 
                  className="w-full"
                  size="lg"
                >
                  {tier.cta}
                </Button>
              </div>
            ))}
          </div>

          <div className="pt-12 border-t border-border">
            <h3 className="font-bold text-lg mb-2">Need something else?</h3>
            <p className="text-muted-foreground mb-4">We offer custom packages for large teams and educational institutions.</p>
            <Link href="/contact">
              <span className="text-primary hover:underline cursor-pointer">Contact us</span>
            </Link>
          </div>

        </div>
      </main>
    </div>
  );
}
