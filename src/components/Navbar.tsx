import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import lumioLogo from "@/assets/lumino-logo.png";

const Navbar = () => {
  const handleSignupScroll = () => {
    const section = document.getElementById("choose-path");
    section?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="w-full border-b bg-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={lumioLogo} alt="Lumio" className="h-8 w-auto" />
          <span className="text-xl font-semibold text-gray-900">Lumio</span>
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Link to="/login" className="text-sm font-medium text-gray-700 hover:text-gray-900">
            Login
          </Link>

          <Button
            onClick={handleSignupScroll}
            className="rounded-full px-6 bg-emerald-500 hover:bg-emerald-600"
          >
            Sign Up
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;