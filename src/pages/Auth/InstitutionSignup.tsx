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
import { Link } from "react-router-dom";

import { Building2, ShieldCheck, MailCheck } from "lucide-react";
import LumioLogo from "@/assets/Lumio,png-Picsart-BackgroundRemover.png";

const InstitutionSignup = () => {
  const { toast } = useToast();
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!agreed) {
      toast({
        title: "Agreement Required",
        description: "You must agree to the Terms and Privacy Policy.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Verification Request Submitted",
      description:
        "Our team will review your institution details and get back to you soon.",
    });
  };

  return (
    <div className="min-h-screen flex">

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
              <Input placeholder="ABC Public School" />
            </div>

            <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
              <Label className="text-foreground font-medium">Institution Type</Label>
              <Select>
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
              <Input type="email" placeholder="admin@institution.edu" />
            </div>

            <div className="grid grid-cols-2 gap-4 opacity-0 animate-fade-in-up" style={{ animationDelay: "0.25s" }}>
              <div>
                <Label className="text-foreground font-medium">Country</Label>
                <Input placeholder="India" />
              </div>
              <div>
                <Label className="text-foreground font-medium">City</Label>
                <Input placeholder="Mumbai" />
              </div>
            </div>

            <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              <Label className="text-foreground font-medium">Verification Method</Label>
              <Select>
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
              <Input type="password" placeholder="Create strong password" />
            </div>

            <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
              <Label className="text-foreground font-medium">Confirm Password</Label>
              <Input type="password" placeholder="Confirm password" />
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
