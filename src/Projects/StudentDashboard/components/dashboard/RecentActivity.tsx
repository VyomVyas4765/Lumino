import { CheckCircle, BookOpen, Trophy, Flame, Clock } from 'lucide-react';

import { useLearning } from '@/Projects/StudentDashboard/contexts/LearningContext';

const colorClasses: Record<string, { bg: string; text: string }> = {
  success: { bg: 'bg-success/10', text: 'text-success' },
  xp: { bg: 'bg-xp/10', text: 'text-xp' },
  streak: { bg: 'bg-streak/10', text: 'text-streak' },
  primary: { bg: 'bg-primary/10', text: 'text-primary' },
};

const eventConfig = {
  lesson_completed: {
    icon: CheckCircle,
    color: 'success',
  },
  lesson_started: {
    icon: BookOpen,
    color: 'primary',
  },
  xp_earned: {
    icon: Trophy,
    color: 'xp',
  },
  streak: {
    icon: Flame,
    color: 'streak',
  },
} as const;

const timeAgo = (isoTime: string) => {
  const then = new Date(isoTime).getTime();
  const now = Date.now();
  const diffMs = Math.max(0, now - then);

  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins} minute${mins === 1 ? '' : 's'} ago`;

  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'} ago`;

  const days = Math.floor(hours / 24);
  return `${days} day${days === 1 ? '' : 's'} ago`;
};

export function RecentActivity() {
  const { recentEvents } = useLearning();

  return (
    <section className="space-y-4 animate-slide-up stagger-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-display font-semibold">Recent Activity</h2>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Clock className="w-4 h-4" />
          Live feed
        </div>
      </div>

      <div className="glass-card rounded-2xl divide-y divide-border">
        {recentEvents.length === 0 ? (
          <div className="p-6 text-sm text-muted-foreground">
            No activity yet. Start a lesson to see your live activity feed.
          </div>
        ) : (
          recentEvents.slice(0, 8).map((activity, index) => {
            const config = eventConfig[activity.type];
            const colors = colorClasses[config.color];
            const Icon = config.icon;

            return (
              <div
                key={activity.id}
                className="p-4 flex items-center gap-4 hover:bg-muted/30 transition-colors"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className={`w-10 h-10 rounded-xl ${colors.bg} flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 ${colors.text}`} />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{activity.title}</p>
                  <p className="text-xs text-muted-foreground">{timeAgo(activity.timestamp)}</p>
                </div>

                <div className="text-right shrink-0">
                  {activity.xp > 0 ? (
                    <span className="text-sm font-semibold text-xp">+{activity.xp} XP</span>
                  ) : (
                    <span className="text-xs text-muted-foreground">Tracked</span>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
