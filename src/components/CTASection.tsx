import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section className="relative overflow-hidden bg-primary py-20 md:py-28">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-lumio-teal-dark/30 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-secondary/20 blur-3xl" />
      </div>
      
      <div className="container relative mx-auto px-4 text-center md:px-6">
        <h2 className="mb-4 text-3xl font-extrabold text-primary-foreground md:text-4xl lg:text-5xl opacity-0 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          Ready to Start Learning?
        </h2>
        <p className="mx-auto mb-8 max-w-xl text-lg text-primary-foreground/80 opacity-0 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          Join thousands of learners, teachers, and institutions already using Lumio to achieve their goals.
        </p>
        
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row opacity-0 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <Button variant="lumio-amber" size="xl" className="gap-2">
            Choose Your Role
            <ArrowRight className="h-5 w-5" />
          </Button>
          <Button 
            variant="outline" 
            size="xl" 
            className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
          >
            Contact Sales
          </Button>
        </div>
        
        <p className="mt-8 text-sm text-primary-foreground/60 opacity-0 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          Free to start. No credit card required.
        </p>
      </div>
    </section>
  );
};

export default CTASection;