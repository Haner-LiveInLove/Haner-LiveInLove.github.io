import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://haner-liveinlove.github.io"),
  title: "Junhan Wang | 王俊翰",
  description:
    "Junhan Wang is a Research Assistant at CFCS, Peking University, working on robotic manipulation.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "32x32" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      {
        url: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
  openGraph: {
    title: "Junhan Wang | 王俊翰",
    description:
      "Interested in agentic robot learning, with a focus on generalist and dexterous manipulation.",
    type: "website",
    images: [
      {
        url: "/og_v2.png",
        width: 1200,
        height: 630,
        alt: "Junhan Wang academic homepage",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Junhan Wang | 王俊翰",
    description:
      "Interested in agentic robot learning, with a focus on generalist and dexterous manipulation.",
    images: ["/og_v2.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Script
          src="https://static.cloudflareinsights.com/beacon.min.js"
          strategy="afterInteractive"
          data-cf-beacon='{"token":"3812f7fbb4114202948de54ca255d920"}'
        />
      </body>
    </html>
  );
}
