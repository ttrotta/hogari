"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { postMessage } from "@/features/tree/actions";
import { Send, Loader2 } from "lucide-react";

export function MessageForm() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const result = await postMessage(formData);

    if (result.error) {
      setError(result.error);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
    form.reset();
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl">
      <div className="flex flex-col gap-3">
        <textarea
          name="content"
          placeholder="Dejá tu queja o mensaje en el árbol..."
          maxLength={500}
          required
          className="w-full rounded-2xl border border-orange-200/50 bg-white/80 px-5 py-4 text-sm leading-relaxed text-gray-700 placeholder-gray-400 outline-none transition-colors focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20"
          rows={3}
        />
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <input
            name="author_name"
            placeholder="Tu nombre (o Anónimo)"
            maxLength={50}
            className="w-full rounded-full border border-orange-200/50 bg-white/80 px-5 py-2.5 text-sm text-gray-700 placeholder-gray-400 outline-none transition-colors focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 sm:w-64"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-primary hover:bg-primary-dark inline-flex items-center justify-center gap-2 rounded-full px-6 py-2.5 text-sm font-bold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
            Publicar
          </button>
        </div>
      </div>

      {error && (
        <p className="mt-3 text-sm font-medium text-red-500">{error}</p>
      )}
      {success && (
        <p className="mt-3 text-sm font-medium text-green-600">
          Mensaje publicado en el árbol.
        </p>
      )}
    </form>
  );
}
