import UnifiedSignup from "./pages/Auth/UnifiedSignup";
import Login from "./pages/Auth/Login";
import StudentSignUp from "./pages/Auth/StudentSignUp";
import TeacherSignUp from "./pages/Auth/TeacherSignUp";
import InstitutionSignup from "./pages/Auth/InstitutionSignUp";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />

          {/* Unified Signup */}
          <Route path="/signup" element={<UnifiedSignup />} />

          {/* Legacy / role pages (still kept) */}
          <Route path="/student-signup" element={<StudentSignUp />} />
          <Route path="/teacher-signup" element={<TeacherSignUp />} />
          <Route path="/institution-signup" element={<InstitutionSignup />} />

          <Route path="/login" element={<Login />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
