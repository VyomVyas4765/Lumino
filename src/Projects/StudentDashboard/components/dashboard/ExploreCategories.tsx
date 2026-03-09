import type { ComponentType } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart3, Brain, Code2, Cpu } from 'lucide-react';
import { useLearning } from '@/Projects/StudentDashboard/contexts/LearningContext';

const categoryMeta: Record<
  string,
  {
    icon: ComponentType<{ className?: string }>;
    style: string;
    chip: string;
  }
> = {
  'AI & ML': {
    icon: Brain,
    style: 'from-primary/25 to-primary/10 border-primary/30',
    chip: 'text-primary bg-primary/15',
  },
  Programming: {
    icon: Code2,
    style: 'from-accent/25 to-accent/10 border-accent/30',
    chip: 'text-accent bg-accent/15',
  },
  'Web Development': {
    icon: Cpu,
    style: 'from-secondary/25 to-secondary/10 border-secondary/30',
    chip: 'text-secondary bg-secondary/15',
  },
  'Data Science': {
    icon: BarChart3,
    style: 'from-success/25 to-success/10 border-success/30',
    chip: 'text-success bg-success/15',
  },
};

export function ExploreCategories() {
  const { lessons } = useLearning();

  const categories = Object.entries(
    lessons.reduce<Record<string, { total: number; completed: number }>>((acc, lesson) => {
      if (!acc[lesson.category]) {
        acc[lesson.category] = { total: 0, completed: 0 };
      }
      acc[lesson.category].total += 1;
      if (lesson.isCompleted) {
        acc[lesson.category].completed += 1;
      }
      return acc;
    }, {})
  );

  return (
    <section className="space-y-4 animate-slide-up">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-display font-semibold">Explore Categories</h2>
        <Link
          to="lessons"
          className="text-sm text-primary hover:text-primary-glow flex items-center gap-1 transition-colors"
        >
          See all subjects <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map(([category, stats]) => {
          const meta = categoryMeta[category] || categoryMeta['Programming'];
          const Icon = meta.icon;

          return (
            <Link
              key={category}
              to={`lessons?category=${encodeURIComponent(category)}`}
              className={`group rounded-2xl border bg-gradient-to-br ${meta.style} p-5 hover:shadow-card transition-all duration-300`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold mb-1">{category}</h3>
                  <p className="text-sm text-muted-foreground">
                    {stats.total} lesson{stats.total > 1 ? 's' : ''} available
                  </p>
                </div>
                <div className="w-11 h-11 rounded-xl bg-background/70 backdrop-blur flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${meta.chip}`}>
                  {stats.completed}/{stats.total} completed
                </span>
                <span className="text-sm font-medium text-primary flex items-center gap-1">
                  Explore <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
