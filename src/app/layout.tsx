import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { SessionProvider } from "@/components/providers/SessionProvider";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hogarí",
  description: "Encontrá el hogar que buscás con Hogarí.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} font-sans h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
