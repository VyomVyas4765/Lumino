import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "@/lib/auth";

import { Building2, ShieldCheck, MailCheck, ArrowLeft } from "lucide-react";
import LumioLogo from "@/assets/Lumio,png-Picsart-BackgroundRemover.png";

const InstitutionSignup = () => {
  const { toast } = useToast();
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    institutionName: "",
    institutionType: "",
    email: "",
    country: "",
    city: "",
    verificationMethod: "",
    password: "",
    confirmPassword: "",
  });

  const setField = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.institutionName ||
      !formData.institutionType ||
      !formData.email ||
      !formData.country ||
      !formData.city ||
      !formData.verificationMethod ||
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

    if (!agreed) {
      toast({
        title: "Agreement Required",
        description: "You must agree to the Terms and Privacy Policy.",
        variant: "destructive",
      });
      return;
    }

    const result = registerUser({
      name: formData.institutionName,
      email: formData.email,
      password: formData.password,
      role: "institution",
    });

    if (!result.ok) {
      toast({
        title: "Signup failed",
        description: result.message,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Account created!",
      description: "Institution account created. You can now log in.",
    });

    navigate("/login");
  };

  return (
    <div className="min-h-screen flex">

      {/* 🔙 BACK BUTTON */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 z-50 flex items-center gap-2 px-3 py-2 rounded-lg bg-white/80 backdrop-blur border text-sm font-medium text-foreground hover:bg-white transition"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      {/* LEFT PANEL — SAME STYLE AS STUDENT PAGE */}
      <div className="hidden lg:flex lg:w-[25%] bg-gradient-to-br from-purple-700 via-purple-600 to-indigo-600 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-fade-in-up" />
          <div className="absolute bottom-32 right-20 w-48 h-48 bg-white/10 rounded-full blur-2xl animate-fade-in-up" style={{ animationDelay: "0.3s" }} />
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-white/10 rounded-full blur-xl animate-fade-in-up" style={{ animationDelay: "0.6s" }} />
        </div>

        <div className="relative z-10 flex flex-col justify-center px-10">
          <Link to="/" className="flex items-center gap-3 mb-6">
            <img src={LumioLogo} className="w-16 h-16 rounded-2xl bg-white/20 p-2 shadow-soft" />
            <span className="text-4xl font-display font-bold text-white">Lumio</span>
          </Link>

          <h1 className="text-4xl xl:text-5xl font-display font-bold text-white leading-tight mb-4">
            Register Your
            <br />
            Institution
          </h1>

          <p className="text-white/85 text-lg max-w-md">
            Submit verification details to officially onboard your institution with Lumio.
          </p>

          <div className="space-y-4 mt-8 text-white/90">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <Building2 className="w-5 h-5" />
              </div>
              <span className="font-medium">For legitimate institutions only</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <MailCheck className="w-5 h-5" />
              </div>
              <span className="font-medium">Official email verification</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="font-medium">Secure approval review</span>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL — 75% FORM */}
      <div className="w-full lg:w-[75%] flex items-center justify-center p-6 sm:p-8 lg:p-12 
      bg-gradient-to-br from-purple-100 via-purple-200/60 to-indigo-200 dark:from-[#150b2b] dark:via-[#120a27] dark:to-[#0f0820]">

        <div className="w-full max-w-md">

          <div className="mb-8 opacity-0 animate-fade-in-up">
            <h2 className="text-3xl font-display font-bold text-foreground mb-2">
              Institution Verification
            </h2>
            <p className="text-muted-foreground">
              Submit your details for approval
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              <Label className="text-foreground font-medium">Institution Name</Label>
              <Input
                placeholder="ABC Public School"
                value={formData.institutionName}
                onChange={(e) => setField("institutionName", e.target.value)}
              />
            </div>

            <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
              <Label className="text-foreground font-medium">Institution Type</Label>
              <Select onValueChange={(value) => setField("institutionType", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="school">School</SelectItem>
                  <SelectItem value="college">College</SelectItem>
                  <SelectItem value="university">University</SelectItem>
                  <SelectItem value="coaching">Coaching Institute</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <Label className="text-foreground font-medium">Official Institution Email</Label>
              <Input
                type="email"
                placeholder="admin@institution.edu"
                value={formData.email}
                onChange={(e) => setField("email", e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4 opacity-0 animate-fade-in-up" style={{ animationDelay: "0.25s" }}>
              <div>
                <Label className="text-foreground font-medium">Country</Label>
                <Input
                  placeholder="India"
                  value={formData.country}
                  onChange={(e) => setField("country", e.target.value)}
                />
              </div>
              <div>
                <Label className="text-foreground font-medium">City</Label>
                <Input
                  placeholder="Mumbai"
                  value={formData.city}
                  onChange={(e) => setField("city", e.target.value)}
                />
              </div>
            </div>

            <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              <Label className="text-foreground font-medium">Verification Method</Label>
              <Select onValueChange={(value) => setField("verificationMethod", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select verification method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">Official Email Verification</SelectItem>
                  <SelectItem value="document">Upload Authorization Document</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: "0.35s" }}>
              <Label className="text-foreground font-medium">Password</Label>
              <Input
                type="password"
                placeholder="Create strong password"
                value={formData.password}
                onChange={(e) => setField("password", e.target.value)}
              />
            </div>

            <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
              <Label className="text-foreground font-medium">Confirm Password</Label>
              <Input
                type="password"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={(e) => setField("confirmPassword", e.target.value)}
              />
            </div>

            <div className="flex gap-3 opacity-0 animate-fade-in-up" style={{ animationDelay: "0.45s" }}>
              <Checkbox checked={agreed} onCheckedChange={(v) => setAgreed(v as boolean)} />
              <p className="text-muted-foreground text-sm">
                I agree to Lumio’s <span className="text-primary font-medium">Terms of Service</span> and{" "}
                <span className="text-primary font-medium">Privacy Policy</span>
              </p>
            </div>

            <div className="pt-2 opacity-0 animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
              <Button type="submit" className="w-full">
                Submit For Verification
              </Button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
};

export default InstitutionSignup;
