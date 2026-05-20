import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto w-full border-t border-gray-100 bg-white px-6 py-12 md:px-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
        <div className="flex items-center gap-3">
          <Image
            src="/mini-owl-logo-solo 1.png"
            alt="Hogaroo Logo"
            width={32}
            height={32}
            className="object-contain grayscale transition-all duration-300 hover:grayscale-0"
          />
          <span className="text-xl font-bold tracking-tight text-gray-900">
            Hogaroo
          </span>
        </div>

        <div className="flex gap-8 text-sm font-medium text-gray-500">
          <Link
            href="#como-funciona"
            className="hover:text-primary transition-colors"
          >
            Cómo Funciona
          </Link>
          <Link
            href="#beneficios"
            className="hover:text-primary transition-colors"
          >
            Beneficios
          </Link>
          <Link href="#" className="hover:text-primary transition-colors">
            Privacidad
          </Link>
        </div>

        <div className="text-sm text-gray-400">
          © {new Date().getFullYear()} Hogaroo.
        </div>
      </div>
    </footer>
  );
}
