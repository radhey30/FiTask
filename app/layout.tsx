import "./globals.css";
import type { Metadata } from "next";
import { Navbar } from "@/components";

export const metadata: Metadata = {
  title: "FiTask",
  description: "Generated by Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>
        <Navbar />
        <hr />
        <div className="max-w-4xl mx-auto mt-10 mb-20">{children}</div>
      </body>
    </html>
  );
}
