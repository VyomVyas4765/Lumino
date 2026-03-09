import { Link, useLocation, useNavigate } from "react-router-dom";
import { BarChart3, BookOpenCheck, LayoutDashboard, LogOut, MessageSquare, Users } from "lucide-react";
import LumioLogo from "@/assets/Lumio,png-Picsart-BackgroundRemover.png";
import { clearSessionUser, getSessionUser } from "@/lib/auth";

const navItems = [
  { path: "/teacher-dashboard", label: "Overview", icon: LayoutDashboard },
  { path: "/teacher-dashboard/content", label: "Content Library", icon: BookOpenCheck },
  { path: "/teacher-dashboard/students", label: "Students", icon: Users },
  { path: "/teacher-dashboard/feedback", label: "Reviews & Feedback", icon: MessageSquare },
  { path: "/teacher-dashboard/insights", label: "Insights", icon: BarChart3 },
];

export function TeacherSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = getSessionUser();

  return (
    <aside className="fixed left-0 top-0 h-screen w-72 border-r border-slate-200 bg-white z-50 flex flex-col">
      <div className="p-6 border-b border-slate-200">
        <Link to="/" className="flex items-center gap-3">
          <img src={LumioLogo} alt="Lumio" className="h-12 w-auto" />
          <div>
            <p className="text-2xl font-black tracking-tight">Lumio</p>
            <p className="text-xs text-slate-500">Teacher Console</p>
          </div>
        </Link>
      </div>

      <div className="px-5 py-4 border-b border-slate-200">
        <p className="text-xs text-slate-500">Signed in as</p>
        <p className="text-sm font-semibold truncate">{user?.name || "Teacher"}</p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                isActive
                  ? "bg-emerald-100 text-emerald-700"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-200">
        <button
          onClick={() => {
            clearSessionUser();
            navigate("/", { replace: true });
          }}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-slate-900 text-white py-2.5 text-sm font-semibold hover:bg-slate-800 transition"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </aside>
  );
}
