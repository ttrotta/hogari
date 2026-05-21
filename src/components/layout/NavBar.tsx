import Image from "next/image";
import Link from "next/link";
import { UserRound } from "lucide-react";

export function NavBar() {
  return (
    <nav className="fixed top-0 z-50 flex w-full items-center justify-between border-b border-brand-orange/15 bg-[#FFFAF3]/85 px-4 py-3 shadow-sm shadow-brand-orange/5 backdrop-blur-xl md:px-10">
      <div className="flex flex-1 items-center gap-3">
        <Link href="#hero" className="flex items-center gap-2">
          <Image
            src="/mini-hogari-logo.png"
            alt="Hogarí Mini Logo"
            width={48}
            height={48}
            className="object-contain"
          />
          <span className="text-2xl font-bold tracking-tight">Hogarí</span>
        </Link>
      </div>

      <div className="hidden items-center justify-center gap-8 font-medium md:flex">
        <Link
          href="#como-funciona"
          className="hover:text-brand-orange transition-colors"
        >
          Cómo Funciona
        </Link>
        <Link
          href="#beneficios"
          className="hover:text-brand-orange transition-colors"
        >
          Beneficios
        </Link>
        <Link
          href="#comunidad"
          className="hover:text-brand-orange transition-colors"
        >
          Comunidad
        </Link>
      </div>

      <div className="flex flex-1 items-center justify-end gap-6 font-medium">
        <div className="flex h-10 w-10 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-gray-200 text-gray-500 transition-colors hover:bg-gray-300">
          <UserRound className="h-8 w-8" />
        </div>
      </div>
    </nav>
  );
}
