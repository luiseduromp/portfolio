import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next"
import { Inconsolata, Raleway } from "next/font/google";
import { Navbar } from "@/components/navbar/Navbar";
import { Footer } from "@/components/shared/Footer"
import { ChatWidget } from "@/components/chatbot/ChatWidget";
import "@/app/globals.css";
import { pub } from "@/lib/config";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  display: 'swap',
});

const inconsolata = Inconsolata({
  variable: "--font-inconsolata",
  weight: ["300", "400"],
  subsets: ["latin"],
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Luis Romero Web Portfolio",
  description: "My personal website and portfolio",
  openGraph: {
    title: "Luis Romero Web Portfolio",
    description: "Full-stack developer & AI engineer portfolio",
    url: "https://luiseduromp.com",
    siteName: "Luis Romero Web Portfolio",
    images: [
      {
        url: `${pub.BUCKET_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Luis Romero Web Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Luis Romero Web Portfolio",
    description: "Full-stack developer & AI engineer portfolio",
    images: [`${pub.BUCKET_URL}/og-image.png`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${raleway.className} ${inconsolata.variable} antialiased dark`}
      >
        <Navbar />
        {children}
        <ChatWidget />
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
