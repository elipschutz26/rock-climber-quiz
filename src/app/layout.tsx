import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "What Type of Rock Climber Are You?",
  description: "Take the quiz to find your climbing personality — Boulderer, Sport Climber, Trad Climber, or Multi-Pitch Adventurer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-slate-950 text-slate-100 min-h-screen">
        {children}
      </body>
    </html>
  );
}
