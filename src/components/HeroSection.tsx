import { Button } from "@/components/ui/button";


const HeroSection = () => {
  return (
    <section className="relative min-h-screen overflow-hidden gradient-hero pt-16">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 top-40 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -right-20 bottom-40 h-96 w-96 rounded-full bg-secondary/20 blur-3xl" />
      </div>
      
      <div className="container relative mx-auto flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4 py-12 md:flex-row md:gap-12 md:px-6 lg:gap-20">
        {/* Text content */}
        <div className="flex flex-1 flex-col items-center text-center md:items-start md:text-left">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse-soft" />
            Adaptive Learning Platform
          </div>
          
          <h1 className="mb-6 max-w-xl text-4xl font-extrabold leading-tight tracking-tight text-foreground animate-fade-in-up sm:text-5xl lg:text-6xl" style={{ animationDelay: '0.2s' }}>
            Learning that{" "}
            <span className="bg-gradient-to-r from-primary to-lumio-teal-dark bg-clip-text text-transparent">
              adapts to you
            </span>
          </h1>
          
          <p className="mb-8 max-w-md text-lg text-muted-foreground animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            Lumio isn't just a classroom. It's an adaptive ecosystem for students to master skills, instructors to teach freely, and institutions to grow.
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-4 animate-fade-in-up md:justify-start" style={{ animationDelay: '0.4s' }}>
            <Button variant="lumio-primary" size="lg">
              Get Started Free
            </Button>
            <Button variant="lumio-outline" size="lg">
              See How It Works
            </Button>
          </div>
          
          {/* Trust badges */}
          <div className="mt-10 flex items-center gap-6 text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <div className="flex items-center gap-2">
              <span className="font-bold text-foreground">50K+</span> Active Learners
            </div>
            <div className="h-4 w-px bg-border" />
            <div className="flex items-center gap-2">
              <span className="font-bold text-foreground">1000+</span> Teachers
            </div>
            <div className="h-4 w-px bg-border" />
            <div className="flex items-center gap-2">
              <span className="font-bold text-foreground">100+</span> Institutions
            </div>
          </div>
        </div>
        
        {/* Hero illustration */}
        <div className="mt-12 flex flex-1 items-center justify-center md:mt-0">
          <div className="relative animate-scale-in" style={{ animationDelay: '0.3s' }}>
            <div className="absolute inset-0 -z-10 rounded-3xl bg-primary/5 blur-2xl" />
            <img
  src="https://i.postimg.cc/k4kKT7Vp/hero-illustration-png.jpg"
  alt="Lumio adaptive learning illustration showing books, lightbulbs, and connected learning concepts"
  className="w-full max-w-xl animate-float rounded-3xl md:max-w-2xl lg:max-w-3xl"
/>


          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-in" style={{ animationDelay: '0.8s' }}>
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <span className="text-xs font-medium">Explore more</span>
          <div className="h-8 w-5 rounded-full border-2 border-muted-foreground/50 p-1">
            <div className="h-2 w-1.5 animate-bounce-gentle rounded-full bg-muted-foreground/50" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
