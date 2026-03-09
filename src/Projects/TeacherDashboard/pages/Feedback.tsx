import { CheckCircle2, MessageSquare } from "lucide-react";
import { useTeacher } from "../contexts/TeacherContext";

export default function TeacherFeedbackPage() {
  const { feedback, markFeedbackResolved } = useTeacher();

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-black tracking-tight">Reviews & Feedback</h1>
        <p className="text-slate-600 mt-1">Read student sentiment and close the feedback loop quickly.</p>
      </header>

      <section className="space-y-4">
        {feedback.map((item) => (
          <div key={item.id} className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                  <p className="font-semibold">{item.studentName}</p>
                  <span className="text-xs text-slate-500">{item.course}</span>
                </div>
                <p className="text-sm text-slate-600 mt-2">{item.comment}</p>
                <p className="text-xs text-slate-500 mt-2">
                  {"?".repeat(item.rating)}{"?".repeat(5 - item.rating)} • {new Date(item.createdAt).toLocaleDateString()}
                </p>
              </div>

              {item.resolved ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 text-emerald-700 px-2.5 py-1 text-xs font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Resolved
                </span>
              ) : (
                <button
                  onClick={() => markFeedbackResolved(item.id)}
                  className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm hover:bg-slate-100"
                >
                  Mark resolved
                </button>
              )}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
