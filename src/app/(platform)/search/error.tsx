"use client";

export default function SearchError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <h2 className="text-xl font-bold text-gray-900">Algo salió mal</h2>
      <p className="text-sm text-gray-500">{error.message}</p>
      <button
        onClick={reset}
        className="rounded-full bg-primary px-6 py-2 text-sm font-bold text-white transition-all hover:bg-primary-dark"
      >
        Reintentar
      </button>
    </div>
  );
}
