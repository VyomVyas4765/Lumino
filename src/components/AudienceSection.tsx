import { Check, GraduationCap, BookOpen, Building2 } from "lucide-react";

interface AudienceCardProps {
  icon: React.ReactNode;
  title: string;
  features: string[];
  delay: string;
}

const AudienceCard = ({ icon, title, features, delay }: AudienceCardProps) => {
  return (
    <div
      className="rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-card opacity-0 animate-fade-in-up"
      style={{ animationDelay: delay }}
    >
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-accent-foreground">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-foreground">{title}</h3>
      </div>
      
      <ul className="space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3 text-muted-foreground">
            <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const AudienceSection = () => {
  return (
    <section className="bg-card py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-extrabold text-foreground md:text-4xl lg:text-5xl opacity-0 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Who Lumio Is For
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground opacity-0 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Designed for everyone in the learning journey.
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-3">
          <AudienceCard
            icon={<GraduationCap className="h-6 w-6" />}
            title="Students"
            features={[
              "Personalized learning paths",
              "Adaptive quizzes that grow with you",
              "Track mastery, not just scores",
              "Learn anytime, anywhere",
            ]}
            delay="0.3s"
          />
          <AudienceCard
            icon={<BookOpen className="h-6 w-6" />}
            title="Teachers"
            features={[
              "Create and share courses easily",
              "Real-time learner analytics",
              "Teach independently or with institutions",
              "Build your reputation and reach",
            ]}
            delay="0.4s"
          />
          <AudienceCard
            icon={<Building2 className="h-6 w-6" />}
            title="Institutions"
            features={[
              "Manage multiple instructors and students",
              "Branded learning spaces",
              "Comprehensive reporting dashboards",
              "Scale your educational programs",
            ]}
            delay="0.5s"
          />
        </div>
      </div>
    </section>
  );
};

export default AudienceSection;