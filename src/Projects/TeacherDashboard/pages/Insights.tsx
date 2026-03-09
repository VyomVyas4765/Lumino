import { useMemo } from "react";
import { useTeacher } from "../contexts/TeacherContext";

export default function TeacherInsightsPage() {
  const { lectures, students, feedback } = useTeacher();

  const avgRating = useMemo(() => {
    if (!feedback.length) return 0;
    return (
      feedback.reduce((sum, item) => sum + item.rating, 0) / feedback.length
    ).toFixed(1);
  }, [feedback]);

  const subjectBreakdown = useMemo(() => {
    return lectures.reduce<Record<string, number>>((acc, lecture) => {
      acc[lecture.subject] = (acc[lecture.subject] || 0) + 1;
      return acc;
    }, {});
  }, [lectures]);

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-black tracking-tight">Teaching Insights</h1>
        <p className="text-slate-600 mt-1">A high-level snapshot to refine content and student outcomes.</p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card title="Average Review Rating" value={`${avgRating}/5`} />
        <Card title="Students Tracked" value={String(students.length)} />
        <Card title="Lectures Published" value={String(lectures.length)} />
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-bold mb-4">Lecture Distribution by Subject</h2>
        {Object.keys(subjectBreakdown).length === 0 ? (
          <p className="text-sm text-slate-500">Upload lectures to see subject-level analytics.</p>
        ) : (
          <div className="space-y-3">
            {Object.entries(subjectBreakdown).map(([subject, count]) => (
              <div key={subject}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{subject}</span>
                  <span>{count}</span>
                </div>
                <div className="h-2 rounded-full bg-slate-100">
                  <div
                    className="h-2 rounded-full bg-emerald-500"
                    style={{ width: `${Math.max(10, (count / Math.max(1, lectures.length)) * 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function Card({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <p className="text-sm text-slate-500">{title}</p>
      <p className="text-2xl font-black mt-2">{value}</p>
    </div>
  );
}
