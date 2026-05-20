"use client";

import { useActionState } from "react";
import { subscribeToWaitlist, ActionState } from "@/app/actions";

const initialState: ActionState = {
  success: false,
  message: "",
};

export default function WaitlistForm() {
  const [state, formAction, isPending] = useActionState(
    subscribeToWaitlist,
    initialState,
  );

  if (state.success) {
    return (
      <div className="border-brand-light mt-10 flex w-full items-center justify-center rounded-full border-4 bg-green-50 px-8 py-4 text-center text-lg font-bold text-green-700 shadow-lg md:w-auto">
        {state.message}
      </div>
    );
  }

  return (
    <form
      action={formAction}
      className="relative mt-10 flex w-full flex-col items-center gap-4 sm:flex-row md:w-auto"
    >
      <div className="border-brand-light hover:border-primary focus-visible:ring-brand-light flex w-full items-center rounded-full border-4 px-8 py-4 text-lg font-bold text-white shadow-lg transition-all focus-within:scale-105 hover:scale-105 focus:outline-none focus-visible:ring-4 sm:w-auto">
        <input
          type="email"
          name="email"
          required
          disabled={isPending}
          className="w-full bg-transparent text-black focus:outline-none disabled:opacity-50"
          placeholder="Email"
        />
      </div>
      <button
        type="submit"
        disabled={isPending}
        className="bg-primary hover:bg-primary-dark focus-visible:ring-brand-light flex w-full items-center justify-center rounded-full px-8 py-4 text-lg font-bold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl focus:outline-none focus-visible:ring-4 disabled:opacity-50 sm:w-auto"
      >
        {isPending ? (
          <>
            <svg
              className="mr-2 h-5 w-5 animate-spin text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Enviando...
          </>
        ) : (
          "Unirme a la beta"
        )}
      </button>

      {!state.success && state.message && (
        <p className="absolute right-0 -bottom-8 left-0 text-center text-sm font-bold text-red-400">
          {state.message}
        </p>
      )}
    </form>
  );
}
