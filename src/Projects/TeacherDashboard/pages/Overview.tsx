import { useMemo } from "react";
import { Clock3, GraduationCap, MessageSquareText, TrendingUp } from "lucide-react";
import { useTeacher } from "../contexts/TeacherContext";

export default function TeacherOverviewPage() {
  const { lectures, students, feedback } = useTeacher();

  const avgRetention = useMemo(() => {
    if (!students.length) return 0;
    return Math.round(students.reduce((sum, s) => sum + s.retentionRate, 0) / students.length);
  }, [students]);

  const unresolvedReviews = feedback.filter((item) => !item.resolved).length;
  const atRiskStudents = students.filter((s) => s.risk === "high").length;

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-black tracking-tight">Teacher Dashboard</h1>
        <p className="text-slate-600 mt-1">Manage your content, monitor student retention, and improve outcomes.</p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard title="Lectures Uploaded" value={String(lectures.length)} icon={GraduationCap} />
        <StatCard title="Avg Retention" value={`${avgRetention}%`} icon={TrendingUp} />
        <StatCard title="Pending Feedback" value={String(unresolvedReviews)} icon={MessageSquareText} />
        <StatCard title="At-Risk Students" value={String(atRiskStudents)} icon={Clock3} />
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <div className="xl:col-span-2 rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="text-lg font-bold mb-4">Latest Uploaded Lectures</h2>
          {lectures.length === 0 ? (
            <p className="text-sm text-slate-500">No lectures uploaded yet. Use Content Library to add your first lecture.</p>
          ) : (
            <div className="space-y-3">
              {lectures.slice(0, 6).map((lecture) => (
                <div key={lecture.id} className="rounded-xl border border-slate-200 p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-semibold">{lecture.title}</p>
                      <p className="text-sm text-slate-500">{lecture.subject}</p>
                    </div>
                    <span className="text-xs rounded-full bg-emerald-100 text-emerald-700 px-2 py-1">
                      {new Date(lecture.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="text-lg font-bold mb-4">Student Risk Watch</h2>
          <div className="space-y-3">
            {students
              .slice()
              .sort((a, b) => a.retentionRate - b.retentionRate)
              .slice(0, 5)
              .map((student) => (
                <div key={student.id} className="rounded-xl border border-slate-200 p-3">
                  <p className="font-medium text-sm">{student.name}</p>
                  <p className="text-xs text-slate-500">Retention {student.retentionRate}%</p>
                </div>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon: Icon,
}: {
  title: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">{title}</p>
        <Icon className="w-4 h-4 text-emerald-600" />
      </div>
      <p className="mt-3 text-2xl font-black">{value}</p>
    </div>
  );
}
