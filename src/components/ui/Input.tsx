import { type InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input({ className = "", ...props }: InputProps) {
  return (
    <input
      className={`w-full rounded-full border border-gray-200 bg-white px-6 py-3 text-sm shadow-sm transition-shadow placeholder:text-gray-400 focus:shadow-md focus:outline-none ${className}`}
      {...props}
    />
  );
}
