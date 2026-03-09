import { useTeacher } from "../contexts/TeacherContext";

export default function TeacherStudentsPage() {
  const { students } = useTeacher();

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-black tracking-tight">Student Retention</h1>
        <p className="text-slate-600 mt-1">Track retention, engagement, and identify students who need intervention.</p>
      </header>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-500 border-b border-slate-200">
              <th className="pb-3 pr-4">Student</th>
              <th className="pb-3 pr-4">Retention</th>
              <th className="pb-3 pr-4">Engagement</th>
              <th className="pb-3 pr-4">Risk</th>
              <th className="pb-3">Last Active</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} className="border-b border-slate-100">
                <td className="py-3 pr-4 font-medium">{student.name}</td>
                <td className="py-3 pr-4">{student.retentionRate}%</td>
                <td className="py-3 pr-4">{student.engagementScore}/100</td>
                <td className="py-3 pr-4">
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-semibold ${
                      student.risk === "low"
                        ? "bg-emerald-100 text-emerald-700"
                        : student.risk === "medium"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-rose-100 text-rose-700"
                    }`}
                  >
                    {student.risk}
                  </span>
                </td>
                <td className="py-3">{new Date(student.lastActive).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
