import { Button } from "@/components/ui/button";
import { GraduationCap, BookOpen, Building2, ArrowRight } from "lucide-react";

interface RoleCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  buttonText: string;
  variant: "student" | "teacher" | "institution";
  delay: string;
}

const RoleCard = ({ title, description, icon, buttonText, variant, delay }: RoleCardProps) => {
  const variantStyles = {
    student: {
      bg: "bg-lumio-teal-light",
      iconBg: "bg-primary",
      iconColor: "text-primary-foreground",
      button: "role-student" as const,
    },
    teacher: {
      bg: "bg-lumio-amber-light",
      iconBg: "bg-secondary",
      iconColor: "text-secondary-foreground",
      button: "role-teacher" as const,
    },
    institution: {
      bg: "bg-accent",
      iconBg: "bg-lumio-purple",
      iconColor: "text-primary-foreground",
      button: "role-institution" as const,
    },
  };

  const styles = variantStyles[variant];

  return (
    <div
      className={`group relative flex flex-col items-center rounded-3xl ${styles.bg} p-8 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-hover opacity-0 animate-fade-in-up`}
      style={{ animationDelay: delay }}
    >
      <div className={`mb-6 flex h-16 w-16 items-center justify-center rounded-2xl ${styles.iconBg} shadow-card transition-transform duration-300 group-hover:scale-110`}>
        <div className={styles.iconColor}>{icon}</div>
      </div>
      
      <h3 className="mb-3 text-2xl font-bold text-foreground">{title}</h3>
      <p className="mb-6 text-muted-foreground">{description}</p>
      
      <Button variant={styles.button} className="mt-auto gap-2">
        {buttonText}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Button>
    </div>
  );
};

const RoleSection = () => {
  return (
    <section className="bg-card py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-extrabold text-foreground md:text-4xl lg:text-5xl opacity-0 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Choose Your Path
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground opacity-0 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Whether you're here to learn, teach, or manage—Lumio adapts to your needs.
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-3 md:gap-8 lg:gap-10">
          <RoleCard
            title="I'm a Student"
            description="Personalized learning paths, adaptive quizzes, and mastery tracking to help you achieve your goals."
            icon={<GraduationCap className="h-8 w-8" />}
            buttonText="Start Learning"
            variant="student"
            delay="0.3s"
          />
          <RoleCard
            title="I'm a Teacher"
            description="Teach independently or within institutions. Track learner progress and create engaging content."
            icon={<BookOpen className="h-8 w-8" />}
            buttonText="Start Teaching"
            variant="teacher"
            delay="0.4s"
          />
          <RoleCard
            title="Institution"
            description="Manage instructors, students, and learning spaces. Get insights and scale your programs."
            icon={<Building2 className="h-8 w-8" />}
            buttonText="Get Started"
            variant="institution"
            delay="0.5s"
          />
        </div>
      </div>
    </section>
  );
};

export default RoleSection;