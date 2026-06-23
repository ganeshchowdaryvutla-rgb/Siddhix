import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SiddhiX — Intelligent Systems",
  description:
    "SiddhiX. Designing intelligent systems for businesses that refuse to stay average.",
  keywords: [
    "SiddhiX",
    "Intelligent Systems",
    "AI Automation",
    "Software Development",
    "Machine Learning Solutions",
    "Cybersecurity Automation",
    "Threat Detection Systems",
    "AgriTech Software",
    "Supply Chain Traceability",
    "Sales Automation CRM",
    "Lead Generation Tools",
    "Next.js Web Development",
    "React Applications",
    "Framer Motion Animations",
    "Premium Web Design",
    "Enterprise Software Architecture",
    "Bespoke Web Applications",
    "Digital Transformation",
    "Data Analytics Platforms",
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
