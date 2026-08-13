import type { Metadata } from "next";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./globals.css";

export const metadata: Metadata = {
  title: "HH Goa 2026 ID Card Generator",
  description: "Generate your HH Goa 2026 Builder ID Card",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-dark text-light">{children}</body>
    </html>
  );
}