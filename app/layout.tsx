import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const baseUrl = new URL(`${protocol}://${host}`);

  return {
    metadataBase: baseUrl,
    title: "Junhan Wang | 王俊翰",
    description: "Junhan Wang is a Research Assistant at CFCS, Peking University, working on robotic manipulation.",
    icons: {
      icon: [
        { url: "/favicon.svg", type: "image/svg+xml" },
        { url: "/favicon.ico", sizes: "32x32" },
      ],
      shortcut: "/favicon.ico",
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    },
    openGraph: {
      title: "Junhan Wang | 王俊翰",
      description: "Interested in agentic robot learning, with a focus on generalist and dexterous manipulation.",
      type: "website",
      images: [{ url: new URL("/og_v2.png", baseUrl).toString(), width: 1200, height: 630, alt: "Junhan Wang academic homepage" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Junhan Wang | 王俊翰",
      description: "Interested in agentic robot learning, with a focus on generalist and dexterous manipulation.",
      images: [new URL("/og_v2.png", baseUrl).toString()],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
