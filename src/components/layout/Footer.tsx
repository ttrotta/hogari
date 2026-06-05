import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="relative mt-auto w-full bg-[#1a1207] px-6 py-14 md:px-12">
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#FFAD4E]/30 to-transparent" />

      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 md:flex-row">
        <div className="flex items-center gap-3">
          <Image
            src="/mini-hogari-logo.png"
            alt="Hogarí Mini Logo"
            width={32}
            height={32}
            className="object-contain"
          />
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-white">
              Hogarí
            </span>
            <span className="text-xs text-white/40">
              Tu próximo hogar, más cerca.
            </span>
          </div>
        </div>

        <div className="flex gap-8 text-sm font-medium text-white/50">
          <Link
            href="#como-funciona"
            className="transition-colors hover:text-[#FFAD4E]"
          >
            Cómo Funciona
          </Link>
          <Link
            href="#beneficios"
            className="transition-colors hover:text-[#FFAD4E]"
          >
            Beneficios
          </Link>
          <Link href="#" className="transition-colors hover:text-[#FFAD4E]">
            Privacidad
          </Link>
        </div>

        <div className="text-sm text-white/30">
          © {new Date().getFullYear()} Hogarí.
        </div>
      </div>
    </footer>
  );
}
