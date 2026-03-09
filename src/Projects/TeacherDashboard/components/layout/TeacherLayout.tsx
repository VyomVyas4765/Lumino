import { type ReactNode } from "react";
import { TeacherSidebar } from "./TeacherSidebar";

export function TeacherLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <TeacherSidebar />
      <main className="ml-72 min-h-screen">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
