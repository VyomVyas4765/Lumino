import React, { createContext, useContext, useEffect, useMemo, useState, ReactNode } from 'react';
import { AUTH_CHANGE_EVENT, getSessionUser } from '@/lib/auth';

interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: string;
  thumbnail: string;
  videoUrl: string;
  category: string;
  progress: number;
  isCompleted: boolean;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlockedAt?: Date;
  isUnlocked: boolean;
}

interface Badge {
  id: string;
  title: string;
  icon: string;
  color: string;
  isEarned: boolean;
}

interface UserProgress {
  xp: number;
  level: number;
  streak: number;
  lessonsCompleted: number;
  totalLessons: number;
  weeklyGoal: number;
  weeklyProgress: number;
}

export interface DailyActivity {
  date: string;
  xp: number;
  lessons: number;
}

export interface RecentEvent {
  id: string;
  type: 'lesson_started' | 'lesson_completed' | 'xp_earned' | 'streak';
  title: string;
  xp: number;
  timestamp: string;
}

interface LearningContextType {
  lessons: Lesson[];
  achievements: Achievement[];
  badges: Badge[];
  userProgress: UserProgress;
  currentLesson: Lesson | null;
  setCurrentLesson: (lesson: Lesson | null) => void;
  updateLessonProgress: (lessonId: string, progress: number) => void;
  addXp: (amount: number) => void;
  setWeeklyGoal: (goal: number) => void;
  weeklyActivity: DailyActivity[];
  recentEvents: RecentEvent[];
}

type LearningStore = {
  lessons: Lesson[];
  userProgress: UserProgress;
  lastActivityDate: string | null;
  activityByDate: Record<string, { xp: number; lessons: number }>;
  recentEvents: RecentEvent[];
};

const LearningContext = createContext<LearningContextType | undefined>(undefined);

const getYoutubeThumbnail = (videoUrl: string) => {
  const match = videoUrl.match(/embed\/([^?&/]+)/);
  const videoId = match?.[1];
  return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : '';
};

const lessonTemplates = [
  {
    id: '1',
    title: 'Introduction to Machine Learning',
    description: 'Learn the fundamentals of ML and how algorithms learn from data.',
    duration: '15:30',
    videoUrl: 'https://www.youtube.com/embed/ukzFI9rgwfU',
    category: 'AI & ML',
  },
  {
    id: '2',
    title: 'Neural Networks Deep Dive',
    description: 'Understanding how neural networks process and learn information.',
    duration: '22:45',
    videoUrl: 'https://www.youtube.com/embed/aircAruvnKk',
    category: 'AI & ML',
  },
  {
    id: '3',
    title: 'Data Structures Essentials',
    description: 'Master arrays, linked lists, trees, and graphs.',
    duration: '18:20',
    videoUrl: 'https://www.youtube.com/embed/RBSGKlAvoiM',
    category: 'Programming',
  },
  {
    id: '4',
    title: 'React Hooks Mastery',
    description: 'Advanced patterns with useState, useEffect, and custom hooks.',
    duration: '25:00',
    videoUrl: 'https://www.youtube.com/embed/TNhaISOUy6Q',
    category: 'Web Development',
  },
  {
    id: '5',
    title: 'Python for Data Science',
    description: 'Data manipulation and visualization with Python.',
    duration: '20:15',
    videoUrl: 'https://www.youtube.com/embed/LHBE6Q9XlzI',
    category: 'Data Science',
  },
  {
    id: '6',
    title: 'Supervised vs Unsupervised Learning',
    description: 'Understand core ML learning paradigms with clear examples.',
    duration: '17:40',
    videoUrl: 'https://www.youtube.com/embed/te2e2T9QXfY',
    category: 'AI & ML',
  },
  {
    id: '7',
    title: 'Model Evaluation Metrics',
    description: 'Learn accuracy, precision, recall, F1 score, and confusion matrix.',
    duration: '19:10',
    videoUrl: 'https://www.youtube.com/embed/85dtiMz9tSo',
    category: 'AI & ML',
  },
  {
    id: '8',
    title: 'JavaScript Fundamentals',
    description: 'Master variables, functions, arrays, and objects in JavaScript.',
    duration: '23:35',
    videoUrl: 'https://www.youtube.com/embed/W6NZfCO5SIk',
    category: 'Programming',
  },
  {
    id: '9',
    title: 'Object-Oriented Programming Basics',
    description: 'Classes, objects, inheritance, and encapsulation made simple.',
    duration: '21:00',
    videoUrl: 'https://www.youtube.com/embed/pTB0EiLXUC8',
    category: 'Programming',
  },
  {
    id: '10',
    title: 'Git and GitHub Crash Course',
    description: 'Track changes, branch safely, and collaborate with pull requests.',
    duration: '18:25',
    videoUrl: 'https://www.youtube.com/embed/RGOj5yH7evk',
    category: 'Programming',
  },
  {
    id: '11',
    title: 'Responsive Web Design Essentials',
    description: 'Build layouts that adapt beautifully across screen sizes.',
    duration: '16:50',
    videoUrl: 'https://www.youtube.com/embed/srvUrASNj0s',
    category: 'Web Development',
  },
  {
    id: '12',
    title: 'Modern CSS Layouts with Flexbox and Grid',
    description: 'Create robust page structures with modern CSS tools.',
    duration: '22:05',
    videoUrl: 'https://www.youtube.com/embed/JJSoEo8JSnc',
    category: 'Web Development',
  },
  {
    id: '13',
    title: 'React Components and Props',
    description: 'Understand reusable UI architecture with props and composition.',
    duration: '19:55',
    videoUrl: 'https://www.youtube.com/embed/Ke90Tje7VS0',
    category: 'Web Development',
  },
  {
    id: '14',
    title: 'SQL for Beginners',
    description: 'Query structured data using SELECT, WHERE, JOIN, and GROUP BY.',
    duration: '24:20',
    videoUrl: 'https://www.youtube.com/embed/HXV3zeQKqGY',
    category: 'Data Science',
  },
  {
    id: '15',
    title: 'Data Visualization Basics',
    description: 'Choose the right chart and communicate insights effectively.',
    duration: '15:45',
    videoUrl: 'https://www.youtube.com/embed/a9UrKTVEeZA',
    category: 'Data Science',
  },
  {
    id: '16',
    title: 'Statistics for Machine Learning',
    description: 'Build intuition for probability, distributions, and hypothesis testing.',
    duration: '20:35',
    videoUrl: 'https://www.youtube.com/embed/xxpc-HPKN28',
    category: 'Data Science',
  },
] as const;

const createDefaultLessons = (): Lesson[] =>
  lessonTemplates.map((lesson) => ({
    ...lesson,
    thumbnail: getYoutubeThumbnail(lesson.videoUrl),
    progress: 0,
    isCompleted: false,
  }));

const createDefaultUserProgress = (totalLessons: number): UserProgress => ({
  xp: 0,
  level: 1,
  streak: 0,
  lessonsCompleted: 0,
  totalLessons,
  weeklyGoal: 5,
  weeklyProgress: 0,
});

const createDefaultStore = (): LearningStore => {
  const lessons = createDefaultLessons();
  return {
    lessons,
    userProgress: createDefaultUserProgress(lessons.length),
    lastActivityDate: null,
    activityByDate: {},
    recentEvents: [],
  };
};

const mockAchievements: Achievement[] = [
  {
    id: '1',
    title: 'First Steps',
    description: 'Complete your first lesson',
    icon: '\u{1F3AF}',
    rarity: 'common',
    isUnlocked: true,
    unlockedAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    title: 'Week Warrior',
    description: 'Maintain a 7-day learning streak',
    icon: '\u{1F525}',
    rarity: 'rare',
    isUnlocked: true,
    unlockedAt: new Date('2024-01-20'),
  },
  {
    id: '3',
    title: 'Knowledge Seeker',
    description: 'Complete 10 lessons',
    icon: '\u{1F4DA}',
    rarity: 'rare',
    isUnlocked: false,
  },
  {
    id: '4',
    title: 'AI Pioneer',
    description: 'Complete all AI & ML courses',
    icon: '\u{1F916}',
    rarity: 'epic',
    isUnlocked: false,
  },
  {
    id: '5',
    title: 'Coding Legend',
    description: 'Reach Level 50',
    icon: '\u{1F451}',
    rarity: 'legendary',
    isUnlocked: false,
  },
];

const mockBadges: Badge[] = [
  { id: '1', title: 'Quick Learner', icon: '\u{26A1}', color: 'primary', isEarned: true },
  { id: '2', title: 'Night Owl', icon: '\u{1F989}', color: 'accent', isEarned: true },
  { id: '3', title: 'Perfectionist', icon: '\u{1F48E}', color: 'secondary', isEarned: false },
  { id: '4', title: 'Team Player', icon: '\u{1F91D}', color: 'success', isEarned: false },
  { id: '5', title: 'Explorer', icon: '\u{1F9ED}', color: 'lesson', isEarned: true },
];

const getStorageKey = (userId: string) => `lumio_learning_v1_${userId}`;

const getTodayStamp = () => new Date().toISOString().slice(0, 10);

const getDateStampDaysAgo = (daysAgo: number) => {
  const day = new Date();
  day.setDate(day.getDate() - daysAgo);
  return day.toISOString().slice(0, 10);
};

const getPreviousDayStamp = () => {
  const now = new Date();
  now.setDate(now.getDate() - 1);
  return now.toISOString().slice(0, 10);
};

const getWeeklyLessonsFromActivity = (
  activityByDate: Record<string, { xp: number; lessons: number }>
) => {
  let total = 0;
  for (let i = 0; i < 7; i += 1) {
    const key = getDateStampDaysAgo(i);
    total += activityByDate[key]?.lessons || 0;
  }
  return total;
};

const pushRecentEvent = (
  setRecentEvents: React.Dispatch<React.SetStateAction<RecentEvent[]>>,
  event: Omit<RecentEvent, 'id' | 'timestamp'>
) => {
  const nextEvent: RecentEvent = {
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
    ...event,
  };

  setRecentEvents((prev) => [nextEvent, ...prev].slice(0, 40));
};

const loadStore = (userId: string): LearningStore => {
  if (typeof window === 'undefined') return createDefaultStore();

  const raw = window.localStorage.getItem(getStorageKey(userId));
  if (!raw) return createDefaultStore();

  try {
    const parsed = JSON.parse(raw) as LearningStore;
    const fallback = createDefaultStore();

    const lessons = Array.isArray(parsed.lessons)
      ? (() => {
          const savedById = new Map(
            parsed.lessons.map((lesson) => [
              lesson.id,
              {
                ...lesson,
                progress: Number.isFinite(lesson.progress)
                  ? Math.max(0, Math.min(100, lesson.progress))
                  : 0,
                isCompleted: Boolean(lesson.isCompleted),
              },
            ])
          );

          return fallback.lessons.map((templateLesson) => {
            const saved = savedById.get(templateLesson.id);
            return saved
              ? {
                  ...templateLesson,
                  progress: saved.progress,
                  isCompleted: saved.isCompleted,
                }
              : templateLesson;
          });
        })()
      : fallback.lessons;

    const totalLessons = lessons.length;

    const userProgress: UserProgress = {
      xp: Number.isFinite(parsed.userProgress?.xp) ? Math.max(0, parsed.userProgress.xp) : 0,
      level: Number.isFinite(parsed.userProgress?.level) ? Math.max(1, parsed.userProgress.level) : 1,
      streak: Number.isFinite(parsed.userProgress?.streak) ? Math.max(0, parsed.userProgress.streak) : 0,
      lessonsCompleted: Number.isFinite(parsed.userProgress?.lessonsCompleted)
        ? Math.max(0, parsed.userProgress.lessonsCompleted)
        : lessons.filter((l) => l.isCompleted).length,
      totalLessons,
      weeklyGoal: Number.isFinite(parsed.userProgress?.weeklyGoal)
        ? Math.max(1, parsed.userProgress.weeklyGoal)
        : 5,
      weeklyProgress: Number.isFinite(parsed.userProgress?.weeklyProgress)
        ? Math.max(0, parsed.userProgress.weeklyProgress)
        : 0,
    };

    return {
      lessons,
      userProgress,
      lastActivityDate: parsed.lastActivityDate || null,
      activityByDate:
        parsed.activityByDate && typeof parsed.activityByDate === 'object'
          ? parsed.activityByDate
          : {},
      recentEvents: Array.isArray(parsed.recentEvents) ? parsed.recentEvents : [],
    };
  } catch {
    return createDefaultStore();
  }
};

const saveStore = (userId: string, store: LearningStore) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(getStorageKey(userId), JSON.stringify(store));
};

export function LearningProvider({ children }: { children: ReactNode }) {
  const [activeUserId, setActiveUserId] = useState<string>(() => getSessionUser()?.id || 'guest');

  const [lessons, setLessons] = useState<Lesson[]>(createDefaultStore().lessons);
  const [achievements] = useState<Achievement[]>(mockAchievements);
  const [badges] = useState<Badge[]>(mockBadges);
  const [userProgress, setUserProgress] = useState<UserProgress>(
    createDefaultStore().userProgress
  );
  const [lastActivityDate, setLastActivityDate] = useState<string | null>(null);
  const [activityByDate, setActivityByDate] = useState<Record<string, { xp: number; lessons: number }>>({});
  const [recentEvents, setRecentEvents] = useState<RecentEvent[]>([]);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [hydratedUserId, setHydratedUserId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const syncActiveUser = () => {
      setActiveUserId(getSessionUser()?.id || 'guest');
    };

    window.addEventListener(AUTH_CHANGE_EVENT, syncActiveUser);
    window.addEventListener('storage', syncActiveUser);

    return () => {
      window.removeEventListener(AUTH_CHANGE_EVENT, syncActiveUser);
      window.removeEventListener('storage', syncActiveUser);
    };
  }, []);

  useEffect(() => {
    setHydratedUserId(null);
    const loaded = loadStore(activeUserId);
    setLessons(loaded.lessons);
    setUserProgress(loaded.userProgress);
    setLastActivityDate(loaded.lastActivityDate);
    setActivityByDate(loaded.activityByDate || {});
    setRecentEvents(Array.isArray(loaded.recentEvents) ? loaded.recentEvents : []);
    setCurrentLesson(null);
    setHydratedUserId(activeUserId);
  }, [activeUserId]);

  useEffect(() => {
    if (hydratedUserId !== activeUserId) return;

    saveStore(activeUserId, {
      lessons,
      userProgress,
      lastActivityDate,
      activityByDate,
      recentEvents,
    });
  }, [activeUserId, lessons, userProgress, lastActivityDate, activityByDate, recentEvents, hydratedUserId]);

  const weeklyActivity = useMemo<DailyActivity[]>(() => {
    return Array.from({ length: 7 }).map((_, index) => {
      const daysAgo = 6 - index;
      const date = getDateStampDaysAgo(daysAgo);
      const values = activityByDate[date] || { xp: 0, lessons: 0 };
      return { date, xp: values.xp, lessons: values.lessons };
    });
  }, [activityByDate]);

  useEffect(() => {
    setUserProgress((prev) => {
      const computed = Math.min(prev.weeklyGoal, getWeeklyLessonsFromActivity(activityByDate));
      if (computed === prev.weeklyProgress) return prev;
      return { ...prev, weeklyProgress: computed };
    });
  }, [activityByDate]);

  const updateLessonProgress = (lessonId: string, progress: number) => {
    const safeProgress = Math.max(0, Math.min(100, progress));

    setLessons((prevLessons) => {
      let didAdvance = false;
      let startedLesson = false;
      let markedCompleted = false;
      let changedLessonTitle = '';

      const updatedLessons = prevLessons.map((lesson) => {
        if (lesson.id !== lessonId) return lesson;

        didAdvance = safeProgress > lesson.progress;
        startedLesson = lesson.progress === 0 && safeProgress > 0;
        markedCompleted = !lesson.isCompleted && safeProgress >= 100;
        changedLessonTitle = lesson.title;

        return {
          ...lesson,
          progress: safeProgress,
          isCompleted: safeProgress >= 100,
        };
      });

      const lessonsCompleted = updatedLessons.filter((lesson) => lesson.isCompleted).length;

      setUserProgress((prevProgress) => {
        let nextStreak = prevProgress.streak;
        let streakIncreased = false;

        if (didAdvance) {
          const today = getTodayStamp();
          if (lastActivityDate !== today) {
            if (lastActivityDate === getPreviousDayStamp()) {
              nextStreak += 1;
              streakIncreased = true;
            } else {
              nextStreak = 1;
              streakIncreased = true;
            }
            setLastActivityDate(today);
          }
        }

        if (streakIncreased) {
          pushRecentEvent(setRecentEvents, {
            type: 'streak',
            title: `Extended learning streak to ${nextStreak} day${nextStreak === 1 ? '' : 's'}!`,
            xp: 0,
          });
        }

        return {
          ...prevProgress,
          lessonsCompleted,
          totalLessons: updatedLessons.length,
          streak: nextStreak,
        };
      });

      if (startedLesson) {
        pushRecentEvent(setRecentEvents, {
          type: 'lesson_started',
          title: `Started "${changedLessonTitle}"`,
          xp: 0,
        });
      }

      if (markedCompleted) {
        const today = getTodayStamp();
        setActivityByDate((prev) => {
          const current = prev[today] || { xp: 0, lessons: 0 };
          const updated = {
            ...prev,
            [today]: {
              xp: current.xp,
              lessons: current.lessons + 1,
            },
          };

          setUserProgress((prevProgress) => ({
            ...prevProgress,
            weeklyProgress: Math.min(
              prevProgress.weeklyGoal,
              getWeeklyLessonsFromActivity(updated)
            ),
          }));

          return updated;
        });

        pushRecentEvent(setRecentEvents, {
          type: 'lesson_completed',
          title: `Completed "${changedLessonTitle}"`,
          xp: 0,
        });
      }

      return updatedLessons;
    });
  };

  const addXp = (amount: number) => {
    setUserProgress((prev) => {
      const newXp = prev.xp + amount;
      const xpPerLevel = 500;
      const newLevel = Math.floor(newXp / xpPerLevel) + 1;
      return { ...prev, xp: newXp, level: newLevel };
    });

    const today = getTodayStamp();
    setActivityByDate((prev) => {
      const current = prev[today] || { xp: 0, lessons: 0 };
      return {
        ...prev,
        [today]: {
          xp: current.xp + amount,
          lessons: current.lessons,
        },
      };
    });

    pushRecentEvent(setRecentEvents, {
      type: 'xp_earned',
      title: `Earned ${amount} XP`,
      xp: amount,
    });
  };

  const setWeeklyGoal = (goal: number) => {
    setUserProgress((prev) => ({
      ...prev,
      weeklyGoal: goal,
      weeklyProgress: Math.min(getWeeklyLessonsFromActivity(activityByDate), goal),
    }));
  };

  return (
    <LearningContext.Provider
      value={{
        lessons,
        achievements,
        badges,
        userProgress,
        currentLesson,
        setCurrentLesson,
        updateLessonProgress,
        addXp,
        setWeeklyGoal,
        weeklyActivity,
        recentEvents,
      }}
    >
      {children}
    </LearningContext.Provider>
  );
}

export function useLearning() {
  const context = useContext(LearningContext);
  if (context === undefined) {
    throw new Error('useLearning must be used within a LearningProvider');
  }
  return context;
}
