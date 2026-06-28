"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { UserRound, LogOut, User, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/Button";

export function NavBar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isSearchOrProperty =
    pathname === "/search" || pathname.startsWith("/property/");
  const isAuthenticated = status === "authenticated";

  const initials = session?.user?.name
    ? session.user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : null;

  return (
    <nav className="border-brand-orange/15 bg-section-warm/85 shadow-brand-orange/5 sticky top-0 z-50 flex w-full items-center justify-between border-b px-4 py-3 shadow-sm backdrop-blur-xl md:px-10">
      <div className="flex flex-1 items-center gap-3">
        <Link href="/" className="flex cursor-pointer items-center gap-2">
          <Image
            src="/mini-hogari-logo.png"
            alt="Hogarí Mini Logo"
            width={48}
            height={48}
            className="cursor-pointer object-contain"
          />
          <span className="text-2xl font-bold tracking-tight">Hogarí</span>
        </Link>
      </div>

      <div className="hidden items-center justify-center gap-6 font-medium md:flex lg:gap-12">
        {isSearchOrProperty ? (
          <>
            <Link
              href="/law-guide"
              className="cursor-pointer whitespace-nowrap hover:text-brand-orange transition-colors"
            >
              Guía Legal
            </Link>
            <Link
              href="/complaint-tree"
              className="cursor-pointer whitespace-nowrap hover:text-brand-orange transition-colors"
            >
              Árbol de Quejas
            </Link>
          </>
        ) : (
          <>
            <Link
              href="/search"
              className="cursor-pointer whitespace-nowrap hover:text-brand-orange transition-colors"
            >
              Búsqueda con IA
            </Link>
            <Link
              href="/law-guide"
              className="cursor-pointer whitespace-nowrap hover:text-brand-orange transition-colors"
            >
              Guía Legal
            </Link>
            <Link
              href="/complaint-tree"
              className="cursor-pointer whitespace-nowrap hover:text-brand-orange transition-colors"
            >
              Árbol de Quejas
            </Link>
          </>
        )}
      </div>

      <div className="flex flex-1 items-center justify-end gap-3 font-medium">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="cursor-pointer md:hidden"
          aria-label="Menú"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {isAuthenticated ? (
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex h-10 w-10 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-primary text-sm font-bold text-white transition-transform hover:scale-105"
            >
              {session.user?.image ? (
                <Image
                  src={session.user.image}
                  alt={session.user.name || ""}
                  width={40}
                  height={40}
                  className="h-full w-full object-cover"
                />
              ) : (
                initials || <UserRound className="h-5 w-5" />
              )}
            </button>
            {menuOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setMenuOpen(false)}
                />
                <div className="absolute right-0 top-12 z-50 min-w-48 rounded-xl border border-gray-200 bg-white py-2 shadow-xl">
                  <div className="border-b border-gray-100 px-4 py-2">
                    <p className="text-sm font-semibold">
                      {session.user?.name}
                    </p>
                    <p className="text-xs capitalize text-gray-500">
                      {session.user?.role?.toLowerCase()}
                    </p>
                  </div>
                  <Link
                    href={`/profile/${session.user?.id}`}
                    className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-50"
                  >
                    <User className="h-4 w-4" />
                    Perfil
                  </Link>
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 transition-colors hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4" />
                    Cerrar sesión
                  </button>
                </div>
              </>
            )}
          </div>
        ) : (
          <>
            <Link href="/signin" className="hidden cursor-pointer md:flex">
              <Button variant="ghost">Iniciar sesión</Button>
            </Link>
            <Link href="/signup" className="hidden cursor-pointer md:flex">
              <Button>Registrarse</Button>
            </Link>
          </>
        )}
      </div>
      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="border-brand-orange/15 bg-section-warm/85 absolute left-0 right-0 top-full z-50 flex flex-col border-b backdrop-blur-xl">
            <div className="flex flex-col px-4 py-4 md:px-10">
              {isSearchOrProperty ? (
                <>
                  <Link
                    href="/law-guide"
                    onClick={() => setMobileMenuOpen(false)}
                    className="cursor-pointer whitespace-nowrap py-3 font-medium hover:text-brand-orange transition-colors"
                  >
                    Guía Legal
                  </Link>
                  <Link
                    href="/complaint-tree"
                    onClick={() => setMobileMenuOpen(false)}
                    className="cursor-pointer whitespace-nowrap py-3 font-medium hover:text-brand-orange transition-colors"
                  >
                    Árbol de Quejas
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/search"
                    onClick={() => setMobileMenuOpen(false)}
                    className="cursor-pointer whitespace-nowrap py-3 font-medium hover:text-brand-orange transition-colors"
                  >
                    Búsqueda con IA
                  </Link>
                  <Link
                    href="/law-guide"
                    onClick={() => setMobileMenuOpen(false)}
                    className="cursor-pointer whitespace-nowrap py-3 font-medium hover:text-brand-orange transition-colors"
                  >
                    Guía Legal
                  </Link>
                  <Link
                    href="/complaint-tree"
                    onClick={() => setMobileMenuOpen(false)}
                    className="cursor-pointer whitespace-nowrap py-3 font-medium hover:text-brand-orange transition-colors"
                  >
                    Árbol de Quejas
                  </Link>
                </>
              )}
            </div>
            <div className="border-brand-orange/15 flex flex-col border-t px-4 py-4 md:px-10">
              {isAuthenticated ? (
                <>
                  <div className="mb-2 flex items-center gap-3 py-2">
                    {session.user?.image ? (
                      <Image
                        src={session.user.image}
                        alt={session.user.name || ""}
                        width={36}
                        height={36}
                        className="h-9 w-9 rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                        {initials || <UserRound className="h-5 w-5" />}
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-semibold">{session.user?.name}</p>
                      <p className="text-xs capitalize text-gray-500">
                        {session.user?.role?.toLowerCase()}
                      </p>
                    </div>
                  </div>
                  <Link
                    href={`/profile/${session.user?.id}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex w-full items-center gap-2 py-3 font-medium hover:text-brand-orange transition-colors"
                  >
                    <User className="h-4 w-4" />
                    Perfil
                  </Link>
                  <button
                    onClick={() => { setMobileMenuOpen(false); signOut({ callbackUrl: "/" }); }}
                    className="flex w-full items-center gap-2 py-3 text-left font-medium text-red-600 hover:text-red-700 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    Cerrar sesión
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link
                    href="/signin"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Button variant="ghost" className="w-full">Iniciar sesión</Button>
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Button className="w-full">Registrarse</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </nav>
  );
}
