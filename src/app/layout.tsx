import type { Metadata } from "next";
import { Inter, Sora } from 'next/font/google'
import "./globals.css";

const inter = Inter({ subsets: ['latin'] })
const sora = Sora({ subsets: ['latin'], weight: ['700', '800'], variable: '--font-sora' })

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
    <html lang="en" className={sora.variable}>
      <body className={`${inter.className} antialiased bg-slate-950 text-slate-100 min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
