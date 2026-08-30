import type { Metadata } from "next";
import { Inter, Outfit, Coming_Soon } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { AgentModeProvider } from "@/contexts/agent-mode";
import { VisitorProvider } from "@/contexts/visitor-context";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const comingSoon = Coming_Soon({ subsets: ["latin"], weight: ["400"], variable: "--font-signature" });

export const metadata: Metadata = {
  title: "Amresh Chaurasiya — Software Engineer",
  description: "Backend engineer building scalable systems, AI-powered applications, and developer infrastructure with Node.js, TypeScript, PostgreSQL, Redis, AWS, and Docker.",
  metadataBase: new URL("https://amreshdev.me"),
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    title: "Amresh Chaurasiya - Developer",
    description: "Software Developer focused on building tools and platforms that make developers' lives easier.",
    url: "https://amreshdevs.vercel.app",
    siteName: "Amresh Chaurasiya",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Amresh Chaurasiya" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Amresh Chaurasiya - Developer",
    description: "Software Developer focused on building tools and platforms that make developers' lives easier.",
    creator: "@Amresh__01",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} ${outfit.variable} ${comingSoon.variable}`}>
        <AgentModeProvider>
          <VisitorProvider>
            <ThemeProvider
              attribute="data-theme"
              defaultTheme="dark"
              enableSystem={false}
            >
              <div className="main-wrapper">
                {children}
              </div>
            </ThemeProvider>
          </VisitorProvider>
        </AgentModeProvider>
        <Analytics />
      </body>
    </html>
  );
}
