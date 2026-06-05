import { NavBar } from "@/components/layout/NavBar";
import { Hero } from "@/components/home/Hero";
import { ProblemSection } from "@/components/home/ProblemSection";
import { SolutionSteps } from "@/components/home/SolutionSteps";
import { BenefitsGrid } from "@/components/home/BenefitsGrid";
import { TrustSection } from "@/components/home/TrustSection";
import { FinalCTA } from "@/components/home/FinalCTA";
import { Footer } from "@/components/layout/Footer";
import { WaveDivider } from "@/components/layout/WaveDivider";
import { GsapProvider } from "@/components/providers/GsapProvider";

export default function Home() {
  return (
    <GsapProvider>
      <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-white text-gray-900">
        <NavBar />
        <Hero />
        <ProblemSection />
        <WaveDivider topColor="#FFD49A" bottomColor="#FFFAF3" />
        <SolutionSteps />
        <WaveDivider topColor="#FFFAF3" bottomColor="#FFD49A" />
        <BenefitsGrid />
        <WaveDivider topColor="#FFD49A" bottomColor="#ffffff" />
        <TrustSection />
        <FinalCTA />
        <Footer />
      </div>
    </GsapProvider>
  );
}
