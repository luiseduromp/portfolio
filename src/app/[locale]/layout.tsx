import "@/app/globals.css";

import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Inconsolata, Raleway } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";

import { ChatStream } from "@/components/chatbot/ChatStream";
import { Navbar } from "@/components/navbar/Navbar";
import { Footer } from "@/components/shared/Footer";
import { pub } from "@/lib/publicConfig";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  display: "swap",
});

const inconsolata = Inconsolata({
  variable: "--font-inconsolata",
  weight: ["300", "400"],
  subsets: ["latin"],
  display: "swap",
});

type RootLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      name: "Luis Romero",
      url: "https://luiseduromp.com",
      email: "luiseduromp@gmail.com",
      jobTitle: "Full Stack and AI Engineer",
      sameAs: [
        "https://linkedin.com/in/luiseduromp",
        "https://github.com/luiseduromp",
      ],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Barcelona",
        addressCountry: "ES",
      },
    },
    {
      "@type": "WebSite",
      name: "Luis Romero Portfolio",
      url: "https://luiseduromp.com",
    },
  ],
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    metadataBase: new URL("https://luiseduromp.com"),
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: "https://luiseduromp.com",
      siteName: t("title"),
      images: [
        {
          url: `${pub.BUCKET_URL}/og-image.png`,
          width: 1200,
          height: 630,
          alt: t("title"),
        },
      ],
      locale: locale === "es" ? "es_ES" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("twitterDescription"),
      images: [`${pub.BUCKET_URL}/og-image.png`],
    },
  };
}

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "es" }];
}

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={`${raleway.className} ${inconsolata.variable} antialiased dark`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          {children}
          <ChatStream />
          <Footer />
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
