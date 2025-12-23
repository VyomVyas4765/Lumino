import { Brain, Gauge, BarChart3, Target } from "lucide-react";

interface PhilosophyCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: string;
}

const PhilosophyCard = ({ icon, title, description, delay }: PhilosophyCardProps) => {
  return (
    <div
      className="group flex flex-col items-center rounded-2xl bg-card p-6 text-center shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card opacity-0 animate-fade-in-up"
      style={{ animationDelay: delay }}
    >
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-accent text-accent-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
        {icon}
      </div>
      <h3 className="mb-2 text-lg font-bold text-foreground">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
};

const PhilosophySection = () => {
  return (
    <section className="bg-muted py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground opacity-0 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Our Philosophy
          </span>
          <h2 className="mb-4 text-3xl font-extrabold text-foreground md:text-4xl lg:text-5xl opacity-0 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            How Lumio Works
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground opacity-0 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            We believe learning should feel natural. Lumio uses smart technology to make every lesson meaningful.
          </p>
        </div>
        
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <PhilosophyCard
            icon={<Brain className="h-6 w-6" />}
            title="Mastery Over Memorization"
            description="Focus on truly understanding concepts, not just passing tests. Learn at your own pace until you've mastered each topic."
            delay="0.4s"
          />
          <PhilosophyCard
            icon={<Gauge className="h-6 w-6" />}
            title="Adaptive Difficulty"
            description="Questions and content adjust in real-time based on your performance. Always challenged, never overwhelmed."
            delay="0.5s"
          />
          <PhilosophyCard
            icon={<BarChart3 className="h-6 w-6" />}
            title="Clear Progress Visibility"
            description="See exactly where you stand with intuitive dashboards. Track your growth and celebrate your achievements."
            delay="0.6s"
          />
          <PhilosophyCard
            icon={<Target className="h-6 w-6" />}
            title="Goal-Driven Engagement"
            description="Set meaningful goals and get feedback that keeps you motivated. Learn with purpose and see real results."
            delay="0.7s"
          />
        </div>
      </div>
    </section>
  );
};

export default PhilosophySection;