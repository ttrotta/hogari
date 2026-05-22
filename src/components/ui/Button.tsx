import { type ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

export function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-bold transition-all focus:outline-none focus-visible:ring-4";

  const variants = {
    primary:
      "bg-primary text-white hover:bg-primary-dark hover:scale-105 hover:shadow-xl focus-visible:ring-brand-light shadow-lg",
    secondary:
      "border-2 border-primary text-primary hover:bg-primary hover:text-white focus-visible:ring-brand-light",
    ghost:
      "text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus-visible:ring-gray-300",
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
