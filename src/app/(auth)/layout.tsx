import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-gradient-warm px-4">
      <Link
        href="/"
        className="absolute left-4 top-4 flex items-center gap-1.5 text-sm font-medium text-gray-500 transition-colors hover:text-gray-900 md:left-8 md:top-8"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver al inicio
      </Link>

      <Link href="/" className="mb-8 flex items-center gap-2">
        <Image
          src="/mini-hogari-logo.png"
          alt="Hogarí"
          width={48}
          height={48}
          className="object-contain"
        />
        <span className="text-3xl font-bold tracking-tight">Hogarí</span>
      </Link>

      {children}
    </div>
  );
}
