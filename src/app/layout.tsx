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
  title: "Abhijitam Dubey - Developer",
  description: "Software Developer focused on building tools and platforms that make developers' lives easier.",
  metadataBase: new URL("https://abhijitamdubey.site"),
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    title: "Abhijitam Dubey - Developer",
    description: "Software Developer focused on building tools and platforms that make developers' lives easier.",
    url: "https://abhijitamdubey.site",
    siteName: "Abhijitam Dubey",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Abhijitam Dubey" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abhijitam Dubey - Developer",
    description: "Software Developer focused on building tools and platforms that make developers' lives easier.",
    creator: "@abhijitam_tw",
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
