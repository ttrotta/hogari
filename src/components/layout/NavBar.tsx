import Image from "next/image";
import Link from "next/link";
import { UserCircle } from "lucide-react";

export function NavBar() {
  return (
    <nav className="bg-primary-light relative z-10 flex w-full items-center justify-between px-6 py-4 shadow-sm md:px-12">
      <div className="flex items-center gap-3">
        <Image
          src="/mini-owl-logo-solo 1.png"
          alt="Hogaroo Logo"
          width={48}
          height={48}
          className="object-contain"
        />
        <span className="text-2xl font-bold tracking-tight">Hogaroo</span>
      </div>

      <div className="hidden items-center gap-8 font-medium md:flex">
        <Link href="#" className="hover:text-brand-purple transition-colors">
          Alquilá
        </Link>
        <Link href="#" className="hover:text-brand-purple transition-colors">
          Nosotros
        </Link>
        <Link href="#" className="hover:text-brand-purple transition-colors">
          Legal
        </Link>
      </div>

      <div className="flex items-center gap-6 font-medium">
        <div className="flex h-10 w-10 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-gray-200 text-gray-500 transition-colors hover:bg-gray-300">
          <UserCircle className="h-8 w-8" />
        </div>
      </div>
    </nav>
  );
}
