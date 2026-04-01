import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  // طباعة للتأكد في السيرفر
  const locale = await requestLocale;
  console.log("Resolved Locale:", locale);

  // تأكد أن اللغة المطلوبة موجودة في الإعدادات، وإلا استخدم الافتراضية
  const finalLocale = routing.locales.includes(locale as any)
    ? locale
    : routing.defaultLocale;

  return {
    locale: finalLocale,
    // لا تنسَ استيراد ملفات الترجمة هنا
    messages: (await import(`../messages/${finalLocale}.json`)).default,
  };
});
