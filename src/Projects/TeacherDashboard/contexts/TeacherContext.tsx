import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { AUTH_CHANGE_EVENT, getSessionUser } from "@/lib/auth";

export type TeacherLecture = {
  id: string;
  title: string;
  subject: string;
  description: string;
  videoUrl: string;
  notes: string;
  resources: string[];
  createdAt: string;
  views: number;
  avgWatchMins: number;
};

export type StudentRetention = {
  id: string;
  name: string;
  retentionRate: number;
  engagementScore: number;
  lastActive: string;
  risk: "low" | "medium" | "high";
};

export type StudentFeedback = {
  id: string;
  studentName: string;
  course: string;
  rating: number;
  comment: string;
  createdAt: string;
  resolved: boolean;
};

type TeacherStore = {
  lectures: TeacherLecture[];
  students: StudentRetention[];
  feedback: StudentFeedback[];
};

type AddLectureInput = {
  title: string;
  subject: string;
  description: string;
  videoUrl: string;
  notes: string;
  resources: string[];
};

type TeacherContextType = {
  lectures: TeacherLecture[];
  students: StudentRetention[];
  feedback: StudentFeedback[];
  addLecture: (input: AddLectureInput) => void;
  deleteLecture: (lectureId: string) => void;
  markFeedbackResolved: (feedbackId: string) => void;
};

const TeacherContext = createContext<TeacherContextType | undefined>(undefined);

const getStorageKey = (userId: string) => `lumio_teacher_v1_${userId}`;

const isoDateDaysAgo = (daysAgo: number) => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString();
};

const initialStudents: StudentRetention[] = [
  { id: "s1", name: "Aarav Gupta", retentionRate: 92, engagementScore: 88, lastActive: isoDateDaysAgo(0), risk: "low" },
  { id: "s2", name: "Mia Johnson", retentionRate: 84, engagementScore: 79, lastActive: isoDateDaysAgo(1), risk: "low" },
  { id: "s3", name: "Noah Williams", retentionRate: 68, engagementScore: 61, lastActive: isoDateDaysAgo(2), risk: "medium" },
  { id: "s4", name: "Anaya Sharma", retentionRate: 55, engagementScore: 52, lastActive: isoDateDaysAgo(3), risk: "high" },
  { id: "s5", name: "Lucas Brown", retentionRate: 73, engagementScore: 70, lastActive: isoDateDaysAgo(1), risk: "medium" },
];

const initialFeedback: StudentFeedback[] = [
  {
    id: "f1",
    studentName: "Aarav Gupta",
    course: "Introduction to Machine Learning",
    rating: 5,
    comment: "Loved the examples and pace. Could use one more practice quiz.",
    createdAt: isoDateDaysAgo(0),
    resolved: false,
  },
  {
    id: "f2",
    studentName: "Mia Johnson",
    course: "React Components and Props",
    rating: 4,
    comment: "Great lecture. Please add downloadable summary notes.",
    createdAt: isoDateDaysAgo(2),
    resolved: false,
  },
  {
    id: "f3",
    studentName: "Noah Williams",
    course: "Data Structures Essentials",
    rating: 3,
    comment: "Good content, but I need slower walkthroughs for recursion.",
    createdAt: isoDateDaysAgo(4),
    resolved: true,
  },
];

const createDefaultStore = (): TeacherStore => ({
  lectures: [],
  students: initialStudents,
  feedback: initialFeedback,
});

const loadStore = (userId: string): TeacherStore => {
  if (typeof window === "undefined") return createDefaultStore();

  const raw = window.localStorage.getItem(getStorageKey(userId));
  if (!raw) return createDefaultStore();

  try {
    const parsed = JSON.parse(raw) as TeacherStore;
    return {
      lectures: Array.isArray(parsed.lectures) ? parsed.lectures : [],
      students: Array.isArray(parsed.students) ? parsed.students : initialStudents,
      feedback: Array.isArray(parsed.feedback) ? parsed.feedback : initialFeedback,
    };
  } catch {
    return createDefaultStore();
  }
};

export function TeacherProvider({ children }: { children: ReactNode }) {
  const [activeUserId, setActiveUserId] = useState<string>(() => getSessionUser()?.id || "guest");

  const [lectures, setLectures] = useState<TeacherLecture[]>([]);
  const [students, setStudents] = useState<StudentRetention[]>(initialStudents);
  const [feedback, setFeedback] = useState<StudentFeedback[]>(initialFeedback);
  const [hydratedForUser, setHydratedForUser] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const syncActiveUser = () => {
      setActiveUserId(getSessionUser()?.id || "guest");
    };

    window.addEventListener(AUTH_CHANGE_EVENT, syncActiveUser);
    window.addEventListener("storage", syncActiveUser);

    return () => {
      window.removeEventListener(AUTH_CHANGE_EVENT, syncActiveUser);
      window.removeEventListener("storage", syncActiveUser);
    };
  }, []);

  useEffect(() => {
    setHydratedForUser(null);
    const loaded = loadStore(activeUserId);
    setLectures(loaded.lectures);
    setStudents(loaded.students);
    setFeedback(loaded.feedback);
    setHydratedForUser(activeUserId);
  }, [activeUserId]);

  useEffect(() => {
    if (hydratedForUser !== activeUserId) return;

    const data: TeacherStore = {
      lectures,
      students,
      feedback,
    };

    window.localStorage.setItem(getStorageKey(activeUserId), JSON.stringify(data));
  }, [activeUserId, lectures, students, feedback, hydratedForUser]);

  const addLecture = (input: AddLectureInput) => {
    const nextLecture: TeacherLecture = {
      id: crypto.randomUUID(),
      title: input.title,
      subject: input.subject,
      description: input.description,
      videoUrl: input.videoUrl,
      notes: input.notes,
      resources: input.resources,
      createdAt: new Date().toISOString(),
      views: 0,
      avgWatchMins: 0,
    };

    setLectures((prev) => [nextLecture, ...prev]);
  };

  const deleteLecture = (lectureId: string) => {
    setLectures((prev) => prev.filter((lecture) => lecture.id !== lectureId));
  };

  const markFeedbackResolved = (feedbackId: string) => {
    setFeedback((prev) =>
      prev.map((item) =>
        item.id === feedbackId ? { ...item, resolved: true } : item
      )
    );
  };

  const value = useMemo(
    () => ({
      lectures,
      students,
      feedback,
      addLecture,
      deleteLecture,
      markFeedbackResolved,
    }),
    [lectures, students, feedback]
  );

  return <TeacherContext.Provider value={value}>{children}</TeacherContext.Provider>;
}

export function useTeacher() {
  const context = useContext(TeacherContext);
  if (!context) {
    throw new Error("useTeacher must be used within TeacherProvider");
  }
  return context;
}
