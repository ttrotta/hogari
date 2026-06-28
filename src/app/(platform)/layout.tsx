import { NavBar } from "@/components/layout/NavBar";
import { Footer } from "@/components/layout/Footer";

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col bg-white">
      <NavBar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
