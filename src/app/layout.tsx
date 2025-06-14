import type { Metadata } from "next";
import { Inconsolata, Raleway } from "next/font/google";
import { Navbar } from "@/components/navbar/Navbar";
import { Footer } from "@/components/shared/Footer"
import "@/app/globals.css";


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
  title: "Web Portfolio - Luis Romero ",
  description: "My personal website and portfolio",
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
        <Footer />
      </body>
    </html>
  );
}
