import HowItWorks from "./pages/HowItWorks";
import StudentDashboard from "./Projects/StudentDashboard";
import TeacherDashboard from "./Projects/TeacherDashboard";
import ComingSoon from "./pages/ComingSoon";
import UnifiedSignup from "./pages/Auth/UnifiedSignup";
import Login from "./pages/Auth/Login";
import StudentSignUp from "./pages/Auth/StudentSignUp";
import TeacherSignUp from "./pages/Auth/TeacherSignUp";
import InstitutionSignUp from "./pages/Auth/InstitutionSignUp";
import { LearningProvider } from "./Projects/StudentDashboard/contexts/LearningContext";
import { TeacherProvider } from "./Projects/TeacherDashboard/contexts/TeacherContext";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { getSessionUser } from "@/lib/auth";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ProtectedRoute = ({
  children,
  allowedRoles,
}: {
  children: JSX.Element;
  allowedRoles?: Array<"student" | "teacher" | "institution">;
}) => {
  const currentUser = getSessionUser();
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
    if (currentUser.role === "teacher") return <Navigate to="/teacher-dashboard" replace />;
    if (currentUser.role === "student") return <Navigate to="/dashboard" replace />;
    return <Navigate to="/" replace />;
  }

  return children;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />

      <BrowserRouter>
        <LearningProvider>
          <TeacherProvider>
            <Routes>
              <Route path="/" element={<Index />} />

              <Route path="/signup" element={<UnifiedSignup />} />
              <Route path="/login" element={<Login />} />

              <Route path="/student-signup" element={<StudentSignUp />} />
              <Route path="/teacher-signup" element={<TeacherSignUp />} />
              <Route path="/institution-signup" element={<InstitutionSignUp />} />

              <Route
                path="/dashboard/*"
                element={
                  <ProtectedRoute allowedRoles={["student"]}>
                    <StudentDashboard />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/teacher-dashboard/*"
                element={
                  <ProtectedRoute allowedRoles={["teacher"]}>
                    <TeacherDashboard />
                  </ProtectedRoute>
                }
              />

              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/coming-soon" element={<ComingSoon />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </TeacherProvider>
        </LearningProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
