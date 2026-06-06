import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "D2A · Target Account Intelligence — NOVATEK Agentic OS",
  description:
    "Target Account Intelligence Agent. A NOVATEK Agentic OS console that profiles enterprise accounts, detects buying triggers, and scores pursuit priority with the ABCD method — grounded in live web evidence.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
