import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import LumioLogo from "@/assets/Lumio,png-Picsart-BackgroundRemover.png";
import { GraduationCap, Users, Building2, ArrowRight } from "lucide-react";

const UnifiedSignup = () => {
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-emerald-600 via-teal-500 to-purple-700 text-white">
      
      {/* LEFT INFO PANEL */}
      <div className="hidden lg:flex w-[30%] flex-col justify-center px-12 relative">
        <div className="absolute inset-0 bg-black/10" />

        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-3 mb-8">
            <img
              src={LumioLogo}
              className="w-16 h-16 rounded-2xl bg-white/20 p-2 shadow-lg"
            />
            <span className="text-4xl font-bold">Lumio</span>
          </Link>

          <h1 className="text-5xl font-bold leading-tight mb-4">
            Choose how you
            <br />
            want to begin.
          </h1>

          <p className="text-white/85 text-lg">
            Lumio adapts to your needs — whether you’re here to learn,
            teach, or empower institutions.
          </p>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="w-full lg:w-[70%] flex items-center justify-center p-10 bg-white dark:bg-[#0a0a0a] text-foreground">
        <div className="w-full max-w-3xl">

          <h2 className="text-3xl font-bold mb-2">
            Create Your Lumio Account
          </h2>
          <p className="text-muted-foreground mb-8">
            Select the appropriate option to continue
          </p>

          {/* OPTIONS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* STUDENT */}
            <Link to="/student-signup">
              <div className="group rounded-2xl border bg-muted/30 hover:bg-emerald-600 hover:text-white transition p-6 cursor-pointer h-full flex flex-col">
                <div className="w-12 h-12 bg-emerald-500/20 group-hover:bg-white/20 rounded-xl flex items-center justify-center mb-4">
                  <GraduationCap className="w-6 h-6" />
                </div>

                <h3 className="text-xl font-bold mb-2">I'm a Student</h3>
                <p className="text-muted-foreground group-hover:text-white/90 mb-6 text-sm">
                  Learn smarter with personalized pathways, adaptive quizzes, and progress insights.
                </p>

                <div className="mt-auto flex items-center gap-2 font-medium">
                  Get Started
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                </div>
              </div>
            </Link>

            {/* TEACHER */}
            <Link to="/teacher-signup">
              <div className="group rounded-2xl border bg-muted/30 hover:bg-blue-600 hover:text-white transition p-6 cursor-pointer h-full flex flex-col">
                <div className="w-12 h-12 bg-blue-500/20 group-hover:bg-white/20 rounded-xl flex items-center justify-center mb-4">
                  <Users className="w-6 h-6" />
                </div>

                <h3 className="text-xl font-bold mb-2">I'm a Teacher</h3>
                <p className="text-muted-foreground group-hover:text-white/90 mb-6 text-sm">
                  Manage students, create engaging learning experiences, and track progress.
                </p>

                <div className="mt-auto flex items-center gap-2 font-medium">
                  Start Teaching
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                </div>
              </div>
            </Link>

            {/* INSTITUTION */}
            <Link to="/institution-signup">
              <div className="group rounded-2xl border bg-muted/30 hover:bg-purple-700 hover:text-white transition p-6 cursor-pointer h-full flex flex-col">
                <div className="w-12 h-12 bg-purple-500/20 group-hover:bg-white/20 rounded-xl flex items-center justify-center mb-4">
                  <Building2 className="w-6 h-6" />
                </div>

                <h3 className="text-xl font-bold mb-2">Institution</h3>
                <p className="text-muted-foreground group-hover:text-white/90 mb-6 text-sm">
                  Register your institution, verify identity, and enable organizational learning.
                </p>

                <div className="mt-auto flex items-center gap-2 font-medium">
                  Get Verified
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                </div>
              </div>
            </Link>

          </div>

          {/* LOGIN LINK */}
          <p className="mt-8 text-center text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-primary underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UnifiedSignup;
