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
    title: "Your Name · Academic Homepage",
    description: "A warm, editorial personal academic homepage for presenting research, publications, experience, and service.",
    openGraph: {
      title: "Your Name · Academic Homepage",
      description: "Research in machine learning, visual computing, and intelligent systems.",
      type: "website",
      images: [{ url: new URL("/og.png", baseUrl).toString(), width: 1200, height: 630, alt: "Your Name academic homepage" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Your Name · Academic Homepage",
      description: "Research in machine learning, visual computing, and intelligent systems.",
      images: [new URL("/og.png", baseUrl).toString()],
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
