import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: [
    // مسار الصفحة الرئيسية
    "/",
    // مسارات اللغات
    "/(ar|en)/:path*",
    // استثناء ملفات النظام والملفات الثابتة
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
};
