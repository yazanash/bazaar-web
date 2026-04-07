import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "sonner";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// دالة توليد الميتا داتا الديناميكية للـ Layout
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://bazaar-963.com";
  const ogImage = `${baseUrl}/og-image.png`;

  return {
    metadataBase: new URL(baseUrl),
    title: {
      template: isAr ? "%s | بازار 963" : "%s | Bazaar 963",
      default: isAr
        ? "بازار 963 - سوق السيارات الأول في سوريا"
        : "Bazaar 963 - Leading Car Marketplace",
    },
    description: isAr
      ? "بازار 963 هو منصتك الأولى لبيع وشراء السيارات بأفضل الأسعار. تصفح آلاف الإعلانات اليوم."
      : "Bazaar 963 is your premier platform to buy and sell cars at the best prices. Browse thousands of ads today.",

    // إعدادات الصورة عند مشاركة الرابط
    openGraph: {
      title: isAr ? "بازار 963 - سوق السيارات" : "Bazaar 963 - Car Marketplace",
      description: isAr
        ? "بيع واشتري سيارتك بأفضل الأسعار"
        : "Buy and sell your car easily",
      url: baseUrl,
      siteName: "Bazaar 963",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: isAr ? "لوجو بازار 963" : "Bazaar 963 Logo",
        },
      ],
      locale: isAr ? "ar_SA" : "en_US",
      type: "website",
    },

    // إعدادات تويتر
    twitter: {
      card: "summary_large_image",
      title: isAr ? "بازار 963" : "Bazaar 963",
      description: isAr ? "سوق السيارات الأول" : "Leading Car Marketplace",
      images: [ogImage],
    },

    alternates: {
      canonical: locale === "ar" ? `${baseUrl}/ar` : `${baseUrl}/en`,
      languages: {
        "ar-SA": `${baseUrl}/ar`,
        "en-US": `${baseUrl}/en`,
      },
    },
    icons: {
      icon: "/favicon.ico",
      apple: "/apple-touch-icon.png",
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <NextTopLoader
            color="#0095A6"
            height={4}
            showSpinner={false}
            zIndex={999999}
            shadow="0 0 10px #0095A6,0 0 5px #0095A6"
          />
          {children}
          <Toaster position="top-center" richColors />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
