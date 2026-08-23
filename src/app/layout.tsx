import type { Metadata } from "next";
import "./globals.css";
import SmoothScrollProvider from "@/components/layout/SmoothScrollProvider";
import CustomCursor from "@/components/layout/CustomCursor";
import Nav from "@/components/layout/Nav";
import ScrollProgress from "@/components/layout/ScrollProgress";
import PageLoader from "@/components/layout/PageLoader";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Amlan Tripathy — Video Editor for Creators & Brands",
  description:
    "Amlan Tripathy is a video editor working with US creators, podcasters, and brands — combining the analytical thinking of a former management consultant with the storytelling instincts of a cinematic editor. Stories don't go viral. They're engineered.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=general-sans@300,400,500,600,700&f[]=satoshi@300,400,500,700,900&display=swap"
        />
      </head>
      <body className="flex min-h-full flex-col bg-paper text-ink">
        <PageLoader />
        <ScrollProgress />
        <CustomCursor />
        <SmoothScrollProvider>
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
