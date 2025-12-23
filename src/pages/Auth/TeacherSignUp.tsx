import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Users, BookOpen, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

import LumioLogo from "@/assets/Lumio,png-Picsart-BackgroundRemover.png";

const TeacherSignUp = () => {
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
      toast({
        title: "Missing fields",
        description: "Please fill in all fields to continue.",
        variant: "destructive",
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      });
      return;
    }

    if (!agreedToTerms) {
      toast({
        title: "Terms required",
        description: "Please agree to the Terms of Service and Privacy Policy.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Account created!",
      description: "Welcome Teacher! Your journey with Lumio begins 🚀",
    });
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-orange-200 via-amber-100 to-white dark:from-[#0f0a05] dark:via-[#120d08] dark:to-[#0a0907]">

      {/* LEFT PANEL — 25% */}
      <div className="hidden lg:flex lg:w-[25%] relative overflow-hidden bg-gradient-to-b from-orange-700 via-orange-600 to-orange-500">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-6 w-28 h-28 bg-white/25 rounded-full blur-2xl" />
          <div className="absolute bottom-16 right-10 w-40 h-40 bg-white/20 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 flex flex-col justify-center px-10 text-white">
          <Link to="/" className="flex items-center gap-3 mb-6 cursor-pointer">
            <img
              src={LumioLogo}
              alt="Lumio Logo"
              className="w-16 h-16 rounded-2xl shadow-soft object-contain bg-white/30 backdrop-blur"
            />
            <span className="text-4xl font-display font-bold">
              Lumio
            </span>
          </Link>

          <h1 className="text-4xl xl:text-5xl font-display font-bold leading-tight mb-4">
            Empower Education,
            <br />
            Inspire Minds
          </h1>

          <p className="text-white/90 text-lg">
            Teach smarter with Lumio’s intelligent educator tools.
          </p>

          <div className="space-y-4 mt-8">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-white/25 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="font-medium">Create Engaging Lessons</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-white/25 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <span className="font-medium">Manage Students Easily</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-white/25 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="font-medium">AI Powered Teaching Support</span>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL — 75% */}
      <div className="w-full lg:w-[75%] flex items-center justify-center p-8">
        <div className="w-full max-w-md">

          {/* MOBILE LOGO */}
          <Link to="/" className="lg:hidden flex items-center gap-2 mb-8 cursor-pointer">
            <img src={LumioLogo} alt="Lumio Logo" className="w-12 h-12 rounded-xl object-contain" />
            <span className="text-3xl font-display font-bold text-foreground">
              Lumio
            </span>
          </Link>

          <div className="mb-8">
            <h2 className="text-3xl font-display font-bold text-foreground mb-2">
              Create Teacher Account
            </h2>
            <p className="text-muted-foreground">
              Join Lumio as an educator and start shaping futures
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            <div className="space-y-2">
              <Label className="text-foreground" htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleInputChange}
                className="bg-white border-gray-300 text-foreground placeholder-gray-500"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-foreground" htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleInputChange}
                className="bg-white border-gray-300 text-foreground placeholder-gray-500"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-foreground" htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="bg-white border-gray-300 text-foreground placeholder-gray-500 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-foreground" htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="bg-white border-gray-300 text-foreground placeholder-gray-500 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Checkbox
                id="terms"
                checked={agreedToTerms}
                onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                className="mt-0.5"
              />
              <Label className="text-foreground text-sm" htmlFor="terms">
                I agree to the <span className="font-semibold">Terms of Service</span> and{" "}
                <span className="font-semibold">Privacy Policy</span>
              </Label>
            </div>

            <Button type="submit" className="w-full">
              Create Account
            </Button>
          </form>

          <p className="mt-8 text-center text-muted-foreground">
            Already have an account?{" "}
            <span className="text-primary font-semibold hover:underline cursor-pointer">
              Sign in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TeacherSignUp;
