import { NavBar } from "@/components/layout/NavBar";
import { Hero } from "@/components/home/Hero";
import { ProblemSection } from "@/components/home/ProblemSection";
import { SolutionSteps } from "@/components/home/SolutionSteps";
import { BenefitsGrid } from "@/components/home/BenefitsGrid";
import { TrustSection } from "@/components/home/TrustSection";
import { FinalCTA } from "@/components/home/FinalCTA";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-white text-gray-900">
      <NavBar />
      <Hero />
      <ProblemSection />
      <SolutionSteps />
      <BenefitsGrid />
      <TrustSection />
      <FinalCTA />
      <Footer />
    </div>
  );
}
