import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import RoleSection from "@/components/RoleSection";
import PhilosophySection from "@/components/PhilosophySection";
import ConclusionSection from "@/components/ConclusionSection";
import Footer from "@/components/Footer";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <RoleSection />
      <PhilosophySection />
      <ConclusionSection />
      <Footer />
    </main>
  );
};

export default Index;
