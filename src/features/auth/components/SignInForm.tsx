"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export function SignInForm() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsPending(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Email o contraseña incorrectos");
        setIsPending(false);
        return;
      }

      setIsPending(false);
      window.location.href = "/search";
    } catch {
      setError("Algo salió mal. Intentá de nuevo.");
      setIsPending(false);
    }
  };

  return (
    <div className="w-full max-w-sm space-y-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Bienvenido de nuevo</h1>
        <p className="mt-1 text-sm text-gray-500">Iniciá sesión en tu cuenta</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          name="email"
          type="email"
          placeholder="Email"
          required
          autoComplete="email"
        />
        <Input
          name="password"
          type="password"
          placeholder="Contraseña"
          required
          autoComplete="current-password"
        />

        {error && (
          <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </p>
        )}

        <Button
          type="submit"
          disabled={isPending}
          className="w-full cursor-pointer"
        >
          {isPending ? "Ingresando..." : "Iniciar sesión"}
        </Button>
      </form>

      <div className="relative flex items-center gap-3">
        <span className="via-brand-orange/30 h-px flex-1 bg-linear-to-r from-transparent to-transparent" />
        <span className="text-brand-orange text-xs font-medium tracking-wider uppercase">
          o
        </span>
        <span className="via-brand-orange/30 h-px flex-1 bg-linear-to-r from-transparent to-transparent" />
      </div>

      <Button
        type="button"
        variant="ghost"
        className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-medium text-gray-700 shadow-sm transition-all hover:border-gray-300 hover:shadow-md hover:brightness-100"
        onClick={() => signIn("google", { redirectTo: "/search" })}
      >
        <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24">
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
        </svg>
        Continuar con Google
      </Button>

      <p className="text-center text-sm text-gray-500">
        ¿No tenés cuenta?{" "}
        <a
          href="/signup"
          className="text-brand-orange font-semibold hover:underline"
        >
          Registrate
        </a>
      </p>
    </div>
  );
}
