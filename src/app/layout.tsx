import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Automation Agency | n8n, Zapier, Make & Full Stack Development | SiddhiX",
  description:
    "SiddhiX helps businesses automate workflows, generate leads, build AI-powered systems, and develop modern web & mobile applications using n8n, Zapier, Make, OpenAI, Flutter, and Full Stack technologies.",
  keywords: [
    "AI Automation Agency",
    "Business Automation Services",
    "n8n Automation Expert",
    "Zapier Automation Services",
    "Make.com Automation",
    "Workflow Automation Agency",
    "AI Lead Generation",
    "Full Stack Development Services",
    "Flutter App Development",
    "Custom Web Application Development",
    "Business Automation Services",
    "n8n Automation Services",
    "Zapier Automation Expert",
    "Make.com Automation Agency",
    "No Code Automation Services",
    "AI Workflow Automation",
    "Process Automation Solutions",
    "WhatsApp Automation Services",
    "CRM Automation Services",
    "Lead Generation Automation",
    "AI Integration Services",
    "OpenAI Automation Solutions",
    "Web Development Agency",
    "Custom Website Development",
    "Business Website Development",
    "Responsive Website Design",
    "Professional Website Development",
    "Website Development Company",
    "Modern Web Applications",
    "React Developer Services",
    "Next.js Development Agency",
    "Mobile App Development Company",
    "Android App Development",
    "Cross Platform App Development",
    "Startup App Development",
    "Business Mobile Applications",
    "Flutter Developer Agency",
    "B2B Lead Generation",
    "Google Maps Lead Generation",
    "Automated Lead Generation",
    "Sales Automation Services",
    "AI Lead Qualification",
    "Prospecting Automation",
    "Appointment Booking Automation",
    "Lead Scraping Services",
    "hire n8n automation expert",
    "hire zapier automation specialist",
    "automate business workflows with AI",
    "AI automation agency for small business",
    "custom CRM automation services",
    "business process automation consultant",
    "workflow automation for agencies",
    "AI powered lead generation system",
    "whatsapp automation for business",
    "automate client onboarding process",
    "AI chatbot development company",
    "affordable automation agency",
    "AI Automation Agency India",
    "Web Development Company India",
    "Automation Consultant India",
    "n8n Expert India",
    "Zapier Expert India",
    "Mobile App Development India",
    "Full Stack Developer India",
    "Business Automation Services India",
  ],
  openGraph: {
    title: "AI Automation Agency | n8n, Zapier, Make & Full Stack Development | SiddhiX",
    description:
      "SiddhiX helps businesses automate workflows, generate leads, build AI-powered systems, and develop modern web & mobile applications.",
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
