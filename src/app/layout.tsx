import type { Metadata } from "next";
import "./globals.css";
import AuthSessionProvider from "@/components/providers/session-provider";

export const metadata: Metadata = {
  title: {
    default: "InkSphere — Where Ideas Take Shape",
    template: "%s | InkSphere",
  },
  description:
    "The AI-powered SaaS blogging platform for modern teams. Write, collaborate, and grow your audience with enterprise-grade tools.",
  keywords: [
    "blogging platform",
    "SaaS",
    "AI writing",
    "content management",
    "blog",
    "newsletter",
    "SEO",
  ],
  authors: [{ name: "InkSphere" }],
  creator: "InkSphere",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://inksphere.io",
    siteName: "InkSphere",
    title: "InkSphere — Where Ideas Take Shape",
    description:
      "The AI-powered SaaS blogging platform for modern teams. Write, collaborate, and grow your audience with enterprise-grade tools.",
  },
  twitter: {
    card: "summary_large_image",
    title: "InkSphere — Where Ideas Take Shape",
    description:
      "The AI-powered SaaS blogging platform for modern teams.",
    creator: "@inksphere",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-white text-slate-900 antialiased">
        <AuthSessionProvider>
          {children}
        </AuthSessionProvider>
      </body>
    </html>
  );
}
