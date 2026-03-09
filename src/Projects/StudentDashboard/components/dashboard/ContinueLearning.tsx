import { Link } from 'react-router-dom';
import { Play, Clock, ArrowRight } from 'lucide-react';
import { useLearning } from '@/Projects/StudentDashboard/contexts/LearningContext';
import { Button } from '@/Projects/StudentDashboard/components/ui/button';

export function ContinueLearning() {
  const { lessons } = useLearning();

  const inProgressLessons = lessons
    .filter((l) => l.progress > 0 && !l.isCompleted)
    .sort((a, b) => b.progress - a.progress)
    .slice(0, 2);

  const completedLessons = lessons
    .filter((l) => l.isCompleted)
    .sort((a, b) => b.progress - a.progress);

  const hasInProgress = inProgressLessons.length > 0;
  const hasCompleted = completedLessons.length > 0;

  if (!hasInProgress && !hasCompleted) {
    return null;
  }

  const mainLesson = hasInProgress ? inProgressLessons[0] : completedLessons[0];
  const sideLessons = hasInProgress ? inProgressLessons.slice(1) : completedLessons.slice(1, 2);

  return (
    <section className="space-y-4 animate-slide-up">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-display font-semibold">Continue Learning</h2>

        <Link
          to="lessons"
          className="text-sm text-primary hover:text-primary-glow flex items-center gap-1 transition-colors"
        >
          View all <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Link
          to={`learn/${mainLesson.id}`}
          className="lg:col-span-2 group relative overflow-hidden rounded-2xl glass-card hover:shadow-glow-primary transition-all duration-300"
        >
          {mainLesson.thumbnail ? (
            <img
              src={mainLesson.thumbnail}
              alt={`${mainLesson.title} thumbnail`}
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : null}
          <div className="absolute inset-0 bg-slate-950/45" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity" />

          <div className="relative p-6 flex flex-col h-full min-h-[240px] text-white">
            <div className="flex items-start justify-between mb-4">
              <span className="px-3 py-1 rounded-full bg-primary/35 text-white text-xs font-medium">
                {mainLesson.category}
              </span>
              <div className="flex items-center gap-1 text-xs text-white/80">
                <Clock className="w-3 h-3" />
                {mainLesson.duration}
              </div>
            </div>

            <div className="flex-1">
              <h3 className="text-2xl font-display font-bold mb-2 group-hover:text-primary-foreground transition-all">
                {mainLesson.title}
              </h3>
              <p className="text-white/85 text-sm line-clamp-2">{mainLesson.description}</p>
            </div>

            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/80">Progress</span>
                <span className="font-semibold text-primary-foreground">{mainLesson.progress}%</span>
              </div>
              <div className="h-2 bg-white/25 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-primary rounded-full transition-all duration-500"
                  style={{ width: `${mainLesson.progress}%` }}
                />
              </div>
            </div>

            <Button className="mt-4 bg-gradient-primary hover:opacity-90 gap-2 w-full">
              <Play className="w-4 h-4" />
              {mainLesson.isCompleted ? 'Review Lesson' : 'Continue Lesson'}
            </Button>
          </div>
        </Link>

        <div className="space-y-4">
          {sideLessons.map((lesson) => (
            <Link
              key={lesson.id}
              to={`learn/${lesson.id}`}
              className="block group glass-card rounded-xl p-4 hover:shadow-card transition-all duration-300 relative overflow-hidden"
            >
              {lesson.thumbnail ? (
                <img
                  src={lesson.thumbnail}
                  alt={`${lesson.title} thumbnail`}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : null}
              <div className="absolute inset-0 bg-slate-950/45" />

              <div className="relative flex items-start gap-3 text-white">
                <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Play className="w-5 h-5 text-primary-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm truncate group-hover:text-primary-foreground transition-colors">
                    {lesson.title}
                  </h4>
                  <p className="text-xs text-white/80">{lesson.category}</p>
                  {lesson.isCompleted ? (
                    <p className="mt-2 text-xs text-emerald-200 font-medium">Completed</p>
                  ) : (
                    <div className="mt-2 h-1.5 bg-white/25 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-primary rounded-full"
                        style={{ width: `${lesson.progress}%` }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}

          <Link
            to="lessons"
            className="block glass-card rounded-xl p-4 border-2 border-dashed border-muted-foreground/20 hover:border-primary/50 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">Start New Lesson</h4>
                <p className="text-xs text-muted-foreground">Explore more topics</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
