import { NavBar } from "@/components/layout/NavBar";
import { Hero } from "@/components/home/Hero";
import { BackgroundWaves } from "@/components/layout/BackgroundWaves";
import { FeaturedProperties } from "@/components/home/FeaturedProperties";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-white text-gray-900">
      <BackgroundWaves />
      <NavBar />
      <Hero />
      <FeaturedProperties />
    </div>
  );
}
