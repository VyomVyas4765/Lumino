import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, BookOpen, Users, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

import LumioLogo from "@/assets/Lumio,png-Picsart-BackgroundRemover.png";

const StudentSignUp = () => {
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
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.fullName ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
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
        description:
          "Please agree to the Terms of Service and Privacy Policy.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Account created!",
      description: "Welcome to Lumio! Your learning journey begins now.",
    });
  };

  return (
    <div className="min-h-screen flex">
      {/* LEFT PANEL — 25% */}
      <div className="hidden lg:flex lg:w-[25%] bg-gradient-to-br from-green-600 via-green-500 to-accent relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-primary-foreground/10 rounded-full blur-xl animate-fade-in-up" />
          <div
            className="absolute bottom-32 right-20 w-48 h-48 bg-primary-foreground/10 rounded-full blur-2xl animate-fade-in-up"
            style={{ animationDelay: "0.3s" }}
          />
          <div
            className="absolute top-1/2 left-1/3 w-24 h-24 bg-primary-foreground/5 rounded-full blur-lg animate-fade-in-up"
            style={{ animationDelay: "0.6s" }}
          />
        </div>

        <div className="relative z-10 flex flex-col justify-center px-10">
          <div className="mb-8">
            {/* BIGGER DESKTOP LOGO */}
            <Link to="/" className="flex items-center gap-3 mb-6 cursor-pointer">
              <img
                src={LumioLogo}
                alt="Lumio Logo"
                className="w-16 h-16 rounded-2xl shadow-soft object-contain bg-white/20 backdrop-blur"
              />
              <span className="text-4xl font-display font-bold text-primary-foreground">
                Lumio
              </span>
            </Link>

            <h1 className="text-4xl xl:text-5xl font-display font-bold text-primary-foreground leading-tight mb-4">
              Illuminate your
              <br />
              learning path
            </h1>

            <p className="text-primary-foreground/80 text-lg">
              Join thousands of students already transforming their education with Lumio's intelligent learning platform.
            </p>
          </div>

          <div className="space-y-4 mt-8">
            <div className="flex items-center gap-4 text-primary-foreground/90">
              <div className="w-10 h-10 bg-primary-foreground/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="font-medium">Personalized learning paths</span>
            </div>
            <div className="flex items-center gap-4 text-primary-foreground/90">
              <div className="w-10 h-10 bg-primary-foreground/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <Users className="w-5 h-5" />
              </div>
              <span className="font-medium">Collaborative study groups</span>
            </div>
            <div className="flex items-center gap-4 text-primary-foreground/90">
              <div className="w-10 h-10 bg-primary-foreground/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <Zap className="w-5 h-5" />
              </div>
              <span className="font-medium">AI-powered insights</span>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL — 75% */}
      <div className="w-full lg:w-[75%] flex items-center justify-center p-6 sm:p-8 lg:p-12 bg-gradient-to-br from-green-200 via-green-300/70 to-emerald-200 dark:from-green-900 dark:via-green-800/50 dark:to-emerald-900">
        <div className="w-full max-w-md">
          {/* MOBILE LOGO (unchanged except bigger earlier if you applied it) */}
          <Link to="/" className="lg:hidden flex items-center gap-2 mb-8 cursor-pointer">
            <img
              src={LumioLogo}
              alt="Lumio Logo"
              className="w-10 h-10 rounded-xl shadow-soft object-contain"
            />
            <span className="text-2xl font-display font-bold text-foreground">
              Lumio
            </span>
          </Link>

          <div className="mb-8 opacity-0 animate-fade-in-up">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground mb-2">
              Create Student Account
            </h2>
            <p className="text-muted-foreground">
              Start your learning journey today
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* NAME */}
            <div className="space-y-2 opacity-0 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              <Label htmlFor="fullName" className="text-foreground font-medium">
                Full Name
              </Label>
              <Input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleInputChange}
              />
            </div>

            {/* EMAIL */}
            <div className="space-y-2 opacity-0 animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
              <Label htmlFor="email" className="text-foreground font-medium">
                Email Address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>

            {/* PASSWORD */}
            <div className="space-y-2 opacity-0 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <Label htmlFor="password" className="text-foreground font-medium">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="space-y-2 opacity-0 animate-fade-in-up" style={{ animationDelay: "0.25s" }}>
              <Label htmlFor="confirmPassword" className="text-foreground font-medium">
                Confirm Password
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* TERMS */}
            <div className="flex items-start gap-3 opacity-0 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              <Checkbox
                id="terms"
                checked={agreedToTerms}
                onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                className="mt-0.5"
              />
              <Label
                htmlFor="terms"
                className="text-sm text-muted-foreground leading-relaxed cursor-pointer"
              >
                I agree to the{" "}
                <span className="text-primary font-medium">Terms of Service</span>{" "}
                and{" "}
                <span className="text-primary font-medium">Privacy Policy</span>
              </Label>
            </div>

            {/* SUBMIT */}
            <div className="pt-2 opacity-0 animate-fade-in-up" style={{ animationDelay: "0.35s" }}>
              <Button type="submit" className="w-full">
                Create Account
              </Button>
            </div>
          </form>

          <p className="mt-8 text-center text-muted-foreground opacity-0 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            Already have an account?{" "}
            <span className="text-primary font-semibold hover:underline">
              Sign in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudentSignUp;
