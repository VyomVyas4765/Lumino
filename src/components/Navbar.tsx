import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { getSessionUser } from "@/lib/auth";
import LumioLogo from "./LumioLogo";

const Navbar = () => {
  const currentUser = getSessionUser();
  const dashboardPath = currentUser?.role === "teacher" ? "/teacher-dashboard" : "/dashboard";
  const dashboardLabel =
    currentUser?.role === "teacher"
      ? "Continue to Teacher Dashboard"
      : "Continue to Student Dashboard";

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <LumioLogo />
        
        <div className="flex items-center gap-4">
          {currentUser ? (
            <Button
              asChild
              variant="lumio-primary"
              size="lg"
              className="text-base px-8"
            >
              <Link to={dashboardPath}>{dashboardLabel}</Link>
            </Button>
          ) : (
            <>
              <Button
                asChild
                variant="ghost"
                size="lg"
                className="font-bold text-base px-6"
              >
                <Link to="/login">Login</Link>
              </Button>

              <Button
                asChild
                variant="lumio-primary"
                size="lg"
                className="text-base px-8"
              >
                <Link to="/signup">Sign Up</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
