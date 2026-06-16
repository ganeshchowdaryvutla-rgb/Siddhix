import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SiddhiX — Intelligent Systems",
  description:
    "SiddhiX. Designing intelligent systems for businesses that refuse to stay average.",
  keywords: [
    "AI",
    "Systems",
    "Software",
    "Automation",
    "SiddhiX",
  ],
  openGraph: {
    title: "SiddhiX — Intelligent Systems",
    description:
      "SiddhiX. Designing intelligent systems for businesses that refuse to stay average.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased">
      <body className="bg-[var(--bg-primary)] text-[var(--text-primary)] selection:bg-[var(--text-primary)] selection:text-[var(--bg-primary)]">
        {children}
      </body>
    </html>
  );
}
