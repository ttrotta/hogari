import { NavBar } from "@/components/layout/NavBar";
import { Hero } from "@/components/home/Hero";
import { ProblemSection } from "@/components/home/ProblemSection";
import { SolutionSteps } from "@/components/home/SolutionSteps";
import { BenefitsGrid } from "@/components/home/BenefitsGrid";
import { TrustSection } from "@/components/home/TrustSection";
import { FinalCTA } from "@/components/home/FinalCTA";
import { Footer } from "@/components/layout/Footer";
import { WaveDivider } from "@/components/layout/WaveDivider";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-white text-gray-900">
      <NavBar />
      <Hero />
      <ProblemSection />
      <WaveDivider topColor="#c9abf2" bottomColor="#fbf7fd" />
      <SolutionSteps />
      <WaveDivider topColor="#fbf7fd" bottomColor="#c9abf2" />
      <BenefitsGrid />
      <WaveDivider topColor="#c9abf2" bottomColor="#ffffff" />
      <TrustSection />
      <WaveDivider topColor="#ffffff" bottomColor="#c9abf2" />
      <FinalCTA />
      <WaveDivider topColor="#c9abf2" bottomColor="#e4d8f8" />
      <Footer />
    </div>
  );
}

