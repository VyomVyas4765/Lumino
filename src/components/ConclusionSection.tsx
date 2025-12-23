import { useEffect, useRef } from "react";
import { Sparkles, Rocket, Heart, Star } from "lucide-react";

const FloatingOrb = ({ 
  className, 
  delay = 0,
  size = "w-20 h-20"
}: { 
  className?: string; 
  delay?: number;
  size?: string;
}) => {
  return (
    <div 
      className={`absolute ${size} rounded-full blur-2xl opacity-60 animate-pulse ${className}`}
      style={{ animationDelay: `${delay}s`, animationDuration: '4s' }}
    />
  );
};

const AnimatedIcon = ({ 
  icon: Icon, 
  delay,
  className = ""
}: { 
  icon: typeof Sparkles; 
  delay: number;
  className?: string;
}) => {
  return (
    <div 
      className={`opacity-0 animate-fade-in-up ${className}`}
      style={{ animationDelay: `${delay}s`, animationFillMode: 'forwards' }}
    >
      <div className="relative group cursor-pointer">
        <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-xl group-hover:bg-primary/40 transition-all duration-500" />
        <div className="relative flex h-20 w-20 md:h-24 md:w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-border/50 backdrop-blur-sm transition-all duration-500 group-hover:scale-110 group-hover:shadow-glow-teal">
          <Icon className="h-10 w-10 md:h-12 md:w-12 text-primary transition-transform duration-500 group-hover:rotate-12" />
        </div>
      </div>
    </div>
  );
};

const ConclusionSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-b from-background via-accent/30 to-background py-24 md:py-36"
    >
      {/* Animated background orbs */}
      <FloatingOrb className="bg-primary/30 -left-20 top-20" delay={0} size="w-40 h-40" />
      <FloatingOrb className="bg-secondary/40 right-10 top-40" delay={1} size="w-32 h-32" />
      <FloatingOrb className="bg-lumio-purple/30 left-1/3 bottom-20" delay={2} size="w-36 h-36" />
      <FloatingOrb className="bg-lumio-coral/30 right-1/4 bottom-40" delay={1.5} size="w-28 h-28" />
      
      {/* Animated grid lines */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="h-full w-full" style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--foreground)) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--foreground)) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div className="container relative mx-auto px-4 md:px-6">
        {/* Floating icons row */}
        <div className="flex justify-center gap-6 md:gap-10 mb-12">
          <AnimatedIcon icon={Sparkles} delay={0.2} />
          <AnimatedIcon icon={Rocket} delay={0.4} />
          <AnimatedIcon icon={Heart} delay={0.6} />
          <AnimatedIcon icon={Star} delay={0.8} />
        </div>

        {/* Main content */}
        <div className="text-center max-w-4xl mx-auto">
          <h2 
            className="mb-6 text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground opacity-0 animate-fade-in"
            style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}
          >
            <span className="bg-gradient-to-r from-primary via-lumio-teal-dark to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradient-shift_3s_ease-in-out_infinite]">
              Your Learning Journey
            </span>
            <br />
            <span className="text-foreground">Starts Here</span>
          </h2>
          
          <p 
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 opacity-0 animate-fade-in"
            style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}
          >
            Join a community of curious minds transforming how knowledge is shared, learned, and mastered.
          </p>

          {/* Animated stats */}
          <div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 opacity-0 animate-fade-in-up"
            style={{ animationDelay: '0.7s', animationFillMode: 'forwards' }}
          >
            {[
              { value: "10K+", label: "Active Learners" },
              { value: "500+", label: "Expert Teachers" },
              { value: "1,000+", label: "Courses" },
              { value: "98%", label: "Satisfaction" },
            ].map((stat, index) => (
              <div 
                key={stat.label}
                className="group relative p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 transition-all duration-500 hover:scale-105 hover:shadow-card hover:border-primary/30"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <div className="text-3xl md:text-4xl font-extrabold text-primary mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative bottom wave */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>
    </section>
  );
};

export default ConclusionSection;