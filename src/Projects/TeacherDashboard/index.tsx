import { Routes, Route } from "react-router-dom";
import { TeacherLayout } from "./components/layout/TeacherLayout";
import TeacherOverviewPage from "./pages/Overview";
import TeacherContentPage from "./pages/Content";
import TeacherStudentsPage from "./pages/Students";
import TeacherFeedbackPage from "./pages/Feedback";
import TeacherInsightsPage from "./pages/Insights";

export default function TeacherDashboard() {
  return (
    <TeacherLayout>
      <Routes>
        <Route path="/" element={<TeacherOverviewPage />} />
        <Route path="/content" element={<TeacherContentPage />} />
        <Route path="/students" element={<TeacherStudentsPage />} />
        <Route path="/feedback" element={<TeacherFeedbackPage />} />
        <Route path="/insights" element={<TeacherInsightsPage />} />
      </Routes>
    </TeacherLayout>
  );
}
